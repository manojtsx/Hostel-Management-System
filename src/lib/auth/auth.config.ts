import { NextAuthOptions } from "next-auth";
import prisma from "../prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import z from "zod";
import { Adapter } from "next-auth/adapters";
import bcrypt from "bcryptjs";

// Define Role enum to match schema
enum Role {
  SuperAdmin = "SuperAdmin",
  Admin = "Admin",
  Student = "Student",
  User = "User"
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                hostelNumber: { label: 'Hostel Number', type: 'text' },
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
                role: { label: 'Role', type: 'text' }
            },
            async authorize(credentials) {
                const parsedCredentials = z.object({
                    hostelNumber: z.string().optional(),
                    email: z.string().email(),
                    password: z.string().min(6),
                    role: z.string()
                }).safeParse(credentials);

                if (!parsedCredentials.success) {
                    throw new Error('Invalid credentials format');
                }

                const { hostelNumber, email, password, role } = parsedCredentials.data;
                console.log(hostelNumber, email, password)

                // First, verify the hostel exists
                if (!hostelNumber && role === "SuperAdmin") {
                    // verify for the superadmin
                    const superAdmin = await prisma.auth.findFirst({
                        where: {
                            userInEmail: email,
                            role: Role.SuperAdmin
                        }
                    })
                    if (!superAdmin) {
                        throw new Error('Invalid credentials');
                    }
                    return {
                        id: superAdmin.authId,
                        email: superAdmin.userInEmail,
                        role: superAdmin.role,
                        hostelId: superAdmin.hostelId as string,
                        name: superAdmin.userInName
                    }
                }

                const hostel = await prisma.hostel.findFirst({
                    where: {
                        hostelNumber: hostelNumber
                    }
                });

                if (!hostel) {
                    throw new Error('Invalid hostel number');
                }

                // the auth can be of admin or student of the hostel
                // First, find the admin associated with this hostel
                const admin = await prisma.admin.findFirst({
                    where: {
                        adminEmail: email,
                        hostelId: hostel.hostelId
                    },
                    include: {
                        hostel: true
                    }
                });

                if (!admin) {
                    throw new Error('No admin found for this hostel');
                }

                // Find the auth record for this admin
                let auth;
                if (role === "Admin") {
                    auth = await prisma.auth.findFirst({
                        where: {
                            userInEmail: email,
                            role: Role.Admin
                        }
                    });
                } else if (role === "Student") {
                    auth = await prisma.auth.findFirst({
                        where: {
                            userInEmail: email,
                            role: Role.Student
                        }
                    });
                }

                if (!auth || !auth.userInPassword) {
                    throw new Error('Invalid credentials');
                }

                // Verify password
                const isPasswordValid = await bcrypt.compare(password, auth.userInPassword);
                if (!isPasswordValid) {
                    throw new Error('Invalid password');
                }

                // Check if user is verified
                if (!auth.isVerified) {
                    throw new Error('Account not verified');
                }

                // Return the user object
                return {
                    id: auth.authId,
                    email: auth.userInEmail,
                    role: auth.role,
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.role = token.role as Role;
            }
            return session;
        }
    },
    pages: {
        signIn: '/login',
        signOut: '/logout',
        error: '/error'
    },
    debug: process.env.NODE_ENV === 'development'
}
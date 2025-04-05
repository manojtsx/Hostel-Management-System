import { NextAuthOptions } from "next-auth";
import prisma from "../prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import z from "zod";
import { Adapter } from "next-auth/adapters";
import bcrypt from "bcrypt";
import { Role } from "@prisma/client";

export const getUser = async (authId : string) => {
    let user = null;
    try {
        user = await prisma.auth.findFirst({
            where : {
                authId : authId
        },
        select : {
            authId : true,
            role : true,
        }
    });
    const isUserVerified = await prisma.auth.findFirst({
        where : {
            authId : authId,
            isVerified : true
        }
    })
    if(!isUserVerified) {
        throw new Error('User not verified');
    }
    } catch (error) {
        console.log(error);
    }
    return user;
}
export const authOptions : NextAuthOptions = {
    adapter : PrismaAdapter(prisma) as Adapter,
    session : {
        strategy : 'jwt'
    },
    secret : process.env.NEXTAUTH_SECRET,
    providers : [
        CredentialsProvider({
            name : 'credentials',
            credentials : {
                email : {label : 'Email', type : 'email'},
                password : {label : 'Password', type : 'password'}
            },
            async authorize(credentials){
                const parsedCredentials = z.object({email : z.string().email(), password : z.string().min(6)}).safeParse(credentials);
                if(parsedCredentials.success) {
                    const user = await prisma.auth.findFirst({
                        where : {
                            userInEmail : parsedCredentials.data.email
                        },
                        select : {
                            id : true,
                            authId : true,
                            userInEmail : true,
                            userInPassword : true,
                            role : true,
                        }
                    })
                    if(!user || !user.userInPassword) {
                        throw new Error('Invalid credentials');
                    }
                    
                    const isPasswordValid = await bcrypt.compare(parsedCredentials.data.password, user.userInPassword);
                    if(!isPasswordValid) {
                        throw new Error('Invalid credentials');
                    }
                    const userData = await getUser(user.authId);
                    return {
                        id : userData?.authId,
                        role : userData?.role as Role,
                        email : user.userInEmail
                    };
                }
                throw new Error('Invalid credentials');
            }
        })
    ],
    callbacks : {
        async jwt({token, user}) {
            if(user) {
                token.id = user.id;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({session, token}) {
            if(token.role) {
                session.user.role = token.role;
                session.user.id = token.id;
                session.user.email = token.email;
            }
            return session;
        }
    },
    pages : {
        signIn : '/login',
        signOut : '/logout',
        error : '/error'
    },
    debug : process.env.NODE_ENV === 'development'
}
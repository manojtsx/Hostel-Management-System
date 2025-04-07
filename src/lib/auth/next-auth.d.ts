/** @format */

import { Role } from "@prisma/client";
import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      email?: string;
      role?: Role;
    } & DefaultSession;
  }
  interface User extends DefaultUser {
    id?: string;
    email?: string;
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role?: Role;
    id?: string;
    email?: string;
  }
}


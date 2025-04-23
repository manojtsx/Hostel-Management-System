import { authOptions } from "../auth/auth.config"
import prisma from "../prisma"

import { getServerSession } from "next-auth"

export const isSuperAdmin = async() => {
    const session = await getServerSession(authOptions) 
    return session?.user?.role === "SuperAdmin"
}

export const isAdmin = async() => {
    const session = await getServerSession(authOptions)
    return session?.user?.role === "Admin"
}

export const isStudent = async() => {
    const session = await getServerSession(authOptions)
    return session?.user?.role === "Student"
}

export const isValidSuperAdmin = async() => {
    try{
        const session = await getServerSession(authOptions)
        console.log(session);
        if(session?.user?.role !== "SuperAdmin"){
            throw new Error("You are not authorized to access this page")
        }
        const user = await prisma.auth.findFirst({
            where : {
                userInEmail : session?.user?.email
            }
        });
        if(!user){
            throw new Error("User not found")
        }
        return {
            success : true,
            message : "User is a valid super admin",
            email : user.userInEmail,
            name : user.userInName,
            role : user.role,
            hostelId : user.hostelId,
            academicYear : new Date().getFullYear()
        };
    }catch(err) {
        console.log(err);
        return {
            success : false,
            message : "Something went wrong"
        };
    }
}

export const isValidAdmin = async() => {
    try{
        const session = await getServerSession(authOptions)
        if(session?.user?.role !== "Admin"){
            throw new Error("You are not authorized to access this page")
        }
        const user = await prisma.auth.findFirst({
            where : {
                userInEmail : session?.user?.email
            }
        });
        if(!user){
            throw new Error("User not found")
        }
        return {
            success : true,
            message : "User is a valid admin",
            email : user.userInEmail,
            name : user.userInName,
            role : user.role,
            authId : user.authId,
            hostelId : user.hostelId,
            academicYear : new Date().getFullYear()
        }
    }catch(err) {
        console.log(err);
    }
}

export const isValidStudent = async() => {
    try{
        const session = await getServerSession(authOptions)
        if(session?.user?.role !== "Student"){
            throw new Error("You are not authorized to access this page")
        }
        const user = await prisma.auth.findFirst({
            where : {
                userInEmail : session?.user?.email
            }
        });
        if(!user){
            throw new Error("User not found")
        }
        return {
            success : true,
            message : "User is a valid student",
            email : user.userInEmail,
            name : user.userInName,
            role : user.role,
            hostelId : user.hostelId,
            academicYear : new Date().getFullYear()
        }
    }catch(err) {
        console.log(err);
        return {
            success : false,
            message : "Something went wrong"
        };
    }
}


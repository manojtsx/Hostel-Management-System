"use server"
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"
import { PrismaClient, Prisma } from "@prisma/client"

export async function registerSuperAdmin(data : string) {
    try{
        const parsedData = JSON.parse(data);
        console.log(parsedData);

        const existingUser = await prisma.auth.findUnique({
            where : {
                userInEmail : parsedData.email,
                role : "SuperAdmin"
            }
        })

        if(existingUser){
            return {
                success: false,
                message: "Super Admin with same email already exists"
            }
        }

        const hashedPassword = await bcrypt.hash(parsedData.password, 10);
        
        const newSuperAdmin = await prisma.auth.create({
            data : {
                userInEmail : parsedData.email,
                userInPhone : parsedData.phone,
                userInName : parsedData.firstName.trim() + " " + parsedData.lastName.trim(),
                userInPassword : hashedPassword,
                role : "SuperAdmin",
                isVerified : true,
            }
        })

        if(!newSuperAdmin){
            return {
                success: false,
                message: "Something went wrong"
            }
        }

        return {
            success: true,
            message: "Super Admin registered successfully"
        }
    }catch(err) {
        console.log(err);
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export async function registerHostelAdmin(data : string) {
    try {
        const parsedData = JSON.parse(data);

        const existingUser = await prisma.auth.findUnique({
            where : {
                userInEmail : parsedData.email,
                role : "Admin"
            }
        })

        if(existingUser){
            return {
                success: false,
                message: "Hostel Admin with same email already exists"
            }
        }

        const hashedPassword = await bcrypt.hash(parsedData.password, 10);

        const transaction = await prisma.$transaction(async (tx: Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">) => {
            const newHostelAdmin = await tx.auth.create({   
                data : {
                userInEmail : parsedData.email,
                userInPhone : parsedData.phone,
                userInName : parsedData.name,
                userInPassword : hashedPassword,
                role : "Admin",
                isVerified : false,
                isRequestApproved : false,
                }
            })

           await tx.hostelRequest.create({
            data : {
                hostelName : parsedData.hostelName,
                hostelAddress : parsedData.hostelAddress,
                totalRooms : parsedData.totalRooms,
                totalBeds : parsedData.totalBeds,
                totalFloors : parsedData.totalFloors,
                adminName : parsedData.name,
                adminEmail : parsedData.email,
                adminPhone : parsedData.phone,
                adminPassword : hashedPassword,
                adminAddress : parsedData.address
            }
           });

            return newHostelAdmin;
           }
        )   

        if(!transaction){
            return {
                success: false,
                message: "Something went wrong"
            }
        }
           return {
            success: true,
            message: "Hostel Admin request sent successfully"
           }

    }catch(err) {
        console.log(err);
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

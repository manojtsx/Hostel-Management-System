"use server"
import prisma from "@/lib/prisma"
import { isValidAdmin } from "@/lib/validation/role-validation"
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

export const addRoom = async(data: string)=>{
    const isAdmin = await isValidAdmin();
    console.log(isAdmin, "isAdmin");
    if(!isAdmin){
        return{
            success: false,
            message: "You are not authorized to add a room"
        }
    }

    try{
        const parsedData = JSON.parse(data);
        console.log(parsedData, "parsed data");
        
        await prisma.hostelRoom.create({
            data: {
                roomNumber: parsedData.roomNumber,
                roomCapacity: parsedData.roomCapacity,
                roomFloor: parsedData.roomFloor,
                roomType: parsedData.roomType,
                roomPricePerMonth: parsedData.roomPricePerMonth,
                roomBuilding: parsedData.roomBuilding,
                hostelId: isAdmin.hostelId as string,
                academicYear: isAdmin.academicYear.toString() as string
            }
        })
        return {
            success: true,
            message: "Room added successfully"
        }
    } catch (err) {
            console.log(err);
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                return {
                    success: false,
                    message: "Room already exists"
                }
            }
            return {
                success: false,
                message: "Error adding Room"
            }
        }
}

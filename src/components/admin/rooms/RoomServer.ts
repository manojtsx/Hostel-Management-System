"use server"
import prisma from "@/lib/prisma"
import { isValidAdmin } from "@/lib/validation/role-validation"
import { Prisma } from "@prisma/client";

export const addRoom = async(data: string)=>{
    const isAdmin = await isValidAdmin();
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
                roomCapacity: parsedData.roomCapacity.toString(),
                roomFloor: parsedData.roomFloor,
                roomType: parsedData.roomType,
                roomPricePerMonth: parsedData.roomPricePerMonth.toString(),
                roomBuilding: parsedData.roomBuilding,
                hostelId: isAdmin.hostelId as string,
                academicYear: isAdmin.academicYear as number
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

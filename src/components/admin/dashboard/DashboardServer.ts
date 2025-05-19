"use server"
import prisma from "@/lib/prisma"
import { isValidAdmin } from "@/lib/validation/role-validation"

// get total rooms and with a param to set month and year
export const getTotalRooms = async (month: number, year: number) => {
    const isAdmin = await isValidAdmin();
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to view this page"
        }
    }
    try{
        const totalRooms = await prisma.hostelRoom.count({
            where: {
                hostelId: isAdmin.hostelId as string,
                createdAt: {
                    gte: new Date(year, month - 1, 1),
                    lt: new Date(year, month, 1)
                }
            }
        });
        return {
            success: true,
            totalRooms
        }
    }
    catch(error){
        console.log(error);
        return {
            success: false,
            message: "Error fetching total rooms"
        }
    }
}

// get total students and with a param to set month and year
export const getTotalStudents = async (month: number, year: number) => {
    const isAdmin = await isValidAdmin();
    if (!isAdmin) {
        return {
            success : false,
            message : "You are not authorized to view this page"
        }
    }
    try {
        const totalStudents = await prisma.hostelStudent.count({
            where: {
                hostelId: isAdmin.hostelId as string,
                createdAt: {
                    gte: new Date(year, month - 1, 1),
                    lt: new Date(year, month, 1)
                }
            }
        });
        return {
            success: true,
            totalStudents
        }
    }
    catch(error){
        console.log(error);
        return {
            success: false,
            message: "Error fetching total students"
        }
    }
}


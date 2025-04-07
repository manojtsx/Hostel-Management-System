"use server";

import { isValidSuperAdmin } from "@/lib/validation/role-validation";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const generateHostelNumber = async (hostelName : string) => {
    const hostelNumber = hostelName.split(" ").join("").toLowerCase();
    const hostel = await prisma.hostel.findFirst({
        where: {
            hostelNumber: hostelNumber
        }
    });
    if (hostel) {
        return generateHostelNumber(hostelName + " " + hostel.id);
    }
    return hostelNumber;
}

// create hostel
export const createHostel = async (data: string) => {
    const isSuperAdmin = await isValidSuperAdmin();
    if (!isSuperAdmin.success) {
        return {
            success: false,
            message: isSuperAdmin.message
        };
    }
    try {
        const parsedData = JSON.parse(data);
        console.log(parsedData);
        // calculate the hostel expiry remaining time in days
        const hostelNumber = await generateHostelNumber(parsedData.hostelName);
        const hostelExpiryRemainingTime = Math.floor((new Date(parsedData.hostelExpiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        const hostel = await prisma.hostel.create({
            data: {
                hostelName: parsedData.hostelName,
                hostelAddress: parsedData.hostelAddress,
                totalRooms: parsedData.totalRooms,
                totalBeds: parsedData.totalBeds,
                totalFloors: parsedData.totalFloors,
                hostelExpiryRemainingTime: hostelExpiryRemainingTime,
                hostelExpiryDate: parsedData.hostelExpiryDate,
                hostelNumber: hostelNumber,
                academicYear: isSuperAdmin.academicYear as number
            }
        });
        return {
            success: true,
            message: "Hostel created successfully",
            hostel: hostel
        };
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: "Something went wrong"
        };
    }
}

// get all hostels
export const getAllHostels = async (currentPage: number, pageSize: number, searchQuery: string, expiryDays: number) => {
    const isSuperAdmin = await isValidSuperAdmin();
    if (!isSuperAdmin.success) {
        return {
            success: false,
            message: isSuperAdmin.message
        };
    }
    try {

        const whereClause = {
            OR: [
                {
                    hostelName: {
                        contains: searchQuery,
                        mode: "insensitive"
                    }
                },
                {
                    hostelAddress: {
                        contains: searchQuery,
                        mode: "insensitive"
                    }
                }
            ]
        } as Prisma.HostelWhereInput;

        if (expiryDays > 0) {
            whereClause.hostelExpiryRemainingTime = {
                lte: expiryDays
            }
        }
        const hostels = await prisma.hostel.findMany({
            where: whereClause,
            skip: (currentPage - 1) * pageSize,
            take: pageSize
        });
        const totalItems = await prisma.hostel.count({
            where: whereClause
        });

        return {
            success: true,
            message: "Hostels fetched successfully",
            hostels: hostels,
            totalItems: totalItems,
        };
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: "Something went wrong"
        };
    }
}

// edit hostel
export const editHostel = async (data: string) => {
    const isSuperAdmin = await isValidSuperAdmin();
    if (!isSuperAdmin.success) {
        return {
            success: false,
            message: isSuperAdmin.message
        };
    }
    try {
        const parsedData = JSON.parse(data);
        console.log(parsedData);

        // calculate the hostel expiry remaining time in days
        const hostelExpiryRemainingTime = Math.floor((new Date(parsedData.hostelExpiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        const hostel = await prisma.hostel.update({
            where: {
                hostelId: parsedData.hostelId
            },
            data: {
                hostelName: parsedData.hostelName,
                hostelAddress: parsedData.hostelAddress,
                totalRooms: parsedData.totalRooms,
                totalBeds: parsedData.totalBeds,
                totalFloors: parsedData.totalFloors,
                hostelExpiryRemainingTime: hostelExpiryRemainingTime,
                hostelExpiryDate: parsedData.hostelExpiryDate
            }
        });
        return {
            success: true,
            message: "Hostel updated successfully",
            hostel: hostel
        };
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: "Something went wrong"
        };
    }
}

// delete hostel
export const deleteHostel = async (hostelId: string) => {
    const isSuperAdmin = await isValidSuperAdmin();
    if (!isSuperAdmin.success) {
        return {
            success: false,
            message: isSuperAdmin.message
        };
    }
    try {
        await prisma.hostel.delete({
            where: {
                hostelId: hostelId
            }
        });

        // delete the auth user
        const auth = await prisma.auth.findMany({
            where: {
                hostelId: hostelId
            }
        });
        if (auth.length > 0) {
            await Promise.all(auth.map(async (auth) => {
                await prisma.auth.delete({
                    where: {
                        authId: auth.authId
                    }
                });
            }));
        }

        return {
            success: true,
            message: "Hostel deleted successfully"
        };
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: "Something went wrong"
        };
    }
}
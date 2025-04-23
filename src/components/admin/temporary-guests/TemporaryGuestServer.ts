"use server"
import prisma from "@/lib/prisma"
import { isValidAdmin } from "@/lib/validation/role-validation"
import { GuestStatus, Prisma } from "@prisma/client"

// add temporary guest
export const addTemporaryGuest = async (data: string) => {
    const isAdmin = await isValidAdmin()
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to add a temporary guest"
        }
    }
    try {
        const parsedData = JSON.parse(data)
        console.log(parsedData, "parsed Data")

        // create a temporary guest
        await prisma.temporaryGuest.create({
            data: {
                guestName: parsedData.guestName,
                guestEmail: parsedData.guestEmail,
                guestPhone: parsedData.guestPhone,
                guestAddress: parsedData.guestAddress,
                guestPurpose: parsedData.guestPurpose,
                guestDocuments: parsedData.guestDocuments || [],
                checkInDate: new Date(parsedData.checkInDate),
                checkOutDate: new Date(parsedData.checkOutDate),
                roomId: parsedData.roomId || null,
                hostelId: isAdmin.hostelId as string,
                authId: isAdmin.authId as string,
                academicYear: isAdmin.academicYear as number,
            }
        })

        return {
            success: true,
            message: "Temporary guest added successfully."
        }

    } catch (err) {
        console.log(err)
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            return {
                success: false,
                message: "Error creating temporary guest"
            }
        }
        return {
            success: false,
            message: "Error adding temporary guest"
        }
    }
}

// get temporary guests
export const getTemporaryGuests = async (currentPage: number, pageSize: number, searchQuery: string, filters: { status: string }) => {
    const isAdmin = await isValidAdmin()
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to get temporary guests"
        }
    }
    try {
        let whereClause: Prisma.TemporaryGuestWhereInput = {
            hostelId: isAdmin.hostelId as string
        }

        if (searchQuery) {
            whereClause.OR = [
                {
                    guestName: {
                        contains: searchQuery,
                        mode: 'insensitive'
                    }
                },
                {
                    guestEmail: {
                        contains: searchQuery,
                        mode: 'insensitive'
                    }
                },
                {
                    guestPhone: {
                        contains: searchQuery,
                        mode: 'insensitive'
                    }
                }
            ]
        }

        if (filters.status && filters.status !== "All") {
            whereClause.status = filters.status as GuestStatus
        }

        const totalTemporaryGuests = await prisma.temporaryGuest.count({
            where: whereClause
        })

        const temporaryGuests = await prisma.temporaryGuest.findMany({
            where: whereClause,
            include: {
                room: true
            },
            take: pageSize,
            skip: (currentPage - 1) * pageSize,
            orderBy: {
                createdAt: "desc"
            }
        })

        return {
            success: true,
            message: "Temporary guests fetched successfully",
            data: temporaryGuests,
            total: totalTemporaryGuests,
            totalPages: Math.ceil(totalTemporaryGuests / pageSize)
        }
    } catch (err) {
        console.error(err)
        return {
            success: false,
            message: "Error fetching temporary guests"
        }
    }
}

// edit temporary guest
export const editTemporaryGuest = async (data: string) => {
    const isAdmin = await isValidAdmin()
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to edit a temporary guest"
        }
    }

    try {
        const parsedData = JSON.parse(data)
        
        const updatedTemporaryGuest = await prisma.temporaryGuest.update({
            where: {
                guestId: parsedData.guestId
            },
            data: {
                guestName: parsedData.guestName,
                guestEmail: parsedData.guestEmail,
                guestPhone: parsedData.guestPhone,
                guestAddress: parsedData.guestAddress,
                guestPurpose: parsedData.guestPurpose,
                guestDocuments: parsedData.guestDocuments || [],
                checkInDate: new Date(parsedData.checkInDate),
                checkOutDate: new Date(parsedData.checkOutDate),
                roomId: parsedData.roomId || null,
                status: parsedData.status as GuestStatus
            }
        })

        return {
            success: true,
            message: "Temporary guest updated successfully",
            data: updatedTemporaryGuest
        }
    } catch (err) {
        console.error(err)
        return {
            success: false,
            message: "Error updating temporary guest"
        }
    }
}

// delete temporary guest
export const deleteTemporaryGuest = async (guestId: string) => {
    const isAdmin = await isValidAdmin()
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to delete a temporary guest"
        }
    }

    try {
        await prisma.temporaryGuest.delete({
            where: {
                guestId: guestId
            }
        })

        return {
            success: true,
            message: "Temporary guest deleted successfully"
        }
    } catch (err) {
        console.error(err)
        return {
            success: false,
            message: "Error deleting temporary guest"
        }
    }
}

// update temporary guest status
export const updateTemporaryGuestStatus = async (guestId: string, status: GuestStatus) => {
    const isAdmin = await isValidAdmin()
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to update temporary guest status"
        }
    }

    try {
        const updatedTemporaryGuest = await prisma.temporaryGuest.update({
            where: {
                guestId: guestId
            },
            data: {
                status: status
            }
        })

        return {
            success: true,
            message: "Temporary guest status updated successfully",
            data: updatedTemporaryGuest
        }
    } catch (err) {
        console.error(err)
        return {
            success: false,
            message: "Error updating temporary guest status"
        }
    }
}

// get available rooms
export const getAvailableRooms = async () => {
    const isAdmin = await isValidAdmin()
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to get available rooms"
        }
    }

    try {
        const rooms = await prisma.hostelRoom.findMany({
            where: {
                hostelId: isAdmin.hostelId as string
            },
            orderBy: {
                roomNumber: "asc"
            }
        })

        return {
            success: true,
            message: "Available rooms fetched successfully",
            data: rooms
        }
    } catch (err) {
        console.error(err)
        return {
            success: false,
            message: "Error fetching available rooms"
        }
    }
} 
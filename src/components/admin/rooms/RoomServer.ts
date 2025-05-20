"use server"
import prisma from "@/lib/prisma"
import { isValidAdmin } from "@/lib/validation/role-validation"
import { Prisma, HostelRoom, HostelStudent, TemporaryGuest } from "@/prisma/generated/prisma";

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

export const getRooms = async(page: number, pageSize: number, searchQuery: string)=>{
    const isAdmin = await isValidAdmin();
    if(!isAdmin){
        return{
            success: false,
            message: "You are not authorized to get rooms"
        }
    }
    try{
        const rooms = await prisma.hostelRoom.findMany({
            where: {
                hostelId: isAdmin.hostelId as string,
                roomNumber: {
                    contains: searchQuery,
                    mode: "insensitive"
                }
            },
            skip: (page - 1) * pageSize,
            take: pageSize
        })
        const totalRooms = await prisma.hostelRoom.count({
            where: {
                hostelId: isAdmin.hostelId as string,
                roomNumber: {
                    contains: searchQuery,
                    mode: "insensitive"
                }
            }
        })
        // need to get the status of the room too according to the students and temporary guests in the room
        const roomsWithStatus = await Promise.all(rooms.map(async (room) => {
            const roomWithRelations = await prisma.hostelRoom.findFirst({
                where: {
                    roomId: room.roomId
                },
                include: {
                    temporaryGuests: {
                        select: {
                            guestName: true
                        }
                    },
                    students: {
                        select: {
                            studentName: true
                        }
                    }
                }
            })
            
            // Calculate room status based on occupancy
            const totalOccupants = (roomWithRelations?.students?.length || 0) + 
                                 (roomWithRelations?.temporaryGuests?.length || 0)
            const capacity = parseInt(room.roomCapacity)
            const status  : "occupied" | "partially_occupied" | "available" = totalOccupants >= capacity ? "occupied" : 
                          totalOccupants > 0 ? "partially_occupied" : "available"
                          // convert everything into a single object key value pair
                        // for both students and temporary guests it must be in the format of {name: string, type: string, checkInDate: string, checkOutDate: string}
            const occupants = [
                ...(roomWithRelations?.students?.map(student => ({
                    name: student.studentName,
                    type : "student" as "student" | "guest",
                })) || []),
                ...(roomWithRelations?.temporaryGuests?.map(guest => ({
                    name: guest.guestName,
                    type : "guest" as "student" | "guest",
                })) || [])
            ]
            return {
                ...room,
                status,
                occupied: totalOccupants,
                occupants : occupants
            }
        }))
        return {
            success: true,
            rooms : roomsWithStatus,
            totalPages: Math.ceil(totalRooms / pageSize)
        }
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: "Error getting rooms"
        }
    }
}

export const editRoom = async(data: string)=>{
    const isAdmin = await isValidAdmin();
    if(!isAdmin){
        return{
            success: false,
            message: "You are not authorized to edit a room"
        }
    }
    try{
        const parsedData = JSON.parse(data);
        console.log(parsedData, "parsed data");

        // check if the room number is already taken
        console.log(parsedData.roomId, "parsed data");
        const existingRoom = await prisma.hostelRoom.findFirst({
            where: {
                roomNumber: parsedData.roomNumber,
                hostelId: isAdmin.hostelId as string,
                roomId: {
                    not: parsedData.roomId
                }
            }
        })
        if(existingRoom){
            return {
                success: false,
                message: "Room number already taken"
            }
        }
        await prisma.hostelRoom.update({
            where: {
                roomId: parsedData.roomId
            },
            data: {
                roomNumber: parsedData.roomNumber,
                roomCapacity: parsedData.roomCapacity.toString(),
                roomFloor: parsedData.roomFloor,
                roomBuilding: parsedData.roomBuilding,
                roomType: parsedData.roomType,
                roomPricePerMonth: parsedData.roomPricePerMonth.toString(),
            }
        })
        return {
            success: true,
            message: "Room updated successfully"
        }

    } catch (err) {
        console.log(err);
        throw new Error("Error editing room");
    }
}

export const deleteRoom = async(roomId: string)=>{
    const isAdmin = await isValidAdmin();
    if(!isAdmin){
        return{
            success: false,
            message: "You are not authorized to delete a room"
        }
    }
    try{
        await prisma.hostelRoom.delete({
            where: {
                roomId: roomId
            }
        })
        return {
            success: true,
            message: "Room deleted successfully"
        }
    } catch (err) {
        console.log(err);
        throw new Error("Error deleting room");
    }
}


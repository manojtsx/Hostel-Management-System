"use server"
import prisma from "@/lib/prisma"
import { isValidAdmin } from "@/lib/validation/role-validation"
import { EventType, Prisma } from "@prisma/client";

// add event
export const addEvent = async (data: string) => {
    const isAdmin = await isValidAdmin();
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to add an event"
        }
    }
    try {
        const parsedData = JSON.parse(data);
        console.log(parsedData, "parsed Data");

        // Ensure date is properly formatted
        const eventDate = new Date(parsedData.date);
        if (isNaN(eventDate.getTime())) {
            return {
                success: false,
                message: "Invalid date format"
            }
        }

        // create an event
        await prisma.hostelEvents.create({
            data: {
                title: parsedData.title,
                description: parsedData.description,
                location: parsedData.location,
                type: parsedData.type as EventType,
                time: parsedData.time,
                date: eventDate,
                hostelId: isAdmin.hostelId as string,
                authId: isAdmin.authId as string,
                academicYear: isAdmin.academicYear as number,
            }
        });

        return {
            success: true,
            message: "Event added successfully."
        }

    } catch (err) {
        console.log(err);
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            return {
                success: false,
                message: "Error creating event"
            }
        }
        return {
            success: false,
            message: "Error adding event"
        }
    }
}

// get events
export const getEvents = async (currentPage: number, pageSize: number, searchQuery: string, filters: { type: string, startDate: Date | null, endDate: Date | null }) => {
    const isAdmin = await isValidAdmin();
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to get events"
        }
    }
    try {
        console.log(filters, "filters");
        let whereClause: Prisma.HostelEventsWhereInput = {
            hostelId: isAdmin.hostelId as string
        };

        if (searchQuery) {
            whereClause.OR = [
                {
                    title: {
                        contains: searchQuery,
                        mode: 'insensitive'
                    }
                },
                {
                    description: {
                        contains: searchQuery,
                        mode: 'insensitive'
                    }
                },
                {
                    location: {
                        contains: searchQuery,
                        mode: 'insensitive'
                    }
                }
            ];
        }

        if (filters.type && filters.type !== "All") {
            whereClause.type = filters.type as EventType;
        }
        
        if (filters.startDate) {
            whereClause.date = {
                gte: filters.startDate
            } as Prisma.DateTimeFilter;
        }
        
        if (filters.endDate) {
            if (whereClause.date) {
                (whereClause.date as Prisma.DateTimeFilter).lte = filters.endDate;
            } else {
                whereClause.date = {
                    lte: filters.endDate
                } as Prisma.DateTimeFilter;
            }
        }

        const totalEvents = await prisma.hostelEvents.count({
            where: whereClause
        });

        const events = await prisma.hostelEvents.findMany({
            where: whereClause,
            take: pageSize,
            skip: (currentPage - 1) * pageSize,
            orderBy: {
                date: "asc"
            }
        });

        return {
            success: true,
            message: "Events fetched successfully",
            data: events,
            total: totalEvents,
            totalPages: Math.ceil(totalEvents / pageSize)
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "Error fetching events"
        };
    }
}

// edit event
export const editEvent = async (data: string) => {
    const isAdmin = await isValidAdmin();
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to edit an event"
        }
    }

    try {
        const parsedData = JSON.parse(data);
        
        // Ensure date is properly formatted
        const eventDate = new Date(parsedData.date);
        if (isNaN(eventDate.getTime())) {
            return {
                success: false,
                message: "Invalid date format"
            }
        }

        const updatedEvent = await prisma.hostelEvents.update({
            where: {
                eventId: parsedData.eventId
            },
            data: {
                title: parsedData.title,
                description: parsedData.description,
                location: parsedData.location,
                type: parsedData.type as EventType,
                date: eventDate,
            }
        });

        return {
            success: true,
            message: "Event updated successfully",
            data: updatedEvent
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "Error updating event"
        };
    }
}

// delete event
export const deleteEvent = async (eventId: string) => {
    const isAdmin = await isValidAdmin();
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to delete an event"
        }
    }

    try {
        await prisma.hostelEvents.delete({
            where: {
                eventId: eventId
            }
        });

        return {
            success: true,
            message: "Event deleted successfully"
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "Error deleting event"
        };
    }
}

// get events by date range (for calendar view)
export const getEventsByDateRange = async (startDate: Date, endDate: Date) => {
    const isAdmin = await isValidAdmin();
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to get events"
        }
    }

    try {
        const events = await prisma.hostelEvents.findMany({
            where: {
                hostelId: isAdmin.hostelId as string,
                date: {
                    gte: startDate,
                    lte: endDate
                }
            },
            orderBy: {
                date: "asc"
            }
        });

        return {
            success: true,
            message: "Events fetched successfully",
            data: events
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "Error fetching events"
        };
    }
} 
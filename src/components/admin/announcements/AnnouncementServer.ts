"use server"
import prisma from "@/lib/prisma"
import { isValidAdmin } from "@/lib/validation/role-validation"
import { AnnouncementPriority, AnnouncementStatus, AnnouncementType, Prisma } from "@prisma/client";

// add announcement
export const addAnnouncement = async (data: string) => {
    const isAdmin = await isValidAdmin();
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to add an announcement"
        }
    }
    try {
        const parsedData = JSON.parse(data);
        console.log(parsedData, "parsed Data");

        // create an announcement
        await prisma.hostelAnnouncement.create({
            data: {
                title: parsedData.title,
                content: parsedData.content,
                type: parsedData.type as AnnouncementType,
                priority: parsedData.priority as AnnouncementPriority,
                date: new Date(parsedData.date),
                status: parsedData.status as AnnouncementStatus,
                hostelId: isAdmin.hostelId as string,
                authId: isAdmin.authId as string,
                academicYear: isAdmin.academicYear as number,
            }
        });

        return {
            success: true,
            message: "Announcement added successfully."
        }

    } catch (err) {
        console.log(err);
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            return {
                success: false,
                message: "Error creating announcement"
            }
        }
        return {
            success: false,
            message: "Error adding announcement"
        }
    }
}

// get announcements
export const getAnnouncements = async (currentPage: number, pageSize: number, searchQuery: string, filters: { type: string, priority: string, status: string }) => {
    const isAdmin = await isValidAdmin();
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to get announcements"
        }
    }
    try {
        console.log(filters, "filters");
        let whereClause: Prisma.HostelAnnouncementWhereInput = {
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
                    content: {
                        contains: searchQuery,
                        mode: 'insensitive'
                    }
                }
            ];
        }

        if (filters.type && filters.type !== "All") {
            whereClause.type = filters.type as AnnouncementType;
        }
        
        if (filters.priority && filters.priority !== "All") {
            whereClause.priority = filters.priority as AnnouncementPriority;
        }
        
        if (filters.status && filters.status !== "All") {
            whereClause.status = filters.status as AnnouncementStatus;
        }

        const totalAnnouncements = await prisma.hostelAnnouncement.count({
            where: whereClause
        });

        const announcements = await prisma.hostelAnnouncement.findMany({
            where: whereClause,
            take: pageSize,
            skip: (currentPage - 1) * pageSize,
            orderBy: {
                date: "desc"
            }
        });

        return {
            success: true,
            message: "Announcements fetched successfully",
            data: announcements,
            total: totalAnnouncements,
            totalPages: Math.ceil(totalAnnouncements / pageSize)
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "Error fetching announcements"
        };
    }
}

// edit announcement
export const editAnnouncement = async (data: string) => {
    const isAdmin = await isValidAdmin();
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to edit an announcement"
        }
    }

    try {
        const parsedData = JSON.parse(data);
        
        const updatedAnnouncement = await prisma.hostelAnnouncement.update({
            where: {
                announcementId: parsedData.announcementId
            },
            data: {
                title: parsedData.title,
                content: parsedData.content,
                type: parsedData.type as AnnouncementType,
                priority: parsedData.priority as AnnouncementPriority,
                date: new Date(parsedData.date),
                status: parsedData.status as AnnouncementStatus,
            }
        });

        return {
            success: true,
            message: "Announcement updated successfully",
            data: updatedAnnouncement
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "Error updating announcement"
        };
    }
}

// delete announcement
export const deleteAnnouncement = async (announcementId: string) => {
    const isAdmin = await isValidAdmin();
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to delete an announcement"
        }
    }

    try {
        await prisma.hostelAnnouncement.delete({
            where: {
                announcementId: announcementId
            }
        });

        return {
            success: true,
            message: "Announcement deleted successfully"
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "Error deleting announcement"
        };
    }
}

// update announcement status
export const updateAnnouncementStatus = async (announcementId: string, status: AnnouncementStatus) => {
    const isAdmin = await isValidAdmin();
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to update announcement status"
        }
    }

    try {
        const updatedAnnouncement = await prisma.hostelAnnouncement.update({
            where: {
                announcementId: announcementId
            },
            data: {
                status: status
            }
        });

        return {
            success: true,
            message: `Announcement marked as ${status.toLowerCase()}`,
            data: updatedAnnouncement
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "Error updating announcement status"
        };
    }
} 
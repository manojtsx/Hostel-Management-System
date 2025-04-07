"use server";
import prisma from "@/lib/prisma";
import { isValidSuperAdmin } from "@/lib/validation/role-validation";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

// get hostels
export const getHostels = async (searchQuery: string) => {
    const isSuperAdmin = await isValidSuperAdmin();
    if (!isSuperAdmin.success) {
        return {
            success: false,
            message: isSuperAdmin.message
        }
    }
    try {
        console.log(searchQuery, "searchQuery");
        const hostels = await prisma.hostel.findMany({
            where: {
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
            },
            take: 4,
            orderBy: {
                hostelName: "asc"
            },
            select: {
                hostelId: true,
                hostelName: true,
                hostelAddress: true,
            }
        })
        return {
            success: true,
            message: "Hostels fetched successfully",
            hostels: hostels
        }
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

// add admin
export const createAdmin = async (data: string) => {
    const isSuperAdmin = await isValidSuperAdmin();
    if (!isSuperAdmin.success) {
        return {
            success: false,
            message: isSuperAdmin.message
        }
    }
    try {
        const parsedData = JSON.parse(data);
        console.log(parsedData, "parsedData");

        // check if email already exists
        const existingEmail = await prisma.admin.findFirst({
            where : {
                OR : [
                    {
                        adminEmail : parsedData.adminEmail
                    },
                    {
                        adminPhone : parsedData.adminPhone
                    }
                ]
            }
        })
        const existingAuth = await prisma.auth.findFirst({
            where : {
                OR : [
                    {
                        userInEmail : parsedData.adminEmail
                    },
                    {
                        userInPhone : parsedData.adminPhone
                    }
                ]
            }
        })
        if(existingEmail || existingAuth){
            return {
                success : false,
                message : "Email or Phone already exists"
            }
        }
        
        const hashedPassword = await bcrypt.hash(parsedData.adminPhone, 10);

        const transaction = await prisma.$transaction(async (tx) => {
            const auth = await tx.auth.create({
                data: {
                    userInEmail: parsedData.adminEmail,
                    userInPassword: hashedPassword,
                    userInName: parsedData.adminName,
                    userInPhone: parsedData.adminPhone,
                    role: "Admin",
                    academicYear: isSuperAdmin.academicYear as number
                }
            })
            const admin = await tx.admin.create({
                data: {
                    adminName: parsedData.adminName,
                    adminEmail: parsedData.adminEmail,
                    adminPhone: parsedData.adminPhone,
                    hostelId: parsedData.hostel.hostelId,
                    authId: auth.authId,
                    academicYear: isSuperAdmin.academicYear as number
                }
            })
            return admin;
        })
        return {
            success: true,
            message: "Admin created successfully",
            admin: transaction
        }
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

// edit admin
export const editAdmin = async (data: string) => {
    const isSuperAdmin = await isValidSuperAdmin();
    if (!isSuperAdmin.success) {
        return {
            success: false,
            message: isSuperAdmin.message
        }
    }
    try {
        const parsedData = JSON.parse(data);
        console.log(parsedData, "parsedData");
        
        // check if email or phone already exists but not the same admin
        const existingEmail = await prisma.admin.findFirst({
            where : {
                OR : [
                    {
                        adminEmail : parsedData.adminEmail
                    },
                    {
                        adminPhone : parsedData.adminPhone
                    }
                ],
                adminId : {
                    not : parsedData.adminId
                }
            }
        })  
        const admin = await prisma.admin.findUnique({
            where : {
                adminId : parsedData.adminId
            }
        })
        const existingAuth = await prisma.auth.findFirst({
            where : {
                OR : [
                    {
                        userInEmail : parsedData.adminEmail
                    },
                    {
                        userInPhone : parsedData.adminPhone
                    }   
                ],
                authId : {
                    not : admin?.authId
                }

            }
        })
        if(existingEmail || existingAuth){
            return {
                success : false,
                message : "Email or phone already exists"
            }
        }

        const transaction = await prisma.$transaction(async (tx) => {
            const admin = await tx.admin.update({
                where: {
                    adminId: parsedData.adminId
                },
                data: {
                    adminName: parsedData.adminName,
                    adminEmail: parsedData.adminEmail,
                    adminPhone: parsedData.adminPhone,
                    hostelId: parsedData.hostel.hostelId,
                }
            });
            const auth = await tx.auth.update({
                where: {
                    authId: admin?.authId
                },
                data: {
                    userInName: parsedData.adminName,
                    userInPhone: parsedData.adminPhone,
                    userInEmail: parsedData.adminEmail
                }
            })
            return {admin, auth};
        })
        return {
            success: true,
            message: "Admin updated successfully",
            admin: transaction
        }
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

// toggle active status
export const toggleActiveStatus = async (adminId: string) => {
    const isSuperAdmin = await isValidSuperAdmin();
    if (!isSuperAdmin.success) {
        return {
            success: false,
            message: isSuperAdmin.message
        }
    }
    try {
        // find admin through authId
        const admin = await prisma.admin.findUnique({
            where: {
                adminId: adminId
            }
        })
        if (!admin) {
            return {
                success: false,
                message: "Admin not found"
            }
        }

        const auth = await prisma.auth.findUnique({
            where: {
                authId: admin.authId
            }
        })
        if (!auth) {
            return {
                success: false,
                message: "Auth not found"
            }
        }
        const updatedAuth = await prisma.auth.update({
            where: {
                authId: admin.authId
            },
            data: {
                isVerified: !auth.isVerified,
                isRequestApproved: true,
            }
        })
        return {
            success: true,
            message: "Admin status updated successfully",
            admin: updatedAuth
        }
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

// delete admin
export const deleteAdmin = async (adminId: string) => {
    const isSuperAdmin = await isValidSuperAdmin();
    if (!isSuperAdmin.success) {
        return {
            success: false,
            message: isSuperAdmin.message
        }
    }
    try {
        const admin = await prisma.admin.findUnique({
            where: {
                adminId: adminId
            }
        })
        const transaction = await prisma.$transaction([
            prisma.auth.delete({
                where: {
                    authId: admin?.authId
                }
            }),

            prisma.admin.delete({
                where: {
                    adminId: adminId
                }
            })
        ]);

        if (!transaction) {
            return {
                success: false,
                message: "Something went wrong."
            }
        };

        return {
            success: true,
            message: "Admin deleted Successfully"
        }
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: "Something went wrong."
        }
    }
}

// get all admins
export const getAllAdmins = async (currentPage: number = 1, pageSize: number = 10, searchQuery: string = "", status: string = "All") => {
    const isSuperAdmin = await isValidSuperAdmin();
    if (!isSuperAdmin.success) {
        return {
            success: false,
            message: isSuperAdmin.message
        }
    };
    try {
        const baseWhereClause = {
            OR: [
                {
                    adminName: {
                        contains: searchQuery,
                        mode: "insensitive"
                    }
                },
                {
                    adminEmail: {
                        contains: searchQuery,
                        mode: "insensitive"
                    }
                },
                {
                    adminPhone: {
                        contains: searchQuery,
                        mode: "insensitive"
                    }
                }
            ]
        } as Prisma.AdminWhereInput;

        const [admins] = await Promise.all([
            prisma.admin.findMany({
                where: baseWhereClause,
                take: pageSize,
                skip: (currentPage - 1) * pageSize,
                orderBy: {
                    createdAt: "desc"
                },
                include: {
                    hostel: {
                        select: {
                            hostelId: true,
                            hostelName: true,
                            hostelAddress: true
                        }
                    }
                }
            })
        ]);

        // Get auth status for all admins in a single query
        const authIds = admins.map(admin => admin.authId);
        const authStatuses = await prisma.auth.findMany({
            where: {
                authId: {
                    in: authIds
                }
            },
            select: {
                authId: true,
                isVerified: true
            }
        });

        // Create a map of authId to isVerified status
        const authStatusMap = new Map(
            authStatuses.map(auth => [auth.authId, auth.isVerified])
        );

        const adminDetails = admins.map((admin) => {
            const isVerified = authStatusMap.get(admin.authId) ?? false;
            return {
                adminId: admin.adminId,
                adminName: admin.adminName,
                adminEmail: admin.adminEmail,
                adminPhone: admin.adminPhone,
                hostel: {
                    hostelId: admin.hostel.hostelId,
                    hostelName: admin.hostel.hostelName,
                    hostelAddress: admin.hostel.hostelAddress
                },
                status: isVerified ? "Active" : "Inactive"
            };
        });

        // Filter by status if needed
        const filteredAdmins = status !== "All" 
            ? adminDetails.filter(admin => 
                (status === "Active" && admin.status === "Active") || 
                (status === "Inactive" && admin.status === "Inactive")
              )
            : adminDetails;

        return {
            success: true,
            message: "Admins fetched successfully",
            admins: filteredAdmins,
            totalCount: filteredAdmins.length,
            totalPages: Math.ceil(filteredAdmins.length / pageSize)
        };
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: "Something went wrong"
        };
    }
}

export const resetPass = async (adminId: string) => {
    const isSuperAdmin = await isValidSuperAdmin();
    if (!isSuperAdmin.success) {
        return {
            success: false,
            message: isSuperAdmin.message
        }
    }
    try {
        const admin = await prisma.admin.findUnique({
            where: {
                adminId: adminId
            }
        })
        if (!admin) {
            return {
                success: false,
                message: "Admin not found"
            }
        }
        const hashedPassword = await bcrypt.hash(admin.adminPhone, 10);
        const updatedAuth = await prisma.auth.update({
            where: {
                authId: admin.authId
            },
            data: {
                userInPassword: hashedPassword
            }
        })
        return {
            success: true,
            message: "Password reset successfully"
        }   
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: "Something went wrong"
        }
    }   
}   

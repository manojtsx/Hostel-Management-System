"use server"
import prisma from "@/lib/prisma"
import { isValidAdmin } from "@/lib/validation/role-validation"
import { Prisma, Status } from "@prisma/client";
import bcrypt from "bcryptjs";

function generateIDForStudent(studentName: string) {
    // take the first letter of first name , last name of student
    const firstName = studentName.split(" ")[0];
    const lastName = studentName.split(" ")[1];
    const randomDate = new Date().getTime();
    const id = `${firstName.charAt(0)}${lastName.charAt(0)}${randomDate}`;
    return id;
}

export const addStudent = async (data: string) => {
    const isAdmin = await isValidAdmin();
    console.log(isAdmin, "isAdmin");
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to add a student"
        }
    }
    try {
        const parsedData = JSON.parse(data);
        console.log(parsedData, "parsed Data");

        const hashedPassword = await bcrypt.hash(parsedData.studentPhone, 10);

        // create a student
        await prisma.$transaction(async (tx) => {
            const auth = await tx.auth.create({
                data: {
                    userInEmail: parsedData.studentEmail,
                    userInPassword: hashedPassword,
                    userInName: parsedData.studentName,
                    userInPhone: parsedData.studentPhone,
                    role: "Student",
                    hostelId: isAdmin.hostelId as string,
                    academicYear: isAdmin.academicYear as number,
                }
            })
            await tx.hostelStudent.create({
                data: {
                    studentGeneratedId: generateIDForStudent(parsedData.studentName),
                    studentEmail: parsedData.studentEmail,
                    studentPhone: parsedData.studentPhone,
                    studentName: parsedData.studentEmail,
                    studentGender: parsedData.studentGender,
                    studentCheckInDate: new Date(parsedData.studentCheckInDate),
                    studentAddress: parsedData.studentAddress,
                    studentRoomNumber: parsedData.studentRoomNumber,
                    hostelId: isAdmin.hostelId as string,
                    academicYear: isAdmin.academicYear as number,
                    studentGuardianName: parsedData.studentGuardianName,
                    studentGuardianPhone: parsedData.studentGuardianPhone,
                    studentGuardianAddress: parsedData.studentGuardianAddress,
                    studentGuardianRelation: parsedData.studentGuardianRelation,
                    authId: auth.authId
                }
            })
        })
        return {
            success: true,
            message: "Student added successfully."
        }

    } catch (err) {
        console.log(err);
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            return {
                success: false,
                message: "Email or Phone already exists"
            }
        }
        return {
            success: false,
            message: "Error adding student"
        }
    }
}

export const editStudent = async (data: string) => {
    const isAdmin = await isValidAdmin();
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to edit a student"
        }
    }

    try {
        const parsedData = JSON.parse(data);
        await prisma.$transaction(async (tx) => {
            const updatedStudent = await tx.hostelStudent.update({
                where: {
                  studentId : parsedData.studentId
                },
                data: {
                    studentPhone: parsedData.studentPhone,
                    studentName: parsedData.studentName,
                    studentGender: parsedData.studentGender,
                    studentCheckInDate: new Date(parsedData.studentCheckInDate),
                    studentAddress: parsedData.studentAddress,
                    studentRoomNumber: parsedData.studentRoomNumber,
                    studentGuardianName: parsedData.studentGuardianName,
                    studentGuardianPhone: parsedData.studentGuardianPhone,
                    studentGuardianAddress: parsedData.studentGuardianAddress,
                    studentGuardianRelation: parsedData.studentGuardianRelation,
                }
            });
            await tx.auth.update({
                where: {
                    authId: updatedStudent.authId
                },
                data: {
                    userInName: parsedData.studentName,
                    userInPhone: parsedData.studentPhone,
                }
            });

        });

        return {
            success: true,
            message: "Student updated successfully"
        }
    } catch (err) {
        console.error(err);
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            return {
                success: false,
                message: "Error updating student: Email or Phone already exists"
            }
        }
        return {
            success: false,
            message: "Error updating student"
        }
    }
}

export const deleteStudent = async (studentId: string) => {
    const isAdmin = await isValidAdmin();
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to delete a student"
        }
    }

    try {
        await prisma.$transaction(async (tx) => {
            const student = await tx.hostelStudent.findUnique({
                where: {
                   studentId :studentId
                },
                select: {
                    authId: true
                }
            });

            if (!student) {
                throw new Error("Student not found");
            }

            await tx.hostelStudent.delete({
                where: {
                    studentId : studentId
                }
            });

            await tx.auth.delete({
                where: {
                    authId: student.authId
                }
            });
        });

        return {
            success: true,
            message: "Student deleted successfully"
        }
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "Error deleting student"
        }
    }
}

export const toggleStudentStatus = async (studentId: string) => {
    const isAdmin = await isValidAdmin();
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to update student status"
        }
    }

    try {
        const existingStudent = await prisma.hostelStudent.findUnique({
            where : {
                studentId : studentId
            },
            select : {
             status : true
            }
        });
        if(!existingStudent) {
            return {
                success: false,
                message: "Student not found"
            }
        }
        await prisma.hostelStudent.update({
            where: {
               studentId : studentId
            },
            data: {
                status: (existingStudent.status === "active" as Status ? "inactive" : "active") as Status
            }
        });

        return {
            success: true,
            message: `Student status updated to ${status}`
        }
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "Error updating student status"
        }
    }
}
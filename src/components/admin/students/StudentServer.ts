"use server"
import prisma from "@/lib/prisma"
import { isValidAdmin } from "@/lib/validation/role-validation"
import { Prisma } from "@prisma/client";
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




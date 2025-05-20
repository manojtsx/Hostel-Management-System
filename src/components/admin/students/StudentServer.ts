"use server"
import prisma from "@/lib/prisma"
import { isValidAdmin } from "@/lib/validation/role-validation"
import { Prisma, Status } from "@/prisma/generated/prisma";
import bcrypt from "bcryptjs";

// generate id for student
function generateIDForStudent(studentName: string) {
    // take the first letter of first name , last name of student
    const firstName = studentName.split(" ")[0];
    const lastName = studentName.split(" ")[1];
    const randomDate = new Date().getTime();
    const id = `${firstName.charAt(0)}${lastName && lastName.charAt(0)}${randomDate}`;
    return id;
}

// add student
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

        // make first name and last name compulsory check that in studentName
        if(parsedData.studentName.split(" ").length < 2) {
            return {
                success: false,
                message: "First name and last name are compulsory"
            }
        }

        const hashedPassword = await bcrypt.hash(parsedData.studentPhone, 10);

        // check if exising email or phone
        const existing = await prisma.hostelStudent.findFirst({
            where: {
                OR: [
                    {
                        studentEmail: parsedData.studentEmail
                    },
                    {
                        studentPhone: parsedData.studentPhone
                    }
                ],
                hostelId: isAdmin.hostelId as string
            }
        })
        if(existing) {
            return {
                success: false,
                message: "Email or Phone already exists"
            }
        }
        
         // First check if the room has capacity
         const room = await prisma.hostelRoom.findUnique({
            where: {
                roomId: parsedData.studentRoom
            },
            include: {
                students: true,
                temporaryGuests: true
            }
        });

        if (!room) {
            return {
                success: false,
                message: "Room not found"
            }
        }

        // Check room capacity before creating student
        const currentOccupants = (room.students.length || 0) + (room.temporaryGuests.length || 0);
        if (Number(room.roomCapacity) <= currentOccupants) {
            return {
                success: false,
                message: "Room is at full capacity"
            }
        }
        

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

            const student = await tx.hostelStudent.create({
                data: {
                    studentGeneratedId: generateIDForStudent(parsedData.studentName),
                    studentEmail: parsedData.studentEmail,
                    studentPhone: parsedData.studentPhone,
                    studentName: parsedData.studentName,
                    studentGender: parsedData.studentGender,
                    studentCheckInDate: new Date(parsedData.studentCheckInDate),
                    status: parsedData.studentStatus as Status,
                    studentAddress: parsedData.studentAddress,
                    studentRoomNumber: parsedData.studentRoom,
                    hostelId: isAdmin.hostelId as string,
                    academicYear: isAdmin.academicYear as number,
                    studentGuardianName: parsedData.studentGuardianName,
                    studentGuardianPhone: parsedData.studentGuardianPhone,
                    studentGuardianAddress: parsedData.studentGuardianAddress,
                    studentGuardianRelation: parsedData.studentGuardianRelation,
                    authId: auth.authId
                }
            });

            // Now connect the student to the room
            await tx.hostelRoom.update({
                where: {
                    roomId: parsedData.studentRoom
                },
                data: {
                    students: {
                        connect: {
                            studentId: student.studentId
                        }
                    }
                }
            });
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

// get students
export const getStudents = async (currentPage : number, pageSize : number, searchQuery : string, filters : { status : string , startDate : Date , endDate : Date}) => {
    const isAdmin = await isValidAdmin();
    if(!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to get students"
        }
    }
    try{
        console.log(filters, "filters");
        let whereClause : Prisma.HostelStudentWhereInput = {
            hostelId : isAdmin.hostelId as string
        };

        if(searchQuery) {
            whereClause.OR = [
                {
                    studentName: {
                        contains: searchQuery,
                        mode: 'insensitive'
                    }
                },
                {
                    studentEmail: {
                        contains: searchQuery,
                        mode: 'insensitive'
                    }
                },
                {
                    studentPhone: {
                        contains: searchQuery,
                        mode: 'insensitive'
                    }
                },
                {
                    studentGuardianName: {
                        contains: searchQuery,
                        mode: 'insensitive'
                    }
                },
                {
                    studentGuardianPhone: {
                        contains: searchQuery,
                        mode: 'insensitive'
                    }
                },
                {
                    studentGuardianAddress: {
                        contains: searchQuery,
                        mode: 'insensitive'
                    }
                },
                {
                    studentRoomNumber: {
                        contains: searchQuery,
                        mode: 'insensitive'
                    }
                },
                {
                    studentBedNumber: {
                        contains: searchQuery,
                        mode: 'insensitive'
                    }
                },
                {
                    studentGeneratedId: {
                        contains: searchQuery,
                        mode: 'insensitive'
                    }
                }
            ];
        }

        if(filters.status && filters.status !== "All") {
            whereClause.status = filters.status as Status;
        }
        if(filters.startDate) {
            whereClause.studentCheckInDate = {
                gte: filters.startDate
            } as Prisma.DateTimeFilter;
        }
        if(filters.endDate) {
            if (whereClause.studentCheckInDate) {
                (whereClause.studentCheckInDate as Prisma.DateTimeFilter).lte = filters.endDate;
            } else {
                whereClause.studentCheckInDate = {
                    lte: filters.endDate
                } as Prisma.DateTimeFilter;
            }
        }

        const totalStudents = await prisma.hostelStudent.count({
            where: whereClause
        });

        const students = await prisma.hostelStudent.findMany({
            where: whereClause,
            take: pageSize,
            skip: (currentPage - 1) * pageSize,
            orderBy: {
                studentName: "asc"
            }
        });

        // Get all unique room IDs from students
        const roomIds = students
            .map(student => student.studentRoomNumber)
            .filter((id): id is string => id !== null);

        // Fetch all rooms in one query
        const rooms = await prisma.hostelRoom.findMany({
            where: {
                roomId: {
                    in: roomIds
                }
            },
            select: {
                roomId: true,
                roomNumber: true,
                roomType: true,
                roomCapacity: true
            }
        });

        // Create a map of roomId to room data
        const roomMap = new Map(rooms.map(room => [room.roomId, room]));

        // Combine student data with room data
        const studentsWithRooms = students.map(student => ({
            ...student,
            studentStatus: student.status,
            room: student.studentRoomNumber ? roomMap.get(student.studentRoomNumber) : null
        }));

        return {
            success: true,
            message: "Students fetched successfully",
            data: studentsWithRooms,
            total: totalStudents,
            totalPages: Math.ceil(totalStudents / pageSize)
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "Error fetching students"
        };
    }
}

// edit student
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

// delete student
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
                return {
                    success: false,
                    message: "Student not found"
                }
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

// mark as approved
export const markAsApproved = async (studentId: string) => {
    const isAdmin = await isValidAdmin();
    if (!isAdmin) {
        return {
            success: false, 
            message: "You are not authorized to mark a student as approved"
        }
    }
    try {
        await prisma.hostelStudent.update({
            where: {
                studentId: studentId
            },
            data: {
                status: "Approved"
            }
        });

        return {
            success: true,
            message: "Student marked as approved"
        }
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "Error marking student as approved"
        }
    }
}

// mark as rejected
export const markAsRejected = async (studentId: string) => {
    const isAdmin = await isValidAdmin();
    if (!isAdmin) {
        return {
            success: false, 
            message: "You are not authorized to mark a student as rejected"
        }
    }
    try {
        await prisma.hostelStudent.update({
            where: {    
                studentId: studentId
            },
            data: {
                status: "Rejected"
            }
        });     

        return {
            success: true,
            message: "Student marked as rejected"
        }
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "Error marking student as rejected"
        }
    }
}   

// get rooms for the student
export const getAllRooms = async (searchQuery : string) => {
    const isAdmin = await isValidAdmin();
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to get rooms for a student"
        }
    }
    try {
        let whereClause : Prisma.HostelRoomWhereInput = {
            hostelId : isAdmin.hostelId as string
        };
        if(searchQuery) {
            whereClause.roomNumber = {
                contains: searchQuery,
                mode: 'insensitive'
            }
        }
        const rooms = await prisma.hostelRoom.findMany({
            where: whereClause,
            select : {
                roomId : true,
                roomNumber : true,
                roomType : true,
                roomCapacity : true,
            }
        });
        if(!rooms) {
            return {
                success: false,
                message: "Rooms not found"
            }
        }

        return {
            success: true,
            message: "Rooms fetched successfully",
            data: rooms
        }
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "Error fetching rooms for student"
        }
    }
}

export const changeRoom = async (studentId: string, newRoomId: string) => {
    const isAdmin = await isValidAdmin();
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to change student's room"
        }
    }

    try {
        // First check if the new room has capacity
        const newRoom = await prisma.hostelRoom.findUnique({
            where: {
                roomId: newRoomId
            },
            include: {
                students: true,
                temporaryGuests: true
            }
        });

        if (!newRoom) {
            return {
                success: false,
                message: "New room not found"
            }
        }

        // Check room capacity
        const currentOccupants = (newRoom.students.length || 0) + (newRoom.temporaryGuests.length || 0);
        if (Number(newRoom.roomCapacity) <= currentOccupants) {
            return {
                success: false,
                message: "New room is at full capacity"
            }
        }

        // Get the current room of the student
        const student = await prisma.hostelStudent.findUnique({
            where: {
                studentId: studentId
            },
            include: {
                room: true
            }
        });

        if (!student) {
            return {
                success: false,
                message: "Student not found"
            }
        }

        // Update the student's room
        await prisma.$transaction(async (tx) => {
            // Disconnect from current room
            if (student.room) {
                await tx.hostelRoom.update({
                    where: {
                        roomId: student.room.roomId
                    },
                    data: {
                        students: {
                            disconnect: {
                                studentId: studentId
                            }
                        }
                    }
                });
            }

            // Connect to new room
            await tx.hostelRoom.update({
                where: {
                    roomId: newRoomId
                },
                data: {
                    students: {
                        connect: {
                            studentId: studentId
                        }
                    }
                }
            });

            // Update student's room number
            await tx.hostelStudent.update({
                where: {
                    studentId: studentId
                },
                data: {
                    studentRoomNumber: newRoomId
                }
            });
        });

        return {
            success: true,
            message: "Room changed successfully"
        }
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: "Error changing room"
        }
    }
}

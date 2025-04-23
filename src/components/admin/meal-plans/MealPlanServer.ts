"use server"
import prisma from "@/lib/prisma"
import { isValidAdmin } from "@/lib/validation/role-validation"
import { MealType, DayOfWeek, Prisma } from "@prisma/client"

// add meal plan
export const addMealPlan = async (data: string) => {
    const isAdmin = await isValidAdmin()
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to add a meal plan"
        }
    }
    try {
        const parsedData = JSON.parse(data)
        console.log(parsedData, "parsed Data")

        // create a meal plan
        await prisma.mealPlan.create({
            data: {
                title: parsedData.title,
                description: parsedData.description,
                mealType: parsedData.mealType as MealType,
                dayOfWeek: parsedData.dayOfWeek as DayOfWeek,
                menuItems: parsedData.menuItems,
                price: parseFloat(parsedData.price),
                hostelId: isAdmin.hostelId as string,
                authId: isAdmin.authId as string,
                academicYear: isAdmin.academicYear as number,
            }
        })

        return {
            success: true,
            message: "Meal plan added successfully."
        }

    } catch (err) {
        console.log(err)
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            return {
                success: false,
                message: "Error creating meal plan"
            }
        }
        return {
            success: false,
            message: "Error adding meal plan"
        }
    }
}

// get meal plans
export const getMealPlans = async (currentPage: number, pageSize: number, searchQuery: string, filters: { mealType: string, dayOfWeek: string }) => {
    const isAdmin = await isValidAdmin()
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to get meal plans"
        }
    }
    try {
        let whereClause: Prisma.MealPlanWhereInput = {
            hostelId: isAdmin.hostelId as string
        }

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
                }
            ]
        }

        if (filters.mealType && filters.mealType !== "All") {
            whereClause.mealType = filters.mealType as MealType
        }

        if (filters.dayOfWeek && filters.dayOfWeek !== "All") {
            whereClause.dayOfWeek = filters.dayOfWeek as DayOfWeek
        }

        const totalMealPlans = await prisma.mealPlan.count({
            where: whereClause
        })

        const mealPlans = await prisma.mealPlan.findMany({
            where: whereClause,
            take: pageSize,
            skip: (currentPage - 1) * pageSize,
            orderBy: {
                createdAt: "desc"
            }
        })

        return {
            success: true,
            message: "Meal plans fetched successfully",
            data: mealPlans,
            total: totalMealPlans,
            totalPages: Math.ceil(totalMealPlans / pageSize)
        }
    } catch (err) {
        console.error(err)
        return {
            success: false,
            message: "Error fetching meal plans"
        }
    }
}

// edit meal plan
export const editMealPlan = async (data: string) => {
    const isAdmin = await isValidAdmin()
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to edit a meal plan"
        }
    }

    try {
        const parsedData = JSON.parse(data)
        
        const updatedMealPlan = await prisma.mealPlan.update({
            where: {
                mealPlanId: parsedData.mealPlanId
            },
            data: {
                title: parsedData.title,
                description: parsedData.description,
                mealType: parsedData.mealType as MealType,
                dayOfWeek: parsedData.dayOfWeek as DayOfWeek,
                menuItems: parsedData.menuItems,
                price: parseFloat(parsedData.price),
                isActive: parsedData.isActive
            }
        })

        return {
            success: true,
            message: "Meal plan updated successfully",
            data: updatedMealPlan
        }
    } catch (err) {
        console.error(err)
        return {
            success: false,
            message: "Error updating meal plan"
        }
    }
}

// delete meal plan
export const deleteMealPlan = async (mealPlanId: string) => {
    const isAdmin = await isValidAdmin()
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to delete a meal plan"
        }
    }

    try {
        await prisma.mealPlan.delete({
            where: {
                mealPlanId: mealPlanId
            }
        })

        return {
            success: true,
            message: "Meal plan deleted successfully"
        }
    } catch (err) {
        console.error(err)
        return {
            success: false,
            message: "Error deleting meal plan"
        }
    }
}

// toggle meal plan status
export const toggleMealPlanStatus = async (mealPlanId: string, isActive: boolean) => {
    const isAdmin = await isValidAdmin()
    if (!isAdmin) {
        return {
            success: false,
            message: "You are not authorized to update meal plan status"
        }
    }

    try {
        const updatedMealPlan = await prisma.mealPlan.update({
            where: {
                mealPlanId: mealPlanId
            },
            data: {
                isActive: isActive
            }
        })

        return {
            success: true,
            message: "Meal plan status updated successfully",
            data: updatedMealPlan
        }
    } catch (err) {
        console.error(err)
        return {
            success: false,
            message: "Error updating meal plan status"
        }
    }
} 
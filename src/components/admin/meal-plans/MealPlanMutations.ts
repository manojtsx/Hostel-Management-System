import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addMealPlan, deleteMealPlan, editMealPlan, toggleMealPlanStatus } from "./MealPlanServer"
import { toast } from "sonner"

export default function useMealPlanMutations() {
    const queryClient = useQueryClient()
    
    const { mutateAsync: createMealPlan, isPending: isCreatingMealPlan } = useMutation({
        mutationFn: async (data: string) => {
            return await addMealPlan(data)
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success("Meal plan created successfully.")
                queryClient.invalidateQueries({ queryKey: ["meal-plans"] })
            } else {
                toast.error(data.message)
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const { mutateAsync: updateMealPlan, isPending: isUpdatingMealPlan } = useMutation({
        mutationFn: async (data: string) => {
            return await editMealPlan(data)
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success("Meal plan updated successfully.")
                queryClient.invalidateQueries({ queryKey: ["meal-plans"] })
            } else {
                toast.error(data.message)
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const { mutateAsync: removeMealPlan, isPending: isRemovingMealPlan } = useMutation({
        mutationFn: async (mealPlanId: string) => {
            return await deleteMealPlan(mealPlanId)
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success("Meal plan deleted successfully.")
                queryClient.invalidateQueries({ queryKey: ["meal-plans"] })
            } else {
                toast.error(data.message)
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const { mutateAsync: changeMealPlanStatus, isPending: isUpdatingMealPlanStatus } = useMutation({
        mutationFn: async ({ mealPlanId, isActive }: { mealPlanId: string, isActive: boolean }) => {
            return await toggleMealPlanStatus(mealPlanId, isActive)
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success("Meal plan status updated successfully.")
                queryClient.invalidateQueries({ queryKey: ["meal-plans"] })
            } else {
                toast.error(data.message)
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return {
        createMealPlan,
        isCreatingMealPlan,
        updateMealPlan,
        isUpdatingMealPlan,
        removeMealPlan,
        isRemovingMealPlan,
        changeMealPlanStatus,
        isUpdatingMealPlanStatus
    }
} 
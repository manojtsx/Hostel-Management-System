import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHostel, deleteHostel, editHostel } from "./HostelServerAction";
import { toast } from "sonner";

export const useCreateHostel = () => {
    const queryClient = useQueryClient();
    const { mutateAsync: addHostel, isPending: isAddingHostel } = useMutation({
        mutationFn: async (data: string) => {
            return await createHostel(data);
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.message);
                queryClient.invalidateQueries({ queryKey: ["hostels"] });
            } else {
                toast.error(data.message);
            }
        },
        onError: (error) => {
            console.log(error);
            toast.error("Something went wrong");
        }
    });

    const { mutateAsync: updateHostel, isPending: isUpdatingHostel } = useMutation({
        mutationFn: async (data: string) => {
            return await editHostel(data);
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.message);
                queryClient.invalidateQueries({ queryKey: ["hostels"] });
            } else {
                toast.error(data.message);
            }
        },
        onError: (error) => {
            console.log(error);
            toast.error("Something went wrong");
        }
    });

    const { mutateAsync: removeHostel, isPending: isRemovingHostel } = useMutation({
        mutationFn: async (hostelId: string) => {
            return await deleteHostel(hostelId);
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.message);
                queryClient.invalidateQueries({ queryKey: ["hostels"] });
            } else {
                toast.error(data.message);
            }
        },
        onError: (error) => {
            console.log(error);
            toast.error("Something went wrong");
        }
    });

    return { addHostel, isAddingHostel, updateHostel, isUpdatingHostel, removeHostel, isRemovingHostel };
}

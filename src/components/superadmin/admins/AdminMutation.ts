import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdmin, deleteAdmin, editAdmin, toggleActiveStatus } from "./AdminServerAction";
import { toast } from "sonner";

export const useCreateAdmin = () => {
    const queryClient = useQueryClient();
    const { mutateAsync: addAdmin, isPending: isCreatingAdmin } = useMutation({
        mutationFn: async(data: string) => {
            return await createAdmin(data);
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.message);
                queryClient.invalidateQueries({ queryKey: ["admins"] });
            } else {
                toast.error(data.message);
            }   
        },
        onError: (error) => {
            console.log(error);
            toast.error("Something went wrong");
        }
    });

    const {mutateAsync : updateAdmin, isPending : isUpdatingAdmin} = useMutation({
        mutationFn : async(data : string) => {
            return await editAdmin(data);
        },
        onSuccess : (data) => {
            if(data.success){
                queryClient.invalidateQueries({queryKey : ['admins']});
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        },
        onError : (error) => {
            console.log(error);
            toast.error("Something went wrong");
        }
    });

    const {mutateAsync : removeAdmin, isPending : isRemovingAdmin} = useMutation({
        mutationFn : async(adminId : string) => {
            return await deleteAdmin(adminId)
        },
        onSuccess : (data)=> {
            if(data.success){
                toast.success(data.message);
                queryClient.invalidateQueries({queryKey : ['admins']})
            }else{
                toast.error(data.message)
            }
        },
        onError : (error)=> {
            console.log(error);
            toast.error("Something went wrong.")
        }
    });

    const {mutateAsync : toggleStatus , isPending : isTogglingStatus} = useMutation({
        mutationFn : async(adminId : string)=> {
            return await toggleActiveStatus(adminId);
        },
        onSuccess : (data)=>{
            if(data.success){
                toast.success(data.message);
                queryClient.invalidateQueries({queryKey : ['admins']})
            }else{
                console.log(data);
                toast.error(data.message)
            }   
        },
        onError : (error) => {
            console.log(error);
            toast.error("Something went wrong.")
        }
    })
    return { addAdmin, isCreatingAdmin, updateAdmin, isUpdatingAdmin, removeAdmin, isRemovingAdmin, toggleStatus, isTogglingStatus};
}

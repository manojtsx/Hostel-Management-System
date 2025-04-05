import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { registerHostelAdmin, registerSuperAdmin } from "./RegisterServerAction";
import { toast } from "sonner";
export const useRegisterSuperAdmin = () => {
    const queryClient = useQueryClient();

    const {mutateAsync : mutateSuperAdmin} = useMutation({
        mutationFn : async (data : string)=>{
            return await registerSuperAdmin(data);
        },
        onSuccess : (data) => {
            if(data.success){
                toast.success(data.message);
                queryClient.invalidateQueries({queryKey : ["superAdmin"]})
            }else{
                toast.error(data.message);
            }

        },
        onError : (error) => {
            toast.error(error.message);
        }
    })

    const {mutateAsync : mutateHostelAdmin} = useMutation({
        mutationFn : async (data : string)=>{
            return await registerHostelAdmin(data);
        },
        onSuccess : (data) => {
            if(data.success){
                toast.success(data.message);
                queryClient.invalidateQueries({queryKey : ["admins"]})
            }else{
                toast.error(data.message);
            }
        }   ,
        onError : (error) => {
            toast.error(error.message);
        }
    })  

    return {mutateSuperAdmin, mutateHostelAdmin}
}

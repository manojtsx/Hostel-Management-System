import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveSystemSettings } from "./SettingsServer";
import { toast } from "sonner";

export const useSaveSystemSettings = () => {
    const queryClient = useQueryClient();
    const {mutateAsync : saveSettings, isPending} = useMutation({
        mutationFn : async (data : string) => {
            return await saveSystemSettings(data);
        },
        onSuccess : (data) => {
            if(data.success){
                toast.success(data.message);
                queryClient.invalidateQueries({queryKey : ["systemSettings"]});
            }else{
                toast.error(data.message);
            }
        },
        onError : (error) => {
            toast.error(error.message);
        }
    })  

    return {saveSettings, isPending};
}
import {useMutation }from "@tanstack/react-query";
import { addRoom } from "./RoomServer";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function useRoomMutations(){
    const queryClient = useQueryClient();
    const {mutateAsync : createRoom, isPending : isCreatingRoom} = useMutation({
        mutationFn : async(data : string) => {
            return await addRoom(data)
        },
        onSuccess : (data)=>{
            if(data.success){
                toast.success("Room created successfully.")
                queryClient.invalidateQueries({queryKey : ["rooms"]})
            } else {
                toast.error(data.message)
            }
        },
        onError : (error)=>{
            toast.error(error.message)
        }
    });
    return {createRoom, isCreatingRoom}
}
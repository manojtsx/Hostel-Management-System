import {useMutation }from "@tanstack/react-query";
import { addRoom } from "./RoomServer";
import { toast } from "sonner";

export default function useRoomMutations(){
    const {mutateAsync : createRoom, isPending : isCreatingStudent} = useMutation({
        mutationFn : async(data : string) => {
            return await addRoom(data)
        },
        onSuccess : (data)=>{
            if(data.success){
                toast.success("Room created successfully.")
            } else {
                toast.error(data.message)
            }
        },
        onError : (error)=>{
            toast.error(error.message)
        }
    });
    return {createRoom, isCreatingStudent}
}
import {useMutation }from "@tanstack/react-query";
import { addRoom, editRoom, deleteRoom } from "./RoomServer";
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

    const {mutateAsync : updateRoom, isPending : isUpdatingRoom} = useMutation({
        mutationFn : async(data : string) => {
            return await editRoom(data)
        },
        onSuccess : (data)=> {
            if(data.success){
                toast.success(data.message)
                queryClient.invalidateQueries({queryKey : ["rooms"]})
            } else {
                toast.error(data.message)
            }
        },
        onError : (error)=> {
            toast.error(error.message)
        }   
    })

    const {mutateAsync : removeRoom, isPending : isRemovingRoom} = useMutation({
        mutationFn : async(roomId : string) => {
            return await deleteRoom(roomId)
        },
        onSuccess : (data)=> {
            if(data.success){
                toast.success(data.message)
                queryClient.invalidateQueries({queryKey : ["rooms"]})
            } else {
                toast.error(data.message)
            }
        },
        onError : (error)=> {
            toast.error(error.message)
        }
    })

    return {createRoom, isCreatingRoom, updateRoom, isUpdatingRoom, removeRoom, isRemovingRoom}
}
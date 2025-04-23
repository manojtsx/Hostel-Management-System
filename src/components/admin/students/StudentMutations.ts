import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addStudent, deleteStudent, markAsApproved, markAsRejected } from "./StudentServer";
import { toast } from "sonner";

export default function useStudentMutations(){
    const queryClient = useQueryClient();
    const {mutateAsync : createStudent, isPending : isCreatingStudent } = useMutation({
        mutationFn : async(data : string) => {
            return await addStudent(data)
        },
        onSuccess : (data)=> {
            if(data.success){
                toast.success("Student created successfully.")
                queryClient.invalidateQueries({queryKey : ["students"]})
            }else{
                toast.error(data.message)
            }        
        },
        onError : (error)=> {
            toast.error(error.message)
        }
    });

    const {mutateAsync :approveStudent, isPending : isApprovingStudent} = useMutation({
        mutationFn : async(studentId : string) => {
            return await markAsApproved(studentId)
        },
        onSuccess : (data)=> {
            if(data.success){
                toast.success("Student marked as approved.")
                queryClient.invalidateQueries({queryKey : ["students"]})
            }else{
                toast.error(data.message)
            }
        },
        onError : (error)=> {
            toast.error(error.message)
        }
    })

    const {mutateAsync : rejectStudent, isPending : isRejectingStudent} = useMutation({
        mutationFn : async(studentId : string) => {
            return await markAsRejected(studentId)
        },
        onSuccess : (data)=> {
            if(data.success){
                toast.success("Student marked as rejected.")
                queryClient.invalidateQueries({queryKey : ["students"]})
            }else{
                toast.error(data.message)
            }
        },
        onError : (error)=> {
            toast.error(error.message)
        }
    })  

    const {mutateAsync : removeStudent, isPending : isRemovingStudent} = useMutation({
        mutationFn : async(studentId : string) => {
            return await deleteStudent(studentId)
        },
        onSuccess : (data)=> {
            if(data.success){
                toast.success("Student deleted successfully.")
                queryClient.invalidateQueries({queryKey : ["students"]})
            }else{
                toast.error(data.message)
            }
        },
        onError : (error)=> {
            toast.error(error.message)
        }
    })

    return {createStudent, isCreatingStudent, approveStudent, isApprovingStudent, rejectStudent, isRejectingStudent, removeStudent, isRemovingStudent}
}
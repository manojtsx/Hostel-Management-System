import { useMutation } from "@tanstack/react-query";
import { addStudent } from "./StudentServer";
import { toast } from "sonner";

export default function useStudentMutations(){
    const {mutateAsync : createStudent, isPending : isCreatingStudent } = useMutation({
        mutationFn : async(data : string) => {
            return await addStudent(data)
        },
        onSuccess : (data)=> {
            if(data.success){
                toast.success("Student created successfully.")
            }else{
                toast.error(data.message)
            }        
        },
        onError : (error)=> {
            toast.error(error.message)
        }
    });

    return {createStudent, isCreatingStudent}
}
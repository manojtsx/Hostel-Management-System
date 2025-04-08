"use server"
import prisma from "@/lib/prisma";
import { isValidSuperAdmin } from "@/lib/validation/role-validation";

export async function getSystemSettings() {
    const isSuperAdmin = await isValidSuperAdmin();
    if(!isSuperAdmin) {
        return {
            success: false,
            message: "You are not authorized to access this page",
        }
    }

    try{
        const system = await prisma.system.findFirst();
        return {
            success : true,
            data : system
        }
    }catch(err) {
        console.log(err);
        return {
            success : false,
            message : "Something went wrong."
        }
    }
}

export async function saveSystemSettings(data : string) {
    const isSuperAdmin = await isValidSuperAdmin();
    if(!isSuperAdmin) {
        return {
            success : false,
            message : "You are not authorized to access this page",
        }
    }

    try{
        // find existing data first
        const parsedData = JSON.parse(data);
        if(!parsedData.systemId){
            await prisma.system.create({
                data : {
                    systemName : parsedData.systemName,
                    systemEmail : parsedData.systemEmail,
                    sytemMaintenanceMode : parsedData.sytemMaintenanceMode,
                    SMTPHost : parsedData.SMTPHost,
                    SMTPPort : parseInt(parsedData.SMTPPort),
                    SMTPUser : parsedData.SMTPUser,
                    SMTPPassword : parsedData.SMTPPassword,
                    passwordPolicy : parsedData.passwordPolicy,
                    twoFactorAuth : parsedData.twoFactorAuth,
                    sessionDuration : parseInt(parsedData.sessionDuration),
                    academicYear : isSuperAdmin.academicYear as number
                }
            })
        }else{
            await prisma.system.update({
                where : {
                    systemId : parsedData.systemId
                },
                data : {
                    systemName : parsedData.systemName,
                    systemEmail : parsedData.systemEmail,
                    sytemMaintenanceMode : parsedData.sytemMaintenanceMode,
                    SMTPHost : parsedData.SMTPHost,
                    SMTPPort : parseInt(parsedData.SMTPPort),
                    SMTPUser : parsedData.SMTPUser,
                    SMTPPassword : parsedData.SMTPPassword,
                    passwordPolicy : parsedData.passwordPolicy,
                    twoFactorAuth : parsedData.twoFactorAuth,
                    sessionDuration : parseInt(parsedData.sessionDuration),
                }
            })  
        }
       
        return {    
            success : true,
            message : "System settings saved successfully"
        }
    }catch(err) {
        console.log(err);
        return {
            success : false,
            message : "Something went wrong."
        }
    }
}

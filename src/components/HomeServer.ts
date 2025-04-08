"use server"
import prisma from "@/lib/prisma";

export async function getSystemSettings() {
    const systemSettings = await prisma.system.findFirst({});
    console.log(systemSettings);
    return {
        systemName : systemSettings?.systemName,
        systemEmail : systemSettings?.systemEmail,
        sytemMaintenanceMode : systemSettings?.sytemMaintenanceMode,
    };
}

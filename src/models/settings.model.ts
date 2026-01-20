import z from "zod";

export const settingsSchema = z.object({
    startHours: z.date(),

    lateTollerance: z.number()
        .positive()
})
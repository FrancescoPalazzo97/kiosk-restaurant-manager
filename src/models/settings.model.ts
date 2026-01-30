import z from "zod";

export const settingsSchema = z.object({
    startHours: z.string(),

    soonTollerance: z.number()
        .positive(),

    lateTollerance: z.number()
        .positive()
});

export type Settings = z.infer<typeof settingsSchema>;
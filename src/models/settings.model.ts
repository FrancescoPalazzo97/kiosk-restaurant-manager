import z from "zod";

export const settingsSchema = z.object({
    startHours: z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
            message: "Invalid time format, expected HH:MM",
        }),

    soonTolerance: z.number().positive().int(),

    lateTolerance: z.number().positive().int(),
});

export type Settings = z.infer<typeof settingsSchema>;

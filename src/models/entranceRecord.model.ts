import z from "zod";

export const entranceRecordSchema = z.object({
    id: z.uuid()
        .default(() => crypto.randomUUID()),

    employeeId: z.uuid(),

    date: z.date()
})
import z from "zod";
import { getRandomPinCode } from "../lib/utility";

export const employeesSchema = z.object({
    id: z.uuid()
        .default(() => crypto.randomUUID()),

    fullname: z.string()
        .trim()
        .min(2, "Il nome è troppo breve!")
        .max(50, "Il nome è troppo lungo!"),

    pinCode: z.string()
        .default(() => getRandomPinCode(4)),

    createdAt: z.date()
        .default(() => new Date())
});

export type Employee = z.infer<typeof employeesSchema>;

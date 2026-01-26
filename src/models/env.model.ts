import z from "zod";

export const envSchema = z.object({
    VITE_ADMIN_PASSWORD: z.string().default('Admin1234')
})
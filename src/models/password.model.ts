import z from "zod";

const passwordSchema = z.object({
    adminpassword: z.string(),

    inputPassword: z.string()
})
import {z} from "zod"

export const registerUserValidationSchema = z.object({
    username: z.string().min(5),
    email: z.email(),
    password: z.string().min(8).regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
})

export const loginUserValidationSchema = z.object({
    email: z.email(),
    password: z.string().min(8).regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
})
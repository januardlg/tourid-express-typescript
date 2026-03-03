import { z } from "zod"

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).*$/

const passwordLengthErrorMessage = 'too short (minimal character is 8)'
const passwordCharacterErrorMessage = "must contain at least one uppercase letter and one number."

const emailAddressErrorMessage = 'must be a valid email address'

export const registerUserValidationSchema = z.object({
    username: z.string().min(5, 'too short (minimal character is 5)').max(20, 'too long (maximal character 20)'),
    email: z.email(emailAddressErrorMessage),
    password: z.string().min(8, passwordLengthErrorMessage).regex(passwordRegex, passwordCharacterErrorMessage)
})

export const loginUserValidationSchema = z.object({
    email: z.email(emailAddressErrorMessage),
    password: z.string().min(8, passwordLengthErrorMessage).regex(passwordRegex, passwordCharacterErrorMessage)
})
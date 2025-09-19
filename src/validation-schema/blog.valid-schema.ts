import { z } from "zod";

export const createBlogPayloadSchema = z.object({
    title: z.string(),
    blog: z.string(),
    images: z.string(),
    authorId: z.number()
})

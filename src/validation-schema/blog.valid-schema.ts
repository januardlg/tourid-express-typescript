import { z } from "zod";

export const createBlogPayloadSchema = z.object({
    title: z.string(),
    blog: z.string(),
    images: z.string(),
    author_id: z.number()
})

// "title":"Perjalanan Sibolga",
//     "blog":"keliling laut dan lain...",
//     "images":"base64",
//     "author_id":1
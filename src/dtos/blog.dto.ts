import type { z } from "zod"
import type { createBlogPayloadSchema } from "../validation-schema/blog.valid-schema.js"

export interface BlogDataDTO {
    blog_id: number,
    title: string,
    blog: string,
    images: string | null,
    created_at: Date,
    updated_at: Date,
    author: any
}


// export interface CreateBlogPayloadDTO {
//     title: string,
//     blog: string,
//     images: string,
//     author_id: number
// }

export type CreateBlogPayloadDTO = z.infer<typeof createBlogPayloadSchema>

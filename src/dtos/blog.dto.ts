import type { z } from "zod"
import type { createBlogPayloadSchema } from "../validation-schema/blog.valid-schema.js"

export interface BlogDataDTO {
    blogId: number,
    title: string,
    blog: string,
    images: string | null,
    createdAt: Date,
    updatedAt: Date,
    author: any
}

export type CreateBlogPayloadDTO = z.infer<typeof createBlogPayloadSchema>

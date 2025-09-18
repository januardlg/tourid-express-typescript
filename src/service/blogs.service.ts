import { PrismaClient } from "../../generated/prisma/index.js"
import { type BlogDataDTO, type CreateBlogPayloadDTO } from "../dtos/blog.dto.js";
import { createError } from "../utils/handle-response.js";

const prisma = new PrismaClient();

const BlogsService = () => {

    const getAllBlogs = async () => {
        const result = await prisma.blogs.findMany({
            where: {
                users: {
                    isNot: null
                },
            },
            select: {
                blog_id: true,
                title: true,
                blog: true,
                images: true,
                created_at: true,
                updated_at: true,
                users: {
                    select: {
                        username: true
                    }
                }
            },
        })

        const convertedResult: BlogDataDTO[] = result.map((blog) => {
            return {
                blog_id: blog.blog_id,
                title: blog.title,
                blog: blog.blog,
                images: blog.images,
                created_at: blog.created_at,
                updated_at: blog.updated_at,
                author: blog.users?.username
            }
        })

        return convertedResult
    }

    const getDetailBlog = async (blogId: number) => {

        const result = await prisma.blogs.findUnique({
            where: {
                blog_id: blogId
            },
            select: {
                blog_id: true,
                title: true,
                blog: true,
                images: true,
                created_at: true,
                updated_at: true,
                users: {
                    select: {
                        username: true
                    }
                }
            },
        })

        if (!result) {
            throw createError("No data found", 404);
        }

        const convertResul: BlogDataDTO = {
            blog_id: result.blog_id,
            title: result.title,
            blog: result.blog,
            images: result.images,
            created_at: result.created_at,
            updated_at: result.updated_at,
            author: result?.users?.username
        }
        return convertResul
    }


    const addBlog = async (BlogPayload: CreateBlogPayloadDTO) => {
        const result = await prisma.blogs.create({
            data: {
                title: BlogPayload.title,
                blog: BlogPayload.blog,
                images: BlogPayload.images,
                author_id: BlogPayload.author_id
            }
        })

        if (!result) {
            throw createError("Failed add blog", 404);
        }
        return result
    }


    const editBlog = async (BlogPayload: CreateBlogPayloadDTO, blogId: number) => {

        const result = await prisma.blogs.update({
            where: { blog_id: blogId },
            data: {
                title: BlogPayload.title,
                blog: BlogPayload.blog,
                images: BlogPayload.images,
                author_id: BlogPayload.author_id
            }
        })

        if (!result) {
            throw createError("Failed edit blog", 404);
        }
        return result
    }



    const deleteBlog = async (blogId: number) => {

        const result = await prisma.blogs.delete({
            where: {
                blog_id: blogId
            }
        })

        if (!result) {
            throw createError("Failed delete blog", 404);
        }
        return result
    }

    return { getAllBlogs, getDetailBlog, addBlog, editBlog, deleteBlog }
}

export default BlogsService
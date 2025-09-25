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
                blogId: blog.blog_id,
                title: blog.title,
                blog: blog.blog,
                images: blog.images,
                createdAt: blog.created_at,
                updatedAt: blog.updated_at,
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
            blogId: result.blog_id,
            title: result.title,
            blog: result.blog,
            images: result.images,
            createdAt: result.created_at,
            updatedAt: result.updated_at,
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
                author_id: BlogPayload.authorId
            }
        })

        return result
    }


    const editBlog = async (BlogPayload: CreateBlogPayloadDTO, blogId: number) => {

        const result = await prisma.blogs.update({
            where: { blog_id: blogId },
            data: {
                title: BlogPayload.title,
                blog: BlogPayload.blog,
                images: BlogPayload.images,
                author_id: BlogPayload.authorId
            }
        })

        return result
    }



    const deleteBlog = async (blogId: number) => {

        const result = await prisma.blogs.delete({
            where: {
                blog_id: blogId
            }
        })

        return result
    }

    return { getAllBlogs, getDetailBlog, addBlog, editBlog, deleteBlog }
}

export default BlogsService
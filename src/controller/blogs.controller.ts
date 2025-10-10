import type { Request, Response, NextFunction } from "express";
// import BlogsService from "../service/blogs.service.js";
import { BlogsService } from "../service/blogs.service.js";
import { createError, createResponse } from "../utils/handle-response.js";
import type { CreateBlogPayloadDTO } from "../dtos/blog.dto.js";
import { Prisma } from "../../generated/prisma/index.js";


export const getAllBlogsController = async (req: Request, res: Response, next: NextFunction) => {

    const getAllBlogs = BlogsService.getAllBlogs

    try {
        const blogs = await getAllBlogs()
        res.status(200).json(createResponse(200, "success", "succes get blogs", blogs))

    } catch (error) {
        next(error)
    }
}

export const getDetailBlogController = async (req: Request, res: Response, next: NextFunction) => {
    const { blogId } = req.params

    const getDetailBlog = BlogsService.getDetailBlog

    const id = parseInt(blogId ?? "", 10)

    try {
        const detailBlog = await getDetailBlog(id)
        res.status(200).json(createResponse(200, "success", "succes get blog detail", detailBlog))

    } catch (error) {
        next(error)
    }
}

export const addBlogController = async (req: Request, res: Response, next: NextFunction) => {

    const addBlog = BlogsService.addBlog

    try {
        const payload: CreateBlogPayloadDTO = req.body
        const resultCreate = await addBlog(payload)
        res.status(200).json(createResponse(200, 'success', 'success add a blog', resultCreate));
    } catch (error) {
        next(error)
    }
}



export const editBlogController = async (req: Request, res: Response, next: NextFunction) => {

    const editBlog = BlogsService.editBlog

    try {
        const payload: CreateBlogPayloadDTO = req.body
        const blogId: number = parseInt(req.params.blogId ?? "", 10)


        const resultUpdate = await editBlog(payload, blogId)
        res.status(200).json(createResponse(200, 'success', 'success edit a blog', resultUpdate));

    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            throw createError("User not found", 404);
        }
        next(error)
    }

}


export const deleteBlogController = async (req: Request, res: Response, next: NextFunction) => {

    const deleteBlog = BlogsService.deleteBlog

    const { blogId } = req.params

    const id = parseInt(blogId ?? "", 10)

    try {
        const resultDelete = await deleteBlog(id)
        res.status(200).json(createResponse(200, 'success', 'success delete a blog', resultDelete));

    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            throw createError("User not found", 404);
        }
        next(error)
    }

}


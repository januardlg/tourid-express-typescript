import type { Request, Response, NextFunction } from "express";
import BlogsService from "../service/blogs.service.js";
import { createError, createResponse } from "../utils/handle-response.js";
import type { CreateBlogPayloadDTO } from "../dtos/blog.dto.js";


export const getAllBlogsController = async (req: Request, res: Response, next: NextFunction) => {

    const { getAllBlogs } = BlogsService()

    try {
        const blogs = await getAllBlogs()
        res.json(createResponse(200, "success", "succes get blogs", blogs))

    } catch (error) {
        next(error)
    }
}

export const getDetailBlogController = async (req: Request, res: Response, next: NextFunction) => {
    const { blogId } = req.params

    const { getDetailBlog } = BlogsService()

    const id = parseInt(blogId ?? "", 10)

    try {
        const detailBlog = await getDetailBlog(id)
        res.json(createResponse(200, "success", "succes get blog detail", detailBlog))

    } catch (error) {
        next(error)
    }
}

export const addBlogController = async (req: Request, res: Response, next: NextFunction) => {

    const { addBlog } = BlogsService()

    try {
        const payload: CreateBlogPayloadDTO = req.body
        const resultCreate = await addBlog(payload)
        res.json(createResponse(200, 'success', 'success add a blog', resultCreate));
    } catch (error) {
        next(error)
    }
}



export const editBlogController = async (req: Request, res: Response, next: NextFunction) => {

    const { editBlog } = BlogsService()

    try {
        const payload: CreateBlogPayloadDTO = req.body
        const blogId: number = parseInt(req.params.blogId ?? "", 10)


        const resultUpdate = await editBlog(payload, blogId)
        res.json(createResponse(200, 'success', 'success edit a blog', resultUpdate));

    } catch (error) {
        next(error)
    }

}


export const deleteBlogController = async (req: Request, res: Response, next: NextFunction) => {

    const { deleteBlog } = BlogsService()

    const { blogId } = req.params

    const id = parseInt(blogId ?? "", 10)

    try {
        const resultDelete = await deleteBlog(id)
        res.json(createResponse(200, 'success', 'success delete a blog', resultDelete));

    } catch (error) {
        next(error)
    }

}


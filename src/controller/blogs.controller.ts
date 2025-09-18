import type { Request, Response, NextFunction } from "express";
import BlogsService from "../service/blogs.service.js";
import { createResponse } from "../models/response.js";


export const getAllBlogs = async (req: Request, res: Response, next: NextFunction) => {

    const { getAllBlogs } = BlogsService()

    try {
        const blogs = await getAllBlogs()
        res.json(createResponse(200, "success", "succes get blogs", blogs))

    } catch (error) {
        next(error)
    }
}

export const getDetailBlog = async (req: Request, res: Response, next: NextFunction) => {
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
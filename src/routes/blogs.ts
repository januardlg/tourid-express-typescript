import { Router } from "express";
import { PrismaClient } from "../../generated/prisma/client.js";
import { getAllBlogs, getDetailBlog } from "../controller/blogs.controller.js";

const prisma = new PrismaClient();

const router = Router()

// router.get("/", async (req, res) => {
//     try {

//         const result = await prisma.blogs.findMany({
//             where: {
//                 users: {
//                     isNot: null
//                 }
//             },
//             select: {
//                 blog_id: true,
//                 title: true,
//                 blog: true,
//                 images: true,
//                 created_at: true,
//                 updated_at: true,
//                 users: {
//                     select: {
//                         username: true
//                     }
//                 }
//             },
//         })
//         console.log('result', result)
//         res.json(createResponse(200, "success", "succes get blogs", result));
//     } catch (err) {
//         res.status(500).json(createResponse(500, "error", err as any));
//     }
// });

router.get("/", getAllBlogs)
router.get("/:blogId", getDetailBlog)

export default router
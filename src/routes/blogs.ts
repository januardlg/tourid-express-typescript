import { Router } from "express";
import { PrismaClient } from "../../generated/prisma/client.js";
import { addBlogController, deleteBlogController, editBlogController, getAllBlogsController, getDetailBlogController } from "../controller/blogs.controller.js";
import { validateData } from "../middlewares/validation-payload.js";
import { createBlogPayloadSchema } from "../validation-schema/blog.valid-schema.js";

const prisma = new PrismaClient();

const router = Router()

router.get("/", getAllBlogsController)
router.get("/:blogId", getDetailBlogController)
router.post("/", validateData(createBlogPayloadSchema), addBlogController)
router.put("/:blogId", validateData(createBlogPayloadSchema), editBlogController)
router.delete("/:blogId", deleteBlogController)

export default router
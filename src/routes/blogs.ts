import { Router } from "express";

// controller
import { addBlogController, deleteBlogController, editBlogController, getAllBlogsController, getDetailBlogController } from "../controller/blogs.controller.js";

// validation request body
import { validateData } from "../middlewares/validation-payload.js";
import { createBlogPayloadSchema } from "../validation-schema/blog.valid-schema.js";


const router = Router()

/**
 * @swagger
 * tags: 
 *  name: Blogs
 *  description: Blogs managing API
 * /blogs:
 *  get:
 *      summary: Retrieve a list of blogs
 *      tags: [Blogs]
 *      responses:
 *       200:
 *         description: The list of the blogs
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/BaseResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                      type: array
 *                      items:
 *                       $ref: '#/components/schemas/BlogResponse'
 *       500:
 *         description: internal server error
 *  post:
 *      summary: Create a blog
 *      tags: [Blogs]
 *      requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/BlogCreate'
 *      responses:
 *       200:
 *         description: The list of the blogs
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/BaseResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/BlogResponse'
 *       400:
 *         description: invalid request body
 *       500:
 *         description: internal server error
 * 
 * 
 * /blogs/{id}:
 *  get:
 *      summary: Retrieve a list of blogs
 *      tags: [Blogs]
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *      responses:
 *       200:
 *         description: The list of the blogs
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/BaseResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/BlogResponse'
 *       404:
 *         description: data not found
 *       500:
 *         description: internal server error
 *  put:
 *      summary: Update a blog
 *      tags: [Blogs]
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id 
 *      requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/BlogCreate'
 *      responses:
 *       200:
 *         description: The list of the blogs
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/BaseResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/BlogResponse'
 *       400:
 *         description: invalid request body 
 *       404:
 *         description: data not found
 *       500:
 *         description: internal server error
 *  delete:
 *      summary: Delete a blog
 *      tags: [Blogs]
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *      responses:
 *       200:
 *         description: The list of the blogs
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/BaseResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/BlogResponse'
 *       404:
 *         description: data not found
 *       500:
 *         description: internal server error      
 *  
 */


router.get("/", getAllBlogsController)
router.get("/:blogId", getDetailBlogController)
router.post("/", validateData(createBlogPayloadSchema), addBlogController)
router.put("/:blogId", validateData(createBlogPayloadSchema), editBlogController)
router.delete("/:blogId", deleteBlogController)

export default router
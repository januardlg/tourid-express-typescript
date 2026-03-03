import { Router } from "express";

// passport
import passport from "../utils/passport-authenticate.js"


// controller
import { addPackageTour, getDetailPackageTourController } from "../controller/package-tour.controller.js";
import { validateData } from "../middlewares/validation-payload.js";
import { addPackageTourPayloadSchema } from "../validation-schema/package-tour.valid-schema.js";

// middlweare
import { authorizeAdmin } from "../middlewares/authorize.js";

import { getAllPackageTourController, } from "../controller/package-tour.controller.js";


const router = Router()

/**
 * @swagger
 * tags: 
 *  name: Package-Tour
 *  description: Package Tour Product API 
 * /packageTour:
 *  get:
 *      summary: Retrieve a list of tour package product
 *      tags: [Package-Tour]
 *      parameters:
 *          - in: query
 *            name: page
 *            schema:
 *              type: integer
 *              description: The page
 *              minimum: 1
 *              example: 1
 *          - in: query
 *            name: limit
 *            schema:
 *              type: integer
 *              description: The limit per page
 *              minimum: 1
 *            examples:
 *              2:
 *                  value: 2
 *              5:
 *                  value: 5
 *              10:
 *                  value: 10
 *          - in: query
 *            name: sortBy
 *            schema:
 *              type: string
 *              description: The property need to be sorted
 *              enum: [package_id, name_package, cost, start_date, created_at]
 *              example: package_id 
 *          - in: query
 *            name: order
 *            schema:
 *              type: string
 *              description: The order option for sorted
 *              enum: [asc, desc]
 *              example: asc 
 *          - in: query
 *            name: filterBy
 *            schema:
 *              type: string
 *              description: The property need to be filter
 *              enum: [name_package, description]
 *              example: name_package 
 *          - in: query
 *            name: filterValue
 *            schema:
 *              type: string
 *              description: The value for filtering
 *      responses:
 *       200:
 *         description: The list of tour package product
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
 *                       $ref: '#/components/schemas/PackageTourResponse'
 *       500:
 *         description: internal server error
 *
 * /packageTour/{id}:
 *  get:
 *      summary: Retrieve detail a Package Tour
 *      tags: [Package-Tour]
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Package Tour id
 *      responses:
 *       200:
 *         description: The object of Package Tour
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/BaseResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/PackageTourResponse'
 *       404:
 *         description: data not found
 *       500:
 *         description: internal server error
 * 
 *  post:
 *      summary: Add package tour product
 *      tags: [Package-Tour]
 *      security:
 *        - bearerAuth: [] 
 *      requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/PackageTourCreate'
 *      responses:
 *       200:
 *         description: JWT Token
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/BaseResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/PackageTourResponse'
 *       400:
 *         description: invalid request body
 *       401:
 *         description: invalid credentials
 *       404:
 *         description: not permitted
 *       500:
 *         description: internal server error      
 */

router.get("/", getAllPackageTourController)
router.get("/:packageTourId", getDetailPackageTourController)
router.post('/', passport.authenticate("jwt", { session: false }), validateData(addPackageTourPayloadSchema), authorizeAdmin, addPackageTour)


export default router


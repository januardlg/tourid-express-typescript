import { Router } from "express";

// passport
import passport from "../utils/passport-authenticate.js";

// routes
import { addOrderPackageController, getOrderPackageController, getOrderPackageDetailController, confirmPaymentTransactionController } from "../controller/order-package.controller.js";

// Validation Schema
import { validateData } from "../middlewares/validation-payload.js";
import { addOrderPackagePayloadSchema, ConfirmPaymentPayloadSchema } from "../validation-schema/order-package.valid-schema.js";

const router = Router();


/**
 * @swagger
 * tags: 
 *  name: Order-Package
 *  description: Order Package Tour 
 * /orderPackageTour:
 *  get:
 *      summary: Retrieve a list of order package
 *      tags: [Order-Package]
 *      security:
 *        - bearerAuth: [] 
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
 *              enum: [created_at]
 *              example: created_at 
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
 *              enum: [payment_status]
 *              example: payment_status 
 *          - in: query
 *            name: filterValue
 *            schema:
 *              type: string
 *              description: The value for filtering
 *              enum: ["", PENDING, PAID, EXPIRED, WAITING_VERIFICATION]
 *              example: "" 
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
 *                       $ref: '#/components/schemas/OrderPackageResponse'
 *                     meta:
 *                       $ref: '#/components/schemas/MetaResponse'                      
 *       401:
 *         description: invalid credentials
 *       500:
 *         description: internal server error
 *  post:
 *      summary: Add order for package tour
 *      tags: [Order-Package]
 *      security:
 *        - bearerAuth: [] 
 *      requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/OrderPackageCreate'
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
 *                       $ref: '#/components/schemas/OrderPackageResponse'
 *       400:
 *         description: invalid request body
 *       401:
 *         description: invalid credentials
 *       500:
 *         description: internal server error
 * /orderPackageTour/{id}:
 *  get:
 *      summary: Retrieve detail an Order
 *      tags: [Order-Package]
 *      security:
 *        - bearerAuth: [] 
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Order Package Tour Id
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
 *                       $ref: '#/components/schemas/OrderPackageDetailResponse'
 *       401:
 *         description: invalid credentials
 *       404:
 *         description: data not found
 *       500:
 *         description: internal server error
 * 
 * /orderPackageTour/confirmPayment: 
 *  post:
 *      summary: Confirm Payment
 *      tags: [Order-Package]
 *      security:
 *        - bearerAuth: [] 
 *      requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ConfirmPaymentPayload'
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
 *                       $ref: '#/components/schemas/ConfirmPaymentResponse'
 *       202:
 *         description: Sucess confirm payment but Expired time for confirm(payment)
 *       404:
 *         description: no order found 
 *       401:
 *         description: invalid credentials
 *       500:
 *         description: internal server error
 * 
 */

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getOrderPackageController
);

router.get("/:orderPackageId", passport.authenticate("jwt", { session: false }), getOrderPackageDetailController)

router.post(
  "/",
  validateData(addOrderPackagePayloadSchema),
  passport.authenticate("jwt", { session: false }),
  addOrderPackageController
);

router.post(
  "/confirmPayment",
  validateData(ConfirmPaymentPayloadSchema),
  passport.authenticate("jwt", { session: false }),
  confirmPaymentTransactionController
);

export default router;

import { Router } from "express";

// passport
import passport from "../utils/passport-authenticate.js";

// routes
import { addOrderPackageController, getOrderPackageController, verifyPaymentTransactionController } from "../controller/order-package.controller.js";

// Validation Schema
import { validateData } from "../middlewares/validation-payload.js";
import { addOrderPackagePayloadSchema, VerifyPaymentPayloadSchema } from "../validation-schema/order-package.valid-schema.js";

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
 */

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getOrderPackageController
);

router.post(
  "/",
  validateData(addOrderPackagePayloadSchema),
  passport.authenticate("jwt", { session: false }),
  addOrderPackageController
);

router.post(
  "/verifyPayment",
  validateData(VerifyPaymentPayloadSchema),
  passport.authenticate("jwt", { session: false }),
  verifyPaymentTransactionController
);

export default router;

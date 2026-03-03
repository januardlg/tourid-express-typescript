import { Router } from "express";
import { getAllPaymentMethod } from "../controller/payment-methods.controller.js";

const router = Router();

/**
 * @swagger
 * tags: 
 *  name: Payment Method
 *  description: Payment Method
 * /payment-method:
 *  get:
 *      summary: Retrieve a list of payment method
 *      tags: [Payment Methods]
 *      responses:
 *       200:
 *         description: The list of the payment method
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
 *                       $ref: '#/components/schemas/PaymentMethodResponse'
 *       500:
 *         description: internal server error
 */

router.get("/", getAllPaymentMethod)

export default router
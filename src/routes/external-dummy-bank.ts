import { Router } from "express";
import passport from "passport";
import { validateData } from "../middlewares/validation-payload.js";
import { VerifyPaidFromBankPayloadSchema } from "../validation-schema/external-dummy-bank.schma.js";
import { verifyPaymentToPaidController } from "../controller/external-dummy-bank.controller.js";
import { authorizeAdmin } from "../middlewares/authorize.js";


const router = Router()

/**
 * @swagger
 * tags: 
 *  name: External Bank Callback
 *  description: Dummy callback to simulate verify payment from bank (assumption after user has done the payment)
 * /external-bank/verify-paid:
 * 
 *  post:
 *      summary: Simulate Callback from Bank Server (Admin Only)
 *      tags: [External Bank Callback]
 *      security:
 *        - bearerAuth: [] 
 *      requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/VerifyPaidRequest'
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
 *                       $ref: '#/components/schemas/VerifyPaidResponse'
 *       400:
 *         description: invalid request body
 *       401:
 *         description: invalid credentials
 *       404:
 *         description: data not found
 *       500:
 *         description: internal server error
 */


router.post("/verify-paid", passport.authenticate("jwt", { session: false }), validateData(VerifyPaidFromBankPayloadSchema), authorizeAdmin, verifyPaymentToPaidController)

export default router
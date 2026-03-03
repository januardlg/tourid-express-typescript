import { Router } from "express";
import { getAllHosterlyPartner } from "../controller/hosterly-partner.controller.js";

const router = Router();

/**
 * @swagger
 * tags: 
 *  name: Hosterly Partner
 *  description: Hosterly Partner
 * /hosterly-partner:
 *  get:
 *      summary: Retrieve a list of Hosterly Partner
 *      tags: [Hosterly Partner]
 *      responses:
 *       200:
 *         description: The list of the Hosterly Partner
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
 *                       $ref: '#/components/schemas/HosterlyPartnerResponse'
 *       500:
 *         description: internal server error
 */

router.get("/", getAllHosterlyPartner)

export default router
import { Router } from "express";
import { getNewAccessTokenController, LoginController, registerController } from "../controller/user.controller.js";
import { validateData } from "../middlewares/validation-payload.js";
import { loginUserValidationSchema, registerUserValidationSchema } from "../validation-schema/user.valid-schema.js";

const router = Router();

/**
 * @swagger
 * tags: 
 *  name: Users
 *  description: Registration and Authentication API
 * /users/login:
 *  post:
 *      summary: Login user for get token
 *      tags: [Users]
 *      requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/LoginUser'
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
 *                       $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: invalid request body
 *       401:
 *         description: invalid credentials
 *       404:
 *         description: user not registered
 *       500:
 *         description: internal server error  
 * 
 * /users/register:
 *  post:
 *      summary: Register new user
 *      tags: [Users]
 *      requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/RegisterUser'
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
 *                       $ref: '#/components/schemas/RegisterUserResponse'
 *       400:
 *         description: invalid request body
 *       500:
 *         description: internal server error  
 * /users/refresh:
 *  post:
 *      summary: Refresh access token
 *      tags: [Users]
 *      description: Uses the HttpOnly `refreshToken` cookie automatically sent by browser. Swagger cannot attach this cookie; test via Postman or browser.
 */

router.post("/register", validateData(registerUserValidationSchema), registerController);
router.post("/login", validateData(loginUserValidationSchema), LoginController)
router.post("/refresh", getNewAccessTokenController)

export default router;

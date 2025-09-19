import { Router } from "express";
import { LoginController, registerController } from "../controller/user.controller.js";
import { validateData } from "../middlewares/validation-payload.js";
import { loginUserValidationSchema, registerUserValidationSchema } from "../validation-schema/user.valid-schema.js";

const router = Router();

router.post("/register", validateData(registerUserValidationSchema) ,registerController);
router.post("/login", validateData(loginUserValidationSchema), LoginController)

export default router;

import { Router } from "express";
import passport from "passport";
import { validateData } from "../middlewares/validation-payload.js";
import { VerifyPaidFromBankPayloadSchema } from "../validation-schema/external-dummy-bank.schma.js";
import { verifyPaymentToPaidController } from "../controller/external-dummy-bank.controller.js";
import { authorizeAdmin } from "../middlewares/authorize.js";


const router = Router()


router.post("/verify-paid", passport.authenticate("jwt", { session: false }), validateData(VerifyPaidFromBankPayloadSchema), authorizeAdmin, verifyPaymentToPaidController)

export default router
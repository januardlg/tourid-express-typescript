import { Router } from "express";
import { getAllPaymentMethod } from "../controller/payment-methods.controller.js";

const router = Router();

router.get("/", getAllPaymentMethod)

export default router
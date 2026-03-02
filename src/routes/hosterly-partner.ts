import { Router } from "express";
import { getAllHosterlyPartner } from "../controller/hosterly-partner.controller.js";

const router = Router();

router.get("/", getAllHosterlyPartner)

export default router
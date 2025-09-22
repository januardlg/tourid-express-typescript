import { Router } from "express";
import { getAllPackageTourController } from "../controller/package-tour.controller.js";

const router = Router()


router.get("/", getAllPackageTourController)

export default router
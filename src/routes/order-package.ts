import { Router } from "express";

// passport
import passport from "../utils/passport-authenticate.js";

// routes
import { addOrderPackageController, getOrderPackageController } from "../controller/order-package.controller.js";

// Validation Schema
import { validateData } from "../middlewares/validation-payload.js";
import { addOrderPackagePayloadSchema } from "../validation-schema/order-package.valid-schema.js";

const router = Router();

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

export default router;

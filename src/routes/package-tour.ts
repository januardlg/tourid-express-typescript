import { Router } from "express";

// passport
import passport from "../utils/passport-authenticate.js"


// controller
import { addPackageTour } from "../controller/package-tour.controller.js";
import { validateData } from "../middlewares/validation-payload.js";
import { addPackageTourPayloadSchema } from "../validation-schema/package-tour.valid-schema.js";

// middlweare
import { authorizeAdmin } from "../middlewares/authorize.js";

import { getAllPackageTourController } from "../controller/package-tour.controller.js";


const router = Router()

router.get("/", getAllPackageTourController)
router.post('/', passport.authenticate("jwt", { session: false }), validateData(addPackageTourPayloadSchema), authorizeAdmin, addPackageTour)


export default router
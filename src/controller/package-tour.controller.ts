import type { Request, Response, NextFunction } from "express";
import PackageTourService from "../service/package-tour.service.js";
import type { AddPackageTourPayloadDTO } from "../dtos/package-tour.dto.js";
import { createResponse } from "../utils/handle-response.js";


export const addPackageTour = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {


    const { addPackageTour } = PackageTourService()

    const payload: AddPackageTourPayloadDTO = req.body


    try {
        const resultAddPackageTour = await addPackageTour(payload)

        console.log({ resultAddPackageTour })

        res.json(createResponse(200, 'success', 'success add a tour package', resultAddPackageTour))

    } catch (error) {
        next(error)
    }

}
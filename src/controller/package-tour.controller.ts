import type { Request, Response, NextFunction } from "express";
import PackageTourService from "../service/package-tour.service.js";
import type { AddPackageTourPayloadDTO, MetaDataPackageTourDTO, PackageTourProductDTO } from "../dtos/package-tour.dto.js";
import { createResponse } from "../utils/handle-response.js";

import type { PackageTourQueryDTO } from "../dtos/package-tour.dto.js";

export const getAllPackageTourController = async (
    req: Request<{}, {}, {}, PackageTourQueryDTO>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { getAllPackageTour } = PackageTourService();

        const resultAllPackageTour = await getAllPackageTour(req.query);

        res.json(
            createResponse<PackageTourProductDTO[], MetaDataPackageTourDTO>(
                200,
                "success",
                "success get all package tour",
                resultAllPackageTour?.data,
                resultAllPackageTour?.meta
            )
        );
    } catch (error) {
        next(error);
    }
};

export const getDetailPackageTourController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        const { packageTourId } = req.params

        const id = parseInt(packageTourId ?? "", 10)

        const { getDetailPackageTour } = PackageTourService()

        const resultDetailPakcageTour = await getDetailPackageTour(id)

        res.json(
            createResponse<PackageTourProductDTO>(
                200,
                "success",
                "success get package tour detail",
                resultDetailPakcageTour
            )
        )

    } catch (error) {
        next(error);
    }
};

export const addPackageTour = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const { addPackageTour } = PackageTourService()

    const payload: AddPackageTourPayloadDTO = req.body

    try {
        const resultAddPackageTour = await addPackageTour(payload)

        res.json(createResponse<PackageTourProductDTO>(200, 'success', 'success add a tour package', resultAddPackageTour))

    } catch (error) {
        next(error)
    }

}

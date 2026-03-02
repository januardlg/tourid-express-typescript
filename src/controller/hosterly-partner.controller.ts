import type { Request, Response, NextFunction } from "express"
import HosterlyPartnerService from "../service/hosterly-partner.service.js"
import { createResponse } from "../utils/handle-response.js"
import type { HosterlyPartnerDTO } from "../dtos/hosterly-partner.dto.js"

export const getAllHosterlyPartner = async (req: Request, res: Response, next: NextFunction) => {

    const { getListHosterlyPartner } = HosterlyPartnerService()

    try {
        const hosterlyParterList = await getListHosterlyPartner()
        res.json(
            createResponse<HosterlyPartnerDTO[]>(200, 'success', 'success get hosterly partner list', hosterlyParterList)
        )

    } catch (error) {
        next(error)
    }
}
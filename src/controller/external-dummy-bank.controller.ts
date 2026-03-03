import type { Request, Response, NextFunction } from "express";
import ExternalDummyBankService from "../service/external-dummy-bank.service.js"
import type { VerifyPaidFromBankPayloadDTO, VerifyPaidFromBankResponse } from "../dtos/external-dummy-bank.dto.js"
import { createResponse } from "../utils/handle-response.js"

export const verifyPaymentToPaidController = async (req: Request, res: Response, next: NextFunction) => {

    const { verifyPaymentToPaid } = ExternalDummyBankService()

    try {
        const payload: VerifyPaidFromBankPayloadDTO = req.body
        const resultVerifyPaid = await verifyPaymentToPaid(payload)
        res.json(
            createResponse<VerifyPaidFromBankResponse>(200, 'success', 'success update payment to paid', resultVerifyPaid)
        )
    } catch (error) {
        next(error)
    }

}

import type { Request, Response, NextFunction } from "express"
import { createResponse } from "../utils/handle-response.js"
import PaymentMethodService from "../service/payment-methods.service.js"
import type { PaymentMethodResponseDTO } from "../dtos/payment-method.dto.js"

export const getAllPaymentMethod = async (req: Request, res: Response, next: NextFunction) => {

    const { getPaymentMethodList } = PaymentMethodService()

    try {
        const paymentMethodList = await getPaymentMethodList()
        res.json(
            createResponse<PaymentMethodResponseDTO[]>(200, 'success', 'success get hosterly partner list', paymentMethodList)
        )

    } catch (error) {
        next(error)
    }
}
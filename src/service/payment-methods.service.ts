import type { PaymentMethodResponseDTO } from "../dtos/payment-method.dto.js"
import { prisma } from "../lib/prisma.js"

const PaymentMethodService = () => {

    const getPaymentMethodList = async () => {

        const result = await prisma.payment_methods.findMany({
            select: {
                payment_methods_id: true,
                code: true,
                name: true,
                destination_account: true,
                type: true,
                is_active: true,
                created_at: true
            }
        })

        const convertedResult: PaymentMethodResponseDTO[] = result.map((paymentMethod) => {
            return {
                paymentMethodsId: paymentMethod.payment_methods_id,
                code: paymentMethod.code,
                name: paymentMethod.name,
                type: paymentMethod.type as string,
                destinationAccount: paymentMethod.destination_account,
                isActive: paymentMethod.is_active as boolean,
                createdAt: paymentMethod.created_at
            }
        })

        return convertedResult
    }

    return {
        getPaymentMethodList
    }
}

export default PaymentMethodService
import type { PaymentMethodDTO } from "../dtos/payment-method.dto.js"
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

        const convertedResult: PaymentMethodDTO[] = result.map((paymentMethod) => {
            return {
                payment_methods_id: paymentMethod.payment_methods_id,
                code: paymentMethod.code,
                name: paymentMethod.name,
                type: paymentMethod.type as string,
                destination_account: paymentMethod.destination_account,
                is_active: paymentMethod.is_active as boolean,
                created_at: paymentMethod.created_at
            }
        })

        return convertedResult
    }

    return {
        getPaymentMethodList
    }
}

export default PaymentMethodService
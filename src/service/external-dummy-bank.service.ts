import type { VerifyPaidFromBankPayloadDTO, VerifyPaidFromBankResponse } from "../dtos/external-dummy-bank.dto.js";
import { PAYMENT_STATUS, STATUS_BANK_PAYMENT, TRIGGER_SOURCE } from "../lib/enum.js";
import { prisma } from "../lib/prisma.js";

const ExternalDummyBankService = () => {

    const verifyPaymentToPaid = async (data: VerifyPaidFromBankPayloadDTO) => {
        return prisma.$transaction(async (tx) => {
            const orderPackage = await tx.order_package_tour.findUnique({
                where: { order_tour_package_id: data.orderTourPackageId, reference_number: data.referenceNumber, payment_status: PAYMENT_STATUS.WAITING_VERIFICATION }
            })

            if (!orderPackage) {
                throw new Error("There is No Pending Payment Order")
            }

            const paymentStatus = data.statusBank === STATUS_BANK_PAYMENT.SUCCESSFUL ? PAYMENT_STATUS.PAID : PAYMENT_STATUS.FAILED

            const result = await prisma.order_package_tour.update({
                where: { order_tour_package_id: data.orderTourPackageId },
                data: {
                    payment_status: paymentStatus,
                }
            })

            await tx.payment_order_package_transaction.create({
                data: {
                    order_package_id: data.orderTourPackageId,
                    reference_number: data.referenceNumber,
                    trigger_source: TRIGGER_SOURCE.BANK,
                    payment_status: paymentStatus
                }
            })

            const convertedResult: VerifyPaidFromBankResponse = {
                orderTourPackageId: result.order_tour_package_id,
                referenceNumber: result.reference_number,
                statusBank: data.statusBank,
                paymentStatus: result.payment_status,
                lastUpdateTime: result?.updated_at as Date
            }

            return convertedResult
        })
    }

    return {
        verifyPaymentToPaid
    }
}

export default ExternalDummyBankService
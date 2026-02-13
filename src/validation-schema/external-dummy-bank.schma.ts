import { z } from 'zod'

export const VerifyPaidFromBankPayloadSchema = z.object({
    referenceNumber: z.string(),
    orderTourPackageId: z.number(),
    statusBank: z.string()
})

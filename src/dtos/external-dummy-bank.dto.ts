import type { z } from "zod";

import { VerifyPaidFromBankPayloadSchema } from "../validation-schema/external-dummy-bank.schma.js";

export type VerifyPaidFromBankPayloadDTO = z.infer<typeof VerifyPaidFromBankPayloadSchema>;

export interface VerifyPaidFromBankResponse {
    orderTourPackageId: number;
    referenceNumber: string;
    statusBank: string;
    paymentStatus: string;
    lastUpdateTime: Date
}


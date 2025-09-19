import type { z } from "zod";
import type { addOrderPackagePayloadSchema } from "../validation-schema/order-package.valid-schema.js";

export interface OrderPackageResponseDTO {
  tourPackageId: number;
  status: string;
  paymentMethod: "TRANSFER_BANK" | "VA";
  numberOfGuests: number;
  totalPayment: any;
}

export type AddOrderPackagePayloadDTO = z.infer<
  typeof addOrderPackagePayloadSchema
>;

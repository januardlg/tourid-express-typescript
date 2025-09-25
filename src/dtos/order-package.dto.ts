import type { z } from "zod";
import type { addOrderPackagePayloadSchema } from "../validation-schema/order-package.valid-schema.js";

export interface OrderPackageResponseDTO {
  orderTourPackageId: number;
  tourPackageId: number;
  status: string;
  paymentMethod: "TRANSFER_BANK" | "VA";
  numberOfGuests: number;
  totalPayment: any;
  createdAt: Date,
  updatedAt: Date,
  packageTourName: string
}

export type AddOrderPackagePayloadDTO = z.infer<
  typeof addOrderPackagePayloadSchema
>;

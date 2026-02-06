import type { z } from "zod";
import type { addOrderPackagePayloadSchema } from "../validation-schema/order-package.valid-schema.js";

export interface CreateOrderPackageTourResponseDTO {
  orderTourPackageId: number,
  tourPackageId: number,
  paymentMethodId: number,
  paymentStatus: string,
  totalPayment: string,
  referenceNumber: string,
  expiredAt: Date
}
export interface OrderPackageResponseDTO {
  orderTourPackageId: number;
  packageTourName: string;
  packageTourStartDate: Date;
  packageTourEndDate: Date;
  hostelryName: string;
  hostelryLocation: string;
  paymentStatus: string;
  paymentMethodName: string;
  paymentDestinationAccount: string;
  numberOfGuests: number;
  totalPayment: string;
  referenceNumber: string;
  createdAt: Date,
  expiredAt: Date,
}



export type AddOrderPackagePayloadDTO = z.infer<
  typeof addOrderPackagePayloadSchema
>;

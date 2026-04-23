import type { z } from "zod";
import type { addOrderPackagePayloadSchema, ConfirmPaymentPayloadSchema } from "../validation-schema/order-package.valid-schema.js";
import type { IActivity } from "./package-tour.dto.js";


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
  hostelryAddress: string;
  paymentStatus: string;
  paymentMethodName: string;
  paymentDestinationAccount: string;
  numberOfGuests: number;
  totalPayment: string;
  referenceNumber: string;
  createdAt: Date,
  expiredAt: Date,
}

export interface OrderPackageTourQueryDTO {
  page?: string;
  limit?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  filterBy?: string;
  filterValue?: string;
}

export interface MetaOrderPackageTourDTO {
  page: number;
  limit: number;
  totalPages: number;
  totalData: number;
  sortBy: string;
  order: "asc" | "desc";
  filterBy: string;
  filterValue: string;
}


export type AddOrderPackagePayloadDTO = z.infer<
  typeof addOrderPackagePayloadSchema
>;

export type ConfirmPaymentPayloadDTO = z.infer<typeof ConfirmPaymentPayloadSchema>;

export interface ConfirmPaymentResponseDTO {
  orderTourPackageId: number;
  referenceNumber: string;
  paymentStatus: string;
}


export interface TransactionPaymentLogDTO {
  paymentStatusLog: string;
  createdAtLog: Date
}
export interface OrderPackageTourDetailResponseDTO extends OrderPackageResponseDTO {
  transactionPaymentLogs: TransactionPaymentLogDTO[],
  packageTourDescription: string;
  packageTourActivities: IActivity[],
}
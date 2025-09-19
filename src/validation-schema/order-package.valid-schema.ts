import { z } from "zod";

export const addOrderPackagePayloadSchema = z.object({
  tourPackageId: z.number(),
  paymentMethod: z.enum(["TRANSFER_BANK","VA"]),
  numberOfGuests: z.number(),
  totalPayment: z.number(),
});

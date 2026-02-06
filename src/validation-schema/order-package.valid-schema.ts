import { z } from "zod";

export const addOrderPackagePayloadSchema = z.object({
  tourPackageId: z.number(),
  paymentMethodId: z.number(),
  numberOfGuests: z.number(),
  totalPayment: z.string().regex(/^\d+(\.\d{1,2})?$/, "must be a valid monetary amount"),
});

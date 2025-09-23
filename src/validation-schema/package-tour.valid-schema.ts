import { z } from "zod";

export const addPackageTourPayloadSchema = z.object({
    packageName: z.string(),
    cost: z.int(),
    description: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    activities: z.any(),
    hosterlyPartnerId: z.int()
})
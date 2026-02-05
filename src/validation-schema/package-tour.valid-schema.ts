import { z } from "zod";

export const activitySchema = z.object({
    day: z.string().regex(/^\d+$/, "must be a number string"),
    title: z.string().min(5, 'too short (minimal character is 5'),
});


export const addPackageTourPayloadSchema = z.object({
    packageName: z.string().min(10, 'too short (minimal character is 10').max(60, 'too long (maximal character is 10)'),
    cost: z.string().regex(/^\d+(\.\d{1,2})?$/, "must be a valid monetary amount"),
    description: z.string().min(20, 'too short (minimal character is 20'),
    startDate: z.string(),
    endDate: z.string(),
    activities: z.array(activitySchema),
    hosterlyPartnerId: z.number()
})
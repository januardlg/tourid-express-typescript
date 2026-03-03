import { z } from "zod";


export const acitivyTitleSchma = z.object({
    id: z.number(),
    title: z.string()
})

export const activitySchema = z.object({
    day: z.number().int().positive(),
    titleList: z.array(acitivyTitleSchma)
});


export const addPackageTourPayloadSchema = z.object({
    packageName: z.string().min(10, 'too short (minimal character is 10').max(60, 'too long (maximal character is 10)'),
    cost: z.string().regex(/^\d+(\.\d{1,2})?$/, "must be a valid monetary amount"),
    description: z.string().min(20, 'too short (minimal character is 20'),
    startDate: z.string(),
    endDate: z.string(),
    activities: z.array(activitySchema),
    hosterlyPartnerId: z.number().int().positive(),
    quota: z.number().int().positive()
})
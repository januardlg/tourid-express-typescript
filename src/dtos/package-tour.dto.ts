import type { z } from "zod";
import type { addPackageTourPayloadSchema } from "../validation-schema/package-tour.valid-schema.js";

export type AddPackageTourPayloadDTO = z.infer<typeof addPackageTourPayloadSchema>
export interface PackageTourQueryDTO {
    page?: string;
    limit?: string;
    sortBy?: string;
    order?: string;
    filterBy?: string;
    filterValue?: string;
}

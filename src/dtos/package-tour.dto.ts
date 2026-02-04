import type { z } from "zod";
import type { addPackageTourPayloadSchema } from "../validation-schema/package-tour.valid-schema.js";

export type AddPackageTourPayloadDTO = z.infer<typeof addPackageTourPayloadSchema>
export interface PackageTourQueryDTO {
    page?: string;
    limit?: string;
    sortBy?: string;
    order?: "asc" | "desc";
    filterBy?: string;
    filterValue?: string;
}


interface IActivity {
    day: string,
    title: string
}

export interface PackageTourProductDTO {
    packageId: number,
    namePackage: string,
    cost: any,
    description: string,
    starDate: Date,
    endDate: Date,
    activities: any,
    hostelryPartnerId: number,
    hostelryPartnerName?: string;
    hostelryPartnerLocation?: string;
    createdAt: Date,
    updatedAt: Date,
}

export interface MetaDataPackageTourDTO {
    page: number;
    limit: number;
    totalPages: number;
    sortBy: string;
    order: "asc" | "desc";
    filterBy: string;
    filterValue: string;
}
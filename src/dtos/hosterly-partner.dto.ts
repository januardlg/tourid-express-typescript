import { z } from "zod";

export interface HosterlyPartnerDTO {
    hostelryId: number,
    hostelryName: string,
    hostelryLevel: number,
    hostelryAddress: string,
    hostelryLocation: string
}
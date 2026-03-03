import { z } from "zod";

export interface HosterlyPartnerResponseDTO {
    hostelryId: number,
    hostelryName: string,
    hostelryLevel: number,
    hostelryAddress: string,
    hostelryLocation: string
}
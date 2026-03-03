import type { HosterlyPartnerResponseDTO } from "../dtos/hosterly-partner.dto.js"
import { prisma } from "../lib/prisma.js"

const HosterlyPartnerService = () => {

    const getListHosterlyPartner = async () => {

        const result = await prisma.hostelry_partner.findMany({
            select: {
                hostelry_id: true,
                hostelry_name: true,
                hostelry_level: true,
                hostelry_address: true,
                hostelry_location: true
            }
        })

        const convertedResult: HosterlyPartnerResponseDTO[] = result.map((hosterlyPartner) => {
            return {
                hostelryId: hosterlyPartner.hostelry_id,
                hostelryName: hosterlyPartner.hostelry_name as string,
                hostelryLevel: hosterlyPartner.hostelry_level as number,
                hostelryAddress: hosterlyPartner.hostelry_address as string,
                hostelryLocation: hosterlyPartner.hostelry_location,
            }
        })

        return convertedResult
    }

    return {
        getListHosterlyPartner
    }
}

export default HosterlyPartnerService
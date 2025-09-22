import { PrismaClient } from "../../generated/prisma/index.js"

import type { AddPackageTourPayloadDTO } from "../dtos/package-tour.dto.js"


const prisma = new PrismaClient()

const PackageTourService = () => {

    const addPackageTour = async (pacTourPayload: AddPackageTourPayloadDTO) => {

        const result = await prisma.package_tour_product.create({
            data: {
                name_package: pacTourPayload.packageName,
                cost: pacTourPayload.cost,
                description: pacTourPayload.description,
                start_date: pacTourPayload.startDate,
                end_date: pacTourPayload.endDate,
                activities: pacTourPayload.activities,
                hostelry_partner_id: pacTourPayload.hosterlyPartnerId,
            }
        })

        return result

    }


    return { addPackageTour }
}

export default PackageTourService
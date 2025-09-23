import { PrismaClient } from "../../generated/prisma/index.js"

import type { AddPackageTourPayloadDTO, PackageTourQueryDTO } from "../dtos/package-tour.dto.js"


const prisma = new PrismaClient()

const PackageTourService = () => {
    const prisma = new PrismaClient();

    const getAllPackageTour = async (queryParams: PackageTourQueryDTO) => {
        const { page, limit } = queryParams;

        const pageNum: number = parseInt(page ?? "1", 10);
        const limitNum: number = parseInt(limit ?? "10", 10);

        const take: number = limitNum;
        const skip: number = (pageNum - 1) * limitNum;

        const filterBy = queryParams.filterBy ?? "name_package";
        const filterValue = queryParams.filterValue ?? "";


        const result = await prisma.package_tour_product.findMany({
            take: take,
            skip: skip,
            orderBy: {
                [queryParams.sortBy ?? "created_at"]: queryParams.order ?? "desc",
            },
            where: {
                [filterBy]: {
                    contains: filterValue,
                    mode: "insensitive",
                },
            },
        });

        const totalData = await prisma.package_tour_product.count({
            orderBy: {
                [queryParams.sortBy ?? "created_at"]: queryParams.order ?? "desc",
            },
            where: {
                [filterBy]: {
                    contains: filterValue,
                    mode: "insensitive",
                },
            },
        });

        console.log({ totalData })

        const resultConvert = {
            data: result,
            meta: {
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(totalData / take),
            }
        }

        return resultConvert;
    };

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

    return { getAllPackageTour, addPackageTour };
};

export default PackageTourService;

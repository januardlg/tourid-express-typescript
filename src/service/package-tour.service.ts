import { prisma } from "../lib/prisma.js";
import type { AddPackageTourPayloadDTO, PackageTourProductDTO, PackageTourQueryDTO } from "../dtos/package-tour.dto.js"



const PackageTourService = () => {

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
            select: {
                package_id: true,
                name_package: true,
                cost: true,
                description: true,
                start_date: true,
                end_date: true,
                activities: true,
                hostelry_partner_id: true,
                hostelry_partner: {
                    select: {
                        hostelry_name: true
                    }
                },
                created_at: true,
                updated_at: true,

            }
        });


        const dataResultConvert: PackageTourProductDTO[] = result?.map((data) => {
            return {
                packageId: data.package_id,
                namePackage: data.name_package as string,
                cost: data.cost,
                description: data.description as string,
                starDate: data.start_date as Date,
                endDate: data.end_date as Date,
                activities: data.activities,
                hostelryPartnerId: data.hostelry_partner_id as number,
                hostelryPartnerName: data.hostelry_partner?.hostelry_name as string,
                createdAt: data.created_at,
                updatedAt: data.updated_at,
            }
        })

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
            data: dataResultConvert,
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

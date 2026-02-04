import { prisma } from "../lib/prisma.js";
import type { AddPackageTourPayloadDTO, MetaDataPackageTourDTO, PackageTourProductDTO, PackageTourQueryDTO } from "../dtos/package-tour.dto.js"
import { createError } from "../utils/handle-response.js";



const PackageTourService = () => {

    const getAllPackageTour = async (queryParams: PackageTourQueryDTO) => {
        const { page, limit } = queryParams;

        const pageNum: number = parseInt(page ?? "1", 10);
        const limitNum: number = parseInt(limit ?? "10", 10);

        const take: number = limitNum;
        const skip: number = (pageNum - 1) * limitNum;

        const filterBy = queryParams.filterBy ?? "name_package";
        const filterValue = queryParams.filterValue ?? "";

        const sortBy = queryParams.sortBy ?? "created_at"
        const order = queryParams.order ?? "desc"


        const result = await prisma.package_tour_product.findMany({
            take: take,
            skip: skip,
            orderBy: {
                [sortBy]: queryParams.order ?? order,
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
                [sortBy]: queryParams.order ?? order,
            },
            where: {
                [filterBy]: {
                    contains: filterValue,
                    mode: "insensitive",
                },
            },
        });

        const resultConvert: {
            data: PackageTourProductDTO[],
            meta: MetaDataPackageTourDTO
        } = {
            data: dataResultConvert,
            meta: {
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(totalData / take),
                sortBy: sortBy,
                order: order,
                filterBy: filterBy,
                filterValue: filterValue
            }
        }

        return resultConvert;
    };

    const getDetailPackageTour = async (packageId: number) => {
        const result = await prisma.package_tour_product.findUnique({
            where: {
                package_id: packageId
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
                        hostelry_name: true,
                        hostelry_location: true
                    }
                },
                created_at: true,
                updated_at: true,

            }
        })

        if (!result) {
            throw createError("No data found", 404);
        }

        const dataResultConvert: PackageTourProductDTO = {
            packageId: result.package_id,
            namePackage: result.name_package as string,
            cost: result.cost,
            description: result.description as string,
            starDate: result.start_date as Date,
            endDate: result.end_date as Date,
            activities: result.activities,
            hostelryPartnerId: result.hostelry_partner_id as number,
            hostelryPartnerName: result?.hostelry_partner?.hostelry_name as string,
            hostelryPartnerLocation: result?.hostelry_partner?.hostelry_location as string,
            createdAt: result.created_at,
            updatedAt: result.updated_at,
        }

        return dataResultConvert
    }


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

        const dataResultConvert: PackageTourProductDTO = {
            packageId: result.package_id,
            namePackage: result.name_package as string,
            cost: result.cost,
            description: result.description as string,
            starDate: result.start_date as Date,
            endDate: result.end_date as Date,
            activities: result.activities,
            hostelryPartnerId: result.hostelry_partner_id as number,
            createdAt: result.created_at,
            updatedAt: result.updated_at,
        }


        return dataResultConvert

    }


    return { getAllPackageTour, getDetailPackageTour, addPackageTour };
};

export default PackageTourService;

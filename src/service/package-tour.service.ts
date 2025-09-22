import { PrismaClient } from "../../generated/prisma/index.js";
import type { PackageTourQueryDTO } from "../dtos/package-tour.dto.js";

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

    return result;
  };

  return { getAllPackageTour };
};

export default PackageTourService;

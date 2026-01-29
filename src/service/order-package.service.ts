// prisma
import { prisma } from "../lib/prisma.js";

// DTO
import type {
  AddOrderPackagePayloadDTO,
  OrderPackageResponseDTO,
} from "../dtos/order-package.dto.js";
import type { UserDataInToken } from "../dtos/user.dto.js";

const OrderPackageService = () => {
  const addOrderPackage = async (
    payload: AddOrderPackagePayloadDTO,
    user: UserDataInToken
  ) => {
    const result = prisma.order_package_tour.create({
      data: {
        tour_package_id: payload.tourPackageId,
        status: "NEW",
        payment_method: payload.paymentMethod,
        number_of_guests: payload.numberOfGuests,
        total_payment: payload.totalPayment,
        customer_id: user?.userId,
      },
    });

    return result;
  };

  const getOrderPackage = async (user: UserDataInToken) => {
    const result = await prisma.order_package_tour.findMany({
      where: {
        customer_id: {
          equals: user?.userId
        }
      },
      select: {
        order_tour_package_id: true,
        tour_package_id: true,
        status: true,
        payment_method: true,
        number_of_guests: true,
        total_payment: true,
        created_at: true,
        updated_at: true,
        package_tour_product: {
          select: {
            name_package: true
          }
        }
      }
    });

    const convertedResult: OrderPackageResponseDTO[] = result.map((order) => {
      return {
        orderTourPackageId: order.order_tour_package_id,
        packageTourName: order?.package_tour_product?.name_package as string,
        tourPackageId: order.tour_package_id,
        status: order.status,
        paymentMethod: order.payment_method,
        numberOfGuests: order.number_of_guests,
        totalPayment: order.total_payment,
        createdAt: order.created_at,
        updatedAt: order.updated_at,
      };
    });

    return convertedResult;
  };

  return { addOrderPackage, getOrderPackage };
};

export default OrderPackageService;

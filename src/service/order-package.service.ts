// prisma
import { prisma } from "../lib/prisma.js";

import { v4 as uuidv4 } from 'uuid';

// DTO
import type {
  AddOrderPackagePayloadDTO,
  CreateOrderPackageTourResponseDTO,
  OrderPackageResponseDTO,
} from "../dtos/order-package.dto.js";
import type { UserDataInToken } from "../dtos/user.dto.js";

const OrderPackageService = () => {
  const addOrderPackage = async (
    payload: AddOrderPackagePayloadDTO,
    user: UserDataInToken
  ) => {

    const EXPIRED_PAYMENT_MINUTES = 10
    const now = new Date();
    const expiredPaymentTime = now.getTime() + (EXPIRED_PAYMENT_MINUTES * 60 * 1000)

    const UIDReferenceNumber = uuidv4()

    const referenceNumberGenerate = `TRF-${UIDReferenceNumber}`

    const result = await prisma.order_package_tour.create({
      data: {
        tour_package_id: payload.tourPackageId,
        payment_status: "PENDING",
        payment_method: payload.paymentMethodId,
        number_of_guests: payload.numberOfGuests,
        total_payment: payload.totalPayment,
        customer_id: user?.userId,
        expired_at: new Date(expiredPaymentTime),
        reference_number: referenceNumberGenerate
      }
    });

    const dataResultConvert: CreateOrderPackageTourResponseDTO = {
      orderTourPackageId: result.order_tour_package_id,
      tourPackageId: result.tour_package_id,
      paymentMethodId: result.payment_method,
      paymentStatus: result.payment_status,
      totalPayment: result.total_payment?.toString(),
      referenceNumber: result.reference_number,
      expiredAt: result.expired_at
    }

    return dataResultConvert;
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
        package_tour_product: {
          select: {
            name_package: true,
            start_date: true,
            end_date: true,
            hostelry_partner: {
              select: {
                hostelry_name: true,
                hostelry_location: true
              }
            }
          },
        },
        payment_status: true,
        payment_methods: {
          select: {
            name: true,
            destination_account: true
          }
        },
        number_of_guests: true,
        total_payment: true,
        reference_number: true,
        created_at: true,
        expired_at: true,
      }
    });

    const convertedResult: OrderPackageResponseDTO[] = result.map((order) => {
      return {
        orderTourPackageId: order.order_tour_package_id as number,
        packageTourName: order.package_tour_product.name_package as string,
        packageTourStartDate: order.package_tour_product.start_date as Date,
        packageTourEndDate: order.package_tour_product.end_date as Date,
        hostelryName: order.package_tour_product.hostelry_partner?.hostelry_name as string,
        hostelryLocation: order.package_tour_product.hostelry_partner?.hostelry_location as string,
        paymentStatus: order.payment_status as string,
        paymentMethodName: order.payment_methods.name as string,
        paymentDestinationAccount: order.payment_methods.destination_account as string,
        numberOfGuests: order.number_of_guests as number,
        totalPayment: order.total_payment.toString(),
        referenceNumber: order.reference_number as string,
        createdAt: order.created_at as Date,
        expiredAt: order.expired_at as Date
      };
    });

    return convertedResult;
  };

  return { addOrderPackage, getOrderPackage };
};

export default OrderPackageService;

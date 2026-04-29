import type { Options } from "swagger-jsdoc";
const isDev = process.env.NODE_ENV === "development";

const swaggerOptions: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TourId-Express-PostgreSQL',
            version: '1.0.0',
            description: 'TourId build with exprees typescript and PostgreSQL database',
        },
        servers: [
            {
                url: isDev
                    ? "http://localhost:3000"
                    : "https://tourid-express-typescript.vercel.app",
                description: isDev ? "Development server" : "Production server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT", // optional
                },
            },
            schemas: {
                BaseResponse: {
                    type: "object",
                    properties: {
                        statusCode: {
                            type: "integer",
                            example: 200,
                        },
                        status: {
                            type: "string",
                            example: "success",
                        },
                        message: {
                            type: "string",
                            example: "success fetch/mutate data",
                        }
                    },
                },
                MetaResponse: {
                    type: 'object',
                    properties: {
                        page: {
                            type: 'integer',
                        },
                        limit: {
                            type: 'integer',
                        },
                        totalPages: {
                            type: 'integer',
                        },
                        totalData: {
                            type: 'integer',
                        },
                        sortBy: {
                            type: 'string',
                        },
                        order: {
                            type: 'string',
                            enum: ['asc', 'desc'],
                        },
                        filterBy: {
                            type: 'string',
                        },
                        filterValue: {
                            type: 'string',
                        },
                    },
                    required: [
                        'page',
                        'limit',
                        'totalPages',
                        'totalData',
                        'sortBy',
                        'order',
                        'filterBy',
                        'filterValue',
                    ],
                    example: {
                        page: 1,
                        limit: 10,
                        totalPages: 5,
                        totalData: 50,
                        sortBy: 'createdAt',
                        order: 'asc',
                        filterBy: 'status',
                        filterValue: 'active',
                    },
                },
                BlogCreate: {
                    type: "object",
                    properties: {
                        title: { type: "string", description: "The title of the blog", example: 'Samosir' },
                        blog: { type: "string", description: "The content of the blog", example: 'The content of the blog...' },
                        images: { type: "string", description: "The images for the blog using base64 format", example: 'base64' },
                        authorId: { type: "integer", description: "The user id of the autor - further was added automatic from token authenticate user", example: 1 },
                    },
                    required: ['title', 'blog', 'images', 'authorId'],
                    example: {
                        title: 'Beatiful Samosir',
                        blog: 'The content of the blog...',
                        images: 'base64...',
                        authorId: 1,
                    }
                },
                BlogResponse: {
                    type: "object",
                    properties: {
                        blogId: { type: "integer", description: "The auto-generated id of the blog", example: '1' },
                        title: { type: "string", description: "The title of the blog", example: 'Samosir' },
                        blog: { type: "string", description: "The content of the blog", example: 'The content of the blog...' },
                        images: { type: "string", description: "The images for the blog using base64 format", example: 'base64' },
                        author_id: { type: "integer", description: "The user id of the autor - further was added automatic from token authenticate user", example: 1 },
                        createdAt: { type: "string", format: 'date', description: "The date the book was added", example: '2025-09-18T08:46:59.432Z' },
                        updatedAt: { type: "string", format: 'date', description: "The date the book was updated", example: '2025-09-18T08:46:59.432Z' },
                    },
                    required: ['title', 'blog', 'images', 'author'],
                    example: {
                        blogId: 1,
                        title: 'Beatiful Samosir',
                        blog: 'The content of the blog...',
                        images: 'base64...',
                        author: 1,
                        createdAt: '2025-09-18T08:46:59.432Z',
                        updatedAt: '2025-09-18T08:46:59.432Z'
                    }
                },
                LoginUser: {
                    type: "object",
                    properties: {
                        email: { type: "string", description: "email of account" },
                        password: { type: "string", description: "password of account" },
                    },
                    required: ['email', 'password'],
                    example: {
                        email: 'youremail@mail.com',
                        password: 'yourpassword'
                    }
                },
                LoginResponse: {
                    type: "object",
                    properties: {
                        token: { type: "string", description: "jwt" },
                    },
                    example: {
                        token: 'token....'
                    }
                },
                RegisterUser: {
                    type: "object",
                    properties: {
                        email: { type: "string", description: "email of account" },
                        username: { type: "string", description: "username of account" },
                        password: { type: "string", description: "password of account" },
                    },
                    required: ['email', 'username', 'password'],
                    example: {
                        email: 'youremail@mail.com',
                        username: 'yourusername',
                        password: 'yourpassword'
                    }
                },
                RegisterUserResponse: {
                    type: "object",
                    properties: {
                        email: { type: "string", description: "email of account" },
                        username: { type: "string", description: "username of account" },
                        isAdmin: { type: "boolean", description: "role of the account" },
                    },
                    example: {
                        email: 'youremail@mail.com',
                        username: 'yourusername',
                        isAdmin: 'false'
                    }
                },
                OrderPackageCreate: {
                    type: "object",
                    properties: {
                        tourPackageId: { type: "integer", description: "Id of order" },
                        paymentMethod: { type: "integer", description: "Payment method of order" },
                        numberOfGuests: { type: "integer", description: "Number of guests" },
                        totalPayment: { type: "string", description: "Total of payment" },

                    },
                    required: ['tourPackageId', 'paymentMethod', 'numberOfGuests', 'totalPayment'],
                    example: {
                        tourPackageId: 2,
                        paymentMethodId: 1,
                        numberOfGuests: 2,
                        totalPayment: "88000"
                    }
                },
                OrderPackageResponse: {
                    type: "object",
                    properties: {
                        orderTourPackageId: { type: "string", description: "name of package tour" },
                        packageTourName: { type: "string", description: "name of package tour" },
                        tourPackageId: { type: "integer", description: "Id of order" },
                        status: { type: "string", description: "status of order" },
                        paymentMethod: { type: "string", description: "Payment method of order" },
                        numberOfGuests: { type: "integer", description: "Number of guests" },
                        totalPayment: { type: "string", description: "Total of payment" },
                        createdAt: { type: "string", format: 'date', description: "The date the book was added", example: '2025-09-18T08:46:59.432Z' },
                        updatedAt: { type: "string", format: 'date', description: "The date the book was updated", example: '2025-09-18T08:46:59.432Z' },
                    },
                    example: {
                        orderTourPackageId: 1,
                        packageTourName: 'Bali Tour',
                        tourPackageId: 4,
                        status: 'NEW',
                        paymentMethod: "TRANSFER_BANK",
                        numberOfGuests: 2,
                        totalPayment: "1000000",
                        createdAt: '2025-09-18T08:46:59.432Z',
                        updatedAt: '2025-09-18T08:46:59.432Z'
                    }
                },
                OrderPackageDetailResponse: {
                    type: "object",
                    properties: {
                        orderTourPackageId: { type: "string", description: "name of package tour" },
                        packageTourName: { type: "string", description: "name of package tour" },
                        tourPackageId: { type: "integer", description: "Id of order" },
                        status: { type: "string", description: "status of order" },
                        paymentMethod: { type: "string", description: "Payment method of order" },
                        numberOfGuests: { type: "integer", description: "Number of guests" },
                        totalPayment: { type: "string", description: "Total of payment" },
                        transactionPaymentLogs: { type: "array", description: "Transaction logs" },
                        packageTourDescription: { type: "string", description: "Package tour description" },
                        packageTourActivities: { type: "array", description: "Activities list of the package tour product" },
                        createdAt: { type: "string", format: 'date', description: "The date the book was added", example: '2025-09-18T08:46:59.432Z' },
                        updatedAt: { type: "string", format: 'date', description: "The date the book was updated", example: '2025-09-18T08:46:59.432Z' },
                    },
                    example: {
                        orderTourPackageId: 1,
                        packageTourName: 'Bali Tour',
                        tourPackageId: 4,
                        status: 'NEW',
                        paymentMethod: "TRANSFER_BANK",
                        numberOfGuests: 2,
                        totalPayment: "1000000",
                        transactionPaymentLogs: [
                            {
                                paymentStatusLog: 'PENDING',
                                createdAtLog: '2025-10-18T08:46:59.432Z'
                            },
                        ],
                        packageTourDescription: 'Description of Medan tour....',
                        packageTourActivities: [
                            {
                                day: "1",
                                title: "Traditional Market"
                            }
                        ],
                        createdAt: '2025-09-18T08:46:59.432Z',
                        updatedAt: '2025-09-18T08:46:59.432Z'
                    }
                },
                ConfirmPaymentPayload: {
                    type: "object",
                    properties: {
                        referenceNumber: { type: "string", description: "Reference Number  of Transaction" },
                        orderTourPackageId: { type: "integer", description: "Order Id" }
                    },
                    required: ['referenceNumber', 'orderTourPackageId'],
                    example: {
                        referenceNumber: 'TRF-UUID',
                        orderTourPackageId: 4
                    },
                },
                ConfirmPaymentResponse: {
                    type: "object",
                    properties: {
                        orderTourPackageId: { type: "integer", description: "Order Id" },
                        referenceNumber: { type: "string", description: "Reference Number  of Transaction" },
                        paymentStatus: { type: "string", description: "Payment Status" },
                    },
                    example: {
                        orderTourPackageId: 4,
                        referenceNumber: 'TRF-UUID',
                        paymentStatus: 'PENDING'
                    },
                },
                PackageTourCreate: {
                    type: "object",
                    properties: {
                        packageName: { type: "string", description: "Name of the package tour product" },
                        cost: { type: "string", description: "Cost of the package tour product" },
                        description: { type: "string", description: "description of the package tour product" },
                        startDate: { type: "string", description: "Start date of the package tour product" },
                        endDate: { type: "string", description: "End date of the package tour product" },
                        hostelryPartnerId: { type: "integer", description: "Hosterly partner of the package tour product" },
                        activities: { type: "array", description: "Activities list of the package tour product" },
                        quota: { type: "integer", description: "Quota for this tour" },
                    },
                    required: ['packageName', 'cost', 'description', 'startDate', 'endDate', 'hostelryPartnerId', 'activities', 'quota'],
                    example: {
                        packageName: "Medan Tour",
                        cost: 40000,
                        description: "Keliling Medan ....",
                        startDate: "2025-10-03T00:00:00Z",
                        endDate: "2025-10-05T00:00:00Z",
                        activities: [
                            {
                                day: "1",
                                title: "Traditional Market"
                            }
                        ],
                        hosterlyPartnerId: 4,
                        quota: 8
                    }
                },
                PackageTourResponse: {
                    type: "object",
                    properties: {
                        packageId: { type: "integer", description: "The auto-generated id of the package tour product" },
                        namePackage: { type: "string", description: "Name of the package tour product" },
                        cost: { type: "string", description: "Cost of the package tour product" },
                        description: { type: "string", description: "description of the package tour product" },
                        startDate: { type: "string", description: "Start date of the package tour product" },
                        endDate: { type: "string", description: "End date of the package tour product" },
                        activities: { type: "array", description: "Activities list of the package tour product" },
                        quotaRemaining: { type: "integer", description: "Quota remaining for order package tour" },
                        createdAt: { type: "string", format: 'date', description: "The date the book was added", example: '2025-09-18T08:46:59.432Z' },
                        updatedAt: { type: "string", format: 'date', description: "The date the book was updated", example: '2025-09-18T08:46:59.432Z' },
                        hostelryPartnerId: { type: "integer", description: "Hosterly partner of the package tour product" },
                        hostelryPartnerName: { type: "string", description: "hostelryPartnerName list of the package tour product" },
                        hostelryAddress: { type: 'string', description: "hostelry location link " }
                    },
                    example: {
                        packageId: 9,
                        namePackage: "Bandung Tour",
                        cost: "400000",
                        description: "Keliling Bandung ....",
                        startDate: "2025-10-03T00:00:00.000Z",
                        endDate: "2025-10-05T00:00:00.000Z",
                        activities: [
                            {
                                day: "1",
                                title: "Traditional Market"
                            }
                        ],
                        createdAt: "2025-09-23T03:46:46.091Z",
                        updatedAt: "2025-09-23T03:46:46.091Z",
                        hostelryPartnerId: 4,
                        hostelryPartnerName: "Horas Hotel"
                    }
                },
                PaymentMethodResponse: {
                    type: "object",
                    properties: {
                        paymentMethodsId: { type: "integer", description: "The auto-generated id of the payment method" },
                        code: { type: "string", description: "Code of the payment method" },
                        name: { type: "string", description: "Name of the payment method" },
                        type: { type: "string", description: "Type of the payment method" },
                        destinationAccount: { type: "string", description: "Destination Account for payment " },
                        isActive: { type: "boolean", description: "Available of payment method" },
                        createdAt: { type: "string", format: 'date', description: "The date of the payment method was added", example: '2025-09-18T08:46:59.432Z' },
                    },
                    example: {
                        paymentMethodsId: 1,
                        code: "TF_BCA",
                        name: "Transfer Bank BCA",
                        type: "TRANSFER_BANK",
                        destinationAccount: "22200000",
                        isActive: true,
                        createdAt: "2026-02-05T15:22:34.845Z"
                    }
                },
                HosterlyPartnerResponse: {
                    type: "object",
                    properties: {
                        hostelryId: { type: "integer", description: "The auto-generated id of the hosterly partner" },
                        hostelryName: { type: "string", description: "Name of the hosterly partner" },
                        hostelryLevel: { type: "integer", description: "Hotel Level" },
                        hostelryAddress: { type: "string", description: "Address of the hosterly hotel" },
                        hostelryLocation: { type: "string", description: "Location Link of the hosterly hotel" },
                    },
                    example: {
                        hostelryId: 1,
                        hostelryName: "Sapadia",
                        hostelryLevel: 4,
                        hostelryAddress: "Tuktuk",
                        hostelryLocation: "google.com/maps/place/hotel+indonesia/data=!4m2!3m1!1s0x2e69f421963cd607:0x503cb9e9306e657a?sa=X&ved=1t:242&ictx=111"
                    },
                },
                VerifyPaidRequest: {
                    type: "object",
                    properties: {
                        referenceNumber: { type: "string", description: "Referecne Number for Payment", example: 'TRF-c520f3b5-5caf-4d81-b375-33f078cb0327' },
                        orderTourPackageId: { type: "integer", description: "Order Id for payment", example: '24' },
                        statusBank: { type: "string", description: "Status payment from Bank", example: 'SUCCESSFUL' },
                    },
                    required: ['referenceNumber', 'orderTourPackageId', 'statusBank'],
                    example: {
                        orderTourPackageId: 24,
                        referenceNumber: "TRF-c520f3b5-5caf-4d81-b375-33f078cb0327",
                        statusBank: "SUCCESSFUL"
                    }
                },
                VerifyPaidResponse: {
                    type: "object",
                    properties: {
                        orderTourPackageId: { type: "integer", description: "The auto-generated id of the tour order" },
                        referenceNumber: { type: "string", description: "Referecne Number for Payment" },
                        statusBank: { type: "string", description: "Status payment from Bank" },
                        paymentStatus: { type: "string", description: "Status payment in log" },
                        lastUpdateTime: { type: "string", format: 'date', description: "The date status payment was added to log" },
                    },
                    example: {
                        orderTourPackageId: 14,
                        referenceNumber: "TRF-c520f3b5-5caf-4d81-b375-33f078cb0327",
                        statusBank: "SUCCESSFUL",
                        paymentStatus: "PAID",
                        lastUpdateTime: "2026-02-05T15:22:34.845Z",
                    },
                }
            },
        },
    },
    apis: isDev ? ['./src/**/*.ts'] : ["./src/**/*.js"],
}

export default swaggerOptions;

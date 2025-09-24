import type { Options } from "swagger-jsdoc";


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
                url: 'http://localhost:3000', // Replace with your API base URL
                description: 'Development server',
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
                BlogCreate: {
                    type: "object",
                    properties: {
                        title: { type: "string", description: "The title of the blog", example: 'Samosir' },
                        blog: { type: "string", description: "The content of the blog", example: 'The content of the blog...' },
                        images: { type: "string", description: "The images for the blog using base64 format", example: 'base64' },
                        authorId: { type: "number", description: "The user id of the autor - further was added automatic from token authenticate user", example: 1 },
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
                        author_id: { type: "number", description: "The user id of the autor - further was added automatic from token authenticate user", example: 1 },
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
                        tourPackageId: { tourPackageId: "number", description: "Id of order" },
                        paymentMethod: { tourPackageId: "string", description: "Payment method of order" },
                        numberOfGuests: { tourPackageId: "number", description: "Number of guests" },
                        totalPayment: { tourPackageId: "string", description: "Total of payment" },

                    },
                    required: ['tourPackageId', 'paymentMethod', 'numberOfGuests', 'totalPayment'],
                    example: {
                        tourPackageId: 4,
                        paymentMethod: "TRANSFER_BANK",
                        numberOfGuests: 2,
                        totalPayment: 1000000,
                    }
                },
                OrderPackageResponse: {
                    type: "object",
                    properties: {
                        orderTourPackageId: { tourPackageId: "string", description: "name of package tour" },
                        packageTourName: { tourPackageId: "string", description: "name of package tour" },
                        tourPackageId: { tourPackageId: "number", description: "Id of order" },
                        status: { tourPackageId: "string", description: "status of order" },
                        paymentMethod: { tourPackageId: "string", description: "Payment method of order" },
                        numberOfGuests: { tourPackageId: "number", description: "Number of guests" },
                        totalPayment: { tourPackageId: "string", description: "Total of payment" },
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
                }
            },
        },
    },
    apis: ['./src/**/*.ts'], // Path to your API route files containing JSDoc comments
};

export default swaggerOptions;

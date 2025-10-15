import { expect, jest, test } from '@jest/globals';
import request from 'supertest'
import app from '../../src/app'
import { PrismaClient } from "../../generated/prisma/index.js"
import { getAccessToken } from '../helpers/getAccessToken';

const prisma = new PrismaClient();

let accessToken: any

beforeAll(async () => {
    accessToken = await getAccessToken('usertest@mail.com', 'Password')
})

afterAll(async () => {
    await prisma.$disconnect()
})

describe('GET /orderPackageTour', () => {

    beforeEach(async () => {
        const newOrderPackageTour = await prisma.order_package_tour.create({
            data: {
                tour_package_id: 1,
                status: "NEW",
                payment_method: "TRANSFER_BANK",
                number_of_guests: 3,
                total_payment: 90000,
                customer_id: 2,
            },
        });
    })

    afterEach(async () => {
        await prisma.order_package_tour.deleteMany()
    })

    test('should return return statuCode 401 - unathorized', async () => {
        const response = await request(app)
            .get('/orderPackageTour')
            .set('Accept', 'application/json')
            .expect(401)
    })

    test('should return list of order package tour by authorized user with response dto', async () => {
        const response = await request(app)
            .get('/orderPackageTour')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200)

        expect(response.body).toEqual(
            expect.objectContaining({
                statusCode: 200,
                status: 'success',
                message: "success get orders",
                data: expect.any(Array),
            })
        )

        expect(response.body.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    status: "NEW",
                    paymentMethod: "TRANSFER_BANK",
                    numberOfGuests: 3,
                    totalPayment: "90000"
                })
            ])
        )
    })

})
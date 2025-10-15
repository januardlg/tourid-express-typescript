import { expect, jest, test } from '@jest/globals';
import request from 'supertest'
import app from '../../src/app'
import { PrismaClient } from "../../generated/prisma/index.js"

const prisma = new PrismaClient();


afterAll(async () => {
    await prisma.$disconnect()
})

describe('GET /blogs', () => {

    afterEach(async () => {
        await prisma.blogs.deleteMany()
    })

    test('should return reponse with base response dto structure', async () => {

        const newBlog = await prisma.blogs.create({
            data: {
                title: 'Jakarta Tour',
                blog: 'Perjalanan keliling jakarta',
                images: 'base64',
                author_id: 2 // relasi dengan table user -> author_id 2 == 'usertests'
            }
        })

        const response = await request(app)
            .get('/blogs').set('Accept', 'application/json')
            .expect(200)

        expect(response.body).toEqual(
            expect.objectContaining({
                statusCode: 200,
                status: 'success',
                message: "success get blogs",
                data: expect.any(Array),
            })
        )
        expect(response.body.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    title: 'Jakarta Tour',
                    blog: 'Perjalanan keliling jakarta',
                    author: 'usertest',
                }),
            ])
        );
    })
})

describe('GET /blogs/blogId', () => {

    afterEach(async () => {
        await prisma.blogs.deleteMany()
    })

    test('should return blog detail with base response dto structure', async () => {

        const newBlog = await prisma.blogs.create({
            data: {
                title: 'Jakarta Tour',
                blog: 'Perjalanan keliling jakarta',
                images: 'base64',
                author_id: 2 // relasi dengan table user -> author_id 2 == 'usertests'
            }
        })

        const response = await request(app)
            .get(`/blogs/${newBlog?.blog_id}`)
            .expect(200)

        expect(response.body).toEqual(
            expect.objectContaining({
                statusCode: 200,
                status: 'success',
                message: "success get blog detail",
                data: expect.any(Object),
            })
        )
        expect(response.body.data).toEqual(
            expect.objectContaining({
                title: 'Jakarta Tour',
                blog: 'Perjalanan keliling jakarta',
                author: 'usertest',
            }),
        );
    })
})


describe('POST /blogs', () => {

    afterEach(async () => {
        await prisma.blogs.deleteMany()
    })

    test('should save data and return reponse with base response dto structure', async () => {

        const response = await request(app).post('/blogs')
            .send({
                title: 'Jakarta Tour',
                blog: 'Perjalanan keliling jakarta',
                images: 'base64',
                authorId: 2
            })
            .set('Accept', 'application/json')
            .expect(200)

        expect(response.body).toEqual(
            expect.objectContaining({
                statusCode: 200,
                status: 'success',
                message: "success add a blog",
                data: expect.any(Object),
            })
        )
        expect(response.body.data).toEqual(
            expect.objectContaining({
                title: 'Jakarta Tour',
                blog: 'Perjalanan keliling jakarta',
            })
        )
    })
})

describe('PUT /blogs/blogId', () => {

    afterEach(async () => {
        await prisma.blogs.deleteMany()
    })

    test('should delete a blog from database with response success delete', async () => {

        const newBlog = await prisma.blogs.create({
            data: {
                title: 'Jakarta Tour',
                blog: 'Perjalanan keliling jakarta',
                images: 'base64',
                author_id: 2 // relasi dengan table user -> author_id 2 == 'usertests'
            }
        })

        const response = await request(app)
            .put(`/blogs/${newBlog?.blog_id}`)
            .send({
                title: 'Jakarta Tour Revision',
                blog: 'Perjalanan keliling jakarta',
                images: 'base64',
                authorId: 2
            })
            .expect(200)

        expect(response.body).toEqual(
            expect.objectContaining({
                statusCode: 200,
                status: 'success',
                message: "success edit a blog",
                data: expect.any(Object),
            })
        )
        expect(response.body.data).toEqual(
            expect.objectContaining({
                title: 'Jakarta Tour Revision',
                blog: 'Perjalanan keliling jakarta',
            }),
        );
    })
})

describe('DELETE /blogs', () => {

    afterEach(async () => {
        await prisma.blogs.deleteMany()
    })

    test('should delete a blog from database with return base response dto structure', async () => {

        const newBlog = await prisma.blogs.create({
            data: {
                title: 'Jakarta Tour',
                blog: 'Perjalanan keliling jakarta',
                images: 'base64',
                author_id: 2 // relasi dengan table user -> author_id 2 == 'usertests'
            }
        })

        const response = await request(app)
            .delete(`/blogs/${newBlog?.blog_id}`)
            .expect(200)

        expect(response.body).toEqual(
            expect.objectContaining({
                statusCode: 200,
                status: 'success',
                message: "success delete a blog",
                data: expect.any(Object),
            })
        )
        expect(response.body.data).toEqual(
            expect.objectContaining({
                blogId: expect.any(Number)
            }),
        );
    })
})
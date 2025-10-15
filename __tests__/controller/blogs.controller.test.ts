import { expect, jest, test } from '@jest/globals';
import type { Request, Response, NextFunction } from 'express';
import { BlogsService } from '../../src/service/blogs.service';
import { addBlogController, deleteBlogController, editBlogController, getAllBlogsController, getDetailBlogController } from '../../src/controller/blogs.controller';
import { createError, createResponse } from '../../src/utils/handle-response';
import type { BlogDataDTO, CreateBlogPayloadDTO } from '../../src/dtos/blog.dto';


jest.mock('../../src/service/blogs.service', () => ({
    BlogsService: {
        getAllBlogs: jest.fn(),
        getDetailBlog: jest.fn(),
        addBlog: jest.fn(),
        editBlog: jest.fn(),
        deleteBlog: jest.fn(),
    },
}));

describe('test for getAllBlogsController', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should return all blogs when success', async () => {

        // mock required parameters
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        const next = jest.fn() as NextFunction;

        // mock BlogsService.getAllBlogs property and the data result
        const mockDataFromService = [
            {
                blogId: 10,
                title: 'Perjalanan Jakarta',
                blog: 'keliling jakarta dan lain...',
                images: 'base64',
                createdAt: new Date('2025-09-15T07:04:44.919Z'),
                updatedAt: new Date('2025-09-15T07:04:44.919Z'),
                author: 'user1',
            },
        ]

        jest.spyOn(BlogsService, 'getAllBlogs').mockResolvedValue(
            mockDataFromService
        );

        // define expected reponse json of the API using real function
        const expectedResponseJson = createResponse(200, "success", "success get blogs", mockDataFromService)

        // call main function
        await getAllBlogsController(req, res, next);

        // assertion
        expect(BlogsService.getAllBlogs).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(expectedResponseJson);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});

describe('test for getDetailBlogController', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should return the detail of a blog using params blogId -- data exist', async () => {

        // mock required parameters
        const req = { params: { blogId: 10 } } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        const next = jest.fn() as NextFunction;

        // mock BlogsService.getAllBlogs property and the data result
        const mockDataFromService = {
            blogId: 10,
            title: 'Perjalanan Jakarta',
            blog: 'keliling jakarta dan lain...',
            images: 'base64',
            createdAt: new Date('2025-09-15T07:04:44.919Z'),
            updatedAt: new Date('2025-09-15T07:04:44.919Z'),
            author: 'user1',
        }

        const spyGetDetailBlog = jest.spyOn(BlogsService, 'getDetailBlog').mockResolvedValue(
            mockDataFromService
        );

        // define expected reponse json of the API using real function
        const expectedResponseJson = createResponse(200, "success", "success get blog detail", mockDataFromService)

        // call main function
        await getDetailBlogController(req, res, next);

        // assertion
        expect(spyGetDetailBlog).toHaveBeenCalledWith(10)
        expect(BlogsService.getDetailBlog).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(expectedResponseJson);
        expect(res.status).toHaveBeenCalledWith(200)

    });

    test('should return the detail of a blog using params blogId -- data does not exist', async () => {

        // mock required parameters
        const req = { params: { blogId: 100 } } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        const next = jest.fn() as any;

        // mock BlogsService.getAllBlogs property and the error
        const error = createError("No data found", 404);
        const spyGetDetailBlog = jest.spyOn(BlogsService, 'getDetailBlog').mockRejectedValue(error)

        // call main function
        await getDetailBlogController(req, res, next);

        // assertion
        expect(spyGetDetailBlog).toHaveBeenCalledWith(100)
        expect(next).toHaveBeenCalledWith(error)

        const errorArg = next.mock.calls[0][0];
        // console.log({ errorArg })
        expect(errorArg).toBeInstanceOf(Error);
        expect(errorArg.message).toBe('No data found');
        expect(errorArg.status).toBe(404);

        expect(res.json).not.toHaveBeenCalled();

    });
});

describe('test for addBlogController', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should return success status and data - success operation', async () => {

        const mockDataInputBlog: CreateBlogPayloadDTO = {
            title: "Perjalanan Sibolga",
            blog: "keliling laut dan lain...",
            images: "base64",
            authorId: 1
        }

        // mock required parameters
        const req = { body: mockDataInputBlog } as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        const next = jest.fn() as NextFunction;

        // mock BlogsService.addBlog property and the data result
        const mockDataFromService: Partial<BlogDataDTO> = {
            blogId: 10,
            title: 'Perjalanan Jakarta',
            blog: 'keliling jakarta dan lain...',
            images: 'base64',
            createdAt: new Date('2025-09-15T07:04:44.919Z'),
            updatedAt: new Date('2025-09-15T07:04:44.919Z'),
        }

        const spyAddBlogService = jest.spyOn(BlogsService, 'addBlog').mockResolvedValue(
            mockDataFromService
        );

        // define expected reponse json of the API using real function
        const expectedResponseJson = createResponse(200, "success", "success add a blog", mockDataFromService)

        // call main function
        await addBlogController(req, res, next);

        // assertion
        expect(BlogsService.addBlog).toHaveBeenCalledTimes(1);
        expect(spyAddBlogService).toHaveBeenCalledWith(mockDataInputBlog)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(expectedResponseJson);

    });
});


describe('test for editBlogController', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should return success status and data - success operation', async () => {

        const mockDataInputBlog: CreateBlogPayloadDTO = {
            title: "Perjalanan Sibolga",
            blog: "keliling laut dan lain...",
            images: "base64",
            authorId: 1
        }

        // mock required parameters
        const req = { body: mockDataInputBlog, params: { blogId: 10 } } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        const next = jest.fn() as NextFunction;

        // mock BlogsService.addBlog property and the data result
        const mockDataFromService: Partial<BlogDataDTO> = {
            blogId: 20,
            title: 'Perjalanan Jakarta',
            blog: 'keliling jakarta dan lain...',
            images: 'base64',
            createdAt: new Date('2025-09-15T07:04:44.919Z'),
            updatedAt: new Date('2025-09-15T07:04:44.919Z'),
        }

        const spyEditBlogService = jest.spyOn(BlogsService, 'editBlog').mockResolvedValue(
            mockDataFromService
        );

        // define expected reponse json of the API using real function
        const expectedResponseJson = createResponse(200, "success", "success edit a blog", mockDataFromService)

        // call main function
        await editBlogController(req, res, next);

        // assertion
        expect(spyEditBlogService).toHaveBeenCalledWith(mockDataInputBlog, 10)
        expect(BlogsService.editBlog).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(expectedResponseJson);

    });
});


describe('test for deleteBlogController', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should return success status -- data exist', async () => {

        // mock required parameters
        const req = { params: { blogId: 14 } } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        const next = jest.fn() as NextFunction;

        // mock BlogsService.deleteBlog property and the data result
        const mockDataFromService: Partial<BlogDataDTO> = {
            blogId: 10,
        }

        const spyDeleteBlogService = jest.spyOn(BlogsService, 'deleteBlog').mockResolvedValue(
            mockDataFromService
        );

        // define expected reponse json of the API using real function
        const expectedResponseJson = createResponse(200, "success", "success delete a blog", mockDataFromService)

        // call main function
        await deleteBlogController(req, res, next);

        // assertion
        expect(spyDeleteBlogService).toHaveBeenCalledWith(14)
        expect(BlogsService.deleteBlog).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(expectedResponseJson);
        expect(res.status).toHaveBeenCalledWith(200)

    });
});


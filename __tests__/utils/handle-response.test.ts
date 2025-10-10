import { createError, createResponse } from "../../src/utils/handle-response.js"

describe('tes createResponse', () => {
    it('should return data response to server as object with statusCode, status, and message', () => {
        const result = createResponse(200, 'success', 'success get data', [{ id: 1 }]);
        expect(result).toEqual({
            statusCode: 200,
            status: 'success',
            message: 'success get data',
            data: [{ id: 1 }]
        });
    });
})

describe('test createError', () => {
    test('crateError should return error class and custom message and status', () => {

        const err = createError('custom error message', 800)

        expect(err).toBeInstanceOf(Error)
        expect(err.message).toBe('custom error message')
        expect(err.status).toBe(800)
    })
})
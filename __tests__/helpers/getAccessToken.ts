import request from 'supertest'
import app from '../../src/app'

export const getAccessToken = async (email: string, password: string) => {

    const loginResponse = await request(app)
        .post('/users/login')
        .send({
            email: "usertest@mail.com",
            password: "Password"
        })

    return loginResponse.body.data.accessToken
}
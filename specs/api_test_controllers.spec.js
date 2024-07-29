import user from  "../services/user"
import config from "../config/config";

describe('Api Test Controllers', () => {

    test('POST - /Account/v1/User', async () => {
        const response = await user.registration(config.credentials_registration)
        expect(response.status).toEqual(201)
        expect(response.body.userID).toBeTruthy()
        expect(typeof response.body.userID).toEqual('string')
    })

    test('POST - /Account/v1/User - Error', async () => {
        const response = await user.registration_fake(config.credentials_fails)
        expect(response.status).toEqual(400)
        
        
    })

    test('POST- /Account/v1/Authorized', async () => {
        const respons  = await user.autorization(config.credentials)
        expect(respons.status).toEqual(200)
    })

    test('GET- /Account/v1/{UUID}', async () => {
        const response = await user.infoUser(user.getUserID())
        const response_body = await response.json;
        console.log(response_body.userID)
        expect(response_body).not.toBeNull()
    })

    test('GET- /Account/v1/{UUID} -Error', async () => {
        const response = await user.infoUser_fake(config.userID_fails)
        expect(response.status).toBe(401)
    })

    test('DELETE- /Account/v1/{UUID}', async () => {
        const response = await user.deleteUserId(user.getUserID())
        expect(response.body).not.toBeNull()
    })
})

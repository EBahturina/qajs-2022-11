import supertest from "supertest";
import config from "../config/config";
const {url} = config;
//
const user = {

    autorization: (payload = config.credentials) => {
        return supertest(url)
        .post('/Account/v1/Authorized')
        .set("Accept", "application/json")
        .set("Content-Type", "application/json") 
        .send(payload)
    },
    registration: (payloadR = config.credentials_registration) => {
        return supertest(url)
        .post('/Account/v1/User')
        .set("Accept", "application/json")
        .set("Content-Type", "application/json") 
        .send(payloadR)
    },
    registration_fake: (payloadF = config.credentials_fails) => {
        return supertest(url)
        .post('/Account/v1/User')
        .set("Accept", "application/json")
        .set("Content-Type", "application/json") 
        .send(payloadF)
    },

    async getUserID() {
        const payloadR = config.credentials_registration
        const respons = await this.registration(payloadR)
        return respons.body.userID
    },
    

    infoUser: (userID, token) => {
        return supertest(url)
        .get(`/Account/v1/User/${userID}`)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json") 
        .set("authorization", `Bearer ${token}`)
        .send(); 
    },
    infoUser_fake: (us = config.userID_fails) => {
        return supertest(url)
        .get(`/Account/v1/User/${us}`)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send();  
    },

    deleteUserId: (userID, token) => {
        return supertest(url)
        .delete(`/Account/v1/User/${userID}`)
        .set("Accept", "application/json")
        .set("authorization", `Bearer ${token}`)
        .send();
    },

    generateToken: (payload = config.credentials) => {
        return supertest(url)
        .post("/Account/v1/GenerateToken")
        .set("Accept", "application/json")
        .send(payload);
      },

      async getAuthToken() {
        const response = await this.generateToken()
        const token = response.body.token 
        return token
      }
    }

    user: (token) => {
        return supertest(url)
        .get('/Account/v1/User')
        .set("Accept", "application/json")
        .set("Content-Type", "application/json") 
        .set('Authorization', `Bearer ${token}`) 
    }


export default user
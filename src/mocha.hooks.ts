import mongoose from 'mongoose';
import request from 'supertest';
import {app} from "./app";
 declare global {
    var signIn: () => Promise<string>;
    var signUp: () => Promise<string>
 }
 global.signIn = async () => {
   const email = 'test@test.com';
   const password = 'password';
   const response = await request(app)
   .post('/auth/signup')
   .send({
       email,
       password,
       name:"surendra"
   })
   .expect(201);
 const access_token = response.body['access_token'] || "";
 return access_token;
 }
exports.mochaHooks = {
    beforeEach: async function () {
        const mongoUri = "mongodb+srv://kumar:7VnrEfN0Ci3nQ3Xo@cluster0.ovgqwzy.mongodb.net/ticketingnew";// mongo.getUri();
        process.env.MONGO_URI = mongoUri;
        await mongoose.connect(mongoUri, {});
        console.log("before function executed")
        import("dotenv/config")
        //process.env.JWT_SECRET = 'asdfasdf';
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        //process.env.PORT = '8004';
        //process.env.KAFKA_HOST = "localhost:29092, localhost:39092";
        //process.env.KAFKA_HOST = "kafka-controller-0.kafka-controller-headless.default.svc.cluster.local:9092,kafka-controller-1.kafka-controller-headless.default.svc.cluster.local:9092";
        process.env.ENABLE_KAFKA_AUTH = "true";
        process.env.KAFKA_USER = "user1";
        process.env.KAFKA_PASSWORD = "1wYI12Ukdi"
    },
    afterAll: async function () {
        console.log("after all of mocha hooks")
        await mongoose.connection.close();
        console.log("after function executed for signup functionalty")
    }
  };
  
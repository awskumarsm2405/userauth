import {app} from '../../app';
import request from 'supertest';
import { expect } from "chai";
import mongoose from 'mongoose';
describe('login api testing',  () => {
  before(function () {
    console.log("before function executed for login functionalty")
    import("dotenv/config")
    process.env.JWT_SECRET = 'asdfasdf';
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    process.env.PORT = '8004';
    //process.env.KAFKA_HOST = "localhost:29092, localhost:39092";
    process.env.KAFKA_HOST = "kafka-controller-0.kafka-controller-headless.default.svc.cluster.local:9092,kafka-controller-1.kafka-controller-headless.default.svc.cluster.local:9092";
    process.env.ENABLE_KAFKA_AUTH = "true";
    process.env.KAFKA_USER = "user1";
    process.env.KAFKA_PASSWORD = "1wYI12Ukdi"
    const mongoUri = "mongodb+srv://kumar:7VnrEfN0Ci3nQ3Xo@cluster0.ovgqwzy.mongodb.net/ticketingnew";// mongo.getUri();
    process.env.MONGO_URI = mongoUri;
    //console.log(process.env);
  });
  after(async () => {
    console.log("after function executed for login functionalty")
    await mongoose.connection.close();
    console.log("after function executed for login functionalty")
  });
it("respond with detail about current user",async ()=>{
  if(process.env.MONGO_URI) await mongoose.connect(process.env.MONGO_URI, {});

  const access_token: string = await global.signIn();
  const response = await request(app)
    .get('/auth/currentuser')
    .set('access_token', access_token)
    .send()
    .expect(200);
  expect(response.body.currentUser.email).to.equal('test@test.com');
}).timeout(60000);
const email = 'test@test.com';
const password = 'password';
it("login with vaild user and pasword",async ()=>{

  const access_token = await global.signIn();
  const response = await request(app)
    .post('/auth/signin')
    .send({
      email,
      password
    })
    .expect(200);
    expect(response.body.user_id).not.to.equal('');
})
it("login with vaild user and invaild pasword",async ()=>{

  const access_token = await global.signIn();
  const response = await request(app)
    .post('/auth/signin')
    .send({
      email,
      password:"12345"
    })
    .expect(400);
})
it("login with invaild user and vaild pasword",async ()=>{
  const access_token = await global.signIn();
  const response = await request(app)
    .post('/auth/signin')
    .send({
      email:"",
      password
    })
    .expect(400);
})
})
import {app} from '../../app';
import request from 'supertest';
import { expect } from "chai";
import mongoose from 'mongoose';
/*describe('login api testing',  () => {

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
})*/
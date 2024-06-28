import {app} from '../../app';
import request from 'supertest';
it("respond with detail about current user",async ()=>{
  const access_token = await global.signin();
  console.log("access_token", access_token)
  const response = await request(app)
    .get('/auth/currentuser')
    .set('access_token', access_token)
    .send()
    .expect(200);
  expect(response.body.currentUser.email).toEqual('test@test.com');
}, 70*1000)
const email = 'test@test.com';
const password = 'password';
it("login with vaild user and pasword",async ()=>{
  const access_token = await global.signin();
  const response = await request(app)
    .post('/auth/signin')
    .send({
      email,
      password
    })
    .expect(200);
    expect(response.body.user_id).not.toEqual('');
}, 70*1000)
it("login with vaild user and invaild pasword",async ()=>{
  const access_token = await global.signin();
  const response = await request(app)
    .post('/auth/signin')
    .send({
      email,
      password:"12345"
    })
    .expect(400);
}, 70*1000)
it("login with invaild user and vaild pasword",async ()=>{
  const access_token = await global.signin();
  const response = await request(app)
    .post('/auth/signin')
    .send({
      email:"",
      password
    })
    .expect(400);
}, 70*1000)

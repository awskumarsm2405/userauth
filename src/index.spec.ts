import { sign } from "jsonwebtoken";
import "mocha";
import request from 'supertest';
import { assert, expect } from "chai";
import {app} from "./app";

import mongoose from 'mongoose'
declare global {
   var signIn: () => Promise<string>;
   var signUp: () => Promise<string>
}

describe('hooks', async function () {
  before(async function (done) {
    console.log("before function executed")
    const mongoUri = "mongodb+srv://kumar:7VnrEfN0Ci3nQ3Xo@cluster0.ovgqwzy.mongodb.net/ticketingnew";// mongo.getUri();
    process.env.MONGO_URI = mongoUri;
    await mongoose.connect(mongoUri, {});
     console.log("before function executed")
     done();
    // runs once before the first test in this block
  });

  after(function () {
    console.log("after function executed")

    // runs once after the last test in this block
  });

  beforeEach(function () {
    console.log("before each function executed")
    // runs before each test in this block
  });

  afterEach(function () {
    console.log("after each function executed")
    // runs after each test in this block
  });
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
    console.log("access_token", access_token);
    return access_token;
  }
  // test cases
});
describe('signup', () => {
  
  it('it should signup', async () => { 
    import("dotenv/config")
    console.log(process.env);
    if(process.env.MONGO_URI) 
      {
        await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      });
      console.log("connectedt with mongo db")
   }
   /* return global.signIn().then(result => {
      assert.typeOf(result, "string");
    }).catch((err)=>console.log(err))*/
   //console.log("eeeeeeeeeeeee")
     // assert.typeOf("wwwwwww", "string");
  }).timeout(60000)
})


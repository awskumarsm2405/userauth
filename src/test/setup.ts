import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

declare global {
  var signin: () => Promise<string>;
}
beforeAll(async () => {
  process.env.JWT_SECRET = 'asdfasdf';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  process.env.PORT = '8004';
  const mongoUri = "mongodb+srv://kumar:7VnrEfN0Ci3nQ3Xo@cluster0.ovgqwzy.mongodb.net/ticketingnew";// mongo.getUri();
  process.env.MONGO_URI = mongoUri;
  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.setTimeout(60000);

  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
}, 60000);

afterAll(async () => {
  await mongoose.connection.close();
});

global.signin = async () => {
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
  console.log("access_tokenfffffffffffffffffffffffffff", response.body);
  return access_token;
};

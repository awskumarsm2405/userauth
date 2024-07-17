import "mocha";
import request from 'supertest';
import { assert, expect } from "chai";
describe('Signup api test', () => {
  it('it should signup', async () => { 
      const result = await global.signIn();
      assert.typeOf(result, "string");
  }).timeout(60000)
})


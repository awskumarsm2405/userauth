"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
function addition(a, b) {
    return a + b;
}
describe("Calculator Tests", () => {
    it("should return 5 when 2 is added to 3", () => {
        const result = addition(2, 3);
        chai_1.assert.equal(result, 5);
    });
});

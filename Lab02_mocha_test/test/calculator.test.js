const { expect } = require("chai");


const { add, mul, div } = require("../app/calculator");

describe("Calculator Tests", () => {

  it("add(5,2) should return 7 PASS", () => {
    const result = add(5, 2);
    console.log("PASS: add(5,2) =", result);
    expect(result).to.equal(7);
  });

  it("add(5,2) should return 8 FAIL", () => {
    const result = add(5, 2);
    console.log("FAIL (intentional): add(5,2) =", result);
    expect(result).to.equal(8);
  });

  it("mul(5,2) should return 10 PASS", () => {
    const result = mul(5, 2);
    console.log("PASS: mul(5,2) =", result);
    expect(result).to.equal(10);
  });

  it("mul(5,2) should return 12 FAIL", () => {
    const result = mul(5, 2);
    console.log("FAIL (intentional): mul(5,2) =", result);
    expect(result).to.equal(12);
  });

  it("div(10,2) should return 5 PASS", () => {
    const result = div(10, 2);
    console.log("PASS: div(10,2) =", result);
    expect(result).to.equal(5);
  });

  it("div(10,2) should return 2 FAIL", () => {
    const result = div(10, 2);
    console.log("FAIL (intentional): div(10,2) =", result);
    expect(result).to.equal(2);
  });

});

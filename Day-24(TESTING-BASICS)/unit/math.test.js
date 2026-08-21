const add = (a, b) => a + b;

const isPositive = (number) => number > 0;

describe("Unit Testing Basics", () => {
  test("should add two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("should return true for positive number", () => {
    expect(isPositive(10)).toBe(true);
  });

  test("should return false for negative number", () => {
    expect(isPositive(-5)).toBe(false);
  });

  test("should return false for zero", () => {
    expect(isPositive(0)).toBe(false);
  });
});
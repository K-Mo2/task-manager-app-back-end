const { calcTotalCost } = require("../math");

test("testing total cost of the dinner", () => {
  expect(calcTotalCost(10)).toBe(11);
});

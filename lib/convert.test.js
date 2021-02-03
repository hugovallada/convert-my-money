import { conversao, toMoney } from "./convert.js";

test("convert 4 to 4", () => {
  expect(conversao(4, 4)).toBe(16);
});

test("convert cotacao 0 and quantidade 4", () => {
  expect(conversao(0, 4)).toBe(0);
});

test("toMoney converts float", () => {
  expect(toMoney(2)).toBe("2.00");
});

test("toMoney converts string", () => {
  expect(toMoney("2")).toBe("2.00");
});

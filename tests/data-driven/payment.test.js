import { processPayment } from "../../src/payment.js";

describe.each([
  ["card"],
  ["bank"],
])("Q8 - processPayment method=%s", (method) => {
  test.each([
    [true,  "international"],
    [false, "domestic"],
  ])("isInternational=%s (%s)", (isInternational) => {
    const amount = 1000;
    const result = processPayment(amount, method, isInternational);
    expect(typeof result).toBe("number");
    expect(isFinite(result)).toBe(true);
    expect(result).toBeGreaterThan(amount);
  });

  test("explicit domestic total for card", () => {
    if (method !== "card") return;
    expect(processPayment(1000, "card", false)).toBe(1025);
  });

  test("explicit international total for card", () => {
    if (method !== "card") return;
    expect(processPayment(1000, "card", true)).toBe(1040);
  });

  test("explicit domestic total for bank", () => {
    if (method !== "bank") return;
    expect(processPayment(1000, "bank", false)).toBe(1010);
  });

  test("explicit international total for bank", () => {
    if (method !== "bank") return;
    expect(processPayment(1000, "bank", true)).toBe(1025);
  });
});

describe("Q8 - processPayment edge cases", () => {
  test("rejects amount 0", () => {
    expect(() => processPayment(0, "card", false)).toThrow(TypeError);
  });

  test("rejects negative amount", () => {
    expect(() => processPayment(-100, "card", false)).toThrow(TypeError);
  });

  test("rejects Infinity amount", () => {
    expect(() => processPayment(Infinity, "card", false)).toThrow(TypeError);
  });

  test("rejects unsupported method", () => {
    expect(() => processPayment(100, "cash", false)).toThrow("Unsupported payment method");
  });

  test("rejects non-boolean isInternational", () => {
    expect(() => processPayment(100, "card", "yes")).toThrow(TypeError);
  });

  test("handles decimal amount correctly", () => {
    const result = processPayment(99.99, "bank", false);
    const decimals = result.toString().split(".")[1]?.length ?? 0;
    expect(decimals).toBeLessThanOrEqual(2);
  });

  test("large amount with card international", () => {
    expect(processPayment(100000, "card", true)).toBe(104000);
  });

  test("small amount rounds to 2 decimals", () => {
    const result = processPayment(1, "card", true);
    expect(result).toBe(1.04);
  });

  test("bank domestic: fee is exactly 10", () => {
    expect(processPayment(500, "bank", false)).toBe(510);
  });

  test("card domestic: 2.5% fee applied", () => {
    expect(processPayment(200, "card", false)).toBe(205);
  });

  test("card international: 4% total fee applied", () => {
    expect(processPayment(200, "card", true)).toBe(208);
  });

  test("bank international: 10 + 1.5% fee applied", () => {
    expect(processPayment(200, "bank", true)).toBe(213);
  });
});


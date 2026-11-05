import { calculateTuition, findMostExpensiveCourse } from "../../src/tuition.js";

const c1 = { creditHours: 3, pricePerCredit: 100 };
const c2 = { creditHours: 4, pricePerCredit: 150 };

describe("Q3 - calculateTuition", () => {
  test("rejects non-array courses input", () => {
    expect(() => calculateTuition("not-array")).toThrow(TypeError);
  });

  test("no courses returns zeros", () => {
    expect(calculateTuition([])).toEqual({ subtotal: 0, discount: 0, payable: 0 });
  });

  test("one course no scholarship", () => {
    expect(calculateTuition([c1])).toEqual({ subtotal: 300, discount: 0, payable: 300 });
  });

  test("several courses", () => {
    expect(calculateTuition([c1, c2])).toEqual({ subtotal: 900, discount: 0, payable: 900 });
  });

  test("omitted scholarshipRate defaults to 0", () => {
    const r = calculateTuition([c1]);
    expect(r.discount).toBe(0);
  });

  test("50% scholarship applied correctly", () => {
    expect(calculateTuition([c1], 0.5)).toEqual({ subtotal: 300, discount: 150, payable: 150 });
  });

  test("rejects null scholarshipRate", () => {
    expect(() => calculateTuition([c1], null)).toThrow(TypeError);
  });

  test("rejects scholarshipRate above 1", () => {
    expect(() => calculateTuition([c1], 1.1)).toThrow(RangeError);
  });

  test("rejects negative scholarshipRate", () => {
    expect(() => calculateTuition([c1], -0.1)).toThrow(RangeError);
  });

  test("rejects fractional creditHours", () => {
    expect(() => calculateTuition([{ creditHours: 1.5, pricePerCredit: 100 }])).toThrow(TypeError);
  });

  test("rejects negative creditHours", () => {
    expect(() => calculateTuition([{ creditHours: -1, pricePerCredit: 100 }])).toThrow(TypeError);
  });

  test("rejects Infinity pricePerCredit", () => {
    expect(() => calculateTuition([{ creditHours: 3, pricePerCredit: Infinity }])).toThrow(RangeError);
  });

  test("rounds to two decimal places", () => {
    const courses = [{ creditHours: 1, pricePerCredit: 100.005 }];
    const { subtotal } = calculateTuition(courses);
    expect(subtotal.toString().split(".")[1]?.length ?? 0).toBeLessThanOrEqual(2);
  });

  test("does not mutate input courses", () => {
    const before = JSON.stringify([c1, c2]);
    calculateTuition([c1, c2], 0.1);
    expect(JSON.stringify([c1, c2])).toBe(before);
  });
});

describe("Q3 - findMostExpensiveCourse", () => {
  test("returns null for empty array", () => {
    expect(findMostExpensiveCourse([])).toBeNull();
  });

  test("returns the only course", () => {
    expect(findMostExpensiveCourse([c1])).toBe(c1);
  });

  test("returns the most expensive course", () => {
    expect(findMostExpensiveCourse([c1, c2])).toBe(c2);
  });

  test("returns first on tie", () => {
    const a = { creditHours: 3, pricePerCredit: 100 };
    const b = { creditHours: 3, pricePerCredit: 100 };
    expect(findMostExpensiveCourse([a, b])).toBe(a);
  });
});

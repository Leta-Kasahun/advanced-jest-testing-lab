import { evaluateScholarship } from "../../src/scholarship.js";
import { scholarshipCases } from "../fixtures/scholarshipCases.js";

describe("Q7 - evaluateScholarship object-based test.each", () => {
  test.each(scholarshipCases)("$desc", ({ average, attendance, credits, disciplinaryAction, expected }) => {
    expect(evaluateScholarship({ average, attendance, credits, disciplinaryAction })).toBe(expected);
  });
});

describe("Q7 - evaluateScholarship array-based test.each", () => {
  test.each([
    [90, 95, 15, false, "Full Scholarship"],
    [80, 85, 12, false, "Partial Scholarship"],
    [70, 70, 5,  false, "Not Eligible"],
    [100, 100, 100, true, "Rejected"],
  ])("avg=%s att=%s cred=%s disc=%s => %s", (average, attendance, credits, disciplinaryAction, expected) => {
    expect(evaluateScholarship({ average, attendance, credits, disciplinaryAction })).toBe(expected);
  });
});

describe("Q7 - evaluateScholarship invalid inputs", () => {
  const base = { average: 90, attendance: 95, credits: 15, disciplinaryAction: false };

  test("rejects string average", () => {
    expect(() => evaluateScholarship({ ...base, average: "90" })).toThrow(TypeError);
  });

  test("rejects Infinity attendance", () => {
    expect(() => evaluateScholarship({ ...base, attendance: Infinity })).toThrow(TypeError);
  });

  test("rejects float credits", () => {
    expect(() => evaluateScholarship({ ...base, credits: 12.5 })).toThrow(TypeError);
  });

  test("rejects negative credits", () => {
    expect(() => evaluateScholarship({ ...base, credits: -1 })).toThrow(TypeError);
  });

  test("rejects non-boolean disciplinaryAction", () => {
    expect(() => evaluateScholarship({ ...base, disciplinaryAction: 1 })).toThrow(TypeError);
  });

  test("rejects average above 100", () => {
    expect(() => evaluateScholarship({ ...base, average: 101 })).toThrow(TypeError);
  });
});


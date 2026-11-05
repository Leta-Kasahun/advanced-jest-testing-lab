import { processResult } from "../../src/resultProcessor.js";

describe("Q9 - processResult test.each cases", () => {
  test.each([
    { id: "C01", scores: [],             expected: { average: 0,    status: "No Scores" } },
    { id: "C02", scores: [0],            expected: { average: 0,    status: "Fail" } },
    { id: "C03", scores: [100],          expected: { average: 100,  status: "Pass" } },
    { id: "C04", scores: [50],           expected: { average: 50,   status: "Pass" } },
    { id: "C05", scores: [49],           expected: { average: 49,   status: "Fail" } },
    { id: "C06", scores: [49, 50],       expected: { average: 49.5, status: "Fail" } },
    { id: "C07", scores: [50, 50],       expected: { average: 50,   status: "Pass" } },
    { id: "C08", scores: [50, 50, 50],   expected: { average: 50,   status: "Pass" } },
    { id: "C09", scores: [0, 100],       expected: { average: 50,   status: "Pass" } },
    { id: "C10", scores: [0, 0],         expected: { average: 0,    status: "Fail" } },
    { id: "C11", scores: [100, 100],     expected: { average: 100,  status: "Pass" } },
    { id: "C12", scores: [60, 70, 80],   expected: { average: 70,   status: "Pass" } },
    { id: "C13", scores: [10, 20, 30],   expected: { average: 20,   status: "Fail" } },
    { id: "C14", scores: [33.3, 33.3, 33.4], expected: { average: 33.333333333333336, status: "Fail" } },
    { id: "C15", scores: [75, 25],       expected: { average: 50,   status: "Pass" } },
  ])("[$id] scores=$scores => $expected.status", ({ scores, expected }) => {
    expect(processResult(scores)).toEqual(expected);
  });
});

describe("Q9 - processResult invalid inputs", () => {
  test("rejects string in array", () => {
    expect(() => processResult(["a", 50])).toThrow(RangeError);
  });

  test("rejects nested array element", () => {
    expect(() => processResult([[50], 50])).toThrow(RangeError);
  });

  test("rejects NaN", () => {
    expect(() => processResult([NaN])).toThrow(RangeError);
  });

  test("rejects Infinity", () => {
    expect(() => processResult([Infinity])).toThrow(RangeError);
  });

  test("rejects score above 100", () => {
    expect(() => processResult([101])).toThrow(RangeError);
  });

  test("rejects score below 0", () => {
    expect(() => processResult([-1])).toThrow(RangeError);
  });

  test("rejects non-array input", () => {
    expect(() => processResult("50")).toThrow(TypeError);
  });

  test("does not mutate input array", () => {
    const input = [80, 60, 40];
    const copy = [...input];
    processResult(input);
    expect(input).toEqual(copy);
  });
});


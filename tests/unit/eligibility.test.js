import { checkEligibility } from "../../src/eligibility.js";

function fom1(age, score, hasDocument) {
  if (age > 18 && score >= 60 && hasDocument) return "Eligible";
  return "Not Eligible";
}

function fom2(age, score, hasDocument) {
  if (age >= 18 && score > 60 && hasDocument) return "Eligible";
  return "Not Eligible";
}

function fom3(age, score, hasDocument) {
  if (age >= 18 || score >= 60 && hasDocument) return "Eligible";
  return "Not Eligible";
}

function som(age, score, hasDocument) {
  if (age > 18 && score > 60 && hasDocument) return "Eligible";
  return "Not Eligible";
}

function tom(age, score, hasDocument) {
  if (age > 18 || score > 60 && hasDocument) return "Eligible";
  return "Not Eligible";
}

describe("Q13 - checkEligibility baseline", () => {
  test.each([
    [18, 60, true,  "Eligible"],
    [18, 60, false, "Not Eligible"],
    [17, 60, true,  "Not Eligible"],
    [18, 59, true,  "Not Eligible"],
    [0,  0,  false, "Not Eligible"],
    [100, 100, true, "Eligible"],
  ])("age=%s score=%s doc=%s => %s", (age, score, hasDocument, expected) => {
    expect(checkEligibility(age, score, hasDocument)).toBe(expected);
  });
});

describe("Q13 - FOM1 (age >= to >)", () => {
  test.each([
    [18, 60, true],
    [19, 60, true],
  ])("FOM1 killed by age=18 exact boundary", (age, score, hasDocument) => {
    const original = checkEligibility(age, score, hasDocument);
    const mutant = fom1(age, score, hasDocument);
    if (age === 18) expect(mutant).not.toBe(original);
  });
});

describe("Q13 - FOM2 (score >= to >)", () => {
  test.each([
    [18, 60, true],
    [18, 61, true],
  ])("FOM2 killed by score=60 exact boundary", (age, score, hasDocument) => {
    const original = checkEligibility(age, score, hasDocument);
    const mutant = fom2(age, score, hasDocument);
    if (score === 60) expect(mutant).not.toBe(original);
  });
});

describe("Q13 - FOM3 (first && to ||)", () => {
  test("FOM3 killed: age=17 becomes Eligible instead of Not Eligible", () => {
    expect(checkEligibility(17, 60, true)).toBe("Not Eligible");
    expect(fom3(17, 60, true)).toBe("Eligible");
  });
});

describe("Q13 - SOM (age> and score>)", () => {
  test("SOM killed: age=18,score=60 returns Not Eligible", () => {
    expect(checkEligibility(18, 60, true)).toBe("Eligible");
    expect(som(18, 60, true)).toBe("Not Eligible");
  });
});

describe("Q13 - TOM (all three changes)", () => {
  test("TOM not killed on age=19,score=61: both return Eligible", () => {
    expect(checkEligibility(19, 61, true)).toBe("Eligible");
    expect(tom(19, 61, true)).toBe("Eligible");
  });

  test("TOM killed: age=17,score=61,doc=true - original Not Eligible, TOM Eligible", () => {
    expect(checkEligibility(17, 61, true)).toBe("Not Eligible");
    expect(tom(17, 61, true)).toBe("Eligible");
  });
});

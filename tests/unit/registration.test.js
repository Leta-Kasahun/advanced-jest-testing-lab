import { registerStudent } from "../../src/registration.js";

describe("Q1 - registerStudent", () => {
  const valid = { id: 1, name: "Alice", age: 18, email: "alice@uni.edu" };

  test("registers a valid student", () => {
    expect(registerStudent(valid)).toEqual({
      id: 1, name: "Alice", age: 18, email: "alice@uni.edu", status: "Registered"
    });
  });

  test("trims name and lowercases email", () => {
    const r = registerStudent({ id: 2, name: "  Bob  ", age: 20, email: "BOB@UNI.EDU" });
    expect(r.name).toBe("Bob");
    expect(r.email).toBe("bob@uni.edu");
  });

  test("accepts age 18 (boundary)", () => {
    expect(() => registerStudent({ ...valid, age: 18 })).not.toThrow();
  });

  test("rejects age 17", () => {
    expect(() => registerStudent({ ...valid, age: 17 })).toThrow(RangeError);
  });

  test("accepts age 120 (upper boundary)", () => {
    expect(() => registerStudent({ ...valid, age: 120 })).not.toThrow();
  });

  test("rejects age 121", () => {
    expect(() => registerStudent({ ...valid, age: 121 })).toThrow(RangeError);
  });

  test("rejects blank name", () => {
    expect(() => registerStudent({ ...valid, name: "   " })).toThrow(TypeError);
  });

  test("rejects empty name string", () => {
    expect(() => registerStudent({ ...valid, name: "" })).toThrow(TypeError);
  });

  test("rejects malformed email without @", () => {
    expect(() => registerStudent({ ...valid, email: "nodomain" })).toThrow(TypeError);
  });

  test("rejects email without domain part", () => {
    expect(() => registerStudent({ ...valid, email: "user@" })).toThrow(TypeError);
  });

  test("rejects non-integer id", () => {
    expect(() => registerStudent({ ...valid, id: 1.5 })).toThrow(TypeError);
  });

  test("rejects id of zero", () => {
    expect(() => registerStudent({ ...valid, id: 0 })).toThrow(TypeError);
  });

  test("rejects negative id", () => {
    expect(() => registerStudent({ ...valid, id: -1 })).toThrow(TypeError);
  });

  test("rejects non-string name (number)", () => {
    expect(() => registerStudent({ ...valid, name: 42 })).toThrow(TypeError);
  });

  test("rejects non-number age (string)", () => {
    expect(() => registerStudent({ ...valid, age: "20" })).toThrow(RangeError);
  });

  test("does not mutate the input object", () => {
    const input = { id: 3, name: "  Carol  ", age: 25, email: "CAROL@UNI.EDU" };
    const copy = { ...input };
    registerStudent(input);
    expect(input).toEqual(copy);
  });

  test("toEqual vs toStrictEqual with nested data", () => {
    const a = { profile: { name: "Dan", scores: [90, 80] } };
    const b = { profile: { name: "Dan", scores: [90, 80] } };
    expect(a).toEqual(b);
    expect(a).toStrictEqual(b);

    const c = { profile: { name: "Dan", scores: [90, 80], extra: undefined } };
    expect(c).toEqual(b);
    expect(c).not.toStrictEqual(b);
  });

  test("rejects null input", () => {
    expect(() => registerStudent(null)).toThrow(TypeError);
  });
});

import { jest } from "@jest/globals";
import { FakeDatabase } from "../../src/fakeDatabase.js";

describe("Q6 - FakeDatabase lifecycle hooks", () => {
  let db;
  const hookLog = [];

  beforeAll(() => {
    db = new FakeDatabase();
    db.connect();
    hookLog.push("beforeAll:connect");
  });

  afterAll(() => {
    db.disconnect();
    hookLog.push("afterAll:disconnect");
  });

  beforeEach(() => {
    db.records = [];
    hookLog.push("beforeEach:reset");
  });

  test("insert succeeds when connected", () => {
    db.insert({ id: 1 });
    expect(db.records).toHaveLength(1);
  });

  test("no record leakage between tests", () => {
    expect(db.records).toHaveLength(0);
    db.insert({ id: 2 });
    expect(db.records).toHaveLength(1);
  });

  test("insert throws when disconnected", () => {
    db.disconnect();
    expect(() => db.insert({ id: 3 })).toThrow("Database not connected");
    db.connect();
  });

  describe("Q6 - Nested describe with scoped hooks", () => {
    const nestedLog = [];

    beforeAll(() => nestedLog.push("nested:beforeAll"));
    afterAll(() => nestedLog.push("nested:afterAll"));
    beforeEach(() => nestedLog.push("nested:beforeEach"));
    afterEach(() => nestedLog.push("nested:afterEach"));

    test("nested test can insert", () => {
      db.insert({ id: 10 });
      expect(db.records).toHaveLength(1);
    });

    test("nested hook order is correct", () => {
      expect(nestedLog).toContain("nested:beforeAll");
      expect(nestedLog[0]).toBe("nested:beforeAll");
    });
  });

  test("disconnect spy called on cleanup path", () => {
    const spy = jest.spyOn(db, "disconnect");
    db.disconnect();
    expect(spy).toHaveBeenCalledTimes(1);
    db.connect();
    spy.mockRestore();
  });
});

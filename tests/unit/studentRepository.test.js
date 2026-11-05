import { jest } from "@jest/globals";
import { StudentRepository } from "../../src/studentRepository.js";

function createStudentFixture(overrides = {}) {
  return { id: 1, name: "Alice", ...overrides };
}

describe("Q5 - StudentRepository test-order failure (shared state demo)", () => {
  const sharedRepo = new StudentRepository();

  test("adds student to shared repo", () => {
    sharedRepo.add(createStudentFixture({ id: 10 }));
    expect(sharedRepo.count()).toBe(1);
  });

  test("shared state leaks: count is now 1 not 0", () => {
    expect(sharedRepo.count()).toBe(1);
  });
});

describe("Q5 - StudentRepository isolated", () => {
  let repo;

  beforeEach(() => {
    repo = new StudentRepository();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("adding students", () => {
    test("adds and retrieves a student", () => {
      const s = createStudentFixture();
      repo.add(s);
      expect(repo.findById(1)).toEqual(s);
    });

    test("count increments", () => {
      repo.add(createStudentFixture({ id: 1 }));
      repo.add(createStudentFixture({ id: 2 }));
      expect(repo.count()).toBe(2);
    });
  });

  describe("removing students", () => {
    test("remove decrements count", () => {
      repo.add(createStudentFixture({ id: 1 }));
      repo.remove(1);
      expect(repo.count()).toBe(0);
    });

    test("findById returns undefined after remove", () => {
      repo.add(createStudentFixture({ id: 1 }));
      repo.remove(1);
      expect(repo.findById(1)).toBeUndefined();
    });
  });

  describe("duplicate IDs", () => {
    test("throws on duplicate ID", () => {
      repo.add(createStudentFixture({ id: 1 }));
      expect(() => repo.add(createStudentFixture({ id: 1 }))).toThrow("Duplicate student ID");
    });
  });

  describe("state independence between tests", () => {
    test("repo starts empty", () => {
      expect(repo.count()).toBe(0);
    });

    test("repo is still empty in next test", () => {
      expect(repo.count()).toBe(0);
    });
  });
});

import { jest } from "@jest/globals";
import { EnrollmentManager } from "../../src/enrollment.js";

describe("Q4 - EnrollmentManager", () => {
  let notifier;
  let manager;

  beforeEach(() => {
    notifier = { send: jest.fn() };
    manager = new EnrollmentManager(notifier);
  });

  test("enroll creates a record and notifies", () => {
    const record = manager.enroll("s1", "c1");
    expect(record).toEqual({ studentId: "s1", courseId: "c1" });
    expect(notifier.send).toHaveBeenCalledWith("s1", "Enrolled in course c1");
    expect(notifier.send).toHaveBeenCalledTimes(1);
  });

  test("notification text is exact", () => {
    manager.enroll("s2", "c2");
    expect(notifier.send).toHaveBeenCalledWith("s2", "Enrolled in course c2");
  });

  test("rejects duplicate enrollment", () => {
    manager.enroll("s1", "c1");
    expect(() => manager.enroll("s1", "c1")).toThrow("Duplicate enrollment");
  });

  test("duplicate does not add extra record", () => {
    manager.enroll("s1", "c1");
    try { manager.enroll("s1", "c1"); } catch {}
    expect(manager.getEnrollments("s1")).toHaveLength(1);
  });

  test("duplicate does not send extra notification", () => {
    manager.enroll("s1", "c1");
    try { manager.enroll("s1", "c1"); } catch {}
    expect(notifier.send).toHaveBeenCalledTimes(1);
  });

  test("two students can share the same course", () => {
    manager.enroll("s1", "c1");
    manager.enroll("s2", "c1");
    expect(manager.getEnrollments("s1")).toHaveLength(1);
    expect(manager.getEnrollments("s2")).toHaveLength(1);
  });

  test("notification failure rolls back enrollment", () => {
    notifier.send.mockImplementation(() => { throw new Error("send failed"); });
    expect(() => manager.enroll("s1", "c1")).toThrow("send failed");
    expect(manager.getEnrollments("s1")).toHaveLength(0);
  });

  test("unenroll returns true when removed", () => {
    manager.enroll("s1", "c1");
    expect(manager.unenroll("s1", "c1")).toBe(true);
  });

  test("unenroll returns false when not found", () => {
    expect(manager.unenroll("s1", "c99")).toBe(false);
  });

  test("getEnrollments returns a defensive copy", () => {
    manager.enroll("s1", "c1");
    const list = manager.getEnrollments("s1");
    list[0].courseId = "hacked";
    expect(manager.getEnrollments("s1")[0].courseId).toBe("c1");
  });

  test("getEnrollments filters by student", () => {
    manager.enroll("s1", "c1");
    manager.enroll("s2", "c2");
    expect(manager.getEnrollments("s1")).toHaveLength(1);
  });
});

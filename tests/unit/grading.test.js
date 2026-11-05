import { GradeBook } from "../../src/grading.js";

describe("Q2 - GradeBook", () => {
  let gb;

  beforeEach(() => {
    gb = new GradeBook("s1");
  });

  test("average of empty gradebook is 0", () => {
    expect(gb.getAverage()).toBe(0);
  });

  test("highest score of empty gradebook is null", () => {
    expect(gb.getHighestScore()).toBeNull();
  });

  test("average with one score", () => {
    gb.addScore(80);
    expect(gb.getAverage()).toBe(80);
  });

  test("average with multiple scores", () => {
    gb.addScore(60);
    gb.addScore(80);
    gb.addScore(100);
    expect(gb.getAverage()).toBeCloseTo(80);
  });

  test("accepts duplicate scores", () => {
    gb.addScore(50);
    gb.addScore(50);
    expect(gb.getAverage()).toBe(50);
  });

  test("accepts score 0", () => {
    expect(() => gb.addScore(0)).not.toThrow();
  });

  test("accepts score 100", () => {
    expect(() => gb.addScore(100)).not.toThrow();
  });

  test("rejects score above 100", () => {
    expect(() => gb.addScore(101)).toThrow(RangeError);
  });

  test("rejects negative score", () => {
    expect(() => gb.addScore(-1)).toThrow(RangeError);
  });

  test("rejects non-number score", () => {
    expect(() => gb.addScore("90")).toThrow(RangeError);
  });

  test("rejects Infinity score", () => {
    expect(() => gb.addScore(Infinity)).toThrow(RangeError);
  });

  test("two GradeBook instances are independent", () => {
    const gb2 = new GradeBook("s2");
    gb.addScore(90);
    gb2.addScore(40);
    expect(gb.getAverage()).toBe(90);
    expect(gb2.getAverage()).toBe(40);
  });

  test("removeLowestScore from empty returns null", () => {
    expect(gb.removeLowestScore()).toBeNull();
  });

  test("removeLowestScore removes and returns the lowest", () => {
    gb.addScore(70);
    gb.addScore(50);
    gb.addScore(90);
    expect(gb.removeLowestScore()).toBe(50);
    expect(gb.scores).toEqual([70, 90]);
  });

  test("removeLowestScore with single score", () => {
    gb.addScore(60);
    expect(gb.removeLowestScore()).toBe(60);
    expect(gb.scores).toHaveLength(0);
  });

  test("removeLowestScore removes only one on tie", () => {
    gb.addScore(40);
    gb.addScore(40);
    gb.addScore(80);
    gb.removeLowestScore();
    expect(gb.scores).toEqual([40, 80]);
  });

  test("isPassing at 49.99 is false", () => {
    expect(GradeBook.isPassing(49.99)).toBe(false);
  });

  test("isPassing at 50 is true", () => {
    expect(GradeBook.isPassing(50)).toBe(true);
  });

  test("isPassing at 50.01 is true", () => {
    expect(GradeBook.isPassing(50.01)).toBe(true);
  });

  test("getHighestScore with scores returns max", () => {
    gb.addScore(60);
    gb.addScore(90);
    gb.addScore(75);
    expect(gb.getHighestScore()).toBe(90);
  });

  test("no state leakage between tests", () => {
    expect(gb.scores).toHaveLength(0);
  });
});

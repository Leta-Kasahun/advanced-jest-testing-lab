export function processResult(scores) {
  if (!Array.isArray(scores)) throw new TypeError("scores must be an array");

  for (const s of scores) {
    if (typeof s !== "number" || !isFinite(s) || s < 0 || s > 100) {
      throw new RangeError("Each score must be a finite number between 0 and 100");
    }
  }

  if (scores.length === 0) return { average: 0, status: "No Scores" };

  const average = scores.reduce((sum, s) => sum + s, 0) / scores.length;
  return { average, status: average >= 50 ? "Pass" : "Fail" };
}


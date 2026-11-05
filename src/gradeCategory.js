export function categorizeGrade(score) {
  if (typeof score !== "number" || !isFinite(score)) {
    throw new TypeError("score must be a finite number");
  }
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}


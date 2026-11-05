export function evaluateScholarship(student) {
  const { average, attendance, credits, disciplinaryAction } = student;

  if (typeof average !== "number" || !isFinite(average) || average < 0 || average > 100) {
    throw new TypeError("average must be a finite number between 0 and 100");
  }
  if (typeof attendance !== "number" || !isFinite(attendance) || attendance < 0 || attendance > 100) {
    throw new TypeError("attendance must be a finite number between 0 and 100");
  }
  if (!Number.isInteger(credits) || credits < 0) {
    throw new TypeError("credits must be a nonnegative integer");
  }
  if (typeof disciplinaryAction !== "boolean") {
    throw new TypeError("disciplinaryAction must be a boolean");
  }

  if (disciplinaryAction) return "Rejected";

  if (average >= 90 && attendance >= 95 && credits >= 15) return "Full Scholarship";
  if (average >= 80 && attendance >= 85 && credits >= 12) return "Partial Scholarship";

  return "Not Eligible";
}


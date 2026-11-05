function round2(n) {
  return Math.round(n * 100) / 100;
}

export function calculateTuition(courses, scholarshipRate = 0) {
  if (!Array.isArray(courses)) {
    throw new TypeError("Courses must be an array");
  }

  if (typeof scholarshipRate !== "number" || scholarshipRate === null) {
    throw new TypeError("scholarshipRate must be a number");
  }

  if (!isFinite(scholarshipRate) || scholarshipRate < 0 || scholarshipRate > 1) {
    throw new RangeError("scholarshipRate must be between 0 and 1");
  }

  for (const course of courses) {
    if (!Number.isInteger(course.creditHours) || course.creditHours < 0) {
      throw new TypeError("creditHours must be a nonnegative integer");
    }
    if (typeof course.pricePerCredit !== "number" || !isFinite(course.pricePerCredit) || course.pricePerCredit < 0) {
      throw new RangeError("pricePerCredit must be a nonnegative finite number");
    }
  }

  const subtotal = round2(courses.reduce((sum, c) => sum + c.creditHours * c.pricePerCredit, 0));
  const discount = round2(subtotal * scholarshipRate);
  const payable = round2(subtotal - discount);

  return { subtotal, discount, payable };
}

export function findMostExpensiveCourse(courses) {
  if (!Array.isArray(courses) || courses.length === 0) return null;
  return courses.reduce((best, c) => {
    return c.creditHours * c.pricePerCredit > best.creditHours * best.pricePerCredit ? c : best;
  });
}


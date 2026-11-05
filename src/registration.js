export function registerStudent(student) {
  if (student === null || typeof student !== "object") {
    throw new TypeError("Student must be an object");
  }

  if (!Number.isSafeInteger(student.id) || student.id <= 0) {
    throw new TypeError("ID must be a positive safe integer");
  }

  if (typeof student.name !== "string" || student.name.trim() === "") {
    throw new TypeError("Student name is required");
  }

  if (!Number.isInteger(student.age) || student.age < 18 || student.age > 120) {
    throw new RangeError("Age must be an integer between 18 and 120");
  }

  if (typeof student.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)) {
    throw new TypeError("Invalid email");
  }

  return {
    id: student.id,
    name: student.name.trim(),
    age: student.age,
    email: student.email.toLowerCase(),
    status: "Registered"
  };
}


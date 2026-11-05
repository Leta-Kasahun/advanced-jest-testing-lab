export class EnrollmentManager {
  constructor(notifier) {
    this.enrollments = [];
    this.notifier = notifier;
  }

  enroll(studentId, courseId) {
    const exists = this.enrollments.some(
      r => r.studentId === studentId && r.courseId === courseId
    );
    if (exists) throw new Error("Duplicate enrollment");

    const record = { studentId, courseId };
    this.enrollments.push(record);

    try {
      this.notifier.send(studentId, `Enrolled in course ${courseId}`);
    } catch (err) {
      this.enrollments.pop();
      throw err;
    }

    return record;
  }

  unenroll(studentId, courseId) {
    const index = this.enrollments.findIndex(
      r => r.studentId === studentId && r.courseId === courseId
    );
    if (index === -1) return false;
    this.enrollments.splice(index, 1);
    return true;
  }

  getEnrollments(studentId) {
    return this.enrollments
      .filter(r => r.studentId === studentId)
      .map(r => ({ ...r }));
  }
}


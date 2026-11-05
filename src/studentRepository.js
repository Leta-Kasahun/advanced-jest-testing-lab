export class StudentRepository {
  constructor() {
    this.students = [];
  }

  add(student) {
    if (this.students.some(s => s.id === student.id)) {
      throw new Error("Duplicate student ID");
    }
    this.students.push(student);
    return student;
  }

  findById(id) {
    return this.students.find(s => s.id === id);
  }

  remove(id) {
    this.students = this.students.filter(s => s.id !== id);
  }

  count() {
    return this.students.length;
  }
}


export class GradeBook {
  constructor(studentId) {
    this.studentId = studentId;
    this.scores = [];
  }

  addScore(score) {
    if (typeof score !== "number" || !isFinite(score) || score < 0 || score > 100) {
      throw new RangeError("Score must be a finite number between 0 and 100");
    }
    this.scores.push(score);
  }

  getAverage() {
    if (this.scores.length === 0) return 0;
    return this.scores.reduce((sum, s) => sum + s, 0) / this.scores.length;
  }

  getHighestScore() {
    if (this.scores.length === 0) return null;
    return Math.max(...this.scores);
  }

  removeLowestScore() {
    if (this.scores.length === 0) return null;
    const lowest = Math.min(...this.scores);
    const index = this.scores.indexOf(lowest);
    this.scores.splice(index, 1);
    return lowest;
  }

  static isPassing(average) {
    return average >= 50;
  }
}


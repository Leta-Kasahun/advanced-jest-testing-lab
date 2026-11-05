export class FakeDatabase {
  constructor() {
    this.connected = false;
    this.records = [];
  }

  connect() {
    this.connected = true;
  }

  insert(record) {
    if (!this.connected) throw new Error("Database not connected");
    this.records.push(record);
  }

  disconnect() {
    this.connected = false;
  }
}


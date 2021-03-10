class DatabaseManager {
  static #instance = new DatabaseManager();

  constructor() {
    console.log("constructor");
  }

  static get instance() {
    if (!this.#instance) this.#instance = new DatabaseManager();
    return this.#instance;
  }

  saveTodo() {}

  saveTodos(todos) {}

  async getTodos(userId) {}

  async test() {
    const res = await this.getTodos("6048b187aad7023fd8281f71");
    console.log(res.data());
  }
}

export default DatabaseManager;

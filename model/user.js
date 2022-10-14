const { g } = require("../db/jgClient");

module.exports = class User {
  constructor(email) {
    this.email = email;
  }

  async isValidUser() {
    return await g
      .V()
      .has("type", "user")
      .has("email", this.email)
      .has("status_id", 1)
      .hasNext();
  }
};

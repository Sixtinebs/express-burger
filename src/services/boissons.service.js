const db = require("../db");

async function findAll() {
      return db.run("SELECT * FROM boissons");
  }

async function remove(id) {
    return db.run("DELETE FROM boisson WHERE (id = ?)", [id]);
  }

  module.exports = {
    findAll,
    remove,
  };
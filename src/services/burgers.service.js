const db = require("../db");

async function findAll() {
      return db.run("SELECT * FROM burgers");
  }

async function remove(id) {
    return db.run("DELETE FROM burgers WHERE (id = ?)", [id]);
  }

  module.exports = {
    findAll,
    remove,
  };
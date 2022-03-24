const db = require("../db");

async function findAll() {
      return db.run("SELECT * FROM menus");
  }

async function remove(id) {
    return db.run("DELETE FROM menus WHERE (id = ?)", [id]);
  }

  module.exports = {
    findAll,
    remove,
  };
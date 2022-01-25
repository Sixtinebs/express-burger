const path = require("path");
const fs = require("fs");
const sqlite = require("sqlite3");

const dbFile = path.resolve(__dirname, "../data/db.sqlite");

const args = process.argv.slice(2);

if (fs.existsSync(dbFile)) {
  if (!args.includes("--force")) {
    console.log(
      "Db file already exists, delete it first or use the --force flag!"
    );
    process.exit(1);
  } else {
    console.log("DB already exists, Deleting it...");
    fs.rmSync(dbFile);
  }
}

const db = new sqlite.Database(dbFile);

db.serialize(() => {
  console.log("Creating tables...");
  db.run("PRAGMA foreign_keys = ON");

  // create menu table
  db.run(
    "CREATE TABLE menu (id INTEGER PRIMARY KEY, nom TEXT, accompagnement TEXT, description TEXT, prix INTEGER, photo TEXT, burger TEXT, boisson TEXT)"
  );

  // create burger table
  db.run(
    "CREATE TABLE burger (id INTEGER PRIMARY KEY, nom TEXT, description TEXT, prix INTEGER,  photo TEXT )"
  );
  // create boisson table
  db.run(
    "CREATE TABLE boisson (id INTEGER PRIMARY KEY, nom TEXT, description TEXT, prix INTEGER,  photo TEXT )"
  );

  if (args.includes("--seed")) {
    console.log("Seeding data into database...");

    db.run(
      'INSERT INTO burger (id, nom, description, prix, photo) VALUES (1, "burger 1", "description du burger 1", 8, "")'
    );

    db.run(
      'INSERT INTO boisson (id, nom, description, prix, photo) VALUES (1, "Boisson 1", description du boisson 1, 3, "")'
    );
  }
});

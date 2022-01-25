const path = require("path");
const fs = require("fs");
const sqlite = require("sqlite3");

const dbFile = path.resolve(__dirname, "../data/db.sqlite");

const args = process.argv.slice(2);

if (fs.existsSync(dbFile)) {
  if (!args.includes("--force")) {
    console.log(
      "Db file already exists, delete it first or use the -- --force flag!"
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
 
  // create burger table
  db.run(
    "CREATE TABLE burger (id INTEGER PRIMARY KEY, nom TEXT, prix INTEGER, description INTEGER, photoURL TEXT)"
  );

  // create boisson table
  db.run(
    "CREATE TABLE boisson (id INTEGER PRIMARY KEY, nom TEXT, prix INTEGER, description INTEGER, photoURL TEXT)"
  );

   // create menu table
  db.run(
    "CREATE TABLE menu (id INTEGER PRIMARY KEY, nom TEXT, accompagnement TEXT, description TEXT, prix INTEGER, photoURL TEXT, burgerId TEXT, boissonId TEXT)"

  );

  if (args.includes("--seed")) {
    console.log("Seeding data into database...");

    db.run(

      'INSERT INTO burger (id, nom, prix, description) VALUES (1, "Burger 1", 4, "This is the description")'

    );
  }
});

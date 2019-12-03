const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

const app = express();
const PORT = process.env.PORT || 3000;
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/notes", function(req, res) {
  // console.log(path.join(__dirname, "db", "db.json"));
  // console.log(db);
  const db = fs.readFileAsync(path.join(__dirname, "db", "db.json"));
  console.log(db);
  console.log("Hello?");
  return res.json(db);
});

app.listen(PORT, function() {
  console.log("App listening on PORT http://localhost:" + PORT);
});

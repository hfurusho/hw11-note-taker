const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

const app = express();
const PORT = process.env.PORT || 3000;
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
const dbPath = path.join(__dirname, "db", "db.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/notes", async function(req, res) {
  try {
    const notes = getNotes();
    console.log(notes);
    return res.send(notes);
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/notes", function(req, res) {
  let notes = getNotes();
  notes.push(req.body);
  console.log(notes);
  writeFileAsync(dbPath, JSON.stringify(notes));
  res.send(notes);
});

// app.get("/api/notes/:id")

function getNotes() {
  let notes = fs.readFileSync(dbPath, "utf8");
  notes = JSON.parse(notes);
  return notes;
}

app.listen(PORT, function() {
  console.log("App listening on PORT http://localhost:" + PORT);
});

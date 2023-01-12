const notes = require("express").Router();
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");
const fs = require("fs");

// GET Route for retreiving all tips in db
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
notes.post("/", (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json("Note added successfully");
  } else {
    res.errored("Error in adding tip");
  }
  console.log("Note Saved");
});

// DELETE Route for saved note
notes.delete("/:id", (req, res) => {
  let db = JSON.parse(fs.readFileSync("db/db.json"));

  let deleteNotes = db.filter((item) => item.id !== req.params.id);

  // Rewrite note to db.json
  fs.writeFileSync("db/db.json", JSON.stringify(deleteNotes));
  res.json(deleteNotes);
  console.log("Note Deleted");
});

module.exports = notes;
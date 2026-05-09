import Note from "../models/Note.js";


// CREATE NOTE
export const createNote = async (req, res) => {
  try {
    const note = await Note.create({
      content: req.body.content,
      user: req.user.id
    });
    res.json(note);
  } catch {
    res.status(500).json({ msg: "Error creating note" });
  }
};


// GET MY NOTES
export const getMyNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
};


// ADMIN: GET ALL NOTES
export const getAllNotes = async (req, res) => {
  const notes = await Note.find().populate("user", "email role");
  res.json(notes);
};


// ADMIN: DELETE NOTE
export const deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};
// noteSlice.js
import { createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    setNotes: (state, action) => {
      return action.payload;
    },
    addNote: (state, action) => {
      state.push(action.payload);
    },
    deleteNote: (state, action) => {
      return state.filter(note => note._id !== action.payload);
    }
  }
});

export const { setNotes, addNote, deleteNote: deleteNoteAction } = noteSlice.actions;
export default noteSlice.reducer;


// 📄 GET MY NOTES
export const fetchMyNotes = () => async (dispatch) => {
  const res = await api.get("/notes/my");
  dispatch(setNotes(res.data));
};

// ➕ CREATE NOTE
export const createNote = (content) => async (dispatch) => {
  const res = await api.post("/notes", { content });
  dispatch(addNote(res.data));
};

// 👑 ADMIN: GET ALL
export const fetchAllNotes = () => async (dispatch) => {
  const res = await api.get("/notes/all");
  dispatch(setNotes(res.data));
};

// ADMIN: DELETE NOTE
export const deleteNote = (id) => async (dispatch) => {
  await api.delete(`/notes/${id}`);
  dispatch(deleteNoteAction(id));
};
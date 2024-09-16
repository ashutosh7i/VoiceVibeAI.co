"use client";

import React, { useState, useEffect } from "react";
import withAuth from "@/auth/withAuth";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    setNotes(storedNotes);
  }, []);

  const addNote = () => {
    if (newNote.trim() !== "") {
      const newNoteObj = { id: Date.now(), content: newNote };
      const updatedNotes = [...notes, newNoteObj];
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      setNewNote("");
    }
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">My Notes</h1>
      <h3>
        {"(These notes stay on your device only, for privacy reasons. 😉)"}
      </h3>
      <div className="flex mb-4">
        <textarea
          type="text"
          className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a new note"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={addNote}
      >
        Add Note
      </button>
      <div className="pt-5 space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="bg-white p-4 rounded-md shadow">
            <p className="mb-2">{note.content}</p>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={() => deleteNote(note.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withAuth(Notes);

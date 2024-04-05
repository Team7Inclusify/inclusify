import React, { useState, useEffect } from "react";
import "./NotePad.css";
import { auth, database } from "../../config/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export default function NotePad(props) {
  const [authUser, setAuthUser] = useState(null);
  const [notePadContent, setNotePadContent] = useState("none");
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [noteResults, setNotesResults] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        setAuthUser(user);
      } else {
        // No user is signed in.
        setAuthUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const noteRef = collection(database, "note");

  const uploadNewNote = async () => {
    try {
      await addDoc(noteRef, {
        title: newNoteTitle,
        content: newNoteContent,
        createdAt: serverTimestamp(),
        creator: authUser.uid,
      });
      setNotePadContent("none");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authUser) {
      const noteQuery = query(
        noteRef,
        where("creator", "==", authUser.uid),
        orderBy("createdAt", "desc")
      );
      const unsubscribe = onSnapshot(noteQuery, (snapshot) => {
        let noteResults = [];
        snapshot.forEach((doc) => {
          noteResults.push({ ...doc.data(), id: doc.id });
        });
        setNotesResults(noteResults);
      });
      return () => unsubscribe();
    }
  }, [authUser]);

  return (
    <div
      className={`notepad-container ${
        props.nightMode && "notepad-container-night-mode"
      }`}
    >
      <div className="notePadHeader">
        NotePad
        <div
          className="closeNotePadHeader"
          onClick={() => props.closeNotePad()}
        >
          Close
        </div>
      </div>
      {notePadContent === "none" ? (
        <div className="notePadContent">
          <div
            className="notePadSelection"
            onClick={() => setNotePadContent("new")}
          >
            Create New One +
          </div>
          {noteResults.map((oneResult) => (
            <div key={oneResult.id}> {oneResult.title} Bruh</div>
          ))}
        </div>
      ) : (
        <>
          <button onClick={() => setNotePadContent("none")}>Back</button>
          <div>Input Title of Note</div>
          <input
            className="newNoteTitle"
            type="text"
            onChange={(event) => setNewNoteTitle(event.target.value)}
          />
          <div>Note Content</div>
          <textarea
            className="newNoteContent"
            type="text"
            onChange={(event) => setNewNoteContent(event.target.value)}
          />
          <button onClick={uploadNewNote}>Upload New Note</button>
        </>
      )}
    </div>
  );
}

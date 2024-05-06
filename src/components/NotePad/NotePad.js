import React, { useState, useEffect } from "react";
import "./NotePad.css";
import text_to_speech from "../../images/text_to_speech_icon.png";
import { auth, database } from "../../config/firebase";
import {
  addDoc,
  updateDoc,
  collection,
  serverTimestamp,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";

export default function NotePad(props) {
  const [authUser, setAuthUser] = useState(null);
  const [notePadContent, setNotePadContent] = useState("none");
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [noteResults, setNotesResults] = useState([]);
  const [editNoteTitle, setEditNoteTitle] = useState("");
  const [editNoteContent, setEditNoteContent] = useState("");
  const [editNoteID, setEditNoteID] = useState("");
  const [speechSynthesisSupported, setSpeechSynthesisSupported] =
    useState(false);
  const [originalEditTitle, setOriginalEditTitle] = useState("");
  const [originalEditContent, setOriginalEditContent] = useState("");

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
    setSpeechSynthesisSupported("speechSynthesis" in window);
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
      setNewNoteTitle("");
      setNewNoteContent("");
      setNotePadContent("none");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async () => {
    try {
      await deleteDoc(doc(database, "note", editNoteID));
      setNotePadContent("none");
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const setEditNote = (id, title, content) => {
    setNotePadContent("edit");
    setEditNoteID(id);
    setEditNoteTitle(title);
    setOriginalEditTitle(title);
    setEditNoteContent(content);
    setOriginalEditContent(content);
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

  const saveNoteChanges = async () => {
    try {
      await updateDoc(doc(database, "note", editNoteID), {
        title: editNoteTitle,
        content: editNoteContent,
        createdAt: serverTimestamp(),
      });
      setOriginalEditTitle(editNoteTitle);
      setOriginalEditContent(editNoteContent);
    } catch (error) {
      console.log(error);
    }
  };

  const goingBack = () => {
    setNotePadContent("none");
    setNewNoteTitle("");
    setNewNoteContent("");
    setEditNoteID("");
    setEditNoteTitle("");
    setOriginalEditTitle("");
    setEditNoteContent("");
    setOriginalEditContent("");
    window.speechSynthesis.cancel();
  };

  function textToSpeechFunction(title, content) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = title;
    window.speechSynthesis.speak(msg);
    setTimeout(() => {
      msg.text = content;
      window.speechSynthesis.speak(msg);
    }, 3000);
  }

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
            className={`notePadSelection ${
              props.nightMode && "notePadSelectionNight"
            }`}
            onClick={() => setNotePadContent("new")}
          >
            Create New One +
          </div>
          {noteResults.map((oneResult) => (
            <div
              onClick={() =>
                setEditNote(oneResult.id, oneResult.title, oneResult.content)
              }
              className={`notePadSelection ${
                props.nightMode && "notePadSelectionNight"
              }`}
              key={oneResult.id}
            >
              {oneResult.title}
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="notesButtonsBar">
            <button className="backNoteButton" onClick={goingBack}>
              Back
            </button>
          </div>
          {notePadContent === "new" ? (
            <>
              <div>Input Title of Note</div>
              <input
                className={`newNoteTitle ${
                  props.nightMode && "newNoteTitleNight"
                }`}
                type="text"
                onChange={(event) => setNewNoteTitle(event.target.value)}
              />
              <div>Note Content</div>
              <textarea
                className={`newNoteContent ${
                  props.nightMode && "newNoteContentNight"
                }`}
                type="text"
                onChange={(event) => setNewNoteContent(event.target.value)}
              />
              <div className="notesButtonsBar">
                <button onClick={uploadNewNote}>Upload New Note</button>
                {speechSynthesisSupported && (
                  <button
                    className="textToSpeechButton"
                    onClick={() =>
                      textToSpeechFunction(newNoteTitle, newNoteContent)
                    }
                  >
                    <img
                      className="textToSpeechIMG"
                      src={text_to_speech}
                      alt="Text to Speech"
                    />
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <textarea
                className={`editNoteTitle ${
                  props.nightMode && "editNoteTitleDark"
                }`}
                onChange={(event) => setEditNoteTitle(event.target.value)}
                value={editNoteTitle}
              />

              <textarea
                className={`newNoteContent ${
                  props.nightMode && "newNoteContentNight"
                }`}
                onChange={(event) => setEditNoteContent(event.target.value)}
                value={editNoteContent}
              />
              <div className="notesButtonsBar">
                <button className="deleteNoteButton" onClick={deleteNote}>
                  Delete
                </button>
                {(editNoteTitle !== originalEditTitle ||
                  editNoteContent !== originalEditContent) && (
                  <button onClick={saveNoteChanges}>Save</button>
                )}
                {speechSynthesisSupported && (
                  <button
                    className="textToSpeechButton"
                    onClick={() =>
                      textToSpeechFunction(editNoteTitle, editNoteContent)
                    }
                  >
                    <img
                      className="textToSpeechIMG"
                      src={text_to_speech}
                      alt="Text to Speech"
                    />
                  </button>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

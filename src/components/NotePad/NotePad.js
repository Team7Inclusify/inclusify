import React, { useState, useEffect } from "react";
import "./NotePad.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import text_to_speech from "../../images/text_to_speech_icon.png";
import microphone from "../../images/microphone-icon.png";
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
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [liveNewTitle, setLiveNewTitle] = useState(false);
  const [liveNewContent, setLiveNewContent] = useState(false);
  const [liveEditTitle, setLiveEditTitle] = useState(false);
  const [liveEditContent, setLiveEditContent] = useState(false);

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
      goingBack();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async () => {
    try {
      await deleteDoc(doc(database, "note", editNoteID));
      goingBack();
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
    setLiveNewContent(false);
    setLiveEditTitle(false);
    setLiveEditContent(false);
    setLiveNewTitle(false);
    setNotePadContent("none");
    setNewNoteTitle("");
    setNewNoteContent("");
    setEditNoteID("");
    setEditNoteTitle("");
    setOriginalEditTitle("");
    setEditNoteContent("");
    setOriginalEditContent("");
    resetTranscript();
    SpeechRecognition.stopListening();

    window.speechSynthesis.cancel();
  };

  const closeNotePad = () => {
    goingBack();
    props.closeNotePad();
  };

  function textToSpeechFunction(title, content) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = title + " " + content;
    window.speechSynthesis.speak(msg);
  }

  function speechToText(field) {
    if (!listening) {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
      if (field === "newTitle") {
        setLiveNewContent(false);
        setLiveEditTitle(false);
        setLiveEditContent(false);
        setLiveNewTitle(true);
      } else if (field === "newContent") {
        setLiveEditTitle(false);
        setLiveEditContent(false);
        setLiveNewTitle(false);
        setLiveNewContent(true);
      } else if (field === "editTitle") {
        setLiveEditContent(false);
        setLiveNewTitle(false);
        setLiveNewContent(false);
        setLiveEditTitle(true);
      } else if (field === "editContent") {
        setLiveNewTitle(false);
        setLiveNewContent(false);
        setLiveEditTitle(false);
        setLiveEditContent(true);
      }
    } else {
      SpeechRecognition.stopListening();
      setLiveNewContent(false);
      setLiveEditTitle(false);
      setLiveEditContent(false);
      setLiveNewTitle(false);

      if (field === "newTitle") {
        setNewNoteTitle(
          (prevTitle) =>
            `${prevTitle}${prevTitle !== "" ? " " : ""}${transcript}`
        );
      } else if (field === "newContent") {
        setNewNoteContent(
          (prevTitle) =>
            `${prevTitle}${prevTitle !== "" ? " " : ""}${transcript}`
        );
      } else if (field === "editTitle") {
        setEditNoteTitle(
          (prevTitle) =>
            `${prevTitle}${prevTitle !== "" ? " " : ""}${transcript}`
        );
      } else if (field === "editContent") {
        setEditNoteContent(
          (prevTitle) =>
            `${prevTitle}${prevTitle !== "" ? " " : ""}${transcript}`
        );
      }
      resetTranscript();
    }
  }
  return (
    <div
      className={`notepad-container ${
        props.nightMode && "notepad-container-night-mode"
      }`}
    >
      <div className="notePadHeader">
        <div className="notePadTitle">NotePad</div>
        {notePadContent !== "none" ? (
          <button className="backNoteButton" onClick={goingBack}>
            Go Back
          </button>
        ) : (
          <button
            onClick={() => setNotePadContent("new")}
            className="createNoteButton"
          >
            Create New Note +
          </button>
        )}
        <div className="closeNotePadHeader" onClick={closeNotePad}>
          Close
        </div>
      </div>
      {notePadContent === "none" ? (
        <div className="notePadContent">
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
          {notePadContent === "new" ? (
            <>
              <div className="editNotepadHeader">
                <div className="editNotepadHeaderText">Title</div>
                {browserSupportsSpeechRecognition && (
                  <button
                    className={`speechToTextButton ${
                      liveNewTitle ? "speechToTextActive" : ""
                    }`}
                    onClick={() => speechToText("newTitle")}
                  >
                    <img
                      className="speechToTextIMG"
                      src={microphone}
                      alt="Text to Speech"
                    />
                  </button>
                )}
              </div>
              <textarea
                className={`editNoteTitle ${
                  props.nightMode && "editNoteTitleDark"
                }`}
                onChange={(event) => setNewNoteTitle(event.target.value)}
                value={`${newNoteTitle}${
                  liveNewTitle ? `  ${transcript}` : ""
                }`}
              />
              <div className="editNotepadHeader">
                <div className="editNotepadHeaderText">Content</div>
                {browserSupportsSpeechRecognition && (
                  <button
                    className={`speechToTextButton ${
                      liveNewContent ? "speechToTextActive" : ""
                    }`}
                    onClick={() => speechToText("newContent")}
                  >
                    <img
                      className="speechToTextIMG"
                      src={microphone}
                      alt="Text to Speech"
                    />
                  </button>
                )}
              </div>
              <textarea
                className={`newNoteContent ${
                  props.nightMode && "newNoteContentNight"
                }`}
                type="text"
                onChange={(event) => setNewNoteContent(event.target.value)}
                value={`${newNoteContent}${
                  liveNewContent ? `  ${transcript}` : ""
                }`}
              />
              <div className="notesButtonsBar">
                <button onClick={uploadNewNote} className="saveNoteButton">
                  Save
                </button>
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
              <div className="editNotepadHeader">
                <div className="editNotepadHeaderText">Title</div>
                {browserSupportsSpeechRecognition && (
                  <button
                    className={`speechToTextButton ${
                      liveEditTitle ? "speechToTextActive" : ""
                    }`}
                    onClick={() => speechToText("editTitle")}
                  >
                    <img
                      className="speechToTextIMG"
                      src={microphone}
                      alt="Text to Speech"
                    />
                  </button>
                )}
              </div>
              <textarea
                className={`editNoteTitle ${
                  props.nightMode && "editNoteTitleDark"
                }`}
                onChange={(event) => setEditNoteTitle(event.target.value)}
                value={`${editNoteTitle}${
                  liveEditTitle ? `  ${transcript}` : ""
                }`}
              />
              <div className="editNotepadHeader">
                <div className="editNotepadHeaderText">Content</div>
                {browserSupportsSpeechRecognition && (
                  <button
                    className={`speechToTextButton ${
                      liveEditContent ? "speechToTextActive" : ""
                    }`}
                    onClick={() => speechToText("editContent")}
                  >
                    <img
                      className="speechToTextIMG"
                      src={microphone}
                      alt="Text to Speech"
                    />
                  </button>
                )}
              </div>
              <textarea
                className={`newNoteContent ${
                  props.nightMode && "newNoteContentNight"
                }`}
                onChange={(event) => setEditNoteContent(event.target.value)}
                value={`${editNoteContent}${
                  liveEditContent ? `  ${transcript}` : ""
                }`}
              />
              <div className="notesButtonsBar">
                <button className="deleteNoteButton" onClick={deleteNote}>
                  Delete
                </button>
                {(editNoteTitle !== originalEditTitle ||
                  editNoteContent !== originalEditContent) && (
                  <button className="saveNoteButton" onClick={saveNoteChanges}>
                    Save
                  </button>
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

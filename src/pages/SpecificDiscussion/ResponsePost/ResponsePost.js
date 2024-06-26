import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ResponsePost.css";
import Modal from "react-responsive-modal";
import { auth, database } from "../../../config/firebase";
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

export default function ResponsePost(props) {
  const navigate = useNavigate();

  const [discussionResponse, setDiscussionResponse] = useState("");
  const [openCreateDiscussion, setOpenCreateDiscussion] = useState(false);
  const onOpenCreateDiscussionModal = () => setOpenCreateDiscussion(true);
  const onCloseCreateDiscussionModal = () => setOpenCreateDiscussion(false);
  const [openComments, setOpenComments] = useState(false);
  const onOpenComments = () => setOpenComments(true);
  const onCloseComments = () => setOpenComments(false);
  const [responseResults, setResponseResults] = useState([]);

  const openCloseComments = () => {
    if (openComments) {
      onCloseComments();
    } else {
      onOpenComments();
    }
  };

  const uploadResponsePost = async () => {
    const responseRef = collection(database, "response");
    await addDoc(responseRef, {
      response: discussionResponse,
      createdAt: serverTimestamp(),
      uploader: props.authUser.uid,
      responseTo: props.postID,
    });
    onCloseCreateDiscussionModal();
  };

  useEffect(() => {
    const responseRef = collection(database, "response");
    const responseQuery = query(
      responseRef,
      where("responseTo", "==", props.postID)
    );
    const unsubscribe = onSnapshot(responseQuery, (snapshot) => {
      let responseResults = [];
      snapshot.forEach((doc) => {
        responseResults.push({ ...doc.data(), id: doc.id });
      });
      setResponseResults(responseResults);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="responseContainer">
      <div className="response-discussion">{props.response}</div>
      <div className="responseInfoBar">
        <div
          className="response-post-uploader"
          onClick={() => navigate(`/discussion/${props.uploader}`)}
        >
          {props.uploader}
        </div>
        <div className="responsePostButtons">
          {props.authUser && (
            <button onClick={onOpenCreateDiscussionModal}>Reply</button>
          )}
          <button onClick={openCloseComments}>Show More</button>
        </div>
      </div>
      {openComments && (
        <div className="responseToResponseHolder">
          {responseResults.map((oneResult) => (
            <ResponsePost
              response={oneResult.response}
              postID={oneResult.id}
              key={oneResult.id}
              uploader={oneResult.uploader}
              authUser={props.authUser}
            />
          ))}
        </div>
      )}

      <Modal
        open={openCreateDiscussion}
        onClose={onCloseCreateDiscussionModal}
        classNames={{ modal: "createDiscussionModal" }}
      >
        <div className="discussionCreateModalTitle">Create a Discussion</div>
        <div className="discussionCreateModalHeader">
          Enter What You Like to Discuss
        </div>
        <textarea
          className="discussionTextArea"
          type="text"
          onChange={(event) => setDiscussionResponse(event.target.value)}
        />
        <button className="createDiscussionButton" onClick={uploadResponsePost}>
          Create Your Response
        </button>
      </Modal>
    </div>
  );
}

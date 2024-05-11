import React, { useState, useEffect } from "react";
import "./Discussion.css";
import Modal from "react-responsive-modal";
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
import DiscussionPost from "./Components/DiscussionPost";

const Discussion = () => {
  const [authUser, setAuthUser] = useState(null);
  const [discussionResults, setDiscussionResults] = useState([]);
  const [openCreateDiscussion, setOpenCreateDiscussion] = useState(false);
  const [discussionQuestion, setDiscussionQuestion] = useState("");
  const onOpenCreateDiscussionModal = () => setOpenCreateDiscussion(true);
  const onCloseCreateDiscussionModal = () => setOpenCreateDiscussion(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const uploadDiscussionPost = async () => {
    const discussionRef = collection(database, "discussion");
    await addDoc(discussionRef, {
      discussion: discussionQuestion,
      createdAt: serverTimestamp(),
      uploader: authUser.uid,
    });
    onCloseCreateDiscussionModal();
  };

  useEffect(() => {
    const discussionRef = collection(database, "discussion");
    const discussionQuery = query(discussionRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(discussionQuery, (snapshot) => {
      let discussionResults = [];
      snapshot.forEach((doc) => {
        discussionResults.push({ ...doc.data(), id: doc.id });
      });
      setDiscussionResults(discussionResults);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="discussion-container">
      <div className="discussionBoardHeading">DISCUSSION BOARD</div>
      {authUser && (
        <button
          className="createDiscussionButton"
          onClick={onOpenCreateDiscussionModal}
        >
          + Create A Discussion
        </button>
      )}
      <div className="discussionsHolder">
        {discussionResults.map((oneResult) => (
          <DiscussionPost
            discussion={oneResult.discussion}
            postID={oneResult.id}
            key={oneResult.id}
            uploader={oneResult.uploader}
          />
        ))}
      </div>
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
          onChange={(event) => setDiscussionQuestion(event.target.value)}
        />
        <button
          className="createDiscussionButton"
          onClick={uploadDiscussionPost}
        >
          Create Your Discussion
        </button>
      </Modal>
    </div>
  );
};

export default Discussion;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SpecificDiscussion.css";
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

const SpecificDiscussion = () => {
  const { discussionID } = useParams();
  const navigate = useNavigate();
  const [discussionInfoJSON, setDiscussionInfoJSON] = useState({});
  const [authUser, setAuthUser] = useState(null);
  const [openCreateDiscussion, setOpenCreateDiscussion] = useState(false);
  const [discussionComment, setDiscussionComment] = useState("");
  const onOpenCreateDiscussionModal = () => setOpenCreateDiscussion(true);
  const onCloseCreateDiscussionModal = () => setOpenCreateDiscussion(false);

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

  const uploadDiscussionPost = async () => {
    // const discussionRef = collection(database, "discussion");
    // await addDoc(discussionRef, {
    //   discussion: discussionQuestion,
    //   createdAt: serverTimestamp(),
    //   uploader: authUser.uid,
    // });
    onCloseCreateDiscussionModal();
  };

  useEffect(() => {
    const getDiscussionInfo = async () => {
      try {
        const discussionRef = doc(database, "discussion", discussionID);
        const discussionInfo = await getDoc(discussionRef);
        const discussionInfoData = discussionInfo.data();
        setDiscussionInfoJSON(discussionInfoData);
      } catch (error) {
        console.error(error);
      }
    };

    getDiscussionInfo();
    console.log("DISCUSSION INFO DATA RETRIEVAL COUNT");
  }, [discussionID]);

  return (
    <div className="discussion-container">
      <div className="discussionBoardHeading">
        {discussionInfoJSON.discussion}
      </div>
      <div
        className="discussionInfoJSON-uploader"
        onClick={() => navigate(`/user/${discussionInfoJSON.uploader}`)}
      >
        {discussionInfoJSON.uploader}
      </div>
      {authUser && (
        <button
          className="createDiscussionButton"
          onClick={onOpenCreateDiscussionModal}
        >
          + Create A New Response
        </button>
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
          onChange={(event) => setDiscussionComment(event.target.value)}
        />
        <button
          className="createDiscussionButton"
          onClick={uploadDiscussionPost}
        >
          Create Your Response
        </button>
      </Modal>
    </div>
  );
};

export default SpecificDiscussion;

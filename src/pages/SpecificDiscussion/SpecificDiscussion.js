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
import DiscussionPost from "../Discussion/Components/DiscussionPost";
import ResponsePost from "./ResponsePost/ResponsePost";

const SpecificDiscussion = () => {
  const { discussionID } = useParams();

  const navigate = useNavigate();

  const [discussionInfoJSON, setDiscussionInfoJSON] = useState({});
  const [authUser, setAuthUser] = useState(null);
  const [discussionResponse, setDiscussionResponse] = useState("");
  const [openCreateDiscussion, setOpenCreateDiscussion] = useState(false);
  const onOpenCreateDiscussionModal = () => setOpenCreateDiscussion(true);
  const onCloseCreateDiscussionModal = () => setOpenCreateDiscussion(false);
  const [responseResults, setResponseResults] = useState([]);

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

  const uploadResponsePost = async () => {
    const responseRef = collection(database, "response");
    await addDoc(responseRef, {
      response: discussionResponse,
      createdAt: serverTimestamp(),
      uploader: authUser.uid,
      responseTo: discussionID,
    });
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

  useEffect(() => {
    const responseRef = collection(database, "response");
    const responseQuery = query(
      responseRef,
      where("responseTo", "==", discussionID)
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
      <div className="discussionsHolder">
        {responseResults.map((oneResult) => (
          <ResponsePost
            response={oneResult.response}
            postID={oneResult.id}
            key={oneResult.id}
            uploader={oneResult.uploader}
            authUser={authUser}
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
          onChange={(event) => setDiscussionResponse(event.target.value)}
        />
        <button className="createDiscussionButton" onClick={uploadResponsePost}>
          Create Your Response
        </button>
      </Modal>
    </div>
  );
};

export default SpecificDiscussion;

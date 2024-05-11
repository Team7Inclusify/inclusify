import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DiscussionPost.css";
import { database } from "../../../config/firebase";
import { doc, getDoc } from "firebase/firestore";

const DiscussionPost = (props) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const goToUser = (event) => {
    event.stopPropagation();
    navigate(`/user/${props.uploader}`);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userRef = doc(database, "user", props.uploader);
        const userInfo = await getDoc(userRef);
        const userInfoData = userInfo.data();
        setFirstName(userInfoData.firstName);
        setLastName(userInfoData.lastName);
      } catch (error) {
        console.error(error);
      }
    };

    getUserInfo();
  }, [props.uploader]);

  return (
    <div
      className="discussion-post-container"
      onClick={() => navigate(`/discussion/${props.postID}`)}
    >
      <div className="post-discussion">{props.discussion}</div>
      <div className="otherInfoBar">
        <div className="discussion-post-uploader" onClick={goToUser}>
          {`${firstName} ${lastName}`}
        </div>
      </div>
    </div>
  );
};

export default DiscussionPost;

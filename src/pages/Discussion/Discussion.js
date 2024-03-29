import React, { useState } from "react";
import "./Discussion.css";
import Modal from "react-responsive-modal";

const Discussion = () => {
  const [openCreateDiscussion, setOpenCreateDiscussion] = useState(false);
  const onOpenCreateDiscussionModal = () => setOpenCreateDiscussion(true);
  const onCloseCreateDiscussionModal = () => setOpenCreateDiscussion(false);

  return (
    <div className="discussion-container">
      <div className="discussionBoardHeading">DISCUSSION BOARD</div>
      <button
        className="createDiscussionButton"
        onClick={onOpenCreateDiscussionModal}
      >
        + Create A Discussion
      </button>
      <div className="discussionsHolder">
        <h1>Hello</h1>
      </div>
      <Modal
        open={openCreateDiscussion}
        onClose={onCloseCreateDiscussionModal}
        classNames={{ modal: "createDiscussionModal" }}
      ></Modal>
    </div>
  );
};

export default Discussion;

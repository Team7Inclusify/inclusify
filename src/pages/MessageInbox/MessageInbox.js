// MessageInbox.js

import React, { useState } from "react";
import "./MessageInbox.css";

const MessageInbox = () => {
  const [talkingToName, setTalkingToName] = useState("John Doe");

  return (
    <div className="message-container">
      <div className="otherUserInfo">{talkingToName}</div>
    </div>
  );
};

export default MessageInbox;

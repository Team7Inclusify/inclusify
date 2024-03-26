import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, database } from "../../../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function OtherUser(props) {
  const navigate = useNavigate();
  const { userID } = useParams();
  return (
    <div className="">
      {userID}
      <button onClick={() => navigate(`/message/${userID}`)}>Message</button>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./MessageInbox.css";
import default_pfp from "../../images/default_pfp.png";
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
import { auth, database } from "../../config/firebase";

const MessageInbox = () => {
  const { receiverID } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const [recieverInfoJSON, setRecieverInfoJSON] = useState({ pfpLink: "" });
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(database, "messages");

  useEffect(() => {
    const getReceiverUserInfo = async () => {
      try {
        const userRef = doc(database, "user", receiverID);
        const userInfo = await getDoc(userRef);
        const userInfoData = userInfo.data();
        setRecieverInfoJSON(userInfoData);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch receiver user info only once when the component mounts
    getReceiverUserInfo();
    console.log("HELLO");
  }, []);

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

  // Send Message Function
  const handleMessageSend = async () => {
    if (!authUser || newMessage === "" || !authUser.uid) return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      sender: authUser.uid,
      to: receiverID,
    });
  };

  useEffect(() => {
    // Ensure authUser is not null before using it
    if (authUser && authUser.uid) {
      const queryMessages = query(
        messagesRef,
        where("sender", "in", [authUser.uid, receiverID]),
        where("to", "in", [authUser.uid, receiverID]),
        orderBy("createdAt")
      );
      const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
        let messages = [];
        snapshot.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id });
        });
        setMessages(messages);
      });

      return () => unsubscribe();
    }
  }, [authUser]); // Add authUser to dependency array

  return (
    <div className="message-container">
      {receiverID && recieverInfoJSON && (
        <div className="otherUserInfo">
          <img
            src={
              recieverInfoJSON.pfpLink === ""
                ? default_pfp
                : recieverInfoJSON.pfpLink
            }
            className="otherUserImg"
            alt="User Profile"
          />
          {`${
            recieverInfoJSON.firstName
              ? recieverInfoJSON.firstName.toUpperCase()
              : ""
          } ${
            recieverInfoJSON.lastName
              ? recieverInfoJSON.lastName.toUpperCase()
              : ""
          }`}
        </div>
      )}
      <div className="messages">
        {messages.map((message) => (
          <h1>{message.text}</h1>
        ))}
      </div>
      <div className="input-container">
        <textarea
          className="message-input"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="send-button" onClick={handleMessageSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInbox;

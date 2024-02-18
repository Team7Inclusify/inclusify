import React, { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../../config/firebase";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const getUserInfo = async (userID) => {
    try {
      const userRef = doc(database, "user", userID);
      const userInfo = await getDoc(userRef);
      const userInfoData = userInfo.data();
      setFirstName(userInfoData.firstName);
      setLastName(userInfoData.lastName);
    } catch (error) {
      console.error(error);
    }
  };
  const setUserInfo = () =>
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log("Auth User test count log");
        setUser(authUser);
        getUserInfo(authUser.uid);
      } else {
        setUser(null);
      }
      console.log("Test count log");
    });

  useEffect(() => {
    // Seems to run 3 times on intial run
    setUserInfo();
  }, [user]);

  return (
    <>
      {firstName} {lastName}
    </>
  );
}

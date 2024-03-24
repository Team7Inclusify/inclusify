import React, { useState, useEffect } from "react";
import AWS from "aws-sdk";
import { useNavigate, Link } from "react-router-dom";
import "./SignUp.css";
import { auth } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { database } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import showPasswordIcon from "../../images/show_password.png";
import hidePasswordIcon from "../../images/hide_password.png";

export default function SignUp() {
  const [showPassword, changeShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(null);

  const navigate = useNavigate();

  const checkAuth = () =>
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(user);
      } else {
        setLoggedIn(null);
      }
    });

  useEffect(() => {
    checkAuth();
    console.log("changeInLogIn");
  }, [loggedIn]);

  if (loggedIn) {
    navigate("/profile");
  }

  const signUp = async () => {
    if (password !== confirmPassword) {
      alert("PASSWORD DO NOT MATCH" + password + ", " + confirmPassword);
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const userDoc = doc(database, "user", auth?.currentUser?.uid);

      await setDoc(userDoc, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        pfpLink: "N/A",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-content">
        <h2>Sign Up</h2>
        <h3>First Name</h3>
        <input
          placeholder="First Name"
          type={"text"}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <h3>Last Name</h3>
        <input
          placeholder="Last Name"
          type={"text"}
          onChange={(event) => setLastName(event.target.value)}
        />
        <h3>Email</h3>
        <input
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <h3>Password</h3>
        <div className="passwordDiv">
          <input
            placeholder="Password"
            className="signup-password"
            type={showPassword ? "text" : "password"}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="passwordSpace" />
          <img
            className="showPasswordIcon"
            src={showPassword ? hidePasswordIcon : showPasswordIcon}
            onClick={() => changeShowPassword(!showPassword)}
            alt="Show/Hide Password"
          />
          <div className="passwordSpace" />
        </div>
        <input
          placeholder="Confirm Password"
          type={showPassword ? "text" : "password"}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />

        <button onClick={signUp}>Sign Up</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import "./SignUp.css";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import showPasswordIcon from "../../images/show_password.png";
import hidePasswordIcon from "../../images/hide_password.png";

export default function SignUp() {
  const [showPassword, changeShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUp = async () => {
    if (password !== confirmPassword) {
      alert("PASSWORD DO NOT MATCH" + password + ", " + confirmPassword);
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          console.log(user);
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-content">
        <h2>Sign Up</h2>
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
      </div>
    </div>
  );
}

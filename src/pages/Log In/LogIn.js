import React, { useState } from "react";
import "./LogIn.css";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import showPasswordIcon from "../../images/show_password.png";
import hidePasswordIcon from "../../images/hide_password.png";

export default function LogIn() {
  const [showPassword, changeShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("LOG IN SUCCESS");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-content">
        <h2>Log In</h2>
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
        <button onClick={logIn}>Log In</button>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

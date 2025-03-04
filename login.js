import React, { useState, useEffect } from "react";
import "./login.css"; // Make sure to adjust the path as necessary
import eyeOpenIcon from "../../src/images/eye-open.png"; // Adjust the path as necessary
import eyeCloseIcon from "../../src/images/eye-close.png"; // Adjust the path as necessary
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    // Check local storage for remembered username
    const rememberedUsername = localStorage.getItem("rememberedUsername");
    if (rememberedUsername) {
      setUsername(rememberedUsername);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rememberMe) {
      localStorage.setItem("rememberedUsername", username);
    } else {
      localStorage.removeItem("rememberedUsername");
    }

    // Redirect to TodoList page
    navigate('/todolist') // Consider using React Router for navigation in a real app
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="login-container container">
      <form
        id="loginForm"
        className="login-form Todo-List"
        onSubmit={handleSubmit}
      >
        <h2 id="login">Login</h2>
        <div className="input-group" id="text">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group" id="text">
          <input
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <img
            src={isPasswordVisible ? eyeOpenIcon : eyeCloseIcon}
            alt="toggle password visibility"
            id="eyeicon"
            onClick={togglePasswordVisibility}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="Suggestions" id="Suggestions"></div>
        <div className="remember-container" id="check">
          <div className="remember-me">
            <input
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <p>
            <a href="Forgot.html">Forgot Password</a>
          </p>
        </div>
        <div className="input-group">
          <button type="submit" id="login-button">
            Login
          </button>
        </div>
        <p>
          Don't have an account? <a onClick={()=> navigate('/register')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;

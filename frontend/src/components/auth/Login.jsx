// frontend/src/components/auth/Login.js
import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder authentication
    if (email && password) {
      navigate("/dashboard");
    } else {
      alert("Please enter valid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-box">
            <img
              src="/assets/images/hr-logo.png"
              alt="HR System Logo"
              className="login-logo"
            />
          </div>
          <h2>HR System</h2>
        </div>

        <h1 className="welcome-text">Welcome Back</h1>
        <p className="subtitle">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-icon">
              <FaEnvelope className="icon" />
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-icon">
              <FaLock className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <div className="form-footer">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        <p className="support-text">
          Having trouble signing in? <a href="#">Contact Support</a>
        </p>
      </div>
    </div>
  );
};

export default Login;


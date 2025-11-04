import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "../api/axios"; // optional (we’ll set this up next)

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login data to backend
      const res = await axios.post("/auth/login", { email, password });

      // Extract token from response
      const token = res.data.token;

      // Save the token to context/localStorage
      login(token);

      // Redirect user to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed. Check credentials or server connection.");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ padding: 24 }}>
      <h1>Welcome to My App 👋</h1>
      <p>This is the public home page.</p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default Home;

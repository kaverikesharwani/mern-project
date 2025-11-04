import React, { useEffect, useState } from "react";
import axios from "../api/axios";


const Dashboard = () => {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/auth/dashboard-data");
      setMsg(res.data.message);
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>{msg}</p>
    </div>
  );
};

export default Dashboard;

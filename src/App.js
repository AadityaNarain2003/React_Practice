import React, { useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import "./App.css";
import Dashboard from "./components/Dashboard";
import AddPost from "./components/AddPost";

const App = () => {
  useEffect(() => {
    axios.get("http://192.168.1.12:5000/")
      .then(response => {
        console.log("Data from Server:", response.data);
      })
      .catch(error => {
        console.error("Error fetching data from the server:", error);
      });
  }, []); 

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/addpost" element={<AddPost />} />
    </Routes>
  );
};

export default App;

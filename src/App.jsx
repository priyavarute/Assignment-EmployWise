import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import UserList from "./pages/UsersList";
import EditUser from "./pages/EditUser";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
};

export default App;

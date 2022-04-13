import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Planets from "./Planets";
import logo from "./logo.png";

const Header = () => {
  return (
    <div>
      <nav id="header">
        <Link to="/planets">Planets</Link>
        <img
          src={logo}
          alt="sw-logo"
          style={{ width: "10%", margin: "auto" }}
        />
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/planets" element={<Planets />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Header;

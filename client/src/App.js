import React from "react";

import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';

import Home from "./components/js/Home.js";
import Menu from "./components/js/Menu.js";
import Cart from "./components/js/Cart.js";
import Login from "./components/js/Login.js";
import Register from "./components/js/Register.js";
import { Route, Routes } from "react-router-dom";

// import { useState, useEffect } from "react";
// import Axios from "axios";

function App() {

  return (
    <React.Fragment>
      <main>
        <Container>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/menu" element={<Menu />} exact />
          <Route path="/cart" element={<Cart />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/register" element={<Register />} exact />
        </Routes>
        </Container>
      </main>
    </React.Fragment>
  );
}

export default App;

import "../css/Home.css";
import { Button } from "@mui/material";
// import { useState, useEffect } from "react";
// import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
// import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className="home">
      {/* <Row>
      <Button
          LinkComponent={Link}
          to="/login"
          sx={{ marginTop: 1, background: "orangered"}}
          variant="contained"
        >Login</Button>
      </Row> */}
      <Row>
        <h1 className="title">Coffee Kiosk</h1>
        <p className="subtitle">We're Open!</p>
      </Row>
       <Row>
        <img src="/images/cafe.jpg" alt="cafe" className="cafeImg"/>
      </Row>
      <Row>
        <Button
          LinkComponent={Link}
          to="/menu"
          sx={{ marginTop: 1, background: "pink"}}
          variant="contained"
        >Enter</Button>
      </Row>
    </div>
  )
}

export default Home
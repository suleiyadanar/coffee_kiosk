import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";

//Bootstrap Imports
import "bootstrap/dist/css/bootstrap.css";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

//MUI Imports
import { Button } from "@mui/material";
import CoffeeIcon from "@mui/icons-material/Coffee";
import AddBoxIcon from '@mui/icons-material/AddBox';

//Local Links
import Popup from "./Popup.js";
import "../css/Menu.css";


const Menu = () => {

  const [listOfCoffee, setListOfCoffee] = useState([]);    //import coffee list from db

  const [orderName, setName] = useState("");               //order details
  const [size, setSize] = useState("Regular");
  const [milk, setMilk] = useState("No Milk");
  const [temp, setTemp] = useState("Ice");
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState("");

  const [counter, setCounter] = useState(0);               //array index for listOfCoffee

  const [isOpen, setIsOpen] = useState(false);             //order pop-up window toggle

  //toggle function for isOpen
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  //GET : coffee list from server
  useEffect(() => {
    Axios.get("http://localhost:3001/getCoffee").then((response) => {
      setListOfCoffee(response.data);
    });
  }, []);

  //retrive only names from listOfCoffee array
  const coffeeName = listOfCoffee.map((item) => item.name);

  //POST : order details
  const createOrder = () => {
    Axios.post("http://localhost:3001/createOrder", {
      orderName,
      size,
      milk,
      temp,
      amount,
      price,
    });
    setIsOpen(!isOpen);

  };
  return (

    <div className="menu">

      <div className="box">



         {/*************************** Header ***************************/}
        <h1 className="menuTitle">MENU</h1>

        <Button
          LinkComponent={Link}
          to="/cart"
          sx={{ marginTop: 1, background: "pink",':hover': {
            background: "crimson", // theme.palette.primary.main
            color:"white"
          }, }}
          variant="contained"
        >
          <CoffeeIcon />
           Your Order
        </Button>
        <p className="instru">All prices for regular. Large 80¢ extra.</p>


        {/**********************Coffee List**************************/}
        <div className="coffeeDisplay">
          {listOfCoffee.map((coffee) => {
            // setNameOfCoffee(...nameOfCoffee, coffee.name);

            return (
              <div key={coffee._id} className="per">
                {isOpen && (
          ////////////////////////// PopUp ///////////////////////////////
                  <Popup
                    handleClose={togglePopup}
                    content={

                        <Container>
                          <Row>
                        <Col md={6} sm={12}>
                        <div>
                          <h2
                            onChange={(event) => {
                              setName(coffeeName[counter]);
                            }}
                            className="coffeeName"
                          >
                            {coffeeName[counter]}
                          </h2>
                          <img
                            src="/images/loading.gif"
                            className="popupImg"
                            alt="popupImg"
                          />
                        </div>
                        </Col>
                        <Col md={6} sm={12}>
                        <div className="popup">
                          <p>Select Size</p>
                          <select
                            className="dropdown"
                            onChange={(event) => {
                              setSize(event.target.value);
                            }}
                          >
                            <optgroup label="size">
                              <option name="Regular" value="Regular">
                                Regular
                              </option>
                              <option name="Large" value="Large">
                                Large
                              </option>
                            </optgroup>
                          </select>
                          <br />
                          <p>Choose Milk Options</p>
                          <select
                            className="dropdown"
                            onChange={(event) => {
                              setMilk(event.target.value);
                            }}
                          >
                            <optgroup label="milk">
                              <option name="None" value="None">
                                No milk
                              </option>
                              <option name="Whole" value="Whole">
                                Whole
                              </option>
                              <option name="Skim" value="Skim">
                                Skim
                              </option>
                              <option name="Oat" value="Oat">
                                Oat
                              </option>
                              <option name="Almond" value="Almond">
                                Almond
                              </option>
                            </optgroup>
                          </select>
                          <br />
                          <p>Ice/Hot</p>
                          <select
                            className="dropdown"
                            onChange={(event) => {
                              setTemp(event.target.value);
                            }}
                          >
                            <optgroup label="temp">
                              <option name="Ice" value="Ice">
                                Ice
                              </option>
                              <option name="Hot" value="Hot">
                                Hot
                              </option>
                            </optgroup>
                          </select>
                          <br />
                          <p># Cups</p>
                          <select
                            className="dropdown"
                            onChange={(event) => {
                              setAmount(event.target.value);
                            }}
                          >
                            <optgroup label="cups">
                              <option name="1" value="1">
                                1
                              </option>
                              <option name="2" value="2">
                                2
                              </option>
                              <option name="3" value="3">
                                3
                              </option>
                              <option name="4" value="4">
                                4
                              </option>
                              <option name="5" value="5">
                                5
                              </option>
                            </optgroup>
                          </select>
                          <br />
                          <button className="orderSubmit" onClick={createOrder}> Add to Cart <AddBoxIcon/></button>
                        </div>
                        </Col>
                        </Row>
                        </Container>

                    }
                  />
                )}
                {/********************** Per Coffee Item **************************/}
                <h1 className="coffeeName"
                 onClick={() => {
                  setIsOpen(!isOpen);
                  setCounter(coffeeName.indexOf(coffee.name));
                  setName(coffee.name);
                  setPrice(coffee.price);
                }}
                >{coffee.name}</h1>
                <p className="instru">{coffee.price}</p>
                <button
                  className="add"
                  onClick={() => {
                    setIsOpen(!isOpen);
                    setCounter(coffeeName.indexOf(coffee.name));
                    setName(coffee.name);
                    setPrice(coffee.price);
                  }}
                >
                  +<CoffeeIcon />
                </button>
              </div>

            );
          })}
        </div>


      </div>
    </div>
  );
};

export default Menu;

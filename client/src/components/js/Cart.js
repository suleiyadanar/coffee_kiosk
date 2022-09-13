import "../css/Cart.css";
// import { Link } from "react-router-dom";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useState, useEffect } from "react";
import Axios from "axios";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from '@mui/icons-material/Save';
// import { Button } from "@mui/material";

const Cart = () => {
  const [listOfOrder, setListOfOrder] = useState([]);
  // eslint-disable-next-line
  const [isEdit, setIsEdit] = useState(false);
  // eslint-disable-next-line
  const [id, setId] = useState("");
  // eslint-disable-next-line
  const [amount, setAmount] = useState("");
  // eslint-disable-next-line
  const input = document.getElementById("inputBox");
  // eslint-disable-next-line
  const plusButton = () => {
    console.log(input);
  };
  // eslint-disable-next-line
  const toggleEdit = () => {
    setIsEdit(false);
  };
  // eslint-disable-next-line
  const toggleSave = () => {
    setIsEdit(true);
  };

  // eslint-disable-next-line
  useEffect(() => {
    Axios.get("http://localhost:3001/getOrder").then((response) => {
      setListOfOrder(response.data);
    });
  }, []);
  // eslint-disable-next-line
  const updateOrder = () => {
    Axios.post("http://localhost:3001/updateOrder", {
      id,
      amount,
    });
  };
  // eslint-disable-next-line
  const deleteOrder = () =>{
    Axios.delete("http://localhost:3001/deleteOrder",{
      id
    });
  }
  const price = listOfOrder.map(
    (item, e) => parseFloat(item.price) * parseFloat(item.amount)
  );
  const subTotal = price.reduce((partialSum, a) => partialSum + a, 0);
  return (
    <div>
      <div className="title">
        <div className="header">
          <div className="btnMenu">
        <a href="/menu" className="menuLink">
          <ArrowLeftIcon />
        </a>
          <h1>Cart   <ShoppingCartIcon/></h1>
          </div>
          {isEdit && (
            <button className="edit" onClick={toggleEdit}>
              <SaveIcon />
            </button>
          )}
          {isEdit === false && (
            <button className="edit" onClick={toggleSave}>
              <EditIcon />
            </button>
          )}
        </div>

        <p className="dotLine"></p>

        <div className="subtitle">
          <h5 className="amount">Amount</h5>
          <h5 className="price">Price</h5>

        </div>
      </div>
      <div className="orders">
        {listOfOrder.map((order) => {
          // setPrice(order.price);
          return (
            <div key={order._id} className="perItem">
              <div className="left">
                <div>
                  {isEdit && (
                    <button className="delBtn" onClick={()=>{
                      Axios.delete(`http://localhost:3001/deleteOrder/${order._id}`);
                      Axios.get("http://localhost:3001/getOrder").then((response) => {
                        setListOfOrder(response.data);
                      });

                    }}>

                      <RemoveCircleOutlineIcon />
                    </button>
                  )}
                </div>
                <div>
                  <h1 className="cartName">{order.orderName}</h1>
                  <p>
                    {order.size}, {order.milk}, {order.temp}
                  </p>
                </div>
              </div>
              <div className="right">
                <div className="amount">
                  {/* {isEdit && <button>+</button>} */}
                  <h4>{order.amount}</h4>

                  {/* {isEdit && <button>-</button>} */}
                </div>
                <h5 className="price">{order.price * order.amount}</h5>
              </div>
            </div>
          );
        })}
        <p className="dotLine"></p>
        <div className="total">
          <h4>Total</h4>
          <p>
            ${subTotal.toFixed(2)}
            <br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;

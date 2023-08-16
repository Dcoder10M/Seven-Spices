import React, { useState } from "react";
import {Link,useNavigate} from 'react-router-dom'
import { Badge } from "react-bootstrap-v5";
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';
export default function NavBar() {
  //for cart portal
  const [cartView,setCartView] = useState(false)
  let data = useCart();
const navigate = useNavigate();
 
const handleLogout = ()=>{
  localStorage.removeItem("authToken");
  navigate("/login")
}

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark navcolor ">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic " to="/">
          Seven-Spices
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active fs-5 home" aria-current="page" to="/" style={{fontWeight:"bold"}}>Home</Link>
              </li>
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5 home" aria-current="page" to="/myOrder" style={{fontWeight:"bold"}}>My Orders</Link>
              </li>   
              : ""} 
            </ul>
              {(!localStorage.getItem("authToken")) ?
              <div className="d-flex">
                 <Link className="btn  mx-2" style={{backgroundColor:"#046007",fontWeight:"bold"}} to="/login">Login</Link>
                 <Link className="btn bg-white mx-2" style={{color:"#046007",fontWeight:"bold"}} to="/createuser">SignUp</Link>
              </div>
              : 
              <div>
              <div className="btn bg-white mx-2" style={{color:"#046007",fontWeight:"bold"}} onClick={()=>{setCartView(true)}}>
                My Cart {" "}
                <Badge pill style={{backgroundColor:"#A2FF86",color:"#000"}} mb-2> {data.length} </Badge>
              </div>
                {cartView? <Modal onClose={()=>setCartView(false)}><Cart /></Modal>: null}
              <div className="btn btn-danger mx-2 " style={{backgroundColor:"#ff2d2d",fontWeight:"bold"}} onClick={handleLogout}>
                Logout 
              </div>
              </div>
              } 
          </div>
        </div>
      </nav>
    </div>
  );
}

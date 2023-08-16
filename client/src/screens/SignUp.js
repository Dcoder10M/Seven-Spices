/* eslint-disable */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function () {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(
    //   JSON.stringify({
    //     name: credentials.name,
    //     email: credentials.email,
    //     password: credentials.password,
    //     location: credentials.geolocation,
    //   })
    // );
    const response = await fetch("https://seven-spices-backend.onrender.com/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });
    const json = await response.json();
    // console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    navigate("/login");
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?cs=srgb&dl=pexels-ella-olsson-1640770.jpg&fm=jpg")',
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div>
        <NavBar />
      </div>
      <div className="container" >
        <form
          className="w-50 m-auto mt-5"
          onSubmit={handleSubmit} style={{backgroundColor: '#000',border:"none",outline:"none",padding:"25px",borderRadius: "20px" ,boxShadow:  "0 0 10px 5px #FFCE33,0 0 20px 7px rgb(131, 131, 40)"}}
        >
          <div className="mb-3 mt-2 mx-3" >
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>

          <div className="mb-3 mt-2 mx-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3 mt-2 mx-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 mt-2 mx-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" className="m-3 btn" style={{backgroundColor:"#046007",fontWeight:"bold"}}>
            Submit
          </button>
          <Link to="/login" className="m-3 btn " style={{backgroundColor:"#CB0809",fontWeight:"bold"}}>
            Already a user
          </Link>
        </form>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function MyOrder() {
  const [orderData, setorderData] = useState({});

  const fetchMyOrder = async () => {
    // console.log(localStorage.getItem("userEmail"));
    await fetch("https://seven-spices-backend.onrender.com/api/myOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      await setorderData(response);
    });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div className="container">
        <div className="col d-flex flex-row flex-wrap justify-content-start" style={{margin:"100px 100px 100px 120px"}}>
          {orderData !== {} ? (
            Array(orderData).map((data) => {
              return data.orderData ? (
                data.orderData.order_data
                  .slice(0)
                  .reverse()
                  .map((item) => {
                    return item.map((arrayData) => {
                      return (
                        <span key={arrayData.id}>
                          {arrayData.Order_date ? (
                            <div className="m-auto mt-5" style={{display:"none"}}>
                              {(data = arrayData.Order_date)}
                            </div>
                          ) : (
                            <div
                              className="card m-1"
                              style={{
                                width: "16rem",
                                maxHeight: "360px",
                                padding: "10px 0px 20px 10px"
                              }}
                            >
                              <div className="card-body">
                                <h5
                                  className="card-title"
                                  style={{ color: "#FFCE33" }}
                                >
                                  {arrayData.name}
                                </h5>
                                <div
                                  className=""
                                  style={{ height: "auto" ,textAlign:"left"}}
                                >
                                  <span className="">
                                    <span className="m-1">{arrayData.qty}</span>
                                    <span className="m-1">
                                      {arrayData.size}
                                    </span>
                                  </span>
                                  <p className="m-1">{data}</p>
                                  <div
                                    className="h-100 w-20 fs-5"
                                    style={{ fontWeight: "bold" }}
                                  >
                                    ₹{arrayData.price}/-
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </span>
                      );
                    });
                  })
              ) : (
                <div className="mt-5 mb-3">No Order History</div>
              );
            })
          ) : (
            ""
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

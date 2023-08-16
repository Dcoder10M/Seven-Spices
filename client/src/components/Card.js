import React, { useState, useRef, useEffect } from 'react'
//state define kar dete hai global level pe aur jab bhi uspe change hoga toh sab dur reflect hoga.... App.js mein wrap kar diya hai usko.... prop drilling ki dikkat khatam ho jati hai eese
import { useDispatchCart, useCart } from './ContextReducer'

export default function Card(props) {
  let data = useCart();
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  //defining default value of price
  const priceRef = useRef();
  let options = props.options;
  //prices
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  const dispatch = useDispatchCart();


  const handleAddToCart = async () => {
    alert("Added to cart");
    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    // console.log(food)
    // console.log(new Date())
    if (food !== []) {
      // size== "half","full","regular" etc
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size})
        // console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })
  }
//giving reference
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  let finalPrice = qty * parseInt(options[size]);   
  return (
    <div >
      <div style={{ display: 'flex', justifyContent: 'center',margin:"0px 0px 40px 0px" }}>
        <div className="card mt-3" style={{ width: '100%', maxWidth: '18rem', maxHeight: '360px',boxShadow: "0 0 10px 1px #FFCE33 "}}>
          <img src={props.foodItem.img} className="card-img-top " alt="..." style={{ height: "150px", objectFit: "cover" }} />
          <div className="card-body card-hover">
            <h5 className="card-title" >{props.foodItem.name}</h5>
            <hr />
            <div className=" w-100 ">
              <select className="m-2 h-100 rounded" onChange={(e) => setQty(e.target.value)} style={{outline:"none",border:"none",backgroundColor:"#046007"}}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>

{/* //given price ref */}
              <select className="m-2 h-100 rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}style={{outline:"none",border:"none",backgroundColor:"#046007"}}>
                {priceOptions.map((data) => {
                  return <option key={data} value={data}>{data}</option>;
                })}
              </select>

              <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
            </div>

            <hr />
            <button className="btn btn-success text-white justify-center ms-2" onClick={handleAddToCart} style={{outline:"none",border:"none",backgroundColor:"#046007"}}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
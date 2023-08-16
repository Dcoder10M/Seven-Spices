import React,{useEffect,useState} from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Card from "../components/Card";



export default function Home(){
  const [search,setSearch] = useState(''); 
  const [foodCat,setFoodCat] = useState([]);
  const [foodItem,setFoodItem] = useState([]);
  
  const loadData = async ()=>{
    let response = await fetch("https://seven-spices-backend.onrender.com/api/foodData",{
      method:"POST",
      header:{
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();

    setFoodItem(response[0])
    setFoodCat(response[1])
    //console.log(response[0],response[1]);
  }
  
  useEffect(()=>{
    loadData()
  },[])


  return (
    <div>
      <div><NavBar /></div>
      
      <div >
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"cover !important"}}>
    <div className="carousel-inner" id="carousel">
        <div className="carousel-caption" style={{zIndex:"10"}}>
        <div className="d-flex justify-content-center">
      <input className="searchh" type="search" placeholder="Search 'pizza'" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
      {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
    </div>
        </div>
      <div className="carousel-item active">
        <img src="https://c.ndtvimg.com/2021-04/umk8i7ko_pasta_625x300_01_April_21.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=886" className="d-block w-100" style={{filer: "brightness(30%)"}} alt="..."/>
      </div>
      <div className="carousel-item">
        <img src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?cs=srgb&dl=pexels-ella-olsson-1640772.jpg&fm=jpg" className="d-block w-100" style={{filer: "brightness(30%)"}} alt="..."/>
      </div>
      <div className="carousel-item ">
        <img src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?cs=srgb&dl=pexels-ash-376464.jpg&fm=jpg" className="d-block w-100" style={{filer: "brightness(30%)"}} alt="..."/>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div></div>
      

      <div className="container" >
        {foodCat !== [] ? (
          foodCat.map((data) => (
            <div key={data._id} className="row mb-3 mt-5">
              <div className="fs-3 m-3" style={{fontWeight:"bold"}}>{data.CategoryName}</div>
              <hr />
              {foodItem !== [] ? (
                foodItem
                  .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
                  .map((filterItems) => (
                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-3" >
                      <Card foodItem = {filterItems}
                      options = {filterItems.options[0]}
                      
                      ></Card>
                    </div>
                  ))
              ) : (
                <div>No Such Data Found</div>
              )}
            </div>
          ))
        ) : (
          ""
        )}
      </div>
      <div><Footer /></div>
    </div>
  );
}

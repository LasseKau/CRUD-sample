import React, { useState, useEffect } from 'react'
import './App.css';
import Axios from 'axios';

function App() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [maker, setMaker] = useState("");
  const [review, setReview] = useState("");
  const [year, setYear] = useState(0);

  const [newPrice, setNewPrice] = useState(0);//state created for changed input

  const [carList, setCarList] = useState([]);

  //  // requesting back from backend, responce variable = data passed through
  //   useEffect(()=> {
  //     Axios.get('https://http//localhost:3001/api/get').then((response)=> {
  //       console.log(response.data);
  //       Set.CarReviewList(response.data);
  //     });
  //   }, []);


  //when the backend is requesting the name of the body from the backend, 
  //were requesting a variable that is going to be passed by the axios.post

  const addCar = () => {
    Axios.post("http://localhost:3001/create", {

      carName: name,
      carYear: year,
      carMaker: maker,
      carReview: review,
      carPrice: price,
    }).then(() => {
      setCarList([
        ...carList,
        {
          carName: name,
          carYear: year,
          carMaker: maker,
          carReview: review,
          carPrice: price,
        },
      ]);
    });
  };

  const getCars = () => {
    Axios.get("http://localhost:3001/cars").then((response) => {
      setCarList(response.data);
    });
    console.log("getCars :");
  };

  const updateCarPrice = (id) => {
    Axios.put("http://localhost:3001/update", { price: newPrice, id: id }).then(
      (response) => {
        setCarList(

          carList.map((val) => {
            return val.id == id //===
              ? {
                id: val.id,
                carName: val.name,
                carMaker: val.maker,
                carYear: val.year,
                carReview: val.review,
                carPrice: newPrice,
              }
              : val;

          })

        );
      }

    );
    console.log("updateCar :");
  };

  const deleteCar = (id) => {
    console.log("deleteCar :");
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setCarList(
        carList.filter((val) => {
          return val.id !== id; //!= to !==
        })
      );
    });
  };

  return (

    <div className="App">
      <div className="information">
        <label>Model:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Model Year:</label>
        <input
          type="number"
          onChange={(event) => {
            setYear(event.target.value);
          }}
        />
        <label>Maker:</label>
        <input
          type="text"
          onChange={(event) => {
            setMaker(event.target.value);
          }}
        />
        <label>Description:</label>
        <input
          type="text"
          onChange={(event) => {
            setReview(event.target.value);
          }}
        />
        <label>Price:</label>
        <input
          type="number"
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
        <button onClick={addCar}>Add Cars</button>
      </div>
      <div className="carss">
        <button onClick={getCars}>Show cars</button>

        {carList.map((val, key) => {
          return (
            <div className="car">
              <div>
                <h3>Model: {val.carName}</h3>
                <h3>Model Year: {val.carYear}</h3>
                <h3>Description: {val.carMaker}</h3>
                <h3>Maker: {val.carReview}</h3>
                <h3>Price: {val.carPrice}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="test"
                  onChange={(event) => {
                    setNewPrice(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateCarPrice(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteCar(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}



//   const submitReview = ()=> {
//     Axios.post("http://localhost:3001/api/insert", {
//       carName: carName,
//       carReview: review,
//     });

//     setReviewList([...carReviewList, 
//       {movieName: carName, carReview: review},
//       ]);
//       console.log("runs");
//     }

//   const deleteReview = (car) => {
//     Axios.delete(`http://localhost:3001/api/delete/${car}`); //deleted objects have to be set within the parameters of the url
//   }

//   const updateReview = (car) => {
//     Axios.put("http://localhost:3001/api/update", {
//       carName: car,
//       carReview: newReview,
//     });
//     setNewReview("")
//   }

//   return (
//     <div className="App">
//       <h1>CRUD APP</h1>

//       <div className="form">
//       <label>Car Name: </label>
//       <input type="text" name="carName" onChange={(e)=> {
//       setCarName(e.target.value)
//       }}/>
//       <label>Review: </label>
//       <input type="text" name="review" onChange={(e)=> {
//       setReview(e.target.value)}}/>
//       <button onClick={submitReview}>Submit</button>
//       {carReviewList.map((val)=>{
//           return (
//             <div className="card">
//               <h1>{val.carName}</h1>
//               <p>{val.carReview}</p>

//               <button onClick={() =>{deleteReview(val.carName)}}>Delete</button>  
//               <input type="text" id="updateInput" onChange={(e) =>{ //for every delete review we have a different car
//                 setNewReview(e.target.value)
//               }} />
//               <button onClick={()=>{ updateReview(val.carName)}} >Update</button>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   );
// }

export default App;

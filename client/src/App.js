import React, { useState, useEffect } from 'react'
import './App.css';
import Axios from 'axios';

export function App() {

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
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Model year:</label>
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
        <label>Review:</label>
        <input
          type="text"
          onChange={(event) => {
            setReview(event.target.value);
          }}
        />
        <label>Cost (year):</label>
        <input
          type="number"
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
        <button onClick={addCar}>Add Car</button>
      </div>
      <div className="car">
        <button onClick={getCars}>Show Cars</button>

        {carList.map((val, key) => {
          return (
            <div className="car">
              <div>
                <h3>Name: {val.carName}</h3>
                <h3>Model year: {val.carYear}</h3>
                <h3>About: {val.carReview}</h3>
                <h3>Maker: {val.carMaker}</h3>
                <h3>Price: {val.carPrice}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="2000..."
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

export default App;
//   console.log("exporting app");
// }

//      <App />

// export default function SafeString(string) {
//   this.string = string;
// }

// SafeString.prototype.toString = function() {
//   return "" + this.string;
// 

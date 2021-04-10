import React, { useState, useEffect } from 'react'
import './App.css';
import Axios from 'axios';

function App() {

  const [carName, setCarName] = useState('')
  const [review, setReview] = useState('')
  const [carReviewList, setReviewList] = useState([])
  const [newReview, setNewReview] = useState([]);

 // requesting back from backend, responce variable = data passed through
  useEffect(()=> {
    Axios.get('https://http//localhost:3001/api/get').then((response)=> {
      console.log(response.data);
      Set.CarReviewList(response.data);
    });
  }, []);

  //when the backend is requesting the name of the body from the backend, 
  //were requesting a variable that is going to be passed by the axios.post
  const submitReview = ()=> {
    Axios.post("http://localhost:3001/api/insert", {
      carName: carName,
      carReview: review,
    });

    setReviewList([...carReviewList, 
      {movieName: carName, carReview: review},
      ]);
      console.log("runs");
    }
    
  const deleteReview = (car) => {
    Axios.delete(`http://localhost:3001/api/delete/${car}`); 
  }

  const updateReview = (movie) => {
    Axios.put("http://localhost:3001/api/update", {
      carName: movie,
      carReview: newReview,
    });
    setNewReview("")
  }

  return (
    <div className="App">
      <h1>CRUD APP</h1>

      <div className="form">
      <label>Car Name: </label>
      <input type="text" name="carName" onChange={(e)=> {
      setCarName(e.target.value)
      }}/>
      <label>Review: </label>
      <input type="text" name="review" onChange={(e)=> {
      setReview(e.target.value)}}/>
      <button onClick={submitReview}>Submit</button>
      {carReviewList.map((val)=>{
          return (
            <div className="card">
              <h1>{val.carName}</h1>
              <p>{val.carReview}</p>

              <button onClick={() =>{deleteReview(val.carName)}}>Delete</button>
              <input type="text" id="updateInput" onChange={(e) =>{
                setNewReview(e.target.value)
              }} />
              <button onClick={()=>{ updateReview(val.carName)}} >Update</button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;

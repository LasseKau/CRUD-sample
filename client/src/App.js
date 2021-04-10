import React, { useState } from 'react'
import './App.css';

function App() {

  const [carName, setCarName] = useState('')
  const [review, setReview] = useState('')

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
      <button>Submit</button>
      </div>
    </div>
  );
}

export default App;

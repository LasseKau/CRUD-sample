const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const port = 3001;

app.use(cors());
app.use(express.json()); //allows to grab information from the frontend, Returns middleware 
app.use(express.urlencoded({extended: true}))

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'moimoi123',
    database: 'cruddb',
});


// // req = require, when we want to get info from frontend
// // res = response, when we want to send info to frontend

app.post("/create", (req, res) => {
    const name = req.body.carName;
    const year = req.body.carYear;
    const maker = req.body.carMaker;
    const review = req.body.carReview;
    const price = req.body.carPrice;
  
    //add values
    db.query(
      "INSERT INTO car_reviews (carName, carYear, carMaker, carReview, carPrice) VALUES (?,?,?,?,?)",
      [name, year, maker, review, price],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });
  
  // //route to get info about existing cars in a json to the frontend from db
  app.get("/car_reviews", (req, res) => {
    db.query("SELECT * FROM car_reviews", (err, result) => {
      if (err) {
        console.log(err);
        console.log("select car reviews:");
      } else {
        res.send(result);
      }
    });
  });
  
  //update car price
  app.put("/update", (req, res) => {
    const id = req.body.id;
    const price = req.body.price;
    db.query(

      "UPDATE car_reviews SET carPrice = ? WHERE id = ?",
      [price, id],
      (err, result) => {
        if (err) {
          console.log(err);
         // console.log("update backend :");
        } else {
          res.send(result);
        }
      }
    );
  });
  
//delete
  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM car_reviews WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      //  console.log("deleteID :");
      } else {
        res.send(result);
      }
    });
  });
  

// app.get('/api/get', (req, res) => {
//     const sqlSelect = 
//     "Select * FROM car_reviews";   //selecting all info
//     db.query(sqlSelect, [carName, carReview], (err, result) => {
//         console.log("result: " + result);
//         res.send("result: " + result); //sending an array of the results to frontend
//     })
// })

// app.post("/api/insert/", (req, res) => { //the request from the body and the name of the variable were requesting a variable that is passed by the axios.post from the frontend. 

//     //variables to insert
//     const carName = req.body.carName
//     const carReview = req.body.carReview

//     //inserting our values to car_reviews db
//     const sqlInsert = 

//     "INSERT INTO car_reviews (carName, carReview) VALUES (?,?)";
//     db.query(sqlInsert, [carName, carReview], (err, result) => {
//     console.log("error" + err);

//     });
// });

// //deleting items from db, method to pass parameters to route
// app.delete('/api/delete/:carName', (req, res)=> {
//     const name = req.params.carName
//     const sqlDelete = 
//     "DELETE FROM car_reviews WHERE carName = ?"; //deletes spesific car name
    
//     db.query(sqlDelete, name, (err, result) => {
//         if(err) console.log(err);
//     })
// })
//     app.put('/api/update', (req, res)=> {
//     const name = body.params.carName;
//     const name = body.params.carReview;
//     const sqlUpdate = "UPDATE car_reviews SET carReview = ? WHERE carName= " // ? is the variable were gonna pass
 
    
//     db.query(sqlUpdate, [review, name], (err, result) => { //instead of passing one name, were gonna pass an array
//         if(err) console.log(err);
//     });
// })


// we want to listen to server, passing port 3001 since localhost is running 3000
app.listen(port, () => {
console.log("listen to port: " + port);   //testing to make sure server is working

});

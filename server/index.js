const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const port = 3001;

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'moimoi123',
    database: 'cruddb',
});

app.use(cors());
app.use(express.json()); //allows to grab information from the frontend
app.use(express.urlencoded({extended: true}))

//route to get info about existing cars in a json to the frontend from db
app.get('/api/get', (req, res) => {
    const sqlSelect = 
  
    "Select * FROM car_reviews";   //selecting all info
    db.query(sqlInsert, [carName, carReview], (err, result) => {
        console.log(result);
    })
})

app.post("/api/insert/", (req, res) => {

    //variables to insert
    const carName = req.body.carName
    const carReview = req.body.carReview
    //we request 

    //inserting our values 
    const sqlInsert = 
    "INSERT INTO car_reviews (carName, carReview) VALUES (?,?)";
    db.query(sqlInsert, [carName, carReview], (err, result) => {
    console.log(err);

    });
});
// with "/", it just goes to url. when you say app.get, you pass the route, then the paprameters of a function. 
// req = require, when we want to get info from frontend
// res = response, when we want to send info to frontend,
app.get("/", (req, res)=> { 
    console.log("inserting");
    const sqlInsert = "INSERT INTO `car_reviews` (`carName`, `carReview`) VALUES ('bmw', 'good car');" //testing to see if db is working
    db.query(sqlInsert, (err, result) => {//creating sql command/insert. we can pass a string or function in the query
    res.send('hello w0rbv54ld'); //testing sending to server, see if it inserts
    })
});
// we want to listen to server, passing port 3001 since localhost is running 3000
app.listen(port, () => {
console.log("listen to port: " + port);   //testing to make sure server is workin

});

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
app.use(express.json()); //allows to grab information from the frontend, Returns middleware 
app.use(express.urlencoded({extended: true}))

//route to get info about existing cars in a json to the frontend from db
app.get('/api/get', (req, res) => {
    const sqlSelect = 
    "Select * FROM car_reviews";   //selecting all info
    db.query(sqlSelect, [carName, carReview], (err, result) => {
        console.log("result: " + result);
        res.send("result: " + result); //sending an array of the results to frontend
    })
})

//requesting info from frontend 

app.post("/api/insert/", (req, res) => { //the request from the body and the name of the variable were requesting a variable that is passed by the axios.post from the frontend. 

    //variables to insert
    const carName = req.body.carName
    const carReview = req.body.carReview

    //inserting our values to car_reviews db
    const sqlInsert = 
    "INSERT INTO car_reviews (carName, carReview) VALUES (?,?)";
    db.query(sqlInsert, [carName, carReview], (err, result) => {
    console.log("error" + err);

    });
});

// with "/", it just goes to url. when you say app.get, you pass the route, then the paprameters of a function. 
// req = require, when we want to get info from frontend
// res = response, when we want to send info to frontend

app.get("/", (req, res)=> { 
    console.log("inserting");
    const sqlInsert = "INSERT INTO `car_reviews` (`carName`, `carReview`) VALUES ('bmw', 'good car');" //testing to see if db is working
    db.query(sqlInsert, (err, result) => {//creating sql command/insert. we can pass a string or function in the query
    res.send('hello w0rbv54ld'); //testing sending to server, see if it inserts
    })
});


//deleting items from db, method to pass parameters to route
app.delete('/api/delete/:carName', (req, res)=> {
    const name = req.params.movieName
    const sqlDelete = 
    "DELETE FROM car_reviews WHERE carName = ?"; //deletes spesific car name
    
    db.query(sqlDelete, name, (err, result) => {
        if(err) console.log(err);
    })
})
    app.put('/api/update', (req, res)=> {
    const name = body.params.carName;
    const name = body.params.carReview;
    const sqlUpdate = "UPDATE SET car_reviews carReview = ? WHERE carName= " // ? is the variable were gonna pass
 
    
    db.query(sqlUpdate, [review, name], (err, result) => { //instead of passing one name, were gonna pass an array
        if(err) console.log(err);
    });
})


// we want to listen to server, passing port 3001 since localhost is running 3000
app.listen(port, () => {
console.log("listen to port: " + port);   //testing to make sure server is working

});

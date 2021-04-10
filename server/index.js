const express = require('express');
const app = express();
const mysql = require('mysql');
const port = 3001;

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'moimoi123',
    database: 'cruddb',
});

// const connection = mysql.createConnection({
//      host: 'localhost',
//      user: 'root',
//      password: 'moimoi123',
//      database: 'cruddb',
//  });
 
//  connection.connect();

//  app.get("/", (req, res)=> { 
//     console.log("inserting");
//     const sqlInsert = "INSERT INTO `car_reviews` (`carName`, `carReview`) VALUES ('bmw', 'good car');" //testing to see if db is working
//     connection.query(sqlInsert, (err, result) => {//creating sql command/insert. we can pass a string or function in the query
//     res.send('hello w0rbv54ld'); //testing sending to server, see if it inserts
//     connection.end()
//     })
// });
// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//     if (err) throw err
  
//     console.log('The solution is: ', rows[0].solution)
//   })
  
// connection.end()

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

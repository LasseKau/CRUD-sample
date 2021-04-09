const express = require('express');
const app = express();



// with "/", it just goes to url. when you say app.get, you pass the route, then the paprameters of a function. 
// req = require, when we want to get info from frontend
// res = response, when we want to send info to frontend,
app.get("/", (req, res)=> { 
    res.send('hello world'); //testing sending to server
})
// we want to listen to server, passing port 3001 since localhost is running 3000
app.listen(3001, () => {
//console.log("running port 3001");     //testing to make sure server is working

})
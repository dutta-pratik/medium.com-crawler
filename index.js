const port = 8000;
const express = require("express");

const app = express();


app.listen(port, function(err){
    if(err){
        console.log("Error in running Server");
    }
    console.log(`Server is Up and Running at port ${port}`);
});
const port = 8000;
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const expressLayout = require("express-ejs-layouts");

const app = express();

//enables cors
// app.use(cors({
//     'allowedHeaders': ['sessionId', 'Content-Type'],
//     'exposedHeaders': ['sessionId'],
//     'origin': '*',
//     'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     'preflightContinue': false
//   }));
app.use(bodyparser.urlencoded({extended: true}));

app.use(express.static("assets"));

//using layout
app.use(expressLayout);

//extracting styles and script from sub-pages to layout 
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", require("./routes/index"));

app.listen(port, function(err){
    if(err){
        console.log("Error in running Server");
    }
    console.log(`Server is Up and Running at port ${port}`);
});
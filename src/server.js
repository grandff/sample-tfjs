require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

const PORT = process.env.PORT;

// ex
app.get("/", (req, res) => {
    res.json({message : "Root page"});    
});

// get data
// http://localhost:3000/get-data1?name=raja
app.get("/get-data1", (req, res) => {
    const q = req.query;
    res.json({message : "Get JSON Example", name : q.name});
})

// post data
app.get("/post-data1", (req,res) => {
    const q = req.body;
    res.json({message : "Post JSON Example", name : q.name})  ;
})

app.listen(PORT, () => console.log(`server on ${PORT}`));
require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import {simpleTest} from "./tfjs_001/model";
import {run} from "./tfjs_002/script";

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
});

// tfjs sample
app.get("/test1", async (req,res) => {
	const result = await simpleTest();
	res.json({
		message : "Train Complete",
		loss : result.history.loss[(result.params.epochs * 1) - 1]
	})
	//console.log("the end", result);
});

// 2D 데이터로 예측하기
// 데이터 분포도 시각화
app.get("/test2-vis", (req, res) => {
	res.sendFile('absolutePathToYour/htmlPage.html');
})

// 데이터 예측
app.get("/test2", async (req,res) => {
	const result = await run();
	console.log(result);
	res.json({
		message : "Train Complete"
	});
});



app.listen(PORT, () => console.log(`server on ${PORT}`));
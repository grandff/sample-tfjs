require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import {simpleTest} from "./tfjs_001/model";
import {run} from "./tfjs_002/script";
import {run as tf3run, predictSample} from "./tfjs_003/pitch_type";
import { checkData } from "./tfjs_003/utils";
import {init as initBoston, run as tf4run} from "./tfjs_004/index";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));		// express 였는지 node 였는지 일정버전 이하에는 body-parser를 사용해야함

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

//ptich type train
app.get("/pitch-type/train", async (req, res) => {
	const result = await tf3run();
	console.log("the end");

	res.json({
		message : "Train Complete"
	});
})

// pitch type predict
// postman test시 x-www-form-urlencoded 선택해야함
/*
	vx0,vy0,vz0,ax,ay,az,start_speed,left_handed_pitcher
	1.97350398860808,-129.267726266149,-4.49716679881118,6.62397065405993,26.8317990780022,-27.7276871429288,88.9,0
	슬라이더 데이터
*/
app.post("/pitch-type/predict", async (req, res) => {	
	let resultMsg = "";
	// get data want to predict
	const getData = req.body;	
	const dataCheckResult = checkData(getData);
	
	// if null, return fail message
	if(dataCheckResult.errorFlag){
		res.json({
			message : "예측에 실패했습니다.",
			errMsg : "입력 값을 확인해주세요."
		})
	}else{
		const result = await predictSample(dataCheckResult.returnAry);
		res.json({
			message : "예측에 성공했습니다.",
			errMsg : "",
			type : result
		});
	}
});

app.get("/boston/test", async (req, res) => {
	let readyForInit = await initBoston();	
	let result = null;
	if(readyForInit){
		result = tf4run("01", false);
	}
	
	if(!result){
		res.json({
			message : "success",
			testLoss : result.testLoss,
			valiLoss : result.valiLoss,
			testLoss : result.testLoss
		});
	}else{
		res.json({
			message : "failed"
		});
	}
	
	
})


app.listen(PORT, () => console.log(`server on ${PORT}`));
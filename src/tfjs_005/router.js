import express from "express";
import {init, train} from "./index";
import { showDataFrame, dfdMinMaxScalar } from "./analysis";
import {linearRegressionModel} from "./model";
export const priceRouter = express.Router();

// send redirect train
priceRouter.get("/", (req,res) => {    
    res.json({
        message : "test ok"
    });
});

// 모델 훈련
priceRouter.get("/train", async (req, res) => {
	const trainResult = await train();
	if(trainResult.result){
		res.json({
			"result" : trainResult.result,
			"trainLoss" : trainResult.trainLoss,
			"valLoss" : trainResult.valLoss,
			"testLoss" : trainResult.testLoss		
		});	
	}else{
		res.json({
			"errMsg" : "train failed"
		})
	}
	
});

priceRouter.get("/predict", (req, res) => {
	
});

// data load 및 정규화 (min max scalaer)
priceRouter.get("/data", async (req,res) => {    
	try{
		
		const {result} = await init();
		if(!result) throw new Error("데이터 로드 실패");
		res.json({			
			"message" : "train setting complete"
		});	
	}catch(e){
		res.json({
			"message" : `setting error ${e}`
		});
	}
});
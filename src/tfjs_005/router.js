import express from "express";
import {init} from "./index";
import { showDataFrame, dfdMinMaxScalar } from "./analysis";
import {linearRegressionModel} from "./model";
export const priceRouter = express.Router();

let priceData = null;
let model = null;

//numFeatures

// send redirect train
priceRouter.get("/", (req,res) => {    
    res.json({
        message : "test ok"
    });
});

priceRouter.get("/train", (req, res) => {
	
});

priceRouter.get("/predict", (req, res) => {
	
});

// data load 및 정규화 (min max scalaer)
priceRouter.get("/data", async (req,res) => {    
	try{
		if(priceData === null)	priceData = await init();    	
		showDataFrame(priceData.result.rawTrainFeatures);		// describe
		let normalizedData = {};
		normalizedData = dfdMinMaxScalar(priceData.result.rawTrainFeatures, [4, 6, 7]);

		priceData.result.rawTrainFeatures = normalizedData.data;
		showDataFrame(priceData.result.rawTrainFeatures);

		res.json({
			"message" : "train setting complete"
		});	
	}catch(e){
		res.json({
			"message" : `setting error ${e}`
		});
	}
	
});
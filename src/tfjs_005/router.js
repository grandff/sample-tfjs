import express from "express";
import {init} from "./index";
import { showDataFrame, dfdMinMaxScalar } from "./analysis";
export const priceRouter = express.Router();

let priceData = null;

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

priceRouter.get("/data", async (req,res) => {    
	if(priceData === null)	priceData = await init();    	
    showDataFrame(priceData.result.rawTrainFeatures);		// describe
	dfdMinMaxScalar(priceData.result.rawTrainFeatures, [5, 7, 8]);
    /*
        mile, tax, mpg 세개는 표준편차가 너무 커서 normalization 해주는게 좋을듯 ?
    */
    res.json({
        "message" : "ok"
    });
});
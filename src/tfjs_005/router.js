import express from "express";
import {init} from "./index";
import { showDataFrame } from "./analysis";
export const priceRouter = express.Router();

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
	const data = await init();
    console.log(data.result.rawTrainFeatures);
    showDataFrame(data.result.rawTrainFeatures);
    /*
        mile, tax, mpg 세개는 표준편차가 너무 커서 normalization 해주는게 좋을듯 ?
    */
    res.json({
        "message" : "ok"
    });
});
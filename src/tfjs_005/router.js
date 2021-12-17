import express from "express";
import {init} from "./index";
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
    res.json({
        data
    });
});
import express from "express";
export const priceRouter = express.Router();
import {test} from "./tfjs_005/data";

priceRouter.get("/", (req,res) => {
    test();
    res.json({
        message : "test ok"
    });
});

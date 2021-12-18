import * as tf from "@tensorflow/tfjs-node";
import {PriceDataSet, trainFeatures, readCsv} from "./data";
import { showDataFrame } from "./analysis";
const priceDataset = new PriceDataSet();

let tensors = {};

// 데이터 텐서로 변환
const arraysToTensors = () => {
	tensors.rawTrainFeatures = tf.tensor2d(priceDataset.trainX);
	tensors.trainTarget = tf.tensor2d(priceDataset.trainY);
	tensors.rawTestFeatures = tf.tensor2d(priceDataset.testX);
	tensors.testTarget = tf.tensor2d(priceDataset.testY);	
}

// 데이터 로드
export const init = async () => {
	// data load 및 텐서로 변환
	await priceDataset.loadData();	
	arraysToTensors();

	return {
		result : tensors
	}
}

// 데이터 프레임 로드
export const dataFrame = () => {
	showDataFrame();
	
}
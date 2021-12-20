import * as tf from "@tensorflow/tfjs-node";
import {PriceDataSet, trainFeatures, readCsv} from "./data";
import { showDataFrame, dfdMinMaxScalar } from "./analysis";
const priceDataset = new PriceDataSet();

let priceData = null;
let tensors = {};
let model = null;

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
	if(priceData === null) priceData = await priceDataset.loadData();	
	arraysToTensors();
	showDataFrame(priceData.result.rawTrainFeatures);		// describe
			
	// 데이터 정규화
	let normalizedData = {};
		normalizedData = dfdMinMaxScalar(priceData.result.rawTrainFeatures, [4, 6, 7]);

		priceData.result.rawTrainFeatures = normalizedData.data;
		showDataFrame(priceData.result.rawTrainFeatures);
	
	
	// 데이터 저장.. 이 가능한가 ?

	// 모델 로드
	
	return {
		result : tensors
	}
}

// 모델 컴파일 및 학습
export const train = () => {
	
}
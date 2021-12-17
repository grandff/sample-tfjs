import * as tf from "@tensorflow/tfjs-node";
import {PriceDataSet, trainFeatures, readCsv} from "./data";
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
	/*await priceDataset.loadData();	
	arraysToTensors();*/
	
	// 일단 데이터셋 하나로 테스트 해보기
	const result = await readCsv("X_train.csv");
	tensors.rawTrainFeatures = tf.tensor2d(result, 'float32');
	return {
		result : tensors
	}
}
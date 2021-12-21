import * as tf from "@tensorflow/tfjs-node";
import {PriceDataSet, trainFeatures, readCsv} from "./data";
import {linearRegressionModel} from "./model";
import { showDataFrame, dfdMinMaxScalar } from "./analysis";
import {determineMeanAndStddev, normalizeTensor} from "./utils/normalization";
const priceDataset = new PriceDataSet();

// 기본 변수
let tensors = {};
let model = null;
let normalizedData = {};

// 하이퍼 파라미터
const NUM_EPOCHS = 10;
const BATCH_SIZE = 64;
const LEARNING_RATE = 0.01;

// 데이터 텐서로 변환
const arraysToTensors = () => {
	tensors.rawTrainFeatures = tf.tensor2d(priceDataset.trainX);
	tensors.trainTarget = tf.tensor2d(priceDataset.trainY);
	tensors.rawTestFeatures = tf.tensor2d(priceDataset.testX);
	tensors.testTarget = tf.tensor2d(priceDataset.testY);	
	
	// tensorflow example 사용
	/*let {dataMean, dataStd} = determineMeanAndStddev(tensors.rawTrainFeatures);
	
	tensors.trainFeatures = normalizeTensor(tensors.rawTrainFeatures, dataMean, dataStd);
	tensors.testFeatures = normalizeTensor(tensors.rawTestFeatures, dataMean, dataStd);*/
}

// 데이터 로드
export const init = async () => {
	// data load 및 텐서로 변환
	await priceDataset.loadData();	
	arraysToTensors();
	//showDataFrame(priceDataset.trainX);		// describe
	//showDataFrame(tensors.rawTrainFeatures);
			
	// 데이터 정규화 danfo minmax 사용
	normalizedData = dfdMinMaxScalar(tensors.rawTrainFeatures, [4, 6, 7]);
	tensors.trainFeatures = normalizedData.data;
	//showDataFrame(priceData.result.rawTrainFeatures);
	normalizedData = dfdMinMaxScalar(tensors.rawTestFeatures, [4, 6, 7]);
	tensors.testFeatures = normalizedData.data;
	//showDataFrame(priceData.result.rawTestFeatures);		
	showDataFrame(tensors.trainFeatures);
	showDataFrame(tensors.testFeatures);
	
	return {
		result : true
	}
}

// 모델 컴파일 및 학습
export const train = async () => {
	// 모델 로드
	const features = priceDataset.numFeatures;
	model = linearRegressionModel(features);
	
	// 모델 훈련 로그
	let trainLogs = [];
	
	// 모델 컴파일
	model.compile({
		optimizer : tf.train.sgd(LEARNING_RATE),
		loss : 'meanSquaredError'		
	});
	
	// 모델 피팅
	console.log("모델 훈련 시작");
	console.log(features);
	console.log(tensors.trainFeatures, tensors.trainTarget);
	
	await model.fit(tensors.trainFeatures, tensors.trainTarget,{
		batchSize : BATCH_SIZE,
		epochs : NUM_EPOCHS,
		validationSplit : 0.2,
		callbacks : {
			onEpochEnd : async (epoch, logs) => {
				console.log(`Epoch : ${epoch + 1} of ${NUM_EPOCHS} completed`);
				trainLogs.push(logs);
			}
		}
	});
	
	// 훈련 결과 정보
	const result = model.evaluate(tensors.testFeatures, tensors.testTarget, {batchSize : BATCH_SIZE});
	const testLoss = result.dataSync()[0];
	
	const trainLoss = trainLogs[trainLogs.length - 1].loss;
	const valLoss = trainLogs[trainLogs.length - 1].loss;
	
	return {
		result : true,
		trainLoss : trainLoss.toFixed(4),
		valLoss : valLoss.toFixed(4),
		testLoss : testLoss.toFixed(4)
	}
}

// 모델 예측
export const predict = () => {
	
}
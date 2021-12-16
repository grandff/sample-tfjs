import * as tf from "@tensorflow/tfjs-node";
import {BostonHousingDataset, featureDescriptions} from "./data";
import * as normalization from "./normalization";
import {linearRegressionModel, multiLayerPerceptronRegressionModel1Hidden, multiLayerPerceptronRegressionModel2Hidden} from "./model";

// boston constructor
const bostonData = new BostonHousingDataset();
const tensors = {};

// hyper parameter
const NUM_EPOHCS = 200;
const BATCH_SIZE = 40;
const LEARNING_RATE = 0.01;

// data를 tensor형으로 변환하고 정규화까지
const arraysToTensors = () => {
	tensors.rawTrainFeatures = tf.tensor2d(bostonData.trainFeatures);
	tensors.trainTarget = tf.tensor2d(bostonData.trainTarget);
	tensors.rawTestFeatures = tf.tensor2d(bostonData.testFeatures);
	tensors.testTarget = tf.tensor2d(bostonData.testTarget);
	
	// 평균값 및 표준편차 값 구하기
	let {dataMean, dataStd} = normalization.determineMeanAndStddev(tensors.rawTrainFeatures);
	
	// 정규화시킨 features 값 저장
	tensors.trainFeatures = normalization.normalizeTensor(tensors.rawTrainFeatures, dataMean, dataStd);
	tensors.testFeatures = normalization.normalizeTensor(tensors.rawTestFeatures, dataMean, dataStd);
	
}

// 현재 선형 가중치 정보 리턴
const describeKernelElements = (kernel) => {
	// assert - 표현식이 참인지 확인합니다. 그렇지 않으면 제공된 메시지와 함께 오류가 발생합니다.
	// false 일 경우 메시지 출력
	// 현재 features가 총 12개 이므로 12개 입력을 받아야함
	tf.util.assert(
		kernel.length === 12,
		`kernel must be a array of length 12, got ${kernel.length}`
	);
	
	const outList = [];
	for(let idx = 0; idx < kernel.length; idx++){
		outList.push({
			description : featureDescriptions[idx],
			value : kernel[idx]
		});
	}
	
	return outList;
}

// 데이터 로드
// data 정규화 및 텐서화
export const init = async () => {
	await bostonData.loadData();		// data load
	arraysToTensors();		// tensor 변환
	
	return true;
}

// fit 실행
export const run = async (modelVer, weightsIllustration) => {
	// 입력받은 모델마다 다르게 설정
	let model = "";
	let modelName = "";
	console.log("fucking test :: ", bostonData.numFeatures)
	if(modelVer === "01"){
		console.log("hoxy ?? ");
		model = linearRegressionModel();
		console.log("hoxy ?? !!  ");
		modelName = "Linear Regression Model";
	}else if(modelVer === "02"){
		model = multiLayerPerceptronRegressionModel1Hidden();
		modelName = "Multi Layer Perceptron Regression Model with 1 Hidden layer;"
	}else if(modelVer === "03"){
		model = multiLayerPerceptronRegressionModel2Hidden();
		modelName = "Multi Layer Perceptron Regression Model with 2 Hidden layer;"
	}
	
	// 훈련 로그 정보 저장
	let trainLogs = [];
	
	// 모델 컴파일
	// sgd optimizer 사용
	// learning rate 필수임
	model.compile(
		{
			optimizer : tf.train.sgd(LEARNING_RATE),
			loss : 'meanSquaredError'
		}
	);
	
	// 모텔 피팅
	console.log(`${modelName} Starting training process ... `);
	await model.fit(tensors.trainFeatures, tensors.trainTarget, {
		batchSize : BATCH_SIZE,
		epochs : NUM_EPOHCS,
		validationSplit : 0.2,
		callbacks : {
			onEpochEnd : async (epoch, logs) => {
				console.log(`Epoch : ${epoch + 1} of ${NUM_EPOHCS} completed`);
				trainLogs.push(logs);
				
				// 현재 선형 가중치 리턴 .. ?
				if(weightsIllustration){
					model.layers[0].getWeights()[0].data().then(kernelAsArr => {
						const weightList = describeKernelElements(kernelAsArr);
						console.log(weightList);
					})
				}
			}
		}
	});
	
	// 결과 정보 리턴
	const result = model.evaluate(tensors.testFeatures, tensors.testTarget, {batchSize : BATCH_SIZE});
	const testLoss = result.dataSync()[0];
	
	const trainLoss = trainLogs[trainLogs.length - 1].loss;
	const valLoss = trainLogs[trainLogs.length - 1].var_loss;
	
	// tofixed - 숫자를 고정 소수점 표기법으로 표기해 반환 (js 임)
	return {
		testLoss : trainLoss.toFixed(4),
		valiLoss : valLoss.toFixed(4),
		testLoss : testLoss.toFixed(4)
	}
}
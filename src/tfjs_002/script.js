import * as tf from "@tensorflow/tfjs-node";
const axios = require('axios');

// json cars 데이터 세트 로드
// 각 자동차에 대한 다양한 특징 포함
const getData = async() => {		
	const carsDataResponse = await axios
	.get('https://storage.googleapis.com/tfjs-tutorials/carsData.json')	  
	.catch(function (error) {
		console.log(error);
	});	
		
	const carsStr = JSON.stringify(carsDataResponse.data);
	const carsData = JSON.parse(carsStr);
	
	// miles_per_gallen -> mpg, Horsepower -> horsepower 로 명칭 변경
	// filter롤 사용해서 갤런과 마력 데이터만 가져옴
	// 갤런당 마력을 예측 (1:1 매칭임)
	const cleaned = carsData.map(car => ({
		mpg : car.Miles_per_Gallon,
		horsepower : car.Horsepower
	}))
	.filter(car => (car.mpg != null && car.horsepower != null));
	
	return cleaned;
}

// 모델 아키텍쳐
const createModel = () => {
	const model = tf.sequential();
	model.add(tf.layers.dense({
		inputShape : [1],
		units : 1,	// 가중치
		useBias : true
	}));	// single input layer
	model.add(tf.layers.dense({
		units : 1,	// 가중치
		useBias : true
	}));	// output layer
	
	return model;
}

// 데이터를 텐서로 변환
const convertToTenser = (data) => {
	return tf.tidy(() => {
		// shuffle data
		/*
			순서에 의존하지 않도록 섞어주는게 좋다
		*/
		tf.util.shuffle(data);
		
		// convert data to tensor
		/*
			입력 예시용과 실제 출력 값을 가진 두개의 배열로 나눔
			배열 데이터를 2d 텐서로 변환
			텐서의 모양은 [num_examples, num_features_per_example]
		*/
		const inputs = data.map(d => d.horsepower);
		const labels = data.map(d => d.mpg);
		const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
		const labelTenser = tf.tensor2d(labels, [labels.length, 1]);
		
		// normarlize the data to the range 0 -1 using min-max scaling
		/*
			정규화 작업 진행
		*/
		const inputMax = inputTensor.max();
		const inputMin = inputTensor.min();
		const labelMax = labelTenser.max();
		const labelMin = labelTenser.min();
		
		const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
		const normalizedLabels = labelTenser.sub(labelMin).div(labelMax.sub(labelMin));
		
		return {
			inputs : normalizedInputs,
			labels : normalizedLabels,
			inputMax,
			inputMin,
			labelMax,
			labelMin
		}
	});
}

// 모델 학습
const trainModel = async (model, inputs, labels) => {
	// prepare the model for training
	/*
		모델 학습 전 컴파일 과정
		아래 구성인자는 검색해서 더 자세히 찾아보기
		현재 셋팅이 가장 노멀한거
	*/
	model.compile({
		optimizer : tf.train.adam(),
		loss : tf.losses.meanSquaredError,
		metrics : ['mse']
	});
	
	const batchSize = 32;
	const epochs = 50;
	
	const result = await model.fit(inputs, labels, {
		batchSize,
		epochs,
		shuffle : true
	});
	
	return result;
}

// 머신러닝 실행
export const run = async () => {
	// get data
	const data = await getData();
	const values = data.map(d => ({
		x : d.horsepower,
		y : d.mpg
	}));
	//create model
	const model = createModel();
	// call functions
	const tensorData = convertToTenser(data);
	const {inputs, labels} = tensorData;
	// train model
	const result = await trainModel(model, inputs, labels);
	
	return result;
}

// 모델 예측
/*
	마력이 낮은 것부터 높은 것 까지 일정한 범위의 숫자를 예측
*/
export const testModel = (model, inputData, normalizationData) => {
	
}
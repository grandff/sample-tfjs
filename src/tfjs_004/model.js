import * as tf from "@tensorflow/tfjs-node";

// linear regression model
export const linearRegressionModel = (features) => {
	const model = tf.sequential();
	model.add(tf.layers.dense({
		inputShape : [features],
		units : 1
	}));
	
	model.summary();		// model 요약 정보
	return model;
}

// multi layer perceptron regression model
// 1 hidden layer
// 10 units activated by sigmoid
export const multiLayerPerceptronRegressionModel1Hidden = (features) => {
	const model = tf.sequential();
	model.add(tf.layers.dense({
		inputShape : [features],
		units : 50,
		activation : 'sigmoid',
		kernelInitializer : 'leCunNormal'
	}));
	model.add(tf.layers.dense({units : 1}));
	
	model.summary();
	return model;
}

// multi layer perceptron regression model
// 2 hidden layer
// 10 units activated by sigmoid
export const multiLayerPerceptronRegressionModel2Hidden = (features) => {
	const model = tf.sequential();
	model.add(tf.layers.dense({
		inputShape : [features],
		units : 50,
		activation : 'sigmoid',
		kernelInitializer : 'leCunNormal'
	}));
	model.add(tf.layers.dense({
		units : 50,
		activation : 'sigmoid',
		kernelInitializer : 'leCunNormal'
	}));
	model.add(tf.layers.dense({units : 1}));
	
	model.summary();
	return model;
}
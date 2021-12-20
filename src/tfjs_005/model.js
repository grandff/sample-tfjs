import * as tf from "@tensorflow/tfjs-node";

// multi layer perceptron regression model
// 2 hidden layer
// 10 units activated by sigmoid
export const linearRegressionModel = (features) => {
	const model = tf.sequential();
	model.add(tf.layers.dense({
		inputShape : [features],
		units : 64,
		activation : 'relu',
		kernelInitializer : 'leCunNormal'
	}));
	model.add(tf.layers.dense({
		units : 64,
		activation : 'relu',
		kernelInitializer : 'leCunNormal'
	}));
	model.add(tf.layers.dense({units : 1}));
	
	model.summary();
	return model;
}
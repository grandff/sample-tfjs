import * as tf from "@tensorflow/tfjs-node";

// multi layer perceptron regression model
// 2 hidden layer
// 10 units activated by sigmoid
/*
export const linearRegressionModel = (features) => {
	const model = tf.sequential();
	model.add(tf.layers.dense({
		inputShape : [features],
		units : 250,
		activation : 'relu',
		kernelInitializer : 'leCunNormal'
	}));
	model.add(tf.layers.dense({
		units : 200,
		activation : 'relu', //relu
		kernelInitializer : 'leCunNormal'
	}));
	model.add(tf.layers.dense({
		units : 150,
		activation : 'relu', //relu
		kernelInitializer : 'leCunNormal'
	}));
	model.add(tf.layers.dense({
		units : 100,
		activation : 'relu', //relu
		kernelInitializer : 'leCunNormal'
	}));
	model.add(tf.layers.dense({units : 1}));
	
	model.summary();
	return model;
}*/

export const linearRegressionModel = (features) => {
	const model = tf.sequential();
	model.add(tf.layers.dense({
		inputShape : [features],
		units : 200,
		activation : 'sigmoid',
		kernelInitializer : 'leCunNormal'
	}));
	model.add(tf.layers.dense({
		units : 150,
		activation : 'sigmoid', //relu
		kernelInitializer : 'leCunNormal'
	}));
	model.add(tf.layers.dense({
		units : 100,
		activation : 'sigmoid', //relu
		kernelInitializer : 'leCunNormal'
	}));
	model.add(tf.layers.dense({
		units : 32,
		activation : 'sigmoid', //relu
		kernelInitializer : 'leCunNormal'
	}));
	model.add(tf.layers.dense({units : 1}));
	
	model.summary();
	return model;
}
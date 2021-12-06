import * as tf from "@tensorflow/tfjs-node";

// 가장 기초적인 모델로 테스트
export const simpleTest = async () => {
	const model = tf.sequential();
	model.add(tf.layers.dense({units : 100, activation : 'relu', inputShape : [10]}));
	model.add(tf.layers.dense({units : 1, activation : 'linear'}));
	model.compile({optimizer : 'sgd', loss : 'meanSquaredError'});

	const xs = tf.randomNormal([100, 10]);
	const ys = tf.randomNormal([100, 1]);

	const history = await model.fit(xs, ys, {
		epochs : 10, 
		callbacks : {
			onEpochEnd : (epoch, log) => console.log(`Epoch : ${epoch}, loss = ${log.loss}`)
		}
	});	
	
	return history;
}

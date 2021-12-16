import * as tf from "@tensorflow/tfjs-node";
const dfd = require("danfojs-node");

// load data with tf.csv


// dfd example
export const test = () => {
    let tensor_arr = tf.tensor([12,34,56,2])
    let s = new dfd.Series(tensor_arr)
    s.print()
}

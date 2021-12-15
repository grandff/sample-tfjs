import * as tf from "@tensorflow/tfjs-node";
import {BostonHousingDataset, featureDescriptions} from "./data";

// boston constructor
const bostonData = new BostonHousingDataset();
const tensors = {};

// hyper parameter
const NUM_EPOHCS = 200;
const BATCH_SIZE = 40;
const LEARNING_RATE = 0.01;
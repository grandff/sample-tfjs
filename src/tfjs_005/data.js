import * as tf from "@tensorflow/tfjs-node";
import * as fs from "fs";
import {changeBrandValue, chnageModel, changeTransMission, changeFuelType} from "./utils/changeVal";
const axios = require('axios');
const csv = require('csv-parser');
const util = require('util');
const stream = require('stream');
const pipeline = util.promisify(stream.pipeline);
const path = require("path");

// csv 파일 경로
const BASE_URL = "/csv/";
const TRAIN_FEATURES_FN = "X_train.csv";
const TRAIN_TARGET_FN = "y_train.csv";
const TEST_FEATURES_FN = "X_test.csv";
const TEST_TARGET_FN = "y_test.csv";

// 파일 읽기(csv parser 사용)
export const readCsv = async (fileName) => {
	const fullUrl = `${__dirname}${BASE_URL}${fileName}`;	
	return new Promise((resolve, reject) => {
		let dataSet = [];
		const readStream = fs.createReadStream(fullUrl);
		readStream
		.pipe(csv())		// csv read
		.on('error', () => {
			console.log(`데이터 읽는 중 오류 발생. ${fullUrl}`);
		})
		.on('data', (data) => {
			// string to in (class)
			if(fileName.includes('X')){
				const parseToInt = changeStringToInteger(data.brand, data.model, data.transmission, data.fuelType);
				data.brand = parseToInt.brand;
				data.model = parseToInt.model;
				data.transmission = parseToInt.transmission;
				data.fuelType = parseToInt.fuelType;
			}			
			
			dataSet.push(data);
		})
		.on('end', () => {						
			// carID 기준으로 정렬하기
			dataSet.sort((a,b) => {
				if (a.carID < b.carID) return -1;
				if (a.carID > b.carID) return 1;
				return 0;
			});
			
			// 전부다 integer 형으로 변경
			dataSet = dataSet.map((row) => {				
				delete row.carID;		// id 값은 제거하기 (이미 정렬했으므로)
				return Object.keys(row).map(key => row[key] * 1);
			});
			
			resolve(dataSet);
		})
	});
}

// 파일 읽기(tf.csv 사용)
const readCsvTensor = async (fileName) => {
	const fullUrl = `${BASE_URL}${fileName}`;	
	return new Promise((resolve, reject) => {
		const dataSet = tf.data.csv(fullUrl, {
			columnConfigs : {
				price : {isLabel : true}
			},
			hasHeader : true
		});
		resolve(dataSet);
	});	
}

// 데이터셋 컬럼들. carId는 제외하기
export const trainFeatures = ['brand','model','year','transmission','mileage','fuelType','tax','mpg','engineSize'];

// string value를 integer로 변경
// brand, model, transmission, fuelType
const changeStringToInteger = (brand, model, transmission, fuelType) => {
	let result = {};
	result.brand = changeBrandValue(brand);
	result.model = chnageModel(model);
	result.transmission = changeTransMission(transmission);
	result.fuelType = changeFuelType(fuelType);
	return result;	
}



// 데이터셋 생성자
export class PriceDataSet {
	constructor() {
		this.trainX = null;
		this.trainY = null;
		this.testX = null;
		this.testY = null;		
	}
	
	get numFeatures(){		// features 갯수 리턴
		if(this.trainX === null){
			throw new Error('데이터가 필요합니다.')
		}
		return this.trainX[0].length
	}
	
	async loadData(){
		[this.trainX, this.trainY, this.testX, this.testY] = await Promise.all([readCsv(TRAIN_FEATURES_FN), readCsv(TRAIN_TARGET_FN), readCsv(TEST_FEATURES_FN), readCsv(TEST_TARGET_FN)
		]);		
	}
	
	async loadData2(){
		[this.trainX, this.trainY, this.testX, this.testY] = await Promise.all([readCsvTensor(TRAIN_FEATURES_FN), readCsvTensor(TRAIN_TARGET_FN), readCsvTensor(TEST_FEATURES_FN), readCsvTensor(TEST_TARGET_FN)
		]);	
	}
}
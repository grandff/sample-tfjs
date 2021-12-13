import * as tf from "@tensorflow/tfjs-node";
import * as fs from "fs";
const axios = require('axios');
const csv = require('csv-parser');

// data set
const BASE_URL = "https://storage.googleapis.com/tfjs-examples/multivariate-linear-regression/data/";
const TRAIN_FEATURES_FN = 'train-data.csv';
const TRAIN_TARGET_FN = 'train-target.csv';
const TEST_FEATURES_FN = 'test-data.csv';
const TEST_TARGET_FN = 'test-target.csv';

// test sources
const results = [];

// download csv 파일
export const downloadCsv = async (fileUrl, fileName) => {
	await axios.get(fileUrl, {responseType: "stream"})
	.then(response => {  
		// Saving file to working directory  
		console.log("test!!!");
    	response.data.pipe(fs.createWriteStream(`./csv/${fileName}.csv`));
		console.log("maybe end!!!");
	}) 
    .catch(error => {  
    	console.log(error);  
	});
}

// read csv 파일
// csv에 있는 데이터를 float형으로 바꾸는 작업이 필요함
export const readCsv = async (filePath) => {
	return new Promise((resolve, reject) => {
		let dataSet = [];
		const testResult = null;
		const readStream = fs.createReadStream(filePath);
		readStream
		.pipe(csv())
		.on('error', () => { 
			return reject(new Error('Error reading file')) 
		})
		.on('data', (data) => { 		
			dataSet.push(data);			
		})
		.on('end', () => { 
			dataSet = dataSet.map((row) => {				
				return Object.keys(row).map(key => parseFloat(row[key]));
			});
			console.log("may be end 3333")
			resolve(dataSet) ;
		})
	});
}

	 
/*
	 아래 소스들은 browser 기준이라 안됨 ...
*/
// csv parsing
// csv 데이터를 array of arrays of numbers 형태로 리턴 .. ?
// promise, map을 통해 csv object를 array 형태로 주는거 같음..
const parseCsv = async (data) => {
	return new Promise(resolve => {
		data = data.map((row) => {
			return Object.keys(row).map(key => parseFloat(row[key]));
		});
		resolve(data);
	});
}

// papaparse 사용해서 csv 파일 읽기
export const loadCsv = async (filename) => {
	return new Promise(resolve => {
		const url = `${BASE_URL}${filename}`;
		console.log(` 파일 다운로드 : ${url}`);
		papa.parse(url, {
			download : true,
			header : true,
			complete : (results) => {
				resolve(parseCsv(results['data']));
			}
		})
	})
}

// 데이터 섞기
// 섞는 알고리즘 .. 임시변수에 이전값 넣어두고 랜덤으로 생성된 인덱스에 값 넣기
const shuffle = (data, target) => {
	let counter = data.length;
	let temp = 0;
	let index = 0;
	while (counter > 0){
		index = (Math.random() * counter) | 0;
		counter--;
		// data
		temp = data[counter];
		data[counter] = data[index];
		data[index] = temp;
		// target
		temp = target[counter];
		target[counter] = target[index];
		target[index] = temp;
	}
}

export class BostonHousingDataset {
	constructor() {
		this.trainFeatures = null;
	}
}
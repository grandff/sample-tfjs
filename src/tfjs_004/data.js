import * as tf from "@tensorflow/tfjs-node";
import * as fs from "fs";
const axios = require('axios');
const csv = require('csv-parser');
const util = require('util');
const stream = require('stream');
const pipeline = util.promisify(stream.pipeline);

// data set
const BASE_URL = "https://storage.googleapis.com/tfjs-examples/multivariate-linear-regression/data/";
const TRAIN_FEATURES_FN = 'train-data.csv';
const TRAIN_TARGET_FN = 'train-target.csv';
const TEST_FEATURES_FN = 'test-data.csv';
const TEST_TARGET_FN = 'test-target.csv';

// 확장자만 떼서 파일 이름 주기
const getFileName = (fileName) => {
	if(!fileName) return null;
	const fileAry = fileName.split(".");
	console.log(`file name : ${fileAry[0]}`)
	return fileAry[0];
}

// test sources
const results = [];

// download csv 파일
export const downloadCsv = async (fileName) => {
	let result = [];
	const url = `${BASE_URL}${fileName}`;
	const csvFile = getFileName(fileName);
	try{
		const request = await axios.get(url,{responseType:'stream'});
		await pipeline(request.data, fs.createWriteStream(`./csv/${csvFile}.csv`));
		result = await readCsv(`./csv/${csvFile}.csv`);
		console.log(`download complete ${csvFile}`);
		console.log(result.length);
	}catch(error){
		console.log('download error', error);
	}
	
	return result;
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
/*export const loadCsv = async (filename) => {
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
}*/

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

// x features
export const featureDescriptions = [
	'Crime rate', 'Land zone size', 'Industrial proportion', 'Next to river', 'Nitric oxide concentration', 'Number of rooms per house', 'Age of housing', 'Distance to commute', 'Distance to highway', 'Tax rate', 'School class size', 'School drop-out rate'
]

export class BostonHousingDataset {
	constructor() {
		this.trainFeatures = null;
		this.trainTarget = null;
		this.testFeatures = null;
		this.testTarget = null;
	}
	
	get numFeatures(){
		if(this.trainFeatures === null){
			throw new Error('need to load data')
		}
		return this.trainFeatures[0].length
	}
	
	async loadData(){
		[this.trainFeatures, this.trainTarget, this.testFeatures, this.testTarget] = await Promise.all([
			downloadCsv(TRAIN_FEATURES_FN), downloadCsv(TRAIN_TARGET_FN), downloadCsv(TEST_FEATURES_FN), downloadCsv(TEST_TARGET_FN)
		]);
		
		shuffle(this.trainFeatures, this.trainTarget);
		shuffle(this.testFeatures, this.testTarget);
	}
}
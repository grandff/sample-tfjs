import * as tf from "@tensorflow/tfjs-node";
const axios = require('axios');

// json cars 데이터 세트 로드
// 각 자동차에 대한 다양한 특징 포함
export const getData = async() => {		
	const carsDataResponse = await axios
	.get('https://storage.googleapis.com/tfjs-tutorials/carsData.json')	  
	.catch(function (error) {
		console.log(error);
	});	
	
	for(const node1 in carsDataResponse.data){
		let data1 = JSON.stringify(node1);
		console.log(data1);
	}
	
	//const carsData = await carsDataResponse.json();
	const carsData = JSON.stringify(carsDataResponse);
	// miles_per_gallen -> mpg, Horsepower -> horsepower 로 명칭 변경
	// filter롤 사용해서 null값 제거
	const cleaned = carsData.map(car => ({
		mpg : car.Miles_per_Gallon,
		horsepower : car.Horsepower
	}))
	.filter(car => (car.mgp != null && car.horsepower != null));
	
	return cleaned;
}
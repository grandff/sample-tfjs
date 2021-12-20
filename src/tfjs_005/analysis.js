import {trainFeatures} from "./data";
const dfd = require("danfojs-node");

// x feautres dataframe 조회
export const showDataFrame = (data) => {    
    let df = new dfd.DataFrame(data, {columns: trainFeatures});    
	//df.ctypes.print();
    df.describe().print();
	//df.isna().print();			// no null value
	/*
		데이터 프레임 확인 결과 mileage, tax, mpg 세개 정규화 필요
	*/
}

// minmax scalar 사용
export const dfdMinMaxScalar = (data, features) => {
	let df = new dfd.DataFrame(data, {columns: trainFeatures});	
	let sub_df = df.iloc({columns: features});	// array 매개변수로 줘야함 number만
	
	// minx max scaler
	let scaler = new dfd.MinMaxScaler()	
	scaler.fit(sub_df);
	let normalizationDf = scaler.transform(sub_df);	// transform 한거에서 tensor 객체만 넘겨주면 됨
	
	// 새로운 데이터프레임 생성
	df.drop({ columns: ["mileage", "tax", "mpg"], inplace: true });
	let com_df = dfd.concat({ df_list: [df, normalizationDf], axis: 1 })
	com_df.rename({ mapper: {"0": "mileage"},inplace: true })
	com_df.rename({ mapper: {"1": "tax"},inplace: true })
	com_df.rename({ mapper: {"2": "mpg"},inplace: true })
	
	return {
		data : com_df.tensor
	}
}
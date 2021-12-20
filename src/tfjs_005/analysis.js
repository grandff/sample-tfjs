import {trainFeatures} from "./data";
const dfd = require("danfojs-node");

// x feautres dataframe 조회
export const showDataFrame = (data) => {    
    let df = new dfd.DataFrame(data, {columns: trainFeatures});    
	df.ctypes.print();
    df.describe().print();
	df.isna().print();			// no null value
}

// minmax scalar 사용
export const dfdMinMaxScalar = (data, features) => {
	let df = new dfd.DataFrame(data, {columns: trainFeatures});
	let sub_df = df.iloc({columns: features});	// array 매개변수로 줘야함 number만
	let scaler = new dfd.MinMaxScaler()
	
	scaler.fit(sub_df);
	let test1 = scaler.transform(sub_df);
	test1.print();
	
	// drop을하고 concat을 해야하나 .. ?
	// 컬럼 이름도 다시 바꿔야함 인덱스로 바껴버렸음
}

/*
// min max scalar

scaler.fit(Xtrain)
Xtrain = scaler.transform(Xtrain)
//return [Xtrain.tensor, ytrain.tensor]


let df = new dfd.DataFrame(data)
let sf = df.iloc({columns: ["0"]})

scaler.fit(sf)

let df_enc = scaler.transform(sf)
df_enc.print()
*/

// 라벨인코딩
/*
	//label Encode Name feature
let encoder = new dfd.LabelEncoder()
let cols = ["Sex", "Name"]
cols.forEach(col => {
  encoder.fit(df[col])
  enc_val = encoder.transform(df[col])
  df.addColumn({ column: col, values: enc_val, inplace: true })
})

df.head().print()
*/
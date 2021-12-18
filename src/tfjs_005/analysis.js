import {trainFeatures} from "./data";
const dfd = require("danfojs-node");

// x feautres dataframe 조회
export const showDataFrame = (data) => {    
    let df = new dfd.DataFrame(data, {columns: trainFeatures});
    df.print();
    df.ctypes.print();
    df.describe().print();
}
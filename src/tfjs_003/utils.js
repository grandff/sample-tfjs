// json data undefined 체크 및 ary로 리턴
export const checkData = (data) => {
    let errorFlag = false;
    let returnAry = [];
    const {vx0, vy0, vz0, ax, ay, az, start_speed, left_handed_pitcher} = data; 
    if(vx0 === undefined || vy0 === undefined || vz0 === undefined || ax === undefined || ay === undefined || az === undefined || start_speed === undefined || left_handed_pitcher === undefined){
        errorFlag = true;
    }else{
        for(let xs in data) returnAry.push(data[xs] * 1);
    }
    
    return {
        errorFlag,
        returnAry
    }
}
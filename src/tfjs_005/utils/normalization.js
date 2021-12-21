// 데이터 각 row에 대해 표준편차와 평균 계산
// tensor를 받아서 object형으로 리턴. 매개변수 무조건 텐서.
// mean, sub, squre, sqrt는 tensor에 선언되어있음
/*
	mean - 평균계산
	sub - 차이 (텐서간 브로드캐스팅도 가능)
	squre - 제곱
	sqrt - 루트
*/
export const determineMeanAndStddev = (data) => {
	const dataMean = data.mean(0);
	const diffFromMean = data.sub(dataMean);
	const squaredDiffFromMean = diffFromMean.square();
	const variance = squaredDiffFromMean.mean(0);
	const dataStd = variance.sqrt();
	return {dataMean, dataStd};		// 1차원 데이터임
}

//  데이터셋 정규화
/*
	div - 나누기
*/
export const normalizeTensor = (data, dataMean, dataStd) => {
	return data.sub(dataMean).div(dataStd);
}
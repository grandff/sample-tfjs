import * as tf from "@tensorflow/tfjs-node";
const axios = require('axios');

export default function pitch_type(){
	// 데이터셋 url
	/* 
		x 값에 해당되는 것들은
		ball velocity(vx0, vy0, vz0)
		ball acceleration (ax, ay, ax)
		투구속도
		왼손잡이 여부
	*/
	/*
		y 값에 해당되는 건
		pitch type
		투심, 포심, 싱커, 커터, 슬라이더, 체인지업, 커브볼
	*/
	const TRAIN_DATA_PATH = "https://storage.googleapis.com/mlb-pitch-data/pitch_type_training_data.csv";
	const TEST_DATA_PATH = "https://storage.googleapis.com/mlb-pitch-data/pitch_type_test_data.csv";

	/*
		위 경로에서 csv파일을 받고 최소, 최댓값, 전체 데이터 길이 등 파악하기
		파이썬과는 다르게 직접 파일 열어서 확인해야하는듯 .. ?

		x컬럼들의 최소, 최댓값
		y label의 종류 수
		데이터 길이
	*/
	const VX0_MIN = -16.847;
	const VX0_MAX = 15.293;
	const VY0_MIN = -145.51;
	const VY0_MAX = -92.024;
	const VZ0_MIN = -14.397;
	const VZ0_MAX = 7.339;
	const AX_MIN = -44.132;
	const AX_MAX = 26.703;
	const AY_MIN = 14.09;
	const AY_MAX = 38.921;
	const AZ_MIN = -48.825;
	const AZ_MAX = -0.16986;
	const START_SPPED_MIN = 62.8;
	const START_SPPED_MAX = 100.4;

	const NUM_PITCH_CLASSES = 7;
	const TRAIN_DATA_LENGTH = 7000;
	const TEST_DATA_LENGTH = 700;

	// 정규화
	const normalize = (value, min, max) => {
		if(min === undefined || max === undefined){
			return value;
		}
		return (value - min) / (max - min);
	}

	// csv 파일로부터 각 행을 x, y로 분리
	const csvTransform = ({xs, ys}) => {
		const values = [
			normalize(xs.vx0, VX0_MIN, VX0_MAX),
			normalize(xs.vy0, VY0_MIN, VY0_MAX),
			normalize(xs.vz0, VZ0_MIN, VZ0_MAX),
			normalize(xs.ax, AX_MIN, AX_MAX),
			normalize(xs.ay, AY_MIN, AY_MAX),
			normalize(xs.az, AZ_MIN, AZ_MAX),
			normalize(xs.start_spped, START_SPPED_MIN, START_SPPED_MAX),
			xs.left_handed_pitcher		
		];

		return {xs : values, ys : ys.pitch_code}
	}

	// 훈련 데이터셋 불러오기
	const trainingData = tf.data.csv(TRAIN_DATA_PATH,{columnConfigs : {
		pitch_code : {isLabel : true}
	}}).map(csvTransform).shuffle(TRAIN_DATA_LENGTH).batch(100);

	// 훈련 검증 데이터셋 설정
	const trainingValidationData = tf.data.csv(TRAIN_DATA_PATH, {
		columnConfigs : {
			pitch_code : {isLabel : true}
		}
	}).map(csvTransform).batch(TRAIN_DATA_LENGTH);

	// 테스트 데이터셋 설정
	const testValidationData = tf.data.csv(TEST_DATA_PATH, {
		columnConfigs : {
			pitch_code : {isLabel : true}
		}
	}).map(csvTransform).batch(TEST_DATA_LENGTH);
}
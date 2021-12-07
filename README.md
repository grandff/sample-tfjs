# Node js and Express for REST API 표준 설정
### 기본 설치 순서
1. package 설정
    - npm init -y
2. 설정용 파일들
    - touch README.md
    - touch babel.config.json
    - touch .gitignore
    - touch nodemon.json
    - touch .env
3. install 
    - npm install @babel/core @babel/cli @babel/node @babel/preset-env -D
    - npm install express
    - npm install nodemon -D
    - npm install mysql
    - npm install dotenv
	- npm install @tensorflow/tfjs
	- npm install @tensorflow/tfjs-node
	- npm install @tensorflow/tfjs-vis
	- npm install axios
4. git 설정
    - git init
5. server 파일 추가 및 json 설정 


### MySQL 사용법

### Tensorflow.js - 2D 데이터 예측
1. 개발 전 정리 사항
	- 회귀 문제인지 분류 문제인지 구분하기
	- 지도 학습을 통해 수행하는지 비지도 학습을 통해 수행하는지 
	- 입력 데이터 모양과 출력 데이터 표시를 어떻게 할지
2. 데이터 준비
	- 수동으로 데이터를 정리하고 패턴 확인
	- 데이터 셔플링
	- 신경망에 합당한 범위로 데이터 정규화(보통 0~1 또는 -1 ~ 1)
	- 데이터를 텐서로 변환
3. 모델 빌드 및 실행
	- tf.sequential 또는 tf.model을 사용해 모델을 정의하고 tf.layers를 사용해 모델에 레이어 추가
	- 옵티마이저(일반적으로 adam), 매개변수를 설정
	- 손실합수를 설정(회귀는 대부분 meanSquaredError)
	- 손실이 감소하는지 학습 모니터링
4. 모델평가
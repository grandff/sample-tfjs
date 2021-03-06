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
	- yarn add argparse socket.io
	- yarn add csv-parser
	- yarn add morgan
	- yarn add helmet
	- yarn add cookie-parser
	- yarn add danfojs-node (client side의 경우 -node 빼고)
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

### Tensorflow.js - 투구 예측
### Tensorflow.js - boston 집값 예측
### Tensorflow.js - 중고차 가격 예측
- router로 express 분기 처리
- tf-vis html return 추가
- danfo.js 로 데이터 분석
- 입력값 받으면 그 값에 맞는 예측값 리턴


1. 데이터 로드
2. danfo js로 데이터 분석 시작
	- info or describe로 확인
	- data shape 확인 ?
	- null 값 확인
	- int to float 변경 ?? (memory use를 확인할 수 있는지 ?)
	- 각 컬럼별 최대 최소값 확인
	- 만약 결측치가 있으면 보간법 사용해서 처리 가능한지 ? 아니면 0으로
	- 데이터 분포도 확인이 가능한지?
	- 정규화
	- 날짜를 ymd hhmmss 로 다 나눠보기
	- 정규화를 분포가 큰 거를 하면 되는거 아닌가?
	- log1p 변환에 대해 다시한번 
	- 뭔가 데이터셋을 나눌 수 있는 기준이 있는지 확인해보기
	

git 확인
https://fomaios.tistory.com/entry/Git-Github-%EA%B0%99%EC%9D%80-%EC%A0%80%EC%9E%A5%EC%86%8C-%ED%95%A8%EA%BB%98-%EC%93%B0%EA%B8%B0feat%ED%98%91%EC%97%85%ED%95%98%EA%B8%B0
https://gist.github.com/Back-Tracking/519a0677cbcdbee8f39d11841083a2f1




이것도 정리 잘되어있음
https://github.com/StephenGrider/MLKits
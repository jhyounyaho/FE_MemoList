# javascript로 메모 만들기

### 1. 개발 환경
- HTML5
- Javascript
- CSS

### 2. library
jquery	3.5.1

### 3. 디렉토리     
    ├── css                         # css파일 저장 폴더     
    └── js                          # js파일 저장 푤더       
        ├── jquery-3.5.1.min.js     # jquery     
        ├── Memo.js                 # Memo class 로직이 있는 file      
        ├── MemoManage.js           # MemoManage class 로직이 있는 file      
        ├── DateInfo.js             # 자주 사용하는 date관련 함수 file  
        ├── ScreenInfo.js           # 자주 사용하는 screen관련 함수 file  
        └── memo_script.js          # memo.html에서 로드하는 스크립트 file      
    └── answer.html                     
    
### 4. 기능 
- 메모 하나의 class 
- 메모 내용, 위치, 크기, 사이즈, 쌓이는 순서 localStorage에 저장하여 리로드시 동일 결과 노출 
- 바탕 우클릭시 메모 생성 
- 메모 textarea 클릭시 입력, 수정
- 메모 X 클릭시 삭제 
- 메모 header 클릭시 드래그/드랍  
- 메모 btn_size 클릭시 리사이즈 

### 5. 결과 화면
![javascript_memo](https://user-images.githubusercontent.com/42309919/94541391-7fea5600-0282-11eb-95e4-81e6edfc5fcb.PNG)

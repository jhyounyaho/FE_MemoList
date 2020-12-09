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
개발시 자주 사용되는 부분을 소스의 통일감과 유지보수를 고려하여 
DateInfo.js, ScreenInfo.js 에서 따로 관리함
추후 date, screen 관련 작업시 해당 파일에서 필요한 부분만 import에서 사용
                             
### 4. localStorage에 들어갈 memo data                      
memo = {                              
        id: 'memo_1',                                      
        content: '메모 작성',                                        
        position: {                               
              top: 50,                                      
              left: 100                                
        },                                
        size: {                                
              width: 100,                            
              height: 200                                
        },                            
        order: 1,                              
        insert_date: '2020-10-06 22:04:57',                       
        update_date: '2020-10-06 23:05:57' 	                                  
  }                      
                                
insert_date, update_date                                    
=> 추후 DB에 메모 데이터 들어갈 경우를 고려하여 추가                       
   date형식에 맞춰 YYYY-MM-DD HH:MM:SS 으로 가공                      
                               
### 5. 기능 
- 메모 하나의 class 
- 메모 내용, 위치, 크기, 사이즈, 쌓이는 순서 localStorage에 저장하여 리로드시 동일 결과 노출 
- 바탕 우클릭시 메모 생성 
- 메모 textarea 클릭시 입력, 수정
- 메모 X 클릭시 삭제 
- 메모 header 클릭시 드래그/드랍  
- 메모 btn_size 클릭시 리사이즈 

### 6. 결과 화면
![memolist](https://user-images.githubusercontent.com/42309919/95349607-3ccf5900-08fa-11eb-8cee-530459df16c6.PNG)

import { getFormatDate } from "./DateInfo.js";

export default class MemoManage {
  constructor() {
    // localStorage에 있는 메모리스트
    this.storageMemoList = null;
  }

  /*
    init function
    MemoManage에서 관리하는 storageMemoList 데이터 초기화
  */
  init() {
    this.storageMemoList = localStorage.memolist;

    !this.storageMemoList
      ? (localStorage.memolist = JSON.stringify([]))
      : (this.storageMemoList = this.parsingMemoList());
  }

  /*
    findMemos function 
    메모 리스트 가져오는 function
    @return   array 메모 리스트 정보
  */
  findMemoList = () =>
    new Promise((resolve, reject) => {
      this.storageMemoList = this.parsingMemoList();
      if (this.storageMemoList) {
        resolve(this.storageMemoList);
      }
      reject(new Error("no find memolist"));
    });

  /*
    findMemo function
    한 개의 메모를 가져오는 function
    @data   id    : char 메모 고유값  
    @return array 1개 메모 정보 
  */
  findOneMemo = (id) =>
    new Promise((resolve, reject) => {
      this.storageMemoList = this.parsingMemoList();
      const findOneMemo = this.storageMemoList.find((memo) => memo.id === id);
      if (findOneMemo) {
        resolve(findOneMemo);
      }
      reject(new Error("no find memo"));
    });

  /*
    createMemo function
    메모 만드는 function 
    @data   memo : array 메모 정보   
  */
  createMemo = (memo) =>
    new Promise((resolve, reject) => {
      this.storageMemoList = this.parsingMemoList();
      memo.insert_date = getFormatDate("ymdhsc");
      this.storageMemoList.push(memo);
      localStorage.memolist = JSON.stringify(this.storageMemoList);
      resolve();
    });

  /*
    updateMemo function
    메모 수정 function 
    @data   memo : array 메모 정보   
  */
  updateMemo = (memo) =>
    new Promise((resolve, reject) => {
      this.storageMemoList = this.parsingMemoList();
      memo.update_date = getFormatDate("ymdhsc");
      const index = this.findIndexMemo(memo.id);
      this.storageMemoList[index] = memo;
      localStorage.memolist = JSON.stringify(this.storageMemoList);
      resolve();
    });

  /*
    removeMemo function
    메모 삭제 function
    @data   id : char 메모 고유값  
  */
  removeMemo = (id) =>
    new Promise((resolve, reject) => {
      this.storageMemoList = this.parsingMemoList();
      const removeMemoList = this.storageMemoList.filter(
        (memo) => memo.id !== id
      );
      localStorage.memolist = JSON.stringify(removeMemoList);
      resolve();
    });

  /*
    findHighestOrder function
    메모리스트의 데이터 중 가장 높은 순서를 가져오는 function 
    @return highestOrder  : int order 값  
  */
  findHighestOrder = () =>
    new Promise((resolve, reject) => {
      this.storageMemoList = this.parsingMemoList();
      let highestOrder = 0;
      if (this.storageMemoList.length !== 0) {
        highestOrder = Math.max.apply(
          Math,
          this.storageMemoList.map((memo) => memo.order)
        );
      }
      resolve(highestOrder);
    });

  /*
    findIndexMemo function
    메모의 인덱스를 가져오는 function 
    @data   id    : int 메모 고유값
    @return index : int index값 
  */
  findIndexMemo = (id) => {
    this.storageMemoList = this.parsingMemoList();
    return this.storageMemoList.findIndex((memo) => memo.id === id);
  };

  /*
    parsingMemoList function
    메모리스트를 localStorage에서 파싱하여 가져오는 function 
    @return   array 파싱된 localstorage.memolist 데이터 
  */
  parsingMemoList() {
    return localStorage.memolist ? JSON.parse(localStorage.memolist) : null;
  }
}

import Memo from "./Memo.js";
import MemoManage from "./MemoManage.js";

let memoManage;

document.addEventListener("DOMContentLoaded", () => {
  memoManage = new MemoManage();
  memoManage.init();
  makeMemoList();
  bindBackgroundEvent();
});

/*
  makeMemoList function 
  localStorage에 저장된 메모들 load하는 함수 
*/
const makeMemoList = () => {
  memoManage
    .findMemoList()
    .then((memolist) => {
      // html에 뿌려줌
      memolist.map((memo) => {
        return new Memo(
          memo.id,
          memo.content,
          memo.position,
          memo.size,
          memo.order
        );
      });
    })
    .catch((error) => {
      console.log("error ", error);
    });
};

/*
  bindBackgroundEvent function 
  event 관련 함수
*/
const bindBackgroundEvent = () => {
  // 메모 생성
  let wrap = document.getElementsByClassName("wrap")[0];
  wrap.addEventListener("contextmenu", setCreateMemo.bind(this), false);
};

/*
  setCreateMemo function
  바탕화면 우클릭시 메모 생성 이벤트  
*/
const setCreateMemo = (e) => {
  if (e.target !== e.currentTarget) return;
  e.preventDefault();

  memoManage
    .findHighestOrder()
    .then((order) => {
      // memo 생성
      const memo = new Memo(
        `memo_${order + 1}`,
        "",
        { top: e.pageY, left: e.pageX },
        { width: 200, height: 100 },
        order + 1
      );
      return memoManage.createMemo({
        id: memo.id,
        content: memo.content,
        position: memo.position,
        size: memo.size,
        order: memo.order,
      });
    })
    .catch((error) => {
      console.log("error ", error);
    });
};

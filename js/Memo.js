import MemoManage from "./MemoManage.js";
import { getInnerPositionX, getInnerPositionY } from "./ScreenInfo.js";

export default class Memo {
  constructor(id, content, position, size, order) {
    this.id = id; // 고유값
    this.content = content; // 내용
    this.position = position; // 위치 - 드래그시 필요
    this.size = size; // 사이즈 - 리사이즈시 필요
    this.order = order; // 노출 순서

    this.memoManage = new MemoManage();

    // drag
    this.dragger = null;
    this.drag_area = null;
    this.startDragX = 0;
    this.startDragY = 0;
    this.holder = null;

    // resize
    this.resizer = null;
    this.resize_area = null;
    this.startResizeX = 0;
    this.startResizeY = 0;
    this.startResizeWidth = 0;
    this.startResizeHeight = 0;
    this.resizeToggle = false;

    this.createDOM();
  }

  /*
    createDOM function
    메모 DOM 생성 및 이벤트 function 호출  
  */
  createDOM() {
    $(".wrap").append(`
			<div id="${this.id}"
			 		 class="memo"
			 		 style="top:${this.position.top}px; left:${this.position.left}px; z-index:${this.order}">
	      <div class="header">
	        <h1 class="blind">메모장</h1>
	        <button class="btn_close"><span class="blind">닫기</span></button>
	      </div>
	      <div class="content">
	        <div class="textarea"
	        		contenteditable="true"
	        		style="width:${this.size.width}px; height:${this.size.height}px;">${this.content}</div>
	      </div>
	      <button class="btn_size"><span class="blind">메모장 크기 조절</span></button>
	    </div>
    `);
    this.bindMemoEvent();
  }

  /*
    bindMemoEvent function
    event 관련 함수 
  */
  bindMemoEvent() {
    // input event
    const input_area = document.querySelector(`#${this.id} .content .textarea`);
    input_area.addEventListener("keyup", this.inputEvent.bind(this), false);
    input_area.addEventListener(
      "click",
      this.setHighestOrder.bind(this),
      false
    );

    // remove evnet
    const remove_area = document.querySelector(
      `#${this.id} .header .btn_close`
    );
    remove_area.addEventListener("click", this.removeEvent.bind(this), false);

    // drag event
    this.dragger = document.querySelector(`#${this.id} .header`);
    this.dragger.addEventListener("mousedown", this.initDrag.bind(this), false);
    this.holder = document.querySelector(".wrap");
    this.holder.addEventListener("dragover", this.dragOver.bind(this), false);
    this.holder.addEventListener("dragenter", this.dragEnter.bind(this), false);
    this.holder.addEventListener("drop", this.drop.bind(this), false);

    // resize event
    this.resizer = document.querySelector(`#${this.id} .btn_size`);
    this.resizer.addEventListener(
      "mousedown",
      this.initResize.bind(this),
      false
    );
  }

  /*
    inputEvent function
    .textarea에 텍스트가 입력될때마다 content에 저장됨 
  */
  inputEvent = (e) => {
    this.memoManage
      .findOneMemo(this.id)
      .then((memo) => {
        memo.content = e.target.innerHTML;
        return this.memoManage.updateMemo(memo);
      })
      .catch((error) => {
        console.log("error ", error);
      });
  };

  /*
    removeEvent function
    메모 삭제버튼 누를시 닫기/삭제 이벤트 
  */
  removeEvent = () => {
    this.memoManage
      .removeMemo(this.id)
      .then(() => {
        $(`#${this.id}`).remove();
      })
      .catch((error) => {
        console.log("error ", error);
      });
  };

  /*
    initDrag function
    메모 헤더 클릭시 이벤트 함수
    HTML drag and drop API 
  */
  initDrag = (e) => {
    // header 클릭시만 드래그 가능
    if (e.target.className !== "header") return;
    this.drag_area = document.querySelector(`#${this.id}`);
    // draggable 요소의 드래그 가능 여부 true-할수있음, false-할수없음
    this.drag_area.setAttribute("draggable", true);

    this.drag_area.addEventListener(
      "dragstart",
      this.dragStart.bind(this),
      false
    );
    this.drag_area.addEventListener("dragend", this.dragEnd.bind(this), false);
  };

  /*
    dragStart function
    메모 드래그 시작할때 발생 함수 
    @return   boolean 
  */
  dragStart = (e) => {
    // 전체 문서를 기준으로 x,y 좌표 반환. 스크롤 화면을 포함해서 측정
    this.startDragX = e.pageX - this.drag_area.offsetLeft;
    this.startDragY = e.pageY - this.drag_area.offsetTop;
    return true;
  };

  /*
    dragEnter function
    드래그한 메모가 드롭 대상 위에 처음 올라갔을때 발생 함수
  */
  dragEnter = (e) => {
    e.preventDefault();
    return true;
  };

  /*
    dragOver function
    드래그한 메모가 드롭 대상 위로 지나갈때 발생 함수 
    (매 수백 밀리초마다 발생 )
  */
  dragOver = (e) => {
    e.preventDefault();
  };

  /*
    drop function
    드래그한 메모를 드롭 대상에 drop했을때 발생 함수
  */
  drop = (e) => {
    e.preventDefault();
    return false;
  };

  /*
    dragEnd function
    메모 드래그 종료 함수 
  */
  dragEnd = (e) => {
    // 화면내 값 체크
    const calX = getInnerPositionX(
      e.pageX - this.startDragX,
      this.drag_area.offsetWidth
    );
    const calY = getInnerPositionY(
      e.pageY - this.startDragY,
      this.drag_area.offsetHeight
    );

    this.memoManage
      .findOneMemo(this.id)
      .then((memo) => {
        // localStorage update
        memo.position = {
          left: calX,
          top: calY,
        };
        return this.memoManage.updateMemo(memo);
      })
      .then(() => {
        // html update
        this.drag_area.style.left = `${calX}px`;
        this.drag_area.style.top = `${calY}px`;
        this.drag_area.setAttribute("draggable", false);
        this.setHighestOrder();
      })
      .catch((error) => {
        console.log("error ", error);
      })
      .finally(() => {
        // drag 불가능 상태 변경
        this.drag_area.setAttribute("draggable", false);
      });
  };

  /*
    initResize function
    메모 하단 btn_size 클릭시 이벤트 함수
  */
  initResize = (e) => {
    this.resize_area = document.querySelector(`#${this.id} .content .textarea`);

    // 현재 보이는 브라우저 화면 기준 영역 내의 가로, 세로 좌표
    this.startResizeX = e.clientX;
    this.startResizeY = e.clientY;

    // 리사이즈시 메모 크기 char > int
    this.startResizeWidth = parseInt(
      document.defaultView.getComputedStyle(this.resize_area).width,
      10
    );
    this.startResizeHeight = parseInt(
      document.defaultView.getComputedStyle(this.resize_area).height,
      10
    );

    document.documentElement.addEventListener(
      "mousemove",
      this.resizeStart.bind(this),
      false
    );
    document.documentElement.addEventListener(
      "mouseup",
      this.resizeEnd.bind(this),
      false
    );
    this.resizeToggle = true;
  };

  /*
    resizeStart function
    메모 하단 btn_size 마우스이동시 이벤트 함수
  */
  resizeStart = (e) => {
    if (this.resizeToggle) {
      const calX = this.startResizeWidth + e.clientX - this.startResizeX;
      const calY = this.startResizeHeight + e.clientY - this.startResizeY;

      this.memoManage
        .findOneMemo(this.id)
        .then((memo) => {
          // localStorage update
          memo.size = {
            width: calX,
            height: calY,
          };
          return this.memoManage.updateMemo(memo);
        })
        .then(() => {
          // html update
          this.resize_area.style.width = `${calX}px`;
          this.resize_area.style.height = `${calY}px`;
        })
        .catch((error) => {
          console.log("error ", error);
        });
    }
  };

  /*
    resizeEnd function
    메모 하단 btn_size mouseup 이벤트 함수
  */
  resizeEnd = (e) => {
    this.resizeToggle = false;
    document.documentElement.removeEventListener(
      "mousemove",
      this.resizeStart.bind(this),
      false
    );
    document.documentElement.removeEventListener(
      "mouseup",
      this.resizeEnd.bind(this),
      false
    );
  };

  /*
    setHighestOrder function
    현재 memo의 z-index를 최상위로 끌어올리는 함수
  */
  setHighestOrder() {
    let promises = [
      this.memoManage.findOneMemo(this.id),
      this.memoManage.findHighestOrder(),
    ];
    Promise.all(promises)
      .then((results) => {
        // localStorage update
        results[0].order = results[1] + 1; // order 최댓값
        return [this.memoManage.updateMemo(results[0]), results[1]];
      })
      .then((results) => {
        // html update
        this.order = results[1] + 1;
        $(`#${this.id}`).css({ "z-index": this.order });
      })
      .catch((error) => {
        console.log("error ", error);
      });
  }
}

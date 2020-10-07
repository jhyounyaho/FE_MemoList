/*
  브라우저/스크린 사이즈 관련하여 공통적으로 사용되는 부분을 여기에 추가해주세요
  => screen 관련 작업시 해당 파일에서 필요한 부분만 import에서 사용
  // 개발시 자주 사용되는 부분을 소스의 통일감과 유지보수 고려 
*/

/*
  getInnerPositionX function
  브라우저 안쪽에서만 dragndrop 이 가능 하도록 x값 추출 
  @data   x           : int x값 
          offsetwidth : int width값  
  @return x           : int x값 
*/
export const getInnerPositionX = (x, offsetwidth) => {
  const screenSize = getScreenSize();

  if (x < 0) return 0;
  else if (x > screenSize.width) return screenSize.width;
  else {
    return x + offsetwidth > screenSize.width
      ? screenSize.width - offsetwidth
      : x;
  }
};

/*
  getInnerPositionY function
  브라우저 안쪽에서만 dragndrop 이 가능 하도록 y값 추출 
  @data   y           : int y값 
          offsetheight: int height값  
  @return y           : int y값 
*/
export const getInnerPositionY = (y, offsetheight) => {
  const screenSize = getScreenSize();

  if (y < 0) return 0;
  else if (y > screenSize.height) return screenSize.height;
  else {
    return y + offsetheight > screenSize.height
      ? screenSize.height - offsetheight
      : y;
  }
};

/*
  getScreenSize function
  스크린 사이즈 구하는 함수 
  @return screenSize  : array width, height 값   
*/
export const getScreenSize = () => {
  let screenSize;
  let w = window,
    d = document,
    e = d.documentElement,
    b = d.getElementsByTagName("body")[0],
    x = w.innerWidth || e.clientWidth || b.clientWidth,
    y = w.innerHeight || e.clientHeight || b.clientHeight;
  screenSize = { width: x, height: y };
  return screenSize;
};

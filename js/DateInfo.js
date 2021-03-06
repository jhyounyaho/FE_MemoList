/*
  시간 관련하여 공통적으로 사용되는 부분을 여기에 추가해주세요
  => date 관련 작업시 해당 파일에서 필요한 부분만 import에서 사용
  // 개발시 자주 사용되는 부분을 소스의 통일감과 유지보수 고려 
*/

/*
  getFromatDate function
  date 가공하는 function
  @data   date_case   : char date 포맷 유형
  @return date_format : char date 포맷 결과 
*/
export const getFormatDate = (date_case) => {
  const date_info = new Date();
  const year = date_info.getFullYear();
  const month = ("0" + (date_info.getMonth() + 1)).slice(-2);
  const date = ("0" + date_info.getDate()).slice(-2);
  const hours = ("0" + date_info.getHours()).slice(-2);
  const minutes = ("0" + date_info.getMinutes()).slice(-2);
  const seconds = ("0" + date_info.getSeconds()).slice(-2);
  let date_format = "";

  // 필요에 따라 case 추가
  switch (date_case) {
    case "ymdhsc":
      date_format = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
      break;
    default:
      console.log("date_case chk!");
  }

  return date_format;
};

const moment = require("moment");

/* YYYY-MM-DD 가 주어지면 Y년도 M월 W주차를 구하는 예제코드 */

const dayOfWeek = (num) => {
  switch (num) {
    case 0:
      return "일";
    case 1:
      return "월";
    case 2:
      return "화";
    case 3:
      return "수";
    case 4:
      return "목";
    case 5:
      return "금";
    case 6:
      return "토";
    default:
      break;
  }
};

const getYear_Month_Week = (str) => {
  // str 형식은 YYYY-MM-DD
  const now = moment(str);
  const firstDayOfMonth = moment(str).startOf("month");
  const firstDayOfWeek = moment(str).startOf("isoweek");
  const lastDayOfWeek = moment(str).endOf("isoweek");
  let year = firstDayOfWeek.get("year");
  let month = 0;
  let week = 0;
  // 달이 바뀔 때
  if (firstDayOfWeek.get("month") !== lastDayOfWeek.get("month")) {
    // 바뀌는 달의 1일
    const firstDayOfNextMonth = moment(
      lastDayOfWeek.format("YYYY-MM-DD")
    ).startOf("month");
    // 1일이 월~목 사이일 때
    if (
      1 <= firstDayOfNextMonth.get("day") &&
      firstDayOfNextMonth.get("day") <= 4
    ) {
      month = lastDayOfWeek.get("month") + 1;
      week = 1;
    } else {
      month = firstDayOfWeek.get("month") + 1;
      week =
        getYear_Month_Week(now.add(-7, "days").format("YYYY-MM-DD")).week + 1;
    }
  }
  // 달이 안바뀔 때
  else {
    week = now.get("isoweek") - firstDayOfMonth.get("isoweek");
    // 1월 초가 (ISO 표준) 12월 5주차일때
    if (week < 0) {
      // year = firstDayOfWeek.get("year");
      week = now.get("isoweek");
    }

    // 해당 달의 1일이 월~목 사이일 때
    if (1 <= firstDayOfMonth.get("day") && firstDayOfMonth.get("day") <= 4)
      week++;
    month = now.get("month") + 1;
  }
  return { year: year, month: month, week: week };
};

const cal = (m) => {
  const Year_Month_Week = getYear_Month_Week(m.format("YYYY-MM-DD"));
  const year = Year_Month_Week.year;
  const month = Year_Month_Week.month;
  const week = Year_Month_Week.week;

  console.log(
    m.format("YYYY-MM-DD"),
    dayOfWeek(m.get("day")),
    "/",
    year + "년도",
    month + "월",
    week + "주차"
  );
};

for (let i = 0; i < 2500; i++) {
  const startDate = moment("2021-06-15");
  cal(startDate.add(i, "days"));
}

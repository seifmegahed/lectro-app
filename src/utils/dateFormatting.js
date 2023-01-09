// returns date in MMM dd, yyyy format
export function getFormatedDate(val) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  
  let date = 0;
  !!val.nanoseconds
    ? (date = new Date(val.seconds * 1000))
    : (date = new Date(val));

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const formatedDate = month + " " + day + ", " + year;
  return formatedDate;
}

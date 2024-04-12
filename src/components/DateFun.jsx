const DateFun = (data) => {
  const hours =
    data && data.toDate().getHours() < 10
      ? "0" + data.toDate().getHours()
      : data.toDate().getHours();
  const minutes =
    data && data.toDate().getMinutes() !== 0
      ? data.toDate().getMinutes() < 10
        ? "0" + data.toDate().getMinutes()
        : data.toDate().getMinutes()
      : data.toDate().getMinutes() + "0";
  return hours + ":" + minutes;
};

export default DateFun;

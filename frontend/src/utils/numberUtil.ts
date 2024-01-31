export const addCommaInNumber = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatTime = (number: number) => {
  const minutes = Math.floor(number / 60);
  const seconds = number % 60;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : String(minutes);
  const formattedSeconds = seconds < 10 ? `0${seconds}` : String(seconds);

  return `${formattedMinutes}:${formattedSeconds}`;
};

export const formatDate = (date: string) => {
  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);

  const formattedDate = year + '.' + month + '.' + day;

  return formattedDate;
};

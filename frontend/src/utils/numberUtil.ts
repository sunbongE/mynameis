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

export const calcAge = (data: string) => {
  const birthYear = parseInt(data.substring(0, 4));

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return currentYear - birthYear + 1;
};

export const getSessionId = (data: string) => {
  const urlParams = new URLSearchParams(data.split('?')[1]);
  const sessionId = urlParams.get('sessionId');
  console.log(sessionId);
  return sessionId;
};

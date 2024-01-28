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

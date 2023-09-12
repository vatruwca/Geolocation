export default function getTime(time) {
  const date = time.substring(8, 10);
  const month = time.substring(4, 7);
  const year = time.substring(11, 15);
  const hours = time.substring(16, 18);
  const minutes = time.substring(19, 21);
  const seconds = time.substring(22, 24);
  return `${date} ${month} ${year} ${hours}:${minutes}:${seconds}`;
}

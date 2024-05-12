export default function parseDuration(duration: string): string {
  const convertedDuration: number = parseFloat(duration);

  const seconds = Math.floor(convertedDuration % 60);
  const minute = Math.floor(convertedDuration / 60);

  return `${minute}:${(seconds < 10 ? "0" : "") + seconds}`;
}

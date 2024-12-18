export interface TimeResult {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  formattedTime: string;
}

export interface TimeDifferenceResult extends TimeResult {
  isNegative: boolean;
}

export function parseTime(timeStr: string): TimeResult {
  const [hours, minutes, seconds] = timeStr.split(':').map(Number);
  const totalSeconds = hours * 3600 + minutes * 60 + (seconds || 0);
  
  return {
    hours,
    minutes,
    seconds: seconds || 0,
    totalSeconds,
    formattedTime: formatTime(hours, minutes, seconds || 0)
  };
}

export function formatTime(hours: number, minutes: number, seconds: number): string {
  const pad = (num: number) => num.toString().padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function calculateTimeDifference(
  time1: string,
  time2: string
): TimeDifferenceResult {
  const t1 = parseTime(time1);
  const t2 = parseTime(time2);
  
  let diffSeconds = t2.totalSeconds - t1.totalSeconds;
  const isNegative = diffSeconds < 0;
  
  diffSeconds = Math.abs(diffSeconds);
  const hours = Math.floor(diffSeconds / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);
  const seconds = diffSeconds % 60;
  
  return {
    hours,
    minutes,
    seconds,
    totalSeconds: diffSeconds,
    formattedTime: formatTime(hours, minutes, seconds),
    isNegative
  };
}

export function addTimes(time1: string, time2: string): TimeResult {
  const t1 = parseTime(time1);
  const t2 = parseTime(time2);
  
  let totalSeconds = t1.totalSeconds + t2.totalSeconds;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return {
    hours,
    minutes,
    seconds,
    totalSeconds,
    formattedTime: formatTime(hours, minutes, seconds)
  };
}

export function subtractTimes(time1: string, time2: string): TimeResult {
  const t1 = parseTime(time1);
  const t2 = parseTime(time2);
  
  let totalSeconds = t1.totalSeconds - t2.totalSeconds;
  if (totalSeconds < 0) totalSeconds += 24 * 3600; // Wrap around to previous day
  
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return {
    hours,
    minutes,
    seconds,
    totalSeconds,
    formattedTime: formatTime(hours, minutes, seconds)
  };
}

export function convertTimeZone(
  time: string,
  fromOffset: number,
  toOffset: number
): TimeResult {
  const t = parseTime(time);
  const diffHours = toOffset - fromOffset;
  
  let totalSeconds = t.totalSeconds + (diffHours * 3600);
  if (totalSeconds < 0) totalSeconds += 24 * 3600;
  if (totalSeconds >= 24 * 3600) totalSeconds -= 24 * 3600;
  
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return {
    hours,
    minutes,
    seconds,
    totalSeconds,
    formattedTime: formatTime(hours, minutes, seconds)
  };
}
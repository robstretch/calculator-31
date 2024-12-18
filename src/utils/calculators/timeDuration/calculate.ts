import { TimeDurationInput, TimeDurationResult } from './types';

function parseTime(timeStr: string): number {
  const [hours, minutes, seconds = '0'] = timeStr.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  const parts = [];
  if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
  if (secs > 0) parts.push(`${secs} second${secs !== 1 ? 's' : ''}`);
  
  return parts.join(' ');
}

function secondsToHMS(totalSeconds: number): { hours: number; minutes: number; seconds: number; } {
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60
  };
}

export function calculateTimeDuration(input: TimeDurationInput): TimeDurationResult {
  const startSeconds = parseTime(input.startTime);
  const endSeconds = parseTime(input.endTime);
  
  let totalSeconds = endSeconds - startSeconds;
  if (totalSeconds < 0) totalSeconds += 24 * 3600; // Handle overnight duration
  
  let breakSeconds = 0;
  const segments = [{
    type: 'Work',
    start: input.startTime,
    end: input.endTime,
    duration: formatDuration(totalSeconds)
  }];

  // Calculate break time if applicable
  if (input.excludeBreaks && input.breaks?.length) {
    input.breaks.forEach(breakPeriod => {
      const breakStart = parseTime(breakPeriod.start);
      const breakEnd = parseTime(breakPeriod.end);
      let breakDuration = breakEnd - breakStart;
      if (breakDuration < 0) breakDuration += 24 * 3600;
      
      breakSeconds += breakDuration;
      segments.push({
        type: 'Break',
        start: breakPeriod.start,
        end: breakPeriod.end,
        duration: formatDuration(breakDuration)
      });
    });
    
    totalSeconds -= breakSeconds;
  }

  const duration = secondsToHMS(totalSeconds);
  const breakTime = breakSeconds > 0 ? secondsToHMS(breakSeconds) : undefined;

  const analysis = [
    {
      category: 'Total Duration',
      value: formatDuration(totalSeconds),
      description: 'Net time excluding breaks'
    },
    {
      category: 'Break Time',
      value: breakTime ? formatDuration(breakSeconds) : 'None',
      description: 'Total time spent on breaks'
    },
    {
      category: 'Percentage Active',
      value: `${Math.round((totalSeconds / (totalSeconds + breakSeconds)) * 100)}%`,
      description: 'Percentage of time excluding breaks'
    }
  ];

  return {
    duration,
    totalSeconds,
    breakTime,
    formattedDuration: formatDuration(totalSeconds),
    segments,
    analysis
  };
}
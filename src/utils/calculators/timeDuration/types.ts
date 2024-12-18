export interface TimeDurationInput {
  startTime: string;
  endTime: string;
  excludeBreaks?: boolean;
  breaks?: { start: string; end: string; }[];
}

export interface TimeDurationResult {
  duration: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  totalSeconds: number;
  breakTime?: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  formattedDuration: string;
  segments: {
    type: string;
    start: string;
    end: string;
    duration: string;
  }[];
  analysis: {
    category: string;
    value: string;
    description: string;
  }[];
}
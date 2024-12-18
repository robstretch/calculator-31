import { DownloadTimeInput, DownloadTimeResult } from './types';

const UNIT_MULTIPLIERS = {
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
  TB: 1024 * 1024 * 1024 * 1024,
  Kbps: 1000,
  Mbps: 1000 * 1000,
  Gbps: 1000 * 1000 * 1000
};

function convertToBytes(size: number, unit: 'KB' | 'MB' | 'GB' | 'TB'): number {
  return size * UNIT_MULTIPLIERS[unit];
}

function convertToBitsPerSecond(speed: number, unit: 'Kbps' | 'Mbps' | 'Gbps'): number {
  return speed * UNIT_MULTIPLIERS[unit];
}

function calculateTime(bytes: number, bitsPerSecond: number): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const bits = bytes * 8;
  let totalSeconds = bits / bitsPerSecond;

  const days = Math.floor(totalSeconds / (24 * 3600));
  totalSeconds %= (24 * 3600);
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);

  return { days, hours, minutes, seconds };
}

export function calculateDownloadTime(input: DownloadTimeInput): DownloadTimeResult {
  // Convert file size to bytes
  const bytes = convertToBytes(input.fileSize, input.sizeUnit);
  
  // Convert speed to bits per second
  const bitsPerSecond = convertToBitsPerSecond(input.speed, input.speedUnit);
  
  // Calculate download time
  const time = calculateTime(bytes, bitsPerSecond);

  // Calculate size conversions
  const conversions = {
    size: {
      bytes,
      kilobytes: bytes / 1024,
      megabytes: bytes / (1024 * 1024),
      gigabytes: bytes / (1024 * 1024 * 1024)
    },
    speed: {
      bitsPerSecond,
      kiloBitsPerSecond: bitsPerSecond / 1000,
      megaBitsPerSecond: bitsPerSecond / (1000 * 1000)
    }
  };

  // Common file type estimates
  const estimates = [
    {
      type: 'Song (MP3)',
      size: '5 MB',
      time: calculateTime(5 * 1024 * 1024, bitsPerSecond)
    },
    {
      type: 'Movie (HD)',
      size: '4 GB',
      time: calculateTime(4 * 1024 * 1024 * 1024, bitsPerSecond)
    },
    {
      type: 'Photo',
      size: '2 MB',
      time: calculateTime(2 * 1024 * 1024, bitsPerSecond)
    }
  ].map(est => ({
    type: est.type,
    size: est.size,
    time: `${est.time.hours}h ${est.time.minutes}m ${est.time.seconds}s`
  }));

  const recommendations = [
    {
      category: 'Connection',
      suggestion: conversions.speed.megaBitsPerSecond < 10 ?
        'Consider upgrading internet speed for faster downloads' :
        'Connection speed is good for most downloads'
    },
    {
      category: 'Optimization',
      suggestion: 'Use download managers for large files'
    },
    {
      category: 'Time Management',
      suggestion: time.hours > 2 ?
        'Schedule long downloads during off-peak hours' :
        'Download time is reasonable'
    },
    {
      category: 'Alternative Sources',
      suggestion: 'Check for mirror sites or CDNs for faster downloads'
    }
  ];

  return {
    time,
    conversions,
    estimates,
    recommendations
  };
}
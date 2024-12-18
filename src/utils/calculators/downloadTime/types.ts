export interface DownloadTimeInput {
  fileSize: number;
  sizeUnit: 'KB' | 'MB' | 'GB' | 'TB';
  speed: number;
  speedUnit: 'Kbps' | 'Mbps' | 'Gbps';
}

export interface DownloadTimeResult {
  time: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  conversions: {
    size: {
      bytes: number;
      kilobytes: number;
      megabytes: number;
      gigabytes: number;
    };
    speed: {
      bitsPerSecond: number;
      kiloBitsPerSecond: number;
      megaBitsPerSecond: number;
    };
  };
  estimates: {
    type: string;
    size: string;
    time: string;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}
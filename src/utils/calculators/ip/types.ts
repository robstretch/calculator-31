export interface IPInput {
  ipAddress: string;
  cidr?: number;
  subnetMask?: string;
}

export interface IPResult {
  networkAddress: string;
  broadcastAddress: string;
  firstHost: string;
  lastHost: string;
  subnetMask: string;
  wildcardMask: string;
  totalHosts: number;
  usableHosts: number;
  ipClass: string;
  binary: {
    ipAddress: string;
    subnetMask: string;
    networkAddress: string;
    broadcastAddress: string;
  };
  ranges: {
    type: string;
    start: string;
    end: string;
  }[];
}
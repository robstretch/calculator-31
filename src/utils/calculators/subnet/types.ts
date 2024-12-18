export interface SubnetInput {
  ipAddress: string;
  cidr: number;
  requiredSubnets?: number;
  hostsPerSubnet?: number;
}

export interface SubnetResult {
  networkAddress: string;
  broadcastAddress: string;
  subnetMask: string;
  wildcardMask: string;
  firstHost: string;
  lastHost: string;
  totalHosts: number;
  usableHosts: number;
  subnetInfo: {
    networkClass: string;
    subnetBits: number;
    hostBits: number;
    maxSubnets: number;
  };
  subnets?: SubnetRange[];
}

export interface SubnetRange {
  networkAddress: string;
  broadcastAddress: string;
  firstHost: string;
  lastHost: string;
  usableHosts: number;
}
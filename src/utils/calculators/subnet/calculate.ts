import { SubnetInput, SubnetResult } from './types';
import { ipToNumber, numberToIp, getNetworkClass, getDefaultClassBits } from './ipUtils';
import { calculateSubnetRanges } from './subnetRange';

export function calculateSubnet(input: SubnetInput): SubnetResult {
  // Calculate basic network information
  const ipNum = ipToNumber(input.ipAddress);
  const mask = (~0 << (32 - input.cidr)) >>> 0;
  const networkNum = ipNum & mask;
  const broadcastNum = networkNum | (~mask);
  
  // Calculate addresses
  const networkAddress = numberToIp(networkNum);
  const broadcastAddress = numberToIp(broadcastNum);
  const subnetMask = numberToIp(mask);
  const wildcardMask = numberToIp(~mask);
  const firstHost = numberToIp(networkNum + 1);
  const lastHost = numberToIp(broadcastNum - 1);
  
  // Calculate host ranges
  const totalHosts = Math.pow(2, 32 - input.cidr);
  const usableHosts = Math.max(0, totalHosts - 2);

  // Calculate subnet information
  const networkClass = getNetworkClass(input.ipAddress);
  const defaultClassBits = getDefaultClassBits(networkClass);
  const subnetBits = input.cidr - defaultClassBits;
  const hostBits = 32 - input.cidr;
  const maxSubnets = Math.pow(2, subnetBits);

  // Calculate subnet ranges if requested
  let subnets;
  if (input.requiredSubnets || input.hostsPerSubnet) {
    const subnetCount = input.requiredSubnets || 
      Math.ceil(Math.log2(input.hostsPerSubnet! + 2));
    
    subnets = calculateSubnetRanges(
      networkNum,
      usableHosts,
      Math.min(subnetCount, maxSubnets)
    );
  }

  return {
    networkAddress,
    broadcastAddress,
    subnetMask,
    wildcardMask,
    firstHost,
    lastHost,
    totalHosts,
    usableHosts,
    subnetInfo: {
      networkClass,
      subnetBits,
      hostBits,
      maxSubnets
    },
    subnets
  };
}
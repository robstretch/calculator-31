import { SubnetRange } from './types';
import { numberToIp } from './ipUtils';

export function calculateSubnetRanges(
  networkNum: number,
  usableHosts: number,
  subnetCount: number
): SubnetRange[] {
  return Array.from({ length: subnetCount }, (_, i) => {
    const subnetSize = usableHosts / subnetCount;
    const subNetworkNum = networkNum + (i * (subnetSize + 2));
    const subBroadcastNum = subNetworkNum + subnetSize + 1;
    
    return {
      networkAddress: numberToIp(subNetworkNum),
      broadcastAddress: numberToIp(subBroadcastNum),
      firstHost: numberToIp(subNetworkNum + 1),
      lastHost: numberToIp(subBroadcastNum - 1),
      usableHosts: subnetSize
    };
  });
}
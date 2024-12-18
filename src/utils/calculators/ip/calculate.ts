import { IPInput, IPResult } from './types';

function ipToBinary(ip: string): string {
  return ip.split('.')
    .map(octet => parseInt(octet).toString(2).padStart(8, '0'))
    .join('');
}

function binaryToIp(binary: string): string {
  return binary.match(/.{8}/g)!
    .map(byte => parseInt(byte, 2))
    .join('.');
}

function getIpClass(firstOctet: number): string {
  if (firstOctet < 128) return 'A';
  if (firstOctet < 192) return 'B';
  if (firstOctet < 224) return 'C';
  if (firstOctet < 240) return 'D';
  return 'E';
}

function cidrToSubnetMask(cidr: number): string {
  const binary = '1'.repeat(cidr) + '0'.repeat(32 - cidr);
  return binaryToIp(binary);
}

function subnetMaskToCidr(subnetMask: string): number {
  return ipToBinary(subnetMask).split('1').length - 1;
}

export function calculateIP(input: IPInput): IPResult {
  // Convert IP to binary
  const ipBinary = ipToBinary(input.ipAddress);
  
  // Determine CIDR and subnet mask
  let cidr: number;
  let subnetMask: string;
  if (input.cidr) {
    cidr = input.cidr;
    subnetMask = cidrToSubnetMask(cidr);
  } else if (input.subnetMask) {
    subnetMask = input.subnetMask;
    cidr = subnetMaskToCidr(subnetMask);
  } else {
    // Default to class-based mask
    const firstOctet = parseInt(input.ipAddress.split('.')[0]);
    const ipClass = getIpClass(firstOctet);
    cidr = ipClass === 'A' ? 8 : ipClass === 'B' ? 16 : 24;
    subnetMask = cidrToSubnetMask(cidr);
  }

  // Calculate network and broadcast addresses
  const subnetBinary = ipToBinary(subnetMask);
  const networkBinary = ipBinary.split('')
    .map((bit, i) => bit === '1' && subnetBinary[i] === '1' ? '1' : '0')
    .join('');
  
  const broadcastBinary = networkBinary.split('')
    .map((bit, i) => subnetBinary[i] === '1' ? bit : '1')
    .join('');

  const networkAddress = binaryToIp(networkBinary);
  const broadcastAddress = binaryToIp(broadcastBinary);

  // Calculate first and last host
  const hostBits = 32 - cidr;
  const totalHosts = Math.pow(2, hostBits);
  const usableHosts = Math.max(0, totalHosts - 2);

  const networkParts = networkAddress.split('.').map(Number);
  const broadcastParts = broadcastAddress.split('.').map(Number);

  const firstHost = usableHosts > 0 ? 
    [...networkParts.slice(0, -1), networkParts[3] + 1].join('.') :
    networkAddress;

  const lastHost = usableHosts > 0 ?
    [...broadcastParts.slice(0, -1), broadcastParts[3] - 1].join('.') :
    broadcastAddress;

  // Calculate wildcard mask
  const wildcardMask = subnetMask.split('.')
    .map(octet => 255 - parseInt(octet))
    .join('.');

  return {
    networkAddress,
    broadcastAddress,
    firstHost,
    lastHost,
    subnetMask,
    wildcardMask,
    totalHosts,
    usableHosts,
    ipClass: getIpClass(parseInt(input.ipAddress.split('.')[0])),
    binary: {
      ipAddress: ipBinary,
      subnetMask: subnetBinary,
      networkAddress: networkBinary,
      broadcastAddress: broadcastBinary
    },
    ranges: [
      {
        type: 'Network',
        start: networkAddress,
        end: firstHost
      },
      {
        type: 'Usable Hosts',
        start: firstHost,
        end: lastHost
      },
      {
        type: 'Broadcast',
        start: lastHost,
        end: broadcastAddress
      }
    ]
  };
}
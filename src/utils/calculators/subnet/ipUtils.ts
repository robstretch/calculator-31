export function ipToNumber(ip: string): number {
  return ip.split('.')
    .reduce((sum, octet) => (sum << 8) + parseInt(octet), 0) >>> 0;
}

export function numberToIp(num: number): string {
  return [
    (num >>> 24) & 255,
    (num >>> 16) & 255,
    (num >>> 8) & 255,
    num & 255
  ].join('.');
}

export function getNetworkClass(ip: string): string {
  const firstOctet = parseInt(ip.split('.')[0]);
  if (firstOctet < 128) return 'A';
  if (firstOctet < 192) return 'B';
  if (firstOctet < 224) return 'C';
  if (firstOctet < 240) return 'D';
  return 'E';
}

export function getDefaultClassBits(networkClass: string): number {
  switch (networkClass) {
    case 'A': return 8;
    case 'B': return 16;
    case 'C': return 24;
    default: return 24;
  }
}
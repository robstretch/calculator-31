import React, { useState } from 'react';
import { Network } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { calculateIP } from '../../utils/calculators/ip/calculate';

export function IPCalculator() {
  const [ipAddress, setIpAddress] = useState('192.168.1.1');
  const [cidr, setCidr] = useState('24');
  const [useSubnetMask, setUseSubnetMask] = useState(false);
  const [subnetMask, setSubnetMask] = useState('255.255.255.0');

  const result = calculateIP({
    ipAddress,
    ...(useSubnetMask ? { subnetMask } : { cidr: parseInt(cidr) })
  });

  return (
    <>
      <SEO 
        title="IP Calculator | Network Address & Subnet Calculator"
        description="Calculate IP network address, subnet mask, broadcast address, and host ranges with our comprehensive IP calculator."
        keywords={[
          'ip calculator',
          'subnet calculator',
          'network calculator',
          'cidr calculator',
          'ip address calculator'
        ]}
      />

      <CalculatorLayout
        title="IP Calculator"
        description="Calculate network address, subnet mask, and host ranges for IPv4 addresses"
        icon={<Network />}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">IP Address</label>
              <input
                type="text"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="192.168.1.1"
              />
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={useSubnetMask}
                  onChange={(e) => setUseSubnetMask(e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">Use Subnet Mask</span>
              </label>
            </div>

            {useSubnetMask ? (
              <div>
                <label className="block text-sm font-medium text-gray-700">Subnet Mask</label>
                <input
                  type="text"
                  value={subnetMask}
                  onChange={(e) => setSubnetMask(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="255.255.255.0"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700">CIDR Prefix</label>
                <input
                  type="number"
                  value={cidr}
                  onChange={(e) => setCidr(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  min="0"
                  max="32"
                />
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Network Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Network Address:</span>
                  <span className="font-mono">{result.networkAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Broadcast Address:</span>
                  <span className="font-mono">{result.broadcastAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">First Host:</span>
                  <span className="font-mono">{result.firstHost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Host:</span>
                  <span className="font-mono">{result.lastHost}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Network Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subnet Mask:</span>
                  <span className="font-mono">{result.subnetMask}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Wildcard Mask:</span>
                  <span className="font-mono">{result.wildcardMask}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Hosts:</span>
                  <span className="font-mono">{result.totalHosts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Usable Hosts:</span>
                  <span className="font-mono">{result.usableHosts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">IP Class:</span>
                  <span className="font-mono">Class {result.ipClass}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Binary Representation</h3>
              <div className="space-y-3 font-mono text-sm">
                <div>
                  <div className="text-gray-600">IP Address:</div>
                  <div className="break-all">{result.binary.ipAddress}</div>
                </div>
                <div>
                  <div className="text-gray-600">Subnet Mask:</div>
                  <div className="break-all">{result.binary.subnetMask}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}
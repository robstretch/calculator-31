import React, { useState } from 'react';
import { Network } from 'lucide-react';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { SEO } from '../../components/SEO/SEO';
import { calculateSubnet } from '../../utils/calculators/subnet/calculate';
import type { SubnetResult } from '../../utils/calculators/subnet/types';

export function SubnetCalculator() {
  const [ipAddress, setIpAddress] = useState('192.168.1.0');
  const [cidr, setCidr] = useState('24');
  const [requiredSubnets, setRequiredSubnets] = useState('');
  const [hostsPerSubnet, setHostsPerSubnet] = useState('');
  const [result, setResult] = useState<SubnetResult | null>(null);

  const handleCalculate = () => {
    try {
      const input = {
        ipAddress,
        cidr: parseInt(cidr),
        requiredSubnets: requiredSubnets ? parseInt(requiredSubnets) : undefined,
        hostsPerSubnet: hostsPerSubnet ? parseInt(hostsPerSubnet) : undefined
      };
      setResult(calculateSubnet(input));
    } catch (error) {
      console.error('Invalid input:', error);
    }
  };

  return (
    <>
      <SEO
        title="Subnet Calculator | IP Addressing and Network Tools"
        description="Calculate IP subnets, network addresses, and host ranges. Free subnet calculator for network planning and IP address management."
        keywords={[
          'subnet calculator',
          'IP calculator',
          'CIDR calculator',
          'network calculator',
          'IP addressing',
          'subnet mask calculator'
        ]}
        canonicalUrl="/subnet-calculator"
      />

      <CalculatorLayout
        title="Subnet Calculator"
        description="Calculate network addresses, subnet masks, and host ranges for IP networks"
        icon={<Network />}
      >
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <CalculatorInput
              label="IP Address"
              value={ipAddress}
              onChange={setIpAddress}
              type="text"
              placeholder="192.168.1.0"
            />
            <CalculatorInput
              label="CIDR Prefix Length"
              value={cidr}
              onChange={setCidr}
              type="number"
              min={0}
              max={32}
            />
            <CalculatorInput
              label="Required Subnets (optional)"
              value={requiredSubnets}
              onChange={setRequiredSubnets}
              type="number"
              min={0}
            />
            <CalculatorInput
              label="Hosts Per Subnet (optional)"
              value={hostsPerSubnet}
              onChange={setHostsPerSubnet}
              type="number"
              min={0}
            />
          </div>

          <button
            onClick={handleCalculate}
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Calculate Subnet
          </button>

          {result && (
            <div className="space-y-4">
              <CalculatorResult
                label="Network Address"
                value={result.networkAddress}
                helpText="First address in the network block"
              />
              <CalculatorResult
                label="Broadcast Address"
                value={result.broadcastAddress}
                helpText="Last address in the network block"
              />
              <CalculatorResult
                label="Subnet Mask"
                value={result.subnetMask}
                helpText="Network mask in dotted decimal format"
              />
              <CalculatorResult
                label="First Usable Host"
                value={result.firstHost}
                helpText="First assignable host address"
              />
              <CalculatorResult
                label="Last Usable Host"
                value={result.lastHost}
                helpText="Last assignable host address"
              />
              <CalculatorResult
                label="Total Hosts"
                value={result.totalHosts.toLocaleString()}
                helpText="Total number of addresses in the network"
              />
              <CalculatorResult
                label="Usable Hosts"
                value={result.usableHosts.toLocaleString()}
                helpText="Number of assignable host addresses"
              />

              {result.subnets && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Subnet Breakdown</h3>
                  <div className="space-y-4">
                    {result.subnets.map((subnet, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Subnet {index + 1}</h4>
                        <div className="grid gap-2 text-sm">
                          <div className="flex justify-between">
                            <span>Network:</span>
                            <span>{subnet.networkAddress}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Broadcast:</span>
                            <span>{subnet.broadcastAddress}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>First Host:</span>
                            <span>{subnet.firstHost}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Last Host:</span>
                            <span>{subnet.lastHost}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Usable Hosts:</span>
                            <span>{subnet.usableHosts}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-12 space-y-8">
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Subnetting</h2>
              <p className="text-gray-600 mb-6">
                Subnetting allows you to divide a large network into smaller, more manageable 
                subnetworks. This calculator helps you determine network addresses, host ranges, 
                and subnet masks based on CIDR notation.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Concepts</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="font-medium mr-2">Network Address:</span>
                      <span>The first address in a subnet block</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium mr-2">Broadcast Address:</span>
                      <span>The last address in a subnet block</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium mr-2">CIDR Notation:</span>
                      <span>Represents network size (e.g., /24)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium mr-2">Subnet Mask:</span>
                      <span>Defines network and host portions</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Common Subnet Masks</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="font-mono text-indigo-600">/24</span>
                      <span className="text-gray-600 block">255.255.255.0</span>
                      <span className="text-gray-500 text-xs">256 addresses</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="font-mono text-indigo-600">/25</span>
                      <span className="text-gray-600 block">255.255.255.128</span>
                      <span className="text-gray-500 text-xs">128 addresses</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="font-mono text-indigo-600">/26</span>
                      <span className="text-gray-600 block">255.255.255.192</span>
                      <span className="text-gray-500 text-xs">64 addresses</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="font-mono text-indigo-600">/27</span>
                      <span className="text-gray-600 block">255.255.255.224</span>
                      <span className="text-gray-500 text-xs">32 addresses</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="font-mono text-indigo-600">/28</span>
                      <span className="text-gray-600 block">255.255.255.240</span>
                      <span className="text-gray-500 text-xs">16 addresses</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="font-mono text-indigo-600">/29</span>
                      <span className="text-gray-600 block">255.255.255.248</span>
                      <span className="text-gray-500 text-xs">8 addresses</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Subnetting Best Practices</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Planning</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Determine future growth needs</li>
                    <li>• Account for network devices</li>
                    <li>• Plan for scalability</li>
                    <li>• Document all subnets</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Implementation</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Use efficient subnet sizes</li>
                    <li>• Implement security zones</li>
                    <li>• Configure proper routing</li>
                    <li>• Test connectivity</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Management</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Monitor network usage</li>
                    <li>• Update documentation</li>
                    <li>• Review security policies</li>
                    <li>• Plan for IPv6 transition</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}
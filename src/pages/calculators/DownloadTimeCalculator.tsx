import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculateDownloadTime } from '../../utils/calculators/downloadTime/calculate';

export function DownloadTimeCalculator() {
  const [fileSize, setFileSize] = useState('100');
  const [sizeUnit, setSizeUnit] = useState<'KB' | 'MB' | 'GB' | 'TB'>('MB');
  const [speed, setSpeed] = useState('50');
  const [speedUnit, setSpeedUnit] = useState<'Kbps' | 'Mbps' | 'Gbps'>('Mbps');

  const result = calculateDownloadTime({
    fileSize: parseFloat(fileSize),
    sizeUnit,
    speed: parseFloat(speed),
    speedUnit
  });

  return (
    <>
      <SEO
        title="Download Time Calculator | File Transfer Time Estimation"
        description="Calculate download time based on file size and internet speed. Estimate transfer times for files with our easy-to-use download time calculator."
        keywords={[
          'download time calculator',
          'file transfer time',
          'internet speed calculator',
          'download speed',
          'file size calculator'
        ]}
        canonicalUrl="/download-time-calculator"
      />

      <CalculatorLayout
        title="Download Time Calculator"
        description="Calculate how long it will take to download files based on your internet speed"
        icon={<Calculator />}
      >
        <div className="space-y-6">
          {/* Input Section */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <CalculatorInput
                  label="File Size"
                  value={fileSize}
                  onChange={setFileSize}
                  type="number"
                  min="0"
                />
                <select
                  value={sizeUnit}
                  onChange={(e) => setSizeUnit(e.target.value as any)}
                  className="mt-2 w-full p-2 border rounded"
                >
                  <option value="KB">KB</option>
                  <option value="MB">MB</option>
                  <option value="GB">GB</option>
                  <option value="TB">TB</option>
                </select>
              </div>
              <div>
                <CalculatorInput
                  label="Internet Speed"
                  value={speed}
                  onChange={setSpeed}
                  type="number"
                  min="0"
                />
                <select
                  value={speedUnit}
                  onChange={(e) => setSpeedUnit(e.target.value as any)}
                  className="mt-2 w-full p-2 border rounded"
                >
                  <option value="Kbps">Kbps</option>
                  <option value="Mbps">Mbps</option>
                  <option value="Gbps">Gbps</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Download Time</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Days</div>
                <div className="text-xl font-semibold text-gray-900">{result.time.days}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Hours</div>
                <div className="text-xl font-semibold text-gray-900">{result.time.hours}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Minutes</div>
                <div className="text-xl font-semibold text-gray-900">{result.time.minutes}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Seconds</div>
                <div className="text-xl font-semibold text-gray-900">{result.time.seconds}</div>
              </div>
            </div>

            {/* Common File Examples */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Common File Examples</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result.estimates.map((est, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-medium text-gray-900">{est.type}</div>
                    <div className="text-sm text-gray-600 mt-1">Size: {est.size}</div>
                    <div className="text-sm text-gray-600">Time: {est.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.recommendations.map((rec, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-medium text-gray-900">{rec.category}</div>
                    <div className="text-sm text-gray-600 mt-1">{rec.suggestion}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}
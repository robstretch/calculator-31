import React, { useState, useRef, useEffect } from 'react';
import { Code, Copy } from 'lucide-react';

interface EmbedWidgetProps {
  calculatorPath: string;
}

export function EmbedWidget({ calculatorPath }: EmbedWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState('800');
  const [height, setHeight] = useState('600');
  const [showCopied, setShowCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const baseUrl = 'https://calculator.info';
  const embedUrl = `${baseUrl}${calculatorPath}`;
  const iframeCode = `<div style="width: ${width}px;">
  <iframe
    src="${embedUrl}"
    width="100%"
    height="${height}"
    style="border: 1px solid #e5e7eb; border-radius: 8px;"
    title="Calculator.info - ${calculatorPath.slice(1)}"
  ></iframe>
  <div style="text-align: right; margin-top: 8px;">
    <a 
      href="${embedUrl}"
      target="_blank"
      rel="noopener noreferrer"
      style="font-size: 12px; color: #4F46E5; text-decoration: none; font-family: system-ui, -apple-system, sans-serif;"
    >
      Powered by Calculator.info
    </a>
  </div>
</div>`;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(iframeCode);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        <Code className="h-5 w-5" />
        <span>Want this calculator for your website?</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div ref={modalRef} className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Embed Calculator</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Width (px)
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    min="200"
                    max="2000"
                    step="10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Height (px)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    min="200"
                    max="2000"
                    step="10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Embed Code
                </label>
                <div className="relative">
                  <pre className="bg-gray-50 p-4 rounded-lg text-sm text-gray-800 overflow-x-auto whitespace-pre-wrap">
                    {iframeCode}
                  </pre>
                  <button
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 bg-white rounded-md shadow-sm border border-gray-200"
                    title="Copy to clipboard"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {showCopied && (
                <div className="text-green-600 text-sm">
                  ✓ Code copied to clipboard
                </div>
              )}

              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-indigo-900 mb-2">
                  Instructions:
                </h4>
                <ol className="text-sm text-indigo-700 space-y-2">
                  <li>1. Copy the embed code above</li>
                  <li>2. Paste it into your website's HTML where you want the calculator to appear</li>
                  <li>3. Adjust the width and height values if needed</li>
                </ol>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500">
                <div>
                  Preview the calculator at{' '}
                  <a
                    href={embedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    {embedUrl}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
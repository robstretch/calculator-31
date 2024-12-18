import React from 'react';
import { Calculator, Shield, Users, Code } from 'lucide-react';
import { SEO } from '../components/SEO/SEO';

export function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <SEO
        title="About Calculator.info | Free Online Calculators"
        description="Learn about Calculator.info's mission to provide free, accurate, and easy-to-use calculators for everyone. Discover our commitment to quality and user experience."
        keywords={[
          'about calculator.info',
          'online calculators',
          'calculator tools',
          'free calculators',
          'calculation tools',
          'math tools'
        ]}
        canonicalUrl="/about"
      />
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-indigo-100 rounded-full">
            <Calculator className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Calculator.info</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We provide free, accurate, and easy-to-use calculators to help you make informed decisions 
          about your finances, health, education, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <Shield className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">Trusted Results</h3>
          <p className="text-gray-600">
            Our calculators use verified formulas and are regularly tested for accuracy.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">User-Focused</h3>
          <p className="text-gray-600">
            Designed for simplicity and ease of use, with helpful explanations and tips.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <Code className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">Always Free</h3>
          <p className="text-gray-600">
            All our calculators are free to use with no registration required.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4">
            At Calculator.info, we believe that everyone should have access to reliable tools for making 
            calculations and informed decisions. Whether you're planning your finances, tracking your health, 
            or working on your education, our goal is to provide you with accurate, easy-to-use calculators 
            that help you achieve your goals.
          </p>
          <p>
            We're committed to maintaining a comprehensive suite of calculators that are:
          </p>
          <ul className="mt-4 space-y-2">
            <li>• Regularly updated with the latest formulas and standards</li>
            <li>• Designed for clarity and ease of use</li>
            <li>• Accompanied by helpful explanations and educational content</li>
            <li>• Free from ads and unnecessary distractions</li>
            <li>• Accessible on any device</li>
          </ul>
        </div>
      </div>

      <div className="bg-indigo-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-indigo-900 mb-6">Contact Us</h2>
        <div className="text-indigo-700">
          <p className="mb-4">
            We value your feedback and are constantly working to improve our calculators. If you have 
            suggestions, find an error, or would like to request a new calculator, please don't hesitate 
            to reach out.
          </p>
          <p>
            Email us at: <a href="mailto:contact@calculator.info" className="text-indigo-600 hover:text-indigo-800">contact@calculator.info</a>
          </p>
        </div>
      </div>
    </div>
  );
}
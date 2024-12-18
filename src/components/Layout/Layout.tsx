import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        {children}
      </main>
      <Footer />
      {/* Simple Analytics Tracking */}
      <script async src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
      {/* Umami Analytics Tracking */}
      <script defer src="https://cloud.umami.is/script.js" data-website-id="48a0328d-6d92-442d-b62f-7258355d6fe0"></script>
    </div>
  );
}
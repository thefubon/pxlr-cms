'use client';

import { useState } from 'react';

interface Tab {
  label: string;
  content: string;
}

interface TabsProps {
  tabs: Tab[];
  className?: string;
}

export function Tabs({ tabs, className = '' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={className}>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === index
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-6">
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: tabs[activeTab]?.content || '' }}
        />
      </div>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({ items, allowMultiple = false, className = '' }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    
    if (allowMultiple) {
      if (newOpenItems.has(index)) {
        newOpenItems.delete(index);
      } else {
        newOpenItems.add(index);
      }
    } else {
      if (newOpenItems.has(index)) {
        newOpenItems.clear();
      } else {
        newOpenItems.clear();
        newOpenItems.add(index);
      }
    }
    
    setOpenItems(newOpenItems);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between group"
          >
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
              {item.title}
            </h3>
            <motion.div
              initial={false}
              animate={{ rotate: openItems.has(index) ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-gray-500 group-hover:text-blue-600"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.div>
          </button>
          
          <AnimatePresence initial={false}>
            {openItems.has(index) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 text-gray-700 leading-relaxed border-t border-gray-100 bg-white">
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// Простая версия для MDX (без анимаций)
export function SimpleAccordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <details key={index} className="border border-gray-200 rounded-lg overflow-hidden">
          <summary className="px-6 py-4 bg-gray-50 hover:bg-gray-100 cursor-pointer text-lg font-medium text-gray-900">
            {item.title}
          </summary>
          <div className="px-6 py-4 text-gray-700 leading-relaxed border-t border-gray-100 bg-white">
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </div>
        </details>
      ))}
    </div>
  );
} 
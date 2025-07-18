import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { HomepageData } from '../lib/homepage';

interface HomepageContentProps {
  data: HomepageData;
}

export function HomepageContent({ data }: HomepageContentProps) {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          {data.title}
        </h1>
        {data.description && (
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {data.description}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="prose prose-lg prose-gray max-w-none">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
        >
          {data.content}
        </ReactMarkdown>
      </div>
    </div>
  );
} 
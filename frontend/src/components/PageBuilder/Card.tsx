interface CardProps {
  title: string;
  content: string;
  link?: string;
  linkText?: string;
  className?: string;
}

export function Card({ title, content, link, linkText = 'Подробнее', className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        {content}
      </p>
      {link && (
        <a
          href={link}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          {linkText}
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      )}
    </div>
  );
} 
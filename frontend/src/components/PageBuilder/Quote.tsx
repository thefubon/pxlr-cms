interface QuoteProps {
  text: string;
  author: string;
  position?: string;
  avatar?: string;
  className?: string;
}

export function Quote({ text, author, position, avatar, className = '' }: QuoteProps) {
  return (
    <blockquote className={`bg-gray-50 rounded-xl p-8 border-l-4 border-blue-500 ${className}`}>
      <div className="flex items-start">
        <svg className="w-8 h-8 text-blue-500 mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <div className="flex-1">
          <p className="text-lg text-gray-900 mb-4 italic">
            "{text}"
          </p>
          <div className="flex items-center">
            {avatar && (
              <img 
                src={avatar} 
                alt={author}
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
            )}
            <div>
              <div className="font-semibold text-gray-900">{author}</div>
              {position && (
                <div className="text-sm text-gray-600">{position}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </blockquote>
  );
} 
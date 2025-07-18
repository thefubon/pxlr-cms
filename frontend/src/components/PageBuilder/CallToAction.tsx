interface CallToActionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function CallToAction({ 
  title, 
  description, 
  buttonText, 
  buttonLink, 
  variant = 'primary',
  className = '' 
}: CallToActionProps) {
  const bgColor = variant === 'primary' ? 'bg-blue-600' : 'bg-gray-100';
  const textColor = variant === 'primary' ? 'text-white' : 'text-gray-900';
  const buttonColor = variant === 'primary' 
    ? 'bg-white text-blue-600 hover:bg-gray-100' 
    : 'bg-blue-600 text-white hover:bg-blue-700';

  return (
    <div className={`${bgColor} ${textColor} rounded-xl p-8 text-center ${className}`}>
      <h2 className="text-3xl font-bold mb-4">
        {title}
      </h2>
      <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
        {description}
      </p>
      <a
        href={buttonLink}
        className={`inline-flex items-center px-8 py-3 ${buttonColor} font-medium rounded-lg transition-colors duration-200`}
      >
        {buttonText}
        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </a>
    </div>
  );
} 
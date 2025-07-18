import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">❌</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Страница не найдена</h1>
        <p className="text-gray-600 mb-8">Запрашиваемая страница не существует или была удалена.</p>
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            🏠 Вернуться на главную
          </Link>
          <p className="text-sm text-gray-500">
            Или создайте эту страницу в <a href="http://localhost:3333" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">админке</a>
          </p>
        </div>
      </div>
    </div>
  );
} 
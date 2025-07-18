import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              © 2025 PXLR CMS. Современная система управления контентом для
              Next.js
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/thefubon/pxlr-cms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 transition-colors text-sm">
              GitHub
            </a>

            <Link
              href="/about"
              className="text-gray-500 hover:text-blue-600 transition-colors text-sm">
              О проекте
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 
import { getHomepageData, HomepageData } from '../lib/homepage';
import { HomepageContent } from '../components/HomepageContent';
import { showDevContent, showAdminLinks, getAdminUrl } from '../../config/env.js';
import { Metadata } from 'next';

// Generate dynamic metadata for the homepage
export async function generateMetadata(): Promise<Metadata> {
  const homepageData = await getHomepageData();
  
  return {
    title: homepageData.title,
    description: homepageData.description,
    openGraph: {
      title: homepageData.title,
      description: homepageData.description,
      type: 'website',
    },
  };
}

// Static feature cards that show only in dev or when no dynamic content
const FeatureCards = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
        <span className="text-2xl">📝</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Управление контентом
      </h3>
      <p className="text-gray-600 text-sm">
        Создавайте и редактируйте страницы и посты прямо из админки
      </p>
    </div>

    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
        <span className="text-2xl">⚡</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Быстрая работа
      </h3>
      <p className="text-gray-600 text-sm">
        Все изменения сохраняются мгновенно и сразу отображаются на сайте
      </p>
    </div>

    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
        <span className="text-2xl">🔧</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Простота настройки
      </h3>
      <p className="text-gray-600 text-sm">
        Никаких баз данных - все работает с файлами
      </p>
    </div>
        </div>
);

// Admin CTA that shows only in development
const AdminCTA = () => (
  showAdminLinks() ? (
    <div className="text-center">
      <div className="bg-primary-50 rounded-xl p-8 border border-primary-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Начните работу прямо сейчас
        </h2>
        <p className="text-gray-600 mb-6">
          Перейдите в админку чтобы создать свой первый контент
        </p>
        <a
          href={getAdminUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          🚀 Открыть админку
        </a>
      </div>
    </div>
  ) : null
);

export default async function Home() {
  // Fetch dynamic homepage data
  const homepageData: HomepageData = await getHomepageData();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Dynamic homepage content */}
        <HomepageContent data={homepageData} />
        
        {/* Show feature cards and admin CTA only in dev or as fallback */}
        {showDevContent() && (
          <>
            <div className="my-12 border-t border-gray-200 pt-12">
              <FeatureCards />
            </div>
            <AdminCTA />
          </>
        )}
      </div>
    </div>
  );
}

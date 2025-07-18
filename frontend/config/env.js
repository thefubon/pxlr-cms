// Environment configuration for PXLR CMS
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

const config = {
  // Environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  isDevelopment,
  isProduction,

  // API URLs
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333',
  ADMIN_URL: process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3333',

  // Feature flags
  SHOW_DEV_CONTENT: process.env.NEXT_PUBLIC_SHOW_DEV_CONTENT === 'true' || isDevelopment,
  SHOW_ADMIN_LINKS: process.env.NEXT_PUBLIC_SHOW_ADMIN_LINKS === 'true' || isDevelopment,
  ENABLE_DEBUG: process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true' || isDevelopment,

  // Homepage configuration
  HOMEPAGE_SOURCE: process.env.NEXT_PUBLIC_HOMEPAGE_SOURCE || (isDevelopment ? 'api' : 'static'),

  // Development defaults
  defaults: {
    development: {
      SHOW_DEV_CONTENT: true,
      SHOW_ADMIN_LINKS: true,
      ENABLE_DEBUG: true,
      HOMEPAGE_SOURCE: 'api'
    },
    production: {
      SHOW_DEV_CONTENT: false,
      SHOW_ADMIN_LINKS: false,
      ENABLE_DEBUG: false,
      HOMEPAGE_SOURCE: 'static'
    }
  }
};

// Helper functions
const showDevContent = () => config.SHOW_DEV_CONTENT;
const showAdminLinks = () => config.SHOW_ADMIN_LINKS;
const enableDebug = () => config.ENABLE_DEBUG;
const getHomepageSource = () => config.HOMEPAGE_SOURCE;
const getApiUrl = () => config.API_URL;
const getAdminUrl = () => config.ADMIN_URL;

// ES Module exports
export { config, showDevContent, showAdminLinks, enableDebug, getHomepageSource, getApiUrl, getAdminUrl };
export default config;

// CommonJS exports for Node.js testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    config,
    showDevContent,
    showAdminLinks,
    enableDebug,
    getHomepageSource,
    getApiUrl,
    getAdminUrl,
    default: config
  };
} 
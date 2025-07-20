import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './routes/Dashboard';
import { PostsList } from './routes/PostsList';
import { PostCreate } from './routes/PostCreate';
import { PostEdit } from './routes/PostEdit';
import { Settings } from './routes/Settings';
import { Toaster } from '@/components/ui/sonner';
import './styles/globals.css';

// Создаем QueryClient для TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/posts" element={<PostsList />} />
            <Route path="/posts/new" element={<PostCreate />} />
            <Route path="/posts/:slug/edit" element={<PostEdit />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App; 
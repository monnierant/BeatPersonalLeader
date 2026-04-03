import { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../shared/components/Layout';
import { LoadingSpinner } from '../shared/components/LoadingSpinner';

const HomePage = lazy(() => import('../features/home/HomePage'));
const PlayerPage = lazy(() => import('../features/player/PlayerPage'));
const NotFoundPage = lazy(() => import('./NotFoundPage'));

export const App = () => (
  <HashRouter>
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/player/:id" element={<PlayerPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  </HashRouter>
);

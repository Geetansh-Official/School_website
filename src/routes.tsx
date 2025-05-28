import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import ErrorBoundary from '@/components/organisms/ErrorBoundary';

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Gallery = lazy(() => import('@/pages/Gallery'));
const NoticeBoard = lazy(() => import('@/pages/NoticeBoard'));
const Faculty = lazy(() => import('@/pages/Faculty'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Achievements = lazy(() => import('@/pages/Achievements'));
const Files = lazy(() => import('@/pages/Files'));

const AppRoutes = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route
              index
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="about"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="gallery"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Gallery />
                </Suspense>
              }
            />
            <Route
              path="notice-board"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <NoticeBoard />
                </Suspense>
              }
            />
            
            <Route
              path="faculty"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Faculty />
                </Suspense>
              }
            />
            <Route
              path="achievements"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Achievements />
                </Suspense>
              }
            />
            <Route
              path="files"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Files />
                </Suspense>
              }
            />
            <Route
              path="404"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <NotFound />
                </Suspense>
              }
            />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default AppRoutes;
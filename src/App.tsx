import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store/useAppStore';
import { auth, onAuthStateChanged } from './services/firebase';
import { registerServiceWorker, requestNotificationPermission } from './services/notifications';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AppLayout from './components/Layout/AppLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import PatientsPage from './pages/PatientsPage';
import PatientDetailPage from './pages/PatientDetailPage';
import NotificationsPage from './pages/NotificationsPage';
import './styles/globals.css';

const App: React.FC = () => {
  const { setUser, setAuthLoading } = useAppStore();

  useEffect(() => {
    // Register service worker
    registerServiceWorker();

    // Request notification permission after a delay
    setTimeout(() => {
      requestNotificationPermission();
    }, 5000);

    // Listen to Firebase auth state
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        // Check local store (demo mode persisted)
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setAuthLoading]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AppLayout><DashboardPage /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute>
            <AppLayout><AnalyticsPage /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/patients" element={
          <ProtectedRoute>
            <AppLayout><PatientsPage /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/patients/:id" element={
          <ProtectedRoute>
            <AppLayout><PatientDetailPage /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute>
            <AppLayout><NotificationsPage /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

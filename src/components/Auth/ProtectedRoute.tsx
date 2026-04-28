import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { Activity } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, authLoading } = useAppStore();

  if (authLoading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-primary)', flexDirection: 'column', gap: 16
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: 'var(--gradient-blue)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'pulse 1.5s infinite'
        }}>
          <Activity size={26} color="#fff" />
        </div>
        <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>Loading HealthSaaS...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAppStore } from '../../store/useAppStore';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { sidebarOpen } = useAppStore();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Sidebar />
      <div style={{
        flex: 1,
        marginLeft: sidebarOpen ? 'var(--sidebar-width)' : '68px',
        transition: 'margin-left 0.3s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column', minHeight: '100vh'
      }}>
        <Header />
        <main style={{
          flex: 1,
          marginTop: 'var(--header-height)',
          padding: '28px',
          overflowY: 'auto'
        }}
          className="grid-bg"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

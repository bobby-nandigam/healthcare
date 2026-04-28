import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, Search, X } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Welcome back, overview of your platform' },
  '/analytics': { title: 'Analytics', subtitle: 'Performance metrics and insights' },
  '/patients': { title: 'Patients', subtitle: 'Manage and monitor patient records' },
  '/notifications': { title: 'Notifications', subtitle: 'Alerts and system messages' },
};

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { unreadCount, sidebarOpen, searchQuery, setSearchQuery } = useAppStore();
  const [searchFocused, setSearchFocused] = useState(false);

  const pageInfo = pageTitles[location.pathname] ||
    (location.pathname.startsWith('/patients/') ? { title: 'Patient Details', subtitle: 'Detailed patient information' } : { title: 'HealthSaaS', subtitle: '' });

  return (
    <header style={{
      position: 'fixed', top: 0, right: 0,
      left: sidebarOpen ? 'var(--sidebar-width)' : '68px',
      height: 'var(--header-height)',
      background: 'rgba(5,11,24,0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center',
      padding: '0 28px', gap: 24, zIndex: 90,
      transition: 'left 0.3s cubic-bezier(0.4,0,0.2,1)'
    }}>
      {/* Page title */}
      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.3px', lineHeight: 1 }}>{pageInfo.title}</h1>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{pageInfo.subtitle}</p>
      </div>

      {/* Search bar */}
      <div style={{
        position: 'relative',
        width: searchFocused ? 320 : 240,
        transition: 'width 0.3s ease'
      }}>
        <Search size={15} style={{
          position: 'absolute', left: 12, top: '50%',
          transform: 'translateY(-50%)', color: 'var(--text-muted)'
        }} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          placeholder="Search patients..."
          className="input"
          style={{ paddingLeft: 38, paddingRight: searchQuery ? 36 : 14, height: 38, fontSize: 13 }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            style={{
              position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 2
            }}
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Notifications bell */}
      <button
        onClick={() => navigate('/notifications')}
        style={{
          position: 'relative', width: 38, height: 38, borderRadius: 'var(--radius-sm)',
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'var(--text-secondary)',
          transition: 'var(--transition)'
        }}
      >
        <Bell size={17} />
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute', top: -4, right: -4,
            width: 17, height: 17, borderRadius: '50%',
            background: 'var(--accent-red)', fontSize: 9, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
            border: '2px solid var(--bg-primary)'
          }}>{unreadCount > 9 ? '9+' : unreadCount}</span>
        )}
      </button>
    </header>
  );
};

export default Header;

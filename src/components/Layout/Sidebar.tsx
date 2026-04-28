import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Activity, LayoutDashboard, BarChart2, Users, Bell, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { auth, signOut } from '../../services/firebase';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/analytics', icon: BarChart2, label: 'Analytics' },
  { path: '/patients', icon: Users, label: 'Patients' },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, sidebarOpen, setSidebarOpen, logout, unreadCount } = useAppStore();

  const handleLogout = async () => {
    try { await signOut(auth); } catch {}
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside style={{
      position: 'fixed', left: 0, top: 0, bottom: 0,
      width: sidebarOpen ? 'var(--sidebar-width)' : '68px',
      background: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
      zIndex: 100, overflow: 'hidden'
    }}>
      {/* Logo */}
      <div style={{
        height: 'var(--header-height)', display: 'flex', alignItems: 'center',
        padding: sidebarOpen ? '0 20px' : '0', justifyContent: sidebarOpen ? 'space-between' : 'center',
        borderBottom: '1px solid var(--border)', flexShrink: 0
      }}>
        {sidebarOpen && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8, background: 'var(--gradient-blue)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Activity size={16} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.3px' }}>HealthSaaS</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>v2.4.1</div>
            </div>
          </div>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            width: 28, height: 28, borderRadius: 6,
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-secondary)', flexShrink: 0
          }}
        >
          {sidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {navItems.map(({ path, icon: Icon, label }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: sidebarOpen ? '10px 12px' : '10px',
              borderRadius: 'var(--radius-sm)',
              border: 'none', cursor: 'pointer', width: '100%',
              justifyContent: sidebarOpen ? 'flex-start' : 'center',
              background: isActive(path) ? 'rgba(33,150,243,0.12)' : 'transparent',
              color: isActive(path) ? 'var(--accent-blue)' : 'var(--text-secondary)',
              fontFamily: 'var(--font-main)', fontSize: 14, fontWeight: isActive(path) ? 600 : 400,
              transition: 'var(--transition)',
              position: 'relative',
              borderLeft: isActive(path) ? '2px solid var(--accent-blue)' : '2px solid transparent'
            }}
            title={!sidebarOpen ? label : undefined}
          >
            <Icon size={18} />
            {sidebarOpen && <span>{label}</span>}
          </button>
        ))}

        {/* Notifications nav item */}
        <button
          onClick={() => navigate('/notifications')}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: sidebarOpen ? '10px 12px' : '10px',
            borderRadius: 'var(--radius-sm)',
            border: 'none', cursor: 'pointer', width: '100%',
            justifyContent: sidebarOpen ? 'flex-start' : 'center',
            background: isActive('/notifications') ? 'rgba(33,150,243,0.12)' : 'transparent',
            color: isActive('/notifications') ? 'var(--accent-blue)' : 'var(--text-secondary)',
            fontFamily: 'var(--font-main)', fontSize: 14, fontWeight: isActive('/notifications') ? 600 : 400,
            transition: 'var(--transition)',
            borderLeft: isActive('/notifications') ? '2px solid var(--accent-blue)' : '2px solid transparent',
            position: 'relative'
          }}
          title={!sidebarOpen ? 'Notifications' : undefined}
        >
          <div style={{ position: 'relative' }}>
            <Bell size={18} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute', top: -6, right: -6,
                width: 16, height: 16, borderRadius: '50%',
                background: 'var(--accent-red)', fontSize: 9, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
              }}>{unreadCount}</span>
            )}
          </div>
          {sidebarOpen && <span>Notifications</span>}
          {sidebarOpen && unreadCount > 0 && (
            <span style={{
              marginLeft: 'auto', padding: '2px 8px', borderRadius: 20,
              background: 'var(--accent-red)', color: '#fff', fontSize: 10, fontWeight: 700
            }}>{unreadCount}</span>
          )}
        </button>
      </nav>

      {/* User section */}
      <div style={{ padding: '12px', borderTop: '1px solid var(--border)' }}>
        {sidebarOpen ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-card)' }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--gradient-blue)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0
            }}>
              {user?.displayName?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.displayName || 'Admin User'}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.email}
              </div>
            </div>
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4 }} title="Logout">
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button onClick={handleLogout} style={{
            width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center',
            padding: '10px', borderRadius: 'var(--radius-sm)', background: 'none',
            border: 'none', cursor: 'pointer', color: 'var(--text-muted)'
          }} title="Logout">
            <LogOut size={18} />
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

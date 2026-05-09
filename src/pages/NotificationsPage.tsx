import React, { useEffect } from 'react';
import { Bell, CheckCheck, Trash2, AlertCircle, Info, CheckCircle, XCircle, Clock, Send } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { requestNotificationPermission, sendNotification } from '../services/notifications';
import type { Notification } from '../types';

const iconMap = {
  error: XCircle,
  warning: AlertCircle,
  success: CheckCircle,
  info: Info,
};

const colorMap = {
  error: 'var(--accent-red)',
  warning: 'var(--accent-amber)',
  success: 'var(--accent-emerald)',
  info: 'var(--accent-blue)',
};

const NotificationItem: React.FC<{ notification: Notification; onRead: () => void }> = ({ notification, onRead }) => {
  const Icon = iconMap[notification.type];
  const color = colorMap[notification.type];

  const timeAgo = (date: Date) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div
      onClick={onRead}
      style={{
        display: 'flex', gap: 16, padding: '18px 20px',
        borderBottom: '1px solid var(--border)', cursor: 'pointer',
        background: notification.read ? 'transparent' : `${color}05`,
        transition: 'background 0.15s', position: 'relative'
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
      onMouseLeave={e => (e.currentTarget.style.background = notification.read ? 'transparent' : `${color}05`)}
    >
      {!notification.read && (
        <div style={{
          position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
          width: 3, height: '60%', borderRadius: '0 2px 2px 0',
          background: color
        }} />
      )}
      <div style={{
        width: 40, height: 40, borderRadius: 10, flexShrink: 0,
        background: `${color}15`, border: `1px solid ${color}25`,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <Icon size={18} color={color} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 4 }}>
          <div style={{ fontSize: 14, fontWeight: notification.read ? 500 : 700 }}>{notification.title}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            {!notification.read && (
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: color }} />
            )}
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
              {timeAgo(notification.timestamp)}
            </div>
          </div>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{notification.message}</div>
      </div>
    </div>
  );
};

const NotificationsPage: React.FC = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications, addNotification } = useAppStore();
  const [permissionStatus, setPermissionStatus] = React.useState<NotificationPermission>(
    'Notification' in window ? Notification.permission : 'denied'
  );

  useEffect(() => {
    if ('Notification' in window) setPermissionStatus(Notification.permission);
  }, []);

  const handleRequestPermission = async () => {
    const granted = await requestNotificationPermission();
    setPermissionStatus(granted ? 'granted' : 'denied');
    if (granted) {
      addNotification({ title: 'Notifications Enabled', message: 'You will now receive push notifications', type: 'success' });
    }
  };

  const handleTestNotification = () => {
    sendNotification('🏥 HealthSaaS Alert', {
      body: 'This is a test push notification from HealthSaaS platform',
      tag: 'test-notification',
    });
    addNotification({
      title: 'Test Notification Sent',
      message: 'A test push notification was dispatched to your browser',
      type: 'info'
    });
  };

  const handleSimulateCritical = () => {
    addNotification({ title: '🚨 Critical Patient Alert', message: 'Patient in Room 302 requires immediate medical attention - vitals dropping', type: 'error' });
    sendNotification('🚨 Critical Alert', { body: 'Patient in Room 302 requires immediate attention' });
  };

  const handleSimulateAppointment = () => {
    addNotification({ title: '📅 Appointment Reminder', message: 'Dr. Priya Sharma has 3 appointments starting in 30 minutes', type: 'info' });
  };

  const typeGroups = {
    error: notifications.filter(n => n.type === 'error').length,
    warning: notifications.filter(n => n.type === 'warning').length,
    success: notifications.filter(n => n.type === 'success').length,
    info: notifications.filter(n => n.type === 'info').length,
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      {/* Push notification permission banner */}
      {permissionStatus !== 'granted' && (
        <div style={{
          padding: '16px 20px', borderRadius: 'var(--radius)',
          background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)',
          marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Bell size={18} color="var(--accent-amber)" />
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>Enable Push Notifications</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Receive real-time alerts for critical patient updates and appointments</div>
            </div>
          </div>
          <button onClick={handleRequestPermission} className="btn btn-primary" style={{ padding: '10px 20px', fontSize: 13, flexShrink: 0 }}>
            Enable Notifications
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16, alignItems: 'start' }}>
        {/* Main notifications panel */}
        <div className="card" style={{ overflow: 'hidden' }}>
          {/* Toolbar */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Bell size={17} color="var(--accent-blue)" />
              <span style={{ fontSize: 15, fontWeight: 700 }}>All Notifications</span>
              {unreadCount > 0 && (
                <span style={{ padding: '2px 9px', borderRadius: 20, background: 'var(--accent-red)', color: '#fff', fontSize: 11, fontWeight: 700 }}>{unreadCount}</span>
              )}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {unreadCount > 0 && (
                <button onClick={markAllAsRead} className="btn btn-secondary" style={{ fontSize: 12, padding: '7px 14px', gap: 6 }}>
                  <CheckCheck size={14} /> Mark all read
                </button>
              )}
              {notifications.length > 0 && (
                <button onClick={clearNotifications} className="btn btn-danger" style={{ fontSize: 12, padding: '7px 14px', gap: 6 }}>
                  <Trash2 size={14} /> Clear all
                </button>
              )}
            </div>
          </div>

          {/* Notification list */}
          {notifications.length > 0 ? (
            notifications.map(n => (
              <NotificationItem key={n.id} notification={n} onRead={() => !n.read && markAsRead(n.id)} />
            ))
          ) : (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Bell size={40} style={{ opacity: 0.3, marginBottom: 16 }} />
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>All caught up!</div>
              <div style={{ fontSize: 13 }}>No notifications at the moment</div>
            </div>
          )}
        </div>

        {/* Right panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Status breakdown */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>By Type</h3>
            {Object.entries(typeGroups).map(([type, count]) => {
              const color = colorMap[type as keyof typeof colorMap];
              const Icon = iconMap[type as keyof typeof iconMap];
              return (
                <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={13} color={color} />
                  </div>
                  <span style={{ flex: 1, fontSize: 12, color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{type}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color }}>{count}</span>
                </div>
              );
            })}
          </div>

          {/* Test triggers */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>Test Notifications</h3>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 14 }}>Simulate notification scenarios</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button onClick={handleTestNotification} disabled={permissionStatus !== 'granted'} className="btn btn-secondary" style={{ justifyContent: 'center', fontSize: 12, padding: '10px', gap: 6, opacity: permissionStatus !== 'granted' ? 0.5 : 1 }}>
                <Send size={13} /> Send Test Push
              </button>
              <button onClick={handleSimulateCritical} className="btn btn-danger" style={{ justifyContent: 'center', fontSize: 12, padding: '10px', gap: 6 }}>
                <XCircle size={13} /> Critical Alert
              </button>
              <button onClick={handleSimulateAppointment} className="btn btn-secondary" style={{ justifyContent: 'center', fontSize: 12, padding: '10px', gap: 6 }}>
                <Clock size={13} /> Appointment Reminder
              </button>
              <button onClick={() => addNotification({ title: 'Lab Results Available', message: 'Blood work results for 4 patients are ready for review', type: 'success' })}
                className="btn btn-secondary" style={{ justifyContent: 'center', fontSize: 12, padding: '10px', gap: 6 }}>
                <CheckCircle size={13} /> Lab Results Ready
              </button>
            </div>
            {permissionStatus !== 'granted' && (
              <p style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 10, textAlign: 'center' }}>Enable push notifications to test browser alerts</p>
            )}
          </div>

          {/* Service worker status */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Service Worker</h3>
            {[
              { label: 'SW Support', ok: 'serviceWorker' in navigator },
              { label: 'Push API', ok: 'PushManager' in window },
              { label: 'Notifications', ok: 'Notification' in window },
              { label: 'Permission', ok: permissionStatus === 'granted' },
            ].map(({ label, ok }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{label}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: ok ? 'var(--accent-emerald)' : 'var(--accent-red)', background: ok ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', padding: '2px 8px', borderRadius: 4 }}>
                  {ok ? '✓ Active' : '✗ Inactive'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;

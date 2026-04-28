import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Activity, Calendar, AlertTriangle, TrendingUp, TrendingDown, ArrowRight, Heart, Thermometer, Droplets } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppStore } from '../../store/useAppStore';
import { mockAnalytics } from '../../services/mockData';
import { scheduleLocalNotification } from '../../services/notifications';

const StatCard: React.FC<{
  title: string; value: string | number; subtitle: string;
  icon: React.ElementType; color: string; glowClass: string;
  trend?: number;
}> = ({ title, value, subtitle, icon: Icon, color, glowClass, trend }) => (
  <div className={`card ${glowClass}`} style={{ padding: 24, animation: 'fadeIn 0.4s ease' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
      <div style={{
        width: 44, height: 44, borderRadius: 10,
        background: `${color}18`,
        border: `1px solid ${color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <Icon size={20} color={color} />
      </div>
      {trend !== undefined && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          fontSize: 12, fontWeight: 600,
          color: trend >= 0 ? 'var(--accent-emerald)' : 'var(--accent-red)'
        }}>
          {trend >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-1px', color: 'var(--text-primary)', marginBottom: 4 }}>{value}</div>
    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 2 }}>{title}</div>
    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{subtitle}</div>
  </div>
);

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { patients, addNotification } = useAppStore();

  const criticalCount = patients.filter(p => p.status === 'Critical').length;
  const activeCount = patients.filter(p => p.status === 'Active').length;
  const stableCount = patients.filter(p => p.status === 'Stable').length;

  useEffect(() => {
    // Demo notification after 3 seconds
    const timer = setTimeout(() => {
      addNotification({
        title: 'Dashboard Loaded',
        message: `Monitoring ${patients.length} patients. ${criticalCount} require immediate attention.`,
        type: criticalCount > 0 ? 'warning' : 'info'
      });
      scheduleLocalNotification(
        '⚠️ Critical Alert',
        `${criticalCount} patients require immediate attention`,
        1000
      );
    }, 3000);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line

  const recentPatients = [...patients]
    .sort((a, b) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime())
    .slice(0, 5);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 16px' }}>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} style={{ fontSize: 13, color: entry.color, fontWeight: 600 }}>
            {entry.name}: {entry.name === 'revenue' ? `$${entry.value.toLocaleString()}` : entry.value}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        <StatCard title="Total Patients" value={patients.length} subtitle="Across all departments" icon={Users} color="var(--accent-blue)" glowClass="stat-glow-blue" trend={8.2} />
        <StatCard title="Active Cases" value={activeCount} subtitle="Currently under treatment" icon={Activity} color="var(--accent-emerald)" glowClass="stat-glow-teal" trend={3.1} />
        <StatCard title="Appointments Today" value={24} subtitle="Scheduled for today" icon={Calendar} color="var(--accent-amber)" glowClass="stat-glow-amber" trend={-2.4} />
        <StatCard title="Critical Patients" value={criticalCount} subtitle="Require immediate care" icon={AlertTriangle} color="var(--accent-red)" glowClass="stat-glow-red" trend={criticalCount > 1 ? 15 : -5} />
      </div>

      {/* Charts + Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 16, marginBottom: 24 }}>
        {/* Area chart */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 2 }}>Patient & Revenue Trends</h3>
              <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Last 7 months performance</p>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              {[{ color: '#2196F3', label: 'Patients' }, { color: '#00BCD4', label: 'Revenue' }].map(({ color, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={mockAnalytics} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2196F3" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2196F3" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradCyan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00BCD4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00BCD4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="patients" stroke="#2196F3" strokeWidth={2} fill="url(#gradBlue)" name="patients" />
              <Area type="monotone" dataKey="appointments" stroke="#00BCD4" strokeWidth={2} fill="url(#gradCyan)" name="revenue" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Patient status breakdown */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Patient Status</h3>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>Current distribution</p>
          {[
            { label: 'Active', count: activeCount, color: 'var(--accent-emerald)', pct: Math.round(activeCount / patients.length * 100) },
            { label: 'Stable', count: stableCount, color: 'var(--accent-blue)', pct: Math.round(stableCount / patients.length * 100) },
            { label: 'Critical', count: criticalCount, color: 'var(--accent-red)', pct: Math.round(criticalCount / patients.length * 100) },
            { label: 'Discharged', count: patients.filter(p => p.status === 'Discharged').length, color: 'var(--text-muted)', pct: Math.round(patients.filter(p => p.status === 'Discharged').length / patients.length * 100) }
          ].map(({ label, count, color, pct }) => (
            <div key={label} style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color }}>{count} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({pct}%)</span></span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 3, transition: 'width 1s ease' }} />
              </div>
            </div>
          ))}

          {/* Quick vitals summary */}
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>Average Vitals (Active)</p>
            {[
              { icon: Heart, label: 'Heart Rate', value: '76 bpm', color: 'var(--accent-red)' },
              { icon: Thermometer, label: 'Temperature', value: '98.5°F', color: 'var(--accent-amber)' },
              { icon: Droplets, label: 'O₂ Saturation', value: '97%', color: 'var(--accent-blue)' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={13} color={color} />
                </div>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)', flex: 1 }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent patients table */}
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 2 }}>Recent Patients</h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Latest visits and updates</p>
          </div>
          <button onClick={() => navigate('/patients')} className="btn btn-secondary" style={{ fontSize: 13, padding: '8px 16px', gap: 6 }}>
            View all <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Patient', 'Condition', 'Status', 'Doctor', 'Last Visit', 'Next Appt'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentPatients.map((p, i) => (
                <tr
                  key={p.id}
                  onClick={() => navigate(`/patients/${p.id}`)}
                  style={{
                    borderBottom: '1px solid var(--border)', cursor: 'pointer',
                    transition: 'background 0.15s', animation: `fadeIn 0.3s ease ${i * 0.05}s both`
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '14px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                        background: 'var(--gradient-blue)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 13, fontWeight: 700, color: '#fff'
                      }}>{p.name[0]}</div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.id} · {p.age}y · {p.gender[0]}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px', fontSize: 13, color: 'var(--text-secondary)' }}>{p.condition}</td>
                  <td style={{ padding: '14px' }}>
                    <span className={`badge status-${p.status.toLowerCase()}`}>{p.status}</span>
                  </td>
                  <td style={{ padding: '14px', fontSize: 13, color: 'var(--text-secondary)' }}>{p.doctor}</td>
                  <td style={{ padding: '14px', fontSize: 13, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{p.lastVisit}</td>
                  <td style={{ padding: '14px', fontSize: 13, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{p.nextAppointment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

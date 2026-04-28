import React from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { TrendingUp, DollarSign, Users, Activity } from 'lucide-react';
import { mockAnalytics } from '../../services/mockData';
import { useAppStore } from '../../store/useAppStore';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 16px' }}>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} style={{ fontSize: 13, color: entry.color, fontWeight: 600, marginBottom: 2 }}>
          {entry.name}: {entry.name === 'Revenue' ? `$${Number(entry.value).toLocaleString()}` : entry.value}
        </p>
      ))}
    </div>
  );
};

const radarData = [
  { metric: 'Patient Satisfaction', score: 92 },
  { metric: 'Staff Performance', score: 85 },
  { metric: 'Bed Utilization', score: 78 },
  { metric: 'Recovery Rate', score: 90 },
  { metric: 'Wait Time', score: 70 },
  { metric: 'Revenue Growth', score: 88 },
];

const departmentData = [
  { dept: 'Cardiology', patients: 42, revenue: 125000 },
  { dept: 'Neurology', patients: 31, revenue: 98000 },
  { dept: 'Oncology', patients: 28, revenue: 145000 },
  { dept: 'Orthopedics', patients: 55, revenue: 87000 },
  { dept: 'Pediatrics', patients: 67, revenue: 72000 },
  { dept: 'Pulmonology', patients: 23, revenue: 65000 },
];

const AnalyticsPage: React.FC = () => {
  const { patients } = useAppStore();
  const totalRevenue = mockAnalytics.reduce((s, d) => s + d.revenue, 0);
  const totalPatients = mockAnalytics.reduce((s, d) => s + d.patients, 0);
  const avgRecovery = Math.round(mockAnalytics.reduce((s, d) => s + d.recoveryRate, 0) / mockAnalytics.length);
  const totalAppts = mockAnalytics.reduce((s, d) => s + d.appointments, 0);

  const kpis = [
    { label: 'Total Revenue (7mo)', value: `$${(totalRevenue / 1000).toFixed(0)}K`, icon: DollarSign, color: 'var(--accent-emerald)', sub: '+12.4% vs prior period' },
    { label: 'Total Patients Seen', value: totalPatients, icon: Users, color: 'var(--accent-blue)', sub: '+8.2% vs prior period' },
    { label: 'Avg Recovery Rate', value: `${avgRecovery}%`, icon: Activity, color: 'var(--accent-cyan)', sub: 'Above industry avg (81%)' },
    { label: 'Total Appointments', value: totalAppts, icon: TrendingUp, color: 'var(--accent-amber)', sub: '+15.7% vs prior period' },
  ];

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        {kpis.map(({ label, value, icon: Icon, color, sub }, i) => (
          <div key={label} className="card" style={{ padding: 22, animation: `fadeIn 0.4s ease ${i * 0.08}s both` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}18`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={18} color={color} />
              </div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 4 }}>{value}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 11, color: 'var(--accent-emerald)' }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Revenue + Appointments trend */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Revenue Trend</h3>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>Monthly revenue (USD)</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={mockAnalytics} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#10b981" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Appointments vs Patients</h3>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>Monthly comparison</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockAnalytics} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, color: 'var(--text-muted)' }} />
              <Bar dataKey="patients" name="Patients" fill="#2196F3" radius={[4, 4, 0, 0]} opacity={0.85} />
              <Bar dataKey="appointments" name="Appointments" fill="#00BCD4" radius={[4, 4, 0, 0]} opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Radar + Department table */}
      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 16 }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Performance Radar</h3>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>Multi-dimensional KPI scores</p>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} />
              <Radar name="Score" dataKey="score" stroke="#2196F3" fill="#2196F3" fillOpacity={0.15} strokeWidth={2} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Department Performance</h3>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>Patients and revenue by department</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Department', 'Patients', 'Revenue', 'Avg/Patient', 'Share'].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {departmentData.map((d, i) => {
                  const maxRev = Math.max(...departmentData.map(x => x.revenue));
                  return (
                    <tr key={d.dept} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', animation: `fadeIn 0.3s ease ${i * 0.06}s both` }}>
                      <td style={{ padding: '12px', fontSize: 13, fontWeight: 600 }}>{d.dept}</td>
                      <td style={{ padding: '12px', fontSize: 13, color: 'var(--text-secondary)' }}>{d.patients}</td>
                      <td style={{ padding: '12px', fontSize: 13, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>${d.revenue.toLocaleString()}</td>
                      <td style={{ padding: '12px', fontSize: 13, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>${Math.round(d.revenue / d.patients).toLocaleString()}</td>
                      <td style={{ padding: '12px', minWidth: 100 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ flex: 1, height: 5, borderRadius: 3, background: 'var(--bg-secondary)' }}>
                            <div style={{ height: '100%', width: `${(d.revenue / maxRev) * 100}%`, background: 'var(--gradient-blue)', borderRadius: 3 }} />
                          </div>
                          <span style={{ fontSize: 11, color: 'var(--text-muted)', minWidth: 30 }}>{Math.round((d.revenue / maxRev) * 100)}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Recovery rate line */}
          <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 12 }}>Recovery Rate Trend</p>
            <ResponsiveContainer width="100%" height={80}>
              <LineChart data={mockAnalytics} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis domain={[80, 100]} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="recoveryRate" name="Recovery %" stroke="#00BCD4" strokeWidth={2} dot={{ fill: '#00BCD4', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;

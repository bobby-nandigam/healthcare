import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, List, Search, Filter, Phone, Mail, Calendar, Heart } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Patient } from '../types';

const statusColors: Record<string, string> = {
  Active: 'var(--accent-emerald)',
  Critical: 'var(--accent-red)',
  Stable: 'var(--accent-blue)',
  Discharged: 'var(--text-muted)',
};

const PatientGridCard: React.FC<{ patient: Patient; onClick: () => void; index: number }> = ({ patient, onClick, index }) => (
  <div
    onClick={onClick}
    className="card"
    style={{
      padding: 20, cursor: 'pointer',
      animation: `fadeIn 0.3s ease ${index * 0.05}s both`,
      transition: 'all 0.2s ease',
      position: 'relative', overflow: 'hidden'
    }}
    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-bright)'; }}
    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
  >
    {/* Critical pulse indicator */}
    {patient.status === 'Critical' && (
      <div style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-red)' }} className="animate-pulse" />
    )}

    {/* Avatar + name */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
      <div style={{
        width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
        background: patient.status === 'Critical' ? 'linear-gradient(135deg, #b91c1c, #ef4444)' : 'var(--gradient-blue)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 18, fontWeight: 800, color: '#fff',
        boxShadow: patient.status === 'Critical' ? '0 0 16px rgba(239,68,68,0.4)' : '0 0 16px rgba(33,150,243,0.3)'
      }}>{patient.name[0]}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{patient.name}</div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{patient.id} · {patient.age}y · {patient.gender}</div>
      </div>
    </div>

    {/* Status + blood type */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
      <span className={`badge status-${patient.status.toLowerCase()}`}>{patient.status}</span>
      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-red)', background: 'rgba(239,68,68,0.08)', padding: '3px 8px', borderRadius: 6 }}>
        {patient.bloodType}
      </span>
    </div>

    {/* Condition */}
    <div style={{ marginBottom: 14, padding: '10px 12px', background: 'var(--bg-secondary)', borderRadius: 8 }}>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Primary Condition</div>
      <div style={{ fontSize: 13, fontWeight: 600 }}>{patient.condition}</div>
    </div>

    {/* Vitals row */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
      {[
        { label: 'HR', value: `${patient.vitals.heartRate}`, unit: 'bpm', color: 'var(--accent-red)' },
        { label: 'BP', value: patient.vitals.bloodPressure, unit: '', color: 'var(--accent-amber)' },
        { label: 'O₂', value: `${patient.vitals.oxygenSaturation}`, unit: '%', color: 'var(--accent-blue)' },
      ].map(({ label, value, unit, color }) => (
        <div key={label} style={{ textAlign: 'center', padding: '8px 4px', background: `${color}0a`, borderRadius: 6, border: `1px solid ${color}20` }}>
          <div style={{ fontSize: 9, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>{label}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color }}>{value}<span style={{ fontSize: 9 }}>{unit}</span></div>
        </div>
      ))}
    </div>

    {/* Doctor + last visit */}
    <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
        <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{patient.doctor.replace('Dr. ', '')}</span>
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{patient.lastVisit}</div>
    </div>
  </div>
);

const PatientListRow: React.FC<{ patient: Patient; onClick: () => void; index: number }> = ({ patient, onClick, index }) => (
  <div
    onClick={onClick}
    style={{
      display: 'grid', gridTemplateColumns: '280px 180px 130px 1fr 150px 160px',
      alignItems: 'center', padding: '14px 20px', cursor: 'pointer',
      borderBottom: '1px solid var(--border)',
      animation: `fadeIn 0.25s ease ${index * 0.04}s both`,
      transition: 'background 0.15s'
    }}
    onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
  >
    {/* Name */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {patient.status === 'Critical' && <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-red)', flexShrink: 0 }} className="animate-pulse" />}
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--gradient-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{patient.name[0]}</div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600 }}>{patient.name}</div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{patient.id} · {patient.age}y · {patient.gender[0]}</div>
      </div>
    </div>
    {/* Condition */}
    <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{patient.condition}</div>
    {/* Status */}
    <div><span className={`badge status-${patient.status.toLowerCase()}`}>{patient.status}</span></div>
    {/* Doctor */}
    <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{patient.doctor}</div>
    {/* Last visit */}
    <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{patient.lastVisit}</div>
    {/* Next appt */}
    <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{patient.nextAppointment}</div>
  </div>
);

const PatientsPage: React.FC = () => {
  const navigate = useNavigate();
  const { patients, viewMode, setViewMode, searchQuery, setSearchQuery, filterStatus, setFilterStatus } = useAppStore();

  const filtered = useMemo(() => {
    return patients.filter(p => {
      const matchesSearch = !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.doctor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [patients, searchQuery, filterStatus]);

  const statusCounts = useMemo(() => ({
    all: patients.length,
    Active: patients.filter(p => p.status === 'Active').length,
    Stable: patients.filter(p => p.status === 'Stable').length,
    Critical: patients.filter(p => p.status === 'Critical').length,
    Discharged: patients.filter(p => p.status === 'Discharged').length,
  }), [patients]);

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* Controls */}
      <div className="card" style={{ padding: '16px 20px', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name, condition, ID, doctor..."
              className="input"
              style={{ paddingLeft: 38, height: 38, fontSize: 13 }}
            />
          </div>

          {/* Status filters */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {(['all', 'Active', 'Stable', 'Critical', 'Discharged'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                style={{
                  padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', border: 'none', fontFamily: 'var(--font-main)',
                  background: filterStatus === status
                    ? (status === 'all' ? 'var(--accent-blue)' : `${statusColors[status]}22`)
                    : 'var(--bg-secondary)',
                  color: filterStatus === status
                    ? (status === 'all' ? '#fff' : statusColors[status])
                    : 'var(--text-muted)',
                  borderColor: filterStatus === status && status !== 'all' ? statusColors[status] : 'transparent',
                  borderStyle: 'solid', borderWidth: 1,
                  transition: 'var(--transition)'
                }}
              >
                {status === 'all' ? 'All' : status} ({statusCounts[status as keyof typeof statusCounts]})
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div style={{ display: 'flex', background: 'var(--bg-secondary)', borderRadius: 8, padding: 3, border: '1px solid var(--border)' }}>
            {[{ mode: 'grid', Icon: Grid }, { mode: 'list', Icon: List }].map(({ mode, Icon }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                style={{
                  width: 32, height: 32, borderRadius: 6, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', border: 'none',
                  cursor: 'pointer', transition: 'var(--transition)',
                  background: viewMode === mode ? 'var(--accent-blue)' : 'transparent',
                  color: viewMode === mode ? '#fff' : 'var(--text-muted)'
                }}
              >
                <Icon size={15} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div style={{ marginBottom: 14, fontSize: 12, color: 'var(--text-muted)', padding: '0 4px' }}>
        Showing <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{filtered.length}</span> of {patients.length} patients
        {filterStatus !== 'all' && <span> · Filtered by <span style={{ color: statusColors[filterStatus] }}>{filterStatus}</span></span>}
      </div>

      {/* Grid view */}
      {viewMode === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {filtered.map((p, i) => (
            <PatientGridCard
              key={p.id}
              patient={p}
              index={i}
              onClick={() => navigate(`/patients/${p.id}`)}
            />
          ))}
        </div>
      ) : (
        /* List view */
        <div className="card" style={{ overflow: 'hidden' }}>
          {/* List header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '280px 180px 130px 1fr 150px 160px',
            padding: '10px 20px', borderBottom: '1px solid var(--border)',
            background: 'var(--bg-secondary)'
          }}>
            {['Patient', 'Condition', 'Status', 'Doctor', 'Last Visit', 'Next Appt'].map(h => (
              <div key={h} style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</div>
            ))}
          </div>
          {filtered.map((p, i) => (
            <PatientListRow
              key={p.id}
              patient={p}
              index={i}
              onClick={() => navigate(`/patients/${p.id}`)}
            />
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <Search size={40} style={{ opacity: 0.3, marginBottom: 16 }} />
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>No patients found</div>
          <div style={{ fontSize: 13 }}>Try adjusting your search or filter criteria</div>
        </div>
      )}
    </div>
  );
};

export default PatientsPage;

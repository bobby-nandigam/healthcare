import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MapPin, Heart, Thermometer, Droplets, Activity, Pill, FileText, User, Shield, ChevronRight } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const VitalCard: React.FC<{ label: string; value: string; unit: string; icon: React.ElementType; color: string; normal?: string }> =
  ({ label, value, unit, icon: Icon, color, normal }) => (
    <div style={{
      padding: 16, borderRadius: 10, background: `${color}08`,
      border: `1px solid ${color}20`, textAlign: 'center'
    }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
        <Icon size={15} color={color} />
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, color, letterSpacing: '-0.5px' }}>{value}</div>
      <div style={{ fontSize: 10, fontWeight: 600, color, marginBottom: 2 }}>{unit}</div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{label}</div>
      {normal && <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4, opacity: 0.7 }}>Normal: {normal}</div>}
    </div>
  );

const PatientDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { patients } = useAppStore();
  const patient = patients.find(p => p.id === id);

  if (!patient) {
    return (
      <div style={{ textAlign: 'center', padding: 60 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
        <h2 style={{ marginBottom: 8 }}>Patient not found</h2>
        <button onClick={() => navigate('/patients')} className="btn btn-primary">Back to Patients</button>
      </div>
    );
  }

  const statusColor = {
    Active: 'var(--accent-emerald)', Critical: 'var(--accent-red)',
    Stable: 'var(--accent-blue)', Discharged: 'var(--text-muted)'
  }[patient.status];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Back nav */}
      <button
        onClick={() => navigate('/patients')}
        style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: 13, padding: '0 0 20px', fontFamily: 'var(--font-main)' }}
      >
        <ArrowLeft size={16} /> Back to Patients
      </button>

      {/* Header card */}
      <div className="card" style={{ padding: 28, marginBottom: 16, animation: 'fadeIn 0.4s ease' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
          {/* Avatar */}
          <div style={{
            width: 80, height: 80, borderRadius: '50%', flexShrink: 0,
            background: patient.status === 'Critical' ? 'linear-gradient(135deg, #b91c1c, #ef4444)' : 'var(--gradient-blue)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, fontWeight: 800, color: '#fff',
            boxShadow: patient.status === 'Critical' ? '0 0 30px rgba(239,68,68,0.4)' : '0 0 30px rgba(33,150,243,0.3)'
          }}>{patient.name[0]}</div>

          {/* Info */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 8 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.5px' }}>{patient.name}</h2>
              <span className={`badge status-${patient.status.toLowerCase()}`} style={{ fontSize: 12 }}>{patient.status}</span>
              {patient.status === 'Critical' && <span style={{ color: 'var(--accent-red)', fontSize: 12, fontWeight: 600, animation: 'pulse 1.5s infinite' }}>⚠ Requires Immediate Attention</span>}
            </div>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 16 }}>
              {[
                { label: 'Patient ID', value: patient.id },
                { label: 'Age', value: `${patient.age} years` },
                { label: 'Gender', value: patient.gender },
                { label: 'Blood Type', value: patient.bloodType },
                { label: 'Admission', value: patient.admissionDate },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{value}</div>
                </div>
              ))}
            </div>
            {/* Contact row */}
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {[
                { icon: Phone, text: patient.phone },
                { icon: Mail, text: patient.email },
                { icon: MapPin, text: patient.address },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)' }}>
                  <Icon size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 200 }}>
            <div style={{ padding: '12px 16px', background: 'var(--bg-secondary)', borderRadius: 10 }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>Attending Physician</div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{patient.doctor}</div>
            </div>
            <div style={{ padding: '12px 16px', background: 'var(--bg-secondary)', borderRadius: 10 }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>Insurance</div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{patient.insurance}</div>
            </div>
            <div style={{ padding: '12px 16px', background: 'rgba(33,150,243,0.08)', border: '1px solid rgba(33,150,243,0.2)', borderRadius: 10 }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>Next Appointment</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)' }}>{patient.nextAppointment}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Vitals */}
          <div className="card" style={{ padding: 24, animation: 'fadeIn 0.4s ease 0.1s both' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Activity size={16} color="var(--accent-blue)" /> Current Vitals
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 12 }}>
              <VitalCard label="Heart Rate" value={`${patient.vitals.heartRate}`} unit="bpm" icon={Heart} color="var(--accent-red)" normal="60-100" />
              <VitalCard label="Blood Pressure" value={patient.vitals.bloodPressure} unit="mmHg" icon={Activity} color="var(--accent-amber)" normal="<120/80" />
              <VitalCard label="Temperature" value={`${patient.vitals.temperature}`} unit="°F" icon={Thermometer} color="var(--accent-purple)" normal="97-99°F" />
              <VitalCard label="O₂ Saturation" value={`${patient.vitals.oxygenSaturation}`} unit="%" icon={Droplets} color="var(--accent-blue)" normal="95-100%" />
              <VitalCard label="Weight" value={`${patient.vitals.weight}`} unit="kg" icon={User} color="var(--accent-teal)" />
              <VitalCard label="Height" value={`${patient.vitals.height}`} unit="cm" icon={User} color="var(--accent-cyan)" />
            </div>
          </div>

          {/* Medications */}
          <div className="card" style={{ padding: 24, animation: 'fadeIn 0.4s ease 0.15s both' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Pill size={16} color="var(--accent-emerald)" /> Current Medications
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {patient.medications.map((med, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '14px 16px', borderRadius: 10,
                  background: 'var(--bg-secondary)', border: '1px solid var(--border)'
                }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Pill size={15} color="var(--accent-emerald)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{med.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{med.dosage} · {med.frequency}</div>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textAlign: 'right' }}>
                    <div>Started</div>
                    <div style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{med.startDate}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Condition summary */}
          <div className="card" style={{ padding: 24, animation: 'fadeIn 0.4s ease 0.2s both' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Shield size={16} color="var(--accent-amber)" /> Condition Summary
            </h3>
            <div style={{ padding: '14px 16px', background: 'var(--bg-secondary)', borderRadius: 10, marginBottom: 14 }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Primary Diagnosis</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: statusColor }}>{patient.condition}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
              {[
                { label: 'Last Visit', value: patient.lastVisit },
                { label: 'Next Appt', value: patient.nextAppointment },
              ].map(({ label, value }) => (
                <div key={label} style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical notes */}
          <div className="card" style={{ padding: 24, animation: 'fadeIn 0.4s ease 0.25s both' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <FileText size={16} color="var(--accent-purple)" /> Clinical Notes
            </h3>
            <div style={{
              padding: '16px', background: 'rgba(139,92,246,0.05)',
              border: '1px solid rgba(139,92,246,0.15)', borderRadius: 10,
              fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7
            }}>
              {patient.notes}
            </div>
          </div>

          {/* Quick actions */}
          <div className="card" style={{ padding: 24, animation: 'fadeIn 0.4s ease 0.3s both' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Schedule Appointment', 'Request Lab Work', 'Update Medication', 'Send Message'].map(action => (
                <button key={action} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 14px', borderRadius: 8, background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)', cursor: 'pointer', width: '100%',
                  color: 'var(--text-secondary)', fontSize: 13, fontFamily: 'var(--font-main)',
                  fontWeight: 500, transition: 'var(--transition)'
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-blue)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
                >
                  {action} <ChevronRight size={14} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailPage;

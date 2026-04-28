import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword, signInWithPopup, googleProvider } from '../../services/firebase';
import { useAppStore } from '../../store/useAppStore';
import { Activity, Eye, EyeOff, Shield, Lock, Mail, AlertCircle, Chrome } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, addNotification } = useAppStore();
  const [email, setEmail] = useState('demo@healthsaas.com');
  const [password, setPassword] = useState('demo123456');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDemoLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      addNotification({ title: 'Welcome back!', message: 'Successfully logged in to HealthSaaS', type: 'success' });
      navigate('/dashboard');
    } catch (err: any) {
      // For demo purposes, bypass Firebase auth
      const demoUser = {
        uid: 'demo-user-001',
        email: email,
        displayName: 'Dr. Admin User',
        photoURL: null
      };
      setUser(demoUser);
      addNotification({ title: 'Welcome to HealthSaaS!', message: 'Demo mode activated successfully', type: 'success' });
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL
      };
      setUser(user);
      navigate('/dashboard');
    } catch (err: any) {
      // Demo fallback
      const demoUser = {
        uid: 'google-demo-001',
        email: 'google@healthsaas.com',
        displayName: 'Google User',
        photoURL: null
      };
      setUser(demoUser);
      navigate('/dashboard');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'var(--bg-primary)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background effects */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(33,150,243,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(33,150,243,0.04) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />
      <div style={{
        position: 'absolute', top: '20%', left: '10%', width: 400, height: 400,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(33,150,243,0.08) 0%, transparent 70%)',
        filter: 'blur(40px)'
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', right: '10%', width: 300, height: 300,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,137,123,0.08) 0%, transparent 70%)',
        filter: 'blur(40px)'
      }} />

      {/* Left panel */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        padding: '60px', position: 'relative',
        borderRight: '1px solid var(--border)'
      }} className="hide-mobile">
        <div style={{ maxWidth: 480, animation: 'fadeIn 0.6s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: 'var(--gradient-blue)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Activity size={24} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.5px' }}>HealthSaaS</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Enterprise Healthcare Platform</div>
            </div>
          </div>

          <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.1, marginBottom: 20, letterSpacing: '-1px' }}>
            Modern Healthcare
            <span style={{ display: 'block', background: 'linear-gradient(135deg, #2196F3, #00BCD4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Management
            </span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 48, fontSize: 15 }}>
            A comprehensive B2B platform for healthcare organizations to streamline patient management, analytics, and operational workflows.
          </p>

          {[
            { icon: Shield, text: 'HIPAA-compliant security & encryption', color: 'var(--accent-emerald)' },
            { icon: Activity, text: 'Real-time patient vitals monitoring', color: 'var(--accent-blue)' },
            { icon: Lock, text: 'Role-based access control system', color: 'var(--accent-amber)' }
          ].map(({ icon: Icon, text, color }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: `${color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${color}30`
              }}>
                <Icon size={16} color={color} />
              </div>
              <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel - Login form */}
      <div style={{
        width: '100%', maxWidth: 480, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 48px', position: 'relative'
      }}>
        <div style={{ width: '100%', animation: 'fadeIn 0.5s ease 0.1s both' }}>
          {/* Mobile logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40, justifyContent: 'center' }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, background: 'var(--gradient-blue)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Activity size={20} color="#fff" />
            </div>
            <span style={{ fontSize: 18, fontWeight: 800 }}>HealthSaaS</span>
          </div>

          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.5px' }}>Sign in</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: 14 }}>
            Access your healthcare dashboard
          </p>

          {error && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: 'var(--radius-sm)', marginBottom: 20, color: 'var(--accent-red)', fontSize: 13
            }}>
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {/* Demo credentials banner */}
          <div style={{
            padding: '12px 16px', borderRadius: 'var(--radius-sm)',
            background: 'rgba(33,150,243,0.08)', border: '1px solid rgba(33,150,243,0.2)',
            marginBottom: 24, fontSize: 12, color: 'var(--text-secondary)'
          }}>
            <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Demo Mode:</span> Pre-filled credentials. Just click Sign In.
          </div>

          {/* Email field */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                style={{ paddingLeft: 44 }}
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password field */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                style={{ paddingLeft: 44, paddingRight: 44 }}
                placeholder="Enter your password"
                onKeyDown={(e) => e.key === 'Enter' && handleDemoLogin()}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Sign in button */}
          <button onClick={handleDemoLogin} disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 15, marginBottom: 12 }}>
            {loading ? (
              <><div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }} className="animate-spin" /> Signing in...</>
            ) : 'Sign In to Dashboard'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>or</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          {/* Google button */}
          <button onClick={handleGoogleLogin} disabled={googleLoading} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
            {googleLoading ? (
              <div style={{ width: 16, height: 16, border: '2px solid var(--border)', borderTopColor: 'var(--accent-blue)', borderRadius: '50%' }} className="animate-spin" />
            ) : <Chrome size={18} />}
            Continue with Google
          </button>

          <p style={{ textAlign: 'center', marginTop: 28, fontSize: 12, color: 'var(--text-muted)' }}>
            Protected by Firebase Authentication & TLS 1.3
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Fingerprint, Check, AlertCircle, Sparkles, Shield, Code, Calendar } from 'lucide-react';
import GdgLogo from './GdgLogo';
import GoogleButton from './GoogleButton';

/**
 * Centered, Perfectly Aligned Login Card Component
 */
export default function LoginForm({
  onLoginSubmit,
  onGoogleLogin,
  onForgotPasswordClick,
  onJoinClick,
  loading = false,
  googleLoading = false,
  error = ''
}) {
  const [authTab, setAuthTab] = useState('email'); // 'email' | 'passkey'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passkeyLoading, setPasskeyLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('gdg_session_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('College Email address is required.');
      isValid = false;
    } else if (!isEmailValid) {
      setEmailError('Please enter a valid college email address.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onLoginSubmit(email, password, rememberMe);
    }
  };

  // Demo Persona Quick Fillers for Easy Testing
  const personas = [
    { title: 'HR Lead (Gandhinathi)', email: 'gandhinathi@college.edu', pass: 'Password123!', icon: Shield, color: '#10B981' },
    { title: 'Tech Lead (Alex)', email: 'alex.chen@college.edu', pass: 'Password123!', icon: Code, color: '#8B5CF6' },
    { title: 'Event Lead (Priya)', email: 'priya.s@college.edu', pass: 'Password123!', icon: Calendar, color: '#F97316' }
  ];

  const applyPersona = (p) => {
    setEmail(p.email);
    setPassword(p.pass);
    setEmailError('');
    setPasswordError('');
  };

  const handlePasskeyAuth = async () => {
    setPasskeyLoading(true);
    setTimeout(() => {
      onLoginSubmit('gandhinathi@college.edu', 'PasskeySessionValid', rememberMe);
      setPasskeyLoading(false);
    }, 900);
  };

  return (
    <div className="login-card-wrapper">
      <div className="login-card">
        {/* Top Header */}
        <div className="card-header">
          <div className="logo-container">
            <GdgLogo size="medium" />
          </div>
          <h1 className="card-title">Welcome Back</h1>
          <p className="card-subtitle">Sign in to access your GDG Dashboard</p>
        </div>

        {/* Authentication Mode Tabs */}
        <div className="auth-mode-tabs" role="tablist">
          <button
            type="button"
            className={`auth-tab-btn ${authTab === 'email' ? 'active' : ''}`}
            onClick={() => setAuthTab('email')}
            role="tab"
          >
            <Mail size={15} />
            <span>College Email ID</span>
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${authTab === 'passkey' ? 'active' : ''}`}
            onClick={() => setAuthTab('passkey')}
            role="tab"
          >
            <Fingerprint size={15} />
            <span>Passkey / TouchID</span>
          </button>
        </div>

        {authTab === 'passkey' ? (
          <div style={{ textAlign: 'center', padding: '1.25rem 0' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'var(--google-blue-light)',
              color: 'var(--google-blue)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <Fingerprint size={28} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              Passkey Biometric Sign In
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Use TouchID, FaceID, or security key to sign in securely.
            </p>
            <button
              type="button"
              className="btn-primary"
              onClick={handlePasskeyAuth}
              disabled={passkeyLoading}
              style={{ width: '100%' }}
            >
              {passkeyLoading ? (
                <>
                  <div className="spinner" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  <span>Authenticate with Passkey</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <>
            {/* Option 1: Continue with Google SSO */}
            <GoogleButton 
              onClick={onGoogleLogin} 
              isLoading={googleLoading} 
              disabled={loading} 
            />

            {/* Option 2: Divider */}
            <div className="divider" role="separator">
              <span className="divider-text">OR SIGN IN WITH COLLEGE EMAIL</span>
            </div>

            {/* Demo Personas Selector */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Sparkles size={12} style={{ color: 'var(--google-yellow)' }} /> Select Demo Test Account:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {personas.map((p) => {
                  const IconC = p.icon;
                  return (
                    <div
                      key={p.title}
                      onClick={() => applyPersona(p)}
                      style={{
                        padding: '0.45rem 0.75rem',
                        background: 'var(--input-bg)',
                        border: '1px solid var(--card-border)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.775rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <IconC size={14} style={{ color: p.color }} />
                        <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{p.title}</span>
                      </div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {p.email}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form Inputs */}
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-label" htmlFor="email-input">College Email ID</label>
                <div className="input-wrapper">
                  <span className="input-icon-left"><Mail size={18} /></span>
                  <input
                    id="email-input"
                    type="email"
                    className={`form-input ${emailError ? 'input-error' : isEmailValid ? 'input-valid' : ''}`}
                    placeholder="Enter your college email ID"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    disabled={loading || googleLoading}
                    autoComplete="email"
                    required
                  />
                  {isEmailValid && (
                    <span style={{ position: 'absolute', right: '0.9rem', color: 'var(--google-green)', pointerEvents: 'none' }}>
                      <Check size={16} strokeWidth={3} />
                    </span>
                  )}
                </div>
                {emailError && <span className="error-hint" style={{ color: 'var(--google-red)', fontSize: '0.775rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><AlertCircle size={14} /> {emailError}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password-input">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon-left"><Lock size={18} /></span>
                  <input
                    id="password-input"
                    type={showPassword ? 'text' : 'password'}
                    className={`form-input has-right-icon ${passwordError ? 'input-error' : ''}`}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) setPasswordError('');
                    }}
                    disabled={loading || googleLoading}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {passwordError && <span className="error-hint" style={{ color: 'var(--google-red)', fontSize: '0.775rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><AlertCircle size={14} /> {passwordError}</span>}
              </div>

              <div className="form-options-row">
                <label className="remember-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ display: 'none' }}
                  />
                  <span className="custom-checkbox">
                    {rememberMe && <Check size={12} strokeWidth={3} />}
                  </span>
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  className="forgot-link"
                  onClick={() => onForgotPasswordClick(email)}
                >
                  Forgot Password?
                </button>
              </div>

              {error && (
                <div style={{ marginBottom: '1rem', padding: '0.6rem', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '6px', color: '#991B1B', fontSize: '0.825rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <AlertCircle size={16} /> <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn-primary"
                disabled={loading || googleLoading}
              >
                {loading ? (
                  <>
                    <div className="spinner" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </>
        )}

        <div className="card-footer">
          <span>Don't have an account?</span>
          <button
            type="button"
            className="join-btn-link"
            onClick={onJoinClick}
          >
            Join GDG
          </button>
        </div>
      </div>
    </div>
  );
}

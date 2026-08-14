import React, { useState } from 'react';
import { X, Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { requestPasswordReset } from '../services/authService';

/**
 * Interactive Modal for Password Recovery
 */
export default function ForgotPasswordModal({ isOpen, onClose, initialEmail = '' }) {
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await requestPasswordReset(email);
      setSuccessMsg(res.message);
    } catch (err) {
      setError(err.message || 'Failed to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={onClose} 
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'var(--google-blue-light)',
            color: 'var(--google-blue)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.75rem'
          }}>
            <Mail size={24} />
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Reset Your Password
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.35rem', lineHeight: '1.4' }}>
            Enter your registered email and we'll send you instructions to reset your GDG account password.
          </p>
        </div>

        {successMsg ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ color: 'var(--google-green)', marginBottom: '0.75rem' }}>
              <CheckCircle2 size={42} style={{ display: 'inline-block' }} />
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600, marginBottom: '1.25rem' }}>
              {successMsg}
            </p>
            <button 
              type="button" 
              className="btn-primary" 
              onClick={onClose}
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="reset-email">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon-left">
                  <Mail size={18} />
                </span>
                <input
                  id="reset-email"
                  type="email"
                  className={`form-input ${error ? 'input-error' : ''}`}
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  autoFocus
                />
              </div>
              {error && <span className="error-hint">{error}</span>}
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ marginTop: '1.5rem' }}
            >
              {loading ? (
                <>
                  <div className="spinner" />
                  <span>Sending Reset Link...</span>
                </>
              ) : (
                <>
                  <span>Send Reset Link</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

import React, { Component } from 'react';
import { AlertTriangle, RefreshCw, Home, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Universal Error Boundary Component
 * Handles runtime JavaScript errors gracefully across all browsers (Safari, Chrome, Edge, Firefox).
 * Supports both full-page error screens and inline widget fallbacks.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      copied: false,
      showDetails: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Log error to console for debugging across browsers
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
    if (this.props.onError) {
      try {
        this.props.onError(error, errorInfo);
      } catch (err) {
        console.error('Error in onError callback:', err);
      }
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      copied: false,
      showDetails: false
    });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  handleClearDataAndReload = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.warn('Could not clear storage:', e);
    }
    window.location.reload();
  };

  handleCopyError = () => {
    const { error, errorInfo } = this.state;
    const text = `Error: ${error?.toString() || 'Unknown'}\n\nStack:\n${error?.stack || ''}\n\nComponent Stack:\n${errorInfo?.componentStack || ''}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        this.setState({ copied: true });
        setTimeout(() => this.setState({ copied: false }), 2500);
      }).catch(() => {
        // Fallback for older Safari or permissions issues
        this.fallbackCopy(text);
      });
    } else {
      this.fallbackCopy(text);
    }
  };

  fallbackCopy = (text) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2500);
    } catch (e) {
      console.warn('Fallback copy failed:', e);
    }
  };

  render() {
    const { hasError, error, errorInfo, copied, showDetails } = this.state;
    const { children, fallback, inline, title } = this.props;

    if (hasError) {
      if (typeof fallback === 'function') {
        return fallback({ error, resetErrorBoundary: this.handleReset });
      }
      if (fallback) {
        return fallback;
      }

      // Inline fallback for widget/section level crashes
      if (inline) {
        return (
          <div style={{
            padding: '1.5rem',
            margin: '1rem 0',
            borderRadius: 'var(--radius-md, 12px)',
            background: 'var(--card-bg, #FFFFFF)',
            border: '1px solid #FCA5A5',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#FEE2E2',
                color: '#DC2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <AlertTriangle size={18} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main, #0F172A)' }}>
                  {title || 'Section Unavailable'}
                </h4>
                <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.8rem', color: '#DC2626' }}>
                  {error?.message || 'An unexpected rendering error occurred.'}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button
                onClick={this.handleReset}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.85rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  borderRadius: '6px',
                  background: 'var(--google-blue, #2563EB)',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                  WebkitAppearance: 'none'
                }}
              >
                <RefreshCw size={13} />
                <span>Retry</span>
              </button>
            </div>
          </div>
        );
      }

      // Full Page Error Screen
      return (
        <div style={{
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1.5rem',
          background: 'var(--bg-main, #F4F6F9)',
          fontFamily: "var(--font-sans, 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif)",
          boxSizing: 'border-box'
        }}>
          <div style={{
            maxWidth: '560px',
            width: '100%',
            background: 'var(--card-bg, #FFFFFF)',
            borderRadius: 'var(--radius-lg, 16px)',
            border: '1px solid var(--card-border, #E2E8F0)',
            padding: '2.5rem 2rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
            textAlign: 'center'
          }}>
            {/* Google Developer Group Brand Logo Header */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M38 25L15 50L38 75" stroke="#4285F4" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M62 25L85 50L62 75" stroke="#34A853" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="50" cy="38" r="5" fill="#EA4335" />
                <circle cx="50" cy="62" r="5" fill="#FBBC04" />
              </svg>
              <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main, #0F172A)' }}>
                Google Developer Group
              </span>
            </div>

            {/* Error Icon */}
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#FEE2E2',
              color: '#DC2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}>
              <AlertTriangle size={28} />
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main, #0F172A)', marginBottom: '0.5rem' }}>
              Something Went Wrong
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted, #64748B)', lineHeight: '1.5', marginBottom: '1.75rem' }}>
              An unexpected application error occurred. We have captured this error to prevent system crash. You can retry or reload the page.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <button
                onClick={this.handleReset}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.7rem 1.25rem',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-md, 12px)',
                  background: 'var(--google-blue, #2563EB)',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
                  WebkitAppearance: 'none',
                  transition: 'background 0.15s ease'
                }}
              >
                <RefreshCw size={16} />
                <span>Try Again</span>
              </button>

              <button
                onClick={this.handleReload}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.7rem 1.25rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-md, 12px)',
                  background: 'var(--input-bg, #F8FAFC)',
                  color: 'var(--text-main, #0F172A)',
                  border: '1px solid var(--card-border, #E2E8F0)',
                  cursor: 'pointer',
                  WebkitAppearance: 'none'
                }}
              >
                <Home size={16} />
                <span>Reload Page</span>
              </button>
            </div>

            {/* Clear Data & Restart button for stubborn cache errors */}
            <div style={{ marginBottom: '1.5rem' }}>
              <button
                onClick={this.handleClearDataAndReload}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted, #64748B)',
                  fontSize: '0.8rem',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  WebkitAppearance: 'none'
                }}
              >
                Clear local cache & reset
              </button>
            </div>

            {/* Collapsible Error Technical Details */}
            <div style={{
              borderTop: '1px solid var(--card-border, #E2E8F0)',
              paddingTop: '1.25rem',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button
                  onClick={() => this.setState({ showDetails: !showDetails })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted, #64748B)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: 0,
                    WebkitAppearance: 'none'
                  }}
                >
                  <span>Technical details</span>
                  {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>

                {showDetails && (
                  <button
                    onClick={this.handleCopyError}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      background: 'none',
                      border: 'none',
                      color: copied ? '#10B981' : 'var(--google-blue, #2563EB)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      padding: 0,
                      WebkitAppearance: 'none'
                    }}
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copied ? 'Copied' : 'Copy stack'}</span>
                  </button>
                )}
              </div>

              {showDetails && (
                <div style={{
                  marginTop: '0.75rem',
                  padding: '0.85rem',
                  borderRadius: '8px',
                  background: 'var(--input-bg, #F8FAFC)',
                  border: '1px solid var(--card-border, #CBD5E1)',
                  maxHeight: '180px',
                  overflowY: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  color: '#DC2626',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  <strong>{error?.toString()}</strong>
                  {errorInfo?.componentStack && (
                    <div style={{ color: 'var(--text-muted, #64748B)', marginTop: '0.5rem' }}>
                      {errorInfo.componentStack}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

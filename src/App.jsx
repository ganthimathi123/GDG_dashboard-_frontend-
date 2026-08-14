import React, { useState, useEffect } from 'react';
import BackgroundDecoration from './components/BackgroundDecoration';
import LoginForm from './components/LoginForm';
import HrDashboard from './components/HrDashboard';
import EventDashboard from './components/EventDashboard';
import PlaceholderDashboard from './components/PlaceholderDashboard';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import JoinGdgModal from './components/JoinGdgModal';
import DevIntegrationDrawer from './components/DevIntegrationDrawer';
import { loginWithEmailPassword, loginWithGoogle } from './services/authService';
import { AlertCircle, CheckCircle2, Info, X, Sun, Moon } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Modals state
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  // Toast Notification state
  const [toast, setToast] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Handle Login Submit
  const handleLoginSubmit = async (email, password, rememberMe) => {
    setFormError('');
    setLoading(true);
    try {
      const loggedUser = await loginWithEmailPassword(email, password, rememberMe);
      setUser(loggedUser);
      showToast('success', `Welcome back, ${loggedUser.name}! Signed in to ${loggedUser.team} Team.`);
    } catch (err) {
      setFormError(err.message || 'Login failed. Please check your credentials.');
      showToast('error', err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Google SSO
  const handleGoogleLogin = async () => {
    setFormError('');
    setGoogleLoading(true);
    try {
      const loggedUser = await loginWithGoogle();
      setUser(loggedUser);
      showToast('success', `Signed in as ${loggedUser.name} (${loggedUser.team} Team).`);
    } catch (err) {
      setFormError('Google Sign-In failed.');
      showToast('error', 'Google Sign-In failed.');
    } finally {
      setGoogleLoading(false);
    }
  };

  // Handle Forgot Password modal trigger
  const handleOpenForgotPassword = (currentEmail) => {
    setForgotEmail(currentEmail || '');
    setForgotModalOpen(true);
  };

  // Handle Registration Success from Join GDG modal
  const handleRegisterSuccess = (newUser) => {
    setUser(newUser);
    showToast('success', `Welcome to GDG, ${newUser.name}! Your account is registered under ${newUser.team} Team.`);
  };

  // Handle Sign Out
  const handleSignOut = () => {
    setUser(null);
    showToast('info', 'Signed out safely.');
  };

  return (
    <div className="app-viewport">
      {/* Top Bar Theme Control (Login Screen Only) */}
      {!user && (
        <header className="top-control-bar">
          <div />
          <button 
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </header>
      )}

      {/* Background Layer (Login Screen Only) */}
      {!user && <BackgroundDecoration />}

      {/* Floating Toast Notification */}
      {toast && (
        <div className={`toast-banner toast-${toast.type}`} role="alert">
          {toast.type === 'error' && <AlertCircle size={20} />}
          {toast.type === 'success' && <CheckCircle2 size={20} />}
          {toast.type === 'info' && <Info size={20} />}
          <span>{toast.message}</span>
          <button 
            onClick={() => setToast(null)} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', marginLeft: 'auto', display: 'flex' }}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Role-Based Dashboard Navigation Router */}
      {user ? (
        user.team === 'HR' ? (
          <HrDashboard
            user={user}
            onSignOut={handleSignOut}
            showToast={showToast}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        ) : user.team === 'Event Management' ? (
          <EventDashboard
            user={user}
            onSignOut={handleSignOut}
            showToast={showToast}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        ) : (
          <PlaceholderDashboard
            user={user}
            onSignOut={handleSignOut}
          />
        )
      ) : (
        <LoginForm
          onLoginSubmit={handleLoginSubmit}
          onGoogleLogin={handleGoogleLogin}
          onForgotPasswordClick={handleOpenForgotPassword}
          onJoinClick={() => setJoinModalOpen(true)}
          loading={loading}
          googleLoading={googleLoading}
          error={formError}
        />
      )}

      {/* Interactive Modals */}
      <ForgotPasswordModal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
        initialEmail={forgotEmail}
      />

      <JoinGdgModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
        onRegisterSuccess={handleRegisterSuccess}
      />

      {/* Developer Integration Spec Drawer */}
      <DevIntegrationDrawer />
    </div>
  );
}

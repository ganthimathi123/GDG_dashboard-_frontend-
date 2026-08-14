import React from 'react';
import { LogOut, Code, Calendar, ShieldCheck, Clock } from 'lucide-react';
import GdgLogo from './GdgLogo';

/**
 * Placeholder Dashboard for non-HR Team users (Tech Team, Event Management Team)
 */
export default function PlaceholderDashboard({ user, onSignOut }) {
  const isTech = user.team === 'Tech';
  const TeamIcon = isTech ? Code : Calendar;
  const teamColor = isTech ? 'var(--google-green)' : 'var(--google-red)';

  return (
    <div style={{
      width: '100%',
      maxwidth: '800px',
      margin: '0 auto',
      background: 'var(--card-bg)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--card-border)',
      boxShadow: 'var(--shadow-card)',
      padding: '3rem 2.5rem',
      textAlign: 'center',
      zIndex: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--card-border)' }}>
        <GdgLogo size="small" />
        <button onClick={onSignOut} className="btn-google" style={{ width: 'auto', padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>

      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'var(--input-bg)',
        border: `2px solid ${teamColor}`,
        color: teamColor,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.25rem'
      }}>
        <TeamIcon size={32} />
      </div>

      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
        Hello, {user.name} 👋
      </h1>
      
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.4rem 1rem',
        borderRadius: 'var(--radius-full)',
        background: 'var(--input-bg)',
        border: '1px solid var(--card-border)',
        fontSize: '0.9rem',
        fontWeight: 700,
        color: teamColor,
        marginBottom: '2rem'
      }}>
        <ShieldCheck size={16} /> {user.team} Team
      </div>

      <div style={{
        background: 'var(--input-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: 'var(--radius-md)',
        padding: '2rem',
        maxWidth: '560px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--google-yellow)', marginBottom: '0.75rem' }}>
          <Clock size={20} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
            {user.team} Dashboard Coming Soon
          </h3>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
          The specialized <strong>{user.team} Team Dashboard</strong> is currently under development for next release. 
          HR Management functions are strictly restricted to HR Operations leads.
        </p>
      </div>
    </div>
  );
}

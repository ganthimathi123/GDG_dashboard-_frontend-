import React from 'react';
import { Menu, Search, Bell, ChevronDown, X, Sun, Moon } from 'lucide-react';

/**
 * Top Header Navigation Bar matching reference screenshot & user requirements
 */
export default function TopHeader({
  user,
  onSignOut,
  searchQuery,
  onSearchChange,
  mobileSidebarOpen,
  onToggleMobileSidebar,
  theme,
  toggleTheme
}) {
  return (
    <header className="top-header-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flex: 1 }}>
        {/* Hamburger Menu Toggle (Mobile & Desktop) */}
        <button
          onClick={onToggleMobileSidebar}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.25rem'
          }}
          aria-label="Toggle Navigation Sidebar"
        >
          {mobileSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Global Search Bar (Filters Name, Email, Team, Roll Number) */}
        <div className="header-search-wrapper">
          <input
            type="text"
            className="header-search-input"
            placeholder="Search members, teams, projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Search 
            size={16} 
            style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} 
          />
        </div>
      </div>

      {/* Right User Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Inline Theme Toggle Button */}
        {toggleTheme && (
          <button
            onClick={toggleTheme}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--input-bg)',
              border: '1px solid var(--card-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-main)',
              cursor: 'pointer'
            }}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          </button>
        )}

        {/* Notification Bell */}
        <div style={{ position: 'relative', cursor: 'pointer' }} title="Notifications">
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--input-bg)',
            border: '1px solid var(--card-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)'
          }}>
            <Bell size={18} />
          </div>
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: '#EA4335',
            color: '#FFFFFF',
            fontSize: '0.65rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #FFFFFF'
          }}>
            3
          </span>
        </div>

        {/* Dynamic Logged-in User Profile Pill */}
        {user && (
          <div className="header-user-pill" onClick={onSignOut} title="Click to Sign Out">
            <img
              src={user.profilePhoto || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
              alt={user.name}
              style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
              }}
            />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                Hello, {user.name} 👋
              </div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                <span>{user.team} Team</span>
                <ChevronDown size={12} />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

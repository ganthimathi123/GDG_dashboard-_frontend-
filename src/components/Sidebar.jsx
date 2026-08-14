import React from 'react';
import { LayoutDashboard, Users, Shield, FolderGit2, BarChart3, Settings, ChevronDown, Code, UserPlus, RefreshCw } from 'lucide-react';

/**
 * Dark Sidebar Component featuring Quick Actions at the bottom left
 */
export default function Sidebar({ activeSection, onSelectSection, onOpenAddModal, onOpenSwitchTeam }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'people', label: 'People', icon: Users },
    { id: 'teams', label: 'Teams', icon: Shield },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="dark-sidebar">
      <div>
        {/* Top Brand Logo */}
        <div className="sidebar-logo-row">
          <svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M38 25L15 50L38 75" stroke="#4285F4" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M62 25L85 50L62 75" stroke="#34A853" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="38" r="5" fill="#EA4335" />
            <circle cx="50" cy="62" r="5" fill="#FBBC04" />
          </svg>
          <span style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em' }}>
            Google Developer Group
          </span>
        </div>

        {/* HR Dashboard Dropdown Pill */}
        <div className="sidebar-dropdown-pill">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LayoutDashboard size={16} style={{ color: '#60A5FA' }} />
            <span>HR Dashboard</span>
          </div>
          <ChevronDown size={16} style={{ color: '#94A3B8' }} />
        </div>

        {/* Navigation List */}
        <nav className="sidebar-nav-list" style={{ marginBottom: '1.75rem' }}>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => onSelectSection(item.id)}
              >
                <IconComponent size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Actions in Blue Dark Sidebar */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 'var(--radius-lg)',
          padding: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ fontSize: '0.775rem', fontWeight: 800, color: '#93C5FD', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>
            Quick Actions
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <button className="sidebar-action-btn" onClick={onOpenAddModal}>
              <UserPlus size={15} style={{ color: '#34A853' }} />
              <span>Add People</span>
            </button>

            <button className="sidebar-action-btn" onClick={onOpenSwitchTeam}>
              <RefreshCw size={15} style={{ color: '#60A5FA' }} />
              <span>Switch Team</span>
            </button>

            <button className="sidebar-action-btn" onClick={() => onSelectSection('projects')}>
              <FolderGit2 size={15} style={{ color: '#A78BFA' }} />
              <span>View All Projects</span>
            </button>

            <button className="sidebar-action-btn" onClick={() => alert('Generate Report: HR metrics export initialized.')}>
              <BarChart3 size={15} style={{ color: '#FBBF24' }} />
              <span>Generate Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Promo Card */}
      <div className="sidebar-promo-card">
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          marginBottom: '0.75rem'
        }}>
          <Users size={16} />
        </div>
        <p style={{ fontSize: '0.8rem', color: '#E2E8F0', lineHeight: '1.4', marginBottom: '0.85rem' }}>
          Empowering developers to build for the future.
        </p>
        
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.725rem',
          fontWeight: 700,
          color: '#93C5FD'
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34A853' }} />
          <span>GDG Community</span>
          <Code size={12} style={{ marginLeft: 'auto', opacity: 0.7 }} />
        </div>
      </div>
    </aside>
  );
}

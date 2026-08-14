import React from 'react';
import { LayoutDashboard, Calendar, ClipboardCheck, Award, Users, Settings, ChevronDown, Sparkles } from 'lucide-react';

/**
 * Event Management Dark Navy Sidebar matching reference screenshot
 */
export default function EventSidebar({ activeSection, onSelectSection }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="dark-sidebar" style={{ background: '#0D1127' }}>
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

        {/* Event Management Dropdown Sub-header */}
        <div className="sidebar-dropdown-pill" style={{ background: 'rgba(99, 102, 241, 0.15)', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={16} style={{ color: '#A78BFA' }} />
            <span style={{ color: '#E0E7FF' }}>Event Management Team</span>
          </div>
          <ChevronDown size={16} style={{ color: '#A5B4FC' }} />
        </div>

        {/* Navigation List */}
        <nav className="sidebar-nav-list">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => onSelectSection(item.id)}
                style={isActive ? { background: '#6366F1', color: '#FFFFFF', boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)' } : {}}
              >
                <IconComponent size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Promo Card */}
      <div className="sidebar-promo-card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.08) 100%)', borderColor: 'rgba(99, 102, 241, 0.25)' }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(99, 102, 241, 0.25)',
          color: '#C7D2FE',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '0.75rem'
        }}>
          <Calendar size={18} />
        </div>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.25rem' }}>
          Build. Learn. Connect.
        </h4>
        <p style={{ fontSize: '0.785rem', color: '#C7D2FE', lineHeight: '1.4', marginBottom: '0.85rem' }}>
          Organize impactful events and create amazing experiences.
        </p>
        
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.725rem',
          fontWeight: 700,
          color: '#E0E7FF'
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34A853' }} />
          <span>GDG Community</span>
          <Sparkles size={12} style={{ marginLeft: 'auto', color: '#FBBF24' }} />
        </div>
      </div>
    </aside>
  );
}

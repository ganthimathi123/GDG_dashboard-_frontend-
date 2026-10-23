import React from 'react';

/**
 * Dark Sidebar Component
 */
export default function Sidebar({ mobileOpen = false, onCloseMobile }) {
  return (
    <>
      {mobileOpen && (
        <div className="sidebar-mobile-backdrop" onClick={onCloseMobile} />
      )}
      <aside className={`dark-sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
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
        </div>
      </aside>
    </>
  );
}

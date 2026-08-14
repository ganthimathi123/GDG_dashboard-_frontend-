import React from 'react';

/**
 * Clean GDG Logo Icon with Google Color Brackets ({ }) & Modern Typography
 */
export default function GdgLogo({ size = 'medium' }) {
  const isSmall = size === 'small';
  
  return (
    <div className="gdg-logo-group" style={{ display: 'inline-flex', alignItems: 'center', gap: isSmall ? '0.5rem' : '0.75rem' }}>
      {/* GDG Brackets Vector */}
      <svg 
        width={isSmall ? "32" : "42"} 
        height={isSmall ? "32" : "42"} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        {/* Left Angle Bracket '<' in Google Blue & Red */}
        <path 
          d="M38 25L15 50L38 75" 
          stroke="#4285F4" 
          strokeWidth="14" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        {/* Right Angle Bracket '>' in Google Green & Yellow */}
        <path 
          d="M62 25L85 50L62 75" 
          stroke="#34A853" 
          strokeWidth="14" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        {/* Center Accent Dots */}
        <circle cx="50" cy="38" r="5" fill="#EA4335" />
        <circle cx="50" cy="62" r="5" fill="#FBBC04" />
      </svg>

      {/* GDG Community Brand Text */}
      <div style={{ textAlign: 'left' }}>
        <div style={{ 
          fontFamily: "'Plus Jakarta Sans', sans-serif", 
          fontWeight: 800, 
          fontSize: isSmall ? '0.95rem' : '1.15rem', 
          lineHeight: 1.1,
          color: '#1F2937',
          letterSpacing: '-0.02em'
        }}>
          GDG <span style={{ color: '#4285F4' }}>Hub</span>
        </div>
        <div style={{ 
          fontFamily: "'Plus Jakarta Sans', sans-serif", 
          fontWeight: 600, 
          fontSize: isSmall ? '0.65rem' : '0.725rem', 
          color: '#6B7280',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          marginTop: '2px'
        }}>
          Google Developer Groups
        </div>
      </div>
    </div>
  );
}

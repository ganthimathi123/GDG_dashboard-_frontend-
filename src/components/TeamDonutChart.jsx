import React from 'react';

/**
 * Donut Chart Component matching "Team Overview" widget in reference screenshot
 */
export default function TeamDonutChart({ stats }) {
  const hrPct = ((stats.hrCount / (stats.totalMembers || 1)) * 100).toFixed(2);
  const techPct = ((stats.techCount / (stats.totalMembers || 1)) * 100).toFixed(2);
  const eventPct = ((stats.eventCount / (stats.totalMembers || 1)) * 100).toFixed(2);

  return (
    <div className="widget-card" style={{ flex: 1 }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Team Overview
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Visual distribution of members across teams
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        {/* SVG Donut Chart */}
        <div style={{ position: 'relative', width: '150px', height: '150px', flexShrink: 0 }}>
          <svg width="150" height="150" viewBox="0 0 42 42">
            <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#E2E8F0" strokeWidth="5" />
            {/* Tech Team Slice (Purple #8B5CF6) */}
            <circle
              cx="21"
              cy="21"
              r="15.91549430918954"
              fill="transparent"
              stroke="#8B5CF6"
              strokeWidth="5"
              strokeDasharray="44.44 55.56"
              strokeDashoffset="25"
            />
            {/* Event Management Slice (Orange #F97316) */}
            <circle
              cx="21"
              cy="21"
              r="15.91549430918954"
              fill="transparent"
              stroke="#F97316"
              strokeWidth="5"
              strokeDasharray="33.33 66.67"
              strokeDashoffset="-19.44"
            />
            {/* HR Team Slice (Green #10B981) */}
            <circle
              cx="21"
              cy="21"
              r="15.91549430918954"
              fill="transparent"
              stroke="#10B981"
              strokeWidth="5"
              strokeDasharray="22.22 77.78"
              strokeDashoffset="-52.77"
            />
          </svg>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1, minWidth: '180px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }} />
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>HR Team</span>
            </div>
            <span style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>
              {stats.hrCount} ({hrPct}%)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#8B5CF6' }} />
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Tech Team</span>
            </div>
            <span style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>
              {stats.techCount} ({techPct}%)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F97316' }} />
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Event Management</span>
            </div>
            <span style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>
              {stats.eventCount} ({eventPct}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

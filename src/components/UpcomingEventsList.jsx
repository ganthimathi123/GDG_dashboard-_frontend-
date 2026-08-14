import React from 'react';
import { Users, ChevronRight, MapPin, Globe } from 'lucide-react';

/**
 * Upcoming Events Component matching reference screenshot
 */
export default function UpcomingEventsList({ events, onSelectEvent, onOpenAllEvents }) {
  const upcoming = events.filter(e => e.status !== 'Completed').slice(0, 3);

  return (
    <div className="widget-card" style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Upcoming Events
        </h3>
        <button className="view-all-link" onClick={onOpenAllEvents}>
          <span>View all</span>
          <ChevronRight size={14} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {upcoming.length === 0 ? (
          <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            No upcoming events scheduled.
          </div>
        ) : (
          upcoming.map((evt) => (
            <div
              key={evt.id}
              onClick={() => onSelectEvent && onSelectEvent(evt)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.9rem 1rem',
                background: 'var(--input-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', overflow: 'hidden' }}>
                {/* Date Tag Box */}
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: 'var(--radius-sm)',
                  background: evt.monthTag === 'JUN' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.1)',
                  color: evt.monthTag === 'JUN' ? '#10B981' : '#EF4444',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.05em' }}>{evt.monthTag}</span>
                  <span style={{ fontSize: '1.15rem', fontWeight: 900, lineHeight: 1 }}>{evt.dayTag}</span>
                </div>

                <div style={{ overflow: 'hidden' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {evt.name}
                  </h4>
                  <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.15rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>{evt.displayDate} &bull; {evt.time}</span>
                  </div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-light)', marginTop: '0.15rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    {evt.type === 'Online' ? <Globe size={12} style={{ color: '#2563EB' }} /> : <MapPin size={12} style={{ color: '#EF4444' }} />}
                    <span>{evt.type}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Users size={14} /> {evt.registeredCount}
                </span>
                <ChevronRight size={18} style={{ color: 'var(--text-light)' }} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

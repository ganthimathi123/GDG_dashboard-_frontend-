import React from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * Recent Event Attendance Component matching reference screenshot
 */
export default function RecentAttendanceList({ summary, onOpenAttendanceModal, onOpenAllAttendance }) {
  const records = summary || [
    { eventName: 'DevFest 2026', date: 'May 18, 2026', type: 'Offline', presentCount: 120, totalRegistered: 150 },
    { eventName: 'Web Development Workshop', date: 'May 10, 2026', type: 'Offline', presentCount: 45, totalRegistered: 60 },
    { eventName: 'AI/ML Study Jam', date: 'May 5, 2026', type: 'Online', presentCount: 21, totalRegistered: 30 },
    { eventName: 'Cloud Computing Session', date: 'Apr 28, 2026', type: 'Online', presentCount: 23, totalRegistered: 40 }
  ];

  return (
    <div className="widget-card" style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Recent Attendance
        </h3>
        <button className="view-all-link" onClick={onOpenAllAttendance}>
          <span>View all</span>
          <ChevronRight size={14} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {records.map((item, idx) => {
          const ratio = (item.presentCount / item.totalRegistered) * 100;
          const strokeDash = `${ratio} ${100 - ratio}`;
          const color = ratio > 75 ? '#10B981' : ratio > 50 ? '#F59E0B' : '#EF4444';

          return (
            <div
              key={idx}
              onClick={() => onOpenAttendanceModal && onOpenAttendanceModal(item)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                background: 'var(--input-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ overflow: 'hidden' }}>
                <h4 style={{ fontSize: '0.925rem', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.eventName}
                </h4>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  {item.date} &bull; {item.type}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexShrink: 0 }}>
                {/* Donut Progress Ring */}
                <div style={{ position: 'relative', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="38" height="38" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#E2E8F0" strokeWidth="4" />
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke={color}
                      strokeWidth="4"
                      strokeDasharray={strokeDash}
                      strokeDashoffset="25"
                    />
                  </svg>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {item.presentCount}/{item.totalRegistered}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    Present
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

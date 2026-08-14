import React from 'react';
import { Award, ClipboardCheck, Users } from 'lucide-react';

/**
 * Three Main Action Cards for Event Management Dashboard matching reference screenshot
 */
export default function EventActionCards({
  onOpenGenerateCertificate,
  onOpenMarkAttendance,
  onOpenViewStudents
}) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.25rem',
      marginBottom: '2.25rem'
    }}>
      {/* Card 1: Certificate Generation */}
      <div className="widget-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.6rem 1.4rem' }}>
        <div>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(139, 92, 246, 0.12)',
            color: '#8B5CF6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.2rem'
          }}>
            <Award size={24} />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
            Certificate Generation
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.45', marginBottom: '1.5rem' }}>
            Create and download certificates for event participants.
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={onOpenGenerateCertificate}
          style={{ background: '#7C3AED', width: 'auto', alignSelf: 'flex-start', padding: '0.65rem 1.25rem', fontSize: '0.875rem' }}
        >
          Generate Certificate
        </button>
      </div>

      {/* Card 2: Attendance Marking */}
      <div className="widget-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.6rem 1.4rem' }}>
        <div>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(16, 185, 129, 0.12)',
            color: '#10B981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.2rem'
          }}>
            <ClipboardCheck size={24} />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
            Attendance Marking
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.45', marginBottom: '1.5rem' }}>
            Record attendance for event participants.
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={onOpenMarkAttendance}
          style={{ background: '#059669', width: 'auto', alignSelf: 'flex-start', padding: '0.65rem 1.25rem', fontSize: '0.875rem' }}
        >
          Mark Attendance
        </button>
      </div>

      {/* Card 3: Students */}
      <div className="widget-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.6rem 1.4rem' }}>
        <div>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(37, 99, 235, 0.12)',
            color: '#2563EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.2rem'
          }}>
            <Users size={24} />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
            Students
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.45', marginBottom: '1.5rem' }}>
            View all registered students across events.
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={onOpenViewStudents}
          style={{ background: '#2563EB', width: 'auto', alignSelf: 'flex-start', padding: '0.65rem 1.25rem', fontSize: '0.875rem' }}
        >
          View Students
        </button>
      </div>
    </div>
  );
}

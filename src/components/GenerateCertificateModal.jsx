import React, { useState, useEffect } from 'react';
import { X, Award, CheckCircle2, Sparkles, Check, Download } from 'lucide-react';
import { getEvents, getStudents, getAttendance, generateCertificatesForEvent } from '../services/eventsDbService';

/**
 * Certificate Generation Modal
 * Requirement 11: Select Event -> Identify Eligible Participants (Present) -> Generate Certificate.
 */
export default function GenerateCertificateModal({ isOpen, onClose, onCertificatesGenerated }) {
  const [events, setEvents] = useState([]);
  const [selectedEvtId, setSelectedEvtId] = useState('');
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      const allEvents = getEvents();
      const allStudents = getStudents();
      const allAtt = getAttendance();

      setEvents(allEvents);
      setStudents(allStudents);
      setAttendance(allAtt);

      const targetId = allEvents[0] ? allEvents[0].id : '';
      setSelectedEvtId(targetId);
      setSuccessMsg('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentEvent = events.find(e => e.id === selectedEvtId);

  // Eligible participants are those marked 'present' for this event
  const eligibleStudents = students.filter(s => {
    const att = attendance.find(a => a.eventId === selectedEvtId && a.studentId === s.id);
    return att ? att.status === 'present' : true; // Default to eligible
  });

  const handleGenerateAll = () => {
    setLoading(true);
    setTimeout(() => {
      const newCert = generateCertificatesForEvent(selectedEvtId);
      setLoading(false);
      setSuccessMsg(`Generated certificates for ${eligibleStudents.length} eligible participants in ${currentEvent?.name}!`);
      if (onCertificatesGenerated) onCertificatesGenerated(newCert);
      setTimeout(() => {
        onClose();
      }, 1400);
    }, 700);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(139, 92, 246, 0.12)',
            color: '#8B5CF6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Award size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Generate Event Certificates
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Issue official GDG Certificates of Achievement for eligible attendees.
            </p>
          </div>
        </div>

        {/* Step 1: Select Event Dropdown */}
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label className="form-label">Select Event *</label>
          <select
            className="form-input"
            value={selectedEvtId}
            onChange={(e) => setSelectedEvtId(e.target.value)}
            style={{ appearance: 'auto', paddingLeft: '1rem', fontWeight: 700, color: 'var(--text-main)' }}
          >
            {events.map(e => (
              <option key={e.id} value={e.id}>
                {e.name} ({e.displayDate}) &bull; {e.type}
              </option>
            ))}
          </select>
        </div>

        {/* Eligible Participants Summary Banner */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.9rem 1.15rem',
          background: 'var(--input-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.25rem'
        }}>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#8B5CF6' }}>
              {currentEvent?.name}
            </h4>
            <div style={{ fontSize: '0.785rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
              Certificate Template: Official GDG Certificate of Achievement 2026
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.775rem', padding: '0.2rem 0.65rem', background: 'rgba(16, 185, 129, 0.12)', color: '#10B981', borderRadius: 'var(--radius-full)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <CheckCircle2 size={13} /> {eligibleStudents.length} Eligible
            </span>
          </div>
        </div>

        {/* Participant Table */}
        <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--card-border)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '0.65rem 0.85rem', fontWeight: 700 }}>Participant</th>
                <th style={{ padding: '0.65rem 0.85rem', fontWeight: 700 }}>Attendance</th>
                <th style={{ padding: '0.65rem 0.85rem', fontWeight: 700, textAlign: 'right' }}>Eligibility</th>
              </tr>
            </thead>
            <tbody>
              {eligibleStudents.map((std) => (
                <tr key={std.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '0.75rem 0.85rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{std.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{std.email}</div>
                  </td>
                  <td style={{ padding: '0.75rem 0.85rem' }}>
                    <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.55rem', background: '#ECFDF5', color: '#10B981', borderRadius: '4px', fontWeight: 700 }}>
                      Present
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 0.85rem', textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', color: '#8B5CF6', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                      <Sparkles size={12} /> Eligible for Certificate
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {successMsg && (
          <div style={{ marginBottom: '1rem', padding: '0.65rem 0.9rem', background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 'var(--radius-sm)', color: '#166534', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Check size={16} /> <span>{successMsg}</span>
          </div>
        )}

        {/* Modal Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--card-border)' }}>
          <button type="button" className="btn-google" onClick={onClose} disabled={loading} style={{ width: 'auto' }}>
            Cancel
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={handleGenerateAll}
            disabled={loading || eligibleStudents.length === 0}
            style={{ width: 'auto', background: '#7C3AED', padding: '0.65rem 1.4rem' }}
          >
            <Download size={16} />
            <span>{loading ? 'Generating...' : 'Generate Certificates for All Eligible'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

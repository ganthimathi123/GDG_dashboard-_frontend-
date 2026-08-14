import React, { useState, useEffect } from 'react';
import { X, ClipboardCheck, Check, CheckCircle2, XCircle, Save, AlertCircle } from 'lucide-react';
import { getEvents, getStudents, getAttendance, saveEventAttendance } from '../services/eventsDbService';

/**
 * Attendance Marking Modal
 * Requirement 8: Select Event -> Display registered participants -> Mark Present/Absent -> Save Attendance.
 */
export default function MarkAttendanceModal({ isOpen, onClose, selectedEventId = '', onAttendanceSaved }) {
  const [events, setEvents] = useState([]);
  const [selectedEvtId, setSelectedEvtId] = useState('');
  const [students, setStudents] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({}); // { studentId: 'present' | 'absent' }
  const [loading, setLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const allEvents = getEvents();
      const allStudents = getStudents();
      const allAtt = getAttendance();

      setEvents(allEvents);
      setStudents(allStudents);

      const targetId = selectedEventId || (allEvents[0] ? allEvents[0].id : '');
      setSelectedEvtId(targetId);

      // Pre-fill existing attendance for this event
      const initialMap = {};
      allStudents.forEach(s => {
        const existing = allAtt.find(a => a.eventId === targetId && a.studentId === s.id);
        initialMap[s.id] = existing ? existing.status : 'present';
      });
      setAttendanceMap(initialMap);
      setSavedSuccess(false);
    }
  }, [isOpen, selectedEventId]);

  if (!isOpen) return null;

  const currentEvent = events.find(e => e.id === selectedEvtId);

  const handleEventSelect = (evtId) => {
    setSelectedEvtId(evtId);
    const allAtt = getAttendance();
    const newMap = {};
    students.forEach(s => {
      const existing = allAtt.find(a => a.eventId === evtId && a.studentId === s.id);
      newMap[s.id] = existing ? existing.status : 'present';
    });
    setAttendanceMap(newMap);
  };

  const toggleStatus = (studentId, status) => {
    setAttendanceMap(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      saveEventAttendance(selectedEvtId, attendanceMap);
      setLoading(false);
      setSavedSuccess(true);
      if (onAttendanceSaved) onAttendanceSaved(selectedEvtId, attendanceMap);
      setTimeout(() => {
        onClose();
      }, 1200);
    }, 600);
  };

  const presentCount = Object.values(attendanceMap).filter(s => s === 'present').length;

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
            background: 'rgba(16, 185, 129, 0.12)',
            color: '#10B981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ClipboardCheck size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Mark Event Attendance
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Record participant attendance for a specific GDG event.
            </p>
          </div>
        </div>

        {/* Step 1: Select Event Dropdown */}
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label className="form-label">Select Event *</label>
          <select
            className="form-input"
            value={selectedEvtId}
            onChange={(e) => handleEventSelect(e.target.value)}
            style={{ appearance: 'auto', paddingLeft: '1rem', fontWeight: 700, color: 'var(--text-main)' }}
          >
            {events.map(e => (
              <option key={e.id} value={e.id}>
                {e.name} ({e.displayDate}) &bull; {e.type}
              </option>
            ))}
          </select>
        </div>

        {/* Event Details Summary Banner */}
        {currentEvent && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.85rem 1.15rem',
            background: 'var(--input-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.25rem'
          }}>
            <div>
              <h4 style={{ fontSize: '0.975rem', fontWeight: 800, color: 'var(--google-blue)' }}>{currentEvent.name}</h4>
              <div style={{ fontSize: '0.785rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                Date: {currentEvent.displayDate} &bull; Location: {currentEvent.venue}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#10B981' }}>
                {presentCount} / {students.length}
              </div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 600 }}>Present Count</div>
            </div>
          </div>
        )}

        {/* Step 2: Registered Participants Table */}
        <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--card-border)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '0.65rem 0.85rem', fontWeight: 700 }}>Participant</th>
                <th style={{ padding: '0.65rem 0.85rem', fontWeight: 700 }}>Registration ID</th>
                <th style={{ padding: '0.65rem 0.85rem', fontWeight: 700, textAlign: 'right' }}>Attendance Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((std) => {
                const status = attendanceMap[std.id] || 'present';
                const isPresent = status === 'present';

                return (
                  <tr key={std.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '0.75rem 0.85rem' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{std.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{std.email}</div>
                    </td>
                    <td style={{ padding: '0.75rem 0.85rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {std.registrationNumber}
                    </td>
                    <td style={{ padding: '0.75rem 0.85rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                        <button
                          type="button"
                          onClick={() => toggleStatus(std.id, 'present')}
                          style={{
                            padding: '0.35rem 0.75rem',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid',
                            borderColor: isPresent ? '#10B981' : 'var(--card-border)',
                            background: isPresent ? '#10B981' : 'var(--input-bg)',
                            color: isPresent ? '#FFFFFF' : 'var(--text-muted)',
                            fontSize: '0.775rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                          }}
                        >
                          <CheckCircle2 size={13} /> Present
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleStatus(std.id, 'absent')}
                          style={{
                            padding: '0.35rem 0.75rem',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid',
                            borderColor: !isPresent ? '#EF4444' : 'var(--card-border)',
                            background: !isPresent ? '#EF4444' : 'var(--input-bg)',
                            color: !isPresent ? '#FFFFFF' : 'var(--text-muted)',
                            fontSize: '0.775rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                          }}
                        >
                          <XCircle size={13} /> Absent
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {savedSuccess && (
          <div style={{ marginBottom: '1rem', padding: '0.65rem 0.9rem', background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 'var(--radius-sm)', color: '#166534', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Check size={16} /> <span>Attendance saved successfully for {currentEvent?.name}!</span>
          </div>
        )}

        {/* Modal Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--card-border)' }}>
          <button type="button" className="btn-google" onClick={onClose} disabled={loading} style={{ width: 'auto' }}>
            Cancel
          </button>
          <button type="button" className="btn-primary" onClick={handleSave} disabled={loading} style={{ width: 'auto', background: '#059669', padding: '0.65rem 1.4rem' }}>
            <Save size={16} />
            <span>{loading ? 'Saving...' : 'Save Attendance'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

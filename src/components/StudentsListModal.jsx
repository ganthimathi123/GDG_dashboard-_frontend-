import React, { useState } from 'react';
import { X, Users, Search, Plus, Award, CheckCircle2, XCircle } from 'lucide-react';
import { getStudents, addStudent } from '../services/eventsDbService';

/**
 * Registered Students Roster & Profile Inspector Modal
 * Requirement 10: View & manage registered students across events.
 */
export default function StudentsListModal({ isOpen, onClose }) {
  const [students, setStudents] = useState(getStudents());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [addMode, setAddMode] = useState(false);

  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
    registrationNumber: '',
    collegeName: 'RMK Engineering College'
  });

  if (!isOpen) return null;

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.registrationNumber && s.registrationNumber.includes(searchQuery))
  );

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.email) return;

    const created = addStudent(newStudent);
    setStudents(getStudents());
    setAddMode(false);
    setNewStudent({
      name: '',
      email: '',
      phone: '',
      registrationNumber: '',
      collegeName: 'RMK Engineering College'
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(37, 99, 235, 0.12)',
              color: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Users size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Registered Event Students ({students.length})
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Manage student records, event attendance, and certificate statuses.
              </p>
            </div>
          </div>

          <button
            className="btn-primary"
            onClick={() => setAddMode(!addMode)}
            style={{ width: 'auto', padding: '0.55rem 1rem', fontSize: '0.825rem' }}
          >
            <Plus size={16} />
            <span>{addMode ? 'Cancel' : 'Add Student'}</span>
          </button>
        </div>

        {addMode ? (
          <form onSubmit={handleAddSubmit} style={{ background: 'var(--input-bg)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)', marginBottom: '1.25rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--google-blue)', marginBottom: '0.85rem' }}>
              Register New Student
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Full Name *"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                required
              />
              <input
                type="email"
                className="form-input"
                placeholder="Email Address *"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                required
              />
              <input
                type="text"
                className="form-input"
                placeholder="Registration Number (e.g. 111721104001)"
                value={newStudent.registrationNumber}
                onChange={(e) => setNewStudent({ ...newStudent, registrationNumber: e.target.value })}
              />
              <input
                type="text"
                className="form-input"
                placeholder="College Name"
                value={newStudent.collegeName}
                onChange={(e) => setNewStudent({ ...newStudent, collegeName: e.target.value })}
              />
            </div>
            <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '0.5rem 1.25rem' }}>
              Save Student Record
            </button>
          </form>
        ) : null}

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search student name, email, or registration number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--card-border)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '0.65rem 0.85rem', fontWeight: 700 }}>Student</th>
                <th style={{ padding: '0.65rem 0.85rem', fontWeight: 700 }}>Reg Number</th>
                <th style={{ padding: '0.65rem 0.85rem', fontWeight: 700 }}>Registered Events</th>
                <th style={{ padding: '0.65rem 0.85rem', fontWeight: 700, textAlign: 'right' }}>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((std) => (
                <tr
                  key={std.id}
                  style={{ borderBottom: '1px solid #F1F5F9', cursor: 'pointer' }}
                  onClick={() => setSelectedStudent(std)}
                >
                  <td style={{ padding: '0.75rem 0.85rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{std.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{std.email}</div>
                  </td>
                  <td style={{ padding: '0.75rem 0.85rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {std.registrationNumber}
                  </td>
                  <td style={{ padding: '0.75rem 0.85rem' }}>
                    <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.55rem', background: '#EFF6FF', color: '#2563EB', borderRadius: '4px', fontWeight: 700 }}>
                      DevFest 2026, Web Workshop
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 0.85rem', textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                      <CheckCircle2 size={13} /> Present
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected Student Details Drawer */}
        {selectedStudent && (
          <div style={{ marginTop: '1.25rem', padding: '1.25rem', background: 'var(--input-bg)', border: '1px solid var(--card-border)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--google-blue)' }}>
                {selectedStudent.name} &bull; Academic Roster Detail
              </h4>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setSelectedStudent(null)}>
                <X size={16} />
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', fontSize: '0.825rem' }}>
              <div><span style={{ color: 'var(--text-muted)', display: 'block' }}>College</span> <strong>{selectedStudent.collegeName}</strong></div>
              <div><span style={{ color: 'var(--text-muted)', display: 'block' }}>Registration ID</span> <strong>{selectedStudent.registrationNumber}</strong></div>
              <div><span style={{ color: 'var(--text-muted)', display: 'block' }}>Certificates</span> <strong>DevFest 2026 (Generated)</strong></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

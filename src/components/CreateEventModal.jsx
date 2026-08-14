import React, { useState } from 'react';
import { X, Calendar, Plus, MapPin, Globe, Clock, Users, AlertCircle } from 'lucide-react';
import { createEvent } from '../services/eventsDbService';

/**
 * Modal Form to Create New GDG Events
 * Requirement 15: Event Name, Description, Date, Time, Type (Offline/Online), Venue, Capacity.
 */
export default function CreateEventModal({ isOpen, onClose, onEventCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM – 01:00 PM',
    type: 'Offline',
    venue: 'Auditorium Hall B, RMKEC',
    maxParticipants: 100
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Event Name is required.');
      return;
    }

    setLoading(true);

    try {
      const dateObj = new Date(formData.date);
      const monthTag = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
      const dayTag = dateObj.getDate().toString().padStart(2, '0');
      const displayDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      const newEvt = createEvent({
        ...formData,
        monthTag,
        dayTag,
        displayDate
      });

      if (onEventCreated) onEventCreated(newEvt);
      onClose();
      setFormData({
        name: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        time: '10:00 AM – 01:00 PM',
        type: 'Offline',
        venue: 'Auditorium Hall B, RMKEC',
        maxParticipants: 100
      });
    } catch (err) {
      setError(err.message || 'Failed to create event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(99, 102, 241, 0.12)',
            color: '#6366F1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Calendar size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Create New GDG Event
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Schedule an upcoming workshop, hackathon, or study jam.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="evt-name">Event Name *</label>
            <input
              id="evt-name"
              type="text"
              className="form-input"
              style={{ paddingLeft: '1rem' }}
              placeholder="e.g. Flutter Workshop / AI Study Jam"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="evt-desc">Event Description</label>
            <textarea
              id="evt-desc"
              className="form-input"
              style={{ paddingLeft: '1rem', height: '70px', resize: 'vertical' }}
              placeholder="Short overview of topics covered..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Event Date *</label>
              <input
                type="date"
                className="form-input"
                style={{ paddingLeft: '1rem' }}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Time Duration</label>
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '1rem' }}
                placeholder="10:00 AM – 01:00 PM"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Event Format *</label>
              <select
                className="form-input"
                style={{ paddingLeft: '1rem', appearance: 'auto' }}
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="Offline">Offline (On Campus)</option>
                <option value="Online">Online (Virtual)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Max Participants Capacity</label>
              <input
                type="number"
                className="form-input"
                style={{ paddingLeft: '1rem' }}
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Venue / Meeting Link</label>
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '1rem' }}
              placeholder="Auditorium Hall B, RMKEC or Google Meet URL"
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
            />
          </div>

          {error && (
            <div style={{ margin: '1rem 0', padding: '0.65rem 0.9rem', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 'var(--radius-sm)', color: '#991B1B', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <AlertCircle size={16} /> <span>{error}</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--card-border)' }}>
            <button type="button" className="btn-google" onClick={onClose} disabled={loading} style={{ width: 'auto' }}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading} style={{ width: 'auto', background: '#6366F1', padding: '0.65rem 1.5rem' }}>
              {loading ? 'Creating...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

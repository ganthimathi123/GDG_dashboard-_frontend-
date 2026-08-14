import React, { useState } from 'react';
import { X, UserPlus, User, Mail, Phone, BookOpen, Shield, Calendar, Image, Check, AlertCircle, UploadCloud, Link as LinkIcon, Trash2, Hash } from 'lucide-react';
import { addMember } from '../services/dbService';

/**
 * Modal Form for HR to Add New Members to GDG Organization
 * Features default college "RMK Engineering College", Registration Number, and File Uploads.
 */
export default function AddPeopleModal({ isOpen, onClose, onMemberAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    profilePhoto: '',
    phone: '',
    collegeEmail: '',
    registrationNumber: '',
    collegeName: 'RMK Engineering College',
    team: 'Tech',
    role: 'Software Developer',
    dateJoined: new Date().toISOString().split('T')[0]
  });

  const [photoMode, setPhotoMode] = useState('upload'); // 'upload' | 'url'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  // File Upload Handler
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image file size must be less than 5MB.');
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData(prev => ({ ...prev, profilePhoto: event.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.collegeEmail.trim()) {
      setError('Full Name and College Email ID are required.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.collegeEmail.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const created = addMember(formData);
      onMemberAdded(created);
      onClose();
      // Reset form
      setFormData({
        name: '',
        profilePhoto: '',
        phone: '',
        collegeEmail: '',
        registrationNumber: '',
        collegeName: 'RMK Engineering College',
        team: 'Tech',
        role: 'Software Developer',
        dateJoined: new Date().toISOString().split('T')[0]
      });
    } catch (err) {
      setError(err.message || 'Failed to add new person.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--google-blue-light)',
            color: 'var(--google-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <UserPlus size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Add New Person to GDG
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Register member details and assign them to an active GDG team.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Section 1: Personal Details */}
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--google-blue)', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.04em' }}>
            1. Personal Details
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="add-name">Full Name *</label>
              <div className="input-wrapper">
                <span className="input-icon-left"><User size={16} /></span>
                <input
                  id="add-name"
                  name="name"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Gandhinathi"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="add-phone">Phone Number</label>
              <div className="input-wrapper">
                <span className="input-icon-left"><Phone size={16} /></span>
                <input
                  id="add-phone"
                  name="phone"
                  type="text"
                  className="form-input"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Profile Photo Upload Component */}
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
              <label className="form-label" style={{ marginBottom: 0 }}>Profile Photo</label>
              
              <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--input-bg)', padding: '0.15rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--card-border)' }}>
                <button
                  type="button"
                  onClick={() => setPhotoMode('upload')}
                  style={{
                    padding: '0.2rem 0.55rem',
                    fontSize: '0.725rem',
                    fontWeight: 600,
                    borderRadius: '4px',
                    border: 'none',
                    background: photoMode === 'upload' ? 'var(--card-bg)' : 'transparent',
                    color: photoMode === 'upload' ? 'var(--google-blue)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <UploadCloud size={12} />
                  <span>Upload File</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPhotoMode('url')}
                  style={{
                    padding: '0.2rem 0.55rem',
                    fontSize: '0.725rem',
                    fontWeight: 600,
                    borderRadius: '4px',
                    border: 'none',
                    background: photoMode === 'url' ? 'var(--card-bg)' : 'transparent',
                    color: photoMode === 'url' ? 'var(--google-blue)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <LinkIcon size={12} />
                  <span>Image URL</span>
                </button>
              </div>
            </div>

            {formData.profilePhoto ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                background: 'var(--input-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <img
                    src={formData.profilePhoto}
                    alt="Preview"
                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--google-blue)' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      Photo Selected
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--google-green)', fontWeight: 600 }}>
                      Ready to attach to member profile
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, profilePhoto: '' }))}
                  style={{
                    background: '#FEF2F2',
                    border: '1px solid #FCA5A5',
                    color: '#991B1B',
                    padding: '0.4rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.775rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <Trash2 size={14} />
                  <span>Remove</span>
                </button>
              </div>
            ) : photoMode === 'upload' ? (
              <div>
                <input
                  type="file"
                  id="photo-upload-input"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <label
                  htmlFor="photo-upload-input"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.25rem 1rem',
                    background: 'var(--input-bg)',
                    border: '2px dashed var(--input-border)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  <UploadCloud size={28} style={{ color: 'var(--google-blue)', marginBottom: '0.4rem' }} />
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    Click to upload photo or drag & drop
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Supports PNG, JPG, or WebP (max 5MB)
                  </div>
                </label>
              </div>
            ) : (
              <div className="input-wrapper">
                <span className="input-icon-left"><Image size={16} /></span>
                <input
                  id="add-photo"
                  name="profilePhoto"
                  type="url"
                  className="form-input"
                  placeholder="https://images.unsplash.com/photo-1534528741775-53994a69daeb"
                  value={formData.profilePhoto}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          {/* Section 2: Academic Details */}
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--google-blue)', textTransform: 'uppercase', margin: '1.25rem 0 0.75rem 0', letterSpacing: '0.04em' }}>
            2. Academic Details
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="add-email">College Email ID *</label>
              <div className="input-wrapper">
                <span className="input-icon-left"><Mail size={16} /></span>
                <input
                  id="add-email"
                  name="collegeEmail"
                  type="email"
                  className="form-input"
                  placeholder="name@rmkec.ac.in"
                  value={formData.collegeEmail}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="add-college">College Name</label>
              <div className="input-wrapper">
                <span className="input-icon-left"><BookOpen size={16} /></span>
                <input
                  id="add-college"
                  name="collegeName"
                  type="text"
                  className="form-input"
                  placeholder="RMK Engineering College"
                  value={formData.collegeName}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="add-reg">Registration Number *</label>
            <div className="input-wrapper">
              <span className="input-icon-left"><Hash size={16} /></span>
              <input
                id="add-reg"
                name="registrationNumber"
                type="text"
                className="form-input"
                placeholder="111721104001"
                value={formData.registrationNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Section 3: GDG Department & Role */}
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--google-blue)', textTransform: 'uppercase', margin: '1.25rem 0 0.75rem 0', letterSpacing: '0.04em' }}>
            3. GDG Department & Role
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="add-team">Team / Department *</label>
              <div className="input-wrapper">
                <select
                  id="add-team"
                  name="team"
                  className="form-input"
                  style={{ paddingLeft: '1rem', appearance: 'auto' }}
                  value={formData.team}
                  onChange={handleChange}
                  required
                >
                  <option value="HR">HR</option>
                  <option value="Tech">Tech</option>
                  <option value="Event Management">Event Management</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="add-role">Role / Position *</label>
              <input
                id="add-role"
                name="role"
                type="text"
                className="form-input"
                style={{ paddingLeft: '1rem' }}
                placeholder="Software Developer"
                value={formData.role}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="add-date">Date Joined</label>
              <div className="input-wrapper">
                <input
                  id="add-date"
                  name="dateJoined"
                  type="date"
                  className="form-input"
                  style={{ paddingLeft: '1rem' }}
                  value={formData.dateJoined}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {error && (
            <div style={{ margin: '1rem 0', padding: '0.65rem 0.9rem', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 'var(--radius-sm)', color: '#991B1B', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <AlertCircle size={16} /> <span>{error}</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--card-border)' }}>
            <button
              type="button"
              className="btn-google"
              onClick={onClose}
              disabled={loading}
              style={{ width: 'auto' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ width: 'auto', padding: '0.65rem 1.5rem' }}
            >
              {loading ? 'Adding Member...' : 'Add Person'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { X, RefreshCw, ArrowRight, ShieldCheck } from 'lucide-react';
import { updateMemberTeam } from '../services/dbService';

/**
 * Confirmation Modal for Switching a Member's Team
 */
export default function SwitchTeamModal({ isOpen, onClose, member, onTeamSwitched }) {
  const [newTeam, setNewTeam] = useState(
    member ? (member.team === 'HR' ? 'Tech' : 'HR') : 'Tech'
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !member) return null;

  const availableTeams = ['HR', 'Tech', 'Event Management'].filter(t => t !== member.team);

  const handleConfirm = () => {
    setError('');
    setLoading(true);

    try {
      const updatedMember = updateMemberTeam(member.id, newTeam);
      onTeamSwitched(updatedMember);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to switch team.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} aria-modal="true" role="dialog" style={{ zIndex: 220 }}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
          <X size={18} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'var(--google-blue-light)',
            color: 'var(--google-blue)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.75rem'
          }}>
            <RefreshCw size={24} />
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Switch Team for {member.name}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Transfer this member to another department. Their profile record and project history will be preserved.
          </p>
        </div>

        <div style={{
          padding: '1rem',
          background: 'var(--input-bg)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--card-border)',
          marginBottom: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Current Team</span>
              <strong style={{ color: 'var(--google-blue)' }}>{member.team} Team</strong>
            </div>

            <ArrowRight size={18} style={{ color: 'var(--text-light)' }} />

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Switch To</span>
              <select
                value={newTeam}
                onChange={(e) => setNewTeam(e.target.value)}
                style={{
                  padding: '0.3rem 0.6rem',
                  borderRadius: '6px',
                  border: '1px solid var(--google-blue)',
                  background: 'var(--card-bg)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--text-main)'
                }}
              >
                {availableTeams.map(team => (
                  <option key={team} value={team}>{team} Team</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {error && <div className="error-hint" style={{ marginBottom: '1rem' }}>{error}</div>}

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button type="button" className="btn-google" onClick={onClose} style={{ width: 'auto', padding: '0.75rem 1.25rem' }}>
            Cancel
          </button>
          <button type="button" className="btn-primary" onClick={handleConfirm} disabled={loading} style={{ flex: 1 }}>
            {loading ? (
              <>
                <div className="spinner" />
                <span>Updating Team...</span>
              </>
            ) : (
              <>
                <ShieldCheck size={18} />
                <span>Confirm Team Switch</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

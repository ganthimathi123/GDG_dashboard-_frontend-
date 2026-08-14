import React, { useState } from 'react';
import { X, UserMinus, AlertTriangle } from 'lucide-react';
import { deactivateMember } from '../services/dbService';

/**
 * Destructive Confirmation Modal for Removing a Member from GDG (Soft-Delete)
 */
export default function RemoveMemberModal({ isOpen, onClose, member, onMemberRemoved }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !member) return null;

  const handleConfirmRemove = () => {
    setError('');
    setLoading(true);

    try {
      deactivateMember(member.id);
      onMemberRemoved(member);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to remove member.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} aria-modal="true" role="dialog" style={{ zIndex: 230 }}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px', borderTop: '4px solid var(--google-red)' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
          <X size={18} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'var(--google-red-light)',
            color: 'var(--google-red)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.85rem'
          }}>
            <AlertTriangle size={26} />
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Remove {member.name} from GDG?
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.35rem', lineHeight: '1.45' }}>
            This action will remove the member from the active GDG member list and restrict dashboard access. Historical project records will be preserved.
          </p>
        </div>

        {error && <div className="error-hint" style={{ marginBottom: '1rem' }}>{error}</div>}

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
          <button type="button" className="btn-google" onClick={onClose} style={{ width: 'auto', padding: '0.75rem 1.25rem' }}>
            Cancel
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={handleConfirmRemove}
            disabled={loading}
            style={{ flex: 1, background: 'var(--google-red)', boxShadow: '0 4px 14px rgba(234, 67, 53, 0.35)' }}
          >
            {loading ? (
              <>
                <div className="spinner" />
                <span>Removing Member...</span>
              </>
            ) : (
              <>
                <UserMinus size={18} />
                <span>Remove Member</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

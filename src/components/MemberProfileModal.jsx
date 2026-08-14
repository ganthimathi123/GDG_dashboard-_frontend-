import React, { useState } from 'react';
import { X, User, Phone, Mail, BookOpen, Shield, Calendar, RefreshCw, UserMinus, FolderGit2, CheckCircle2 } from 'lucide-react';
import { getProjects } from '../services/dbService';
import SwitchTeamModal from './SwitchTeamModal';
import RemoveMemberModal from './RemoveMemberModal';

/**
 * Member Profile Modal displaying Complete Profile Details & HR Management Actions
 */
export default function MemberProfileModal({
  isOpen,
  onClose,
  member,
  currentUser,
  onTeamSwitched,
  onMemberRemoved
}) {
  const [switchModalOpen, setSwitchModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  if (!isOpen || !member) return null;

  const isHrUser = currentUser && currentUser.team === 'HR';
  const allProjects = getProjects();

  // Find projects this member is assigned to
  const participatingProjects = allProjects.filter(proj =>
    proj.teamAssignments.some(assign => assign.memberId === member.id)
  );

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} aria-modal="true" role="dialog">
        <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>

          {/* Top Banner Profile Summary */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--card-border)' }}>
            <img
              src={member.profilePhoto}
              alt={member.name}
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--google-blue)',
                boxShadow: '0 6px 16px rgba(66, 133, 244, 0.2)'
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
              }}
            />
            <div>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {member.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--google-blue)' }}>
                  {member.role}
                </span>
                <span style={{ color: 'var(--text-light)' }}>&bull;</span>
                <span style={{
                  padding: '0.15rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--google-blue-light)',
                  color: 'var(--google-blue)',
                  fontSize: '0.775rem',
                  fontWeight: 700
                }}>
                  {member.team} Team
                </span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
            {/* Section A: Basic Information */}
            <div style={{ background: 'var(--input-bg)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)' }}>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--google-blue)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Basic Information
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
                  <Mail size={14} style={{ color: 'var(--text-light)' }} />
                  <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{member.collegeEmail}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
                  <Phone size={14} style={{ color: 'var(--text-light)' }} />
                  <span>{member.phone || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Section B: Academic Information */}
            <div style={{ background: 'var(--input-bg)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)' }}>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--google-blue)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Academic Information
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.825rem' }}>
                <div><span style={{ color: 'var(--text-muted)' }}>College:</span> <strong>{member.collegeName || 'RMK Engineering College'}</strong></div>
                <div><span style={{ color: 'var(--text-muted)' }}>Registration No:</span> <strong>{member.registrationNumber}</strong></div>
                {member.rollNumber && <div><span style={{ color: 'var(--text-muted)' }}>Roll No:</span> <strong>{member.rollNumber}</strong></div>}
              </div>
            </div>
          </div>

          {/* Section C: GDG Information */}
          <div style={{ background: 'var(--input-bg)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)', marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--google-blue)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              GDG Organization Details
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div><span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>Department</span> <strong>{member.team} Team</strong></div>
              <div><span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>Current Role</span> <strong>{member.role}</strong></div>
              <div><span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>Date Joined</span> <strong>{member.dateJoined}</strong></div>
            </div>
          </div>

          {/* Section D: Project Participation Information */}
          <div style={{ background: 'var(--input-bg)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.85rem' }}>
              <FolderGit2 size={16} style={{ color: 'var(--google-blue)' }} />
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', textTransform: 'uppercase' }}>
                Projects Participating In ({participatingProjects.length})
              </h4>
            </div>

            {participatingProjects.length === 0 ? (
              <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                This member is not currently assigned to any active GDG projects.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {participatingProjects.map(proj => {
                  const assignment = proj.teamAssignments.find(a => a.memberId === member.id);
                  const otherMembers = proj.teamAssignments
                    .filter(a => a.memberId !== member.id)
                    .map(a => a.memberName);

                  return (
                    <div
                      key={proj.id}
                      style={{
                        background: 'var(--card-bg)',
                        padding: '0.85rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--card-border)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <strong style={{ fontSize: '0.9rem', color: 'var(--google-blue)' }}>{proj.name}</strong>
                        <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', background: 'var(--google-blue-light)', color: 'var(--google-blue)', borderRadius: '4px', fontWeight: 700 }}>
                          Role: {assignment ? assignment.role : 'Contributor'}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        {proj.description}
                      </p>
                      {otherMembers.length > 0 && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.4rem' }}>
                          Team members: <strong>{otherMembers.join(', ')}</strong>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* HR Management Actions (Restricted to HR users) */}
          {isHrUser && (
            <div style={{ display: 'flex', gap: '0.75rem', borderTop: '1px solid var(--card-border)', paddingTop: '1.25rem' }}>
              <button
                type="button"
                className="btn-google"
                onClick={() => setSwitchModalOpen(true)}
                style={{ flex: 1, padding: '0.65rem', fontSize: '0.85rem' }}
              >
                <RefreshCw size={15} style={{ color: 'var(--google-blue)' }} />
                <span>Switch Team</span>
              </button>

              <button
                type="button"
                className="btn-primary"
                onClick={() => setRemoveModalOpen(true)}
                style={{
                  flex: 1,
                  padding: '0.65rem',
                  fontSize: '0.85rem',
                  background: 'var(--google-red-light)',
                  color: 'var(--google-red)',
                  border: '1px solid rgba(234, 67, 53, 0.3)',
                  boxShadow: 'none'
                }}
              >
                <UserMinus size={15} />
                <span>Remove from GDG</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Nested Modals */}
      <SwitchTeamModal
        isOpen={switchModalOpen}
        onClose={() => setSwitchModalOpen(false)}
        member={member}
        onTeamSwitched={(updatedMember) => {
          onTeamSwitched(updatedMember);
          onClose();
        }}
      />

      <RemoveMemberModal
        isOpen={removeModalOpen}
        onClose={() => setRemoveModalOpen(false)}
        member={member}
        onMemberRemoved={(removedMember) => {
          onMemberRemoved(removedMember);
          onClose();
        }}
      />
    </>
  );
}

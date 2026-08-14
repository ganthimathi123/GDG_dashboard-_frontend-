import React from 'react';
import { FolderGit2, Users, Shield, Code, Calendar } from 'lucide-react';
import { getProjects } from '../services/dbService';

/**
 * Projects Overview Component displaying Person -> Team -> Project mapping
 */
export default function ProjectsOverview() {
  const projects = getProjects();

  const getTeamIcon = (team) => {
    if (team === 'HR') return Shield;
    if (team === 'Tech') return Code;
    return Calendar;
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
          GDG Project Participation Matrix
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          View cross-department team assignments and project leadership mappings.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {projects.map(proj => (
          <div
            key={proj.id}
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--google-blue-light)',
                color: 'var(--google-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FolderGit2 size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>{proj.name}</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{proj.teamAssignments.length} Assigned Members</span>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: '1.45' }}>
              {proj.description}
            </p>

            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.04em' }}>
              Assigned Members & Roles
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {proj.teamAssignments.length === 0 ? (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  No active members assigned.
                </div>
              ) : (
                proj.teamAssignments.map((assign, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.55rem 0.75rem',
                      background: 'var(--input-bg)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--card-border)',
                      fontSize: '0.825rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div className="avatar-circle" style={{ width: 26, height: 26, fontSize: '0.75rem' }}>
                        {assign.memberName[0]}
                      </div>
                      <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{assign.memberName}</span>
                    </div>

                    <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', background: 'var(--google-blue-light)', color: 'var(--google-blue)', borderRadius: '4px', fontWeight: 600 }}>
                      {assign.role}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

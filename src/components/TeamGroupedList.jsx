import React from 'react';
import { Users, MoreVertical, ArrowRight, Plus } from 'lucide-react';

/**
 * Team-Grouped Member Columns matching reference screenshot
 */
export default function TeamGroupedList({ members, onSelectMember, onOpenAddModal }) {
  const teams = [
    { name: 'HR', label: 'HR TEAM', badgeClass: 'pill-hr', color: '#10B981', moreText: '+ 7 more members' },
    { name: 'Tech', label: 'TECH TEAM', badgeClass: 'pill-tech', color: '#8B5CF6', moreText: '+ 17 more members' },
    { name: 'Event Management', label: 'EVENT MANAGEMENT TEAM', badgeClass: 'pill-event', color: '#F97316', moreText: '+ 12 more members' }
  ];

  return (
    <div>
      {/* People Header & + Add People Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            People
          </h2>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            Manage and view members grouped by teams
          </p>
        </div>

        <button 
          className="btn-primary" 
          onClick={onOpenAddModal}
          style={{ padding: '0.6rem 1.15rem', fontSize: '0.85rem' }}
        >
          <Plus size={16} />
          <span>Add People</span>
        </button>
      </div>

      {/* 3 Team Columns */}
      <div className="team-columns-grid">
        {teams.map(team => {
          const teamMembers = members.filter(m => m.team === team.name && m.active !== false);

          return (
            <div key={team.name} className="team-column-card">
              <div>
                {/* Column Header */}
                <div className="team-col-header">
                  <div className="team-col-title">
                    <Users size={16} style={{ color: team.color }} />
                    <span style={{ color: team.color }}>{team.label}</span>
                  </div>
                  <span className={`team-badge-pill ${team.badgeClass}`}>
                    {teamMembers.length}
                  </span>
                </div>

                {/* Member Rows */}
                {teamMembers.length === 0 ? (
                  <div style={{ padding: '1.5rem 0', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    No members assigned.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {teamMembers.slice(0, 3).map(member => (
                      <div
                        key={member.id}
                        className="member-row-item"
                        onClick={() => onSelectMember(member)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
                          <img
                            src={member.profilePhoto}
                            alt={member.name}
                            className="member-avatar-img"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
                            }}
                          />
                          <div style={{ overflow: 'hidden' }}>
                            <div className="member-name-text" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {member.name}
                            </div>
                            <div className="member-role-text">
                              {member.role}
                            </div>
                            <div className="member-email-text" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {member.collegeEmail}
                            </div>
                          </div>
                        </div>

                        <button 
                          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.25rem' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectMember(member);
                          }}
                        >
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Column Footer */}
              <div className="team-col-footer">
                <span style={{ fontSize: '0.775rem', color: team.color, fontWeight: 600 }}>
                  {teamMembers.length > 3 ? `+ ${teamMembers.length - 3} more members` : team.moreText}
                </span>

                <button className="view-all-link" onClick={() => onSelectMember(teamMembers[0] || null)}>
                  <span>View All</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

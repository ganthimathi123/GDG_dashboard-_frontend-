import React from 'react';
import { FolderGit2, UserPlus, RefreshCw, BarChart3, ArrowRight, Users } from 'lucide-react';

/**
 * Recent Projects Widget
 */
export function RecentProjectsWidget() {
  const recentProjects = [
    {
      name: 'GDG Website Redesign',
      team: 'Tech Team',
      count: '+4',
      avatars: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
      ]
    },
    {
      name: 'DevFest 2026',
      team: 'Event Management',
      count: '+6',
      avatars: [
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'
      ]
    },
    {
      name: 'GDG Community App',
      team: 'Tech Team',
      count: '+3',
      avatars: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
      ]
    }
  ];

  return (
    <div className="widget-card">
      <div className="widget-title-row">
        <FolderGit2 size={18} style={{ color: 'var(--accent-blue)' }} />
        <span>Recent Projects</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
        {recentProjects.map((proj, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {proj.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                {proj.team}
              </div>
            </div>

            <div className="overlapping-avatars">
              {proj.avatars.map((url, i) => (
                <img key={i} src={url} alt="dev" className="avatar-stack-item" />
              ))}
              <div className="avatar-stack-count">{proj.count}</div>
            </div>
          </div>
        ))}
      </div>

      <button className="view-all-link" style={{ fontSize: '0.825rem' }}>
        <span>View All Projects</span>
        <ArrowRight size={14} />
      </button>
    </div>
  );
}

/**
 * Quick Actions Widget
 */
export function QuickActionsWidget({ onOpenAddModal, onOpenSwitchTeam }) {
  return (
    <div className="widget-card">
      <div className="widget-title-row">
        <span>Quick Actions</span>
      </div>

      <button className="quick-action-btn" onClick={onOpenAddModal}>
        <UserPlus size={16} style={{ color: 'var(--google-green)' }} />
        <span>Add People</span>
      </button>

      <button className="quick-action-btn" onClick={onOpenSwitchTeam}>
        <RefreshCw size={16} style={{ color: 'var(--google-blue)' }} />
        <span>Switch Team</span>
      </button>

      <button className="quick-action-btn">
        <FolderGit2 size={16} style={{ color: '#8B5CF6' }} />
        <span>View All Projects</span>
      </button>

      <button className="quick-action-btn" onClick={() => alert('Generate Report: Member analytics export ready.')}>
        <BarChart3 size={16} style={{ color: '#F97316' }} />
        <span>Generate Report</span>
      </button>
    </div>
  );
}

/**
 * Recent Members Widget (Aligned to the right of Team Overview)
 */
export function RecentMembersWidget({ members, onSelectMember }) {
  const sortedRecentMembers = members ? [...members]
    .filter(m => m.active !== false)
    .sort((a, b) => new Date(b.dateJoined || 0) - new Date(a.dateJoined || 0))
    .slice(0, 3) : [];

  return (
    <div className="widget-card" style={{ flex: 1 }}>
      <div className="widget-title-row">
        <Users size={18} style={{ color: 'var(--google-blue)' }} />
        <span>Recent Members</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {sortedRecentMembers.map((m) => (
          <div
            key={m.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.5rem 0',
              borderBottom: '1px solid #F1F5F9',
              cursor: 'pointer'
            }}
            onClick={() => onSelectMember && onSelectMember(m)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
              <img
                src={m.profilePhoto}
                alt={m.name}
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80';
                }}
              />
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {m.name}
                </div>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                  {m.team} Team
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', fontWeight: 500 }}>
              {m.dateJoined ? `Joined ${m.dateJoined}` : 'Joined recently'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Combined RightSidebar default export
 */
export default function RightSidebar({ onOpenAddModal, onOpenSwitchTeam, members, onSelectMember }) {
  return (
    <div className="right-panel-column" style={{ width: '100%', maxWidth: '320px', flexShrink: 0 }}>
      <RecentProjectsWidget />
      <QuickActionsWidget onOpenAddModal={onOpenAddModal} onOpenSwitchTeam={onOpenSwitchTeam} />
    </div>
  );
}

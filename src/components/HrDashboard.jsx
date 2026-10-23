import React, { useState } from 'react';
import { Users, Shield, Code, Calendar } from 'lucide-react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import TeamGroupedList from './TeamGroupedList';
import TeamDonutChart from './TeamDonutChart';
import { RecentProjectsWidget, RecentMembersWidget } from './RightSidebar';
import ProjectsOverview from './ProjectsOverview';
import AddPeopleModal from './AddPeopleModal';
import MemberProfileModal from './MemberProfileModal';
import SwitchTeamModal from './SwitchTeamModal';
import { getMembers, getOrganizationStats } from '../services/dbService';

/**
 * GDG HR Team Dashboard
 */
export default function HrDashboard({ user, onSignOut, showToast, theme, toggleTheme }) {
  const [activeSection, setActiveSection] = useState('people');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  // DB State
  const [members, setMembers] = useState(getMembers(true));
  const [stats, setStats] = useState(getOrganizationStats());

  // Modal States
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [switchModalOpen, setSwitchModalOpen] = useState(false);

  const refreshDbData = () => {
    setMembers(getMembers(true));
    setStats(getOrganizationStats());
  };

  const handleMemberAdded = (newMember) => {
    refreshDbData();
    showToast('success', `Added ${newMember.name} to ${newMember.team} Team.`);
  };

  const handleTeamSwitched = (updatedMember) => {
    refreshDbData();
    showToast('success', `Switched ${updatedMember.name}'s team to ${updatedMember.team} Team.`);
  };

  const handleMemberRemoved = (removedMember) => {
    refreshDbData();
    showToast('info', `Removed ${removedMember.name} from active GDG roster.`);
  };

  // Search filtering by Name, Email, Team, Role, Registration Number
  const filteredMembers = members.filter(m => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      m.name.toLowerCase().includes(q) ||
      m.collegeEmail.toLowerCase().includes(q) ||
      m.team.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      (m.registrationNumber && m.registrationNumber.toLowerCase().includes(q))
    );
  });

  return (
    <div className="dashboard-root-layout" style={{ width: '100%' }}>
      {/* Dark Navy Blue Left Sidebar */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Right Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Header Bar */}
        <TopHeader 
          user={user} 
          onSignOut={onSignOut}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          mobileSidebarOpen={mobileSidebarOpen}
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        {/* Canvas Body */}
        <main className="dashboard-main-canvas">
          
          {/* Dynamic Top Greeting */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Hello, {user.name} 👋
            </h1>
            <div style={{ fontSize: '0.9rem', color: 'var(--google-blue)', fontWeight: 700, marginTop: '0.15rem' }}>
              {user.team} Team
            </div>
          </div>

          {activeSection === 'projects' ? (
            <ProjectsOverview />
          ) : (
            <>
              {/* Row 1: 4 Summary Stat Cards */}
              <div className="stat-cards-grid">
                <div className="stat-card-item">
                  <div className="stat-circle-icon icon-blue">
                    <Users size={22} />
                  </div>
                  <div>
                    <div className="stat-label-title">Total Members</div>
                    <div className="stat-val-number">{stats.totalMembers}</div>
                    <div className="stat-subtext-badge">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
                      <span>Active members</span>
                    </div>
                  </div>
                </div>

                <div className="stat-card-item">
                  <div className="stat-circle-icon icon-green">
                    <Shield size={22} />
                  </div>
                  <div>
                    <div className="stat-label-title">HR Team</div>
                    <div className="stat-val-number">{stats.hrCount}</div>
                    <div className="stat-subtext-badge">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
                      <span>{((stats.hrCount / (stats.totalMembers || 1)) * 100).toFixed(2)}% of total</span>
                    </div>
                  </div>
                </div>

                <div className="stat-card-item">
                  <div className="stat-circle-icon icon-purple">
                    <Code size={22} />
                  </div>
                  <div>
                    <div className="stat-label-title">Tech Team</div>
                    <div className="stat-val-number">{stats.techCount}</div>
                    <div className="stat-subtext-badge">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
                      <span>{((stats.techCount / (stats.totalMembers || 1)) * 100).toFixed(2)}% of total</span>
                    </div>
                  </div>
                </div>

                <div className="stat-card-item">
                  <div className="stat-circle-icon icon-orange">
                    <Calendar size={22} />
                  </div>
                  <div>
                    <div className="stat-label-title">Event Management</div>
                    <div className="stat-val-number">{stats.eventCount}</div>
                    <div className="stat-subtext-badge">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
                      <span>{((stats.eventCount / (stats.totalMembers || 1)) * 100).toFixed(2)}% of total</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: People Section (3 Team Columns) */}
              <div style={{ marginBottom: '2rem' }}>
                <TeamGroupedList
                  members={filteredMembers}
                  onOpenAddModal={() => setAddModalOpen(true)}
                  onSelectMember={(mem) => {
                    if (mem) {
                      setSelectedMember(mem);
                      setProfileModalOpen(true);
                    }
                  }}
                />
              </div>

              {/* Row 3: Bottom Grid (Recent Projects & Team Overview Donut Chart) */}
              <div className="dashboard-bottom-grid">
                <RecentProjectsWidget />
                <TeamDonutChart stats={stats} />
              </div>
            </>
          )}
        </main>
      </div>

      {/* Modals */}
      <AddPeopleModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onMemberAdded={handleMemberAdded}
      />

      <MemberProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        member={selectedMember}
        currentUser={user}
        onTeamSwitched={handleTeamSwitched}
        onMemberRemoved={handleMemberRemoved}
      />

      <SwitchTeamModal
        isOpen={switchModalOpen}
        onClose={() => setSwitchModalOpen(false)}
        member={selectedMember}
        onTeamSwitched={handleTeamSwitched}
      />
    </div>
  );
}

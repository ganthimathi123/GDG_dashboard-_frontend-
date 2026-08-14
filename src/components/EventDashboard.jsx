import React, { useState, useEffect } from 'react';
import EventSidebar from './EventSidebar';
import EventTopHeader from './EventTopHeader';
import EventActionCards from './EventActionCards';
import UpcomingEventsList from './UpcomingEventsList';
import RecentAttendanceList from './RecentAttendanceList';
import CertificatesTable from './CertificatesTable';
import MarkAttendanceModal from './MarkAttendanceModal';
import GenerateCertificateModal from './GenerateCertificateModal';
import ViewCertificateModal from './ViewCertificateModal';
import StudentsListModal from './StudentsListModal';
import CreateEventModal from './CreateEventModal';
import { getEvents, getCertificates, getEventAttendanceSummary } from '../services/eventsDbService';

/**
 * Event Management Team Dashboard Component
 * Clean, minimal, database-backed dashboard matching reference screenshot
 */
export default function EventDashboard({ user, onSignOut, showToast, theme, toggleTheme }) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // DB Data States
  const [events, setEvents] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [attendanceSummary, setAttendanceSummary] = useState([]);

  // Modal States
  const [markAttModalOpen, setMarkAttModalOpen] = useState(false);
  const [selectedEvtId, setSelectedEvtId] = useState('');
  const [generateCertModalOpen, setGenerateCertModalOpen] = useState(false);
  const [viewCertModalOpen, setViewCertModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [studentsModalOpen, setStudentsModalOpen] = useState(false);
  const [createEvtModalOpen, setCreateEvtModalOpen] = useState(false);

  const refreshData = () => {
    setEvents(getEvents());
    setCertificates(getCertificates());
    setAttendanceSummary(getEventAttendanceSummary());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleEventCreated = (newEvent) => {
    refreshData();
    if (showToast) showToast('success', `Created new event "${newEvent.name}"!`);
  };

  const handleAttendanceSaved = (eventId) => {
    refreshData();
    if (showToast) showToast('success', 'Event attendance saved to database!');
  };

  const handleCertificatesGenerated = (certObj) => {
    refreshData();
    if (showToast) showToast('success', 'Certificates issued and added to database!');
  };

  const userName = user?.name || 'Meera Joshi';

  return (
    <div className="dashboard-root-layout">
      {/* Dark Navy/Indigo Sidebar */}
      <EventSidebar
        activeSection={activeSection}
        onSelectSection={(sec) => {
          if (sec === 'events') setCreateEvtModalOpen(true);
          else if (sec === 'attendance') setMarkAttModalOpen(true);
          else if (sec === 'certificates') setGenerateCertModalOpen(true);
          else if (sec === 'students') setStudentsModalOpen(true);
          else setActiveSection(sec);
          setMobileSidebarOpen(false);
        }}
      />

      {/* Main Right Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Navigation Header Bar */}
        <EventTopHeader
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
        <main style={{ padding: '2rem', flex: 1, overflowY: 'auto', background: 'var(--bg-main)' }}>
          
          {/* Main Greeting */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Hello, {userName} 👋
            </h1>
            <div style={{ fontSize: '0.9rem', color: '#6366F1', fontWeight: 700, marginTop: '0.15rem' }}>
              Event Management Team
            </div>
          </div>

          {/* Three Main Action Cards */}
          <EventActionCards
            onOpenGenerateCertificate={() => setGenerateCertModalOpen(true)}
            onOpenMarkAttendance={() => setMarkAttModalOpen(true)}
            onOpenViewStudents={() => setStudentsModalOpen(true)}
          />

          {/* Middle Layout: Upcoming Events (Left) + Recent Attendance (Right) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.5rem', marginBottom: '1.75rem' }}>
            <UpcomingEventsList
              events={events}
              onSelectEvent={(evt) => {
                setSelectedEvtId(evt.id);
                setMarkAttModalOpen(true);
              }}
              onOpenAllEvents={() => setCreateEvtModalOpen(true)}
            />

            <RecentAttendanceList
              summary={attendanceSummary}
              onOpenAttendanceModal={(item) => {
                setSelectedEvtId(item.eventId);
                setMarkAttModalOpen(true);
              }}
              onOpenAllAttendance={() => setMarkAttModalOpen(true)}
            />
          </div>

          {/* Bottom Table: Recently Generated Certificates */}
          <CertificatesTable
            certificates={certificates}
            onViewCertificate={(cert) => {
              setSelectedCertificate(cert);
              setViewCertModalOpen(true);
            }}
            onOpenAllCertificates={() => setGenerateCertModalOpen(true)}
          />
        </main>
      </div>

      {/* Interactive Modals */}
      <MarkAttendanceModal
        isOpen={markAttModalOpen}
        onClose={() => setMarkAttModalOpen(false)}
        selectedEventId={selectedEvtId}
        onAttendanceSaved={handleAttendanceSaved}
      />

      <GenerateCertificateModal
        isOpen={generateCertModalOpen}
        onClose={() => setGenerateCertModalOpen(false)}
        onCertificatesGenerated={handleCertificatesGenerated}
      />

      <ViewCertificateModal
        isOpen={viewCertModalOpen}
        onClose={() => setViewCertModalOpen(false)}
        certificate={selectedCertificate}
      />

      <StudentsListModal
        isOpen={studentsModalOpen}
        onClose={() => setStudentsModalOpen(false)}
      />

      <CreateEventModal
        isOpen={createEvtModalOpen}
        onClose={() => setCreateEvtModalOpen(false)}
        onEventCreated={handleEventCreated}
      />
    </div>
  );
}

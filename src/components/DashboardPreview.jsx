import React, { useState } from 'react';
import { 
  LogOut, Calendar, Users, Code, Award, Sparkles, ArrowRight, 
  ShieldCheck, CheckCircle2, Bookmark, Search, Bell, Star, GitFork, 
  Key, ExternalLink, Filter, UserCheck, Plus, Terminal
} from 'lucide-react';
import GdgLogo from './GdgLogo';

/**
 * Full Enterprise-Grade GDG Community Dashboard Portal
 */
export default function DashboardPreview({ user, onSignOut }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'events' | 'projects' | 'badges' | 'members' | 'apikeys'
  const [searchQuery, setSearchQuery] = useState('');
  const [eventCategory, setEventCategory] = useState('All');
  
  // Interactive RSVP state
  const [rsvpEvents, setRsvpEvents] = useState(['evt-1']);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [connectedMembers, setConnectedMembers] = useState([]);
  const [apiKeyCreated, setApiKeyCreated] = useState(false);

  const toggleRsvp = (eventId) => {
    if (rsvpEvents.includes(eventId)) {
      setRsvpEvents(rsvpEvents.filter(id => id !== eventId));
    } else {
      setRsvpEvents([...rsvpEvents, eventId]);
    }
  };

  const toggleConnectMember = (memberId) => {
    if (connectedMembers.includes(memberId)) {
      setConnectedMembers(connectedMembers.filter(id => id !== memberId));
    } else {
      setConnectedMembers([...connectedMembers, memberId]);
    }
  };

  // Sample Datasets
  const upcomingWorkshops = [
    { id: 'evt-1', title: 'Gemini 1.5 Pro Multi-Modal Hackathon', date: 'Aug 22, 2026', time: '10:00 AM PST', speaker: 'Dr. Elena Rostova (Google GDE)', tag: 'AI / LLM', seats: 45 },
    { id: 'evt-2', title: 'Flutter 4.0 Cross-Platform Live Coding', date: 'Sep 05, 2026', time: '02:00 PM PST', speaker: 'Devin Zhao (GDG Chapter Lead)', tag: 'Mobile', seats: 12 },
    { id: 'evt-3', title: 'Deploying Serverless Microservices on GCP', date: 'Sep 18, 2026', time: '11:00 AM PST', speaker: 'Priya Sharma (Cloud Architect)', tag: 'Cloud', seats: 80 },
    { id: 'evt-4', title: 'TensorFlow Lite for Mobile Edge Devices', date: 'Oct 02, 2026', time: '04:00 PM PST', speaker: 'Marcus Vance (ML Engineer)', tag: 'AI / LLM', seats: 30 }
  ];

  const communityProjects = [
    { id: 'prj-1', name: 'gdg-gemini-starter-kit', desc: 'Production-ready React + Node template for building Gemini 1.5 powered web applications.', stars: 342, forks: 89, lang: 'TypeScript', tag: 'AI' },
    { id: 'prj-2', name: 'flutter-gdg-hub-mobile', desc: 'Official cross-platform iOS & Android member app for Google Developer Groups.', stars: 512, forks: 140, lang: 'Dart', tag: 'Mobile' },
    { id: 'prj-3', name: 'gcp-terraform-blueprints', desc: 'Infrastructure as code scripts for automated Google Cloud BigQuery and Dataproc clusters.', stars: 218, forks: 45, lang: 'HCL', tag: 'Cloud' }
  ];

  const devBadges = [
    { id: 'bdg-1', title: 'Gemini AI Specialist 2026', issuer: 'Google Developers', date: 'Earned Aug 2026', icon: Sparkles, color: 'var(--google-blue)', desc: 'Demonstrated proficiency in building multi-modal LLM applications.' },
    { id: 'bdg-2', title: 'Certified GCP Cloud Architect', issuer: 'Google Cloud Platform', date: 'Earned Jun 2026', icon: ShieldCheck, color: 'var(--google-green)', desc: 'Validated skill in enterprise cloud infrastructure design.' },
    { id: 'bdg-3', title: 'Flutter Core Contributor', issuer: 'Flutter Open Source', date: 'Earned Jan 2026', icon: Code, color: 'var(--google-yellow)', desc: 'Contributed 10+ merged PRs to Flutter community widgets.' }
  ];

  const chapterMembers = [
    { id: 'm-1', name: 'Sarah Jenkins', role: 'Google Developer Expert', chapter: 'GDG Silicon Valley', skills: ['Gemini API', 'PyTorch'], avatar: 'S' },
    { id: 'm-2', name: 'Devin Zhao', role: 'Chapter Lead', chapter: 'GDG Silicon Valley', skills: ['Flutter', 'Firebase'], avatar: 'D' },
    { id: 'm-3', name: 'Priya Sharma', role: 'Cloud Architect', chapter: 'GDG Cloud & AI', skills: ['GCP', 'Kubernetes'], avatar: 'P' },
    { id: 'm-4', name: 'Alex Rivers', role: 'Student Developer', chapter: 'GDG On Campus', skills: ['React', 'Node.js'], avatar: 'A' }
  ];

  const filteredEvents = upcomingWorkshops.filter(evt => {
    const matchesCat = eventCategory === 'All' || evt.tag === eventCategory;
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) || evt.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="portal-container">
      {/* Top Portal Header */}
      <div className="portal-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <GdgLogo size="small" />
          <div style={{ position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
            <input
              type="text"
              className="portal-search-input"
              placeholder="Search events, projects, members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Notifications Bell */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              style={{
                background: 'var(--input-bg)',
                border: '1px solid var(--card-border)',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-main)',
                cursor: 'pointer'
              }}
            >
              <Bell size={18} />
              <span style={{ position: 'absolute', top: '2px', right: '2px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--google-red)' }} />
            </button>

            {notificationsOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '300px',
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                padding: '1rem',
                zIndex: 100
              }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
                  GDG Notifications
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
                  <div style={{ padding: '0.5rem', background: 'var(--input-bg)', borderRadius: '6px' }}>
                    <strong style={{ color: 'var(--google-blue)' }}>Gemini AI Workshop:</strong> Seat confirmed for Aug 22.
                  </div>
                  <div style={{ padding: '0.5rem', background: 'var(--input-bg)', borderRadius: '6px' }}>
                    <strong style={{ color: 'var(--google-green)' }}>Solution Challenge:</strong> 12 days left to submit projects.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Summary */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="avatar-circle" style={{ width: 36, height: 36, fontSize: '0.95rem' }}>
              {user.avatarLetter || 'G'}
            </div>
            <div style={{ textAlign: 'left', display: 'none', minWidth: '100px' }} className="user-text-meta">
              <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{user.displayName}</div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{user.role}</div>
            </div>
          </div>

          <button
            onClick={onSignOut}
            className="btn-google"
            style={{ width: 'auto', padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="portal-nav-bar">
        <button
          className={`portal-nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <Sparkles size={16} /> Overview
        </button>
        <button
          className={`portal-nav-tab ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          <Calendar size={16} /> Workshops ({filteredEvents.length})
        </button>
        <button
          className={`portal-nav-tab ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          <Code size={16} /> Open Source Repos ({communityProjects.length})
        </button>
        <button
          className={`portal-nav-tab ${activeTab === 'badges' ? 'active' : ''}`}
          onClick={() => setActiveTab('badges')}
        >
          <Award size={16} /> Google Dev Badges ({devBadges.length})
        </button>
        <button
          className={`portal-nav-tab ${activeTab === 'members' ? 'active' : ''}`}
          onClick={() => setActiveTab('members')}
        >
          <Users size={16} /> Directory ({chapterMembers.length})
        </button>
        <button
          className={`portal-nav-tab ${activeTab === 'apikeys' ? 'active' : ''}`}
          onClick={() => setActiveTab('apikeys')}
        >
          <Key size={16} /> Dev API Keys
        </button>
      </div>

      {/* Main Body Content */}
      <div className="portal-content-body">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            {/* Hero Welcome Banner */}
            <div className="portal-hero-banner">
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.25rem 0.75rem', background: '#FFFFFF', borderRadius: 'var(--radius-full)', fontSize: '0.775rem', fontWeight: 700, color: 'var(--google-blue)', marginBottom: '0.5rem', border: '1px solid var(--card-border)' }}>
                  <ShieldCheck size={14} /> Verified GDG Account
                </div>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Welcome to {user.chapter || 'GDG Community'}, {user.displayName}!
                </h1>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.3rem', maxWidth: '600px' }}>
                  Connect with local Google Developer Group members, join hands-on Gemini AI workshops, and contribute to open-source community repositories.
                </p>
              </div>

              <button
                className="btn-primary"
                onClick={() => setActiveTab('events')}
                style={{ width: 'auto', padding: '0.65rem 1.25rem', fontSize: '0.875rem' }}
              >
                <span>Explore Upcoming Events</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Key Metrics */}
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)' }}>
              Chapter Metrics & Activity
            </h3>

            <div className="hero-stats-row">
              <div className="portal-stat-box">
                <div style={{ color: 'var(--google-blue)', marginBottom: '0.4rem' }}>
                  <Calendar size={22} />
                </div>
                <div className="portal-stat-number">12</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Workshops & Tech Talks</div>
              </div>

              <div className="portal-stat-box">
                <div style={{ color: 'var(--google-green)', marginBottom: '0.4rem' }}>
                  <Users size={22} />
                </div>
                <div className="portal-stat-number">10,420+</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Active Dev Members</div>
              </div>

              <div className="portal-stat-box">
                <div style={{ color: 'var(--google-yellow)', marginBottom: '0.4rem' }}>
                  <Code size={22} />
                </div>
                <div className="portal-stat-number">28</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Open Source Repos</div>
              </div>

              <div className="portal-stat-box">
                <div style={{ color: 'var(--google-red)', marginBottom: '0.4rem' }}>
                  <Award size={22} />
                </div>
                <div className="portal-stat-number">3</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Google Dev Certifications</div>
              </div>
            </div>

            {/* Quick Solution Challenge Card */}
            <div style={{
              background: 'var(--input-bg)',
              border: '1px solid var(--card-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--google-green)', textTransform: 'uppercase' }}>Google Solution Challenge 2026</div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>Build for the UN 17 Sustainable Development Goals</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Form your 4-person student team and win $10,000 in Google Cloud credits + mentorship from Google Engineers.</p>
              </div>

              <button className="btn-google" style={{ width: 'auto', padding: '0.65rem 1.25rem' }}>
                <span>Register Team</span>
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: WORKSHOPS & RSVP */}
        {activeTab === 'events' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>GDG Workshops & Live Speaker Series</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>RSVP your seat to get calendar invites and codelab access.</p>
              </div>

              {/* Category Filter Chips */}
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {['All', 'AI / LLM', 'Mobile', 'Cloud'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setEventCategory(cat)}
                    style={{
                      padding: '0.35rem 0.8rem',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--input-border)',
                      background: eventCategory === cat ? 'var(--google-blue)' : 'var(--input-bg)',
                      color: eventCategory === cat ? '#FFFFFF' : 'var(--text-muted)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredEvents.map(evt => {
                const isRsvped = rsvpEvents.includes(evt.id);
                return (
                  <div
                    key={evt.id}
                    style={{
                      padding: '1.35rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--card-border)',
                      background: 'var(--input-bg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}
                  >
                    <div>
                      <span style={{ padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', background: 'var(--google-blue-light)', color: 'var(--google-blue)', fontSize: '0.75rem', fontWeight: 700 }}>
                        {evt.tag}
                      </span>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.4rem' }}>
                        {evt.title}
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        {evt.date} &bull; {evt.time} &bull; Speaker: <strong>{evt.speaker}</strong>
                      </p>
                    </div>

                    <button
                      className={isRsvped ? 'btn-google' : 'btn-primary'}
                      onClick={() => toggleRsvp(evt.id)}
                      style={{ width: 'auto', padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
                    >
                      {isRsvped ? (
                        <>
                          <CheckCircle2 size={16} style={{ color: 'var(--google-green)' }} />
                          <span>RSVP Confirmed</span>
                        </>
                      ) : (
                        <>
                          <Bookmark size={16} />
                          <span>Reserve Seat</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: OPEN SOURCE PROJECTS */}
        {activeTab === 'projects' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>Community Open Source Repositories</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Contribute code and collaborate with fellow Google developers.</p>
              </div>

              <button className="btn-primary" style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                <Plus size={16} />
                <span>Submit Repository</span>
              </button>
            </div>

            <div className="projects-grid">
              {communityProjects.map(p => (
                <div key={p.id} className="project-card">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.825rem', fontWeight: 700, color: 'var(--google-blue)' }}>
                        {p.name}
                      </span>
                      <span style={{ fontSize: '0.725rem', padding: '0.2rem 0.5rem', background: 'var(--card-bg)', borderRadius: '4px', border: '1px solid var(--card-border)' }}>
                        {p.lang}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '1.25rem' }}>
                      {p.desc}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--card-border)', paddingTop: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.85rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Star size={14} style={{ color: 'var(--google-yellow)' }} /> {p.stars}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <GitFork size={14} /> {p.forks}
                      </span>
                    </div>

                    <button className="btn-google" style={{ width: 'auto', padding: '0.35rem 0.75rem', fontSize: '0.775rem' }}>
                      <span>Fork Repo</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: BADGES */}
        {activeTab === 'badges' && (
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
              Your Google Developer Badges
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Official credentials earned through Google Codelabs and GDG Chapter contributions.
            </p>

            <div className="badges-grid">
              {devBadges.map(b => {
                const BadgeIcon = b.icon;
                return (
                  <div key={b.id} className="badge-card">
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: 'var(--card-bg)',
                      border: '2px solid ' + b.color,
                      color: b.color,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.85rem',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)'
                    }}>
                      <BadgeIcon size={26} />
                    </div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>{b.title}</h3>
                    <p style={{ fontSize: '0.775rem', color: 'var(--google-blue)', fontWeight: 600, marginTop: '0.2rem' }}>{b.issuer}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem', lineHeight: '1.4' }}>{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: MEMBERS DIRECTORY */}
        {activeTab === 'members' && (
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
              GDG Chapter Members Directory
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Network with active student developers, mentors, and Google Developer Experts.
            </p>

            <div className="members-grid">
              {chapterMembers.map(m => {
                const isConn = connectedMembers.includes(m.id);
                return (
                  <div key={m.id} className="member-card">
                    <div className="avatar-circle" style={{ width: 44, height: 44, fontSize: '1.1rem' }}>
                      {m.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>{m.name}</div>
                      <div style={{ fontSize: '0.775rem', color: 'var(--google-blue)', fontWeight: 600 }}>{m.role}</div>
                      <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.35rem' }}>
                        {m.skills.map(sk => (
                          <span key={sk} style={{ fontSize: '0.675rem', padding: '0.15rem 0.45rem', background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '4px', color: 'var(--text-muted)' }}>
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      className={isConn ? 'btn-google' : 'btn-primary'}
                      onClick={() => toggleConnectMember(m.id)}
                      style={{ width: 'auto', padding: '0.35rem 0.75rem', fontSize: '0.775rem' }}
                    >
                      {isConn ? <UserCheck size={14} /> : <Plus size={14} />}
                      <span>{isConn ? 'Connected' : 'Connect'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 6: DEV API KEYS */}
        {activeTab === 'apikeys' && (
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
              Developer API Keys & Webhook Consoles
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Generate API keys for chapter integrations and custom GDG webhook bots.
            </p>

            <div style={{ background: 'var(--input-bg)', border: '1px solid var(--card-border)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>GDG Chapter API Token</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Used for authenticating local chapter scripts & bots.</div>
                </div>

                <button
                  className="btn-primary"
                  onClick={() => setApiKeyCreated(true)}
                  style={{ width: 'auto', padding: '0.45rem 0.9rem', fontSize: '0.8rem' }}
                >
                  <Key size={14} />
                  <span>Generate Key</span>
                </button>
              </div>

              {apiKeyCreated && (
                <div style={{ background: 'var(--card-bg)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--google-blue)', fontFamily: 'var(--font-mono)', fontSize: '0.825rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--google-blue)' }}>
                  <span>gdg_live_sec_991823749281734912039</span>
                  <span style={{ fontSize: '0.75rem', background: 'var(--google-blue-light)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>Active</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

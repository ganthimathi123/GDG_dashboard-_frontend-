/**
 * Database Service for GDG Internal Management System
 * Uses localStorage with pre-populated seed data for persistent member & team management.
 */

const STORAGE_KEY_MEMBERS = 'gdg_db_members_v3';
const STORAGE_KEY_PROJECTS = 'gdg_db_projects_v3';

const INITIAL_MEMBERS = [
  {
    id: 'mem-1',
    name: 'Gandhinathi',
    profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 019-2834',
    collegeEmail: 'gandhinathi@college.edu',
    registrationNumber: 'REG2026001',
    collegeName: 'RMK Engineering College',
    team: 'HR',
    role: 'HR Director & Operations Lead',
    dateJoined: '2025-09-01',
    active: true,
    projects: ['proj-1']
  },
  {
    id: 'mem-2',
    name: 'Alex Chen',
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 014-9821',
    collegeEmail: 'alex.chen@college.edu',
    registrationNumber: 'REG2026042',
    collegeName: 'RMK Engineering College',
    team: 'Tech',
    role: 'Lead Software Developer',
    dateJoined: '2025-10-15',
    active: true,
    projects: ['proj-1', 'proj-2']
  },
  {
    id: 'mem-3',
    name: 'Sarah Jenkins',
    profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 018-3321',
    collegeEmail: 'sarah.j@college.edu',
    registrationNumber: 'REG2026088',
    collegeName: 'RMK Engineering College',
    team: 'Tech',
    role: 'Frontend Engineer',
    dateJoined: '2026-01-10',
    active: true,
    projects: ['proj-1']
  },
  {
    id: 'mem-4',
    name: 'Priya Sharma',
    profilePhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 017-4490',
    collegeEmail: 'priya.s@college.edu',
    registrationNumber: 'REG2026012',
    collegeName: 'RMK Engineering College',
    team: 'Event Management',
    role: 'Event Director',
    dateJoined: '2025-08-20',
    active: true,
    projects: ['proj-3']
  },
  {
    id: 'mem-5',
    name: 'David Miller',
    profilePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 013-7721',
    collegeEmail: 'david.m@college.edu',
    registrationNumber: 'REG2026055',
    collegeName: 'RMK Engineering College',
    team: 'Event Management',
    role: 'Logistics Lead',
    dateJoined: '2026-02-01',
    active: true,
    projects: ['proj-3']
  },
  {
    id: 'mem-6',
    name: 'Marcus Vance',
    profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 011-8842',
    collegeEmail: 'marcus.v@college.edu',
    registrationNumber: 'REG2026004',
    collegeName: 'RMK Engineering College',
    team: 'HR',
    role: 'Talent Acquisition Partner',
    dateJoined: '2026-03-15',
    active: true,
    projects: []
  }
];

const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    name: 'GDG Portal Web App',
    description: 'Central student portal, RSVP engine, and community hub.',
    teamAssignments: [
      { memberId: 'mem-1', memberName: 'Gandhinathi', role: 'HR & Ops Lead' },
      { memberId: 'mem-2', memberName: 'Alex Chen', role: 'Lead Architect' },
      { memberId: 'mem-3', memberName: 'Sarah Jenkins', role: 'Frontend Engineer' }
    ]
  },
  {
    id: 'proj-2',
    name: 'Gemini AI Codelab Kit',
    description: 'Interactive workshop materials & APIs for Gemini 1.5 Pro.',
    teamAssignments: [
      { memberId: 'mem-2', memberName: 'Alex Chen', role: 'AI Instructor' }
    ]
  },
  {
    id: 'proj-3',
    name: 'Solution Challenge Hackathon 2026',
    description: 'Global annual student developer competition & venue management.',
    teamAssignments: [
      { memberId: 'mem-4', memberName: 'Priya Sharma', role: 'Event Director' },
      { memberId: 'mem-5', memberName: 'David Miller', role: 'Logistics Lead' }
    ]
  }
];

// Initialize Storage
function initDatabase() {
  if (!localStorage.getItem(STORAGE_KEY_MEMBERS)) {
    localStorage.setItem(STORAGE_KEY_MEMBERS, JSON.stringify(INITIAL_MEMBERS));
  }
  if (!localStorage.getItem(STORAGE_KEY_PROJECTS)) {
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(INITIAL_PROJECTS));
  }
}

initDatabase();

/**
 * Get all members (optionally filtered by active status)
 */
export function getMembers(onlyActive = true) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY_MEMBERS) || '[]');
  return onlyActive ? data.filter(m => m.active !== false) : data;
}

/**
 * Get single member by ID
 */
export function getMemberById(id) {
  const members = getMembers(false);
  return members.find(m => m.id === id) || null;
}

/**
 * Get single member by Email
 */
export function getMemberByEmail(email) {
  if (!email) return null;
  const members = getMembers(false);
  return members.find(m => m.collegeEmail.toLowerCase().trim() === email.toLowerCase().trim()) || null;
}

/**
 * Add a new member to the database
 */
export function addMember(memberData) {
  const members = getMembers(false);

  // Check email uniqueness
  const existing = members.find(
    m => m.collegeEmail.toLowerCase().trim() === memberData.collegeEmail.toLowerCase().trim()
  );

  if (existing) {
    if (existing.active === false) {
      // Re-reactivate member if previously deactivated
      existing.active = true;
      existing.name = memberData.name || existing.name;
      existing.team = memberData.team || existing.team;
      existing.role = memberData.role || existing.role;
      localStorage.setItem(STORAGE_KEY_MEMBERS, JSON.stringify(members));
      return existing;
    }
    throw new Error(`A member with email "${memberData.collegeEmail}" already exists in GDG.`);
  }

  const newMember = {
    id: 'mem-' + Date.now(),
    name: memberData.name.trim(),
    profilePhoto: memberData.profilePhoto || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
    phone: memberData.phone || '+1 (555) 000-0000',
    collegeEmail: memberData.collegeEmail.trim(),
    rollNumber: memberData.rollNumber || 'N/A',
    registrationNumber: memberData.registrationNumber || 'N/A',
    collegeName: memberData.collegeName || 'Stanford University',
    team: memberData.team || 'Tech',
    role: memberData.role || 'Member',
    dateJoined: memberData.dateJoined || new Date().toISOString().split('T')[0],
    active: true,
    projects: []
  };

  members.push(newMember);
  localStorage.setItem(STORAGE_KEY_MEMBERS, JSON.stringify(members));
  return newMember;
}

/**
 * Switch a member's team (Updates existing record, no duplicate created)
 */
export function updateMemberTeam(memberId, newTeam) {
  const members = getMembers(false);
  const member = members.find(m => m.id === memberId);

  if (!member) {
    throw new Error('Member not found.');
  }

  member.team = newTeam;
  localStorage.setItem(STORAGE_KEY_MEMBERS, JSON.stringify(members));
  return member;
}

/**
 * Remove a member from active GDG list (Soft Delete: active = false)
 */
export function deactivateMember(memberId) {
  const members = getMembers(false);
  const member = members.find(m => m.id === memberId);

  if (!member) {
    throw new Error('Member not found.');
  }

  member.active = false;
  localStorage.setItem(STORAGE_KEY_MEMBERS, JSON.stringify(members));
  return member;
}

/**
 * Get all active projects with assigned member details
 */
export function getProjects() {
  const projects = JSON.parse(localStorage.getItem(STORAGE_KEY_PROJECTS) || '[]');
  const members = getMembers(true);

  return projects.map(proj => {
    // Enrich project team assignments with current active member details
    const activeAssignments = proj.teamAssignments.filter(assign => {
      const m = members.find(mem => mem.id === assign.memberId);
      return m && m.active !== false;
    });

    return {
      ...proj,
      teamAssignments: activeAssignments
    };
  });
}

/**
 * Get dynamic team statistics
 */
export function getOrganizationStats() {
  const activeMembers = getMembers(true);

  const hrCount = activeMembers.filter(m => m.team === 'HR').length;
  const techCount = activeMembers.filter(m => m.team === 'Tech').length;
  const eventCount = activeMembers.filter(m => m.team === 'Event Management').length;

  return {
    totalMembers: activeMembers.length,
    hrCount,
    techCount,
    eventCount
  };
}

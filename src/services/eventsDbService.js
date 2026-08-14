/**
 * Event Management Database Service for GDG System
 * Manages Events, Students, Event Registrations, Event Attendance, and Certificates.
 * Backed by localStorage with pre-populated seed data.
 */

const STORAGE_KEY_EVENTS = 'gdg_events_db_v1';
const STORAGE_KEY_STUDENTS = 'gdg_students_db_v1';
const STORAGE_KEY_ATTENDANCE = 'gdg_attendance_db_v1';
const STORAGE_KEY_CERTIFICATES = 'gdg_certificates_db_v1';

// Seed Events Data
const INITIAL_EVENTS = [
  {
    id: 'evt-1',
    name: 'Flutter Workshop',
    description: 'Cross-platform app development hands-on codelab with Flutter & Dart.',
    date: '2026-05-28',
    displayDate: 'May 28, 2026',
    time: '10:00 AM – 01:00 PM',
    monthTag: 'MAY',
    dayTag: '28',
    type: 'Offline',
    venue: 'Auditorium Hall B, RMKEC',
    maxParticipants: 60,
    registeredCount: 60,
    status: 'Upcoming'
  },
  {
    id: 'evt-2',
    name: 'Hackathon 2026',
    description: '24-hour hackathon building solutions for real-world campus challenges.',
    date: '2026-05-31',
    displayDate: 'May 31 – Jun 1, 2026',
    time: '09:00 AM – 09:00 PM',
    monthTag: 'MAY',
    dayTag: '31',
    type: 'Offline',
    venue: 'Main Innovation Lab',
    maxParticipants: 100,
    registeredCount: 80,
    status: 'Upcoming'
  },
  {
    id: 'evt-3',
    name: 'Career Guidance Talk',
    description: 'Tech career insights, resume review, and interview tips with Google engineers.',
    date: '2026-06-05',
    displayDate: 'Jun 5, 2026',
    time: '11:00 AM – 12:30 PM',
    monthTag: 'JUN',
    dayTag: '05',
    type: 'Online',
    venue: 'Google Meet (Online)',
    maxParticipants: 100,
    registeredCount: 50,
    status: 'Upcoming'
  },
  {
    id: 'evt-4',
    name: 'DevFest 2026',
    description: 'Annual GDG flagship developer festival featuring cloud, web, and AI tech talks.',
    date: '2026-05-18',
    displayDate: 'May 18, 2026',
    time: '09:00 AM – 05:00 PM',
    monthTag: 'MAY',
    dayTag: '18',
    type: 'Offline',
    venue: 'Grand Convention Center',
    maxParticipants: 150,
    registeredCount: 150,
    status: 'Completed'
  },
  {
    id: 'evt-5',
    name: 'Web Development Workshop',
    description: 'Modern web architecture with React, Vite, and responsive CSS.',
    date: '2026-05-10',
    displayDate: 'May 10, 2026',
    time: '02:00 PM – 05:00 PM',
    monthTag: 'MAY',
    dayTag: '10',
    type: 'Offline',
    venue: 'CS Lab 3, RMKEC',
    maxParticipants: 60,
    registeredCount: 60,
    status: 'Completed'
  },
  {
    id: 'evt-6',
    name: 'AI/ML Study Jam',
    description: 'Machine Learning models and Google Gemini API integration codelab.',
    date: '2026-05-05',
    displayDate: 'May 5, 2026',
    time: '04:00 PM – 06:00 PM',
    monthTag: 'MAY',
    dayTag: '05',
    type: 'Online',
    venue: 'Google Meet',
    maxParticipants: 30,
    registeredCount: 30,
    status: 'Completed'
  }
];

// Seed Students Data
const INITIAL_STUDENTS = [
  { id: 'std-1', name: 'Rahul Kumar', email: 'rahul@college.edu', phone: '+91 98765 43210', registrationNumber: '111721104001', collegeName: 'RMK Engineering College' },
  { id: 'std-2', name: 'Priya S', email: 'priya@college.edu', phone: '+91 98765 43211', registrationNumber: '111721104002', collegeName: 'RMK Engineering College' },
  { id: 'std-3', name: 'Arun V', email: 'arun@college.edu', phone: '+91 98765 43212', registrationNumber: '111721104003', collegeName: 'RMK Engineering College' },
  { id: 'std-4', name: 'Kavya Nair', email: 'kavya@college.edu', phone: '+91 98765 43213', registrationNumber: '111721104004', collegeName: 'RMK Engineering College' },
  { id: 'std-5', name: 'Siddharth R', email: 'siddharth@college.edu', phone: '+91 98765 43214', registrationNumber: '111721104005', collegeName: 'RMK Engineering College' },
  { id: 'std-6', name: 'Ananya M', email: 'ananya@college.edu', phone: '+91 98765 43215', registrationNumber: '111721104006', collegeName: 'RMK Engineering College' }
];

// Seed Attendance Records (Event -> Participant -> Status)
const INITIAL_ATTENDANCE = [
  // DevFest 2026
  { id: 'att-1', eventId: 'evt-4', studentId: 'std-1', status: 'present', markedAt: '2026-05-18' },
  { id: 'att-2', eventId: 'evt-4', studentId: 'std-2', status: 'present', markedAt: '2026-05-18' },
  { id: 'att-3', eventId: 'evt-4', studentId: 'std-3', status: 'present', markedAt: '2026-05-18' },
  { id: 'att-4', eventId: 'evt-4', studentId: 'std-4', status: 'absent', markedAt: '2026-05-18' },
  { id: 'att-5', eventId: 'evt-4', studentId: 'std-5', status: 'present', markedAt: '2026-05-18' },

  // Web Development Workshop
  { id: 'att-6', eventId: 'evt-5', studentId: 'std-1', status: 'present', markedAt: '2026-05-10' },
  { id: 'att-7', eventId: 'evt-5', studentId: 'std-2', status: 'absent', markedAt: '2026-05-10' },
  { id: 'att-8', eventId: 'evt-5', studentId: 'std-3', status: 'present', markedAt: '2026-05-10' },

  // AI/ML Study Jam
  { id: 'att-9', eventId: 'evt-6', studentId: 'std-1', status: 'present', markedAt: '2026-05-05' },
  { id: 'att-10', eventId: 'evt-6', studentId: 'std-5', status: 'present', markedAt: '2026-05-05' }
];

// Seed Certificates Data
const INITIAL_CERTIFICATES = [
  {
    id: 'cert-1',
    certificateNumber: 'CERT-2026-DF-120',
    eventId: 'evt-4',
    eventName: 'DevFest 2026',
    studentId: 'std-1',
    studentName: 'Rahul Kumar',
    issuedCount: 120,
    totalEligible: 120,
    issuedAt: 'May 19, 2026',
    certificateUrl: '#'
  },
  {
    id: 'cert-2',
    certificateNumber: 'CERT-2026-WD-045',
    eventId: 'evt-5',
    eventName: 'Web Development Workshop',
    studentId: 'std-1',
    studentName: 'Rahul Kumar',
    issuedCount: 45,
    totalEligible: 45,
    issuedAt: 'May 11, 2026',
    certificateUrl: '#'
  },
  {
    id: 'cert-3',
    certificateNumber: 'CERT-2026-AI-021',
    eventId: 'evt-6',
    eventName: 'AI/ML Study Jam',
    studentId: 'std-1',
    studentName: 'Rahul Kumar',
    issuedCount: 21,
    totalEligible: 21,
    issuedAt: 'May 6, 2026',
    certificateUrl: '#'
  }
];

function loadStorage(key, initialData) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(initialData));
      return initialData;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Failed to load storage for ${key}:`, err);
    return initialData;
  }
}

function saveStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Failed to save storage for ${key}:`, err);
  }
}

// Service Methods
export function getEvents() {
  return loadStorage(STORAGE_KEY_EVENTS, INITIAL_EVENTS);
}

export function getStudents() {
  return loadStorage(STORAGE_KEY_STUDENTS, INITIAL_STUDENTS);
}

export function getAttendance() {
  return loadStorage(STORAGE_KEY_ATTENDANCE, INITIAL_ATTENDANCE);
}

export function getCertificates() {
  return loadStorage(STORAGE_KEY_CERTIFICATES, INITIAL_CERTIFICATES);
}

export function createEvent(eventData) {
  const events = getEvents();
  const newEvt = {
    id: `evt-${Date.now()}`,
    name: eventData.name,
    description: eventData.description || 'GDG Developer Event',
    date: eventData.date,
    displayDate: eventData.displayDate || eventData.date,
    time: eventData.time || '10:00 AM – 01:00 PM',
    monthTag: (eventData.monthTag || 'MAY').toUpperCase(),
    dayTag: eventData.dayTag || '15',
    type: eventData.type || 'Offline',
    venue: eventData.venue || 'RMKEC Auditorium',
    maxParticipants: Number(eventData.maxParticipants) || 100,
    registeredCount: 0,
    status: 'Upcoming'
  };

  events.unshift(newEvt);
  saveStorage(STORAGE_KEY_EVENTS, events);
  return newEvt;
}

export function addStudent(studentData) {
  const students = getStudents();
  const newStd = {
    id: `std-${Date.now()}`,
    name: studentData.name,
    email: studentData.email,
    phone: studentData.phone || '',
    registrationNumber: studentData.registrationNumber || `111721104${Math.floor(100 + Math.random() * 900)}`,
    collegeName: studentData.collegeName || 'RMK Engineering College'
  };

  students.unshift(newStd);
  saveStorage(STORAGE_KEY_STUDENTS, students);
  return newStd;
}

export function saveEventAttendance(eventId, attendanceMap) {
  const attendanceList = getAttendance();
  const dateStr = new Date().toISOString().split('T')[0];

  // Remove existing attendance for this event and replace with new records
  const filtered = attendanceList.filter(a => a.eventId !== eventId);

  Object.entries(attendanceMap).forEach(([studentId, status]) => {
    filtered.push({
      id: `att-${eventId}-${studentId}`,
      eventId,
      studentId,
      status, // 'present' | 'absent'
      markedAt: dateStr
    });
  });

  saveStorage(STORAGE_KEY_ATTENDANCE, filtered);
  return filtered;
}

export function generateCertificatesForEvent(eventId) {
  const events = getEvents();
  const eventObj = events.find(e => e.id === eventId);
  const attendance = getAttendance().filter(a => a.eventId === eventId && a.status === 'present');
  const certificates = getCertificates();

  const newCert = {
    id: `cert-${Date.now()}`,
    certificateNumber: `CERT-2026-${(eventObj?.name || 'EVT').slice(0, 2).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
    eventId,
    eventName: eventObj ? eventObj.name : 'GDG Event',
    studentId: 'all',
    studentName: `${attendance.length} Eligible Attendees`,
    issuedCount: attendance.length || 1,
    totalEligible: attendance.length || 1,
    issuedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    certificateUrl: '#'
  };

  certificates.unshift(newCert);
  saveStorage(STORAGE_KEY_CERTIFICATES, certificates);
  return newCert;
}

export function getEventAttendanceSummary() {
  const events = getEvents();
  const attendance = getAttendance();

  return [
    {
      eventId: 'evt-4',
      eventName: 'DevFest 2026',
      date: 'May 18, 2026',
      type: 'Offline',
      presentCount: 120,
      totalRegistered: 150
    },
    {
      eventId: 'evt-5',
      eventName: 'Web Development Workshop',
      date: 'May 10, 2026',
      type: 'Offline',
      presentCount: 45,
      totalRegistered: 60
    },
    {
      eventId: 'evt-6',
      eventName: 'AI/ML Study Jam',
      date: 'May 5, 2026',
      type: 'Online',
      presentCount: 21,
      totalRegistered: 30
    },
    {
      eventId: 'evt-1',
      eventName: 'Cloud Computing Session',
      date: 'Apr 28, 2026',
      type: 'Online',
      presentCount: 23,
      totalRegistered: 40
    }
  ];
}

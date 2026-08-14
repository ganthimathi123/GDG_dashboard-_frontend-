import { getMemberByEmail, addMember } from './dbService';

/**
 * GDG Authentication Service Layer (Database-Backed)
 */

export async function loginWithEmailPassword(email, password, rememberMe = false) {
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (!email || !password) {
    throw new Error('Email address and password are required.');
  }

  // Look up user in database service
  const dbUser = getMemberByEmail(email);

  if (!dbUser) {
    // If not found in seed DB, create fallback user for test convenience
    if (email.includes('@')) {
      const fallbackName = email.split('@')[0]
        .replace(/[._-]/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());

      return {
        id: 'usr-temp-' + Date.now(),
        name: fallbackName,
        collegeEmail: email,
        team: 'HR', // Defaults to HR for test convenience
        role: 'GDG Member',
        avatarLetter: fallbackName[0].toUpperCase(),
        rememberMe
      };
    }
    throw new Error('No GDG member account found with this email ID.');
  }

  if (dbUser.active === false) {
    throw new Error('This account has been removed/deactivated from the GDG organization.');
  }

  if (rememberMe) {
    localStorage.setItem('gdg_session_email', email);
  } else {
    localStorage.removeItem('gdg_session_email');
  }

  return {
    ...dbUser,
    avatarLetter: dbUser.name[0].toUpperCase()
  };
}

export async function loginWithGoogle() {
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  // Default Google SSO mock resolves to HR Lead Gandhinathi
  const dbUser = getMemberByEmail('gandhinathi@college.edu') || {
    id: 'mem-1',
    name: 'Gandhinathi',
    collegeEmail: 'gandhinathi@college.edu',
    team: 'HR',
    role: 'HR Director'
  };

  return {
    ...dbUser,
    avatarLetter: dbUser.name[0].toUpperCase()
  };
}

export async function requestPasswordReset(email) {
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (!email || !email.includes('@')) {
    throw new Error('Please provide a valid college email address to reset password.');
  }

  return {
    success: true,
    message: `Password reset link has been dispatched to ${email}. Please check your inbox.`
  };
}

export async function registerNewMember(memberData) {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const newMem = {
    name: memberData.fullName || memberData.name,
    collegeEmail: memberData.email || memberData.collegeEmail,
    team: memberData.team || 'Tech',
    role: memberData.role || 'Member',
    collegeName: 'RMK Engineering College'
  };

  return {
    ...addMember(newMem),
    avatarLetter: newMem.name[0].toUpperCase()
  };
}



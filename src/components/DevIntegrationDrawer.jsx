import React, { useState } from 'react';
import { Terminal, Code, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Developer Integration Info Drawer demonstrating Firebase Auth & REST API wiring
 */
export default function DevIntegrationDrawer() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const snippet = `// Example: Wiring src/services/authService.js to Firebase Auth
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = { apiKey: "YOUR_API_KEY", authDomain: "gdg-hub.firebaseapp.com" };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export async function loginWithEmailPassword(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button 
        className="dev-drawer-toggle" 
        onClick={() => setOpen(!open)}
        title="Developer Backend Integration Specs"
      >
        <Terminal size={15} style={{ color: 'var(--google-blue)' }} />
        <span>Backend Integration Ready</span>
        {open ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </button>

      {open && (
        <div className="modal-backdrop" onClick={() => setOpen(false)} style={{ zIndex: 300 }}>
          <div 
            className="modal-card" 
            onClick={(e) => e.stopPropagation()} 
            style={{ maxWidth: '640px', background: '#0F172A', color: '#F8FAFC', border: '1px solid #334155' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #1E293B', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Code size={20} style={{ color: '#60A5FA' }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F8FAFC' }}>
                  Firebase & REST Auth Connector Guide
                </h3>
              </div>
              <button 
                onClick={copyCode} 
                style={{ 
                  background: '#1E293B', 
                  border: '1px solid #475569', 
                  color: '#94A3B8', 
                  padding: '0.35rem 0.75rem', 
                  borderRadius: '6px', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.8rem'
                }}
              >
                {copied ? <Check size={14} style={{ color: '#4ADE80' }} /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy snippet'}</span>
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '1rem', lineHeight: '1.4' }}>
              The UI forms connect to <code style={{ color: '#38BDF8' }}>src/services/authService.js</code>. Replace the async promises with Firebase Auth or your GraphQL/REST endpoint:
            </p>

            <pre style={{ 
              background: '#020617', 
              padding: '1rem', 
              borderRadius: '8px', 
              fontFamily: "'Fira Code', monospace", 
              fontSize: '0.78rem', 
              color: '#E2E8F0', 
              overflowX: 'auto', 
              lineHeight: 1.5,
              border: '1px solid #1E293B'
            }}>
              {snippet}
            </pre>

            <div style={{ marginTop: '1.25rem', textAlign: 'right' }}>
              <button 
                className="btn-primary" 
                onClick={() => setOpen(false)} 
                style={{ width: 'auto', display: 'inline-flex', padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
              >
                Close Spec Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

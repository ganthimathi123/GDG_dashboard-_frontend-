import React, { useState } from 'react';
import { X, Code, Smartphone, Cloud, User, Mail, Sparkles, Check, Cpu } from 'lucide-react';
import { registerNewMember } from '../services/authService';

/**
 * Enhanced Secondary Action Modal: Multi-Step Join GDG Community Onboarding
 */
export default function JoinGdgModal({ isOpen, onClose, onRegisterSuccess }) {
  const [step, setStep] = useState(1); // 1: Chapter & Tech Interests, 2: Member Details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('GDG On Campus');
  const [selectedTechs, setSelectedTechs] = useState(['Gemini AI', 'Flutter']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const chapters = [
    { id: 'GDG On Campus', icon: Code, color: 'var(--google-blue)', desc: 'Student Devs & Projects' },
    { id: 'GDG Cloud', icon: Cloud, color: 'var(--google-green)', desc: 'Cloud Architectures & GCP' },
    { id: 'GDG Mobile & AI', icon: Smartphone, color: 'var(--google-red)', desc: 'Android, Flutter & Gemini' }
  ];

  const availableTechs = ['Gemini AI', 'Flutter', 'Firebase', 'Google Cloud', 'TensorFlow', 'Android', 'Web/React', 'Go'];

  const toggleTech = (tech) => {
    if (selectedTechs.includes(tech)) {
      setSelectedTechs(selectedTechs.filter(t => t !== tech));
    } else {
      setSelectedTechs([...selectedTechs, tech]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim() || !email.trim()) {
      setError('Please fill in your full name and email address.');
      return;
    }

    setLoading(true);
    try {
      const user = await registerNewMember({ 
        fullName, 
        email, 
        chapter: selectedChapter,
        techs: selectedTechs 
      });
      onRegisterSuccess(user);
      onClose();
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.85rem',
            background: 'var(--google-blue-light)',
            color: 'var(--google-blue)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.775rem',
            fontWeight: 700,
            marginBottom: '0.5rem'
          }}>
            <Sparkles size={14} /> Join Google Developer Groups
          </div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Become a GDG Member
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            {step === 1 ? 'Step 1: Choose your Chapter focus & Tech interests' : 'Step 2: Enter your developer credentials'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            /* Step 1: Chapter & Tech Interests */
            <div>
              <label className="form-label">Select Chapter Focus Area</label>
              <div className="chapter-grid">
                {chapters.map((chap) => {
                  const IconComponent = chap.icon;
                  const isSelected = selectedChapter === chap.id;
                  return (
                    <div
                      key={chap.id}
                      className={`chapter-option ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedChapter(chap.id)}
                    >
                      <div className="chapter-icon" style={{ color: chap.color }}>
                        <IconComponent size={22} style={{ display: 'inline-block' }} />
                      </div>
                      <div className="chapter-name">{chap.id}</div>
                    </div>
                  );
                })}
              </div>

              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Cpu size={16} style={{ color: 'var(--google-blue)' }} />
                  <span>Select Tech Interests</span>
                </label>
                <div className="tech-tags-grid">
                  {availableTechs.map((tech) => {
                    const isSel = selectedTechs.includes(tech);
                    return (
                      <span
                        key={tech}
                        className={`tech-tag ${isSel ? 'selected' : ''}`}
                        onClick={() => toggleTech(tech)}
                      >
                        {isSel && <Check size={12} style={{ display: 'inline', marginRight: '3px' }} />}
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                className="btn-primary"
                onClick={() => setStep(2)}
                style={{ marginTop: '1.5rem' }}
              >
                <span>Continue to Profile</span>
              </button>
            </div>
          ) : (
            /* Step 2: Member Personal Details */
            <div>
              <div className="form-group">
                <label className="form-label" htmlFor="join-name">Full Name</label>
                <div className="input-wrapper">
                  <span className="input-icon-left">
                    <User size={18} />
                  </span>
                  <input
                    id="join-name"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Maya Lin"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="join-email">Email Address</label>
                <div className="input-wrapper">
                  <span className="input-icon-left">
                    <Mail size={18} />
                  </span>
                  <input
                    id="join-email"
                    type="email"
                    className="form-input"
                    placeholder="maya@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && <span className="error-hint" style={{ marginBottom: '1rem', display: 'block' }}>{error}</span>}

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                <button
                  type="button"
                  className="btn-google"
                  onClick={() => setStep(1)}
                  style={{ width: 'auto', padding: '0.75rem 1rem' }}
                >
                  Back
                </button>
                <button type="submit" className="btn-primary" disabled={loading} style={{ flex: 1 }}>
                  {loading ? (
                    <>
                      <div className="spinner" />
                      <span>Joining Chapter...</span>
                    </>
                  ) : (
                    <>
                      <Check size={18} />
                      <span>Complete Registration</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

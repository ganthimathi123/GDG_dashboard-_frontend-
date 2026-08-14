import React from 'react';
import { X, Award, Download, Printer, CheckCircle2 } from 'lucide-react';
import GdgLogo from './GdgLogo';

/**
 * Printable Official GDG Certificate Modal View
 */
export default function ViewCertificateModal({ isOpen, onClose, certificate }) {
  if (!isOpen || !certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '720px', padding: '2rem' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
          <X size={18} />
        </button>

        {/* Printable Certificate Frame */}
        <div style={{
          background: '#FFFFFF',
          border: '8px double #6366F1',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          position: 'relative',
          boxShadow: '0 20px 45px rgba(0, 0, 0, 0.1)',
          marginBottom: '1.5rem'
        }}>
          {/* Header */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <GdgLogo size="small" />
            <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', letterSpacing: '0.05em' }}>
              GOOGLE DEVELOPER GROUPS
            </span>
          </div>

          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#6366F1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
            Certificate of Achievement
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
            THIS CERTIFICATE IS PROUDLY PRESENTED TO
          </p>

          {/* Student Name */}
          <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#0F172A', borderBottom: '2px solid #6366F1', display: 'inline-block', paddingBottom: '0.35rem', marginBottom: '1.25rem' }}>
            {certificate.studentName || 'Rahul Kumar'}
          </h1>

          <p style={{ fontSize: '0.925rem', color: '#475569', lineHeight: '1.6', maxWidth: '520px', margin: '0 auto 1.75rem auto' }}>
            for successfully participating in and completing all requirements for the official GDG developer event{' '}
            <strong style={{ color: '#0F172A' }}>"{certificate.eventName || 'DevFest 2026'}"</strong>.
          </p>

          {/* Certificate Metadata */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '1.25rem', marginTop: '1rem' }}>
            <div style={{ textAlign: 'left', fontSize: '0.775rem', color: '#64748B' }}>
              <div>Issue Date: <strong>{certificate.issuedAt || certificate.issuedOn || 'May 19, 2026'}</strong></div>
              <div>Certificate ID: <strong style={{ fontFamily: 'var(--font-mono)' }}>{certificate.certificateNumber || 'CERT-2026-DF-120'}</strong></div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ECFDF5', border: '1px solid #86EFAC', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', color: '#166534', fontSize: '0.75rem', fontWeight: 700 }}>
              <CheckCircle2 size={14} /> Verified GDG Credential
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button type="button" className="btn-google" onClick={onClose} style={{ width: 'auto' }}>
            Close
          </button>

          <button
            type="button"
            className="btn-google"
            onClick={handlePrint}
            style={{ width: 'auto', color: '#6366F1', fontWeight: 700 }}
          >
            <Printer size={16} />
            <span>Print Certificate</span>
          </button>

          <button
            type="button"
            className="btn-primary"
            onClick={() => alert(`Downloading Certificate ${certificate.certificateNumber || 'CERT-2026'} as PDF...`)}
            style={{ width: 'auto', background: '#6366F1', padding: '0.65rem 1.4rem' }}
          >
            <Download size={16} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { ChevronRight, Award } from 'lucide-react';

/**
 * Recently Generated Certificates Table Component matching reference screenshot
 */
export default function CertificatesTable({ certificates, onViewCertificate, onOpenAllCertificates }) {
  const list = certificates || [
    { id: 'cert-1', eventName: 'DevFest 2026', issuedTo: '120 Students', issuedOn: 'May 19, 2026' },
    { id: 'cert-2', eventName: 'Web Development Workshop', issuedTo: '45 Students', issuedOn: 'May 11, 2026' },
    { id: 'cert-3', eventName: 'AI/ML Study Jam', issuedTo: '21 Students', issuedOn: 'May 6, 2026' }
  ];

  return (
    <div className="widget-card" style={{ width: '100%', marginTop: '1.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Award size={18} style={{ color: '#8B5CF6' }} />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Recently Generated Certificates
          </h3>
        </div>
        <button className="view-all-link" onClick={onOpenAllCertificates}>
          <span>View all</span>
          <ChevronRight size={14} />
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--card-border)', color: 'var(--text-muted)', fontSize: '0.775rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <th style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>Event</th>
              <th style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>Issued To</th>
              <th style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>Issued On</th>
              <th style={{ padding: '0.75rem 1rem', fontWeight: 700, textAlign: 'right' }}>Certificates</th>
            </tr>
          </thead>
          <tbody>
            {list.map((cert) => (
              <tr key={cert.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '0.9rem 1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {cert.eventName}
                </td>
                <td style={{ padding: '0.9rem 1rem', color: 'var(--text-muted)' }}>
                  {cert.studentName || cert.issuedTo || '120 Students'}
                </td>
                <td style={{ padding: '0.9rem 1rem', color: 'var(--text-muted)' }}>
                  {cert.issuedAt || cert.issuedOn || 'May 19, 2026'}
                </td>
                <td style={{ padding: '0.9rem 1rem', textAlign: 'right' }}>
                  <button
                    className="btn-google"
                    onClick={() => onViewCertificate(cert)}
                    style={{
                      padding: '0.35rem 0.85rem',
                      fontSize: '0.785rem',
                      color: 'var(--google-blue)',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    View / Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

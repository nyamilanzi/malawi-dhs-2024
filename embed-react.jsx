/**
 * MalawiDHSDashboard — FemAnalytica embed component
 *
 * Usage:
 *   import MalawiDHSDashboard from './embed-react';
 *   <MalawiDHSDashboard />
 *
 * Props:
 *   showIntroBar  {boolean}  Show the title bar above the iframe. Default: true
 *   height        {string}   CSS height of the iframe. Default: "860px"
 *   fullPage      {boolean}  Expand to 100vh (good for a dedicated /data page). Default: false
 */

import React, { useState } from 'react';

const DASHBOARD_URL =
  'https://femanalytica.github.io/malawi-dhs-2024/dashboard.html';

const styles = {
  wrapper: {
    width: '100%',
    background: '#060E19',
    borderRadius: '14px',
    overflow: 'hidden',
    fontFamily: "'Space Grotesk', system-ui, sans-serif",
  },
  introBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    padding: '14px 28px',
    background: 'rgba(255,255,255,0.03)',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    flexWrap: 'wrap',
  },
  introText: {
    fontSize: '12px',
    color: '#C6DCE9',
    lineHeight: 1.5,
  },
  introTitle: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 600,
    color: '#F5FAFE',
    marginBottom: '1px',
  },
  cta: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    padding: '7px 16px',
    fontSize: '12px',
    fontWeight: 600,
    color: '#060E19',
    background: '#45CDD8',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  frameWrap: {
    position: 'relative',
  },
  loader: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    background: '#060E19',
    transition: 'opacity .4s ease',
  },
  loaderText: {
    fontSize: '12px',
    color: '#C6DCE9',
    letterSpacing: '.04em',
  },
  iframe: {
    display: 'block',
    width: '100%',
    border: 'none',
    background: '#060E19',
  },
};

// Inline keyframe hack for the spinner (avoids needing a CSS file)
const SpinnerStyle = () => (
  <style>{`
    @keyframes fa-spin { to { transform: rotate(360deg); } }
    .fa-loader-ring {
      width: 34px; height: 34px;
      border: 3px solid rgba(255,255,255,0.08);
      border-top-color: #45CDD8;
      border-radius: 50%;
      animation: fa-spin .8s linear infinite;
    }
  `}</style>
);

export default function MalawiDHSDashboard({
  showIntroBar = true,
  height = '860px',
  fullPage = false,
}) {
  const [loaded, setLoaded] = useState(false);

  const frameStyle = {
    ...styles.iframe,
    height: fullPage ? '100vh' : height,
  };

  return (
    <div style={styles.wrapper}>
      <SpinnerStyle />

      {showIntroBar && (
        <div style={styles.introBar}>
          <div style={styles.introText}>
            <strong style={styles.introTitle}>
              Malawi Demographic &amp; Health Survey 2024
            </strong>
            Interactive dashboard · National Statistical Office · December 2025
          </div>
          <a
            style={styles.cta}
            href={DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3M9 2h5m0 0v5m0-5L8 9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Open full dashboard
          </a>
        </div>
      )}

      <div style={styles.frameWrap}>
        {!loaded && (
          <div style={styles.loader}>
            <div className="fa-loader-ring" />
            <p style={styles.loaderText}>Loading dashboard…</p>
          </div>
        )}
        <iframe
          src={DASHBOARD_URL}
          style={frameStyle}
          title="Malawi DHS 2024 Interactive Dashboard · FemAnalytica"
          loading="lazy"
          allowFullScreen
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}

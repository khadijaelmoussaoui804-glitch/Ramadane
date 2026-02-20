import { useState, useEffect } from 'react';

function MoonSVG() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" style={{ animation: 'moonRise 1s ease forwards' }}>
      <defs>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF8DC" />
          <stop offset="60%" stopColor="#F0C040" />
          <stop offset="100%" stopColor="#C9960C" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="moonBody" cx="35%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#FFFDE7" />
          <stop offset="100%" stopColor="#F0C040" />
        </radialGradient>
      </defs>
      {/* Glow */}
      <circle cx="40" cy="40" r="38" fill="url(#moonGlow)" opacity="0.3" />
      {/* Moon crescent */}
      <circle cx="40" cy="40" r="22" fill="url(#moonBody)" />
      <circle cx="50" cy="33" r="18" fill="#0A0E1A" />
      {/* Stars around moon */}
      <circle cx="15" cy="20" r="1.5" fill="#F0C040" opacity="0.8" />
      <circle cx="65" cy="15" r="1" fill="#F0C040" opacity="0.6" />
      <circle cx="70" cy="55" r="1.5" fill="#F0C040" opacity="0.7" />
      <circle cx="12" cy="58" r="1" fill="#F0C040" opacity="0.5" />
      <circle cx="40" cy="8" r="1.2" fill="#F0C040" opacity="0.6" />
    </svg>
  );
}

export default function Header({ currentTime }) {
  const timeStr = currentTime.toLocaleTimeString('ar-MA', { 
  hour: '2-digit', 
  minute: '2-digit',
  second: '2-digit',
  hour12: false 
});
  
  const dateStr = currentTime.toLocaleDateString('ar-MA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header style={{
      position: 'relative',
      overflow: 'hidden',
      padding: '2rem 1rem 1.5rem',
      textAlign: 'center',
      borderBottom: '1px solid rgba(201,150,12,0.2)',
    }}>
      {/* Decorative arcs */}
      <div style={{
        position: 'absolute',
        top: '-60px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '300px',
        borderRadius: '50%',
        border: '1px solid rgba(201,150,12,0.1)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: '-40px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '400px',
        height: '200px',
        borderRadius: '50%',
        border: '1px solid rgba(201,150,12,0.08)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Moon */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
          <MoonSVG />
        </div>

        {/* Main title */}
        <h1 style={{
          fontFamily: 'Amiri, serif',
          fontSize: 'clamp(1.8rem, 5vw, 3rem)',
          fontWeight: 700,
          background: 'linear-gradient(135deg, #FFF8DC 0%, #F0C040 40%, #C9960C 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1.2,
          marginBottom: '0.3rem',
          animation: 'fadeInUp 0.8s ease 0.2s both',
        }}>
          مواقيت الصلاة في رمضان
        </h1>

        <div style={{
          fontFamily: 'Cairo, sans-serif',
          fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
          color: '#F0C040',
          fontWeight: 600,
          marginBottom: '1rem',
          animation: 'fadeInUp 0.8s ease 0.4s both',
          opacity: 0,
        }}>
          1447 هـ • رمضان 2026
        </div>

        {/* Current time display */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '1rem',
          background: 'rgba(22, 32, 51, 0.8)',
          border: '1px solid rgba(201,150,12,0.3)',
          borderRadius: '50px',
          padding: '0.5rem 1.5rem',
          animation: 'fadeIn 1s ease 0.6s both',
          opacity: 0,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          <span style={{ 
            fontFamily: 'Cairo, sans-serif',
            fontSize: 'clamp(1.4rem, 4vw, 2rem)', 
            fontWeight: 900, 
            color: '#F0C040',
            letterSpacing: '0.05em',
          }}>
            {timeStr}
          </span>
          <span style={{ 
            color: 'rgba(201,150,12,0.5)', 
            fontSize: '1.2rem',
            display: window.innerWidth < 400 ? 'none' : 'block'
          }}>|</span>
          <span style={{ 
            fontSize: '0.9rem', 
            color: '#9BA8BC',
            fontFamily: 'Cairo, sans-serif',
          }}>
            {dateStr}
          </span>
        </div>

        {/* Decorative divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '1.5rem',
          animation: 'fadeIn 1s ease 0.8s both',
          opacity: 0,
        }}>
          <div style={{ height: '1px', width: '80px', background: 'linear-gradient(to right, transparent, rgba(201,150,12,0.5))' }} />
          <div style={{ color: '#C9960C', fontSize: '1.2rem' }}>✦</div>
          <div style={{ height: '1px', width: '80px', background: 'linear-gradient(to left, transparent, rgba(201,150,12,0.5))' }} />
        </div>
      </div>
    </header>
  );
}
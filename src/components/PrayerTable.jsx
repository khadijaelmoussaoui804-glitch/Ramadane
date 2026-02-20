import { useState, useRef } from 'react';

const PRAYERS = [
  { key: 'fajr',    label: 'الفجر',  short: 'فجر',  color: '#4A90D9' },
  { key: 'shuruq',  label: 'الشروق', short: 'شروق', color: '#F6AD55' },
  { key: 'dhuhr',   label: 'الظهر',  short: 'ظهر',  color: '#FBD38D' },
  { key: 'asr',     label: 'العصر',  short: 'عصر',  color: '#68D391' },
  { key: 'maghrib', label: 'المغرب', short: 'مغرب', color: '#FC8181' },
  { key: 'isha',    label: 'العشاء', short: 'عشاء', color: '#9F7AEA' },
];

export default function PrayerTable({ times, todayDay, city }) {
  const [hoveredRow, setHoveredRow] = useState(null);
  const todayRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  const scrollToToday = () => {
    todayRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setScrolled(true);
  };

  return (
    <div style={{ animation: 'fadeInUp 0.5s ease' }}>
      {/* Header actions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}>
        <h2 style={{
          fontFamily: 'Amiri, serif',
          fontSize: '1.3rem',
          color: '#F0C040',
        }}>
          📋 جدول مواقيت الصلاة — رمضان 1447 هـ
        </h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={scrollToToday}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid rgba(201,150,12,0.5)',
              background: 'rgba(201,150,12,0.1)',
              color: '#F0C040',
              fontFamily: 'Cairo, sans-serif',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            📍 يومنا
          </button>
          <PrintButton times={times} city={city} />
        </div>
      </div>

      {/* City info */}
      <div style={{
        padding: '0.6rem 1rem',
        background: 'rgba(201,150,12,0.08)',
        border: '1px solid rgba(201,150,12,0.2)',
        borderRadius: '8px',
        marginBottom: '1rem',
        fontSize: '0.85rem',
        color: '#9BA8BC',
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
      }}>
        <span>📍 {city?.name} — {city?.nameFr}</span>
        <span>🕌 منهج وزارة الأوقاف المغربية (فجر -18°، عشاء -17°)</span>
        <span>🗓️ 17 فبراير — 18 مارس 2026</span>
      </div>

      {/* Table */}
      <div style={{
        background: 'rgba(16, 24, 40, 0.8)',
        border: '1px solid rgba(201,150,12,0.2)',
        borderRadius: '14px',
        overflow: 'hidden',
        overflowX: 'auto',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
          <thead>
            <tr style={{
              background: 'linear-gradient(135deg, rgba(201,150,12,0.3), rgba(139,101,8,0.2))',
              borderBottom: '2px solid rgba(201,150,12,0.4)',
            }}>
              <th style={thStyle}>رمضان</th>
              <th style={thStyle}>التاريخ</th>
              <th style={thStyle}>اليوم</th>
              {PRAYERS.map(p => (
                <th key={p.key} style={{ ...thStyle, color: p.color }}>
                  {p.label}
                </th>
              ))}
              <th style={thStyle}>الإفطار</th>
            </tr>
          </thead>
          <tbody>
            {times.map((entry, idx) => {
              const isToday = entry.day === todayDay;
              const isWeekend = entry.date.getDay() === 5 || entry.date.getDay() === 6;
              
              return (
                <tr
                  key={entry.day}
                  ref={isToday ? todayRef : null}
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    background: isToday
                      ? 'linear-gradient(135deg, rgba(201,150,12,0.2), rgba(139,101,8,0.1))'
                      : hoveredRow === idx
                      ? 'rgba(255,255,255,0.04)'
                      : idx % 2 === 0
                      ? 'rgba(255,255,255,0.01)'
                      : 'transparent',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    borderLeft: isToday ? '3px solid #C9960C' : '3px solid transparent',
                    transition: 'background 0.2s ease',
                    cursor: 'default',
                  }}
                >
                  {/* Day number */}
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isToday ? 'rgba(201,150,12,0.4)' : 'transparent',
                      border: isToday ? '1px solid #C9960C' : '1px solid transparent',
                      color: isToday ? '#F0C040' : '#9BA8BC',
                      fontWeight: isToday ? 700 : 400,
                      fontSize: '0.9rem',
                    }}>
                      {entry.day}
                    </div>
                  </td>

                  {/* Date */}
                  <td style={tdStyle}>
                    <div style={{ fontWeight: isToday ? 700 : 400, color: isToday ? '#F0C040' : '#F5F0E8', fontSize: '0.85rem' }}>
                      {entry.dateStr}
                    </div>
                  </td>

                  {/* Day name */}
                  <td style={tdStyle}>
                    <span style={{ 
                      color: isWeekend ? '#68D391' : '#9BA8BC',
                      fontSize: '0.8rem',
                    }}>
                      {entry.dayName}
                    </span>
                  </td>

                  {/* Prayer times */}
                  {PRAYERS.map(p => (
                    <td key={p.key} style={{ ...tdStyle, textAlign: 'center' }}>
                      <span style={{
                        fontFamily: 'Cairo, sans-serif',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        color: isToday ? p.color : '#F5F0E8',
                      }}>
                        {entry[p.key]}
                      </span>
                    </td>
                  ))}

                  {/* Iftar = Maghrib */}
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '6px',
                      background: isToday ? 'rgba(252,129,129,0.25)' : 'rgba(252,129,129,0.1)',
                      border: '1px solid rgba(252,129,129,0.3)',
                      color: '#FC8181',
                      fontFamily: 'Cairo, sans-serif',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                    }}>
                      {entry.maghrib}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div style={{
        marginTop: '1rem',
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        fontSize: '0.8rem',
        color: '#9BA8BC',
      }}>
        {PRAYERS.map(p => (
          <span key={p.key} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ 
              width: '10px', height: '10px', borderRadius: '50%', 
              background: p.color, display: 'inline-block' 
            }} />
            {p.label}
          </span>
        ))}
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <span style={{ 
            width: '10px', height: '10px', borderRadius: '50%', 
            background: '#C9960C', display: 'inline-block' 
          }} />
          يوم اليوم
        </span>
      </div>
    </div>
  );
}

function PrintButton({ times, city }) {
  const handlePrint = () => {
    const printContent = generatePrintHTML(times, city);
    const w = window.open('', '_blank');
    w.document.write(printContent);
    w.document.close();
    w.print();
  };

  return (
    <button
      onClick={handlePrint}
      style={{
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        border: '1px solid rgba(201,150,12,0.5)',
        background: 'rgba(201,150,12,0.15)',
        color: '#F0C040',
        fontFamily: 'Cairo, sans-serif',
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
      }}
    >
      🖨️ طباعة
    </button>
  );
}

function generatePrintHTML(times, city) {
  const rows = times.map(e => `
    <tr>
      <td>${e.day}</td>
      <td>${e.dateStr}</td>
      <td>${e.dayName}</td>
      <td>${e.fajr}</td>
      <td>${e.shuruq}</td>
      <td>${e.dhuhr}</td>
      <td>${e.asr}</td>
      <td>${e.maghrib}</td>
      <td>${e.isha}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <title>مواقيت صلاة رمضان 2026 — ${city?.name}</title>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet">
      <style>
        body { font-family: 'Cairo', sans-serif; direction: rtl; padding: 20px; color: #000; }
        h1 { text-align: center; font-size: 18px; margin-bottom: 4px; }
        h2 { text-align: center; font-size: 14px; color: #555; margin-bottom: 8px; }
        p { text-align: center; font-size: 11px; color: #777; margin-bottom: 16px; }
        table { width: 100%; border-collapse: collapse; font-size: 11px; }
        th { background: #1a1a1a; color: #fff; padding: 6px 4px; border: 1px solid #ccc; }
        td { padding: 4px; border: 1px solid #ddd; text-align: center; }
        tr:nth-child(even) { background: #f9f9f9; }
      </style>
    </head>
    <body>
      <h1>🌙 مواقيت صلاة رمضان المبارك 1447 هـ</h1>
      <h2>${city?.name} — ${city?.nameFr}</h2>
      <p>منهج وزارة الأوقاف والشؤون الإسلامية المغربية — فجر -18° | عشاء -17°</p>
      <table>
        <thead>
          <tr>
            <th>رمضان</th><th>التاريخ</th><th>اليوم</th>
            <th>الفجر</th><th>الشروق</th><th>الظهر</th>
            <th>العصر</th><th>المغرب</th><th>العشاء</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </body>
    </html>
  `;
}

const thStyle = {
  padding: '0.9rem 0.75rem',
  fontFamily: 'Cairo, sans-serif',
  fontSize: '0.9rem',
  fontWeight: 700,
  color: '#F0C040',
  textAlign: 'center',
  whiteSpace: 'nowrap',
};

const tdStyle = {
  padding: '0.6rem 0.75rem',
  fontFamily: 'Cairo, sans-serif',
  fontSize: '0.85rem',
  color: '#F5F0E8',
  whiteSpace: 'nowrap',
};
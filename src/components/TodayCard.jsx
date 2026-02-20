import { useState, useEffect, useMemo } from 'react';

const PRAYERS = [
  { key: 'fajr',    label: 'الفجر',   labelFr: 'Fajr',    icon: '🌌', color: '#4A90D9', desc: 'وقت السحور' },
  { key: 'shuruq',  label: 'الشروق',  labelFr: 'Shuruq',  icon: '🌅', color: '#F6AD55', desc: 'شروق الشمس' },
  { key: 'dhuhr',   label: 'الظهر',   labelFr: 'Dhuhr',   icon: '☀️', color: '#FBD38D', desc: 'صلاة الظهر' },
  { key: 'asr',     label: 'العصر',   labelFr: 'Asr',     icon: '🌤️', color: '#68D391', desc: 'صلاة العصر' },
  { key: 'maghrib', label: 'المغرب',  labelFr: 'Maghrib', icon: '🌇', color: '#FC8181', desc: 'وقت الإفطار' },
  { key: 'isha',    label: 'العشاء',  labelFr: 'Isha',    icon: '🌙', color: '#9F7AEA', desc: 'صلاة العشاء' },
];

function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function minutesToStr(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h > 0) return `${h} ساعة و ${m} دقيقة`;
  return `${m} دقيقة`;
}

function getNextPrayer(entry, currentTime) {
  const nowMins = currentTime.getHours() * 60 + currentTime.getMinutes();
  for (const p of PRAYERS) {
    const pMins = timeToMinutes(entry?.[p.key]);
    if (pMins > nowMins) {
      return { prayer: p, remainingMins: pMins - nowMins };
    }
  }
  // Next day fajr
  const fajrMins = timeToMinutes(entry?.fajr);
  return { prayer: PRAYERS[0], remainingMins: 1440 - nowMins + fajrMins };
}

export default function TodayCard({ entry, allEntries, city, currentTime, dayNumber }) {
  const [selectedDay, setSelectedDay] = useState(null);
  
  const displayEntry = selectedDay || entry;
  const { prayer: nextPrayer, remainingMins } = useMemo(
    () => getNextPrayer(entry, currentTime),
    [entry, currentTime]
  );

  const nowMins = currentTime.getHours() * 60 + currentTime.getMinutes();

  if (!displayEntry) return null;

  // Suhoor and Iftar times
  const suhoorTime = displayEntry.fajr;
  const iftarTime = displayEntry.maghrib;

  return (
    <div style={{ animation: 'fadeInUp 0.5s ease' }}>
      {/* Day selector */}
      <DaySelector allEntries={allEntries}
        dayNumber={dayNumber}
        selectedDay={selectedDay}
        onSelect={setSelectedDay}
        entry={entry}
      />

      {/* Suhoor & Iftar highlight */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        marginBottom: '1rem',
      }}>
        <HighlightCard
          icon="🌙"
          title="السحور"
          subtitle="آخر موعد"
          time={suhoorTime}
          color="#4A90D9"
          note="قبل أذان الفجر"
        />
        <HighlightCard
          icon="🌅"
          title="الإفطار"
          subtitle="وقت المغرب"
          time={iftarTime}
          color="#FC8181"
          note="عند أذان المغرب"
          isIftar
        />
      </div>

      {/* Next prayer countdown */}
      {!selectedDay && (
        <div style={{
          background: `linear-gradient(135deg, ${nextPrayer.color}22, ${nextPrayer.color}11)`,
          border: `1px solid ${nextPrayer.color}55`,
          borderRadius: '12px',
          padding: '1rem 1.5rem',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
          animation: 'pulse-gold 3s ease infinite',
        }}>
          <div>
            <div style={{ color: '#9BA8BC', fontSize: '0.8rem' }}>الصلاة القادمة</div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              marginTop: '0.25rem',
            }}>
              <span style={{ fontSize: '1.5rem' }}>{nextPrayer.icon}</span>
              <span style={{ 
                fontSize: '1.3rem', 
                fontWeight: 700, 
                color: nextPrayer.color,
                fontFamily: 'Amiri, serif',
              }}>
                {nextPrayer.label}
              </span>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#9BA8BC', fontSize: '0.8rem' }}>الوقت المتبقي</div>
            <div style={{ 
              fontSize: '1.1rem', 
              fontWeight: 700, 
              color: '#F0C040',
              marginTop: '0.25rem',
            }}>
              {minutesToStr(remainingMins)}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#9BA8BC', fontSize: '0.8rem' }}>في تمام الساعة</div>
            <div style={{ 
              fontSize: '1.5rem', 
              fontWeight: 900, 
              color: '#F0C040',
              fontFamily: 'Cairo, sans-serif',
              marginTop: '0.25rem',
            }}>
              {entry?.[nextPrayer.key]}
            </div>
          </div>
        </div>
      )}

      {/* Prayer times grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '0.75rem',
      }}>
        {PRAYERS.map((p, idx) => {
          const pMins = timeToMinutes(displayEntry[p.key]);
          const isPast = !selectedDay && pMins < nowMins;
          const isNext = !selectedDay && p.key === nextPrayer.key;

          return (
            <PrayerCard
              key={p.key}
              prayer={p}
              time={displayEntry[p.key]}
              isPast={isPast}
              isNext={isNext}
              idx={idx}
            />
          );
        })}
      </div>

      {/* Hijri date and info */}
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        background: 'rgba(22, 32, 51, 0.6)',
        border: '1px solid rgba(201,150,12,0.15)',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
      }}>
        <div>
          <div style={{ color: '#9BA8BC', fontSize: '0.75rem' }}>التاريخ الميلادي</div>
          <div style={{ color: '#F5F0E8', fontWeight: 600, marginTop: '0.2rem' }}>
            {displayEntry.dayName} {displayEntry.dateStr}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#9BA8BC', fontSize: '0.75rem' }}>يوم رمضان</div>
          <div style={{ 
            color: '#F0C040', 
            fontWeight: 900, 
            fontSize: '1.4rem',
            fontFamily: 'Amiri, serif',
            marginTop: '0.1rem',
          }}>
            {displayEntry.day}
          </div>
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ color: '#9BA8BC', fontSize: '0.75rem' }}>المدينة</div>
          <div style={{ color: '#F5F0E8', fontWeight: 600, marginTop: '0.2rem' }}>
            {city?.name} — {city?.nameFr}
          </div>
        </div>
      </div>
    </div>
  );
}

function HighlightCard({ icon, title, subtitle, time, color, note, isIftar }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${color}22 0%, ${color}08 100%)`,
      border: `2px solid ${color}55`,
      borderRadius: '14px',
      padding: '1rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: '-20px',
        right: isIftar ? 'auto' : '-20px',
        left: isIftar ? '-20px' : 'auto',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: `${color}15`,
      }} />
      <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>{icon}</div>
      <div style={{ 
        fontFamily: 'Amiri, serif',
        fontSize: '1rem', 
        color: color,
        fontWeight: 700,
        marginBottom: '0.1rem',
      }}>
        {title}
      </div>
      <div style={{ fontSize: '0.7rem', color: '#9BA8BC', marginBottom: '0.5rem' }}>{subtitle}</div>
      <div style={{ 
        fontSize: '1.8rem', 
        fontWeight: 900, 
        color: '#F5F0E8',
        fontFamily: 'Cairo, sans-serif',
        letterSpacing: '0.05em',
      }}>
        {time}
      </div>
      <div style={{ fontSize: '0.7rem', color: '#9BA8BC', marginTop: '0.25rem' }}>{note}</div>
    </div>
  );
}

function PrayerCard({ prayer, time, isPast, isNext, idx }) {
  return (
    <div
      style={{
        background: isNext
          ? `linear-gradient(135deg, ${prayer.color}25, ${prayer.color}10)`
          : isPast
          ? 'rgba(22, 32, 51, 0.4)'
          : 'rgba(26, 39, 64, 0.8)',
        border: isNext
          ? `2px solid ${prayer.color}80`
          : isPast
          ? '1px solid rgba(255,255,255,0.06)'
          : '1px solid rgba(201,150,12,0.2)',
        borderRadius: '12px',
        padding: '1rem 0.75rem',
        textAlign: 'center',
        opacity: isPast && !isNext ? 0.6 : 1,
        transition: 'all 0.3s ease',
        animation: `fadeInUp 0.5s ease ${idx * 0.08}s both`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {isNext && (
        <div style={{
          position: 'absolute',
          top: '6px',
          left: '6px',
          background: prayer.color,
          color: '#fff',
          fontSize: '0.6rem',
          padding: '0.15rem 0.4rem',
          borderRadius: '4px',
          fontWeight: 700,
        }}>
          التالية
        </div>
      )}
      <div style={{ fontSize: '1.6rem', marginBottom: '0.3rem' }}>{prayer.icon}</div>
      <div style={{ 
        fontFamily: 'Amiri, serif',
        fontSize: '1rem',
        fontWeight: 700,
        color: isNext ? prayer.color : isPast ? '#9BA8BC' : '#F5F0E8',
        marginBottom: '0.1rem',
      }}>
        {prayer.label}
      </div>
      <div style={{ fontSize: '0.7rem', color: '#9BA8BC', marginBottom: '0.5rem' }}>
        {prayer.labelFr}
      </div>
      <div style={{
        fontSize: '1.4rem',
        fontWeight: 900,
        fontFamily: 'Cairo, sans-serif',
        color: isNext ? prayer.color : isPast ? '#9BA8BC' : '#F0C040',
        letterSpacing: '0.05em',
      }}>
        {time}
      </div>
      {isPast && !isNext && (
        <div style={{ fontSize: '0.7rem', color: '#9BA8BC', marginTop: '0.25rem' }}>✓ مضى</div>
      )}
    </div>
  );
}

function DaySelector({ dayNumber, selectedDay, onSelect, allEntries }) {
  const [showPicker, setShowPicker] = useState(false);

  const displayDay = selectedDay?.day || dayNumber;

  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        justifyContent: 'center',
      }}>
        <button
          onClick={() => {
            setShowPicker(!showPicker);
          }}
          style={{
            background: 'rgba(22, 32, 51, 0.8)',
            border: '1px solid rgba(201,150,12,0.4)',
            borderRadius: '8px',
            color: '#F0C040',
            padding: '0.4rem 0.75rem',
            fontFamily: 'Cairo, sans-serif',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          📅 اختر يوماً ▾
        </button>

        <div style={{ 
          fontFamily: 'Amiri, serif',
          fontSize: '1rem',
          color: '#F0C040',
        }}>
          اليوم {displayDay} من رمضان
          {!selectedDay && <span style={{ color: '#9BA8BC', fontSize: '0.85rem' }}> (اليوم)</span>}
        </div>

        {selectedDay && (
          <button
            onClick={() => onSelect(null)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(201,150,12,0.3)',
              borderRadius: '6px',
              color: '#9BA8BC',
              padding: '0.3rem 0.6rem',
              fontSize: '0.8rem',
              fontFamily: 'Cairo, sans-serif',
            }}
          >
            اليوم الحالي ✕
          </button>
        )}
      </div>

      {showPicker && (
        <DayPickerModal
          allEntries={allEntries}
          onSelect={(d) => { onSelect(d); setShowPicker(false); }}
          onClose={() => setShowPicker(false)}
          currentDay={displayDay}
        />
      )}
    </div>
  );
}

function DayPickerModal({ onSelect, onClose, currentDay, allEntries }) {
  const days = (allEntries || []).map(entry => ({
    dayNum: entry.day,
    label: entry.dateStr,
    entry,
  }));

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200 }} onClick={onClose} />
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#162033',
        border: '1px solid rgba(201,150,12,0.4)',
        borderRadius: '16px',
        padding: '1.5rem',
        zIndex: 201,
        width: 'min(90vw, 420px)',
        maxHeight: '80vh',
        overflowY: 'auto',
      }}>
        <h3 style={{ 
          fontFamily: 'Amiri, serif', 
          color: '#F0C040', 
          textAlign: 'center',
          marginBottom: '1rem',
          fontSize: '1.2rem',
        }}>
          اختر يوم رمضان
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '0.5rem',
        }}>
          {days.map(d => (
            <button
              key={d.dayNum}
              onClick={() => onSelect(d.entry || d)}
              style={{
                padding: '0.5rem 0.25rem',
                borderRadius: '8px',
                border: d.dayNum === currentDay 
                  ? '2px solid #C9960C' 
                  : '1px solid rgba(201,150,12,0.2)',
                background: d.dayNum === currentDay 
                  ? 'rgba(201,150,12,0.2)' 
                  : 'transparent',
                color: d.dayNum === currentDay ? '#F0C040' : '#F5F0E8',
                fontFamily: 'Cairo, sans-serif',
                fontSize: '0.8rem',
                textAlign: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if(d.dayNum !== currentDay) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { if(d.dayNum !== currentDay) e.currentTarget.style.background = 'transparent'; }}
            >
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>{d.dayNum}</div>
              <div style={{ color: '#9BA8BC', fontSize: '0.65rem' }}>{d.label}</div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
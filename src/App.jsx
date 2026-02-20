import { useState, useEffect, useMemo } from 'react';
import { MOROCCAN_CITIES, REGIONS } from './cities';
import { fetchRamadanTimes } from './prayerCalculator';
import Header from './components/Header';
import CitySelector from './components/CitySelector';
import TodayCard from './components/TodayCard';
import PrayerTable from './components/PrayerTable';
import Footer from './components/Footer';

function App() {
  const [selectedCityId, setSelectedCityId] = useState('casablanca');
  const [activeTab, setActiveTab] = useState('today');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [ramadanTimes, setRamadanTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState(null);

  // Clock tick
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const selectedCity = useMemo(
    () => MOROCCAN_CITIES.find(c => c.id === selectedCityId),
    [selectedCityId]
  );

  // Fetch times when city changes
  useEffect(() => {
    if (!selectedCity) return;
    setLoading(true);
    setError(null);
    setRamadanTimes([]);
    setLoadProgress(0);

    fetchRamadanTimes(selectedCity, (p) => setLoadProgress(p))
      .then(times => {
        setRamadanTimes(times);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('تعذر تحميل البيانات. تحقق من اتصالك بالإنترنت.');
        setLoading(false);
      });
  }, [selectedCity]);

  // Today's entry
  const todayEntry = useMemo(() => {
    const now = currentTime;
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const match = ramadanTimes.find(d =>
      d.date.getFullYear() === today.getFullYear() &&
      d.date.getMonth() === today.getMonth() &&
      d.date.getDate() === today.getDate()
    );
    return match || ramadanTimes[0] || null;
  }, [ramadanTimes, currentTime]);

  const todayDayOfRamadan = todayEntry?.day || 1;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header currentTime={currentTime} />

      <main style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 1rem 2rem' }}>

        <CitySelector
          cities={MOROCCAN_CITIES}
          regions={REGIONS}
          selectedCityId={selectedCityId}
          onSelect={setSelectedCityId}
        />

        <RamadanBanner />
        <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {loading ? (
          <LoadingScreen progress={loadProgress} city={selectedCity} />
        ) : error ? (
          <ErrorScreen message={error} onRetry={() => setSelectedCityId(s => s)} />
        ) : (
          activeTab === 'today' ? (
            <TodayCard
              entry={todayEntry}
              allEntries={ramadanTimes}
              city={selectedCity}
              currentTime={currentTime}
              dayNumber={todayDayOfRamadan}
            />
          ) : (
            <PrayerTable
              times={ramadanTimes}
              todayDay={todayDayOfRamadan}
              city={selectedCity}
            />
          )
        )}
      </main>

      <Footer />
    </div>
  );
}

function LoadingScreen({ progress, city }) {
  const percent = Math.round((progress / 30) * 100);
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      gap: '1.5rem',
      animation: 'fadeIn 0.4s ease',
    }}>
      {/* Animated moon */}
      <div style={{ fontSize: '3rem', animation: 'twinkle 1.5s ease-in-out infinite' }}>🌙</div>

      <div style={{
        fontFamily: 'Amiri, serif',
        fontSize: '1.3rem',
        color: '#F0C040',
        textAlign: 'center',
      }}>
        جاري تحميل مواقيت الصلاة
      </div>
      <div style={{ color: '#9BA8BC', fontSize: '0.9rem' }}>
        {city?.name} — {city?.nameFr} • من وزارة الأوقاف والشؤون الإسلامية
      </div>

      {/* Progress bar */}
      <div style={{
        width: '100%',
        maxWidth: '400px',
        height: '6px',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '3px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${percent || 10}%`,
          background: 'linear-gradient(to right, #C9960C, #F0C040)',
          borderRadius: '3px',
          transition: 'width 0.4s ease',
        }} />
      </div>
      <div style={{ color: '#9BA8BC', fontSize: '0.8rem' }}>
        {progress > 0 ? `${progress} / 30 يوم` : 'جاري الاتصال...'}
      </div>

      {/* Source note */}
      <div style={{
        marginTop: '1rem',
        padding: '0.75rem 1.5rem',
        background: 'rgba(201,150,12,0.08)',
        border: '1px solid rgba(201,150,12,0.2)',
        borderRadius: '10px',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: '#9BA8BC',
        maxWidth: '420px',
      }}>
        🕌 التواقيت من <strong style={{color: '#F0C040'}}>aladhan.com</strong> بمنهج المنهج المغربي (فجر -18°، عشاء -17°)
      </div>
    </div>
  );
}

function ErrorScreen({ message, onRetry }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '4rem 2rem',
      gap: '1rem',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '3rem' }}>⚠️</div>
      <div style={{ color: '#FC8181', fontSize: '1.1rem', fontFamily: 'Cairo, sans-serif' }}>{message}</div>
      <button
        onClick={onRetry}
        style={{
          marginTop: '1rem',
          padding: '0.75rem 2rem',
          background: 'linear-gradient(135deg, #C9960C, #8B6508)',
          border: 'none',
          borderRadius: '10px',
          color: '#FFF8DC',
          fontFamily: 'Cairo, sans-serif',
          fontSize: '1rem',
          fontWeight: 700,
        }}
      >
        إعادة المحاولة
      </button>
    </div>
  );
}

function RamadanBanner() {
  return (
    <div style={{
      margin: '1rem 0',
      padding: '1rem 1.5rem',
      background: 'linear-gradient(135deg, rgba(201,150,12,0.15) 0%, rgba(201,150,12,0.05) 100%)',
      border: '1px solid rgba(201,150,12,0.3)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      flexWrap: 'wrap',
      textAlign: 'center',
      animation: 'fadeInUp 0.6s ease forwards',
    }}>
      <span style={{ fontSize: '1.8rem' }}>🌙</span>
      <div>
        <div style={{
          fontFamily: 'Amiri, serif',
          fontSize: 'clamp(1rem, 3vw, 1.4rem)',
          color: '#F0C040',
          fontWeight: 700,
          lineHeight: 1.3,
        }}>
          رمضان المبارك 1447 هـ — 19 فبراير / 19 مارس 2026
        </div>
        <div style={{ fontSize: '0.85rem', color: '#9BA8BC', marginTop: '0.25rem' }}>
          مواقيت الصلاة حسب منهج وزارة الأوقاف والشؤون الإسلامية المغربية
        </div>
      </div>
      <span style={{ fontSize: '1.8rem' }}>⭐</span>
    </div>
  );
}

function TabNav({ activeTab, setActiveTab }) {
  return (
    <div style={{
      display: 'flex',
      gap: '0.5rem',
      margin: '1.5rem 0 1rem',
      background: 'rgba(22, 32, 51, 0.8)',
      borderRadius: '12px',
      padding: '0.4rem',
      border: '1px solid rgba(201,150,12,0.2)',
    }}>
      {[
        { id: 'today', label: 'يوم بيوم', icon: '📅' },
        { id: 'full',  label: 'جدول كامل', icon: '📋' },
      ].map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          style={{
            flex: 1,
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === tab.id
              ? 'linear-gradient(135deg, #C9960C, #8B6508)'
              : 'transparent',
            color: activeTab === tab.id ? '#FFF8DC' : '#9BA8BC',
            fontFamily: 'Cairo, sans-serif',
            fontSize: '1rem',
            fontWeight: activeTab === tab.id ? 700 : 400,
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            boxShadow: activeTab === tab.id ? '0 4px 12px rgba(201,150,12,0.3)' : 'none',
          }}
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

export default App;
import { useState, useMemo } from 'react';

export default function CitySelector({ cities, regions, selectedCityId, onSelect }) {
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [isOpen, setIsOpen] = useState(false);

  const selectedCity = cities.find(c => c.id === selectedCityId);

  const filteredCities = useMemo(() => {
    const s = search.trim().toLowerCase();
    return cities.filter(city => {
      const inRegion = selectedRegion === 'all' || city.region === selectedRegion;
      const inSearch = s === ''
        || city.name.includes(search.trim())
        || city.nameFr.toLowerCase().includes(s)
        || city.id.includes(s);
      return inRegion && inSearch;
    });
  }, [cities, selectedRegion, search]);

  const handleSelect = (cityId) => {
    onSelect(cityId);
    setIsOpen(false);
    setSearch('');
    setSelectedRegion('all');
  };

  const regionLabels = {
    'الدار البيضاء-سطات': 'الدار البيضاء',
    'جهة الرباط-سلا-القنيطرة': 'الرباط',
    'فاس-مكناس': 'فاس',
    'مراكش-آسفي': 'مراكش',
    'طنجة-تطوان-الحسيمة': 'طنجة',
    'الشرق': 'الشرق',
    'سوس-ماسة': 'سوس',
    'بني ملال-خنيفرة': 'بني ملال',
    'درعة-تافيلالت': 'درعة',
    'كلميم-واد نون': 'كلميم',
    'العيون-الساقية الحمراء': 'العيون',
    'الداخلة-وادي الذهب': 'الداخلة',
  };

  return (
    <>
      {/* Global style for placeholder */}
      <style>{`
        .city-search::placeholder { color: #9BA8BC; opacity: 1; }
        .city-search:focus { border-color: rgba(201,150,12,0.7) !important; background: #1E2E4A !important; }
      `}</style>

      <div style={{ position: 'relative', margin: '1.5rem 0 0.5rem' }}>

        {/* Trigger button */}
        <button
          onClick={() => setIsOpen(v => !v)}
          style={{
            width: '100%',
            padding: '1rem 1.5rem',
            background: 'linear-gradient(135deg, #162033, #1A2740)',
            border: `1px solid ${isOpen ? '#C9960C' : 'rgba(201,150,12,0.4)'}`,
            borderRadius: '12px',
            color: '#F5F0E8',
            fontFamily: 'Cairo, sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            cursor: 'pointer',
            transition: 'border-color 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.4rem' }}>🗺️</span>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#9BA8BC', fontSize: '0.72rem' }}>المدينة المختارة</div>
              <div style={{
                fontSize: '1.05rem', fontWeight: 700,
                background: 'linear-gradient(135deg, #F0C040, #C9960C)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                {selectedCity?.name} — {selectedCity?.nameFr}
              </div>
            </div>
          </div>
          <span style={{
            color: '#C9960C', fontSize: '1rem',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.3s ease',
            flexShrink: 0,
          }}>▼</span>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <>
            <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setIsOpen(false)} />
            <div style={{
              position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0,
              background: '#0F1923',
              border: '1px solid rgba(201,150,12,0.5)',
              borderRadius: '12px',
              zIndex: 100,
              boxShadow: '0 24px 64px rgba(0,0,0,0.8)',
              overflow: 'hidden',
            }}>

              {/* ====== حقل البحث ====== */}
              <div style={{
                padding: '0.75rem',
                background: '#0F1923',
                borderBottom: '1px solid rgba(201,150,12,0.15)',
              }}>
                <div style={{ position: 'relative' }}>
                  {/* أيقونة البحث */}
                  <span style={{
                    position: 'absolute',
                    right: '0.9rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '1rem',
                    pointerEvents: 'none',
                    color: '#C9960C',
                  }}>🔍</span>
                  <input
                    className="city-search"
                    autoFocus
                    type="text"
                    placeholder="اكتب اسم مدينتك... مراكش، Fes، agadir"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 2.5rem 0.75rem 1rem',
                      background: '#1A2740',
                      border: '1.5px solid rgba(201,150,12,0.4)',
                      borderRadius: '8px',
                      color: '#F5F0E8',
                      fontFamily: 'Cairo, sans-serif',
                      fontSize: '1rem',
                      outline: 'none',
                      direction: 'rtl',
                      boxSizing: 'border-box',
                      transition: 'all 0.2s ease',
                    }}
                  />
                </div>
              </div>

              {/* ====== فلتر الجهة ====== */}
              <div style={{
                display: 'flex',
                gap: '0.4rem',
                padding: '0.6rem 0.75rem',
                overflowX: 'auto',
                background: '#0D1520',
                borderBottom: '1px solid rgba(201,150,12,0.12)',
                scrollbarWidth: 'none',
              }}>
                <Pill label="الكل" active={selectedRegion === 'all'} onClick={() => setSelectedRegion('all')} />
                {regions.map(r => (
                  <Pill
                    key={r}
                    label={regionLabels[r] || r.split('-')[0]}
                    active={selectedRegion === r}
                    onClick={() => setSelectedRegion(r)}
                  />
                ))}
              </div>

              {/* ====== قائمة المدن ====== */}
              <div style={{ maxHeight: '340px', overflowY: 'auto', background: '#0F1923' }}>
                {filteredCities.length === 0 ? (
                  <div style={{
                    padding: '2.5rem',
                    textAlign: 'center',
                    color: '#9BA8BC',
                    fontSize: '0.9rem',
                    fontFamily: 'Cairo, sans-serif',
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>😕</div>
                    ما لقيناش <strong style={{ color: '#F0C040' }}>"{search}"</strong> — جرب اسم آخر
                  </div>
                ) : (
                  filteredCities.map(city => (
                    <CityRow
                      key={city.id}
                      city={city}
                      isSelected={city.id === selectedCityId}
                      onClick={() => handleSelect(city.id)}
                    />
                  ))
                )}
              </div>

              {/* Footer */}
              <div style={{
                padding: '0.5rem 1rem',
                fontSize: '0.7rem',
                color: '#4B5563',
                textAlign: 'center',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                background: '#0D1520',
              }}>
                {filteredCities.length} مدينة متاحة
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function Pill({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      flexShrink: 0,
      padding: '0.3rem 0.75rem',
      borderRadius: '20px',
      border: active ? '1px solid #C9960C' : '1px solid rgba(201,150,12,0.25)',
      background: active ? 'rgba(201,150,12,0.25)' : 'rgba(255,255,255,0.03)',
      color: active ? '#F0C040' : '#9BA8BC',
      fontFamily: 'Cairo, sans-serif',
      fontSize: '0.78rem',
      whiteSpace: 'nowrap',
      cursor: 'pointer',
      transition: 'all 0.15s ease',
    }}>
      {label}
    </button>
  );
}

function CityRow({ city, isSelected, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        padding: '0.7rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: isSelected
          ? 'rgba(201,150,12,0.15)'
          : hovered ? 'rgba(255,255,255,0.06)' : 'transparent',
        border: 'none',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        borderRight: isSelected ? '3px solid #C9960C' : '3px solid transparent',
        color: '#F5F0E8',
        fontFamily: 'Cairo, sans-serif',
        cursor: 'pointer',
        textAlign: 'right',
        transition: 'all 0.15s ease',
      }}
    >
      <div style={{ textAlign: 'right' }}>
        <div style={{
          fontWeight: 600,
          fontSize: '1rem',
          color: isSelected ? '#F0C040' : '#F5F0E8',
        }}>
          {city.name}
        </div>
        <div style={{ fontSize: '0.72rem', color: '#6B7B8E', marginTop: '0.1rem' }}>
          {city.region}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
        <span style={{ fontSize: '0.82rem', color: '#9BA8BC' }}>{city.nameFr}</span>
        {isSelected && (
          <span style={{
            color: '#C9960C',
            fontWeight: 700,
            fontSize: '1rem',
          }}>✓</span>
        )}
      </div>
    </button>
  );
}
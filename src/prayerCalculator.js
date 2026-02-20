// ============================================================
// التواقيت من aladhan.com API
// Method 21 = وزارة الأوقاف والشؤون الإسلامية المغربية
// ============================================================

const ALADHAN_BASE = 'https://api.aladhan.com/v1';

// Method 21 = Morocco Ministry of Islamic Affairs
// هذه هي نفس الطريقة المستخدمة من وزارة الأوقاف
const METHOD = 21;

function cleanTime(t) {
  // aladhan يرجع "05:42 (+01:00)" - نحتاج فقط "05:42"
  return t ? t.split(' ')[0] : '--:--';
}

/**
 * جلب تواقيت رمضان كامل لمدينة معينة
 * رمضان 1447: 19 فبراير -> 19 مارس 2026
 */
export async function fetchRamadanTimes(city, onProgress) {
  const results = [];

  // رمضان 2026: 19 فبراير (يوم 1) -> 20 مارس (يوم 30)
  // نجيب شهر فبراير 2026 وشهر مارس 2026
  const months = [
    { year: 2026, month: 2, startDay: 19, days: 10 }, // 19-28 فبراير
    { year: 2026, month: 3, startDay: 1,  days: 20 }, // 1-20 مارس
  ];

  let dayCount = 1;

  for (const m of months) {
    const url = `${ALADHAN_BASE}/calendar/${m.year}/${m.month}?latitude=${city.lat}&longitude=${city.lon}&method=${METHOD}`;
    
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    
    if (json.status !== 'OK') throw new Error('API error: ' + json.data);
    
    const allDays = json.data; // 28 أو 31 يوم
    
    for (let d = m.startDay; d <= m.startDay + m.days - 1; d++) {
      const dayData = allDays[d - 1]; // 0-indexed
      if (!dayData) continue;
      
      const t = dayData.timings;
      const date = dayData.date;
      
      results.push({
        day: dayCount,
        dateStr: date.readable, // "19 Feb 2026"
        dateGregorian: `${String(d).padStart(2,'0')}/${String(m.month).padStart(2,'0')}/${m.year}`,
        dayName: getDayName(m.year, m.month, d),
        date: new Date(m.year, m.month - 1, d),
        hijri: `${date.hijri.day} ${date.hijri.month.ar} ${date.hijri.year}هـ`,
        fajr:    cleanTime(t.Fajr),
        shuruq:  cleanTime(t.Sunrise),
        dhuhr:   cleanTime(t.Dhuhr),
        asr:     cleanTime(t.Asr),
        maghrib: cleanTime(t.Maghrib),
        isha:    cleanTime(t.Isha),
      });
      
      dayCount++;
      if (onProgress) onProgress(dayCount - 1);
    }
  }

  return results;
}

function getDayName(year, month, day) {
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('ar-MA', { weekday: 'long' });
}
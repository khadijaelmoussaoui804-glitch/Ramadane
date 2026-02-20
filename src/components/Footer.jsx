export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(201,150,12,0.15)',
      padding: '2rem 1rem',
      textAlign: 'center',
      background: 'rgba(10,14,26,0.8)',
    }}>
      {/* Decorative divider */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '1.5rem',
      }}>
        <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to right, transparent, rgba(201,150,12,0.4))' }} />
        <span style={{ color: '#C9960C', fontSize: '1rem' }}>✦ ✦ ✦</span>
        <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to left, transparent, rgba(201,150,12,0.4))' }} />
      </div>

      <div style={{
        fontFamily: 'Amiri, serif',
        fontSize: '1.2rem',
        color: '#F0C040',
        marginBottom: '0.5rem',
      }}>
        رمضان كريم 🌙
      </div>

      <div style={{
        fontSize: '0.8rem',
        color: '#9BA8BC',
        lineHeight: 1.8,
      }}>
        <p>المواقيت محسوبة وفق المنهج الفلكي لوزارة الأوقاف والشؤون الإسلامية المغربية</p>
        <p>زاوية الفجر: -18° | زاوية العشاء: -17° | طريقة حساب العصر: الشافعي</p>
        <p style={{ marginTop: '0.5rem', color: '#6B7280', fontSize: '0.75rem' }}>
          يُنصح بمراجعة إمارة منطقتكم للتحقق من المواقيت الرسمية المحلية
        </p>
      </div>

      <div style={{ 
        marginTop: '1rem', 
        fontSize: '0.7rem', 
        color: '#4B5563' 
      }}>
        تواقيت الصلاة — رمضان 2026 | المملكة المغربية 🇲🇦
      </div>
    </footer>
  );
}
import { useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const G = '#C9A84C';
const TEXT = '#E8D5A3';
const TEXT_DIM = 'rgba(232,213,163,0.6)';

const CONTACTS = [
  { icon: 'Phone', label: 'Телефон', value: '+7 (904) 752-99-59', href: 'tel:+79047529959' },
  { icon: 'Mail', label: 'Email', value: 'narek_manukyan_2020@list.ru', href: 'mailto:narek_manukyan_2020@list.ru' },
  { icon: 'MessageCircle', label: 'Telegram', value: '@mannv_24', href: 'https://t.me/mannv_24' },
  { icon: 'Monitor', label: 'Занятия онлайн', value: 'Яндекс Телемост', href: 'https://telemost.yandex.ru' },
];

export default function ContactsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible')); }),
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="contacts" style={{ padding: '8rem 0', background: '#060606', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: G, marginBottom: '1rem' }}>— Контакты</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 300, color: TEXT }}>Свяжитесь со мной</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>

          <div className="reveal">
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: G, marginBottom: '2rem' }}>Способы связи</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {CONTACTS.map((c) => (
                <a key={c.icon} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', textDecoration: 'none', padding: '1rem 1.2rem', border: '1px solid rgba(201,168,76,0.12)', transition: 'all 0.3s' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.4)'; (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.04)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.12)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                  <div style={{ width: 44, height: 44, border: '1px solid rgba(201,168,76,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: G, flexShrink: 0 }}>
                    <Icon name={c.icon as Parameters<typeof Icon>[0]['name']} size={18} fallback="Phone" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(232,213,163,0.38)' }}>{c.label}</div>
                    <div style={{ fontSize: '0.95rem', color: TEXT, marginTop: '0.1rem' }}>{c.value}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', color: 'rgba(201,168,76,0.3)' }}>
                    <Icon name="ArrowUpRight" size={16} />
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div style={{ background: '#0F0F0F', border: '1px solid rgba(201,168,76,0.15)', padding: '3rem', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '5rem', color: 'rgba(201,168,76,0.1)', lineHeight: 1, marginBottom: '1.5rem' }}>♟</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: TEXT, marginBottom: '1rem', fontWeight: 300 }}>
                Первое занятие бесплатно
              </h3>
              <p style={{ color: TEXT_DIM, lineHeight: 1.7, marginBottom: '2rem', fontSize: '0.92rem' }}>
                Пробное занятие 30 минут — познакомимся, оценим уровень и наметим план обучения. Онлайн через <strong style={{ color: G }}>Яндекс Телемост</strong>. Без обязательств.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <a href="https://t.me/mannv_24" target="_blank" rel="noreferrer" className="btn-gold"
                  style={{ display: 'block', padding: '1rem 2.5rem', fontSize: '0.75rem', borderRadius: 2, textDecoration: 'none' }}>
                  Написать в Telegram
                </a>
                <a href="tel:+79047529959" className="btn-outline-gold"
                  style={{ display: 'block', padding: '0.9rem 2.5rem', fontSize: '0.75rem', borderRadius: 2, textDecoration: 'none' }}>
                  Позвонить
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

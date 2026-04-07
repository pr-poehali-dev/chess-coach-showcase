import { useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMAGE = 'https://cdn.poehali.dev/projects/3479418a-d4a7-434d-8e42-d90b449db16b/files/05c18d9f-951c-4931-ab99-c034676e49b4.jpg';
const G = '#C9A84C';
const TEXT = '#E8D5A3';
const TEXT_DIM = 'rgba(232,213,163,0.62)';

const FACTS = [
  { icon: 'Trophy', label: 'Чемпион России', value: '2015, 2018, 2020' },
  { icon: 'TrendingUp', label: 'Рейтинг ELO', value: '2680' },
  { icon: 'BookOpen', label: 'Автор 3 книг', value: 'по стратегии' },
  { icon: 'Globe', label: 'Турниры', value: '30+ стран' },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible')); }),
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="about" style={{ padding: '8rem 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

          {/* Photo */}
          <div className="reveal" style={{ position: 'relative' }}>
            <img src={HERO_IMAGE} alt="О тренере" style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', filter: 'grayscale(15%)' }} />
            <div style={{ position: 'absolute', bottom: -20, right: -20, background: G, padding: '1.5rem 1.8rem', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: '#0A0A0A', lineHeight: 1 }}>♟</div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '0.55rem', letterSpacing: '0.15em', color: '#0A0A0A', marginTop: '0.3rem', textTransform: 'uppercase' }}>ГРОССМЕЙСТЕР</div>
            </div>
          </div>

          {/* Content */}
          <div className="reveal reveal-delay-2">
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: G, marginBottom: '1rem' }}>— Обо мне</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: '2rem', color: TEXT }}>
              Более 20 лет<br /><span style={{ color: G, fontStyle: 'italic' }}>в шахматах</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', color: TEXT_DIM, fontSize: '0.95rem', lineHeight: 1.8 }}>
              <p>Я начал играть в 7 лет, и с тех пор шахматы стали смыслом моей жизни. Международный гроссмейстер ФИДЕ, чемпион России, победитель более 50 международных турниров.</p>
              <p>Тренерской работой занимаюсь с 2004 года. За это время подготовил 3 гроссмейстеров, 15 мастеров спорта и более 500 разрядников. Индивидуальная программа — для каждого ученика.</p>
              <p>Работаю с детьми от 5 лет и взрослыми любого уровня. Офлайн в Москве и онлайн по всему миру.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2.5rem' }}>
              {FACTS.map((f) => (
                <div key={f.icon}
                  style={{ border: '1px solid rgba(201,168,76,0.15)', padding: '1.2rem', transition: 'all 0.3s', cursor: 'default' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.4)'; (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.04)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.15)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Icon name={f.icon as Parameters<typeof Icon>[0]['name']} size={14} fallback="Star" />
                    <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: G }}>{f.value}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: TEXT_DIM }}>{f.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

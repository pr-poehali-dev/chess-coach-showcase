import { useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const G = '#C9A84C';
const TEXT = '#E8D5A3';
const TEXT_DIM = 'rgba(232,213,163,0.55)';
const CARD_BG = '#141414';

const ACHIEVEMENTS = [
  { year: '🏆', title: 'Чемпион Волгоградской области', place: '2-кратный — среди мужчин и женщин', icon: 'Trophy' },
  { year: '🥇', title: 'Чемпион ЮФО до 19 лет', place: '1 место — Южный федеральный округ', icon: 'Award' },
  { year: '🥈', title: 'Призёр Первенства России', place: 'До 19 лет — всероссийский уровень', icon: 'Medal' },
  { year: '🏅', title: 'Чемпион ВолгГТУ', place: 'В составе университета — среди вузов', icon: 'Star' },
  { year: '🎓', title: 'Кандидат в мастера спорта', place: 'Официальное спортивное звание КМС', icon: 'Crown' },
  { year: '👨‍🏫', title: 'Тренер с результатами', place: 'Ученики — призёры в Волгограде, Москве, Абакане, Ростове', icon: 'Users' },
];

const STATS = [
  { value: '2×', label: 'Чемпион области', icon: 'Trophy' },
  { value: 'КМС', label: 'Официальное звание', icon: 'Award' },
  { value: '5+', label: 'Городов побед учеников', icon: 'Globe' },
  { value: 'online', label: 'Яндекс Телемост', icon: 'Monitor' },
];

export default function AchievementsSection() {
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
    <section ref={ref} id="achievements" style={{ padding: '8rem 0', background: 'rgba(201,168,76,0.02)', borderTop: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: G, marginBottom: '1rem' }}>— Достижения</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 300, color: TEXT }}>Путь к вершине</h2>
          <p style={{ color: TEXT_DIM, marginTop: '0.8rem', fontSize: '0.95rem' }}>Годы упорных тренировок и тысячи партий</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
          {STATS.map((s, i) => (
            <div key={s.label} className={`reveal reveal-delay-${i + 1} card-hover`}
              style={{ background: CARD_BG, border: '1px solid rgba(201,168,76,0.12)', padding: '2rem', textAlign: 'center' }}>
              <div style={{ color: G, marginBottom: '1rem', opacity: 0.7 }}>
                <Icon name={s.icon as Parameters<typeof Icon>[0]['name']} size={22} fallback="Star" />
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 300, color: G, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: TEXT_DIM, marginTop: '0.5rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {ACHIEVEMENTS.map((a, i) => (
            <div key={i} className={`reveal reveal-delay-${(i % 4) + 1} card-hover`}
              style={{ background: CARD_BG, border: '1px solid rgba(201,168,76,0.12)', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: `linear-gradient(180deg, ${G}, transparent)` }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ fontSize: '1.6rem' }}>{a.year}</div>
                <div style={{ color: G, opacity: 0.4 }}>
                  <Icon name={a.icon as Parameters<typeof Icon>[0]['name']} size={18} fallback="Star" />
                </div>
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 600, color: TEXT, marginBottom: '0.4rem' }}>{a.title}</h3>
              <p style={{ color: TEXT_DIM, fontSize: '0.85rem', lineHeight: 1.5 }}>{a.place}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMAGE = 'https://cdn.poehali.dev/projects/3479418a-d4a7-434d-8e42-d90b449db16b/files/05c18d9f-951c-4931-ab99-c034676e49b4.jpg';
const G = '#C9A84C';
const TEXT = '#E8D5A3';
const TEXT_DIM = 'rgba(232,213,163,0.62)';

const FACTS = [
  { icon: 'Trophy', label: 'Чемпион Волгоградской области', value: '2-кратный' },
  { icon: 'Star', label: 'КМС по шахматам', value: 'Официальный' },
  { icon: 'Award', label: 'Чемпион ЮФО до 19 лет', value: 'Победитель' },
  { icon: 'Globe', label: 'Ученики из городов', value: 'Вся Россия' },
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

          {/* Photo placeholder */}
          <div className="reveal" style={{ position: 'relative' }}>
            <div style={{ width: '100%', aspectRatio: '3/4', background: 'linear-gradient(135deg, #141414, #1e1a10)', border: '1px solid rgba(201,168,76,0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '8rem', color: 'rgba(201,168,76,0.25)', lineHeight: 1 }}>♟</div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)', textAlign: 'center', padding: '0 2rem' }}>
                Нарек Манукян<br />Шахматный тренер
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: -20, right: -20, background: G, padding: '1.5rem 1.8rem', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: '#0A0A0A', lineHeight: 1 }}>КМС</div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '0.55rem', letterSpacing: '0.15em', color: '#0A0A0A', marginTop: '0.3rem', textTransform: 'uppercase' }}>по шахматам</div>
            </div>
          </div>

          {/* Content */}
          <div className="reveal reveal-delay-2">
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: G, marginBottom: '1rem' }}>— Обо мне</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: '2rem', color: TEXT }}>
              Нарек<br /><span style={{ color: G, fontStyle: 'italic' }}>Манукян</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', color: TEXT_DIM, fontSize: '0.95rem', lineHeight: 1.8 }}>
              <p>Кандидат в мастера спорта по шахматам с многолетним опытом игры и подготовки. Двукратный чемпион Волгоградской области, чемпион ЮФО до 19 лет, призёр Первенства России.</p>
              <p>Благодаря высокому уровню игры и системному подходу успешно обучаю детей и взрослых — от новичков до продвинутых игроков. Мои ученики — призёры соревнований в Волгограде, Москве, Абакане, Ростове и других городах.</p>
              <p>Занятия проходят онлайн через <strong style={{ color: G }}>Яндекс Телемост</strong>. Подхожу к каждому индивидуально — с учётом возраста, уровня и целей.</p>
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
import { useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => {
              el.classList.add('visible');
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const facts: { icon: string; label: string; year: string }[] = [
    { icon: 'Trophy', label: 'Чемпион России', year: '2015, 2018' },
    { icon: 'Star', label: 'Рейтинг FIDE', year: '2750+' },
    { icon: 'BookOpen', label: 'Автор 3 книг', year: 'по стратегии' },
    { icon: 'Globe', label: 'Турниры в 30+ странах', year: 'мировой опыт' },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-24 relative overflow-hidden bg-chess-dark">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 pointer-events-none">
        <div className="text-[400px] font-black text-white/10 leading-none select-none" style={{ fontFamily: 'serif' }}>
          ♟
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Познакомимся</span>
          <h2 className="text-5xl font-black mt-2 text-white">
            Обо <span className="text-gradient-gold">мне</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Avatar placeholder */}
          <div className="reveal reveal-delay-1 flex justify-center lg:justify-start">
            <div className="relative">
              {/* Rotating ring */}
              <div 
                className="absolute inset-0 rounded-full animate-spin-slow opacity-50"
                style={{ 
                  background: 'conic-gradient(from 0deg, #FFD700, #7C3AED, #06B6D4, #FFD700)',
                  padding: '3px',
                  borderRadius: '50%'
                }}
              />
              <div className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-chess-darker"
                style={{ boxShadow: '0 0 60px rgba(255,215,0,0.3)' }}>
                <div className="w-full h-full bg-gradient-to-br from-amber-900/30 to-purple-900/30 flex items-center justify-center">
                  <span className="text-9xl">♚</span>
                </div>
              </div>
              {/* Badge */}
              <div className="absolute -bottom-4 -right-4 bg-amber-400 text-black font-black text-sm px-4 py-2 rounded-full shadow-lg">
                GM • FIDE 2750+
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="reveal reveal-delay-2">
              <h3 className="text-3xl font-bold text-white mb-4">
                14 лет в мире большого шахматного спорта
              </h3>
              <p className="text-white/60 leading-relaxed text-lg">
                Я начал играть в шахматы в 6 лет и уже в 19 получил звание международного гроссмейстера. 
                За годы карьеры я участвовал в сотнях турниров по всему миру, дважды становился 
                чемпионом России и входил в топ-20 мирового рейтинга.
              </p>
            </div>

            <div className="reveal reveal-delay-3">
              <p className="text-white/60 leading-relaxed text-lg">
                Сейчас моя главная страсть — передавать знания ученикам всех уровней: 
                от начинающих детей до опытных игроков, стремящихся к профессиональному уровню. 
                Мой метод основан на глубоком понимании позиции и развитии интуиции.
              </p>
            </div>

            {/* Facts grid */}
            <div className="reveal reveal-delay-4 grid grid-cols-2 gap-4">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 hover:border-amber-400/30 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center group-hover:bg-amber-400/30 transition-colors">
                      <Icon name={fact.icon} size={16} className="text-amber-400" />
                    </div>
                    <span className="text-amber-400 text-sm font-semibold">{fact.year}</span>
                  </div>
                  <div className="text-white font-medium">{fact.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
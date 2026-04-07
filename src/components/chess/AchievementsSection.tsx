import { useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

export default function AchievementsSection() {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const achievements = [
    {
      year: '2024',
      title: 'Кубок Европы',
      place: '2 место',
      icon: '🥈',
      color: 'from-gray-400/20 to-gray-600/10',
      border: 'border-gray-400/30',
    },
    {
      year: '2022',
      title: 'Чемпионат мира FIDE',
      place: 'Топ-8',
      icon: '🌍',
      color: 'from-cyan-400/20 to-cyan-600/10',
      border: 'border-cyan-400/30',
    },
    {
      year: '2021',
      title: 'Мемориал Таля',
      place: '1 место',
      icon: '🥇',
      color: 'from-amber-400/20 to-amber-600/10',
      border: 'border-amber-400/30',
    },
    {
      year: '2020',
      title: 'Суперфинал России',
      place: '1 место',
      icon: '🏆',
      color: 'from-amber-400/20 to-orange-600/10',
      border: 'border-amber-400/30',
    },
    {
      year: '2018',
      title: 'Чемпион России',
      place: '1 место',
      icon: '♛',
      color: 'from-purple-400/20 to-purple-600/10',
      border: 'border-purple-400/30',
    },
    {
      year: '2015',
      title: 'Чемпион России',
      place: '1 место',
      icon: '♚',
      color: 'from-amber-400/20 to-yellow-600/10',
      border: 'border-amber-400/30',
    },
  ];

  const stats = [
    { value: '47', label: 'Турнирных побед', icon: 'Trophy' },
    { value: '2750', label: 'Пиковый рейтинг FIDE', icon: 'TrendingUp' },
    { value: '1200+', label: 'Сыграно партий', icon: 'Gamepad2' },
    { value: '30+', label: 'Стран участий', icon: 'Globe' },
  ];

  return (
    <section ref={sectionRef} id="achievements" className="py-24 bg-chess-darker relative overflow-hidden chess-pattern">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-px top-0" style={{ background: 'linear-gradient(90deg, transparent, #FFD700, transparent)' }} />
        <div className="absolute w-full h-px bottom-0" style={{ background: 'linear-gradient(90deg, transparent, #7C3AED, transparent)' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 reveal">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Карьера</span>
          <h2 className="text-5xl font-black mt-2 text-white">
            Мои <span className="text-gradient-gold">достижения</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Годы упорных тренировок и тысячи партий привели к этим результатам
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`reveal reveal-delay-${i + 1} p-6 rounded-2xl border border-white/10 bg-white/5 text-center hover:border-amber-400/30 hover:bg-white/8 transition-all duration-300 group`}
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-amber-400/10 flex items-center justify-center group-hover:bg-amber-400/20 transition-colors">
                <Icon name={stat.icon as Parameters<typeof Icon>[0]['name']} size={24} className="text-amber-400" />
              </div>
              <div className="text-4xl font-black text-gradient-gold">{stat.value}</div>
              <div className="text-white/50 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden lg:block"
            style={{ background: 'linear-gradient(180deg, #FFD700, #7C3AED, #06B6D4)' }} />

          <div className="space-y-6 lg:space-y-0">
            {achievements.map((achievement, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${(i % 4) + 1} lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center mb-8`}
              >
                {i % 2 === 0 ? (
                  <>
                    <div className="lg:text-right lg:pr-8">
                      <div className={`inline-block p-5 rounded-2xl border bg-gradient-to-br ${achievement.color} ${achievement.border} hover:scale-105 transition-transform duration-300 cursor-default`}>
                        <div className="flex items-center gap-4 lg:flex-row-reverse">
                          <span className="text-4xl">{achievement.icon}</span>
                          <div className="lg:text-right">
                            <div className="text-amber-400 text-sm font-semibold">{achievement.year}</div>
                            <div className="text-white font-bold text-lg">{achievement.title}</div>
                            <div className="text-white/60">{achievement.place}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Dot */}
                    <div className="hidden lg:flex items-center">
                      <div className="w-4 h-4 -ml-2 rounded-full bg-amber-400 border-4 border-chess-darker shadow-lg" 
                        style={{ boxShadow: '0 0 15px rgba(255,215,0,0.5)' }} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="hidden lg:block" />
                    <div className="lg:pl-8">
                      <div className={`inline-block p-5 rounded-2xl border bg-gradient-to-br ${achievement.color} ${achievement.border} hover:scale-105 transition-transform duration-300 cursor-default`}>
                        <div className="flex items-center gap-4">
                          <span className="text-4xl">{achievement.icon}</span>
                          <div>
                            <div className="text-amber-400 text-sm font-semibold">{achievement.year}</div>
                            <div className="text-white font-bold text-lg">{achievement.title}</div>
                            <div className="text-white/60">{achievement.place}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

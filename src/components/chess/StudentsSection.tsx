import { useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

export default function StudentsSection() {
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

  const students = [
    {
      name: 'Максим Орлов',
      age: 17,
      level: 'Кандидат в мастера',
      result: 'Победитель юношеского ЧР 2024',
      emoji: '👦',
      rating: 2200,
      quote: 'Александр показал мне шахматы с совершенно другой стороны. Теперь я понимаю игру на несколько уровней глубже.',
      stars: 5,
    },
    {
      name: 'Елена Соколова',
      age: 32,
      level: 'Первый разряд',
      result: '+400 очков рейтинга за год',
      emoji: '👩',
      rating: 1850,
      quote: 'Начала с нуля, через год выиграла городской турнир. Методика работает потрясающе!',
      stars: 5,
    },
    {
      name: 'Артём Белов',
      age: 12,
      level: 'Второй разряд',
      result: 'Чемпион школьной лиги',
      emoji: '🧒',
      rating: 1600,
      quote: 'Мой сын обожает занятия! Александр умеет объяснять сложное понятно для детей.',
      stars: 5,
    },
    {
      name: 'Дмитрий Новиков',
      age: 45,
      level: 'Любитель → 1 разряд',
      result: 'Победитель корпоративного турнира',
      emoji: '👨',
      rating: 1780,
      quote: 'В 45 лет думал, что поздно учиться. Оказалось, нет предела совершенству!',
      stars: 5,
    },
  ];

  return (
    <section ref={sectionRef} id="students" className="py-24 bg-chess-darker relative overflow-hidden chess-pattern">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-px top-0" style={{ background: 'linear-gradient(90deg, transparent, #06B6D4, transparent)' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 reveal">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Результаты</span>
          <h2 className="text-5xl font-black mt-2 text-white">
            Мои <span className="text-gradient-purple">ученики</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Истории успеха тех, кто уже прошёл путь под моим руководством
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {students.map((student, i) => (
            <div
              key={student.name}
              className={`reveal reveal-delay-${(i % 4) + 1} p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-purple-400/30 hover:bg-white/8 transition-all duration-300 group`}
            >
              <div className="flex items-start gap-4 mb-4">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2))' }}>
                  {student.emoji}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-white font-bold truncate">{student.name}</h3>
                    <span className="text-xs text-white/40 flex-shrink-0">{student.age} лет</span>
                  </div>
                  <div className="text-purple-400 text-sm font-medium">{student.level}</div>
                  
                  {/* Stars */}
                  <div className="flex gap-0.5 mt-1">
                    {Array(student.stars).fill(null).map((_, j) => (
                      <Icon key={j} name="Star" size={12} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-white/60 text-sm italic leading-relaxed mb-4 border-l-2 border-purple-400/40 pl-4">
                "{student.quote}"
              </blockquote>

              {/* Result badge */}
              <div className="flex items-center gap-2 p-3 rounded-lg"
                style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
                <Icon name="TrendingUp" size={14} className="text-purple-400 flex-shrink-0" />
                <span className="text-purple-300 text-sm font-medium">{student.result}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="reveal mt-12 text-center">
          <p className="text-white/50 text-lg mb-6">Готов стать следующим?</p>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { value: '200+', label: 'Учеников за 14 лет' },
              { value: '93%', label: 'Показывают рост рейтинга' },
              { value: '12', label: 'Чемпионов России среди учеников' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-black text-gradient-purple">{stat.value}</div>
                <div className="text-white/40 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

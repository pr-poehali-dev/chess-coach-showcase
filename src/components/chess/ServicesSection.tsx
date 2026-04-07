import { useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

interface ServicesSectionProps {
  onBook: () => void;
}

export default function ServicesSection({ onBook }: ServicesSectionProps) {
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

  const services = [
    {
      icon: 'User',
      emoji: '♟',
      title: 'Для новичков',
      description: 'Познакомлю с правилами, основами тактики и стратегии. Занятия онлайн через Яндекс Телемост.',
      price: 'от 500 ₽',
      duration: '60 мин',
      popular: false,
      features: ['Правила и основы игры', 'Базовая тактика', 'Онлайн — Яндекс Телемост', 'Подходит с 5 лет'],
      color: 'from-cyan-500/10 to-blue-600/5',
      border: 'border-cyan-500/20',
      highlight: 'border-cyan-500/50',
    },
    {
      icon: 'Crown',
      emoji: '♛',
      title: 'Для школьников',
      description: 'Подготовлю к школьным и городским соревнованиям. Разбор партий, дебюты, турнирная практика.',
      price: 'от 500 ₽',
      duration: '60 мин',
      popular: true,
      features: ['Подготовка к соревнованиям', 'Разбор партий', 'Онлайн — Яндекс Телемост', 'Индивидуальный план'],
      color: 'from-amber-500/15 to-orange-600/10',
      border: 'border-amber-500/30',
      highlight: 'border-amber-400/60',
    },
    {
      icon: 'TrendingUp',
      emoji: '♙',
      title: 'Для продвинутых',
      description: 'Подниму уровень до следующей ступени. Глубокая работа над стратегией, эндшпилем и психологией.',
      price: 'от 500 ₽',
      duration: '60 мин',
      popular: false,
      features: ['Стратегия и эндшпиль', 'Дебютный репертуар', 'Онлайн — Яндекс Телемост', 'Разбор партий гроссмейстеров'],
      color: 'from-purple-500/10 to-pink-600/5',
      border: 'border-purple-500/20',
      highlight: 'border-purple-500/50',
    },
  ];

  return (
    <section ref={sectionRef} id="services" className="py-24 bg-chess-dark relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 reveal">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Что предлагаю</span>
          <h2 className="text-5xl font-black mt-2 text-white">
            Мои <span className="text-gradient-gold">услуги</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Выберите формат занятий, который подходит именно вам
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`reveal reveal-delay-${i + 1} relative p-6 rounded-2xl border bg-gradient-to-br ${service.color} 
                ${service.popular ? service.highlight : service.border} 
                hover:scale-105 transition-all duration-300 group flex flex-col`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full text-xs font-bold text-black"
                    style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C00)' }}>
                    Популярно
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                  style={{ background: 'rgba(255,215,0,0.1)' }}>
                  {service.emoji}
                </div>
                <div className="text-right">
                  <div className="text-amber-400 font-black text-xl">{service.price}</div>
                  <div className="text-white/40 text-sm">{service.duration}</div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6 flex-1">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-white/70">
                    <Icon name="Check" size={14} className="text-amber-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={onBook}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 
                  ${service.popular 
                    ? 'text-black hover:opacity-90' 
                    : 'text-white border border-white/20 hover:border-amber-400/50 hover:bg-white/5'}
                `}
                style={service.popular ? { background: 'linear-gradient(135deg, #FFD700, #FF8C00)' } : {}}
              >
                Записаться
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
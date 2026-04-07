import { useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

const ChessBoard = () => {
  const squares = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const isLight = (row + col) % 2 === 0;
      squares.push(
        <div
          key={`${row}-${col}`}
          className={`aspect-square transition-all duration-300 ${
            isLight 
              ? 'bg-amber-100/5 hover:bg-amber-100/15' 
              : 'bg-transparent hover:bg-purple-500/10'
          }`}
          style={{ transitionDelay: `${(row * 8 + col) * 10}ms` }}
        />
      );
    }
  }
  return (
    <div className="grid grid-cols-8 w-full h-full rounded-xl overflow-hidden border border-white/10">
      {squares}
    </div>
  );
};

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = heroRef.current?.querySelectorAll('.hero-animate');
    elements?.forEach((el, i) => {
      (el as HTMLElement).style.animationDelay = `${i * 0.15}s`;
      el.classList.add('animate-slide-up');
    });
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-chess-darker chess-pattern">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 animate-float"
          style={{ background: 'radial-gradient(circle, #FFD700, transparent)', top: '10%', left: '5%' }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full blur-3xl opacity-15 animate-float"
          style={{ background: 'radial-gradient(circle, #7C3AED, transparent)', bottom: '15%', right: '10%', animationDelay: '2s' }}
        />
        <div 
          className="absolute w-60 h-60 rounded-full blur-3xl opacity-10 animate-float"
          style={{ background: 'radial-gradient(circle, #06B6D4, transparent)', top: '50%', right: '30%', animationDelay: '1s' }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left content */}
        <div className="space-y-8">
          <div className="hero-animate opacity-0">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-amber-400/30 bg-amber-400/10 text-amber-400">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              Кандидат в мастера спорта (КМС)
            </span>
          </div>

          <div className="hero-animate opacity-0">
            <h1 className="text-6xl lg:text-7xl font-black leading-tight">
              <span className="text-white">Манукян</span>
              <br />
              <span className="text-gradient-gold">Нарек</span>
            </h1>
          </div>

          <div className="hero-animate opacity-0">
            <p className="text-xl text-white/60 leading-relaxed max-w-lg">
              Шахматный тренер с многолетним опытом. Обучаю детей и взрослых онлайн — от новичков до продвинутых игроков.
            </p>
          </div>

          <div className="hero-animate opacity-0 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('schedule')}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-black overflow-hidden transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C00)' }}
            >
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
              <Icon name="Calendar" size={20} />
              Записаться на тренировку
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white border border-white/20 hover:border-amber-400/50 hover:bg-white/5 transition-all duration-300 hover:scale-105"
            >
              <Icon name="User" size={20} />
              Обо мне
            </button>
          </div>

          {/* Stats */}
          <div className="hero-animate opacity-0 grid grid-cols-3 gap-6 pt-4">
            {[
              { value: '2×', label: 'Чемпион области' },
              { value: 'КМС', label: 'по шахматам' },
              { value: 'ЮФО', label: 'Чемпион до 19 лет' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-black text-gradient-gold">{stat.value}</div>
                <div className="text-sm text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Chess board visual */}
        <div className="hero-animate opacity-0 relative hidden lg:block">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 blur-2xl opacity-30 rounded-2xl"
              style={{ background: 'linear-gradient(135deg, #FFD700, #7C3AED)' }} />
            
            <div className="relative p-1 rounded-2xl" style={{ background: 'linear-gradient(135deg, #FFD700, #7C3AED, #06B6D4)' }}>
              <div className="bg-chess-darker rounded-xl p-4">
                <ChessBoard />
              </div>
            </div>

            {/* Floating pieces */}
            <div className="absolute -top-6 -right-6 w-16 h-16 flex items-center justify-center text-4xl animate-float" style={{ animationDelay: '0.5s' }}>
              ♚
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 flex items-center justify-center text-3xl animate-float" style={{ animationDelay: '1.5s' }}>
              ♛
            </div>
            <div className="absolute top-1/2 -right-8 w-10 h-10 flex items-center justify-center text-2xl animate-float" style={{ animationDelay: '1s' }}>
              ♞
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs text-white tracking-widest uppercase">Листай вниз</span>
        <div className="w-5 h-8 border border-white/30 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
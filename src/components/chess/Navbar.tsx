import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: 'home', label: 'Главная' },
  { id: 'about', label: 'Обо мне' },
  { id: 'achievements', label: 'Достижения' },
  { id: 'services', label: 'Услуги' },
  { id: 'students', label: 'Ученики' },
  { id: 'contacts', label: 'Контакты' },
];

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNav = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 backdrop-blur-xl border-b border-white/10'
            : 'py-5'
        }`}
        style={{
          background: scrolled ? 'rgba(6,6,16,0.9)' : 'transparent',
        }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110"
              style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C00)' }}>
              ♚
            </div>
            <div>
              <div className="text-white font-black text-lg leading-tight">Нарек Манукян</div>
              <div className="text-amber-400 text-xs font-medium leading-tight">Шахматный тренер · КМС</div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${activeSection === item.id
                    ? 'text-amber-400 bg-amber-400/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNav('schedule')}
              className="group relative px-5 py-2.5 rounded-xl font-semibold text-sm text-black overflow-hidden transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C00)' }}
            >
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
              Записаться
            </button>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-chess-darker/95 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />
        <div className={`absolute top-0 right-0 bottom-0 w-72 flex flex-col transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ background: 'rgba(10,10,20,0.98)', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
          
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <span className="text-white font-bold">Меню</span>
            <button onClick={() => setMenuOpen(false)} className="p-2 text-white/60 hover:text-white">
              <Icon name="X" size={20} />
            </button>
          </div>

          <div className="flex-1 p-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all
                  ${activeSection === item.id
                    ? 'text-amber-400 bg-amber-400/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="p-6 border-t border-white/10">
            <button
              onClick={() => handleNav('schedule')}
              className="w-full py-3 rounded-xl font-bold text-black"
              style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C00)' }}
            >
              Записаться на тренировку
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
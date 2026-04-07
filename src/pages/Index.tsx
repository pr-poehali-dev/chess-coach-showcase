import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/chess/Navbar';
import HeroSection from '@/components/chess/HeroSection';
import AboutSection from '@/components/chess/AboutSection';
import AchievementsSection from '@/components/chess/AchievementsSection';
import ServicesSection from '@/components/chess/ServicesSection';
import StudentsSection from '@/components/chess/StudentsSection';
import ScheduleSection from '@/components/chess/ScheduleSection';
import ContactsSection from '@/components/chess/ContactsSection';

const G = '#C9A84C';

const sections = ['home', 'about', 'achievements', 'services', 'students', 'schedule', 'contacts'];

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id || 'home');
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="bg-chess-darker min-h-screen">
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />
      
      <div id="home">
        <HeroSection onNavigate={scrollToSection} />
      </div>
      
      <AboutSection />
      <AchievementsSection />
      <ServicesSection onBook={() => scrollToSection('schedule')} />
      <StudentsSection />
      <ScheduleSection />
      <ContactsSection />

      {/* Footer */}
      <footer className="py-10 border-t border-white/5 bg-chess-darker">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xl"
                style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C00)' }}>
                ♚
              </div>
              <div>
                <div className="text-white font-bold text-sm">Александр Шахматов</div>
                <div className="text-white/40 text-xs">Международный гроссмейстер</div>
              </div>
            </div>

            <div className="flex gap-6 text-sm text-white/30">
              {['Главная', 'Обо мне', 'Услуги', 'Контакты'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item === 'Главная' ? 'home' : item === 'Обо мне' ? 'about' : item === 'Услуги' ? 'services' : 'contacts')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="text-white/20 text-xs text-center">
              © 2026 Александр Шахматов. Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
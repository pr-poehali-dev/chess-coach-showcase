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
      <footer style={{ borderTop: '1px solid rgba(201,168,76,0.1)', padding: '1.8rem 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <button onClick={() => scrollToSection('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: G }}>
            ♟ Нарек Манукян
          </button>
          <div style={{ fontSize: '0.72rem', color: 'rgba(232,213,163,0.22)' }}>© 2026 · Шахматный тренер, КМС</div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {[['Обо мне', 'about'], ['Услуги', 'services'], ['Расписание', 'schedule'], ['Контакты', 'contacts']].map(([label, id]) => (
              <button key={id} onClick={() => scrollToSection(id)}
                style={{ fontSize: '0.65rem', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(232,213,163,0.28)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = G; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(232,213,163,0.28)'; }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
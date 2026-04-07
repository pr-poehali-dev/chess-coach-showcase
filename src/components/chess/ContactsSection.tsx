import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

export default function ContactsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', phone: '', message: '' });
  };

  const contacts = [
    { icon: 'Phone', label: 'Телефон', value: '+7 (999) 123-45-67', href: 'tel:+79991234567' },
    { icon: 'Mail', label: 'Email', value: 'chess@example.com', href: 'mailto:chess@example.com' },
    { icon: 'MapPin', label: 'Адрес', value: 'Москва, ул. Гроссмейстерская, 1', href: '#' },
    { icon: 'MessageCircle', label: 'Telegram', value: '@chess_master', href: 'https://t.me/chess_master' },
  ];

  return (
    <section ref={sectionRef} id="contacts" className="py-24 bg-chess-dark relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 reveal">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Связаться</span>
          <h2 className="text-5xl font-black mt-2 text-white">
            <span className="text-gradient-gold">Контакты</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Напишите мне — отвечу в течение нескольких часов
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: contacts */}
          <div className="space-y-6">
            <div className="reveal reveal-delay-1 space-y-4">
              {contacts.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:border-amber-400/30 hover:bg-white/8 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center group-hover:bg-amber-400/20 transition-colors flex-shrink-0">
                    <Icon name={contact.icon as Parameters<typeof Icon>[0]['name']} size={20} className="text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wider">{contact.label}</div>
                    <div className="text-white font-medium group-hover:text-amber-400 transition-colors">{contact.value}</div>
                  </div>
                  <div className="ml-auto">
                    <Icon name="ArrowUpRight" size={16} className="text-white/20 group-hover:text-amber-400 transition-colors" />
                  </div>
                </a>
              ))}
            </div>

            {/* Social links */}
            <div className="reveal reveal-delay-2">
              <p className="text-white/40 text-sm mb-4">Социальные сети</p>
              <div className="flex gap-3">
                {[
                  { icon: 'Youtube', label: 'YouTube', color: 'hover:border-red-400/50 hover:bg-red-400/5' },
                  { icon: 'Instagram', label: 'Instagram', color: 'hover:border-pink-400/50 hover:bg-pink-400/5' },
                  { icon: 'MessageCircle', label: 'VK', color: 'hover:border-blue-400/50 hover:bg-blue-400/5' },
                ].map((social) => (
                  <button
                    key={social.label}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white/60 hover:text-white transition-all duration-300 text-sm ${social.color}`}
                  >
                    <Icon name={social.icon as Parameters<typeof Icon>[0]['name']} size={16} />
                    {social.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal reveal-delay-2">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 relative overflow-hidden">
              {/* Glow */}
              <div className="absolute top-0 right-0 w-40 h-40 blur-3xl opacity-10 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #FFD700, transparent)' }} />

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-scale-in">
                  <div className="w-16 h-16 rounded-full bg-green-400/20 flex items-center justify-center mb-4">
                    <Icon name="Check" size={32} className="text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Сообщение отправлено!</h3>
                  <p className="text-white/50">Отвечу вам в ближайшее время</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <h3 className="text-xl font-bold text-white mb-6">Написать сообщение</h3>

                  <div>
                    <label className="block text-white/50 text-sm mb-2">Ваше имя</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Иван Иванов"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400/50 focus:bg-white/8 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-white/50 text-sm mb-2">Телефон</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+7 (999) 000-00-00"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400/50 focus:bg-white/8 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-white/50 text-sm mb-2">Сообщение</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Расскажите о вашем уровне и целях..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400/50 focus:bg-white/8 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                    style={{ 
                      background: 'linear-gradient(135deg, #FFD700, #FF8C00)',
                      boxShadow: '0 4px 20px rgba(255,215,0,0.3)'
                    }}
                  >
                    <Icon name="Send" size={18} />
                    Отправить
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

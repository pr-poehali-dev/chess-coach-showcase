import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

interface TimeSlot {
  time: string;
  available: boolean;
  type: string;
}

interface DaySchedule {
  day: string;
  date: string;
  slots: TimeSlot[];
}

export default function ScheduleSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<{ day: number; time: string } | null>(null);
  const [step, setStep] = useState<'select' | 'form' | 'success'>('select');
  const [formData, setFormData] = useState({ name: '', phone: '', service: 'individual' });

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

  const today = new Date();
  const schedule: DaySchedule[] = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const dayName = dayNames[d.getDay()];
    const dateStr = `${d.getDate()}.${String(d.getMonth() + 1).padStart(2, '0')}`;
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;

    const times = isWeekend
      ? ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
      : ['09:00', '10:00', '12:00', '14:00', '16:00', '18:00', '19:00', '20:00'];

    const slots: TimeSlot[] = times.map((time, ti) => ({
      time,
      available: !(ti % 3 === 1 && i % 2 === 0) && !(ti === 5 && i === 1),
      type: ti % 4 === 0 ? 'Индивидуально' : ti % 4 === 2 ? 'Интенсив' : 'Группа',
    }));

    return { day: dayName, date: dateStr, slots };
  });

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  const resetBooking = () => {
    setStep('select');
    setSelectedSlot(null);
    setFormData({ name: '', phone: '', service: 'individual' });
  };

  const serviceOptions = [
    { value: 'individual', label: 'Индивидуальное занятие' },
    { value: 'pro', label: 'Интенсив для профи' },
    { value: 'group', label: 'Групповое занятие' },
  ];

  return (
    <section ref={sectionRef} id="schedule" className="py-24 bg-chess-dark relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-full h-px top-0" style={{ background: 'linear-gradient(90deg, transparent, #FFD700, transparent)' }} />
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-10 animate-float"
          style={{ background: 'radial-gradient(circle, #FFD700, transparent)', bottom: '0', right: '5%' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12 reveal">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Онлайн-расписание</span>
          <h2 className="text-5xl font-black mt-2 text-white">
            Запись на <span className="text-gradient-gold">тренировку</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Выберите удобный день и время — занятия проходят онлайн и офлайн
          </p>
        </div>

        {step === 'success' ? (
          <div className="reveal max-w-md mx-auto text-center py-16 animate-scale-in">
            <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(124,58,237,0.2))' }}>
              <span className="text-5xl">♛</span>
            </div>
            <div className="w-16 h-16 rounded-full bg-green-400/20 flex items-center justify-center mx-auto mb-6">
              <Icon name="Check" size={32} className="text-green-400" />
            </div>
            <h3 className="text-2xl font-black text-white mb-3">Запись подтверждена!</h3>
            <p className="text-white/50 mb-2">
              Жду вас <strong className="text-amber-400">{selectedSlot && schedule[selectedSlot.day].date}</strong> в <strong className="text-amber-400">{selectedSlot?.time}</strong>
            </p>
            <p className="text-white/40 text-sm mb-8">Отправлю подробности на указанный телефон</p>
            <button
              onClick={resetBooking}
              className="px-8 py-3 rounded-xl border border-white/20 text-white hover:border-amber-400/50 hover:bg-white/5 transition-all"
            >
              Записаться ещё раз
            </button>
          </div>
        ) : step === 'form' ? (
          <div className="reveal max-w-lg mx-auto animate-scale-in">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 blur-3xl opacity-10 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #FFD700, transparent)' }} />

              {/* Selected slot info */}
              {selectedSlot && (
                <div className="mb-6 p-4 rounded-xl flex items-center gap-4"
                  style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.2)' }}>
                  <div className="w-12 h-12 rounded-xl bg-amber-400/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="Calendar" size={20} className="text-amber-400" />
                  </div>
                  <div>
                    <div className="text-amber-400 font-bold">
                      {schedule[selectedSlot.day].day}, {schedule[selectedSlot.day].date}
                    </div>
                    <div className="text-white/60 text-sm">в {selectedSlot.time}</div>
                  </div>
                </div>
              )}

              <h3 className="text-xl font-bold text-white mb-6 relative z-10">Ваши данные</h3>

              <form onSubmit={handleBook} className="space-y-4 relative z-10">
                <div>
                  <label className="block text-white/50 text-sm mb-2">Ваше имя *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Иван Иванов"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-white/50 text-sm mb-2">Телефон *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (999) 000-00-00"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-white/50 text-sm mb-2">Тип занятия</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-400/50 transition-all"
                    style={{ colorScheme: 'dark' }}
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-gray-900">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep('select')}
                    className="flex-1 py-3 rounded-xl border border-white/20 text-white hover:border-white/40 transition-all text-sm"
                  >
                    Назад
                  </button>
                  <button
                    type="submit"
                    className="flex-2 flex-1 py-3 rounded-xl font-semibold text-black transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C00)' }}
                  >
                    <Icon name="Check" size={16} />
                    Подтвердить
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="reveal">
            {/* Days selector */}
            <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
              {schedule.map((day, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDay(i)}
                  className={`flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-xl border transition-all duration-200 min-w-[70px]
                    ${selectedDay === i
                      ? 'border-amber-400 text-black font-bold scale-105'
                      : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white bg-white/5'
                    }`}
                  style={selectedDay === i ? { background: 'linear-gradient(135deg, #FFD700, #FF8C00)' } : {}}
                >
                  <span className="text-xs uppercase font-semibold">{day.day}</span>
                  <span className="text-lg font-black">{day.date.split('.')[0]}</span>
                  <span className="text-xs opacity-70">{day.date.split('.')[1] && `${day.date.split('.')[1]}`}</span>
                </button>
              ))}
            </div>

            {/* Time slots grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {schedule[selectedDay].slots.map((slot, i) => {
                const isSelected = selectedSlot?.day === selectedDay && selectedSlot?.time === slot.time;
                return (
                  <button
                    key={i}
                    disabled={!slot.available}
                    onClick={() => {
                      if (slot.available) {
                        setSelectedSlot({ day: selectedDay, time: slot.time });
                      }
                    }}
                    className={`p-4 rounded-xl border text-left transition-all duration-200 relative overflow-hidden
                      ${!slot.available
                        ? 'border-white/5 bg-white/2 cursor-not-allowed opacity-30'
                        : isSelected
                          ? 'border-amber-400 scale-105'
                          : 'border-white/10 bg-white/5 hover:border-amber-400/50 hover:bg-white/8 hover:scale-102 cursor-pointer'
                      }`}
                    style={isSelected ? { background: 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,140,0,0.1))' } : {}}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <Icon name="Check" size={12} className="text-amber-400" />
                      </div>
                    )}
                    <div className={`text-xl font-black mb-1 ${isSelected ? 'text-amber-400' : slot.available ? 'text-white' : 'text-white/20'}`}>
                      {slot.time}
                    </div>
                    <div className={`text-xs ${isSelected ? 'text-amber-300/70' : slot.available ? 'text-white/40' : 'text-white/15'}`}>
                      {slot.available ? slot.type : 'Занято'}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Book button */}
            <div className="mt-8 flex justify-center">
              <button
                disabled={!selectedSlot}
                onClick={() => selectedSlot && setStep('form')}
                className={`inline-flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300
                  ${selectedSlot
                    ? 'text-black hover:scale-105 hover:shadow-lg cursor-pointer'
                    : 'text-white/20 bg-white/5 border border-white/10 cursor-not-allowed'
                  }`}
                style={selectedSlot ? {
                  background: 'linear-gradient(135deg, #FFD700, #FF8C00)',
                  boxShadow: '0 4px 30px rgba(255,215,0,0.3)'
                } : {}}
              >
                <Icon name="Calendar" size={20} />
                {selectedSlot
                  ? `Записаться на ${schedule[selectedSlot.day].date} в ${selectedSlot.time}`
                  : 'Выберите время для записи'
                }
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

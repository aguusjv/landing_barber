import React, { useEffect, useMemo, useState } from 'react';
import { BookingData } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Horario de atención (coincide con tu texto "Lun - Sáb 10:00 - 20:00")
const OPEN_TIME = '10:00';
const CLOSE_TIME = '20:00';
const SLOT_MINUTES = 40;

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

function toHHMM(totalMinutes: number) {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  const hh = String(h).padStart(2, '0');
  const mm = String(m).padStart(2, '0');
  return `${hh}:${mm}`;
}

/**
 * Genera turnos desde OPEN_TIME hasta CLOSE_TIME,
 * en saltos de SLOT_MINUTES.
 * Nota: el último turno empieza antes de CLOSE_TIME.
 */
function generateTimeSlots(open: string, close: string, stepMin: number) {
  const start = toMinutes(open);
  const end = toMinutes(close);

  const slots: string[] = [];
  for (let t = start; t < end; t += stepMin) {
    slots.push(toHHMM(t));
  }
  return slots;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const timeSlots = useMemo(
    () => generateTimeSlots(OPEN_TIME, CLOSE_TIME, SLOT_MINUTES),
    []
  );

  const [formData, setFormData] = useState<BookingData>({
    name: '',
    phone: '',
    service: 'Corte Clásico',
    date: '',
    time: timeSlots[0] ?? '10:00',
    location: 'Palermo Hollywood',
  });

  // Si cambia la configuración y el time actual no existe, lo corregimos
  useEffect(() => {
    if (!timeSlots.includes(formData.time)) {
      setFormData((prev) => ({ ...prev, time: timeSlots[0] ?? '10:00' }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeSlots]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `Hola Buenos Aires Barbershop! Me gustaría reservar un turno:
- Nombre: ${formData.name}
- Servicio: ${formData.service}
- Fecha: ${formData.date}
- Hora: ${formData.time}
- Local: ${formData.location}
- Tel: ${formData.phone}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5492932547307?text=${encodedMessage}`; // Número de ejemplo

    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative bg-[#0c0c0c] border border-gold/30 w-full max-w-2xl overflow-hidden shadow-2xl animate-fadeIn">
        <button onClick={onClose} className="absolute top-4 right-4 text-gold hover:text-white transition z-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-5 h-full">
          {/* Side Info */}
          <div className="md:col-span-2 bg-stone-900/50 p-8 flex flex-col justify-center border-r border-gold/10">
            <div className="text-gold text-[10px] tracking-[0.3em] font-bold uppercase mb-4">Agenda Abierta</div>
            <h2 className="text-3xl font-bold serif italic mb-6">Reserva tu Ritual</h2>
            <p className="text-xs text-gray-500 leading-relaxed font-light mb-8">
              Selecciona el horario y servicio que prefieras. Un barbero te estará esperando puntualmente para brindarte la mejor atención.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 opacity-60">
                <span className="text-gold text-lg">📍</span>
                <span className="text-[10px] uppercase tracking-widest">Palermo & San Telmo</span>
              </div>
              <div className="flex items-center space-x-3 opacity-60">
                <span className="text-gold text-lg">🕒</span>
                <span className="text-[10px] uppercase tracking-widest">
                  Lun - Sáb {OPEN_TIME} - {CLOSE_TIME}
                </span>
              </div>
              <div className="flex items-center space-x-3 opacity-60">
                <span className="text-gold text-lg">⏱️</span>
                <span className="text-[10px] uppercase tracking-widest">
                  Turnos cada {SLOT_MINUTES} min
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500">Nombre Completo</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ej: Juan Pérez"
                  className="w-full bg-black border-b border-white/10 p-3 focus:border-gold outline-none transition text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500">Teléfono</label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="11 1234 5678"
                    className="w-full bg-black border-b border-white/10 p-3 focus:border-gold outline-none transition text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500">Local</label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-black border-b border-white/10 p-3 focus:border-gold outline-none transition text-sm appearance-none"
                  >
                    <option value="Palermo Hollywood">Palermo Hollywood</option>
                    <option value="San Telmo">San Telmo</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500">Servicio</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-black border-b border-white/10 p-3 focus:border-gold outline-none transition text-sm appearance-none"
                >
                  <option value="Corte Clásico">Corte Clásico</option>
                  <option value="Barba Tradicional">Barba Tradicional</option>
                  <option value="Combo Maestro">Combo Maestro (Corte + Barba)</option>
                  <option value="Afeitado a Navaja">Afeitado a Navaja</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500">Fecha</label>
                  <input
                    required
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-black border-b border-white/10 p-3 focus:border-gold outline-none transition text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500">Hora</label>
                  <select
                    required
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-black border-b border-white/10 p-3 focus:border-gold outline-none transition text-sm appearance-none"
                  >
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gold text-black font-bold py-4 uppercase tracking-[0.2em] text-[10px] hover:bg-amber-400 transition transform active:scale-95 shadow-lg shadow-gold/10"
              >
                Confirmar por WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;

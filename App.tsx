
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PressSection from './components/PressSection';
import IAAdvisor from './components/IAAdvisor';
import BookingModal from './components/BookingModal';

const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <div className="bg-[#0c0c0c] text-white selection:bg-gold selection:text-black">
      <Navbar onOpenBooking={openBooking} />
      
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={closeBooking} 
      />

      {/* Hero Section */}
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1512690196252-75820320707c?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover opacity-30"
            alt="Barbershop Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-[#0c0c0c]"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="flex justify-center mb-8 opacity-80 animate-fadeIn">
            <div className="w-12 h-px bg-gold self-center"></div>
            <span className="mx-4 text-gold tracking-[0.5em] text-[10px] uppercase font-bold">Est. 1994</span>
            <div className="w-12 h-px bg-gold self-center"></div>
          </div>
          <h1 className="text-6xl md:text-9xl font-bold mb-8 serif tracking-tighter leading-none animate-fadeIn">
            Tradición <br />
            <span className="italic gold-gradient">& Estilo</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light tracking-wide leading-relaxed animate-fadeIn" style={{ animationDelay: '200ms' }}>
            Un refugio para el hombre moderno que valora el ritual clásico. Maestría en tijera y navaja en el corazón de Buenos Aires.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fadeIn" style={{ animationDelay: '400ms' }}>
            <button 
              onClick={openBooking}
              className="bg-gold text-black px-12 py-5 font-bold uppercase tracking-[0.2em] text-xs hover:bg-amber-400 transition transform hover:-translate-y-1 w-full sm:w-auto"
            >
              Reservar Turno
            </button>
            <a href="#servicios" className="border border-white/20 text-white px-12 py-5 font-bold uppercase tracking-[0.2em] text-xs hover:border-gold hover:text-gold transition transform hover:-translate-y-1 w-full sm:w-auto text-center">
              Nuestros Servicios
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-4">Scroll Down</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent"></div>
        </div>
      </section>

      {/* Historia */}
      <section id="historia" className="py-32 container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 serif italic">Mucho más que un corte.</h2>
          <p className="text-gray-500 text-lg leading-loose font-light">
            Buenos Aires Barbershop nace de la pasión por los oficios perdidos. En un mundo que se mueve cada vez más rápido, nosotros elegimos la pausa. El ritual de la toalla caliente, el sonido de la navaja sobre el cuero y la charla cómplice. Somos herederos de una tradición que honramos en cada movimiento.
          </p>
          <div className="mt-12 flex justify-center">
            <img src="https://buenosairesbarbershop.com/img/brand/signature.png" alt="Signature" className="h-16 opacity-30 invert" />
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-24 bg-stone-900/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 border-b border-white/5 pb-8">
            <h2 className="text-5xl font-bold serif tracking-tighter italic">Nuestros Servicios</h2>
            <span className="text-gold font-bold tracking-[0.3em] uppercase text-[10px]">Elegancia Masculina</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            <div className="bg-black p-12 border border-white/5 hover:border-gold/30 transition group relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-gold/50 text-sm font-bold mb-4 block">01</span>
                <h3 className="text-2xl mb-4 serif uppercase tracking-widest">Corte Clásico</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">Técnica manual a tijera y peine, finalizado con navaja en contornos.</p>
                <div className="text-gold font-bold">$4.500</div>
              </div>
              <div className="absolute -bottom-10 -right-10 text-9xl opacity-[0.02] group-hover:opacity-[0.05] transition duration-500">✂️</div>
            </div>
            <div className="bg-black p-12 border border-white/5 hover:border-gold/30 transition group relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-gold/50 text-sm font-bold mb-4 block">02</span>
                <h3 className="text-2xl mb-4 serif uppercase tracking-widest">Barba Tradicional</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">Ritual de toallas calientes, aceites esenciales y afeitado a navaja.</p>
                <div className="text-gold font-bold">$3.200</div>
              </div>
              <div className="absolute -bottom-10 -right-10 text-9xl opacity-[0.02] group-hover:opacity-[0.05] transition duration-500">🪒</div>
            </div>
            <div className="bg-black p-12 border border-white/5 hover:border-gold/30 transition group relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-gold/50 text-sm font-bold mb-4 block">03</span>
                <h3 className="text-2xl mb-4 serif uppercase tracking-widest">Combo Maestro</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">Nuestro servicio insignia: Corte de cabello y cuidado de barba completo.</p>
                <div className="text-gold font-bold">$6.800</div>
              </div>
              <div className="absolute -bottom-10 -right-10 text-9xl opacity-[0.02] group-hover:opacity-[0.05] transition duration-500">🏆</div>
            </div>
          </div>
        </div>
      </section>

      <IAAdvisor />

      <PressSection />

      {/* Locales */}
      <section id="locales" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 serif italic">Nuestras Casas</h2>
            <p className="text-gray-500 uppercase tracking-[0.2em] text-[10px]">Encuentra tu barbería más cercana</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="border border-white/5 bg-stone-900/10 p-10 hover:border-gold/40 transition">
              <h3 className="text-2xl serif mb-4">Palermo Hollywood</h3>
              <p className="text-gray-500 text-sm mb-6 font-light">Humboldt 1980, CABA.<br />Lun a Sáb: 10 a 20hs</p>
              <a href="https://maps.google.com" target="_blank" className="text-gold text-[10px] font-bold uppercase tracking-widest hover:underline">Ver en Mapa +</a>
            </div>
            <div className="border border-white/5 bg-stone-900/10 p-10 hover:border-gold/40 transition">
              <h3 className="text-2xl serif mb-4">San Telmo</h3>
              <p className="text-gray-500 text-sm mb-6 font-light">Defensa 840, CABA.<br />Lun a Sáb: 11 a 21hs</p>
              <a href="https://maps.google.com" target="_blank" className="text-gold text-[10px] font-bold uppercase tracking-widest hover:underline">Ver en Mapa +</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-black border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
               <div className="text-2xl font-bold tracking-[0.2em] serif uppercase gold-gradient">Buenos Aires</div>
               <div className="text-[10px] tracking-[0.4em] uppercase text-gray-500 font-semibold">Barbershop</div>
            </div>
            <div className="flex space-x-12 text-[10px] uppercase tracking-widest font-bold">
              <a href="#" className="hover:text-gold transition">Instagram</a>
              <a href="#" className="hover:text-gold transition">Facebook</a>
              <a href="#" className="hover:text-gold transition">WhatsApp</a>
            </div>
          </div>
          <div className="text-center md:text-left text-[10px] text-gray-600 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between gap-4">
            <p>© 2024 BUENOS AIRES BARBERSHOP. TODOS LOS DERECHOS RESERVADOS.</p>
            <p className="tracking-widest">DISEÑO & IA POR NÉBULA WEB</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

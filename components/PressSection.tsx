
import React from 'react';
import { PressClip } from '../types';

const PRESS_DATA: PressClip[] = [
  {
    id: '1',
    media: 'Forbes',
    title: 'La experiencia de lujo que redefine el ritual masculino.',
    date: '20 Oct 2023',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    media: 'GQ Magazine',
    title: 'Por qué NOMBRE Barbershop es el destino obligado en la ciudad.',
    date: '15 Sep 2023',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    media: 'La Nación',
    title: 'El regreso de la navaja: Tradición que nunca pasa de moda.',
    date: '02 Ago 2023',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=800'
  }
];

const PressSection: React.FC = () => {
  return (
    <section id="prensa" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <span className="text-gold tracking-[0.3em] text-[10px] uppercase font-bold mb-2 block">Media & News</span>
            <h2 className="text-4xl md:text-5xl font-bold serif italic">Prensa</h2>
          </div>
          <div className="hidden md:block w-1/3 h-px bg-white/10 mb-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {PRESS_DATA.map((clip) => (
            <div key={clip.id} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-6 aspect-[4/3] border border-white/5">
                <img 
                  src={clip.imageUrl} 
                  alt={clip.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition duration-500"></div>
                <div className="absolute top-4 left-4 bg-black/80 text-gold text-[9px] font-bold px-3 py-1 uppercase tracking-widest border border-gold/30">
                  {clip.media}
                </div>
              </div>
              <h3 className="text-xl serif mb-3 leading-tight group-hover:text-gold transition">{clip.title}</h3>
              <div className="flex items-center justify-between text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
                <span>{clip.date}</span>
                <span className="group-hover:translate-x-2 transition-transform duration-300">Leer más +</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PressSection;

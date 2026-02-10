
import React, { useState } from 'react';
import { getBarberAdvice } from '../services/geminiService';
import { BarberAdvice } from '../types';

const IAAdvisor: React.FC = () => {
  const [faceShape, setFaceShape] = useState('');
  const [hairType, setHairType] = useState('');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<BarberAdvice | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await getBarberAdvice(faceShape, hairType, "clásico y sofisticado");
      setAdvice(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="asesor" className="py-24 bg-stone-900/40 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 serif italic">Asesor de Estilo Digital</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              ¿No estás seguro de qué corte te favorece? Nuestra Inteligencia Artificial analiza tus rasgos y preferencias para recomendarte el estilo perfecto antes de que pases por la navaja.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gold mb-2 font-bold">Forma de tu cara</label>
                <select 
                  className="w-full bg-black border border-white/10 p-4 focus:border-gold outline-none text-gray-300"
                  onChange={(e) => setFaceShape(e.target.value)}
                  required
                >
                  <option value="">Seleccionar...</option>
                  <option value="Ovalada">Ovalada</option>
                  <option value="Cuadrada">Cuadrada</option>
                  <option value="Redonda">Redonda</option>
                  <option value="Diamante">Diamante</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gold mb-2 font-bold">Tipo de cabello</label>
                <select 
                  className="w-full bg-black border border-white/10 p-4 focus:border-gold outline-none text-gray-300"
                  onChange={(e) => setHairType(e.target.value)}
                  required
                >
                  <option value="">Seleccionar...</option>
                  <option value="Lacio">Lacio</option>
                  <option value="Ondulado">Ondulado</option>
                  <option value="Rizado">Rizado</option>
                  <option value="Fino / Poco volumen">Fino / Poco volumen</option>
                </select>
              </div>
              <button 
                className="w-full bg-gold text-black font-bold py-4 uppercase tracking-widest hover:bg-amber-400 transition transform active:scale-95"
                disabled={loading}
              >
                {loading ? 'Consultando al Maestro...' : 'Ver Recomendación'}
              </button>
            </form>
          </div>

          <div className="bg-black/60 p-10 border border-gold/20 min-h-[350px] flex flex-col justify-center relative">
            {!advice && !loading && (
              <div className="text-center">
                <div className="text-6xl mb-4 opacity-20">✂️</div>
                <p className="text-gray-500 italic">Completa tus datos para recibir asesoramiento personalizado.</p>
              </div>
            )}
            {loading && (
              <div className="text-center">
                <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gold tracking-widest text-xs uppercase animate-pulse">Analizando tus rasgos...</p>
              </div>
            )}
            {advice && (
              <div className="animate-fadeIn">
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest mb-2 block">Corte Recomendado</span>
                <h3 className="text-3xl font-bold mb-4 serif italic">{advice.recommendedStyle}</h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">{advice.explanation}</p>
                <div className="p-4 border-l-2 border-gold bg-stone-900/50">
                  <span className="text-[9px] font-bold uppercase tracking-tighter text-gray-500 block mb-1">Tip de mantenimiento</span>
                  <p className="text-xs text-gray-300 italic">"{advice.maintenanceTip}"</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IAAdvisor;


import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getBarberAdvice = async (faceShape: string, hairType: string, stylePreference: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Eres un maestro barbero experto de Buenos Aires. 
    Un cliente tiene cara de forma ${faceShape}, cabello tipo ${hairType} y prefiere un estilo ${stylePreference}.
    Recomienda un corte de pelo clásico o moderno que le favorezca.
    Responde en JSON con el estilo recomendado, una explicación breve y un consejo de mantenimiento.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          recommendedStyle: { type: Type.STRING, description: "Nombre del corte recomendado" },
          explanation: { type: Type.STRING, description: "Por qué le favorece este estilo" },
          maintenanceTip: { type: Type.STRING, description: "Consejo de cuidado diario" }
        },
        required: ["recommendedStyle", "explanation", "maintenanceTip"]
      }
    }
  });

  return JSON.parse(response.text);
};

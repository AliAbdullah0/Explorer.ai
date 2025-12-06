import { GoogleGenAI, Type } from "@google/genai";
import { CityGuideData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const placeSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "Name of the place, hotel, or restaurant" },
    description: { type: Type.STRING, description: "A brief, engaging description (max 2 sentences)" },
    priceRange: { type: Type.STRING, description: "Cost indication (e.g., Free, $, $$, $$$)" },
    advantages: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 2-3 specific pros or advantages"
    },
    disadvantages: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 1-2 specific cons or disadvantages"
    }
  },
  required: ["name", "description", "advantages", "disadvantages", "priceRange"]
};

const guideSchema = {
  type: Type.OBJECT,
  properties: {
    cityName: { type: Type.STRING },
    overview: { type: Type.STRING, description: "A short captivating overview of the city." },
    bestTimeToVisit: { type: Type.STRING },
    currency: { type: Type.STRING },
    spots: {
      type: Type.ARRAY,
      items: placeSchema,
      description: "Top 3 tourist attractions or hidden gems"
    },
    hotels: {
      type: Type.ARRAY,
      items: placeSchema,
      description: "Top 3 hotels ranging from boutique to luxury"
    },
    restaurants: {
      type: Type.ARRAY,
      items: placeSchema,
      description: "Top 3 restaurants representing local cuisine"
    }
  },
  required: ["cityName", "overview", "bestTimeToVisit", "currency", "spots", "hotels", "restaurants"]
};

export const fetchCityGuide = async (city: string): Promise<CityGuideData> => {
  const prompt = `Create a comprehensive travel guide for "${city}". 
  Include the top 3 must-visit spots (attractions), 3 highly-rated hotels, and 3 best restaurants. 
  For each item, strictly provide honest advantages and disadvantages to help a traveler decide.
  Keep the tone professional yet inviting..Don't invent things from ur own just tell user such place doesn't exists and return dashes in everything`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: guideSchema,
        systemInstruction: "You are an expert travel concierge with a critical eye. You value honesty and brevity.Don't invent things from ur own just tell user such place doesn't exists and return dashes in everything",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No data returned from Gemini");

    return JSON.parse(text) as CityGuideData;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

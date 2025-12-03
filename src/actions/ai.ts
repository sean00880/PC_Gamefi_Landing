'use server';

import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

export async function analyzeProject(projectName: string, description: string): Promise<string> {
  try {
    const client = getAiClient();
    const prompt = `You are a senior GameFi analyst.
    Analyze this crypto project briefly (max 100 words):
    Name: ${projectName}
    Description: ${description}

    Give a quick "Bullish" or "Cautious" verdict and why.`;

    const response = await client.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    return response.text || "Analysis unavailable.";
  } catch (error) {
    console.error("AI Error:", error);
    return "AI Analysis service is currently offline. Please try again later.";
  }
}

export async function chatWithAi(message: string, history: { role: string; parts: { text: string }[] }[]): Promise<string> {
  try {
    const client = getAiClient();
    const chat = client.chats.create({
      model: 'gemini-2.0-flash',
      history: history,
      config: {
        systemInstruction: "You are 'PC GameFi Scout', a helpful assistant for the PC GameFi launchpad. You answer questions about crypto gaming, tokenomics (We have 1B supply, 4% buy/sell tax), and web3 technology. Keep answers concise and helpful. Be friendly and professional."
      }
    });

    const result = await chat.sendMessage({ message });
    return result.text || "Unable to generate response.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "I'm having trouble connecting to the network right now. Please try again.";
  }
}

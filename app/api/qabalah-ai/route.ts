import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { prompt, type, entityName, entityType } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const ai = getGeminiClient();

    let systemInstruction = `You are an expert Hermetic Qabalah master, scholar, and meditation guide steeped in the traditions of the Hermetic Order of the Golden Dawn, Dion Fortune ("The Mystical Qabalah"), Israel Regardie ("The Garden of Pomegranates"), Aleister Crowley ("777"), and S.L. MacGregor Mathers.

Your responses should be authoritative, deeply respectful of Western Esotericism, atmospheric, insightful, and clearly formatted with markdown headers and bullet points where helpful. Always include precise Qabalistic correspondences (Hebrew letters, Divine Names, Archangels, Astrological/Elemental signs, Tarot Key connections, and Color Scales) when relevant.`;

    if (type === "meditation") {
      systemInstruction += `\nCreate a vivid, immersive, step-by-step guided Pathworking Meditation for ${entityType === "sephira" ? "the Sephira" : "the Path"} ${entityName || "the Tree of Life"}. Describe sensory details, spiritual symbols, encountering the archangel or guardian, and returning safely with divine insights.`;
    } else if (type === "tarot") {
      systemInstruction += `\nFocus on the Tarot and Qabalah synthesis, explaining how the Major Arcana cards relate to the 22 Paths and 10 Sephiroth on the Tree of Life.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Qabalah AI Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate Hermetic insight." },
      { status: 500 }
    );
  }
}

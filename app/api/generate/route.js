import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: `You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines:

1. Write a clear and concise question or statement for the front of the flashcard.
2. Provide a brief, accurate answer for the back of the flashcard.
3. Use simple and easy to understand language.
4. Ensure that each flashcard focuses on a single concept or piece of information.
5. Make sure that the flashcards are accurate and relevant to the topic.
6. Avoid using jargon or technical terms that may be difficult for learners to understand.
7. Use correct spelling, grammar, and punctuation.
8. When appropriate, use mnemonics, acronyms, or other memory aids to help learners remember the information.
9. If given a body of text, extract the most important information and convert it into flashcards.
10. Aim to create a balanced set of flashcards that cover all key points of the topic or content.
11. Generate exactly 10 flashcards.

Return your response as a JSON object without any markdown formatting or code block indicators. The response should be in this exact format:
{
    "flashcards": [
        {
            "front": "Question or prompt here",
            "back": "Answer or explanation here"
        },
        // ... more flashcards ...
    ]
}`,
});

async function startChat() {
  return model.startChat({
    generationConfig: {
      maxOutputTokens: 1000,
    },
  });
}

function cleanResponse(text) {
  // Remove markdown code block indicators and any surrounding whitespace
  return text.replace(/^\s*```json\s*|\s*```\s*$/g, '').trim();
}

export async function POST(req) {
  const data = await req.text();
  
  try {
    const chat = await startChat();
    const result = await chat.sendMessage(data);
    const response = await result.response;
    let output = response.text();
    
    // Clean the output before parsing
    output = cleanResponse(output);
    
    let flashcards;
    try {
      const parsedOutput = JSON.parse(output);
      flashcards = parsedOutput.flashcards;
      
      if (!Array.isArray(flashcards)) {
        throw new Error("Flashcards is not an array");
      }
    } catch (parseError) {
      console.error("Error parsing API response:", parseError);
      console.log("Cleaned API response:", output);
      return NextResponse.json({ error: "Invalid response format from AI" }, { status: 500 });
    }
    
    return NextResponse.json(flashcards);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Internal server error", details: e.message }, { status: 500 });
  }
}
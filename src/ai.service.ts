import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "./config";
import { PRContent, PRType } from "./types";
import { generatePRTemplate } from "./templates";

const genAI = new GoogleGenerativeAI(config.geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

function getOptimizedDiff(fullDiff: string): string {
  const MAX_LENGTH = 1_000_000;
  if (fullDiff.length <= MAX_LENGTH) {
    return fullDiff;
  }

  console.log("⚠️ Diff is too long, truncating to a safe limit...");
  const truncatedDiff =
    fullDiff.substring(0, MAX_LENGTH) +
    "\n\n... (diff truncated because it is too long)";

  return truncatedDiff;
}

export async function generatePRContent(
  diff: string,
  type: PRType
): Promise<PRContent | null> {
  const optimizedDiff = getOptimizedDiff(diff);

  const prompt = generatePRTemplate(optimizedDiff, type);

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const titleMatch = text.match(/Title: (.*)/);
    const bodyMatch = text.match(/Body: ([\s\S]*)/);

    if (titleMatch && bodyMatch) {
      return {
        title: titleMatch[1].trim(),
        body: bodyMatch[1].trim(),
      };
    }
    console.error(
      "❌ The AI did not return the content in the expected format."
    );
    return null;
  } catch (error) {
    console.error("❌ Gemini API error:", error);
    return null;
  }
}

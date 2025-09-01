import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "./config";
import { PRContent, PRType } from "./types";

const genAI = new GoogleGenerativeAI(config.geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

function getOptimizedDiff(fullDiff: string): string {
  const MAX_LENGTH = 7500;
  if (fullDiff.length <= MAX_LENGTH) {
    return fullDiff;
  }
  return (
    fullDiff.substring(0, MAX_LENGTH) +
    "\n\n... (diff truncated because it is too long)"
  );
}

export async function generatePRContent(
  diff: string,
  type: PRType
): Promise<PRContent | null> {
  const optimizedDiff = getOptimizedDiff(diff);

  const prompt = `
    You are a software engineering specialist assistant who creates perfect Pull Requests.
    Your task is to generate a title and description for a PR based on the code diff.

    The type of PR is: "${type.toUpperCase()}".

    OUTPUT RULES:
    - The output should ONLY be the title and description.
    - Strictly follow the format below, without any additional text.
    - The description must be in Markdown.

    OUTPUT FORMAT:
    Title: [Concise and informative title here]
    Body: ### What was done?
    [Clear and concise description of the changes]

### Why was it done?
[Explanation of the reason for the change (e.g., issue #123, performance improvement, etc.)]

### How to test?
[Steps for the reviewer to validate the change]

    --- DIFF FOR ANALYSIS ---
    ${optimizedDiff}
    --- END OF DIFF ---
  `;

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

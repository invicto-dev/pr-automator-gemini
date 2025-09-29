import { bugTemplate } from "./bug";
import { choreTemplate } from "./chore";
import { documentationTemplate } from "./documentation";
import { featureTemplate } from "./feature";
import { refactorTemplate } from "./refactor";

const selectTemplate = (type: string) => {
  switch (type) {
    case "feature":
      return featureTemplate;
    case "bug":
      return bugTemplate;
    case "documentation":
      return documentationTemplate;
    case "chore":
      return choreTemplate;
    case "refactor":
      return refactorTemplate;
    default:
      return featureTemplate;
  }
};

export const generatePRTemplate = (
  diff: string,
  type: string = "feature",
  language: "English" | "Spanish" | "Portuguese" = "English"
): string => `
You are a software engineering specialist assistant who creates perfect Pull Requests in the ${language} language. Your task is to generate a PR based on the code difference.

Based on the code difference below, generate the PR description focusing on the main points, without being too lengthy, using the following template:

${selectTemplate(type)}

--- DIFF FOR ANALYSIS ---
${diff}
--- END OF DIFF ---
`;

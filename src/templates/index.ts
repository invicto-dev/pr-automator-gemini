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
  type: string = "feature"
): string => `
You are a software engineering specialist assistant who creates perfect Pull Requests. Your task is to generate a PR based on the code diff

Based on the code difference below, generate the PR description in the following template:

${selectTemplate(type)}

--- DIFF FOR ANALYSIS ---
${diff}
--- END OF DIFF ---
`;

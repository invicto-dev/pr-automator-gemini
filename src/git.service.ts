import simpleGit, { SimpleGit } from "simple-git";
import { config } from "./config";

const git: SimpleGit = simpleGit();

export const getCurrentBranchName = async () => {
  try {
    const branchSummary = await git.branch();
    const currentBranch = branchSummary.current;

    return currentBranch;
  } catch (error) {
    console.error("Failed to get branch name:", error);
    return undefined;
  }
};

export const getCurrentBranch = async (): Promise<string> => {
  return await git.revparse(["--abbrev-ref", "HEAD"]);
};

export const getDiff = async (baseBranch: string): Promise<string> => {
  const excludePatterns = [
    ":(exclude)package-lock.json",
    ":(exclude)yarn.lock",
    ":(exclude)pnpm-lock.yaml",
    ":(exclude)**/dist/**",
    ":(exclude)**/*.min.js",
    ":(exclude)**/*.snap",
  ];

  const diffCommand = [`${baseBranch}...HEAD`, "--", ".", ...excludePatterns];

  return await git.diff(diffCommand);
};

export const getRepoDetails = async (): Promise<{
  owner: string;
  repo: string;
}> => {
  if (config.repoOwner && config.repoName) {
    return { owner: config.repoOwner, repo: config.repoName };
  }
  const remotes = await git.getRemotes(true);
  const origin = remotes.find((r) => r.name === "origin");
  if (!origin) throw new Error("Remote ‘origin’ not found.");

  // Expressão regular para extrair 'owner/repo' de URLs git e https
  const match = origin.refs.fetch.match(/[\/:]([\w-]+)\/([\w-]+?)(\.git)?$/);
  if (!match || match.length < 3) {
    throw new Error(
      "Could not extract the owner and repository name from the remote ‘origin’ URL."
    );
  }
  return { owner: match[1], repo: match[2] };
};

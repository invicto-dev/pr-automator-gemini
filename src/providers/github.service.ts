import { Octokit } from "@octokit/rest";
import { config } from "../config";
import { IGitProvider, CreatePROptions } from "./provider.interface";
import { getRepoDetails } from "../git.service";

class GitHubService implements IGitProvider {
  private octokit: Octokit;

  constructor(authToken: string) {
    this.octokit = new Octokit({ auth: authToken });
  }

  async create(options: CreatePROptions): Promise<string | null> {
    try {
      const { owner, repo } = await getRepoDetails();

      const response = await this.octokit.pulls.create({
        owner,
        repo,
        title: options.title,
        body: options.body,
        head: options.head,
        base: options.base,
      });
      return response.data.html_url;
    } catch (error: any) {
      console.error(`❌ Error creating PR on GitHub: ${error.message}`);
      return null;
    }
  }
}

export const githubService = new GitHubService(config.githubToken || "");

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

      const existingPrs = await this.octokit.pulls.list({
        owner,
        repo,
        head: `${owner}:${options.head}`,
        state: "open",
      });

      if (existingPrs.data.length > 0) {
        const pr = existingPrs.data[0];
        console.log(`⚠️ Found existing PR #${pr.number}. Updating...`);
        const response = await this.octokit.pulls.update({
          owner,
          repo,
          pull_number: pr.number,
          title: options.title,
          body: options.body,
        });
        return response.data.html_url;
      } else {
        const response = await this.octokit.pulls.create({
          owner,
          repo,
          title: options.title,
          body: options.body,
          head: options.head,
          base: options.base,
        });
        return response.data.html_url;
      }
    } catch (error: any) {
      console.error(`❌ Error creating PR on GitHub: ${error.message}`);
      return null;
    }
  }

  async updateIssueDescription(
    issueNumber: number,
    body: string
  ): Promise<void> {
    try {
      const { owner, repo } = await getRepoDetails();
      await this.octokit.issues.update({
        owner,
        repo,
        issue_number: issueNumber,
        body,
      });
      console.log(`✅ Issue #${issueNumber} description updated successfully.`);
    } catch (error: any) {
      console.error(
        `❌ Error updating issue #${issueNumber} description:`,
        error.message
      );
    }
  }
}

export const githubService = new GitHubService(config.githubToken || "");

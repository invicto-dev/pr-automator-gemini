import { Gitlab } from "@gitbeaker/rest";
import { config } from "../config";
import { IGitProvider, CreatePROptions } from "./provider.interface";

class GitLabService implements IGitProvider {
  private api: any;

  constructor(token: string) {
    this.api = new Gitlab({ token });
  }

  async create(options: CreatePROptions): Promise<string | null> {
    try {
      if (!config.gitlabProjectId) {
        throw new Error(
          "The PR_AUTOMATOR_GITLAB_PROJECT_ID environment variable is required for GitLab."
        );
      }
      const mr = await this.api.MergeRequests.create(
        config.gitlabProjectId,
        options.head, // source_branch
        options.base, // target_branch
        options.title,
        { description: options.body }
      );
      return mr.web_url;
    } catch (error: any) {
      console.error(`❌ Error creating MR in GitLab: ${error.message}`);
      return null;
    }
  }
}

export const gitlabService = new GitLabService(config.gitlabToken || "");

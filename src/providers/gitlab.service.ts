import axios from "axios";
import { config } from "../config";
import { IGitProvider, CreatePROptions } from "./provider.interface";

class GitLabService implements IGitProvider {
  private token: string;
  private apiUrl: string;

  constructor(token: string, apiUrl: string) {
    this.token = token;
    this.apiUrl = apiUrl;
  }

  async create(options: CreatePROptions): Promise<string | null> {
    try {
      if (!config.gitlabProjectId) {
        throw new Error(
          "The PR_AUTOMATOR_GITLAB_PROJECT_ID environment variable is required for GitLab."
        );
      }
      if (!config.gitLabApiUrl) {
        throw new Error(
          "The PR_AUTOMATOR_GITLAB_API_URL environment variable is required for GitLab."
        );
      }
      const res = await axios.post(
        `${this.apiUrl}/projects/${encodeURIComponent(
          config.gitlabProjectId
        )}/merge_requests`,
        {
          source_branch: options.head,
          target_branch: options.base,
          title: options.title,
          description: options.body,
        },
        {
          headers: {
            "PRIVATE-TOKEN": this.token,
            "Content-Type": "application/json",
          },
        }
      );

      return res.data.web_url;
    } catch (error: any) {
      console.error(`❌ Error creating MR in GitLab: ${error.message}`);
      return null;
    }
  }
}

export const gitlabService = new GitLabService(
  config.gitlabToken || "",
  config.gitLabApiUrl || ""
);

import axios from "axios";
import { config } from "../config";
import { IGitProvider, CreatePROptions } from "./provider.interface";

class GitLabService implements IGitProvider {
  private token: string;
  private apiUrl: string;
  private headers: { [key: string]: string };

  constructor(token: string, apiUrl: string) {
    this.token = token;
    this.apiUrl = apiUrl;
    this.headers = {
      "PRIVATE-TOKEN": this.token,
      "Content-Type": "application/json",
    };
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

      const projectId = encodeURIComponent(config.gitlabProjectId);
      const baseUrl = `${this.apiUrl}/projects/${projectId}/merge_requests`;

      const existingMRsRes = await axios.get(baseUrl, {
        params: {
          source_branch: options.head,
          state: "opened",
        },
        headers: this.headers,
      });

      if (existingMRsRes.data.length > 0) {
        const mr = existingMRsRes.data[0];
        console.log(` Found existing MR !${mr.iid}. Updating...`);
        const res = await axios.put(
          `${baseUrl}/${mr.iid}`,
          {
            title: options.title,
            description: options.body,
          },
          { headers: this.headers }
        );
        return res.data.web_url;
      } else {
        const res = await axios.post(
          baseUrl,
          {
            source_branch: options.head,
            target_branch: options.base,
            title: options.title,
            description: options.body,
          },
          { headers: this.headers }
        );
        return res.data.web_url;
      }
    } catch (error: any) {
      console.error(
        `❌ Error creating or updating MR in GitLab: ${error.message}`
      );
      return null;
    }
  }
}

export const gitlabService = new GitLabService(
  config.gitlabToken || "",
  config.gitLabApiUrl || ""
);

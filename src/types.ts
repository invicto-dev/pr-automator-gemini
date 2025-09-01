export type PRType = 'feature' | 'bug' | 'refactor' | 'chore' | 'docs';
export type GitProvider = 'github' | 'gitlab';

export interface CLIOptions {
  type?: PRType;
  base?: string;
  provider?: GitProvider;
}

export interface FinalOptions {
  type: PRType;
  base: string;
  provider: GitProvider;
}

export interface PRContent {
  title: string;
  body: string;
}

export interface Config {
  geminiApiKey: string;
  githubToken?: string;
  gitlabToken?: string;
  repoOwner?: string;
  repoName?: string;
  gitlabProjectId?: string;
}

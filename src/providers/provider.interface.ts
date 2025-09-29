export interface CreatePROptions {
  head: string;
  base: string;
  title: string;
  body: string;
  issueNumber?: number;
}

export interface IGitProvider {
  create(options: CreatePROptions): Promise<string | null>;
}

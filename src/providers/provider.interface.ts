export interface CreatePROptions {
  head: string;
  base: string;
  title: string;
  body: string;
}

export interface IGitProvider {
  create(options: CreatePROptions): Promise<string | null>;
}
export type ReposProps = {
  id: number;
  name: string;
  description?: string;
  stargazers_count: number;
  html_url: string
  owner: {
    avatar_url: string;
    login: string;
    url: string;
  }
}

export type FormValidatorProps = {
  githubUser: string;
}
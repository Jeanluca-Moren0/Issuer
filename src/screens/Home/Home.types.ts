type ReposProps = {
  id: number;
  name: string;
  description?: string;
  updated_at?: string;
  stargazers_count: number;
  owner: {
    avatar_url: string;
    login: string;
    url: string;
  }
}
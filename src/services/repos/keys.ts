import { QueryKey } from "react-query";

export const getUseReposKey = (username: string): QueryKey => ["useRepos", username];
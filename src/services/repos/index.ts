import { useQuery, UseQueryOptions } from 'react-query';
import { getUseReposKey } from './keys';
import { ReposProps } from './types';

const reposFetch = async (username: string): Promise<ReposProps[]> => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  return await response.json();

  
};

export const useRepos = (
  username: string,
  options?: UseQueryOptions<ReposProps[]>
) => useQuery(getUseReposKey(username), () => reposFetch(username), options);

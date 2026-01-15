import { useState, useEffect } from 'react';

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  topics: string[];
}

export const useGithubProjects = (username: string) => {
  const [projects, setProjects] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
      .then(res => res.json())
      .then(data => {
        // Filter out forks if you want only the original games/tools
        const originalRepos = data.filter((repo: any) => !repo.fork);
        setProjects(originalRepos);
        setLoading(false);
      })
      .catch(err => {
        console.error("Github Uplink Error:", err);
        setLoading(false);
      });
  }, [username]);

  return { projects, loading };
};
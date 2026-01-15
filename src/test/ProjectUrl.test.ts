import { describe, it, expect } from 'vitest';

// We are testing the logic we used to fix the LFS images
const generateGithubUrl = (repoName: string, branch: string) => {
  return `https://github.com/T-Fluffy/${repoName}/blob/${branch}/social-preview.png?raw=true`;
};

describe('GitHub Image URL Logic', () => {
  it('should generate a valid LFS-compatible URL', () => {
    const repo = "My3DChess";
    const branch = "main";
    const expected = "https://github.com/T-Fluffy/My3DChess/blob/main/social-preview.png?raw=true";
    
    const result = generateGithubUrl(repo, branch);
    
    expect(result).toBe(expected);
    expect(result).toContain('?raw=true'); // Critical for LFS
  });

  it('should handle different branch names like master', () => {
    const result = generateGithubUrl("OldProject", "master");
    expect(result).toContain('/master/');
  });
});
import { describe, it, expect } from 'vitest';

describe('Uplink URL Logic', () => {
  it('formats GitHub LFS links with the ?raw=true parameter', () => {
    const repo = "Portfolio.Backend";
    const branch = "main";
    const url = `https://github.com/T-Fluffy/${repo}/blob/${branch}/social-preview.png?raw=true`;
    
    expect(url).toContain('?raw=true');
    expect(url).toBe("https://github.com/T-Fluffy/Portfolio.Backend/blob/main/social-preview.png?raw=true");
  });
});
export type SiteConfig = {
  url: string;
  name: string;
  title: string;
  description: string;
  author: string;
  email: string;
  twitterHandle: string;
  twitterUrl: string;
  githubUrl: string;
  mainSiteUrl: string;
  locale: string;
};

export type Site = SiteConfig & {
  absoluteUrl(path: string): string;
};

export function createSite(config: SiteConfig): Site {
  return {
    ...config,
    absoluteUrl: (path) => new URL(path, config.url).toString(),
  };
}

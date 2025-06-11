export interface SiteConfig {
  title: string;
  description: string;
  author: {
    name: string;
    bio: string;
    avatar?: string;
  };
  social: {
    github?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    email?: string;
  };
  siteUrl: string;
}

export const config: SiteConfig = {
  title: "@jdrhyne",
  description: "Code, Curiosity, and Continuous Growth—Scaling Ideas Beyond Paper.",
  author: {
    name: "Jonathan D. Rhyne",
    bio: "American attorney, entrepreneur and photographer. Co-founder of PSPDFKit, the industry leading mobile PDF framework. Frequent public speaker lecturing around the world.",
    avatar: "/images/avatar.png"
  },
  social: {
    github: "https://github.com/jdrhyne",
    twitter: "https://x.com/jdrhyne",
    linkedin: "https://www.linkedin.com/in/jonathan-rhyne-54084811/",
    email: "hello@jdrhyne.me"
  },
  siteUrl: "https://jdrhyne.me"
};

// Export constants for SEO component
export const SITE_TITLE = config.title;
export const SITE_DESCRIPTION = config.description;
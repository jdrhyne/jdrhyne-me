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
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    // avatar: "/images/avatar.jpg" // Uncomment and add your avatar image to public/images/
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
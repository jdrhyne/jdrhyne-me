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
  title: "JDR",
  description: "Code, Curiosity, and Continuous Growth—Scaling Ideas Beyond Paper.",
  author: {
    name: "Jonathan D. Rhyne",
    bio: "Co-founder & CEO, Nutrient.io. Building elegantly simple developer tools that move the world beyond paper. Attorney-turned-technologist • Wine producer • Dad of 3 • Lifelong learner",
    avatar: "/images/avatar-sketch.png"
  },
  social: {
    github: "https://github.com/jdrhyne",
    twitter: "https://x.com/jdrhyne",
    linkedin: "https://www.linkedin.com/in/jonathan-rhyne-54084811/",
    email: "hello@jdrhyne.me"
  },
  siteUrl: "https://www.jdrhyne.me"
};

// Export constants for SEO component
export const SITE_TITLE = config.title;
export const SITE_DESCRIPTION = config.description;
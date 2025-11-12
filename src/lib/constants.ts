import type { z } from 'astro/zod';
import avatar from '@/assets/images/avatar.jpg';
import type { seoSchemaWithoutImage } from '@/content.config';
import astroConfig from 'astro.config.mjs';

export type AuthorInfo = {
  name: string;
  avatar: any;
  headline: string;
  username?: string;
  location?: string;
  pronouns?: string;
  linkOrder?: string[];
  skillsCategoryOrder?: string[];
}

export type Seo = z.infer<typeof seoSchemaWithoutImage> & {
  image?: any;
}

type DefaultConfigurationType = {
  baseUrl: string,
  author: AuthorInfo;
  seo: Seo;
}

export const DEFAULT_CONFIGURATION: DefaultConfigurationType = {
  baseUrl: astroConfig.site || 'https://albertusandito.com',
  author: {
    avatar,
    name: 'Albertus Andito',
    headline: 'NLP and AI Researcher | Software Engineer',
    username: 'albertus-andito',
    location: 'Brighton, UK',
    pronouns: 'He/Him',
    linkOrder: ['Email', 'LinkedIn', 'GitHub', 'Instagram', 'Website'],
    skillsCategoryOrder: ['Programming Languages', 'ML & NLP', 'Web & App Development', 'Infrastructure & Tools']
  },
  seo: {
    title: 'Albertus Andito',
    description: 'Personal website of Albertus Andito, an NLP and AI Researcher and Software Engineer.',
    type: 'website',
    image: avatar,
    twitter: {
      creator: '@cvfolio'
    },
    // robots: 'noindex, nofollow',
  }
};

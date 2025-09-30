import { DEFAULT_CONFIGURATION } from './constants';
import type { CollectionEntry } from 'astro:content';
import { format } from 'date-fns';

export const formatDate = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC', // Default to UTC to prevent timezone issues
  });

  // Ensure we're parsing the date correctly
  return formatter.format(new Date(date));
};

export const formatDateCV = (date: Date | undefined) => {
  if (date === undefined) {
    return 'Present';
  }
  return format(date, 'MMM yyyy');
};

export const generateAbsoluteUrl = (path: string) =>
  DEFAULT_CONFIGURATION.baseUrl.concat(path);

export const isDevelopment = () => import.meta.env.MODE === 'development';

export const includeDraft = (draft: boolean) => {
  if (isDevelopment()) return true;
  return draft !== true;
};

export const sortJobsByDate = (jobs: CollectionEntry<'jobs'>[] | CollectionEntry<'volunteers'>[] | CollectionEntry<'educations'>[]) => {
  // sort by 'to' date first, then by 'from' date
  // if 'to' is undefined, it means the job is current, so it should come first
  return jobs.sort((a, b) => {
    const aTo = a.data.to ? new Date(a.data.to).getTime() : Infinity;
    const bTo = b.data.to ? new Date(b.data.to).getTime() : Infinity;

    if (aTo !== bTo) {
      return bTo - aTo; // descending order
    }

    const aFrom = new Date(a.data.from).getTime();
    const bFrom = new Date(b.data.from).getTime();

    return bFrom - aFrom; // descending order
  });
};

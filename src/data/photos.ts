import manifest from './photos.json';

export const categories = [
  {value: 'all', label: 'All'}, {value: 'wroclaw', label: 'Wrocław'},
  {value: 'science-events', label: 'Science events'}, {value: 'nature', label: 'Nature'}, {value: 'travel', label: 'Travel'},
] as const;

export interface Photo {
  src800: string;
  src1600: string;
  width: number;
  height: number;
  placeholder: string;
  category: typeof categories[number]['value'];
  title: string;
  caption: string;
  alt: string;
  date: string;
  featured: boolean;
}

export const photos = manifest as Photo[];
export const photoSlug = (photo: Photo) => photo.src1600.slice('photos/'.length, -'-1600.webp'.length);

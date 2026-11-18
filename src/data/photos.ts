import manifest from './photos.json';

export const categories = [
  {value: 'all', label: 'All'}, {value: 'wroclaw', label: 'Wrocław'},
  {value: 'science-events', label: 'Science events'}, {value: 'nature', label: 'Nature'}, {value: 'travel', label: 'Travel'}, {value: 'life', label: 'Desk & life'},
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

const galleryOrder = ['wroclaw', 'nature', 'travel', 'science-events', 'life'];
// The build script writes the manifest in file order; show Wrocław first and desk photos last.
export const photos = (manifest as Photo[]).slice().sort((a, b) => galleryOrder.indexOf(a.category) - galleryOrder.indexOf(b.category));
export const photoSlug = (photo: Photo) => photo.src1600.slice('photos/'.length, -'-1600.webp'.length);

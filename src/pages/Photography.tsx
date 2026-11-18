import { useState } from 'react';
import { Figure, FilterChips } from '../components/ui';
import photoData from '../data/photography.json';

export const photos = photoData as Array<{ src: string; category: string; alt: string; caption: string }>;
const categories = ['All', 'Wrocław', 'Science events', 'Nature', 'Travel'].map(value => ({ value, label: value }));

export default function Photography() {
  const [category, setCategory] = useState('All');
  return <div className="mx-auto max-w-[1120px] space-y-6">
    <h1>Photography</h1>
    {!!photos.length && <FilterChips name="Photo categories" options={categories} value={category} onChange={setCategory} />}
    {!photos.length && <p className="text-muted">The photo gallery is currently unavailable.</p>}
    <div className="columns-2 gap-3 md:columns-3 lg:columns-4">
      {photos.filter(photo => category === 'All' || category === photo.category).map(photo =>
        <div className="mb-3 break-inside-avoid" key={photo.src}><Figure figure={photo} /></div>)}
    </div>
  </div>;
}

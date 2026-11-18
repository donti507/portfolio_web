import { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { CopyButton, FilterChips, label, panel } from '../components/ui';
import { PhotoImage } from '../components/PhotoImage';
import { categories, photos, photoSlug, type Photo } from '../data/photos';

const gallerySizes = '(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw';
const categoryName = (photo: Photo) => categories.find(category => category.value === photo.category)?.label;

export default function Photography() {
  const [params, setParams] = useSearchParams();
  const category = categories.find(item => item.value === params.get('c'))?.value ?? 'all';
  const filtered = photos.filter(photo => category === 'all' || photo.category === category);
  const selected = photos.find(photo => photoSlug(photo) === params.get('p'));
  const sequence = selected && !filtered.includes(selected) ? photos : filtered;
  const index = selected ? sequence.indexOf(selected) : -1;
  const featured = filtered.find(photo => photo.featured);
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const touchStart = useRef<{ x: number; y: number }>(null);
  const isOpen = Boolean(selected);

  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return;
    if (isOpen && !modal.open) {
      returnFocus.current ??= document.activeElement instanceof HTMLElement ? document.activeElement : null;
      modal.showModal();
    } else if (!isOpen && modal.open) {
      modal.close();
    }
  }, [isOpen]);

  function updatePhoto(photo?: Photo, replace = false) {
    const next = new URLSearchParams(params);
    next.set('c', category);
    if (photo) next.set('p', photoSlug(photo));
    else next.delete('p');
    setParams(next, { replace });
  }

  function move(delta: number) {
    if (sequence.length < 2) return;
    updatePhoto(sequence[(index + delta + sequence.length) % sequence.length], true);
  }

  function onClose() {
    if (selected) updatePhoto(undefined, true);
    const target = returnFocus.current;
    returnFocus.current = null;
    (target && target !== document.body && target.isConnected ? target : title.current)?.focus({ preventScroll: true });
  }

  return <div className="mx-auto max-w-[1120px] space-y-7">
    <header className="space-y-3 border-b border-line pb-6">
      <p className={label}>Photography</p>
      <h1 ref={title} tabIndex={-1}>Through the lens</h1>
      <p className="text-muted">Science events, Wrocław and places I've been. All photos are my own.</p>
    </header>
    <FilterChips name="Photo categories" value={category}
      options={categories.map(item => ({value: item.value, label: `${item.label} (${item.value === 'all' ? photos.length : photos.filter(photo => photo.category === item.value).length})`}))}
      onChange={value => setParams({ c: value })} />
    {!photos.length ? <p className="text-muted">Photos coming soon.</p> :
      !filtered.length ? <p className="text-muted">No photos in this category yet.</p> : null}
    {featured && <button type="button" className={panel + ' relative block w-full overflow-hidden text-left'}
      onClick={event => {
        returnFocus.current = event.currentTarget;
        updatePhoto(featured);
      }}>
      <PhotoImage key={featured.src800} photo={featured} sizes="(min-width: 1120px) 1120px, 100vw" className="aspect-video object-cover" />
      <span className="absolute inset-x-0 bottom-0 block border-t border-line bg-card/95 p-3 text-ink sm:p-5">
        <span className="block font-heading text-xl"><span className="sr-only">View featured photo: </span>{featured.title}</span>
        {featured.caption && <span className="block text-sm text-muted">{featured.caption}</span>}
      </span>
    </button>}
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {filtered.map(photo => <div key={photo.src1600} className="mb-4 break-inside-avoid">
        <button type="button" data-photo={photoSlug(photo)}
          className={panel + ' block w-full overflow-hidden text-left hover:border-primary'} onClick={event => {
            returnFocus.current = event.currentTarget;
            updatePhoto(photo);
          }}>
          <PhotoImage photo={photo} sizes={gallerySizes} />
          <span className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5 px-3 py-2 text-sm text-ink">
            <span><span className="sr-only">View photo: </span>{photo.title}</span>{photo.date && <span className="font-mono text-xs text-muted">{photo.date}</span>}
          </span>
        </button>
      </div>)}
    </div>
    <dialog ref={dialog} aria-labelledby="lightbox-title" onClose={onClose}
      className="photo-lightbox fixed inset-0 m-auto max-h-[92dvh] w-[min(94vw,1040px)] overflow-auto rounded-lg border border-line bg-card p-3 text-ink backdrop:bg-ink/80 sm:p-5"
      onKeyDown={event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          move(event.key === 'ArrowLeft' ? -1 : 1);
        }
      }}>
      {selected && <>
        <div className="mb-2 flex justify-end">
          <button type="button" autoFocus aria-label="Close photo" className="p-2" onClick={() => dialog.current?.close()}><X size={22} /></button>
        </div>
        <div className="touch-pan-y" onTouchStart={event => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
          onTouchCancel={() => { touchStart.current = null; }}
          onTouchEnd={event => {
            const start = touchStart.current;
            touchStart.current = null;
            if (!start) return;
            const dx = event.changedTouches[0].clientX - start.x;
            const dy = event.changedTouches[0].clientY - start.y;
            if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
          }}>
          <PhotoImage key={selected.src1600} photo={selected} large className="max-h-[59dvh] object-contain" />
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <button type="button" aria-label="Previous photo" className="rounded border border-line p-2 disabled:opacity-50" disabled={sequence.length < 2} onClick={() => move(-1)}><ArrowLeft size={20} /></button>
          <p aria-live="polite" className="font-mono text-xs text-muted">{index + 1} / {sequence.length}</p>
          <button type="button" aria-label="Next photo" className="rounded border border-line p-2 disabled:opacity-50" disabled={sequence.length < 2} onClick={() => move(1)}><ArrowRight size={20} /></button>
        </div>
        <div className="mt-2 space-y-2">
          <h2 id="lightbox-title" className="text-2xl">{selected.title}</h2>
          <p className="font-mono text-xs text-muted">{categoryName(selected)}{selected.date ? ' · ' + selected.date : ''}</p>
          {selected.caption && <p className="text-sm">{selected.caption}</p>}
          <CopyButton text="Copy photo link" value={`${location.origin}${location.pathname}#/photography?c=all&p=${encodeURIComponent(photoSlug(selected))}`} />
        </div>
      </>}
    </dialog>
  </div>;
}

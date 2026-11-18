import { useRef, useState } from 'react';
import { ExternalLink, Music2, Play, X } from 'lucide-react';
import { youtubeTracks } from '../data/youtube-music';

export default function YouTubeMusic() {
  const [open, setOpen] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);
  const button = useRef<HTMLButtonElement>(null);
  const track = youtubeTracks.find(item => item.id === videoId);

  function close() {
    setOpen(false);
    setVideoId(null);
    button.current?.focus();
  }

  return <div className="relative" onKeyDown={event => {
    if (event.key === 'Escape' && open) {
      event.stopPropagation();
      close();
    }
  }}>
    <button ref={button} type="button" aria-label="Music player" title="Music player"
      aria-expanded={open} aria-controls={open ? 'youtube-music-panel' : undefined}
      className="grid size-9 place-items-center rounded text-ink hover:bg-tint"
      onClick={() => open ? close() : setOpen(true)}>
      <Music2 size={20} aria-hidden="true" />
    </button>
    {open && <section id="youtube-music-panel" aria-labelledby="youtube-music-heading"
      className="absolute right-[-2.25rem] z-30 mt-2 max-h-[calc(100dvh-6rem)] w-[min(22rem,calc(100vw-2rem))] space-y-3 overflow-auto rounded-lg border border-line bg-card p-3 text-ink shadow-lg sm:right-0 sm:p-4">
      <div className="flex items-center justify-between gap-2">
        <h2 id="youtube-music-heading" className="font-heading text-xl">Music</h2>
        <button type="button" aria-label="Close music player" onClick={close} className="rounded p-2 hover:bg-tint"><X size={18} aria-hidden="true" /></button>
      </div>
      <ul className="space-y-2">
        {youtubeTracks.map(item => <li key={item.id} className="flex items-center gap-1 rounded-md border border-line">
          <button type="button" aria-pressed={videoId === item.id} onClick={() => setVideoId(item.id)}
            className="flex min-w-0 flex-1 items-center gap-2 rounded p-2 text-left hover:bg-tint aria-pressed:bg-tint">
            <Play className="shrink-0 text-primary" size={16} aria-hidden="true" />
            <span><strong className="block text-sm">{item.title}</strong><span className="block text-xs text-muted">{item.artist}</span></span>
          </button>
          <a href={`https://www.youtube.com/watch?v=${item.id}`} target="_blank" rel="noopener noreferrer"
            aria-label={`Open ${item.title} on YouTube (${item.channel})`} className="rounded p-2 hover:bg-tint">
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </li>)}
      </ul>
      {track && <>
        <iframe key={track.id} className="block aspect-video min-h-[200px] w-full rounded border border-line"
          title={`${track.title} · YouTube player`} src={`https://www.youtube-nocookie.com/embed/${track.id}?autoplay=1`}
          referrerPolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
        <a href={`https://www.youtube.com/watch?v=${track.id}`} target="_blank" rel="noopener noreferrer" className="text-sm underline">Listen on YouTube</a>
      </>}
    </section>}
  </div>;
}

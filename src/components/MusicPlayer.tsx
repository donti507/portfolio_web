import { useEffect, useRef, useState } from 'react';
import { Music2, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { asset, hasAsset } from '../data/assets';
import manifest from '../data/music.json';

interface Track {
  src: string;
  title: string;
  artist: string;
  license: string;
  source: string;
}

const tracks = (manifest as Track[]).filter(track => hasAsset(track.src));
const storageKey = 'portfolio-music';
const initial = { src: '', volume: 0.65, muted: false };
const control = 'rounded-md border border-line p-2 text-ink hover:bg-tint';

function settings() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) ?? '{}');
    return {
      src: typeof saved.src === 'string' ? saved.src : initial.src,
      volume: typeof saved.volume === 'number' && Number.isFinite(saved.volume)
        ? Math.min(1, Math.max(0, saved.volume)) : initial.volume,
      muted: saved.muted === true,
    };
  } catch {
    return initial;
  }
}

function formatTime(value: number) {
  return `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, '0')}`;
}

export default function MusicPlayer() {
  const [saved] = useState(settings);
  const [index, setIndex] = useState(() => Math.max(0, tracks.findIndex(track => track.src === saved.src)));
  const [volume, setVolume] = useState(saved.volume);
  const [muted, setMuted] = useState(saved.muted);
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [available, setAvailable] = useState(tracks.length);
  const audio = useRef<HTMLAudioElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const current = useRef(index);
  const failed = useRef(new Set<number>());
  const intention = useRef(false);
  const generation = useRef(0);
  const track = tracks[index];

  useEffect(() => {
    if (!audio.current) return;
    audio.current.volume = volume;
    audio.current.muted = muted;
    try { localStorage.setItem(storageKey, JSON.stringify({ src: track?.src, volume, muted })); } catch { /* storage unavailable */ }
  }, [track?.src, volume, muted]);

  useEffect(() => {
    function pauseForMedia(event: Event) {
      if (event.target instanceof HTMLMediaElement && event.target !== audio.current) pause();
    }
    document.addEventListener('play', pauseForMedia, true);
    return () => document.removeEventListener('play', pauseForMedia, true);
  }, []);

  useEffect(() => {
    if (!open) return;
    function closeOutside(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [open]);

  function pause() {
    intention.current = false;
    generation.current++;
    audio.current?.pause();
    setPlaying(false);
  }

  function select(next: number, play: boolean, reset = false) {
    const element = audio.current;
    if (!element || !tracks[next]) return;
    const operation = ++generation.current;
    const changed = current.current !== next;
    current.current = next;
    intention.current = play;
    setIndex(next);
    if (changed || reset) setPosition(0);
    if (changed) setDuration(0);
    if (!play) {
      element.pause();
      if (changed) {
        element.removeAttribute('src');
        element.load();
      }
      return;
    }
    const source = asset(tracks[next].src);
    if (element.getAttribute('src') !== source) element.src = source;
    else if (reset) element.currentTime = 0;
    void element.play().catch(error => {
      if (operation !== generation.current) return;
      if (error instanceof DOMException && error.name === 'NotSupportedError') handleError();
      else pause();
    });
  }

  function nextIndex(delta: number) {
    for (let offset = 1; offset <= tracks.length; offset++) {
      const candidate = (current.current + tracks.length + delta * offset) % tracks.length;
      if (!failed.current.has(candidate)) return candidate;
    }
    return null;
  }

  function move(delta: number, play = intention.current, reset = false) {
    const next = nextIndex(delta);
    if (next !== null) select(next, play, reset);
  }

  function handleError() {
    if (failed.current.has(current.current)) return;
    failed.current.add(current.current);
    setAvailable(tracks.length - failed.current.size);
    const next = nextIndex(1);
    if (next === null) pause();
    else select(next, intention.current);
  }

  function toggle() {
    if (intention.current) pause();
    else select(current.current, true);
  }

  if (!track || !available) return null;
  return <div ref={root} className="relative" onKeyDown={event => {
    if (event.key === 'Escape' && open) {
      event.stopPropagation();
      setOpen(false);
      trigger.current?.focus();
    } else if (event.key === ' ' && event.target === event.currentTarget.querySelector('[data-player-panel]')) {
      event.preventDefault();
      toggle();
    }
  }}>
    <audio ref={audio} preload="none"
      onPlay={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      onEnded={() => move(1, intention.current, true)}
      onError={handleError}
      onTimeUpdate={event => setPosition(event.currentTarget.currentTime)}
      onDurationChange={event => {
        const value = event.currentTarget.duration;
        setDuration(Number.isFinite(value) ? value : 0);
      }} />
    <button ref={trigger} type="button" aria-label="Music player" aria-expanded={open}
      aria-controls={open ? 'music-player-panel' : undefined} className="grid size-9 place-items-center rounded text-ink"
      onClick={() => setOpen(value => !value)}>
      {playing ? <span className="music-equalizer flex h-5 items-end gap-0.5 text-primary" aria-hidden="true">
        <span className="h-2.5 w-0.5 bg-current" /><span className="h-4 w-0.5 bg-current" /><span className="h-3 w-0.5 bg-current" />
      </span> : <Music2 size={20} aria-hidden="true" />}
    </button>
    <p aria-live="polite" className="sr-only">{playing ? `Now playing: ${track.title} by ${track.artist}` : ''}</p>
    {open && <section id="music-player-panel" data-player-panel tabIndex={0} aria-label="Playback controls"
      className="absolute top-full right-[-2.25rem] z-30 mt-2 w-[min(20rem,calc(100vw-2rem))] space-y-3 rounded-lg border border-line bg-card p-4 text-ink shadow-lg sm:right-0">
      <div><p className="break-words font-heading text-xl">{track.title}</p><p className="text-sm text-muted">{track.artist}</p></div>
      <div className="flex items-center justify-center gap-2">
        <button type="button" className={control} aria-label="Previous track" disabled={available < 2} onClick={() => move(-1)}><SkipBack size={18} /></button>
        <button type="button" className={control} aria-label={playing ? 'Pause music' : 'Play music'} onClick={toggle}>
          {playing ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button type="button" className={control} aria-label="Next track" disabled={available < 2} onClick={() => move(1)}><SkipForward size={18} /></button>
      </div>
      <label className="block text-sm">Seek
        <input type="range" className="block w-full accent-primary" min={0} max={duration || 1}
          step={0.1} value={Math.min(position, duration)} disabled={!duration}
          onChange={event => {
            if (audio.current && duration) audio.current.currentTime = Number(event.target.value);
            setPosition(Number(event.target.value));
          }} />
      </label>
      <p className="flex justify-between font-mono text-xs text-muted"><span>{formatTime(position)}</span><span>{formatTime(duration)}</span></p>
      <div className="flex items-end gap-3">
        <button type="button" className={control} aria-label={muted ? 'Unmute music' : 'Mute music'} onClick={() => setMuted(value => !value)}>
          {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>
        <label className="flex-1 text-sm">Volume<input type="range" min={0} max={1} step={0.01}
          className="block w-full accent-primary" value={volume} onChange={event => setVolume(Number(event.target.value))} /></label>
      </div>
      <details className="border-t border-line pt-2">
        <summary className="cursor-pointer text-sm text-primary underline">Credits</summary>
        <ul className="mt-2 space-y-2 text-xs text-muted">{(manifest as Track[]).map(item => <li key={item.src}>
          <strong className="text-ink">{item.title}</strong> by {item.artist} · {item.license} · {item.source === 'own recording'
            ? item.source : <a href={item.source} className="underline">Source</a>}
        </li>)}</ul>
      </details>
    </section>}
  </div>;
}

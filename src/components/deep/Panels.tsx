import { Activity, ArrowDown, ArrowRight, ArrowUpRight, CheckCircle2, Circle, Clock, Cpu, Files, Layers, Shield, Sparkles, Target, TriangleAlert } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Block, DeepProject, IconName, Metric, Note, Step, Tone } from '../../data/deep';
import type { ProjectDetail } from '../../data/projects';
import { asset } from '../../data/assets';
import { CopyButton, Tags, label, panel } from '../ui';

const icons = { target: Target, activity: Activity, layers: Layers, cpu: Cpu, shield: Shield, clock: Clock, spark: Sparkles, files: Files } satisfies Record<IconName, typeof Target>;
export const accents: Record<Tone, string> = { primary: 'text-primary', coral: 'text-coral', teal: 'text-teal', neutral: 'text-muted' };

export function MetricCard({ metric }: { metric: Metric }) {
  const Icon = icons[metric.icon];
  const tone = accents[metric.tone];
  return <div className={panel + ' relative grid content-start gap-2 overflow-hidden p-4 pt-5 sm:p-5 sm:pt-6'}>
    <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 bg-current ${tone}`} />
    <dt className={label + ' flex items-start justify-between gap-2'}>{metric.label}<Icon size={17} className={tone + ' shrink-0'} aria-hidden="true" /></dt>
    <dd className={'font-heading text-3xl leading-none sm:text-4xl ' + tone}>{metric.value}</dd>
    <dd className="text-sm text-muted">{metric.caption}</dd>
    {metric.chip && <dd className="mt-1 w-fit rounded bg-tint px-2 py-1 font-mono text-xs text-ink">{metric.chip}</dd>}
  </div>;
}

export function PanelHeader({ title, eyebrow, children }: { title: string; eyebrow?: string; children?: ReactNode }) {
  return <header className="flex flex-wrap items-end justify-between gap-3">
    <div>{eyebrow && <p className={label + ' mb-2'}>{eyebrow}</p>}<h2>{title}</h2></div>{children}
  </header>;
}

export function BenchmarkTable({ title, headers, rows, caption }: Extract<Block, {kind: 'table'}>) {
  const tones = { best: 'bg-tint font-semibold', reference: 'italic text-muted', bound: 'text-teal font-semibold' };
  return <div className={panel + ' min-w-0 overflow-hidden'}>
    <div className="overflow-x-auto focus-visible:outline-offset-[-3px]" tabIndex={0} role="region" aria-label={title}>
      <table className="w-full border-collapse text-left text-sm">
        <caption className="px-4 py-3 text-left font-heading text-xl text-ink">{title}</caption>
        <thead className="border-y border-line bg-tint text-muted"><tr>{headers.map(header => <th scope="col" className="px-3 py-2" key={header}>{header}</th>)}</tr></thead>
        <tbody>{rows.map(row => <tr key={row.cells[0]} className={'border-b border-line last:border-0 ' + (row.tone ? tones[row.tone] : '')}>
          <th scope="row" className="min-w-24 px-3 py-2 font-semibold">{row.cells[0]}</th>
          {row.cells.slice(1).map((cell, index) => <td key={index} className="px-3 py-2 tabular-nums">{row.badge && index === headers.length - 2 ? <span className={`inline-block rounded-full border border-line bg-card px-2 py-1 text-xs ${accents[row.badge]}`}>{cell}</span> : cell}</td>)}
        </tr>)}</tbody>
      </table>
    </div>
    {caption && <p className="border-t border-line p-3 text-xs text-muted">{caption}</p>}
  </div>;
}

export function StepCards({ items }: {items: Step[]}) {
  return <ol className="grid gap-3">{items.map((item, index) => <li className={panel + ' flex gap-3 p-4'} key={item.title}>
    <span aria-hidden="true" className="h-fit rounded bg-tint px-2 py-1 font-mono text-xs text-primary">{String(index + 1).padStart(2, '0')}</span>
    <div className="min-w-0 flex-1 space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2"><strong>{item.title}</strong>{item.tools && <Tags values={item.tools} />}</div>
      <p className="text-sm text-muted">{item.body}</p>
    </div>
  </li>)}</ol>;
}

export function InsightCards({ items }: {items: Note[]}) {
  return <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{items.map(item => <li key={item.title} className={panel + ' space-y-2 p-4'}>
    <p className={label + ' ' + accents[item.tone ?? 'primary']}>{item.title}</p><p className="text-sm">{item.body}</p>
  </li>)}</ul>;
}

export function FeatureTiles({ items }: { items: Note[] }) {
  const features = [Layers, Shield, Target, Sparkles, Activity, Files];
  return <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{items.map((item, index) => {
    const Icon = features[index % features.length];
    return <li key={item.title} className={panel + ' space-y-2 p-4'}>
      <Icon size={19} className="text-primary" aria-hidden="true" />
      <strong className="block text-sm">{item.title}</strong><p className="text-sm text-muted">{item.body}</p>
    </li>;
  })}</ul>;
}

export function LimitsList({ items }: {items: Note[]}) {
  return <ul className="space-y-3 rounded-r-lg border-l-4 border-limits-border bg-limits p-4">{items.map(item => <li key={item.title} className="flex items-start gap-3 text-sm">
    <TriangleAlert className="mt-0.5 shrink-0 text-coral" size={16} aria-hidden="true" /><div><strong>{item.title}</strong><p className="mt-0.5 text-muted">{item.body}</p></div>
  </li>)}</ul>;
}

export function TerminalBlock({ file, code }: {file: string; code: string}) {
  return <div className="min-w-0 overflow-hidden rounded-lg border border-line bg-code">
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line p-3">
      <span className="flex items-center gap-2 font-mono text-xs text-muted"><WindowDots />{file}</span><div><CopyButton value={code} /></div>
    </div>
    <pre className="overflow-x-auto whitespace-pre-wrap wrap-anywhere p-4 font-mono text-sm text-ink"><code>{code}</code></pre>
  </div>;
}

function WindowDots() {
  return <span aria-hidden="true" className="inline-flex gap-1">
    <span className="size-2 rounded-full bg-coral-fill" /><span className="size-2 rounded-full bg-primary" /><span className="size-2 rounded-full bg-teal" />
  </span>;
}

export function ProvenanceCard({ text, title = "Data provenance" }: {text: string; title?: string}) {
  return <aside className="rounded-lg border border-line bg-tint p-3 text-xs text-muted">
    <p className="mb-2 flex items-center gap-2 font-semibold text-ink"><CheckCircle2 size={15} className="text-teal" aria-hidden="true" />{title}</p>{text}
  </aside>;
}

export function Dossier({ project, spec }: {project: ProjectDetail; spec?: DeepProject['dossier']}) {
  const details = [
    ['Dates', project.dates], ['Role', project.role], ['Collaborators', project.collaborators],
    ['Venue', spec?.venue], ['Equipment', spec?.equipment], ['Validation', spec?.validation],
  ];
  return <aside className={panel + ' space-y-4 p-4'}>
    <p className={label}>Research dossier</p><h2 className="text-xl">Project specs</h2>
    <dl className="space-y-3 border-l border-line pl-3 text-sm">{details.map(([title, value]) => value && <div key={title}>
      <dt className={label}>{title}</dt><dd>{value}</dd>
    </div>)}</dl>
    <div className="space-y-2"><p className={label}>Stack</p><Tags values={spec?.stack ?? project.stack} /></div>
    {spec?.datasets && <div className="space-y-2"><p className={label}>Datasets</p><ul className="space-y-1 text-sm">{spec.datasets.map(name => <li key={name}>{name}</li>)}</ul></div>}
    <div className="space-y-2 border-t border-line pt-3"><p className={label}>Open artifacts</p>
      <ul className="space-y-2 text-sm">{project.links.map(link => <li key={link.href}><a className="inline-flex items-center gap-1 underline underline-offset-2" href={link.href}>{link.label}<ArrowUpRight size={13} aria-hidden="true" /></a></li>)}</ul>
    </div>
  </aside>;
}

export function EquationCard({ title, equations, text }: Extract<Block, {kind: 'equation'}>) {
  return <div className={panel + ' space-y-3 p-4'}><p className={label}>{title}</p>
    <div className="grid gap-2 sm:grid-cols-2">{equations.map(equation => <p key={equation} className="rounded bg-tint p-3 text-center font-heading text-2xl">{equation}</p>)}</div>
    <p className="text-sm text-muted">{text}</p>
  </div>;
}

export function Funnel({ title, stages }: Extract<Block, {kind: 'funnel'}>) {
  return <div className={panel + ' space-y-3 p-4'}><p className={label}>{title}</p>
    <ol className="space-y-1">{stages.map((stage, index) => <li key={stage.label}>
      <div className={`rounded p-3 ${index === stages.length - 1 ? 'bg-tint text-teal' : 'bg-limits text-ink'}`}>
        <span className="mr-2 font-heading text-2xl">{stage.value}</span><strong className="text-sm">{stage.label}</strong>
        {stage.note && <p className="text-xs text-muted">{stage.note}</p>}
      </div>
      {index < stages.length - 1 && <ArrowDown size={15} className="mx-auto my-1 text-muted" aria-hidden="true" />}
    </li>)}</ol>
  </div>;
}

export function PipelineDiagram({ title, stages, branches, examples }: Extract<Block, {kind: 'flow'}>) {
  return <div className={panel + ' space-y-3 p-4'}><p className={label}>{title}</p>
    <ol className="grid gap-2 sm:grid-flow-col sm:auto-cols-fr">{stages.map((stage, index) => <li key={stage} className="flex items-center gap-2 rounded bg-tint p-3 text-sm">
      <span className="flex-1">{stage}</span>{index < stages.length - 1 && <ArrowRight size={15} aria-hidden="true" className="hidden shrink-0 text-primary sm:block" />}
    </li>)}</ol>
    {branches && <ul className="grid gap-2 sm:grid-cols-2">{branches.map((branch, index) => <li className={'rounded border border-line p-3 text-sm font-semibold ' + (index ? 'text-coral' : 'text-teal')} key={branch}>{branch}</li>)}</ul>}
    {examples && <div className="space-y-1 border-t border-line pt-3"><p className={label}>Illustrative</p>{examples.map(example => <p key={example} className="text-sm">{example}</p>)}</div>}
  </div>;
}

export function TimelineBand({ title, anchor, stages }: Extract<Block, {kind: 'timeline'}>) {
  return <div className={panel + ' space-y-3 p-4'}><p className={label}>{title}</p>
    <p className="rounded border-l-4 border-primary bg-tint p-3 font-semibold">{anchor}</p>
    <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{stages.map(stage => <li key={stage.title} className="rounded border-t-2 border-teal bg-tint p-3 text-sm">
      <strong>{stage.title}</strong><p className="mt-1 text-muted">{stage.body}</p>
    </li>)}</ol>
  </div>;
}

export function BrowserFrame({ title, url, children }: {title: string; url?: string; children: ReactNode}) {
  return <div className={panel + ' overflow-hidden'}>
    <div className="flex flex-wrap items-center gap-3 border-b border-line bg-tint px-4 py-2 text-xs">
      <WindowDots /><strong>{title}</strong>{url && <a href={url} className="wrap-anywhere underline underline-offset-2">{url}</a>}
    </div>{children}
  </div>;
}

export function BrowserShowcase({ title, url, pages, callouts }: Extract<Block, {kind: 'browser'}>) {
  const first = pages[0];
  return <div className="space-y-3">
    <BrowserFrame title={title} url={url}>
      {first?.image && <img className="h-auto w-full" src={asset(first.image)} alt={first.label} width={first.width} height={first.height} decoding="async" loading="lazy" />}
      <ul className="grid gap-2 bg-tint p-3 sm:grid-cols-3">{callouts.map(callout => <li key={callout} className={panel + ' p-3 text-sm font-semibold'}>{callout}</li>)}</ul>
    </BrowserFrame>
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">{pages.map(page => <li key={page.href}>
      <a href={page.href} className={panel + ' flex h-full flex-col overflow-hidden text-sm font-semibold'}>
        {page.image && <img src={asset(page.image)} alt="" width={page.width} height={page.height} className="aspect-video h-auto w-full object-cover object-top" loading="lazy" decoding="async" />}
        <span className="p-2">{page.label} <ArrowUpRight size={13} aria-hidden="true" className="inline" /></span>
      </a>
    </li>)}</ul>
  </div>;
}

export function ChatMock({ title, lanes, user, action, voice }: Extract<Block, {kind: 'chat'}>) {
  return <BrowserFrame title={title}>
    <div className="grid gap-3 p-4 md:grid-cols-[1.4fr_1fr]">
      <ul className="grid grid-cols-2 gap-3">{lanes.map(lane => <li key={lane} className="min-h-20 rounded border border-line bg-limits p-3 text-sm font-semibold">{lane}</li>)}</ul>
      <div className="space-y-3 rounded border border-line bg-tint p-3">
        <p className={label}>Dante</p><p className={panel + ' ml-5 rounded-tr-none p-3 text-sm'}>{user}</p>
        <p className="flex gap-2 rounded border border-teal/40 bg-card p-3 text-sm"><CheckCircle2 size={18} className="shrink-0 text-teal" aria-hidden="true" />{action}</p>
        <p className="flex items-center gap-2 text-sm text-muted"><Activity size={20} className="text-primary" aria-hidden="true" />{voice}</p>
      </div>
    </div>
  </BrowserFrame>;
}

export function ScoreTable({ title, items }: Extract<Block, {kind: 'scores'}>) {
  return <BenchmarkTable kind="table" title={title} headers={['Hypothesis', 'Evidence', 'Status']} rows={items.map(item => ({
    cells: [`${item.id} · ${item.title}`, item.detail, item.status], tone: item.status === 'Supported' ? 'best' : undefined,
    badge: item.status === 'Supported' ? 'teal' : item.status === 'Not supported' ? 'coral' : 'neutral',
  }))} />;
}

export function StatusGrid({ title, note, complete, failed, caption }: Extract<Block, {kind: 'status'}>) {
  return <div className={panel + ' space-y-3 p-4'}>
    <p className={label}>{title}</p>
    <svg role="img" aria-label={`${title}: ${complete} completed, ${failed} failed. Order illustrative.`}
      viewBox={`0 0 320 ${Math.ceil((complete + failed) / 8) * 36}`} className="mx-auto block h-auto w-full max-w-md font-mono text-sm">
      {Array.from({length: complete + failed}, (_, index) => {
        const tone = index < complete ? 'var(--color-teal)' : 'var(--color-coral)';
        return <g key={index} transform={`translate(${index % 8 * 40} ${Math.floor(index / 8) * 36})`}>
          <rect x="2" y="2" width="35" height="31" rx="4" fill={tone} opacity=".18" />
          <text x="20" y="23" textAnchor="middle" fill="var(--color-ink)">{index + 1}</text>
        </g>;
      })}
    </svg>
    <div className="sr-only"><table><caption>{title} · task totals</caption><thead><tr><th scope="col">Status</th><th scope="col">Tasks</th></tr></thead>
      <tbody><tr><th scope="row">Completed</th><td>{complete}</td></tr><tr><th scope="row">Failed</th><td>{failed}</td></tr></tbody>
    </table></div>
    <p className="text-sm"><Circle size={13} className="mr-1 inline fill-current text-teal" aria-hidden="true" />{complete} completed
      <Circle size={13} className="mr-1 ml-3 inline fill-current text-coral" aria-hidden="true" />{failed} failed</p>
    <p className="text-xs text-muted">{note}</p><p className="border-t border-line pt-2 text-xs text-muted">{caption}</p>
  </div>;
}

export function BeforeAfterCode({ title, before, after, file }: Extract<Block, {kind: 'beforeAfter'}>) {
  return <div className="space-y-3"><p className={label}>{title}</p>
    <div className="grid gap-3"><div className="rounded border border-line bg-card p-3 text-sm"><strong className="text-coral">✗ Crashed</strong><p className="mt-1">{before}</p></div>
      <div className="min-w-0 space-y-2"><strong className="text-teal">✓ Fixed</strong><TerminalBlock file={file} code={after} /></div>
    </div>
  </div>;
}

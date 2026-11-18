import { ArrowRight, CalendarDays, Kanban, Link2, ListTodo, Mic, ShieldCheck, Video, ChartNoAxesCombined } from 'lucide-react';
import { Button, Figure, LimitsCallout, Tags, label, panel } from '../components/ui';
import { hasAsset } from '../data/assets';
import type { ProjectDetail } from '../data/projects';

function MeasuredValues({ title, values, maximum, unit }: {
  title: string; values: Array<{ label: string; value: number; text: string }>; maximum: number; unit: string;
}) {
  return <section className={panel + ' space-y-4 p-5'}>
    <h2>{title}</h2>
    <ul className="space-y-4">
      {values.map(({ label, value, text }, index) => <li key={label}>
        <div className="mb-1 flex flex-wrap justify-between gap-1 text-sm"><span>{label}</span><span className="font-mono">{text} {unit}</span></div>
        <svg aria-hidden="true" viewBox="0 0 100 4" preserveAspectRatio="none" className="h-3 w-full overflow-hidden rounded-full">
          <rect width="100" height="4" fill="var(--color-tint)" />
          <rect width={100 * value / maximum} height="4" fill={index === 0 ? 'var(--color-teal)' : 'var(--color-coral-fill)'} />
        </svg>
      </li>)}
    </ul>
  </section>;
}

function Hpo({ project }: { project: ProjectDetail }) {
  const methods = [
    // Mean GPU-hours per trial and mean accuracy, from table1_summary.csv in the BudgetAware-HPO repo.
    { name: 'Random Search', hours: 0.144, accuracy: 61.3 },
    { name: 'TPE', hours: 0.077, accuracy: 82.0 },
    { name: 'Hyperband', hours: 0.050, accuracy: 84.4 },
    { name: 'CMA-ES', hours: 0.047, accuracy: 44.1 },
  ];
  const auditStages = [
    { value: '2,211', label: 'Result files reconciled' },
    { value: project.stats[0].value, label: 'Trial records' },
    { value: project.stats[3].value, label: 'Clean trials after audit' },
  ];
  return <div className="grid gap-4 md:grid-cols-2">
    <section className={panel + ' space-y-3 p-5'}>
      <h2>GPU-hours and accuracy</h2>
      <svg role="img" aria-label="Mean accuracy against mean GPU-hours per trial for four tuning methods" viewBox="0 0 320 190" className="w-full rounded bg-tint">
        {[40, 60, 80].map(tick => <g key={tick}>
          <line x1="40" x2="304" y1={160 - (tick - 30) * 2.4} y2={160 - (tick - 30) * 2.4} stroke="var(--color-line)" />
          <text x="34" y={164 - (tick - 30) * 2.4} textAnchor="end" fontSize="10" fill="var(--color-muted)">{tick}%</text>
        </g>)}
        {[0.05, 0.1, 0.15].map(tick => <text key={tick} x={40 + tick * 1700} y="176" textAnchor="middle" fontSize="10" fill="var(--color-muted)">{tick.toFixed(2)}</text>)}
        <path d="M40 16V160H304" fill="none" stroke="var(--color-muted)" />
        {methods.map(({ name, hours, accuracy }) => {
          const x = 40 + hours * 1700, y = 160 - (accuracy - 30) * 2.4, best = name === 'Hyperband';
          return <g key={name}>
            <circle cx={x} cy={y} r={best ? 7 : 5.5} fill={best ? 'var(--color-coral-fill)' : 'var(--color-primary)'} />
            <text x={name === 'Random Search' ? x - 9 : x + 10} y={name === 'Hyperband' ? y - 8 : name === 'TPE' ? y + 14 : y + 4}
              textAnchor={name === 'Random Search' ? 'end' : 'start'} fontSize="11" fill="var(--color-ink)">{name}</text>
          </g>;
        })}
      </svg>
      <p className="text-sm text-muted">Mean GPU-hours per trial (horizontal) against mean accuracy (vertical). Lower left is cheap, higher is better.</p>
      <ul className="space-y-1 text-sm">{methods.map(method => <li key={method.name}>{method.name} · {method.hours.toFixed(3)} GPU-h · {method.accuracy}%</li>)}</ul>
    </section>
    <section className={panel + ' space-y-4 p-5'}>
      <h2>{project.stats[1].value} {project.stats[1].label}</h2>
      <div aria-hidden="true" className="grid grid-cols-10 gap-2">{Array.from({ length: Number(project.stats[1].value) }, (_, index) =>
        <span key={index} className="aspect-square rounded bg-teal/20" />)}</div>
      <p className="text-sm text-muted">{project.approach.find(item => item.includes('SQLite'))}</p>
    </section>
    <section className={panel + ' space-y-3 p-5 md:col-span-2'}>
      <h2>I audited my own results</h2>
      <dl className="grid gap-3 sm:grid-cols-3">{auditStages.map(stage => <div key={stage.label} className="rounded bg-tint p-4">
        <dt className="text-sm text-muted">{stage.label}</dt><dd className="mt-1 font-heading text-3xl text-coral">{stage.value}</dd>
      </div>)}</dl>
      <p className="text-sm text-muted">{project.findings[2]}</p>
      <p className="text-sm text-muted">{project.limits[0]}</p>
    </section>
  </div>;
}

function Verification({ project }: { project: ProjectDetail }) {
  const stages = ['LLM proposes values', 'QuantLib/CDM verifier', 'Selector', 'Human review'];
  return <section className={panel + ' space-y-4 p-5'}>
    <h2>Verification workflow</h2>
    <ol className="grid gap-2 sm:grid-cols-4">{stages.map((stage, index) =>
      <li key={stage} className={`flex items-center justify-between gap-2 rounded p-3 text-sm font-semibold ${index === 3 ? 'bg-limits' : 'bg-tint'}`}>
        {stage}{index < stages.length - 1 && <ArrowRight size={16} aria-hidden="true" className="hidden shrink-0 text-primary sm:block" />}
      </li>)}</ol>
    <p className="text-sm text-muted">{project.approach[0]}</p>
    <LimitsCallout>{project.limits[0]}</LimitsCallout>
  </section>;
}

function StudyTimeline({ project }: { project: ProjectDetail }) {
  return <section className={panel + ' space-y-4 p-5'}>
    <h2>Study design</h2>
    <ol className="grid gap-3 sm:grid-cols-[1.4fr_1fr_1fr]">
      <li className="space-y-2 rounded border-t-4 border-teal bg-tint p-4">
        <p className={label}>±180 days</p><p>MRI, amyloid and tau PET</p>
      </li>
      <li className="space-y-2 rounded border-t-4 border-primary bg-tint p-4">
        <p className={label}>{project.stats[1].value}</p><p>Follow-up</p>
      </li>
      <li className="space-y-2 rounded border-t-4 border-coral bg-limits p-4">
        <p className={label}>Outcome</p><p>Cognitive decline</p>
      </li>
    </ol>
    <h3>Decided before seeing data</h3>
    <Tags values={['Cohort rules', 'Time windows', 'FDR control']} />
  </section>;
}

function ConnectomeShowcase({ project }: { project: ProjectDetail }) {
  const figure = project.figures?.[0];
  const demo = project.links.find(link => link.kind === 'demo');
  return <section className={panel + ' space-y-4 p-5'}>
    {figure && hasAsset(figure.src) && <div className="overflow-hidden rounded-lg border border-line">
      <div className="flex items-center gap-3 border-b border-line bg-tint px-3 py-2">
        <span aria-hidden="true" className="flex gap-1">{[0, 1, 2].map(index => <span key={index} className="size-2 rounded-full bg-primary/35" />)}</span>
        <span className={label}>{project.shortTitle}</span>
      </div>
      <Figure figure={figure} />
      <div className="space-y-2 bg-tint p-3">
        <Tags values={['Move between reconstructions', 'Refit cell-type gains']} />
        <p className="text-sm">{project.findings[0]}</p>
      </div>
    </div>}
    <h2>How it's built</h2>
    <div className="grid gap-3 md:grid-cols-3">{['Rendering', 'Network model', 'Correctness'].map((title, index) =>
      <div key={title} className="space-y-2 rounded bg-tint p-4"><h3>{title}</h3><p className="text-sm">{project.approach[index]}</p></div>)}</div>
    {demo && <Button href={demo.href} variant="primary">{demo.label}</Button>}
  </section>;
}

function Planner({ project }: { project: ProjectDetail }) {
  const features = [
    ['Tasks', ListTodo], ['Kanban', Kanban], ['Calendar sync', CalendarDays],
    ['Meetings', Video], ['Analytics', ChartNoAxesCombined], ['Link vault', Link2],
  ] as const;
  return <section className={panel + ' overflow-hidden'}>
    <div className="border-b border-line bg-tint p-4"><h2>{project.shortTitle}</h2></div>
    <div className="grid gap-3 p-4 lg:grid-cols-[1.35fr_1fr]">
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {features.map(([name, Icon]) => <li key={name} className="space-y-2 rounded border border-line bg-card p-3 text-sm font-semibold">
          <Icon size={18} className="text-primary" aria-hidden="true" /><span>{name}</span>
        </li>)}
      </ul>
      <div className="space-y-3 rounded bg-tint p-4">
        <h3 className="flex items-center gap-2"><Mic size={18} className="text-primary" aria-hidden="true" />Dante</h3>
        <p className="text-sm">{project.approach[1]}</p>
        <div className="flex gap-2 border-t border-line pt-3">
          <ShieldCheck size={18} className="shrink-0 text-teal" aria-hidden="true" />
          <p className="text-sm">{project.approach[2]}</p>
        </div>
      </div>
    </div>
  </section>;
}

export default function Signature({ project }: { project: ProjectDetail }) {
  switch (project.slug) {
    case 'physics-residual-aqa':
      return <MeasuredValues title="Required and observed pose precision" unit="px" maximum={10}
        values={project.stats.filter(stat => stat.value.endsWith(' px')).map(stat => ({
          label: stat.label, value: Number.parseFloat(stat.value.replace('≈', '')), text: stat.value.replace(' px', ''),
        }))} />;
    case 'budgetaware-hpo': return <Hpo project={project} />;
    case 'trust-but-verify': return <Verification project={project} />;
    case 'adni-brain-age': return <StudyTimeline project={project} />;
    case 'connectometwin': return <ConnectomeShowcase project={project} />;
    case 'zen-os': return <Planner project={project} />;
    default: return null;
  }
}

import { Button, panel } from '../components/ui';
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
    { name: 'Random Search', hours: 0.144, accuracy: 61.3 },
    { name: 'Hyperband', hours: 0.050, accuracy: 84.4 },
  ];
  return <div className="grid gap-4 md:grid-cols-2">
    <section className={panel + ' space-y-3 p-5'}>
      <h2>GPU-hours and accuracy</h2>
      <svg aria-hidden="true" viewBox="0 0 300 112" className="w-full rounded bg-tint">
        <path d="M24 16V94H276" fill="none" stroke="var(--color-muted)" />
        {methods.map(({ name, hours, accuracy }) => <circle key={name} cx={24 + hours * 1600}
          cy={94 - accuracy * 0.83} r="6" fill={name === 'Hyperband' ? 'var(--color-coral)' : 'var(--color-primary)'} />)}
      </svg>
      <p className="text-sm text-muted">GPU-hours per trial (horizontal) · mean accuracy (vertical)</p>
      <ul className="space-y-1 text-sm">{methods.map(method => <li key={method.name}>{method.name} · {method.hours.toFixed(3)} GPU-h · {method.accuracy}%</li>)}</ul>
    </section>
    <section className={panel + ' space-y-4 p-5'}>
      <h2>{project.stats[1].value} {project.stats[1].label}</h2>
      <div aria-hidden="true" className="grid grid-cols-10 gap-2">{Array.from({ length: Number(project.stats[1].value) }, (_, index) =>
        <span key={index} className="aspect-square rounded bg-teal/20" />)}</div>
      <p className="text-sm text-muted">{project.approach.find(item => item.includes('SQLite'))}</p>
    </section>
  </div>;
}

export default function Signature({ project }: { project: ProjectDetail }) {
  switch (project.slug) {
    case 'physics-residual-aqa':
      return <MeasuredValues title="Required and observed pose precision" unit="px" maximum={10}
        values={project.stats.filter(stat => stat.value.endsWith(' px')).map(stat => ({
          label: stat.label, value: Number.parseFloat(stat.value.replace('≈', '')), text: stat.value.replace(' px', ''),
        }))} />;
    case 'budgetaware-hpo': return <Hpo project={project} />;
    case 'trust-but-verify':
      return <section className={panel + ' p-5'}><h2>Verification workflow</h2>
        <ol className="mt-3 grid gap-3 sm:grid-cols-3">{project.approach.slice(0, 3).map(item =>
          <li key={item} className="rounded bg-tint p-3 text-sm">{item}</li>)}</ol></section>;
    case 'adni-brain-age':
      return <section className={panel + ' p-5'}><h2>Study design</h2>
        <ol className="mt-3 grid gap-3 sm:grid-cols-3">{project.approach.slice(0, 3).map(item =>
          <li key={item} className="rounded border-t-2 border-teal bg-tint p-3 text-sm">{item}</li>)}</ol></section>;
    case 'connectometwin':
      return <section className={panel + ' p-5'}><h2>How it's built</h2>
        <ul className="my-3 grid gap-3 sm:grid-cols-3">{project.approach.slice(0, 3).map(item =>
          <li key={item} className="rounded bg-tint p-3 text-sm">{item}</li>)}</ul>
        <Button href={project.links.find(link => link.kind === 'demo')?.href} variant="primary">Open the app</Button>
      </section>;
    case 'zen-os':
      return <section className={panel + ' p-5'}><h2>ZEN_OS</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">{project.approach.map(item =>
          <p key={item} className="rounded bg-tint p-3 text-sm">{item}</p>)}</div></section>;
    default: return null;
  }
}

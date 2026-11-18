import { useState, type ReactNode } from 'react';
import type { Block, Tone } from '../../data/deep';
import { label, panel } from '../ui';
import { accents } from './Panels';

const colors: Record<Tone, string> = { primary: 'var(--color-primary)', coral: 'var(--color-coral)', teal: 'var(--color-teal)', neutral: 'var(--color-muted)' };
const rule = 'var(--color-line)';
const muted = 'var(--color-muted)';
const text = 'var(--color-ink)';
const scale = (value: number, from: number, to: number, start: number, end: number) => start + (value - from) / (to - from) * (end - start);

function Chart({ title, headers, rows, children, caption }: {
  title: string; headers: string[]; rows: (string | number)[][]; children: ReactNode; caption?: string;
}) {
  return <figure className={panel + ' min-w-0 space-y-3 p-3 sm:p-4'}>
    <figcaption className="font-heading text-xl">{title}</figcaption>
    {children}
    <div className="sr-only"><table>
      <caption>{title} · chart data</caption><thead><tr>{headers.map(header => <th key={header} scope="col">{header}</th>)}</tr></thead>
      <tbody>{rows.map((row, index) => <tr key={index}><th scope="row">{row[0]}</th>
        {row.slice(1).map((value, column) => <td key={column}>{value}</td>)}</tr>)}</tbody>
    </table></div>
    {caption && <p className="text-xs text-muted">{caption}</p>}
  </figure>;
}

function Graphic({ title, height, children, compact }: {title: string; height: number; children: ReactNode; compact?: boolean}) {
  return <svg role="img" aria-label={title} viewBox={`0 0 420 ${height}`} className={'block h-auto w-full font-mono ' + (compact ? 'mx-auto max-w-3xl' : '')} fontSize="14">{children}</svg>;
}

export function XYPlot({ kind, title, xLabel, yLabel, xTicks, yTicks, points, caption, zone }: Extract<Block, {kind: 'scatter' | 'line'}>) {
  const x = (value: number) => scale(value, xTicks[0], xTicks[xTicks.length - 1], 60, 390);
  const y = (value: number) => scale(value, yTicks[0], yTicks[yTicks.length - 1], 224, 28);
  const plotted = points.map(point => ({...point, px: x(point.x), py: y(point.y)}));
  return <Chart title={title} headers={['Series', xLabel, yLabel, 'Notes']} rows={points.map(p => [p.label, p.x, p.y, p.note ?? ''])} caption={caption}>
    <Graphic title={`${title}. ${yLabel} against ${xLabel}. See the accompanying data table.`} height={286}>
      {zone && <rect x={60} y={28} width={x(zone.maxX) - 60} height={y(zone.minY) - 28} fill="var(--color-teal)" opacity=".12" />}
      {xTicks.map(tick => <g key={tick}><path d={`M${x(tick)} 28V224`} stroke={rule} /><text x={x(tick)} y="245" textAnchor="middle" fill={muted}>{tick}</text></g>)}
      {yTicks.map(tick => <g key={tick}><path d={`M60 ${y(tick)}H390`} stroke={rule} /><text x="51" y={y(tick) + 5} textAnchor="end" fill={muted}>{tick}</text></g>)}
      <path d="M60 28V224H390" fill="none" stroke={muted} />
      <text x="60" y="16" fill={text}>{yLabel}</text><text x="225" y="270" textAnchor="middle" fill={text}>{xLabel}</text>
      {kind === 'line' && <polyline points={plotted.map(p => `${p.px},${p.py}`).join(' ')} fill="none" stroke={colors.primary} strokeWidth="2.5" />}
      {plotted.map(point => <g key={point.label}>
        <circle cx={point.px} cy={point.py} r="5.5" fill={colors[point.tone ?? 'primary']} />
        <text x={point.px + (point.px > 315 ? -8 : 8)} y={Math.max(23, point.py - (point.tone === 'coral' ? 16 : 9))} textAnchor={point.px > 315 ? 'end' : 'start'} fill={text}>
          {kind === 'line' ? `${point.y}% · ${point.note}` : point.label}
        </text>
      </g>)}
    </Graphic>
  </Chart>;
}

export function PhaseCards({ phases, models }: Pick<Extract<Block, {kind: 'gauge'}>, 'phases' | 'models'>) {
  const [selected, setSelected] = useState(models.length - 1);
  const max = Math.max(...phases.flatMap(phase => phase.values));
  return <div className="space-y-3">
    <label className="flex w-fit flex-wrap items-center gap-2 text-sm font-semibold">Phase medians
      <select value={selected} onChange={event => setSelected(Number(event.target.value))} className="rounded border border-line bg-card px-2 py-1 text-ink">
        {models.map((model, index) => <option key={model} value={index}>{model}</option>)}
      </select></label>
    <Chart title={models[selected] + ' · error by phase'} headers={['Phase', 'Median (px)', 'Joint errors']}
      rows={phases.map(phase => [phase.label, phase.values[selected].toFixed(2), phase.n])}>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-5">{phases.map((phase, index) => {
        const value = phase.values[selected];
        const tone = index >= phases.length - 2 ? 'coral' : 'teal';
        return <li key={phase.label} className="space-y-1 rounded bg-tint p-2">
          <span className="block text-xs text-muted">{phase.label}</span><strong className={accents[tone] + ' font-heading text-xl'}>{value.toFixed(2)} px</strong>
          <svg role="img" aria-label={`${phase.label}: ${value.toFixed(2)} pixels`} viewBox="0 0 100 8" preserveAspectRatio="none" className="block h-1.5 w-full overflow-hidden rounded-full">
            <rect width="100" height="8" fill={rule} /><rect width={value / max * 100} height="8" fill={colors[tone]} />
          </svg>
          <span className="block font-mono text-xs text-muted">n = {phase.n}</span>
        </li>;
      })}</ul>
    </Chart>
  </div>;
}

export function AnnotatedGauge({ title, max, zone, markers, reference, gapTo, phases, models, caption }: Extract<Block, {kind: 'gauge'}>) {
  const x = (value: number) => scale(value, 0, max, 24, 398);
  const ticks = Array.from({length: 5}, (_, index) => max * index / 4);
  return <div className="space-y-4">
    <Chart title={title} headers={['Landmark', 'Error (px)']}
      rows={[[reference.label, reference.value], ['Synthetic requirement', zone], ['Gap to best model', gapTo - zone], ...markers.map(marker => [marker.label, marker.value])]}>
      <Graphic title={`${title}. Synthetic requirement, human reference, and model errors in pixels.`} height={182} compact>
        <rect x={24} y="24" width={x(zone) - 24} height="114" rx="3" fill={colors.teal} opacity=".15" />
        <path d={`M${x(reference.value)} 22V144`} stroke={colors.neutral} strokeDasharray="4 4" />
        <text x={x(reference.value) + 4} y="19" fill={muted}>Human {reference.value}</text>
        {markers.map((marker, index) => <g key={marker.label}>
          <circle cx={x(marker.value)} cy={48 + index * 26} r="5" fill={colors[marker.tone]} />
          <text x={x(marker.value) + 11} y={53 + index * 26} fill={text}>{marker.label} {marker.value}</text>
        </g>)}
        <path d={`M${x(zone)} 129V138H${x(gapTo)}V129M24 146H398`} fill="none" stroke={muted} />
        <text x="28" y="120" fill={colors.teal}>≈{zone} px</text>
        <text x={(x(gapTo) + x(zone))/2} y="129" textAnchor="middle" fill={text}>Gap</text>
        {ticks.map(tick => <g key={tick}><path d={`M${x(tick)} 146v6`} stroke={muted}/><text x={x(tick)} y="173" textAnchor="middle" fill={muted}>{tick}</text></g>)}
      </Graphic>
    </Chart>
    <PhaseCards phases={phases} models={models} /><p className="text-sm text-muted">{caption}</p>
  </div>;
}

export function DotScale({ title, ticks, band, unit, groups, references }: Extract<Block, {kind: 'dots'}>) {
  const x = (value: number) => scale(value, ticks[0], ticks[ticks.length - 1], 22, 396);
  const layout = groups.map((group, index) => ({...group, y: 55 + index * 40}));
  return <Chart title={title} headers={['Comparison', 'Source', unit]} rows={[
    ...groups.flatMap(group => group.values.map(point => [point.label, group.label, point.value.toFixed(3)])),
    ...references.map(point => [point.label, 'Noise-floor reference', point.value.toFixed(3)]),
    ['Noise-floor band', 'Lower to upper bound', band.map(value => value.toFixed(3)).join('–')],
  ]}>
    <Graphic title={`${title}. Map distances grouped by source. The table lists each comparison and noise-floor reference.`} height={250}>
      <rect x={x(band[0])} y="18" width={x(band[1]) - x(band[0])} height="192" fill={colors.teal} opacity=".15" />
      <text x={x(band[0])} y="15" fill={colors.teal}>Noise floor</text>
      {layout.map(group => <g key={group.label}>
        <path d={`M22 ${group.y}H396`} stroke={rule} />
        <text x="22" y={group.y - 10} fill={text}>{group.label}</text>
        {group.values.map((point, index) => <circle key={point.label} cx={x(point.value)} cy={group.y + (index % 2 ? 4 : 0)} r="4.7" fill={colors[point.tone]}><title>{point.label} · {point.value.toFixed(3)}</title></circle>)}
      </g>)}
      {references.map(point => <circle key={point.label} cx={x(point.value)} cy="198" r="4.5" fill={colors.teal}><title>{point.label} · {point.value.toFixed(3)}</title></circle>)}
      {ticks.map(tick => <text key={tick} x={x(tick)} y="232" textAnchor="middle" fill={muted}>{tick.toFixed(2)}</text>)}
    </Graphic>
    <details className="text-sm"><summary className="cursor-pointer text-primary">View comparisons</summary>
      <dl className="mt-2 grid gap-2">{[...groups, {label: 'Noise-floor references', values: references}].map(group => <div key={group.label}>
        <dt className="font-semibold">{group.label}</dt>
        {group.values.map(point => <dd key={point.label} className="grid grid-cols-[1fr_auto] gap-2 text-muted"><span>{point.label}</span><span>{point.value.toFixed(3)}</span></dd>)}
      </div>)}</dl>
    </details>
  </Chart>;
}

export function BarCompare({ title, unit, max, rows, caption }: Extract<Block, {kind: 'bars'}>) {
  return <Chart title={title} headers={['Source', 'Zero-shot ' + unit, 'After refit ' + unit, 'Rescued (%)']}
    rows={rows.map(row => [row.label, row.before, row.after, row.rescued])} caption={caption}>
    <p aria-hidden="true" className={label + ' flex flex-wrap gap-3'}>
      <span className="inline-flex items-center gap-1"><span className="size-2 rounded-sm bg-coral" />Zero-shot</span>
      <span className="inline-flex items-center gap-1"><span className="size-2 rounded-sm bg-teal" />After refit</span>
    </p>
    <Graphic title={`${title}. Paired before and after values with rescued percentages.`} height={rows.length * 80}>
      {rows.map((row, index) => <g key={row.label} transform={`translate(0 ${index * 80})`}>
        <text x="10" y="16" fill={text}>{row.label}</text>
        {[row.before, row.after].map((value, series) => <g key={series} transform={`translate(10 ${25 + series * 22})`}>
          <rect width={value / max * 285} height="14" rx="3" fill={series ? colors.teal : colors.coral} />
          <text x={value / max * 285 + 6} y="12" fill={text}>{value}{unit}</text>
        </g>)}
        <text x="409" y="60" textAnchor="end" fill={muted}>{row.rescued}% rescued</text>
      </g>)}
    </Graphic>
  </Chart>;
}

export function HeatmapGrid({ title, headers, rows, highlight, caption }: Extract<Block, {kind: 'heatmap'}>) {
  return <Chart title={title} headers={['Break size', ...headers.map(value => `σ = ${value} px`)]}
    rows={rows.map(row => [row.label, ...row.values.map(value => value + '%')])} caption={caption}>
    <Graphic title={`${title}. Detection rates by break size and noise; the highlighted column is σ = ${highlight} px.`} height={45 + rows.length * 34}>
      {headers.map((value, index) => <text key={value} x={88 + index * 58} y="23" textAnchor="middle" fill={muted}>{value} px</text>)}
      {rows.map((row, index) => <g key={row.label} transform={`translate(0 ${36 + index * 34})`}>
        <text x="5" y="20" fill={text}>{row.label}</text>
        {row.values.map((value, column) => <g key={column} transform={`translate(${60 + column * 58} 0)`}>
          <rect width="55" height="31" rx="3" fill={colors.teal} fillOpacity={.08 + value / 260} stroke={headers[column] === highlight ? colors.primary : rule} strokeWidth={headers[column] === highlight ? 2 : 1}/>
          <text x="28" y="20" textAnchor="middle" fill={text}>{value}%</text>
        </g>)}
      </g>)}
    </Graphic>
  </Chart>;
}

export function RangeBars({ title, max, rows, caption }: Extract<Block, {kind: 'ranges'}>) {
  return <Chart title={title} headers={['Joint or subset', 'Lower (px)', 'Upper (px)', 'Notes']}
    rows={rows.map(row => [row.label, row.low, row.high, row.note ?? ''])} caption={caption}>
    <Graphic title={`${title}. Observed agreement in pixels, with ranges where supplied.`} height={rows.length * 58}>
      {rows.map((row, index) => {
        const x = (value: number) => 10 + 309 * value / max;
        const isRange = row.low !== row.high;
        return <g key={row.label} transform={`translate(0 ${index * 58})`}>
          <text x="10" y="16" fill={text}>{row.label}</text>
          <rect x="10" y="25" width="309" height="9" rx="4" fill={rule} />
          <rect x="10" y="25" width={x(row.low) - 10} height="9" rx="4" fill={colors.teal} />
          {isRange && <rect x={x(row.low)} y="25" width={x(row.high) - x(row.low)} height="9" fill={colors.coral} />}
          <text x="410" y="34" textAnchor="end" fill={text}>{isRange ? row.low + '–' + row.high : row.low} px</text>
        </g>;
      })}
    </Graphic>
  </Chart>;
}

export function ContainmentGrid({ title, profiles, rows }: Extract<Block, {kind: 'containment'}>) {
  return <Chart title={title} headers={['Topology', ...profiles]}
    rows={rows.map(row => [row.label, ...row.cells.map(cell => `${cell.reward.toFixed(1)} reward / ${cell.containment}% contained`)])}
    caption="Cells show reward. Teal and ✓ indicate 100% containment. Coral and × indicate 0%.">
    <Graphic title={`${title}: rewards and containment by topology and attacker profile`} height={269}>
      {profiles.map((profile, column) => <text key={profile} x={128 + column * 80} y="20" textAnchor="middle" fontSize="11" fill={muted}>
        <tspan x={128 + column * 80}>{profile.replace(' (unseen)', '')}</tspan>
        {profile.includes('unseen') && <tspan x={128 + column * 80} dy="15">unseen</tspan>}
      </text>)}
      {rows.map((row, index) => <g key={row.label} transform={`translate(0 ${48 + index * 42})`}>
        <text x="3" y="17" fontSize="12" fill={text}>{row.label.split(' ')[0]}</text>
        {row.label.includes('unseen') && <text x="3" y="32" fontSize="11" fill={muted}>unseen</text>}
        {row.cells.map((cell, column) => <g key={column} transform={`translate(${90 + column * 80} 0)`}>
          <rect width="76" height="38" rx="4" fill={cell.containment ? colors.teal : colors.coral} opacity=".18" />
          <text x="38" y="16" textAnchor="middle" fill={text} fontSize="12">{cell.reward.toFixed(1)}</text>
          <text x="38" y="31" textAnchor="middle" fill={text} fontSize="11">{cell.containment ? '✓' : '×'} {cell.containment}%</text>
        </g>)}
      </g>)}
    </Graphic>
  </Chart>;
}

export function RewardWhiskers({ title, rows }: Extract<Block, {kind: 'whiskers'}>) {
  const ticks = [-250, -100, 0, 100, 200, 300];
  const x = (value: number) => scale(value, ticks[0], ticks[ticks.length - 1], 93, 394);
  return <Chart title={title} headers={['Topology', 'Baseline mean', 'Baseline std', 'Domain-randomised mean', 'Domain-randomised std']}
    rows={rows.map(row => [row.label, row.baseline.mean.toFixed(1), row.baseline.std.toFixed(1), row.randomised.mean.toFixed(1), row.randomised.std.toFixed(1)])}
    caption="Points show mean reward. Whiskers extend one standard deviation on either side.">
    <Graphic title={`${title}: baseline and domain-randomised mean rewards with standard-deviation whiskers`} height={285}>
      {ticks.map(tick => <g key={tick}><path d={`M${x(tick)} 39V243`} stroke={rule} />
        <text x={x(tick)} y="265" textAnchor="middle" fontSize="12" fill={muted}>{tick}</text>
      </g>)}
      <circle cx="12" cy="15" r="4" fill={colors.coral} /><text x="23" y="19" fontSize="12" fill={text}>Baseline</text>
      <circle cx="122" cy="15" r="4" fill={colors.teal} /><text x="133" y="19" fontSize="12" fill={text}>Domain-randomised</text>
      {rows.map((row, index) => <g key={row.label} transform={`translate(0 ${51 + index * 40})`}>
        <text x="3" y="7" fontSize="12" fill={text}>{row.label.split(' ')[0]}</text>
        {row.label.includes('unseen') && <text x="3" y="22" fontSize="11" fill={muted}>unseen</text>}
        {[row.baseline, row.randomised].map(({mean, std}, series) => {
          const y = 2 + series * 13;
          const low = x(mean - std);
          const high = x(mean + std);
          const color = series ? colors.teal : colors.coral;
          return <g key={series}><path d={`M${low} ${y - 4}v8 M${low} ${y}H${high} M${high} ${y - 4}v8`} fill="none" stroke={color} strokeWidth="1.5" />
            <circle cx={x(mean)} cy={y} r="4" fill={color} />
          </g>;
        })}
      </g>)}
    </Graphic>
  </Chart>;
}

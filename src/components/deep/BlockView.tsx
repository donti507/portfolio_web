import type { Block } from '../../data/deep';
import type { ProjectDetail } from '../../data/projects';
import { AnnotatedGauge, BarCompare, DotScale, HeatmapGrid, ContainmentGrid, RewardWhiskers, RangeBars, XYPlot } from './Charts';
import { BenchmarkTable, BeforeAfterCode, BrowserShowcase, ChatMock, EquationCard, Funnel, FeatureTiles, InsightCards, LimitsList, PipelineDiagram, ScoreTable, StatusGrid, StepCards, TerminalBlock, TimelineBand } from './Panels';
import { Figure, Tags, label } from '../ui';

export function BlockView({ block, project }: {block: Block; project: ProjectDetail}) {
  switch (block.kind) {
    case 'table': return <BenchmarkTable {...block} />;
    case 'heatmap': return <HeatmapGrid {...block} />;
    case 'containment': return <ContainmentGrid {...block} />;
    case 'whiskers': return <RewardWhiskers {...block} />;
    case 'gauge': return <AnnotatedGauge {...block} />;
    case 'scatter':
    case 'line': return <XYPlot {...block} />;
    case 'dots': return <DotScale {...block} />;
    case 'ranges': return <RangeBars {...block} />;
    case 'bars': return <BarCompare {...block} />;
    case 'status': return <StatusGrid {...block} />;
    case 'funnel': return <Funnel {...block} />;
    case 'scores': return <ScoreTable {...block} />;
    case 'flow': return <PipelineDiagram {...block} />;
    case 'timeline': return <TimelineBand {...block} />;
    case 'browser': return <BrowserShowcase {...block} />;
    case 'chat': return <ChatMock {...block} />;
    case 'equation': return <EquationCard {...block} />;
    case 'terminal': return <TerminalBlock {...block} />;
    case 'beforeAfter': return <BeforeAfterCode {...block} />;
    case 'text': return <p className="text-sm text-muted">{block.text}</p>;
    case 'figure': {
      const figure = project.figures?.[block.index];
      return figure ? <Figure figure={figure} /> : null;
    }
    case 'steps':
    case 'limits':
    case 'notes':
    case 'features': return <div className="space-y-2">
      {block.title && <h3 className="text-xl">{block.title}</h3>}
      {block.kind === 'steps' ? <StepCards items={block.items} /> : block.kind === 'limits' ?
        <LimitsList items={block.items} /> : block.kind === 'features' ? <FeatureTiles items={block.items} /> : <InsightCards items={block.items} />}
    </div>;
    case 'tags':
    case 'list': return <div className="space-y-2">
      {block.title && <p className={label}>{block.title}</p>}
      {block.kind === 'tags' ? <Tags values={block.items} /> : <ol className="list-decimal space-y-2 pl-6">{block.items.map(item => <li key={item}>{item}</li>)}</ol>}
    </div>;
  }
}

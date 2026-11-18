export type Tone = 'primary' | 'coral' | 'teal' | 'neutral';
export type IconName = 'target' | 'activity' | 'layers' | 'cpu' | 'shield' | 'clock' | 'spark' | 'files';
export type Metric = {label: string; value: string; caption: string; chip?: string; tone: Tone; icon: IconName};
export type Note = {title: string; body: string; tone?: Tone};
export type Step = Note & {tools?: string[]};
export type Row = {cells: (string | number)[]; tone?: 'best' | 'reference' | 'bound'};
export type Point = {label: string; x: number; y: number; note?: string; tone?: Tone};
export type Marker = {label: string; value: number; tone: Tone};
export type SectionKey = 'question' | 'why' | 'approach' | 'findings' | 'limits' | 'reproduce' | 'next';

export type Block =
  | {kind: 'table'; title: string; headers: string[]; rows: Row[]; caption?: string}
  | {kind: 'heatmap'; title: string; headers: number[]; rows: {label: string; values: number[]}[]; highlight: number; caption: string}
  | {kind: 'notes' | 'features' | 'limits' | 'steps'; title?: string; items: Step[]}
  | {kind: 'list' | 'tags'; title?: string; items: string[]}
  | {kind: 'text'; text: string}
  | {kind: 'equation'; title: string; equations: string[]; text: string}
  | {kind: 'terminal'; file: string; code: string}
  | {kind: 'beforeAfter'; title: string; before: string; after: string; file: string}
  | {kind: 'gauge'; title: string; max: number; zone: number; markers: Marker[]; reference: Marker; gapTo: number; phases: {label: string; values: number[]; n: number}[]; models: string[]; caption: string}
  | {kind: 'scatter' | 'line'; title: string; xLabel: string; yLabel: string; xTicks: number[]; yTicks: number[]; points: Point[]; caption?: string; zone?: {maxX: number; minY: number}}
  | {kind: 'dots'; title: string; unit: string; ticks: number[]; band: [number, number]; groups: {label: string; values: Marker[]}[]; references: Marker[]}
  | {kind: 'bars'; title: string; unit: string; max: number; rows: {label: string; before: number; after: number; rescued: number}[]; caption: string}
  | {kind: 'status'; title: string; note: string; complete: number; failed: number; caption: string}
  | {kind: 'funnel'; title: string; stages: {value: string; label: string; note?: string}[]}
  | {kind: 'scores'; title: string; items: {id: string; title: string; detail: string; status: 'Supported' | 'Not supported' | 'Descriptive'}[]}
  | {kind: 'flow'; title: string; stages: string[]; branches?: string[]; examples?: string[]}
  | {kind: 'timeline'; title: string; anchor: string; stages: Note[]}
  | {kind: 'figure'; index: number}
  | {kind: 'browser'; title: string; url?: string; pages: {label: string; href: string; image?: string; width?: number; height?: number}[]; callouts: string[]}
  | {kind: 'chat'; title: string; lanes: string[]; user: string; action: string; voice: string};
export type DeepSection = {id: string; title: string; blocks: Block[]; base?: SectionKey[]};
export type DeepProject = {
  badges?: string[];
  metrics: Metric[];
  artifact?: {title: string; eyebrow: string; blocks: Block[]; split?: boolean};
  sections: DeepSection[];
  provenance?: string;
  dossier?: {venue?: string; equipment?: string; datasets?: string[]; stack?: string[]};
};

export const deepProjects: Partial<Record<string, DeepProject>> = {};

deepProjects['physics-residual-aqa'] = {
  badges: ['ISRC 2026', 'Negative result, reported as such'],
  metrics: [
    {label: 'Precision needed', value: '≈3 px', caption: 'Per-coordinate noise in the synthetic experiment', chip: 'Synthetic requirement', tone: 'teal', icon: 'target'},
    {label: 'Best model median', value: '9.48 px', caption: 'NSAQA, fine-tuned on diving', chip: '3.2× the requirement', tone: 'primary', icon: 'activity'},
    {label: 'p90 after fine-tuning', value: '−57%', caption: 'Reduction relative to generic ViTPose', chip: '78.97 → 33.99 px', tone: 'coral', icon: 'spark'},
    {label: 'Human self-disagreement', value: '7.8 px', caption: 'Same annotator, relabelled footage', chip: '47 paired points, 6 frames', tone: 'neutral', icon: 'layers'},
  ],
  artifact: {title: 'Pose precision and the verification gap', eyebrow: 'Analytical gauge', blocks: [{
    kind: 'gauge', title: 'Synthetic requirement and observed errors', max: 20, zone: 3,
    markers: [{label: 'ViTPose', value: 9.87, tone: 'primary'}, {label: 'RTMPose', value: 10.29, tone: 'neutral'}, {label: 'NSAQA', value: 9.48, tone: 'coral'}],
    reference: {label: 'Human self-disagreement', value: 7.8, tone: 'neutral'}, gapTo: 9.48,
    models: ['ViTPose', 'RTMPose', 'NSAQA'],
    phases: [
      {label: 'Takeoff', values: [7.86, 8.05, 7.73], n: 111}, {label: 'Early', values: [7.87, 8.71, 8.04], n: 100},
      {label: 'Peak', values: [10.38, 10.41, 8.74], n: 79}, {label: 'Rotation 1', values: [14.14, 14.57, 11.85], n: 115},
      {label: 'Rotation 2', values: [17.24, 22.06, 18.50], n: 35},
    ],
    caption: 'Error is worst exactly where the physics check is needed.',
  }]},
  sections: [
    {id: 'question', title: 'The question', base: ['question'], blocks: [
      {kind: 'equation', title: 'Invariant conservation bounds', equations: ['y(t) = y₀ + v₀t − ½gt²', 'dL/dt = 0'],
        text: 'Exact under the stated assumptions; monocular centre-of-mass and inertia estimates are approximations, so a violation implicates the pose/camera/measurement model, not the athlete.'},
    ]},
    {id: 'importance', title: 'Why it matters', base: ['why'], blocks: []},
    {id: 'approach', title: 'What I did', blocks: [{kind: 'steps', items: [
      {title: 'Clip extraction', tools: ['ffmpeg', 'MTL-AQA annotations'], body: 'Cut dive clips from broadcast video using MTL-AQA annotations.'},
      {title: 'Hand labelling', tools: ['Manual'], body: 'Labelled 160 frames across takeoff, early flight, peak, two rotation phases and entry; 81 had a labelled shoulder and hip.'},
      {title: 'Synthetic requirement', tools: ['NumPy', 'Seeded'], body: '6 noise levels × 4 break sizes × 100 trials on a 100 px torso.'},
      {title: 'Benchmark and residuals', tools: ['ViTPose', 'RTMPose', 'NSAQA'], body: 'Compared per-joint error against the hand labels phase by phase and against the synthetic threshold.'},
    ]}]},
    {id: 'findings', title: 'What I found', blocks: [
      {kind: 'heatmap', title: 'Synthetic detection rates', headers: [1, 2, 3, 5, 8, 10], highlight: 3,
        rows: [
          {label: '5%', values: [84, 30, 15, 10, 4, 4]}, {label: '10%', values: [100, 85, 46, 17, 11, 10]},
          {label: '20%', values: [100, 100, 98, 57, 24, 15]}, {label: '40%', values: [100, 100, 100, 100, 70, 51]},
        ], caption: 'Known-frame detection. 100 seeded trials per cell.'},
      {kind: 'table', title: 'Pose benchmark', headers: ['Model', 'Median (px)', 'p90 (px)', 'Gross failures (%)', 'Missed (%)'],
        rows: [
          {cells: ['ViTPose (generic)', '9.87', '78.97', '14.2', '7.9']},
          {cells: ['RTMPose (generic)', '10.29', '69.91', '12.1', '7.9']},
          {cells: ['NSAQA (diving-finetuned)', '9.48', '33.99', '8.4', '7.9'], tone: 'best'},
          {cells: ['Human self-disagreement', '7.8', '—', '—', '—'], tone: 'reference'},
          {cells: ['Synthetic requirement', '≈3', '—', '—', '—'], tone: 'bound'},
        ], caption: '440 measured errors from 478 visible joint labels per model. A gross failure places a joint more than half a hand-labelled torso away. Synthetic noise is per-coordinate and model errors are Euclidean. The comparison is indicative.'},
      {kind: 'notes', items: [
        {title: 'Tail collapse', body: 'Fine-tuning cut p90 by 57% (78.97 → 33.99 px) and gross failures from 14.2% to 8.4%.', tone: 'teal'},
        {title: 'Median floor', body: 'The median barely moved (9.87 → 9.48 px).'},
        {title: 'Verification gap', body: 'The best median is about 3.2× the ≈3 px requirement.', tone: 'coral'},
      ]},
      {kind: 'table', title: 'Human consistency by joint', headers: ['Measure', 'Observed'],
        rows: [{cells: ['Overall', '7.8 px']}, {cells: ['Excluding probable left/right swaps', '6.5 px']},
          {cells: ['Hips', '20–22 px (worst)']}, {cells: ['Shoulders, elbows, wrists and ankles', '7–10 px']}, {cells: ['Head', 'About 5 px']}, {cells: ['Visibility agreement', '99%']}]},
      {kind: 'figure', index: 0}, {kind: 'figure', index: 1},
    ]},
    {id: 'limits', title: 'What this does not show', blocks: [{kind: 'limits', items: [
      {title: 'Single frames', body: 'Temporal filtering might close part of the gap or suppress the signal. It was untested.'},
      {title: 'Entry unmeasured', body: '0 of 20 entry frames had a labellable torso.'},
      {title: 'Head excluded', body: 'The label sets use different head definitions.'},
      {title: 'Monocular projection', body: 'Camera motion, segment-mass approximations and out-of-plane motion limit interpretation.'},
      {title: 'No scoring claim', body: 'These experiments do not establish that residuals predict judges’ scores.'},
    ]}]},
    {id: 'reproduce', title: 'Reproduce it', blocks: [{kind: 'terminal', file: 'Terminal', code: [
      'git clone https://github.com/donti507/physics-residual-aqa.git',
      'cd physics-residual-aqa',
      'python -m venv .venv',
      '. .venv/bin/activate',
      'python -m pip install numpy matplotlib',
      'python src/summarize_results.py',
      'python src/make_figures.py --results results',
    ].join('\n')}]},
    {id: 'next', title: 'What’s next', base: ['next'], blocks: []},
  ],
  provenance: 'Frames from MTL-AQA broadcast diving clips. 160 hand-labelled PNGs; 81 had a labelled shoulder and hip; 478 visible joint labels per model.',
  dossier: {venue: 'ISRC 2026, Dhaka University Research Society (Dec 2026)', datasets: ['MTL-AQA clips'],
    stack: ['Python', 'NumPy', 'SciPy', 'ffmpeg', 'Matplotlib', 'ViTPose', 'RTMPose', 'NSAQA']},
};

// src/data/projects.ts
// Single source of truth for the Projects grid and every project sub-page.
// Numbers come from the public repos (github.com/donti507/*) as of 17 Nov 2026.
// Entries marked `verify: true` were carried over from the old site and have NOT been checked.

export type ProjectTier = 'research' | 'software' | 'engineering';
export type ProjectStatus = 'Preprint' | 'Accepted (IEEE ICCIT 2026, oral)' | 'Accepted talk' | 'Ongoing' | 'Pre-analysis' | 'Under audit' | 'Live' | 'Completed';

export interface Stat { value: string; label: string; }
export interface Figure { src: string; alt: string; caption: string; }
export interface LinkItem { label: string; href: string; kind: 'code' | 'paper' | 'prereg' | 'demo' | 'data'; }

export interface ProjectDetail {
  slug: string;
  title: string;
  shortTitle: string;
  tier: ProjectTier;
  tags: string[];                 // filter chips
  dates: string;
  status: ProjectStatus;
  role: string;
  collaborators?: string;
  oneLiner: string;               // card + hero subtitle
  question: string;               // "The question"
  why: string;                    // "Why it matters"
  approach: string[];             // "What I did" (max 4)
  findings: string[];             // "What I found" (max 4)
  limits: string[];               // "What this does not show"
  stats: Stat[];                  // 3-4 tiles
  figures?: Figure[];
  stack: string[];
  links: LinkItem[];
  reproduce?: string;             // shell snippet
  next?: string;
  featured?: boolean;
  verify?: boolean;
}

export const projects: ProjectDetail[] = [
  {
    slug: 'cyber-defense-generalization',
    title: 'Do AI cyber defenders generalise, or just memorise their training network?',
    shortTitle: 'Cyber-defense generalisation',
    tier: 'research',
    tags: ['RL', 'Security', 'Generalisation'],
    dates: '2026',
    status: 'Accepted (IEEE ICCIT 2026, oral)',
    role: 'First author, with N. T. Nabila (Comilla University)',
    collaborators: 'N. T. Nabila (Comilla University)',
    oneLiner: 'Randomising the training networks taught the defenders to protect networks they had never seen, but not to stop an attack they had never seen.',
    question: 'Most multi-agent RL cyber defenders are trained and tested on one fixed network against one fixed attacker. Do they learn to defend, or do they memorise that one scenario?',
    why: 'A defender that only works on its training network is useless the day the network changes. Testing unseen networks and unseen attacks separately shows which kind of generalisation is real.',
    approach: [
      'A Detector flags nodes and a Responder re-images them. Both trained with Independent PPO in Microsoft’s CyberBattleSim in 50-step episodes.',
      'Each training episode samples a random tree of 7–10 nodes and an aggressive, stealthy or opportunistic scripted attacker.',
      'The matched baseline trains the same pair on a fixed, hand-built 7-node network.',
      'Held-out tests use topo_4, topo_5 and a cloud-pivot mechanism, with 3 training seeds and 20 deterministic episodes per test cell.',
    ],
    findings: [
      'Domain-randomised defenders contained 100% of attacks from seen profiles on both unseen test networks.',
      'The baseline varied widely across seeds. Its positive topo_2 result in the single-seed matrix did not carry over across seeds.',
      'Against the held-out cloud-pivot mechanism, both defenders scored −107.0 with 0% containment. Topology and behaviour randomisation did not confer robustness to this new attack type.',
    ],
    limits: ['Small simulated networks of 7–10 nodes.', 'Scripted attackers.', 'One held-out attack mechanism.', 'Three training seeds.'],
    stats: [
      {value: '100%', label: 'containment on seen profiles with randomisation'},
      {value: '0%', label: 'containment on the held-out attack'},
      {value: '172.7', label: 'baseline reward std across seeds on topo_3'},
      {value: '3', label: 'training seeds · 20 episodes per test cell'},
    ],
    figures: [
      {src: 'projects/cyber-defense-generalization/architecture_diagram.png', alt: 'Detector and Responder architecture in the simulation', caption: 'The Detector flags nodes and the Responder re-images flagged nodes in CyberBattleSim.'},
      {src: 'projects/cyber-defense-generalization/multiseed_chart.png', alt: 'Published figure comparing baseline and domain-randomised rewards across training seeds', caption: 'Source figure for the aggressive-attacker evaluation across three training seeds.'},
    ],
    stack: ['Python', 'PyTorch', 'Stable-Baselines3 (PPO)', 'Gymnasium', 'CyberBattleSim', 'pytest'],
    links: [{label: 'Code', href: 'https://github.com/donti507/domain-randomized-ippo-cyber-defense', kind: 'code'}],
    reproduce: 'pip install -r requirements.txt && pip install -e .\npytest -q\npython scripts/train.py --method dr --seeds 0 1 2\npython scripts/evaluate.py --mode multiseed',
    next: 'Test against adaptive attackers and larger networks, and add attack-mechanism randomisation to target the cloud-pivot failure.',
    featured: true,
  },
  {
    slug: 'fly-connectome',
    title: 'Reconstruction differences rival individual differences in the fly compass connectome',
    shortTitle: 'Fly compass connectome',
    tier: 'research',
    tags: ['NeuroAI', 'Connectomics'],
    dates: 'Sep 2026',
    status: 'Preprint',
    role: 'First author: study design, comparison pipeline, model co-development',
    collaborators: 'N. T. Nabila (Comilla University), who led the statistics',
    oneLiner: 'When two maps of the same fly brain disagree, is that biology or the mapping? Often the mapping, and trained models notice.',
    question:
      'Connectome-constrained models are built from synapse-level wiring diagrams. The same fly circuit now exists in several reconstructions. How much of the difference between them is real individuality, and how much comes from how the data were processed?',
    why:
      'If processing choices move the wiring as much as real biology does, conclusions drawn from one reconstruction may not hold in another, and models trained on one may quietly fail on the next.',
    approach: [
      'Collected nine versions of the Drosophila head-direction (compass) circuit: four flies (male CNS, hemibrain, FlyWire, BANC) and five versions of the same fly that differ only in synapse filtering, proofreading or synapse detector.',
      'Matched neurons across reconstructions by their wiring, checked the matches against anatomical labels, and put every difference on one scale using four distance measures.',
      'Trained recurrent networks on each wiring to hold a cued heading, then moved them between wirings and tried to repair them by refitting about 30 cell-type gains.',
      'Compared with calcium imaging from real flies (DANDI 000289) to see how the biological compass behaves in darkness.',
    ],
    findings: [
      'Changing only the synapse detector within one fly moved the circuit more than halfway to the smallest difference between two flies.',
      'Trained networks formed near-perfect ring attractors (0.3–1.6° error on their own wiring), but a 1% change to all weights pushed error to 10–28°.',
      'No network transferred to another reconstruction, even of the same fly. Adding back only the weakest ~4% of synapses raised error to 13–74°.',
      'Real fly compasses drift gradually in darkness and work despite wiring differences of the size that broke the models.',
    ],
    limits: [
      'One circuit, four flies, one model class.',
      'Not yet peer-reviewed.',
      'Some preregistered predictions failed; they are reported in the paper, not hidden.',
    ],
    stats: [
      { value: '9', label: 'wiring versions compared' },
      { value: '0.3–1.6°', label: 'error on own wiring' },
      { value: '10–28°', label: 'error after a 1% weight change' },
      { value: '433', label: 'neurons in the circuit' },
    ],
    figures: [
      { src: 'projects/fly-connectome/fig2.png', alt: 'Measurement and individual differences on one scale', caption: 'Reconstruction differences and between-fly differences, on one scale.' },
      { src: 'projects/fly-connectome/fig3.png', alt: 'Ring attractors and their fragility', caption: 'Trained networks are near-perfect ring attractors that break under a 1% perturbation.' },
      { src: 'projects/fly-connectome/fig4.png', alt: 'Transplants and the precision–robustness trade-off', caption: 'Moving a network to another reconstruction, and what noise training buys.' },
    ],
    stack: ['Python', 'PyTorch', 'NumPy', 'SciPy', 'ripser', 'neuPrint', 'FlyWire Codex', 'DANDI'],
    links: [
      { label: 'arXiv:2610.29205', href: 'https://arxiv.org/abs/2610.29205', kind: 'paper' },
      { label: 'Preregistration', href: 'https://doi.org/10.5281/zenodo.23382486', kind: 'prereg' },
      { label: 'Code and networks', href: 'https://github.com/donti507/chessfly', kind: 'code' },
      { label: 'ConnectomeTwin demo', href: 'https://donti507.github.io/connectometwin/', kind: 'demo' },
    ],
    reproduce:
      'git clone https://github.com/donti507/chessfly.git\ncd chessfly/new_study\npip install numpy scipy pandas matplotlib torch ripser\nunzip -oq networks/hd_networks_all.zip -d .\nPYTHONPATH=code python code/distance_decomposition.py',
    next: 'Extend to other circuits and model classes, and test whether wiring-distance predicts transfer failure before training.',
    featured: true,
  },
  {
    slug: 'physics-residual-aqa',
    title: 'Physics residuals for diving: a pose-precision limit',
    shortTitle: 'Physics-residual diving AQA',
    tier: 'research',
    tags: ['Computer Vision', 'Physics-informed ML'],
    dates: 'Nov 2026',
    status: 'Accepted talk',
    role: 'First author, with N. T. Nabila (Comilla University)',
    collaborators: 'N. T. Nabila',
    oneLiner: 'Can conservation of angular momentum judge a dive from TV footage? Not yet. Here is exactly how far off the pose models are.',
    question:
      'In the air, a diver’s angular momentum is conserved. A break in that should flag a pose or execution problem without any labels. How precise must monocular pose be before this check works, and are current models that precise?',
    why:
      'Label-free, physics-based checks are attractive for sports judging and motion analysis. Knowing the precision they need tells you whether to build them now or improve pose first.',
    approach: [
      'Ran a seeded synthetic study: 6 noise levels × 4 break sizes × 100 trials, on a 100 px torso.',
      'Hand-labelled 160 broadcast frames from MTL-AQA clips (81 analysable, 478 visible joint labels).',
      'Benchmarked ViTPose, RTMPose and diving-finetuned NSAQA against those labels, phase by phase.',
      'Relabelled frames blind to the first round to measure my own consistency.',
    ],
    findings: [
      'Reliable detection of larger breaks needs about 3 px precision.',
      'The best model reaches a 9.5 px median, and error roughly doubles during rotation, the phase where the check is needed.',
      'Diving fine-tuning cut p90 error by 57% (79 → 34 px) and gross failures from 14.2% to 8.4%, but barely moved the median.',
      'Human self-disagreement was 7.8 px, so much of the limit sits in the footage itself.',
    ],
    limits: [
      'Single frames only, with no temporal filtering, which might close part of the gap.',
      'Entry frames could not be measured (0 of 20 had a labellable torso).',
      'The synthetic noise and the measured Euclidean errors are not identical metrics, so the comparison is indicative.',
    ],
    stats: [
      { value: '≈3 px', label: 'precision needed' },
      { value: '9.5 px', label: 'best model median' },
      { value: '−57%', label: 'p90 error after fine-tuning' },
      { value: '7.8 px', label: 'human self-disagreement' },
    ],
    figures: [
      { src: 'projects/physics-residual-aqa/figure_1_requirement.png', alt: 'Detection rate by break size and noise', caption: 'What the physics check needs.' },
      { src: 'projects/physics-residual-aqa/figure_2_reality.png', alt: 'Pose error by dive phase', caption: 'What pose models deliver, phase by phase.' },
    ],
    stack: ['Python', 'NumPy', 'SciPy', 'ffmpeg', 'Matplotlib', 'ViTPose', 'RTMPose'],
    links: [{ label: 'Code and results', href: 'https://github.com/donti507/physics-residual-aqa', kind: 'code' }],
    next: 'Test temporal smoothing and multi-view footage; presenting at ISRC 2026 (Dhaka University Research Society, Dec 2026).',
    featured: true,
  },
  {
    slug: 'trust-but-verify',
    title: 'Trust but Verify: checking LLM-extracted interest-rate-swap terms',
    shortTitle: 'Trust but Verify',
    tier: 'research',
    tags: ['LLMs', 'Finance', 'Reliability'],
    dates: '2026 – present',
    status: 'Ongoing',
    role: 'Lead: design and engineering',
    oneLiner: 'Let an LLM read the contract, let finance logic check it, and send only the doubtful parts to a human.',
    question:
      'LLMs can pull terms out of swap confirmations, but a wrong day-count or date is expensive. Can a deterministic finance verifier plus a calibrated, cost-aware selector decide which fields a person really needs to check?',
    why:
      'Most “human in the loop” systems either check everything or trust everything. A principled way to choose what to review saves time without hiding errors.',
    approach: [
      'Designed a three-part pipeline: an LLM proposes values, a QuantLib/CDM verifier checks them with 7 rule families, and a selector with conformal risk control chooses what a human reviews.',
      'Built a rate-limited SEC EDGAR crawler (4 requests/s, backoff, SHA-256 manifests) and a seeded screen of 300 filings, 75 from each of four eras.',
      'Built a synthetic document generator with labelled defects, and fixed in advance which rules each defect should trigger.',
      'Wrote two-annotator labelling tools with Cohen’s kappa and adjudication reports.',
    ],
    findings: ['No model results yet; the project is in the data and annotation stage.'],
    limits: ['The real test split stays locked until the analysis plan is preregistered.'],
    stats: [
      { value: '7', label: 'verifier rule families' },
      { value: '300', label: 'filings screened' },
      { value: '178', label: 'automated tests' },
    ],
    stack: ['Python', 'QuantLib', 'FINOS CDM', 'pytest', 'GitHub Actions', 'Tesseract'],
    links: [{ label: 'Code', href: 'https://github.com/donti507/Trust-but-Verify', kind: 'code' }],
    next: 'Finish annotation, register the analysis plan, then run the first extraction models.',
  },
  {
    slug: 'adni-brain-age',
    title: 'Preregistered residual brain-age study (ADNI)',
    shortTitle: 'Residual brain age (ADNI)',
    tier: 'research',
    tags: ['Neuroimaging', 'Preregistration'],
    dates: 'Nov 2025 – present',
    status: 'Pre-analysis',
    role: 'Lead',
    oneLiner: 'Does a brain that looks older than expected predict faster decline, once amyloid and tau are accounted for?',
    question:
      'Brain-age gap is a popular MRI marker. Does the part of it not explained by amyloid and tau pathology still predict cognitive decline?',
    why:
      'If it does, brain age carries information beyond the standard Alzheimer’s biomarkers. If not, it may mostly be a proxy for them.',
    approach: [
      'Wrote every cohort rule, time window (±180 days) and test (FDR control, 5-year follow-up) before opening the data.',
      'Assembled 11 ADNI tables: MRI, amyloid and tau PET, plasma p-tau217, cognition and diagnosis.',
      'Kept a dated decision log so every change is traceable.',
    ],
    findings: ['No results yet, by design.'],
    limits: ['Analysis has not started.'],
    stats: [
      { value: '11', label: 'ADNI tables' },
      { value: '5 yr', label: 'follow-up window' },
    ],
    stack: ['Python', 'pandas', 'YAML', 'ADNI / IDA'],
    links: [{ label: 'Plan and decision log', href: 'https://github.com/donti507/adni-brainage-residual-prereg', kind: 'prereg' }],
  },
  {
    slug: 'budgetaware-hpo',
    title: 'Budget-aware hyperparameter optimization at HPC scale',
    shortTitle: 'BudgetAware-HPO',
    tier: 'research',
    tags: ['HPC', 'AutoML'],
    dates: 'Nov 2025',
    status: 'Under audit',
    role: 'Independent research; Eagle HPC, PCSS Poznań (grant pl0844-01)',
    oneLiner: 'Which tuning method should you pick when you pay in GPU-hours and run 40 jobs at once?',
    question:
      'HPO benchmarks usually compare methods by number of trials. On a real cluster you pay in GPU-hours and run many workers in parallel. Does that change which method wins?',
    why:
      'Methods like TPE assume they learn from earlier trials. With 40 workers running at once, that assumption weakens, and the best choice on a laptop may not be the best on a supercomputer.',
    approach: [
      'Ran Random Search, TPE, Hyperband and CMA-ES in Optuna on ResNet-18 and EfficientNet-B0 with CIFAR-10/100, using SLURM job arrays on up to 40 Tesla V100s.',
      'Swept TPE across 1, 5, 10, 20 and 40 workers.',
      'Fixed a race condition that crashed workers creating a shared Optuna SQLite study (staggered start, retries, constant-liar TPE).',
      'Audited my own archive afterwards: reconciled 2,211 result files and quarantined duplicated trial records.',
    ],
    findings: [
      'Hyperband used 65% fewer GPU-hours per trial than Random Search (0.050 vs 0.144) with a higher mean accuracy (84.4% vs 61.3%).',
      'CMA-ES never became competitive at 40 workers.',
      'The audit found 71 trial IDs (142 records) that collided, leaving 1,195 clean trials.',
    ],
    limits: [
      'Each method/dataset/worker setting is a single study, so the rankings are preliminary until the runs are repeated.',
      'Collisions in the earliest runs cannot be detected from the files that survive.',
    ],
    stats: [
      { value: '1,336', label: 'trial records' },
      { value: '40', label: 'V100 GPUs at once' },
      { value: '−65%', label: 'GPU-h per trial (Hyperband)' },
      { value: '1,195', label: 'clean trials after audit' },
    ],
    figures: [
      { src: 'projects/budgetaware-hpo/fig1_method_comparison.png', alt: 'Method comparison', caption: 'Accuracy and GPU cost by method.' },
      { src: 'projects/budgetaware-hpo/fig2_parallelism_degradation.png', alt: 'TPE by worker count', caption: 'TPE as parallelism grows.' },
    ],
    stack: ['Python', 'PyTorch', 'Optuna', 'SLURM', 'conda', 'Tesla V100'],
    links: [{ label: 'Code and results', href: 'https://github.com/donti507/BudgetAware-HPO', kind: 'code' }],
    next: 'Repeat each setting with independent seeds before publishing rankings.',
    featured: true,
  },
  {
    slug: 'connectometwin',
    title: 'ConnectomeTwin',
    shortTitle: 'ConnectomeTwin',
    tier: 'software',
    tags: ['NeuroAI', 'Web'],
    dates: 'Oct 2026',
    status: 'Live',
    role: 'Sole developer',
    oneLiner: 'An interactive companion to the fly-compass paper: explore the circuit in 3D and watch a network fail when its wiring changes.',
    question: 'How do you make a paper’s central result something people can try for themselves in a browser?',
    why: 'Reviewers and students understand a transplant failure much faster when they can trigger it themselves.',
    approach: [
      'Built a dependency-free, six-page browser app with real FlyWire anatomy for all 433 neurons and a Canvas fallback when WebGL is unavailable.',
      'Implemented the trained network in the browser so users can move it between reconstructions and refit cell-type gains.',
      'Checked it against 46 reference cases from the paper, with unit and Playwright browser tests and a CI deploy to GitHub Pages.',
    ],
    findings: [
      'In the demo, heading error rises from about 8° to 85° when a network moves to another reconstruction.',
      'Runs at about 58 fps on the largest wiring (33,783 edges) with a 4× throttled CPU.',
    ],
    limits: ['Frame rate measured in headless Chromium, not on physical laptops.'],
    stats: [
      { value: '433', label: 'neurons rendered' },
      { value: '46', label: 'reference cases' },
      { value: '58 fps', label: 'at 4× CPU throttle' },
    ],
    figures: [{ src: 'projects/connectometwin/anatomy.png', alt: 'FlyWire compass-circuit anatomy', caption: 'Real anatomy for all 433 neurons, coloured by family.' }],
    stack: ['JavaScript', 'Three.js', 'Web Workers', 'Playwright', 'GitHub Actions'],
    links: [
      { label: 'Open the app', href: 'https://donti507.github.io/connectometwin/', kind: 'demo' },
      { label: 'Code', href: 'https://github.com/donti507/connectometwin', kind: 'code' },
    ],
  },
  {
    slug: 'zen-os',
    title: 'ZEN_OS',
    shortTitle: 'ZEN_OS',
    tier: 'engineering',
    tags: ['Web', 'LLMs'],
    dates: '2026',
    status: 'Live',
    role: 'Sole developer',
    oneLiner: 'A personal productivity dashboard with an AI assistant, Dante, that can read and change your tasks by text or voice.',
    question: 'Can an assistant act on your planner safely, showing every change it makes?',
    why: 'Assistants that edit data need clear audit trails and strict access control.',
    approach: [
      'Built tasks, kanban, calendar with Google Calendar sync, meetings, analytics and a link vault.',
      'Dante streams answers, takes voice input in 7 languages, and shows every change it makes with a reason.',
      'Secured with Supabase auth, row-level security on every table and per-user rate limiting; works with any OpenAI-compatible model or Gemini.',
    ],
    findings: ['583 automated test cases.'],
    limits: [],
    stats: [
      { value: '7', label: 'voice languages' },
      { value: '583', label: 'test cases' },
    ],
    stack: ['React 19', 'Vite', 'Tailwind v4', 'Express', 'Supabase', 'Docker'],
    links: [{ label: 'Code', href: 'https://github.com/donti507/zenOs', kind: 'code' }],
  },
  {
    slug: 'climateguard',
    title: 'ClimateGuard API',
    shortTitle: 'ClimateGuard',
    tier: 'engineering',
    tags: ['Backend', 'Climate'],
    dates: '2026',
    status: 'Completed',
    role: 'Sole developer',
    oneLiner: 'A REST API for climate observations and flood risk, seeded with real September 2024 Central European flood data from Polish regions.',
    question: 'What does a clean, secure backend for regional flood data look like?',
    why: 'Local authorities need flood data they can query reliably and safely.',
    approach: [
      'Spring Boot 3.2 API with JWT authentication and USER/ADMIN roles.',
      'PostgreSQL schema managed by 5 Flyway migrations; Swagger docs; Docker Compose setup.',
    ],
    findings: [],
    limits: [],
    stats: [{ value: '5', label: 'Flyway migrations' }],
    stack: ['Java 17', 'Spring Boot', 'PostgreSQL', 'Flyway', 'Docker'],
    links: [{ label: 'Code', href: 'https://github.com/donti507/climateGuard', kind: 'code' }],
  },
  // Carried over from the old site. Check every number against the repo before publishing.
  {
    slug: 'banglatruth', title: 'BanglaTruth', shortTitle: 'BanglaTruth', tier: 'engineering', tags: ['LLMs', 'NLP'],
    dates: 'Mar – Apr 2026', status: 'Completed', role: 'Developer',
    oneLiner: 'Bilingual (English and Bangla) fact-checking with two Llama models run in parallel and majority-vote verdicts.',
    question: '', why: '', approach: [], findings: [], limits: [], stats: [],
    stack: ['Python', 'Llama 3.3 70B', 'FastAPI', 'Supabase', 'Streamlit'],
    links: [{ label: 'Code', href: 'https://github.com/donti507/Banglatruth', kind: 'code' }], verify: true,
  },
  {
    slug: 'multilingual-sentiment', title: 'Multilingual Sentiment Analyzer', shortTitle: 'Multilingual sentiment', tier: 'engineering', tags: ['NLP'],
    dates: 'Jan – Mar 2026', status: 'Completed', role: 'Developer',
    oneLiner: 'Sentiment and 6-class emotion analysis in English, Urdu, Bangla, Polish and Hindi.',
    question: '', why: '', approach: [], findings: [], limits: [], stats: [],
    stack: ['Python', 'Hugging Face', 'Groq', 'Streamlit'],
    links: [{ label: 'Code', href: 'https://github.com/donti507/multilingual-sentiment-analyzer', kind: 'code' }], verify: true,
  },
  {
    slug: 'credit-risk', title: 'Credit Risk Scoring Model', shortTitle: 'Credit risk scorecard', tier: 'engineering', tags: ['ML', 'Finance'],
    dates: '2026', status: 'Completed', role: 'Developer',
    oneLiner: 'An interpretable scorecard with monotonic WoE binning.',
    question: '', why: '', approach: [], findings: [], limits: [], stats: [],
    stack: ['Python', 'scikit-learn', 'statsmodels', 'optbinning'],
    links: [{ label: 'Code', href: 'https://github.com/donti507/credit-risk-scoring-model', kind: 'code' }], verify: true,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

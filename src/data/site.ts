// src/data/site.ts
// Real content for every non-project page. Source: CV (Nov 2026) and the existing portfolio_web site.
// Items with `verify: true` are on the old site but NOT on the CV. Confirm them before publishing.

export const person = {
  name: 'Md Ali Ashraf Yad',
  tagline: 'CS undergraduate in Wrocław working on NeuroAI, connectomics, HPC and reliable LLMs.',
  location: 'Wrocław, Poland',
  email: 'ali.ashraf.yad01@gmail.com',
  links: {
    github: 'https://github.com/donti507',
    linkedin: 'https://linkedin.com/in/md-ali-ashraf-y-28867524b',
    arxiv: 'https://arxiv.org/abs/2610.29205',
    scholar: 'https://scholar.google.com/citations?user=qoNVckcAAAAJ&hl=en',
    cv: 'Yad_CV_Research.pdf', // put the PDF in /public
  },
};

export const home = {
  heroTitle: 'I study how much our models of the brain depend on the data we build them from.',
  heroBody:
    'I am a third-year Applied Computer Science student at Wrocław University of Science and Technology. ' +
    'My work asks when connectome-based models can be trusted, how to run large ML experiments honestly on HPC clusters, ' +
    'and how to check LLM outputs before people rely on them. I preregister what I can and report the results that fail.',
  stats: [
    { value: '9', label: 'connectome versions compared' },
    { value: '1,336', label: 'trials on 40 V100 GPUs' },
    { value: '1', label: 'arXiv preprint' },
    { value: '433', label: 'neurons rendered in the browser' },
  ],
  featuredProjectSlugs: ['fly-connectome', 'physics-residual-aqa', 'budgetaware-hpo'],
  // "Now" strip: what I'm doing this term
  now: [
    'Presenting the diving physics-residual result at ISRC 2026 (Dec 2026).',
    'Annotating SEC filings for Trust but Verify.',
    'Finalising the ADNI residual brain-age preregistration.',
  ],
};

export const researchInterests = [
  { title: 'Data dependence of connectome models', body: 'How much do connectome-constrained models change with the reconstruction they are built from?' },
  { title: 'Reproducible, preregistered ML', body: 'Fixing hypotheses and analyses before looking, and reporting the predictions that fail.' },
  { title: 'Large experiments on HPC', body: 'Running and auditing many-GPU experiments where cost and parallelism change the answer.' },
  { title: 'Verifying LLM outputs', body: 'Deciding which model outputs a human must check, with guarantees on the error rate.' },
];

export const publications = [
  {
    kind: 'Accepted · IEEE · Oral',
    title: 'Structural and Attack-Mechanism Generalization in a Domain-Randomized Detector–Responder Framework for Autonomous Cyber Defense',
    authors: 'M. A. A. Yad and N. T. Nabila',
    venue: '29th International Conference on Computer and Information Technology (IEEE ICCIT 2026)',
    note: 'Accepted for oral presentation · Paper ID 648 · Double-blind peer review with at least two reviewers. The conference received 3,574 submissions. Registered papers are submitted to IEEE Xplore.',
    pendingPaper: 'IEEE Xplore (after the conference)',
    links: { code: 'https://github.com/donti507/domain-randomized-ippo-cyber-defense' },
  },
  {
    kind: 'Preprint',
    title: 'Reconstruction differences rival individual differences in the fly compass connectome and break trained circuit models',
    authors: 'M. A. A. Yad and N. T. Nabila',
    venue: 'arXiv:2610.29205 [cs.NE], Oct 2026',
    note: 'Not yet peer-reviewed. Preregistered.',
    links: {
      paper: 'https://arxiv.org/abs/2610.29205',
      prereg: 'https://doi.org/10.5281/zenodo.23382486',
      code: 'https://github.com/donti507/chessfly',
      demo: 'https://donti507.github.io/connectometwin/',
    },
    bibtex:
      '@article{yad2026reconstruction,\n  title={Reconstruction differences rival individual differences in the fly compass connectome and break trained circuit models},\n  author={Yad, Md Ali Ashraf and Nabila, Nazifa Tabassum},\n  journal={arXiv preprint arXiv:2610.29205},\n  year={2026}\n}',
  },
  {
    kind: 'Accepted talk',
    title: 'Physics-residual learning for interpretable and label-efficient diving action quality assessment',
    authors: 'M. A. A. Yad and N. T. Nabila',
    venue: '2nd International Student Research Conference (ISRC 2026), Dhaka University Research Society, Dec 2026',
    note: 'Abstract accepted for oral presentation.',
    links: { code: 'https://github.com/donti507/physics-residual-aqa' },
  },
];

export const education = [
  {
    school: 'Wrocław University of Science and Technology',
    degree: 'B.Sc. in Applied Computer Science',
    dates: 'Oct 2024 – Feb 2028 (expected)',
    location: 'Wrocław, Poland',
  },
];

export const honors = [
  { title: 'Top 50, European University Challenge (Google Cloud)', date: 'Jul 2026' },
  { title: 'Undergraduate Student Member, American Physical Society', date: 'Oct 2026 – present' },
  { title: 'First student from Poland selected as IBM Z Campus Ambassador', date: 'May 2025' },
];

export const experience = [
  {
    role: 'Science News Editor and Broadcast Presenter', org: 'Akademickie Radio LUZ, Wrocław', dates: 'Oct 2024 – present', type: 'Science communication',
    points: [
      'Write and present weekly science news on AI, quantum computing, space and health for 10,000+ listeners, checking the sources behind every story.',
      'Interviewed a Los Alamos scientist about what Odra 5, Poland’s first quantum computer, can really do; produced a year-in-review show in three days.',
    ],
  },
  {
    role: 'Founder and Club Lead', org: 'IBM Z Mainframe and Cloud Computing Club, PWr', dates: 'Nov 2025 – present', type: 'Leadership',
    points: ['Started the club, got 20+ members access to IBM Z and cloud systems, and wrote the guides three project teams work from.'],
  },
  {
    role: 'IBM Z Campus Ambassador', org: 'IBM Z Global Ambassador Program', dates: 'May 2025 – present', type: 'Leadership',
    points: ['First student from Poland selected; help other students set up and troubleshoot IBM Z.'],
  },
  {
    role: 'Technical Writer and Ground Support', org: 'PWr in Space, student rocketry team', dates: 'Apr 2026 – present', type: 'Engineering',
    points: ['Write reports for competitions and sponsors, and help on the ground during tests and launches.'],
  },
  // On the old site but not on the CV:
  { role: 'Co-Author & Research Assistant', org: '(fill in)', dates: '2026 – present', type: 'Research', points: [], verify: true },
  { role: 'ULisses Fellow', org: '(fill in)', dates: 'Jan 2026 – present', type: 'Fellowship', points: [], verify: true },
];

export const certifications = [
  { title: 'Get Started with Pub/Sub Skill Badge', issuer: 'Google Cloud', date: 'May 2026', group: 'Cloud & systems' },
  { title: 'Financial Markets', issuer: 'Yale University (Coursera)', date: 'May 2026', group: 'Other' },
  { title: 'CS50x Puzzle Day 2026', issuer: 'Harvard University', date: 'Apr 2026', group: 'Competitions' },
  { title: 'CCNA: Switching, Routing & Wireless Essentials', issuer: 'Cisco Networking Academy', date: 'Feb 2026', group: 'Cloud & systems' },
  { title: 'CCNA: Introduction to Networks', issuer: 'Cisco Networking Academy', date: 'Feb 2026', group: 'Cloud & systems' },
  { title: 'AI & Data Specialization', issuer: 'IBM', date: 'Dec 2025', group: 'AI & data' },
  { title: 'IBM Z Xplore Advanced', issuer: 'IBM', date: 'Nov 2025', group: 'Cloud & systems' },
  { title: 'Introduction to Generative AI', issuer: 'Santander Open Academy', date: 'Sep 2025', group: 'AI & data' },
  { title: 'IBM Z Xplore Concepts', issuer: 'IBM', date: 'May 2025', group: 'Cloud & systems' },
  { title: 'Supervised Machine Learning: Regression & Classification', issuer: 'Stanford / DeepLearning.AI', date: 'Apr 2023', group: 'AI & data' },
  { title: 'Data Science Math Skills', issuer: 'Duke University', date: 'Apr 2023', group: 'AI & data' },
  { title: 'Exercising Leadership: Foundational Principles', issuer: 'Harvard Aspire Institute', date: 'May 2023', group: 'Other' },
];

export const skills = {
  Programming: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'Bash', 'Java'],
  'ML and scientific computing': ['PyTorch', 'Optuna', 'NumPy', 'pandas', 'scikit-learn', 'Matplotlib', 'Recurrent and ring-attractor models'],
  'HPC and engineering': ['SLURM', 'Linux', 'conda', 'Git', 'GitHub Actions', 'Docker', 'pytest', 'Playwright'],
  Data: ['FlyWire', 'Janelia FlyEM', 'BANC', 'DANDI', 'ADNI', 'SEC EDGAR', 'PostgreSQL', 'pgvector'],
  Languages: ['English (C1)'],
};

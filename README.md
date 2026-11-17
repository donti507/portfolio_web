# Md Ali Ashraf Yad · Research portfolio

A research portfolio covering NeuroAI, connectomics, HPC and reliable ML. The production URL is [donti507.github.io/portfolio_web](https://donti507.github.io/portfolio_web/).

## Local development

```sh
npm install
npm run dev
```

Open the Vite URL under `/portfolio_web/`. Browser navigation uses hash routes so that direct links work on GitHub Pages. To validate the production bundle, run `npm run lint`, `npm run build`, then `node scripts/check-content.mjs`.

The form uses the three settings in `.env.example`. Copy the example to `.env.local` to configure EmailJS locally. Without them, the Contact page displays an email fallback.

## Content

Add projects in `src/data/projects.ts` and update personal and research information in `src/data/site.ts`. Use verified data and links. Entries marked `verify: true` are excluded from the published site. Stitch exports in `design/stitch` are visual references. Preserve their layout cues and use the verified data files for content.

Place verified image assets in `public/projects/<slug>/` and record dimensions in `src/data/figure-dimensions.json`. When the owner supplies the CV PDF, put it at `public/Yad_CV_Research.pdf`. The download links appear automatically.

## Deployment

The GitHub Actions workflow builds and validates pushes to `main`, then publishes the `dist/` artifact through GitHub Pages. GitHub Pages must use GitHub Actions as its source. Configure the optional EmailJS values as repository secrets using the names in `.env.example`.

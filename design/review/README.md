# Academic portfolio rebuild

Rebuilt the portfolio as a light, routed React site using the Stitch exports for layout and the brief for content. This branch has 11 step commits. Lint and the Vite production build passed at each step. The Pages workflow targets future pushes to main.

## Desktop and mobile screenshots

Full-page production-preview captures at 1440 × 1000 and 390 × 844. Both 404 entry points are included.

| Route | Desktop | Mobile |
| --- | --- | --- |
| #/ | [Desktop](screenshots/home-desktop.webp) | [Mobile](screenshots/home-mobile.webp) |
| #/research | [Desktop](screenshots/research-desktop.webp) | [Mobile](screenshots/research-mobile.webp) |
| #/projects | [Desktop](screenshots/projects-desktop.webp) | [Mobile](screenshots/projects-mobile.webp) |
| #/projects/fly-connectome | [Desktop](screenshots/fly-connectome-desktop.webp) | [Mobile](screenshots/fly-connectome-mobile.webp) |
| #/projects/physics-residual-aqa | [Desktop](screenshots/physics-residual-aqa-desktop.webp) | [Mobile](screenshots/physics-residual-aqa-mobile.webp) |
| #/projects/trust-but-verify | [Desktop](screenshots/trust-but-verify-desktop.webp) | [Mobile](screenshots/trust-but-verify-mobile.webp) |
| #/projects/adni-brain-age | [Desktop](screenshots/adni-brain-age-desktop.webp) | [Mobile](screenshots/adni-brain-age-mobile.webp) |
| #/projects/budgetaware-hpo | [Desktop](screenshots/budgetaware-hpo-desktop.webp) | [Mobile](screenshots/budgetaware-hpo-mobile.webp) |
| #/projects/connectometwin | [Desktop](screenshots/connectometwin-desktop.webp) | [Mobile](screenshots/connectometwin-mobile.webp) |
| #/projects/zen-os | [Desktop](screenshots/zen-os-desktop.webp) | [Mobile](screenshots/zen-os-mobile.webp) |
| #/projects/climateguard | [Desktop](screenshots/climateguard-desktop.webp) | [Mobile](screenshots/climateguard-mobile.webp) |
| #/cv | [Desktop](screenshots/cv-desktop.webp) | [Mobile](screenshots/cv-mobile.webp) |
| #/about | [Desktop](screenshots/about-desktop.webp) | [Mobile](screenshots/about-mobile.webp) |
| #/photography | [Desktop](screenshots/photography-desktop.webp) | [Mobile](screenshots/photography-mobile.webp) |
| #/contact | [Desktop](screenshots/contact-desktop.webp) | [Mobile](screenshots/contact-mobile.webp) |
| #/missing | [Desktop](screenshots/404-desktop.webp) | [Mobile](screenshots/404-mobile.webp) |
| #/projects/missing | [Desktop](screenshots/unknown-project-desktop.webp) | [Mobile](screenshots/unknown-project-mobile.webp) |

## Lighthouse mobile

| Route | Performance | Accessibility | Best Practices | SEO | Report |
| --- | ---: | ---: | ---: | ---: | --- |
| #/ | 93 | 100 | 100 | 100 | [Lighthouse 13.6.0](lighthouse-home.json) |
| #/projects/fly-connectome | 94 | 100 | 100 | 100 | [Lighthouse 13.6.0](lighthouse-fly-connectome.json) |

## Checks

- Axe CLI reported zero violations across 17 routes. The axe-core browser scan also reported zero violations across all 34 route and viewport combinations. [CLI output](axe-cli.txt) · [Browser results](axe.json)
- Browser smoke tests covered filter URLs and reloads, the mobile menu and history, Escape dismissal and focus in the figure workflow, page overflow, and same-origin images and assets. [Smoke-test output](browser-smoke.json)
- The contact form passed validation, honeypot, and simulated success and error checks. The test intercepted service requests locally. [Contact test output](contact-form.json)
- Content guard passed: 43 built files scanned, 38 prohibited strings checked. A temporary fixture containing an unverified slug failed the guard and was removed. [Content-guard output](content-guard.txt)
- Lychee reported four successful local links in the generated HTML. The browser smoke tests additionally exercised the JS-rendered hash routes. [Lychee output](lychee.txt)
- All eight project figures downloaded successfully. Each has a WebP version, a PNG fallback, and explicit dimensions.

## Content and slots omitted

- The Stitch screens include archive IDs, placeholder artwork and metadata, telemetry, extra academic profiles, and theme controls. These slots were omitted. The light palette is used across the site.
- The home portrait, CV PDF downloads and About background paragraph are hidden pending source material. About retains a link to Photography. The gallery shows its unavailable state, and the three-photo teaser is hidden.
- Entries marked verify are omitted from the published bundle, along with unverified legacy publications, affiliations and projects. The phone number, ORCID, PGP, and publication Slides links were omitted.
- Diving uses the Section 4 pose values and both source figures. The exact per-model table, rotation medians, and equation card specified only in Step 6 are omitted.
- HPO plots the two method coordinates given in Section 4. The audit shows the reported Section 4 counts and caveat. The TPE and CMA-ES coordinates and snapshot count specified only in Step 6 are omitted.
- Trust but Verify shows the documented verification stages and the test-split lock. The illustrative contract values, individual rule names and milestone checklist are omitted. ADNI shows the documented imaging window, follow-up and outcome, with the additional index, QC and missing-value claims omitted.
- ConnectomeTwin uses the real anatomy and documented network results. Download-size and additional accessibility claims are omitted. ZEN_OS shows its documented dashboard views and safeguards, with the illustrative meeting exchange, browser list and numerical rate limit omitted. ClimateGuard shows its documented API and role summary with the endpoint matrix and architecture labels omitted.

## Decisions for Ali

- The newer Stitch archive was identified by its internal timestamps. Its shared-screen layouts take precedence, including the asymmetric featured projects layout. The older archive supplies the project-detail screens.
- Section 4 took precedence for conflicting or missing data. For example, BudgetAware-HPO displays 1,336 trial records as supplied in Section 4. The Step 6 alternative count and the corresponding snapshot subtraction were omitted.
- Provide Yad_CV_Research.pdf, a portrait and the About background paragraph when ready. The PDF path is wired up and displays its links when the asset exists.
- All 18 numbered gallery JPEGs in main contain invalid UTF-8 replacement bytes in their encoded image data and could not be decoded. The branch preserves the originals outside public/. Seventeen matching WhatsApp files were removed after exact byte comparisons. The extra IMG_20260526_232338631_HDR.jpg file is also byte-identical to photo-01.jpg and has been archived outside the build. Supply intact originals to restore the gallery and convert them to WebP without EXIF/GPS.
- Confirm the entries marked for verification before adding them back. With EmailJS unset, Contact displays its email fallback. The form preserves the previous template fields and adds Topic. Live delivery awaits the existing service credentials.
- GitHub Actions is the expected Pages source for a future authorized deployment.

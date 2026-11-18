---
name: Academic Monograph & Lab Notebook
colors:
  surface: '#fbf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#fbf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ef'
  surface-container: '#efeeea'
  surface-container-high: '#eae8e4'
  surface-container-highest: '#e4e2de'
  on-surface: '#1b1c1a'
  on-surface-variant: '#434751'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f0ed'
  outline: '#737782'
  outline-variant: '#c3c6d3'
  surface-tint: '#305cab'
  primary: '#00377d'
  on-primary: '#ffffff'
  primary-container: '#1e4e9c'
  on-primary-container: '#a9c3ff'
  inverse-primary: '#aec6ff'
  secondary: '#98471b'
  on-secondary: '#ffffff'
  secondary-container: '#fe9664'
  on-secondary-container: '#752d01'
  tertiary: '#004238'
  on-tertiary: '#ffffff'
  tertiary-container: '#005c4f'
  on-tertiary-container: '#79d4c0'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#aec6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#0d4491'
  secondary-fixed: '#ffdbcc'
  secondary-fixed-dim: '#ffb695'
  on-secondary-fixed: '#351000'
  on-secondary-fixed-variant: '#7a3004'
  tertiary-fixed: '#98f3de'
  tertiary-fixed-dim: '#7bd7c3'
  on-tertiary-fixed: '#00201a'
  on-tertiary-fixed-variant: '#005145'
  background: '#fbf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2de'
typography:
  display-lg:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
  display-lg-mobile:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  headline-lg:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 26px
    fontWeight: '500'
    lineHeight: 34px
  headline-md:
    fontFamily: Newsreader
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  headline-sm:
    fontFamily: Newsreader
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 27.2px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.06em
  code-inline:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system channels the intellectual gravitas of archival research monographs merged with the kinetic precision of a modern scientific laboratory notebook. It evokes calm authority, methodical discovery, and intellectual rigor.

The aesthetic philosophy is **Editorial Precision & Tactile Scientific Elegance**:
- **Warm Archival Grounding**: Interfaces rest on a gentle, natural paper foundation rather than sterile digital whites, creating comfort during prolonged analytical reading sessions.
- **Editorial Legibility**: High typographic hierarchy celebrates the craft of publishing—distinguishing between scholarly narrative, analytical reading, and instrument telemetry.
- **Structured Restraint**: Visual weight is guided by structural rule lines, crisp mathematical spacing, and targeted accent colors rather than decorative excess or heavy drop shadows.

## Colors

The palette pairs high-contrast archival ink with functional semantic accents:

- **Base Paper (`#FAF8F4`)**: The global page background, mimicking unbleached scientific vellum.
- **Card Surfaces (`#FFFFFF`)**: Pure white elevated panels, creating crisp focus windows over the warm paper backdrop.
- **Dark Ink (`#1B2230`)**: Deep blue-black body typography offering optical clarity without the harshness of pure `#000000`.
- **Primary Cobalt (`#1E4E9C`)**: Deep scholarly blue utilized for interactive anchors, primary actions, and navigational authority.
- **Coral Metric (`#F28C5B` / `#B4532A`)**: Vibrant coral for high-impact metric counters and graphic highlights, with the deepened `#B4532A` variant reserved strictly for text and numerical values requiring WCAG AA contrast.
- **Status Teal (`#0E7C6B`)**: Crisp verification tone for 'Live', 'Preprint', and validated data markers.
- **Stone Border (`#E5E0D8`)**: Subtle warm structural hairline boundaries that define boundaries without cognitive clutter.

## Typography

The typographic strategy balances academic literary tradition with modern technical precision through three distinct type families:

1. **Newsreader (Display & Section Headings)**: Employs optical sizing characteristics of historical book printing. Use italic weights for pull quotes, abstract intros, and monograph citations.
2. **Inter (Body Content & Interface Controls)**: Scaled specifically at `17px` with an expansive `1.6` line-height (`27.2px`) for effortless parsing of long-form treatises, empirical analyses, and interface data.
3. **JetBrains Mono (Metadata & Telemetry)**: Applied to DOI citations, timestamps, experimental parameters, numerical tables, and code snippets. Always set with slight positive letter spacing to maintain clarity at diminutive scales.

## Layout & Spacing

The layout is grounded in a rigorous 8px rhythmic increment:

- **Desktop (1200px+)**: A structured 12-column grid with a maximum content container of 1280px. Analytical margins sit at `2rem` (32px), with `1.5rem` (24px) gutters between columns.
- **Tablet (768px – 1199px)**: Reflows to an 8-column layout. Margin shifts to `1.5rem` (24px) with `1rem` (16px) gutters. Sidebars fold into horizontal drawers or tabbed panels.
- **Mobile (< 768px)**: 4-column fluid layout with `1rem` (16px) canvas gutters and margins. Reading text containers must maintain a maximum line length of 65 characters to protect reading ergonomics.

Component vertical rhythm relies strictly on `space-xs` (4px), `space-sm` (8px), `space-md` (16px), `space-lg` (24px), and `space-xl` (32px) increments to evoke disciplined laboratory record-keeping.

## Elevation & Depth

This system avoids synthetic digital skeuomorphism and heavy blurred drop shadows. Depth is achieved via **tonal stratification and architectural outlines**:

- **Ground Level (Canvas)**: Background `#FAF8F4` sets the base level.
- **Tier 1 (Surface Cards & Notebook Panes)**: Pure white `#FFFFFF` surfaces delineated by a 1px solid border of `#E5E0D8`. An ambient, warm-tinted microscopic drop shadow (`0 1px 3px rgba(27, 34, 48, 0.04)`) separates the card from the paper base.
- **Tier 2 (Popovers, Tooltips & Context Menus)**: Pure white `#FFFFFF` elevated with a 1px `#E5E0D8` frame and a focused bibliographic shadow: `0 4px 16px rgba(27, 34, 48, 0.08)`.
- **Dividers & Rules**: Hairline rules use `#E5E0D8` to segment research streams, matching the feel of technical drafting layouts.

## Shapes

The interface balances sharp scientific precision with human tactile warmth:

- **Primary Cards & Containers**: Set to `12px` (equivalent to `rounded-lg` under setting 2), conferring an approachable, contemporary binder feel without softening into playfulness.
- **Interactive Buttons & Form Fields**: Set to standard `8px` (`0.5rem`) for compact, reliable click targets.
- **Badges & Status Tags**: Use `4px` (`rounded-sm`) to preserve a crisp, technical, laboratory-label appearance.
- **Media Containers & Figure Frames**: Fixed at `12px` with a 1px `#E5E0D8` stroke boundary framing illustrations, charts, and plate figures.

## Components

### Buttons
- **Primary**: Solid `#1E4E9C` background, `#FFFFFF` Inter medium text, 8px border radius, 10px 18px padding. Hover: `#163A75`. Active: `#102B57`.
- **Secondary / Outlined**: `#FFFFFF` background, 1px `#E5E0D8` border, `#1B2230` text. Hover: `#FAF8F4` background with `#1E4E9C` border and text.
- **Tertiary / Ghost**: Transparent background, `#1E4E9C` text. Hover: `#1E4E9C` at 6% opacity.

### Status Indicators & Badges
- **'Live' & 'Preprint' Chips**: Subtle `#0E7C6B` background at 10% opacity, solid `#0E7C6B` text, JetBrains Mono 11px uppercase, 4px border radius. Accompanied by a 6px circular pulsing or static solid `#0E7C6B` dot.
- **Metrics Counter**: Large numerical figures rendered in Newsreader or JetBrains Mono using `#B4532A` for high-contrast legibility, optionally framed with a 10% `#F28C5B` wash.

### Cards & Lab Slates
- Pure white `#FFFFFF` background, 12px border radius, 1px solid `#E5E0D8` border.
- Header sections feature an optional subtle hairline divider separating the monograph title from notebook observations.

### Input Fields & Controls
- Form inputs feature `#FFFFFF` fill, 1px `#E5E0D8` border, 8px corner radius, and 15px Inter font. Focused state transitions border to `#1E4E9C` with a 2px outer aura in `#1E4E9C` at 15% opacity.
- **Checkboxes & Radios**: 1.5px `#E5E0D8` perimeter; active state filled with `#1E4E9C` featuring crisp geometric check/dot icons.

### Data Tables & Bibliographies
- Compact JetBrains Mono cell data, alternating row backgrounds using transparent and `#FAF8F4` tints, framed by horizontal `#E5E0D8` grid lines. Column headers set in small uppercase JetBrains Mono with 0.05em tracking.
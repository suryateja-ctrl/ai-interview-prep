# Design Brief

## Direction

Professional Career Platform — An intelligent, data-focused dashboard for interview preparation with refined clarity and scientific rigor.

## Tone

Refined minimalism: eliminates decoration in favor of information hierarchy and readability; every visual choice serves data clarity and professional credibility.

## Differentiation

Deep navy sidebar acts as primary navigation anchor; data cards with subtle depth create dashboard hierarchy without ornament; teal accent cuts through neutral palette for confident CTAs and highlights.

## Color Palette

| Token            | OKLCH          | Role                                           |
| ---------------- | -------------- | ---------------------------------------------- |
| background       | 0.12 0.008 250 | Deep navy-black base (dark mode primary)       |
| foreground       | 0.94 0.008 250 | Near-white text, maximum readability           |
| card             | 0.16 0.01 250  | Slightly elevated surfaces for content blocks  |
| primary          | 0.52 0.16 250  | Deep navy/blue button actions, primary UI      |
| accent           | 0.72 0.18 185  | Vibrant teal — highlights, success, confidence |
| muted            | 0.22 0.01 250  | Subtle backgrounds, disabled states            |
| destructive      | 0.62 0.2 25    | Warning/destructive actions in warm red        |
| chart-1 through 5 | varies        | Distinct data visualization palette (5 colors) |

## Typography

- Display: Space Grotesk — Modern geometric sans-serif for headers, stats, and UI headings; strong letterforms convey intelligence
- Body: Satoshi — Refined, accessible sans-serif for paragraphs, labels, descriptions; warm neutrality pairs with navy
- Mono: JetBrains Mono — Code snippets, numeric displays, technical content; maintains data clarity
- Scale: hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl font-bold tracking-tight`, label `text-xs font-semibold uppercase`, body `text-base`

## Elevation & Depth

Layered depth through subtle shadows: `shadow-xs` for cards (minimal elevation), `shadow-md` for popovers, `shadow-elevated` for floating elements; no glow or neon effects; cool undertones preserve minimalism.

## Structural Zones

| Zone    | Background      | Border        | Notes                                       |
| ------- | --------------- | ------------- | ------------------------------------------- |
| Sidebar | `sidebar` (0.14) | `sidebar-border` | Navy primary for navigation, always visible |
| Header  | `card`          | `border-b`    | Subtle separation; contains user profile    |
| Content | `background`    | —             | Alternating `bg-card` and `bg-muted/30`    |
| Footer  | `muted` (0.22)  | `border-t`    | Subtle footer with links, copyright         |

## Spacing & Rhythm

Section gaps: `gap-6 md:gap-8`; content grouping: `p-4 md:p-6` within cards; micro-spacing: `space-y-2` for stacked elements; dashboard grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`; maintains visual breathing room without excess.

## Component Patterns

- Buttons: Rounded-md `bg-primary` with hover opacity shift; secondary variant uses border + transparent background
- Cards: Rounded-md `bg-card` with subtle `shadow-xs` and `border`; hover state adds `shadow-sm` transition
- Badges: Pill-shaped with colored foreground on muted background (e.g., `bg-accent/10 text-accent`); conveys status without distraction
- Stats: Large font-display value atop small uppercase label; icon optional with `text-accent`

## Motion

- Entrance: Fade-in + slide-up at 0.4s easing for cards on page load
- Hover: Opacity shift on buttons (90%), shadow elevation on cards, smooth transition all 0.3s
- Decorative: Minimal; accordion expand/collapse only; no floating animations

## Constraints

- No gradients, patterns, or textures beyond flat color
- Sidebar always visible at md+ breakpoints; drawer on mobile
- All interactive elements minimum 44×44px touch target
- Data visualization uses dedicated chart color tokens (5 distinct hues)
- No blur, glow, or transparency overlays except muted backgrounds

## Signature Detail

Navy sidebar as persistent navigation anchor with teal accent on active items; creates distinct visual anchor for the app's career-focused purpose without sacrificing minimalism.

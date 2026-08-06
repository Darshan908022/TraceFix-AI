---
name: TraceFix AI
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c1c6d7'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#8b90a0'
  outline-variant: '#414755'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e69'
  primary-container: '#4b8eff'
  on-primary-container: '#00285c'
  inverse-primary: '#005bc1'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#ca8100'
  on-tertiary-container: '#3e2400'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004493'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '450'
    lineHeight: 18px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  gutter: 1rem
  margin-mobile: 1rem
  margin-desktop: 2rem
---

## Brand & Style
The design system is engineered for high-stakes DevOps environments where clarity and rapid information processing are paramount. It adopts a **Modern Corporate** style with **Glassmorphism** accents, creating a "Command Center" aesthetic that feels both futuristic and authoritative.

The interface prioritizes data density without sacrificing legibility. By utilizing deep charcoal foundations and vibrant neon accents, the system creates a clear visual hierarchy that guides the user's eye toward critical system anomalies and operational health metrics. The emotional response is one of control, precision, and technical sophistication.

## Colors
The palette is built on a "Deep Space" foundation to minimize eye strain during extended monitoring sessions.

- **Primary (Electric Blue):** Used for primary actions, active states, and focused data streams. It represents the "pulse" of the system.
- **Secondary (Emerald Health):** Reserved strictly for "Success," "Online," and "Stable" statuses.
- **Tertiary (Amber Warning):** Used for latency spikes, warnings, and non-critical issues.
- **Danger (Crimson - Implicit):** Used for critical failures and system outages.
- **Neutral/Background:** A sophisticated mix of deep navy and charcoal (#020617) to provide maximum contrast for data visualizations.

## Typography
This design system employs a dual-font strategy:
- **Inter** handles all UI labels, headers, and standard body text. Its neutral, geometric properties ensure high legibility at small sizes within dense dashboards.
- **JetBrains Mono** is used for code blocks, log streams, and technical metadata. This distinction helps developers immediately identify machine-generated data versus UI navigation elements.

For mobile views, `headline-lg` scales down to 24px to maintain layout integrity within narrow viewports.

## Layout & Spacing
The layout utilizes a **Fixed Grid** system for dashboard views to ensure widget alignment remains consistent. 
- **Desktop:** 12-column grid with 16px gutters. Widgets should snap to 3, 4, 6, or 12 column spans.
- **Tablet:** 6-column grid with 16px gutters.
- **Mobile:** 2-column grid with 16px margins.

Spacing follows a strict 4px base unit. Dashboards use "Compact" spacing (1rem padding in cards) to maximize information density, while settings and documentation use "Comfortable" spacing (1.5rem padding).

## Elevation & Depth
Hierarchy is established through **Tonal Layering** and **Subtle Glows**:
- **Level 0 (Background):** Deepest navy (#020617).
- **Level 1 (Card/Surface):** Charcoal (#1E293B) with a subtle 1px border (#334155).
- **Level 2 (Popovers/Modals):** Lighter charcoal with a 15% backdrop blur (Glassmorphism) to maintain context of the underlying data.

**Shadows:** Use extremely diffused, low-opacity shadows (0 8px 32px rgba(0,0,0,0.4)). 
**Status Glows:** Active elements or critical alerts utilize a 4px outer "neon" glow matching their status color (Blue, Emerald, or Amber) to draw immediate attention.

## Shapes
The shape language is **Soft** but disciplined. 
- Standard components (Buttons, Inputs) use a 4px (0.25rem) radius to maintain a professional, technical feel.
- Larger containers and Dashboard widgets use 8px (0.5rem) to provide just enough visual softness to prevent the UI from feeling aggressive. 
- Status indicators (dots) are always circular.

## Components
- **Buttons:** Primary buttons are solid Electric Blue with white text. Secondary buttons are outlined with 1px slate borders. Hover states trigger a subtle inner glow.
- **Data Cards:** Cards must feature a `label-caps` header. Content should be padded by `md` (16px). Cards containing charts should have no internal horizontal padding for the chart element to maximize edge-to-edge visualization.
- **Inputs:** Dark backgrounds (#0F172A) with a 1px border. On focus, the border transitions to Electric Blue with a soft 2px outer glow.
- **Chips/Badges:** Use a "Tinted" style—semi-transparent background of the status color (e.g., 10% Emerald) with high-contrast text of the same color.
- **Log Viewer:** High-density list using `code-sm` typography. Alternating row highlights (zebra striping) at 2% opacity for better tracking of horizontal lines.
- **Kube-Status Indicators:** Small 8px circles with a "breathing" animation for active processes.
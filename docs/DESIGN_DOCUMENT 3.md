# Portfolio Design Document

**Version:** 1.2  
**Last updated:** February 2025  
**Status:** Living document — the reference point and guardrails for all design and build decisions in this project.

---

## 1. Purpose of this document

This document is the **single source of truth** for how the portfolio looks, feels, and behaves. It is aligned with Apple’s Human Interface Guidelines and the design philosophy of craft, clarity, and deference. Every page, component, and interaction should be checked against these principles and specifications before and during implementation.

**Use it to:**
- Evaluate new screens, components, and copy
- Resolve design and UX disagreements
- Onboard anyone contributing to the project
- Keep the experience consistent as the project grows

---

## 2. Design philosophy (Apple-aligned)

### 2.1 Core belief

> **“Design is not just what it looks like and feels like. Design is how it works.”**

Every decision should improve how the portfolio works for the visitor: finding work, understanding you, and taking the next step (contact, resume, etc.). Aesthetics support that; they are not the goal by themselves.

### 2.2 Three foundations (from Apple HIG)

| Foundation | Meaning | Application in this portfolio |
|------------|--------|-------------------------------|
| **Clarity** | Content and controls are legible and understandable at a glance. | Clear hierarchy, readable type, obvious primary actions. No decorative clutter that obscures meaning. |
| **Deference** | The interface defers to content. | Your work and words are the focus. UI (nav, buttons, chrome) supports without competing. |
| **Depth** | Hierarchy and relationships are communicated clearly. | Layering (e.g. modals, overlays), motion, and spacing show what’s primary, secondary, and in the background. |

### 2.3 Guardrail principles

- **Craft** — Quality in every detail, including states users might not notice at first (hover, focus, loading, error).
- **Empathy** — Design for real visitors: recruiters, peers, clients. Respect their time and context (mobile, desktop, accessibility).
- **Focus** — Fewer sections and elements; each must earn its place. Say no to nonessential features and visual noise.
- **Simplicity** — Prefer one clear path over many options. “Simple can be harder than complex.”
- **Impute** — First impression (loading, first screen, typography, spacing) signals care. Packaging and presentation matter.

### 2.4 Apple Design Pathway goals

Apple’s Design Pathway ([developer.apple.com/design/get-started](https://developer.apple.com/design/get-started)) states that design drives **experiences, impressions, and feelings**. The aim is to create experiences that are:

- **Welcoming** — Safe, approachable, easy to enter.
- **Empowering** — People can accomplish what they came for.
- **Gratifying** — The experience feels good and rewarding.

Apply this to the portfolio: simplify navigation and structure **without compromising personality**. Design is where everything starts—both how people view the portfolio and how they interact with it.

### 2.5 Human Interface Guidelines (HIG) structure

The HIG is organized into six areas. Use them as a mental checklist when designing or reviewing work:

| HIG area | What it covers | Portfolio use |
|----------|----------------|---------------|
| **Getting started** | Platform feel, first steps | Consistency across breakpoints and devices |
| **Foundations** | Layout, typography, color, materials, motion | §3–5, §7 in this doc |
| **Patterns** | Common actions and tasks | Navigation, project browsing, contact |
| **Components** | Buttons, menus, controls, etc. | §6 in this doc |
| **Inputs** | Touch, keyboard, pointer | §10–11 accessibility and responsive |
| **Technologies** | Platform features to integrate | Optional (e.g. PWA, share) |

**Source:** [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

### 2.6 Apple UI design do's and don'ts (official)

From [developer.apple.com/design/tips](https://developer.apple.com/design/tips/). These are non-negotiable guardrails.

| Topic | Do | Don't |
|-------|----|-------|
| **Formatting content** | Create a layout that fits the screen. Users should see primary content without zooming or scrolling horizontally. | Allow horizontal scroll or zoom for normal content. |
| **Touch controls** | Use UI elements designed for touch so interaction feels easy and natural. | Use mouse-only or tiny targets. |
| **Hit targets** | Create controls that measure **at least 44pt × 44pt** so they can be accurately tapped with a finger. | Use smaller tap/click areas. |
| **Text size** | Use text that’s **at least 11pt** (or equivalent) so it’s legible at typical viewing distance without zooming. | Use smaller body text. |
| **Contrast** | Ensure **ample contrast** between font color and background so text is legible. | Use low-contrast text. |
| **Spacing** | Give text room. Improve legibility with increased line height or letter spacing. | Let text overlap or feel cramped. |
| **High resolution** | Provide **high-resolution** versions of image assets (@2x, @3x or responsive `srcset` on web). | Use single-resolution images that look blurry on Retina. |
| **Distortion** | Display images at their **intended aspect ratio** to avoid distortion. | Stretch or squash images. |
| **Organization** | Create an easy-to-read layout that puts **controls close to the content they modify**. | Separate actions from the content they affect. |
| **Alignment** | **Align** text, images, and buttons to show how information is related. | Use inconsistent alignment. |

---

## 3. Typography

### 3.1 Principles

- **One primary typeface** for the portfolio. Prefer a single family with multiple weights rather than mixing families.
- **San Francisco (SF)** is Apple’s system font and the reference for proportion and clarity; on the web, choose a typeface that shares those qualities (clear, readable, neutral). Apple Design Resources offer [SF Pro](https://developer.apple.com/design/resources/) for download; [New York](https://developer.apple.com/design/resources/) is used as a complementary reading/display face.
- **Hierarchy through weight and size**, not through too many different fonts. Per HIG: use built-in or consistent text styles (e.g. Title, Headline, Body, Callout, Caption) and emphasize importance through weight, size, and color.
- **Minimum size:** Apple specifies at least 11pt for legibility at typical viewing distance; on web, ensure body text is at least ~11px equivalent and scales with user preferences (e.g. `clamp`, or 100% base with `rem`).

### 3.2 Scale (recommended)

Define a type scale and stick to it. Example (modular scale ~1.25):

| Use | Relative size | Role |
|-----|----------------|------|
| Hero / display | Largest | One main headline per page |
| H1 | — | Page title |
| H2 | — | Section title |
| H3 | — | Subsection / card title |
| Body | Base | Default text |
| Small / caption | Smallest | Metadata, labels, captions |

- **Line height:** At least 1.4 for body; 1.2–1.3 for headings.
- **Line length:** 45–75 characters per line for long-form text.
- **Contrast:** Meet WCAG AA (4.5:1 for normal text, 3:1 for large text).

### 3.3 Guardrails

- Do not introduce a new typeface without documenting it here and justifying it against “one primary typeface.”
- Do not use more than 3–4 sizes in a single view.
- Always define focus and hover states for interactive text (e.g. links).

---

## 4. Color

### 4.1 Principles

- **Deference:** Color supports content and hierarchy; it doesn’t dominate.
- **Restraint:** A small, intentional palette. Per HIG: choose a **limited, coordinated palette** that works on both light and dark backgrounds if you support both.
- **Interactivity:** Consider a **key color** to indicate interactivity (links, buttons, focus) throughout; avoid using the same color for both interactive and noninteractive elements so people can tell what’s tappable.
- **Accessibility:** Ample contrast between font and background (see §2.6). Test under different lighting; be aware of colorblindness—avoid red/green or blue/orange as the only way to convey meaning. All text/UI on colored or image backgrounds must meet WCAG contrast requirements.

### 4.2 Palette structure (to be filled in)

Define and document:

| Token | Purpose | Example / value |
|-------|--------|------------------|
| Background (primary) | Main canvas | e.g. `#FFFFFF` or off-white |
| Background (secondary) | Sections, cards | e.g. light gray |
| Text (primary) | Body, headings | e.g. near black |
| Text (secondary) | Supporting copy | e.g. gray |
| Accent | Links, primary buttons, key highlights | One consistent hue |
| Border / divider | Subtle separation | Light gray |
| Success / error / warning | Feedback only | Use sparingly |

- Prefer **semantic names** (e.g. `text-primary`, `accent`) in code, not raw hex in components.

### 4.3 Guardrails

- No new color without a defined role in the palette.
- No pure black (`#000000`) for large text blocks; use dark gray for comfort.
- Test palette in both light and dark mode if the portfolio supports it.

---

## 5. Spacing and layout

### 5.1 Principles

- **Generous whitespace** — Apple-like restraint: space is part of the design.
- **Consistent rhythm** — Use a spacing scale (e.g. 4px or 8px base) for margins, padding, and gaps.
- **Grid** — Layout on a grid (e.g. 8- or 12-column) for alignment and consistency.
- **HIG layout:** Primary content should be clear at default size without horizontal scrolling. Use **alignment** to show relationships between information. Place principal items with appropriate visual weight (e.g. upper half, leading side). Keep **controls close to the content they modify**. Minimum tappable area 44×44pt (see §2.6).

### 5.2 Spacing scale (example)

| Token | Value | Use |
|-------|--------|-----|
| xs | 4px | Tight in-component gaps |
| sm | 8px | Related elements |
| md | 16px | Default section padding |
| lg | 24px | Between sections |
| xl | 32px | Major section breaks |
| 2xl | 48px+ | Hero / page-level spacing |

- **Max-width for content:** Cap line length for readability (e.g. 720px–960px for main content).

### 5.3 Guardrails

- Do not use arbitrary spacing values; map to the scale.
- Keep consistent horizontal padding on small screens (e.g. 16px or 24px).

---

## 6. Components and patterns

### 6.1 Principles

- **Consistency** — Same action, same control (e.g. one primary button style).
- **Recognition over recall** — Familiar patterns (nav, links, buttons) so users don’t have to guess.
- **Feedback** — Every interactive element has a visible state (default, hover, focus, active, disabled).

### 6.2 Core components (to be specified)

Document each with:

- **Role** — When to use it.
- **Anatomy** — Label, icon, padding, border radius.
- **States** — Default, hover, focus, active, disabled, loading.
- **Accessibility** — Focus order, ARIA if needed, keyboard support.

Suggested list:

- Navigation (desktop and mobile)
- Primary and secondary buttons
- Links (inline and standalone)
- Cards (project, experience)
- Section headings
- Footer
- Forms (contact): inputs, textarea, submit

### 6.3 Guardrails

- No one-off components; reuse or extend the defined set.
- All interactive elements must be keyboard accessible and have visible focus.
- Touch targets: minimum 44×44px (Apple HIG).

---

## 7. Motion and interaction

### 7.1 Principles

- **Purposeful** — Motion clarifies hierarchy and change (e.g. opening a project, showing/hiding nav).
- **Subtle** — Short durations (e.g. 200–400ms); avoid flashy or distracting animation.
- **Respect preferences** — Honor `prefers-reduced-motion` (disable or simplify nonessential motion).

### 7.2 Guidelines

- **Transitions:** Use for state changes (hover, open/close, route change).
- **Loading:** Use a consistent, minimal indicator; avoid blocking the whole screen when possible.
- **Scroll:** Optional subtle effects (e.g. fade-in) only if they add clarity, not decoration.

### 7.3 Guardrails

- No auto-playing video or heavy animation that can’t be paused or reduced.
- Document any custom motion in this section or in a separate “Motion” addendum.

---

## 8. Imagery and media

### 8.1 Principles

- **Quality** — High-resolution, sharp, purposeful. No blurry or placeholder-heavy visuals in final release.
- **Resolution (from Apple UI tips):** Provide high-resolution versions of image assets. On Retina displays, images that aren’t @2x/@3x (or responsive `srcset`/`sizes` on web) will appear blurry. Use responsive images and appropriate pixel density.
- **Aspect ratio:** Always display images at their **intended aspect ratio** to avoid distortion. Don’t stretch or squash.
- **Deference** — Imagery supports the narrative (projects, you); it doesn’t overpower text and structure.
- **Performance** — Appropriate formats (e.g. WebP/AVIF where supported), sizing, and lazy-loading.

### 8.2 Guardrails

- Define max dimensions and compression for project images.
- Always provide `alt` text for meaningful images.
- Prefer a consistent aspect ratio or crop style for project thumbnails and hero images.

---

## 9. Content and voice

### 9.1 Principles

- **Clarity** — Short sentences; one idea per paragraph where possible.
- **Confidence without arrogance** — Clear about what you did and what you offer.
- **Scannable** — Headings, short paragraphs, and lists so key points are easy to find.

### 9.2 Guardrails

- No lorem ipsum in production; real or clearly marked placeholder copy only.
- Contact and CTA copy must be explicit (e.g. “Email me,” “Download résumé”).
- Keep meta titles and descriptions concise and consistent with the page content.

---

## 10. Accessibility

### 10.1 Standards

- **WCAG 2.1 Level AA** as the target for the portfolio.
- **Keyboard** — Full use without a mouse (tab order, visible focus, no keyboard traps).
- **Screen readers** — Semantic HTML, ARIA only when necessary, sensible heading order.

### 10.2 Checklist (per screen)

- [ ] Heading hierarchy (one H1, logical H2/H3).
- [ ] Sufficient color contrast for all text and UI.
- [ ] Focus visible on all interactive elements.
- [ ] Images have appropriate `alt` text.
- [ ] Forms have labels and clear error messages.
- [ ] `prefers-reduced-motion` respected.

---

## 11. Responsive behavior

### 11.1 Principles

- **Mobile-first** — Start from small viewports; add complexity for larger screens.
- **One experience** — Same content and actions across breakpoints; layout and density adapt.
- **Touch-friendly** — 44×44px minimum touch targets; adequate spacing between tappable elements.

### 11.2 Breakpoints (to be defined)

Document breakpoints and what changes at each (e.g. nav pattern, columns, font sizes):

| Name | Min width | Notes |
|------|-----------|--------|
| sm | — | e.g. 640px |
| md | — | e.g. 768px |
| lg | — | e.g. 1024px |
| xl | — | e.g. 1280px |

### 11.3 Guardrails

- No horizontal scroll for normal content.
- Test at real device sizes (e.g. 375px, 768px, 1440px).
- Navigation must work on touch and keyboard at every breakpoint.

---

## 12. Technical alignment (optional)

If the project uses a framework or design tokens:

- **Design tokens** — Map this document’s typography, color, and spacing to tokens (CSS variables, theme object, etc.) so code and design stay in sync.
- **Component library** — If you use one, document which components map to which items in Section 6.
- **Documentation** — Link from this doc to any Storybook, Figma, or style guide that implements these rules.

---

## 13. Apple design resources (official)

Use these as reference and for assets. All URLs from [developer.apple.com/design](https://developer.apple.com/design/).

| Resource | URL | Use for portfolio |
|----------|-----|-------------------|
| **Human Interface Guidelines** | [developer.apple.com/design/human-interface-guidelines](https://developer.apple.com/design/human-interface-guidelines/) | Authority on layout, typography, color, components, accessibility, motion. |
| **UI design do's and don'ts** | [developer.apple.com/design/tips](https://developer.apple.com/design/tips/) | Quick checklist (formatting, touch, hit targets, text, contrast, spacing, images, organization, alignment). |
| **Design Pathway (get started)** | [developer.apple.com/design/get-started](https://developer.apple.com/design/get-started/) | Design philosophy, HIG overview, videos (qualities of great design, essential principles, foundations). |
| **Apple design resources** | [developer.apple.com/design/resources](https://developer.apple.com/design/resources/) | **Fonts:** SF Pro, SF Compact, New York, SF Mono (and others). **UI kits:** Figma/Sketch for iOS, iPadOS, macOS, watchOS, visionOS, tvOS. **SF Symbols:** 6,900+ symbols; nine weights, three scales. **Templates:** App icons, product bezels, technology badges. Use fonts and icon style as inspiration for web typography and iconography. |
| **New design gallery** | [developer.apple.com/design/new-design-gallery](https://developer.apple.com/design/new-design-gallery/) | See the new design (and Liquid Glass) in action in real apps; content focus, toolbars, edge-to-edge, touch targets. |
| **What's new in design** | [developer.apple.com/design/whats-new](https://developer.apple.com/design/whats-new/) | Latest HIG updates, new guidance (Typography, Color, Layout, Materials, Motion, Buttons, etc.), videos, articles. |
| **Design videos** | [developer.apple.com/videos/design](https://developer.apple.com/videos/design/) | WWDC design sessions (e.g. design foundations, Liquid Glass, icon design, iPad design). |

**Web portfolio note:** UI kits and Icon Composer target native apps. For this project, use the HIG and do's/don'ts as guardrails; use Apple fonts only where licensing allows (e.g. SF Pro for mockups); on the live site, choose web-safe or licensed typefaces that match SF’s clarity and proportions. SF Symbols can inspire icon style; use a web icon set (e.g. SF Symbols if available for web, or a similar system) for consistency.

---

## 14. Design in action (from Apple’s new design gallery)

Apple’s [New Design Gallery](https://developer.apple.com/design/new-design-gallery/) shows how apps apply the new design and materials. These lessons apply to the portfolio:

- **Content first** — Put the focus squarely on content (e.g. brand photography, project imagery, data). Let content “shine through”; avoid chrome that competes. Example: “The app’s familiar branding moves from the top toolbar into the content layer, letting content shine through the controls.”
- **Controls that support, not dominate** — Toolbars and nav can move or simplify to give more space to content. Consider bottom or edge-aligned primary actions so the main area stays about the work.
- **Edge-to-edge when it helps** — More space for content (e.g. project grid, case studies) by reducing heavy headers or moving them off the main canvas (e.g. scroll-edge effects).
- **Touch targets and spacing** — “More comfortable tap targets, increased UI size and spacing” improve usability. Align with the 44×44pt minimum and generous spacing scale.
- **Fewer tools at once** — “Minimize the number of tools that are exposed at any given time.” In the portfolio: simple nav, one primary CTA per section, avoid crowded toolbars or too many buttons.
- **Familiar patterns** — Tab bars, popovers, and bottom navigation feel “instantly familiar.” Use recognizable patterns (nav, links, buttons) so visitors don’t have to learn new interactions.
- **Personality without clutter** — “Simplify navigation without compromising personality.” The portfolio can have a clear voice and visual identity while staying clear and focused.

Use these as inspiration when making layout and component decisions; when in doubt, prefer content focus and clarity over decorative UI.

---

## 15. Apple.com as inspiration

[Apple.com](https://www.apple.com/) is a primary reference for how to apply Apple’s design philosophy on the web. Use it for layout, hierarchy, and tone—not for copying. The following patterns are drawn from the live site and design commentary; treat them as **inspiration and guardrails** for the portfolio.

### 15.1 One idea per view

- **Principle:** If a section can’t be summarized in one sentence, too much is on screen. One clear subject per hero or block.
- **Apple.com:** Homepage and product pages (e.g. [iPhone](https://www.apple.com/iphone/)) use full-bleed sections: one product or message, one headline, minimal supporting copy, then scroll to the next.
- **Portfolio use:** One hero message per page; one project or theme per section. Avoid stacking multiple competing headlines or CTAs in a single viewport.

### 15.2 Generous white space and clarity

- **Principle:** “Less is more.” Clean layouts, substantial white space, simple navigation. Remove distractions so content feels high-end and purposeful.
- **Apple.com:** Large margins, clear separation between sections, no visual clutter. Typography and spacing create hierarchy; bold type and high contrast draw attention to key subjects.
- **Portfolio use:** Match the spacing scale (§5). Don’t fill every pixel. Let project imagery and key copy breathe.

### 15.3 Hero and section structure

- **Principle:** Full-bleed or near full-bleed for impact; one primary CTA with an optional secondary (e.g. “Learn more” / “Buy” → “View work” / “Contact”).
- **Apple.com:** Hero = short headline + product or key visual + “Learn more” / “Shop” / “Buy.” Product pages use repeated blocks: headline, benefit line, imagery, clear CTAs.
- **Portfolio use:** Hero = who you are / what you do + one primary action (e.g. “View work” or “Get in touch”). Project sections: project title, one-line value, image, “View case study” or link. No more than two actions per block.

### 15.4 Typography and hierarchy

- **Principle:** One primary typeface (Apple uses San Francisco); hierarchy through **weight and size**, not through many different fonts. Every choice serves a purpose.
- **Apple.com:** SF across the site; large, confident headlines; restrained body copy; clear distinction between title, subtitle, and caption.
- **Portfolio use:** One primary typeface (§3). Use weight and size to signal importance (e.g. one hero size, one section title size, one body size per view). Avoid decorative or competing typefaces.

### 15.5 Imagery: quality and focus

- **Principle:** High-quality, high-resolution imagery; edge-to-edge or large when it’s the focus. Images at intended aspect ratio; no distortion.
- **Apple.com:** Product shots fill the viewport or large areas; multiple angles/colors where relevant; imagery is the hero, copy supports it.
- **Portfolio use:** Project and about imagery as the hero where appropriate. One strong image per project card or section. @2x/@3x or responsive images; correct aspect ratio (§8).

### 15.6 Scroll and narrative flow

- **Principle:** Linear scroll as narrative: scroll → discover → desire → act. Reduces decision fatigue compared to grids of equal-weight tiles.
- **Apple.com:** Single-scroll storytelling on key pages; each section reveals one idea, building toward a CTA. Product lineups use clear blocks (e.g. iPhone 17 Pro, iPhone Air) with consistent pattern: name, tagline, visual, “Learn more” / “Buy.”
- **Portfolio use:** Homepage and project pages can follow a clear scroll order: intro → work → about → contact. Project list or grid can be dense, but each project detail can be a short, linear story (context → challenge → solution → outcome → CTA).

### 15.7 Navigation and chrome

- **Principle:** Simple, predictable nav; chrome supports content and doesn’t compete. Top or minimal global nav with clear categories.
- **Apple.com:** Global nav with product/category dropdowns; Search, Bag, Support. Minimal persistent UI so the main canvas stays about products and messaging.
- **Portfolio use:** Simple global nav (e.g. Work, About, Contact or equivalent). No heavy toolbars or multiple sticky bars. Footer for secondary links (e.g. LinkedIn, resume, email) if needed.

### 15.8 Summary: leverage Apple.com

| Pattern | Use in portfolio |
|--------|-------------------|
| One idea per view | One message per hero/section; avoid clutter. |
| Generous white space | Apply spacing scale; let content breathe. |
| Hero + primary CTA | One headline, one main action, optional secondary. |
| Type hierarchy | One font family; weight/size for hierarchy. |
| Imagery as hero | Strong project/portrait imagery; high-res, correct ratio. |
| Scroll narrative | Linear flow: discover → understand → act. |
| Minimal chrome | Simple nav; content first. |

**Reference:** [apple.com](https://www.apple.com/), [apple.com/iphone](https://www.apple.com/iphone/) (and other product pages). Revisit when defining new page types or section patterns to keep the portfolio aligned with this standard of clarity and restraint.

---

## 16. Document maintenance

- **Owner:** Project lead / design lead.
- **Updates:** Change the version and “Last updated” at the top; add a short changelog below if helpful.
- **Review:** Revisit when adding a new section of the portfolio, a new component type, or a new platform (e.g. dark mode).
- **Conflicts:** When in doubt, this document overrides ad hoc decisions. If something here is wrong or outdated, update the document first, then the implementation.

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | February 2025 | Initial design document. Philosophy, foundations, typography, color, spacing, components, motion, imagery, content, accessibility, responsive, and maintenance. |
| 1.1 | February 2025 | Research from developer.apple.com/design: Apple Design Pathway goals (§2.4), HIG structure (§2.5), official UI do's and don'ts (§2.6). Enriched typography, color, layout, and imagery with HIG/tips. Added §13 Apple design resources (official links), §14 Design in action (new design gallery takeaways). |
| 1.2 | February 2025 | Added §15 Apple.com as inspiration: one idea per view, white space, hero/CTA structure, typography hierarchy, imagery, scroll narrative, minimal chrome. Portfolio can use apple.com as reference for layout and tone. |

---

*This document is the design reference and guardrails for the portfolio project. All design and implementation decisions should align with it.*

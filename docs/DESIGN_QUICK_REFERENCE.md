# Design quick reference — portfolio guardrails

Use this with [DESIGN_DOCUMENT.md](./DESIGN_DOCUMENT.md). When in doubt, open the full document.

---

## Philosophy in one line

**Design is how it works.** Clarity, deference, depth. Your work is the hero; the UI supports it. Aim for **welcoming, empowering, gratifying** experiences (Apple Design Pathway).

---

## Apple UI do's and don'ts (from developer.apple.com/design/tips)

| Do | Don't |
|----|-------|
| Layout fits screen; primary content without horizontal scroll/zoom | Horizontal scroll or zoom for normal content |
| Touch-friendly UI; **44pt × 44pt** minimum hit targets | Small or mouse-only targets |
| Text **≥11pt** equivalent; ample **contrast**; line height/letter spacing so text doesn’t overlap | Tiny text; low contrast; cramped text |
| **High-res** images (@2x/@3x or responsive `srcset`); **correct aspect ratio** | Blurry or distorted images |
| **Controls close to content** they modify; **align** to show relationships | Scattered layout; inconsistent alignment |

---

## Before you add anything

- [ ] Does it make the experience **clearer** or **simpler**?
- [ ] Does the **content** stay the focus (deference)?
- [ ] Is it **consistent** with existing type, color, spacing, and components?
- [ ] Is it **accessible** (contrast, focus, keyboard, alt text)?
- [ ] Would it pass the **“finish the back of the drawer”** test (craft)?

---

## Do

- One primary typeface; use weight and size for hierarchy
- A small, defined color palette with semantic names
- A spacing scale (e.g. 4/8/16/24/32/48) — no random values
- Reuse defined components; document new ones
- 44×44px minimum touch targets
- Visible focus and hover for every interactive element
- Honor `prefers-reduced-motion`
- Real or clearly marked placeholder copy only

---

## Don’t

- Add a new font or color without documenting it
- Let UI compete with content (deference)
- Use arbitrary spacing or one-off components
- Ship lorem ipsum or missing alt text
- Introduce motion that can’t be reduced or skipped
- Add features that don’t serve the portfolio’s purpose

---

## Three foundations (Apple HIG)

| Clarity | Deference | Depth |
|--------|-----------|--------|
| Legible, understandable | Content first; UI supports | Clear hierarchy and layers |

---

## Checklist before shipping a screen

- [ ] One H1; logical heading order
- [ ] Contrast and touch targets (44×44pt min)
- [ ] Focus visible; keyboard usable
- [ ] Alt text on meaningful images
- [ ] Spacing from scale; colors from palette
- [ ] No horizontal scroll on small viewports
- [ ] Images high-res and correct aspect ratio

---

## Apple.com as inspiration

Use [apple.com](https://www.apple.com/) and product pages (e.g. [iPhone](https://www.apple.com/iphone/)) as reference for:

- **One idea per view** — One message per hero/section; no clutter.
- **Generous white space** — Let content breathe; use the spacing scale.
- **Hero + one primary CTA** — One headline, one main action (e.g. “View work” / “Contact”).
- **Imagery as hero** — Strong project imagery; high-res, correct aspect ratio.
- **Scroll narrative** — Linear flow: discover → understand → act.
- **Minimal chrome** — Simple nav; content first.

---

## Apple design resources (official)

- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [UI design do's and don'ts](https://developer.apple.com/design/tips/)
- [Design Pathway (get started)](https://developer.apple.com/design/get-started/)
- [Apple design resources](https://developer.apple.com/design/resources/) (fonts, SF Symbols, UI kits, templates)
- [New design gallery](https://developer.apple.com/design/new-design-gallery/) (design in action)
- [What's new in design](https://developer.apple.com/design/whats-new/)
- **[Apple.com](https://www.apple.com/)** — Web design reference (layout, hierarchy, tone)

---

*Full rules, rationale, and specs: [DESIGN_DOCUMENT.md](./DESIGN_DOCUMENT.md).*

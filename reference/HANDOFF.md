# Cortex v2 — Handoff Notes

Mockup of a clone of "TheBrain 7" (desktop knowledge-graph app), built as a single Design Component: `Cortex v2.dc.html`. Read that file directly — this note is orientation, not a spec.

## Architecture
One DC: `<x-dc>` template (`b_dc_html`) + `Component extends DCLogic` class (`c_dc_js`). No child DCs. All styling inline, chrome colors routed through CSS custom properties (`var(--bg)`, `var(--accent)`, etc.) defined per-theme on the outermost wrapper's `style` object (see `themePresets` + `renderVals()`'s `wrapperStyle`) so Options → Set Theme re-skins everything live.

## What's built
- Menu bar (File/Edit/Thought/View/Options/Window/Help) with real dropdown + flyout submenus, checkable/toggle items, keyboard-shortcut display.
- Dialogs: New Brain, Open/Merge Brain (fake file browser), Login, Google Calendar, Rename Brain, Create BrainZip, Print/Print Settings/Page Setup, Crawl Brain, Create Tag/Thought Type, Add Attachment, Thought Types Window, full 8-tab Preferences (General/Look&Feel/UI/Views/Search/Colors/Advanced/Accelerators).
- Resizable Notes / Thought split panels (drag handles), Thought panel tabs (Thought/Tags/Search/Reports/Calendar).
- **Plex graph system** (the core interactive piece):
  - `thoughtsData` (plain object, keyed by id) holds `{title, type, notes, tags, parents:[ids], children:[ids]}`. Mutated directly, then a `setState` triggers re-render.
  - Only the **active node** (`state.selectedId`) plus its **direct parents** (row above) and **direct children** (row below) render — matches real TheBrain's single-level Plex view. Grandchildren aren't shown until you click into that child. This is by design, not a bug, but reads as "nodes disappearing" if you expect a persistent multi-level tree — worth surfacing to the user if it keeps confusing them.
  - Dot schema (deliberately constrained by the user): **top dot = has a parent**, **bottom dot = has children / drag from here to create one**. No left/right dots, ever.
  - Creating a child: mousedown on any node's bottom dot → drag (bezier preview line, curved via `bezierPath()`) → mouseup opens a draggable "Create Child" popup at the drop point → confirm creates the thought as a child of whichever node's dot was dragged (`state.dragParentId`, not necessarily the active node).
  - All curve endpoints are measured live via `getBoundingClientRect()` on ref'd dot elements (`measureParentLink()` in `componentDidUpdate`), not computed offsets — this was hard-won; don't revert to formula-based positions.

## Known rough edges
- **Stale in-session state**: incremental hot-reloads preserve the component instance, so `thoughtsData` (a class field, not React state) accumulates across a long session and can hold entries created under older logic. A genuinely fresh load (new tab, not just Ctrl+Shift+R on a long-lived one) clears it back to just the default root thought.
- Preferences → Colors tab is static swatches, not yet wired to the live theme CSS variables.
- Create Child dialog's "Type"/"Tags" buttons are placeholders (future upgrade, per user).
- No jump-link dot/UI yet.

## Working style this user wants
Small, literal, incremental changes — confirm exact intent before big structural moves, don't redesign unasked-for parts, and when something looks reverted/inconsistent, re-read the actual file rather than assuming.

# Delegation: TB7-Professional functional GUI into Electron (Phase 1, GUI shell)

From: CDA_Consilium_III_a.
To: the assigned Warp (WTA_Labor_III_a) implementation instance.
Date: 2026.10.01.22.07.

## Read this first: the central problem

Nelson needs one thing from this phase: a functional, navigational GUI that
reproduces TheBrain 7 Professional's interface. Functional means the interface
responds. Click a menu-bar item and the menu opens. Click a menu option and its
dialog opens. Drag the canvas, (the Plex,) and the workspace pans. The two
workspace panels, (Notes/annotations and Attachments,) are present and respond.

This specification exists because, across many months and several AI instances,
the interface behavior Nelson needs has not been delivered. The recurring
failure was not coding skill. It was that each new instance proposed a different
modern technology or a stack change instead of building the specified behavior
on the stack already chosen. Do not repeat that failure. This document settles
the stack and the scope so you can build, not re-litigate.

## Standing directive: the stack is settled, do not propose alternatives

The stack for Mnemosyne is: Electron shell, JavaScript renderer, SQLite for
data, (SQLite is Phase 2, see below). This is decided and is not open for
discussion in this phase.

Explicitly ruled out, and not to be proposed: Vue.js, VUE (Visual Understanding
Environment), Java/JavaFX/Swing, tldraw, and any other framework, library, or
platform swap. If you believe a tool would help, note it in one line in your
handback for Nelson's later consideration and then proceed with the settled
stack regardless. Do not pause the work to advocate a stack change, and do not
build on one.

The directory name `GUI_to_Electron` describes the job literally: take a GUI and
encapsulate it in Electron. It does not mean Vue.js and does not mean VUE. The
folder was earlier named `Vue_to_Electron`; it was renamed precisely to remove
that ambiguity.

## Source and target

Source, (the mockup to encapsulate):
`D:\Claude Design\TheBrain 7 (clone) (2026.08.11.)\UI mockups request pending Ver 1. (js) 2026.08.14`.
This is the HTML/JS mockup produced by Claude Design, evolving toward a React
front-end. Treat it as the authoritative definition of appearance, structure,
labels, and intended behavior. Read it fully before building.

Target, (where this phase's app is built):
`D:\Claude Design\TheBrain 7 (clone) (2026.08.11.)\GUI_to_Electron`.

Reference for the full GUI surface: TheBrain 7 Professional as documented on
TheBrain's website, and as realized in the Claude Design mockup. Where the
mockup and the website agree, the mockup wins, because it is the concrete source.

## Scope of this phase: a functional GUI shell

Build an Electron application whose entire GUI is navigable and responsive, with
no real data behind it yet. Every interactive control works. Where real data
would appear, use stubs or placeholder content. The goal Nelson stated: to see
and click through a working interface, where every action produces its visible
response.

Behaviors that define "functional" for this phase:

- Menu-bar. Each top-level menu, (File, Edit, Thought, View, Options, Window,
  Help,) opens on click. Each menu shows its items with correct labels, order,
  submenus, and toggle/radio marks, matching the mockup's menu definitions.
- Menu items open their dialogs. Clicking a menu item that should open a dialog
  opens that dialog. Build the dialog markup and make it open, close, and accept
  focus. Fields need not be backed by data; they render and respond. This covers
  the full TB7 dialog set present in the mockup, including the multi-tab
  Preferences dialog and the generic file-browser dialog reused for several
  actions.
- The Plex canvas pans. Dragging the canvas with the mouse moves the workspace.
  The canvas may show placeholder nodes; what must work is the pan interaction
  and the canvas being a live surface, not a static image.
- Workspace panels present and responsive. The Notes/annotations panel and the
  Attachments panel exist in the layout, can be focused, and respond to
  interaction, (a Notes text area accepts typing; an Attachments panel shows its
  controls). Backing these with real notes/attachments data is Phase 2.
- Toasts and status feedback. Where the mockup shows a toast or status message
  for an action, wire it so the feedback appears.
- Anything in the mockup marked as not-yet-backed. Stub it with a visible
  "not implemented yet" response rather than leaving it dead, so Nelson can tell
  the control is wired but unbacked.

The test of done for this phase: Nelson can open the app and click through the
entire GUI, and every control produces its visible response, (a menu, a dialog,
a pan, a panel reaction, a toast, or an explicit stub message). Nothing is inert.

## Explicitly deferred to Phase 2, do not build now

These are known, specified, and intentionally out of scope for this phase. Do
not build them yet, and do not reinvent them; they are handled when the GUI is
navigable and Nelson revisits data binding.

- SQLite data binding and the IPC layer that connects the renderer to it.
- The ego-graph fetch, (loading one node's parents/children/jumps on focus).
- The focal-node layout math and the glide/bloom animation, (see Appendix).
- Real notes, tags, types, attachments, and search results.

Build the GUI so these can be wired in later without restructuring: keep data
access behind a clear seam, (stub functions the GUI calls, to be replaced by
real IPC in Phase 2,) rather than hard-coding placeholder content directly into
the interface.

## Tooling note

Warp is an appropriate and recommended environment for this: it works on the
real filesystem, scaffolds the Electron project, installs dependencies, and
iterates on actual files. This is the same environment the project's prior
verified work came from. The standing directive above applies here regardless of
tool.

## Handback expected

When the GUI shell is navigable, return to Nelson: confirmation that each
behavior above works; a short list of any mockup elements that were ambiguous or
missing and how they were handled; and the location of the stub seam where Phase
2 data binding will connect. Keep any stack-change opinions to a single line for
later, per the standing directive.

## Appendix: Phase 2 reference, (deferred, not this phase)

Preserved here so the specification is not lost before Phase 2. Do not implement
in Phase 1. This is the focal-node data-and-animation behavior that makes the
Plex feel like TB7, drawn from a reference design document and from validated
prior work. It is language-agnostic and ports to JavaScript/Electron directly;
no Java is involved despite the reference's original framing.

Data schema, (SQLite): nodes, (id, label, color, icon, created_at); links, (id,
source_id, target_id, link_type), where link_type 1 is parent/child with
source-as-parent and target-as-child, and link_type 2 is a jump. Index links on
source_id and target_id.

Ego-graph fetch: on selecting the active node, query only its neighborhood:
parents, (link_type 1 where active is target); children, (link_type 1 where
active is source); jumps, (link_type 2 either direction); siblings, (optional:
other children of the active node's parents). Never load the whole graph into
layout memory.

Radial (Normal) layout math: active node at canvas center. Children fan
horizontally below center, parents fan horizontally above center, with spacing
= min(S_max, W_visible / (n+1)) and x_i = X_c + (i - (n-1)/2) * spacing, plus a
small arc-factor curve on the vertical offset. Jumps in a vertical column to the
left of center, siblings to the right.

Glide/bloom animation, (the defining TB7 feel): on clicking a neighbor, it
becomes the active node. Nodes already on screen keep their current position as
the animation start. Newly appearing nodes start at the clicked node's center at
opacity 0 and bloom outward. Interpolate over 250 to 350 ms with an ease-out
cubic, alpha = 1 - (1 - t)^3, using requestAnimationFrame. This replaces the
Java reference's Swing/JavaFX timer one-for-one.

Link rendering, (validated prior work, port verbatim): cubic Bezier with control
points pulled 30% of the horizontal span toward the far end and 20% of the
vertical span, which keeps the tangent leaving each endpoint smooth. Endpoints
come from the layout engine's computed node positions, never from DOM
measurement. The prior mockup measured endpoints from the live DOM and divided
by the zoom scale to reconcile coordinate spaces; that machinery must not be
carried into the Electron Plex, because the layout engine owns positions in one
coordinate space and the camera owns the transform.

Presentation modes: TB7 has Normal, (radial, above,) and Outline, (active node
centered, parents as upper-left context, children in an indented cascade, with
node-driven lazy expansion and a menu-driven expand-all). Both consume the same
graph and the same ego-fetch; they are two layout functions writing into one
position set that the renderer draws.

CDA_Consilium_III_a — 2026.10.01.

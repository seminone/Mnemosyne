/**
 * dataApi.js — Phase 2 seam
 * ----------------------------
 * The GUI calls only these functions for graph/notes/attachments data.
 * Phase 1 returns in-memory stubs. Phase 2 replaces the bodies with
 * Electron IPC → main process → SQLite (see delegation appendix).
 *
 * Do not hard-code placeholder content into UI components beyond what
 * these functions return.
 */

const STUB_NOTE =
  'Phase 1 stub notes. Type here — local only until Phase 2 SQLite binding.';

/** @type {Record<string, { title: string, type: string, notes: string, tags: string[], parents: string[], children: string[], jumps?: string[] }>} */
let thoughtsStore = {
  main: {
    title: 'Mnemosyne',
    type: 'Untyped',
    notes: STUB_NOTE,
    tags: ['research', 'stub'],
    parents: ['root'],
    children: ['child_a', 'child_b', 'child_c'],
    jumps: ['jump_x'],
  },
  root: {
    title: 'Home',
    type: 'Untyped',
    notes: '',
    tags: [],
    parents: [],
    children: ['main'],
    jumps: [],
  },
  child_a: {
    title: 'Roadmap Q3',
    type: 'Untyped',
    notes: '',
    tags: [],
    parents: ['main'],
    children: [],
    jumps: [],
  },
  child_b: {
    title: 'Sarah Chen',
    type: 'Person',
    notes: '',
    tags: [],
    parents: ['main'],
    children: [],
    jumps: [],
  },
  child_c: {
    title: 'Redis Cluster',
    type: 'Untyped',
    notes: '',
    tags: [],
    parents: ['main'],
    children: ['grandchild_1'],
    jumps: [],
  },
  grandchild_1: {
    title: 'Latency Budget',
    type: 'Untyped',
    notes: '',
    tags: [],
    parents: ['child_c'],
    children: [],
    jumps: [],
  },
  jump_x: {
    title: 'Onboarding Flow v2',
    type: 'Untyped',
    notes: '',
    tags: [],
    parents: [],
    children: [],
    jumps: ['main'],
  },
};

/** @type {{ id: string, name: string, kind: string }[]} */
let attachmentsStore = [
  { id: 'att_1', name: 'Briefing.pdf', kind: 'Handbook Document' },
  { id: 'att_2', name: 'Screenshot.png', kind: 'Capture Image' },
];

export function getThought(id) {
  return thoughtsStore[id] ? { ...thoughtsStore[id], id } : null;
}

export function getAllThoughts() {
  const out = {};
  for (const [id, t] of Object.entries(thoughtsStore)) {
    out[id] = { ...t };
  }
  return out;
}

/**
 * Ego-graph neighborhood for the active node.
 * Phase 2: SELECT parents/children/jumps from links table — never full graph layout.
 */
export function fetchEgoGraph(activeId) {
  const node = thoughtsStore[activeId] || thoughtsStore.main;
  const id = thoughtsStore[activeId] ? activeId : 'main';
  const mapIds = (ids) =>
    (ids || [])
      .map((nid) => {
        const n = thoughtsStore[nid];
        return n ? { id: nid, title: n.title, type: n.type } : null;
      })
      .filter(Boolean);

  return {
    active: { id, title: node.title, type: node.type, notes: node.notes, tags: [...(node.tags || [])] },
    parents: mapIds(node.parents),
    children: mapIds(node.children),
    jumps: mapIds(node.jumps),
  };
}

export function renameThought(id, title) {
  if (!thoughtsStore[id]) return false;
  thoughtsStore[id] = { ...thoughtsStore[id], title };
  return true;
}

export function updateThoughtNotes(id, notes) {
  if (!thoughtsStore[id]) return false;
  thoughtsStore[id] = { ...thoughtsStore[id], notes };
  return true;
}

export function createChildThought(parentId, title) {
  const parent = thoughtsStore[parentId];
  if (!parent) return null;
  const id = `n_${Date.now()}`;
  thoughtsStore[id] = {
    title,
    type: 'Untyped',
    notes: '',
    tags: [],
    parents: [parentId],
    children: [],
    jumps: [],
  };
  parent.children = [...(parent.children || []), id];
  return { id, ...thoughtsStore[id] };
}

export function listAttachments(thoughtId) {
  // Phase 1: shared stub list. Phase 2: filter by thought_id in SQLite.
  void thoughtId;
  return attachmentsStore.map((a) => ({ ...a }));
}

export function addAttachmentStub(thoughtId, name, kind) {
  void thoughtId;
  const row = { id: `att_${Date.now()}`, name, kind };
  attachmentsStore = [...attachmentsStore, row];
  return row;
}

/**
 * UI prefs that will later live inside a .brain (or sidecar) on load/save.
 * Phase 1: in-memory + localStorage so splitter position survives reloads.
 * Phase 2 / .brain loader should call getUiPrefs/setUiPrefs (or merge these keys).
 */
const UI_PREFS_STORAGE_KEY = 'mnemosyne.uiPrefs';
const DEFAULT_UI_PREFS = {
  /** Fraction of the docked bottom row width owned by the Thought pane (0..1). Default 50/50. */
  thoughtSplitRatio: 0.5,
};

function readStoredUiPrefs() {
  try {
    if (typeof localStorage === 'undefined') return {};
    const raw = localStorage.getItem(UI_PREFS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

let uiPrefsStore = { ...DEFAULT_UI_PREFS, ...readStoredUiPrefs() };

function clampThoughtSplitRatio(r) {
  const n = Number(r);
  if (!Number.isFinite(n)) return DEFAULT_UI_PREFS.thoughtSplitRatio;
  return Math.min(0.85, Math.max(0.15, n));
}

export function getUiPrefs() {
  return {
    ...uiPrefsStore,
    thoughtSplitRatio: clampThoughtSplitRatio(uiPrefsStore.thoughtSplitRatio),
  };
}

export function setUiPrefs(partial = {}) {
  const next = { ...uiPrefsStore, ...partial };
  if (partial.thoughtSplitRatio != null) {
    next.thoughtSplitRatio = clampThoughtSplitRatio(partial.thoughtSplitRatio);
  }
  uiPrefsStore = next;
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(UI_PREFS_STORAGE_KEY, JSON.stringify(uiPrefsStore));
    }
  } catch {
    /* ignore quota / private mode */
  }
  return getUiPrefs();
}

/** Marker so handback / tooling can locate the seam. */
export const PHASE2_SEAM = {
  module: 'src/dataApi.js',
  replaceWith: 'IPC to electron/main → SQLite',
  functions: [
    'getThought',
    'getAllThoughts',
    'fetchEgoGraph',
    'updateThoughtNotes',
    'createChildThought',
    'listAttachments',
    'addAttachmentStub',
    'getUiPrefs',
    'setUiPrefs',
  ],
  uiPrefsForBrainLoad: ['thoughtSplitRatio'],
};

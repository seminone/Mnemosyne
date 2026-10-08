import React from 'react';
import renderTemplate from './template.jsx';
import * as dataApi from './dataApi.js';

export default class Cortex extends React.Component {
  state = {
    openMenu: null, openSubmenu: null, dialog: null,
    thoughtTab: 'thought', selectedId: 'main', scale: 1, bottomHeight: 246, thoughtWidth: 420,
    panX: 0, panY: 0, panning: false, panOrigin: null,
    forms: {}, toast: null, notesDraft: '',
    dragging: false, dragFrom: { x: 0, y: 0 }, dragTo: { x: 0, y: 0 }, showCreateChild: false, createChildPos: { x: 0, y: 0 }, newChildName: '', linkPaths: '',
    nodeOffsets: {},
    nodeDrag: null,
    contextMenu: null,
    renameDraft: '',
    plexSearch: '',
    panelSearch: '',
    notesPanel: { visible: true, mode: 'docked', x: 80, y: 120, w: 520, h: 280 },
    thoughtPanel: { visible: true, mode: 'docked', x: 640, y: 120, w: 420, h: 320 },
    dialogBox: { x: 0, y: 0, w: 0, h: 0 },
    toggles: { showToolbar: true, advancedToolsLayout: true, spellcheck: true, wander: false,
      alwaysOnTop: false, float: true, autoHideLeft: false, autoHideRight: false, autoHideTop: false, autoHideBottom: false, presentationMode: false, transparentMode: false },
    radios: { arrangeBy: 'name', theme: 'default', dictionary: 'en-us' },
  };
  GITHUB_PROJECT_URL = 'https://github.com/seminone/Mnemosyne';

  contributors = [
    { name: 'Nelson', role: 'Human operator / project lead — architecture direction, acceptance testing, and stewardship of Mnemosyne.' },
    { name: 'CDA_Consilium_III_a', role: 'CDA (Claude Desktop) — mandate author; Phase 1 Electron GUI specification; image-decoding scheme; consolidated handoff and completion plan (2026.10.01–2026.10.07).' },
    { name: 'WTA_Labor_I', role: 'WTA Genus Labor I — early Labor line instance; foundational Genus Labor workstream.' },
    { name: 'WTA_Labor_II_a', role: 'WTA Genus Labor II_a — second-generation Labor instance; continued GUI / project continuity.' },
    { name: 'WTA_Labor_III_a', role: 'WTA Genus Labor III_a — built Phase 1 Mnemosyne Electron + JS shell from Consilium mandate; mockup encapsulation; dataApi seam; initial handback.' },
    { name: 'WTA_Labor_III_b', role: 'WTA Genus Labor III_b — runtime fixes (Vite watch, GPU); Phase 1 acceptance testing with Nelson; Track A upgrade backlog documentation.' },
    { name: 'WTA_Labor_III_c', role: 'WTA Genus Labor III_c — Track A implementation (node drag, context menus, resizable/movable dialogs, Search, panel dock/undock, rebrand, About dialog); continuation of Mnemosyne GUI shell.' },
  ];


  showToast(msg) {
    this.setState({ toast: msg });
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => this.setState({ toast: null }), 2600);
  }
  wrapRef = React.createRef();
  plexRef = React.createRef();
  childDotRef = React.createRef();
  parentBottomDotRef = React.createRef();
  activeLeftDotRef = React.createRef();

  rowRefs = {};
  getRowRef(key) { return this.rowRefs[key] || (this.rowRefs[key] = React.createRef()); }

  bezierPath(x1, y1, x2, y2) {
    return `M ${x1},${y1} C ${x1 + Math.abs(x2 - x1) * 0.3},${y1 + (y2 - y1) * 0.2} ${x2 - Math.abs(x2 - x1) * 0.3},${y2 - (y2 - y1) * 0.2} ${x2},${y2}`;
  }
  measureParentLink() {
    const plex = this.plexRef.current, a = this.activeLeftDotRef.current, b = this.childDotRef.current;
    if (!plex) return;
    const scale = this.state.scale || 1;
    const plexRect = plex.getBoundingClientRect();
    const center = (el) => {
      const r = el.getBoundingClientRect();
      return { x: (r.left + r.width / 2 - plexRect.left) / scale, y: (r.top + r.height / 2 - plexRect.top) / scale };
    };
    const activeThought = this.thoughtsData[this.state.selectedId] || this.thoughtsData.main;
    const paths = [];
    if (a && (activeThought.parents || []).length) {
      const ac = center(a);
      (activeThought.parents || []).forEach(pid => {
        const ref = this.rowRefs['p_' + pid];
        if (ref && ref.current) { const pc = center(ref.current); paths.push(this.bezierPath(pc.x, pc.y, ac.x, ac.y)); }
      });
    }
    if (b && (activeThought.children || []).length) {
      const bc = center(b);
      (activeThought.children || []).forEach(cid => {
        const ref = this.rowRefs['c_' + cid];
        if (ref && ref.current) { const cc = center(ref.current); paths.push(this.bezierPath(bc.x, bc.y, cc.x, cc.y)); }
      });
    }
    const joined = paths.join('|');
    if (joined !== this.state.linkPaths) this.setState({ linkPaths: joined });
  }
  componentDidUpdate(prevProps, prevState) {
    this.measureParentLink();
    if (this.state.dialog && (
      prevState.dialog !== this.state.dialog ||
      (prevState.forms && this.state.forms && (prevState.forms.preferences || {}).tab !== (this.state.forms.preferences || {}).tab)
    )) {
      try { this.fitDialogToContent(); } catch (e) { console.warn(e); }
    }
  }

  startDialogDrag(e) {
    e.preventDefault();
    const startX = e.clientX, startY = e.clientY;
    const scale = this.state.scale || 1;
    const startPos = this.state.createChildPos;
    const onMove = (ev) => {
      this.setState({ createChildPos: { x: startPos.x + (ev.clientX - startX) / scale, y: startPos.y + (ev.clientY - startY) / scale } });
    };
    const onUp = () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
    window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp);
  }

  startChildDrag(e, sourceId, dotEl) {
    e.stopPropagation(); e.preventDefault();
    const rect = this.plexRef.current.getBoundingClientRect();
    const scale = this.state.scale || 1;
    const dotRect = (dotEl || this.childDotRef.current).getBoundingClientRect();
    const nodeX = (dotRect.left + dotRect.width / 2 - rect.left) / scale;
    const nodeY = (dotRect.top + dotRect.height / 2 - rect.top) / scale;
    this.setState({ dragging: true, dragFrom: { x: nodeX, y: nodeY }, dragTo: { x: nodeX, y: nodeY }, showCreateChild: false, dragParentId: sourceId || this.state.selectedId });
    this._dragMove = (ev) => {
      const r = this.plexRef.current.getBoundingClientRect();
      this.setState({ dragTo: { x: (ev.clientX - r.left) / scale, y: (ev.clientY - r.top) / scale } });
    };
    this._dragUp = (ev) => {
      const r = this.plexRef.current.getBoundingClientRect();
      const pos = { x: (ev.clientX - r.left) / scale, y: (ev.clientY - r.top) / scale };
      window.removeEventListener('mousemove', this._dragMove);
      window.removeEventListener('mouseup', this._dragUp);
      this.setState({ dragging: false, showCreateChild: true, createChildPos: pos, dragTo: { x: pos.x + 16, y: pos.y } });
    };
    window.addEventListener('mousemove', this._dragMove);
    window.addEventListener('mouseup', this._dragUp);
  }
  confirmCreateChild() {
    const name = (this.state.newChildName || '').trim();
    if (name) {
      const parentId = (this.state.dragParentId && this.thoughtsData[this.state.dragParentId]) ? this.state.dragParentId : this.state.selectedId;
      const created = dataApi.createChildThought(parentId, name);
      this.thoughtsData = dataApi.getAllThoughts();
      if (created) {
        this.setState({ showCreateChild: false, newChildName: '', selectedId: created.id, dragParentId: null, notesDraft: created.notes || '' });
        return;
      }
    }
    this.setState({ showCreateChild: false, newChildName: '', dragParentId: null });
  }
  cancelCreateChild() { this.setState({ showCreateChild: false, newChildName: '', dragParentId: null }); }


  onPlexMouseDown(e) {
    if (e.button !== 0 && e.button !== 1) return;
    // Ignore when starting on interactive node chrome (dots / thought chips)
    const t = e.target;
    if (t && t.closest && t.closest('[data-plex-node], input, textarea, button')) return;
    if (this.state.dragging || this.state.showCreateChild) return;
    e.preventDefault();
    this.setState({
      panning: true,
      panOrigin: { x: e.clientX, y: e.clientY, panX: this.state.panX, panY: this.state.panY },
    });
  }
  onPlexMouseMove(e) {
    if (!this.state.panning || !this.state.panOrigin) return;
    const scale = this.state.scale || 1;
    const ox = this.state.panOrigin;
    this.setState({
      panX: ox.panX + (e.clientX - ox.x) / scale,
      panY: ox.panY + (e.clientY - ox.y) / scale,
    });
  }
  onPlexMouseUp() {
    if (this.state.panning) this.setState({ panning: false, panOrigin: null });
  }
  selectThought(id) {
    const th = dataApi.getThought(id) || this.thoughtsData[id];
    this.setState({ selectedId: id, notesDraft: (th && th.notes) || '', openMenu: null, openSubmenu: null });
  }
  onNotesChange(e) {
    const notes = e.target.value;
    this.setState({ notesDraft: notes });
    dataApi.updateThoughtNotes(this.state.selectedId, notes);
    if (this.thoughtsData[this.state.selectedId]) this.thoughtsData[this.state.selectedId].notes = notes;
  }
  handleWindowMinimize() { window.mnemosyne?.window?.minimize?.(); }
  handleWindowMaximize() { window.mnemosyne?.window?.maximizeToggle?.(); }
  handleWindowClose() { window.mnemosyne?.window?.close?.(); }

  onGlobalKeyDown = (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      if (this.state.dialog) {
        e.preventDefault();
        this.closeDialog();
        return;
      }
      if (this.state.contextMenu || this.state.openMenu || this.state.openSubmenu || this.state.showCreateChild) {
        e.preventDefault();
        this.setState({
          contextMenu: null,
          openMenu: null,
          openSubmenu: null,
          showCreateChild: false,
        });
      }
    }
  };

  stubAction(label) {
    this.showToast(`Not implemented yet: ${label}`);
    this.setState({ openMenu: null, openSubmenu: null });
  }

  getNodeOffset(id) {
    const o = this.state.nodeOffsets[id];
    return o ? o : { x: 0, y: 0 };
  }
  startNodeDrag(e, id) {
    if (e.button !== 0) return;
    e.stopPropagation(); e.preventDefault();
    const off = this.getNodeOffset(id);
    this.setState({
      nodeDrag: { id, startX: e.clientX, startY: e.clientY, origX: off.x, origY: off.y },
      contextMenu: null,
    });
    const onMove = (ev) => {
      const scale = this.state.scale || 1;
      const d = this.state.nodeDrag;
      if (!d) return;
      const nx = d.origX + (ev.clientX - d.startX) / scale;
      const ny = d.origY + (ev.clientY - d.startY) / scale;
      this.setState(prev => ({
        nodeOffsets: { ...prev.nodeOffsets, [d.id]: { x: nx, y: ny } },
      }));
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      this.setState({ nodeDrag: null });
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }
  onNodeClick(e, id) {
    e.stopPropagation();
    this.selectThought(id);
    this.setState({ contextMenu: null });
  }
  onNodeDoubleClick(e, id) {
    e.stopPropagation(); e.preventDefault();
    this.selectThought(id);
    this.openRenameDialog(id);
  }
  onNodeContextMenu(e, id) {
    e.preventDefault(); e.stopPropagation();
    const plex = this.plexRef.current;
    if (!plex) return;
    const scale = this.state.scale || 1;
    const r = plex.getBoundingClientRect();
    const x = (e.clientX - r.left) / scale;
    const y = (e.clientY - r.top) / scale;
    this.selectThought(id);
    this.setState({ contextMenu: { x, y, thoughtId: id }, openMenu: null, openSubmenu: null });
  }
  closeContextMenu() { this.setState({ contextMenu: null }); }
  openRenameDialog(id) {
    const th = dataApi.getThought(id) || this.thoughtsData[id];
    this.setState({
      dialog: 'renameThought',
      renameDraft: (th && th.title) || '',
      selectedId: id || this.state.selectedId,
      contextMenu: null,
      openMenu: null,
      openSubmenu: null,
    });
  }
  confirmRenameThought() {
    const id = this.state.selectedId;
    const title = (this.state.renameDraft || '').trim();
    if (title && dataApi.renameThought(id, title)) {
      this.thoughtsData = dataApi.getAllThoughts();
      this.setState({ dialog: null, renameDraft: '' });
      this.showToast('Thought renamed.');
      return;
    }
    this.setState({ dialog: null });
  }
  setPlexSearch(e) { this.setState({ plexSearch: e.target.value }); }
  setPanelSearch(e) { this.setState({ panelSearch: e.target.value }); }
  runPlexSearch() {
    const q = (this.state.plexSearch || '').trim().toLowerCase();
    if (!q) { this.showToast('Enter a search term.'); return; }
    const hits = Object.entries(this.thoughtsData)
      .filter(([, n]) => (n.title || '').toLowerCase().includes(q))
      .map(([id, n]) => ({ id, title: n.title }));
    if (hits.length) {
      this.selectThought(hits[0].id);
      this.showToast('Found ' + hits.length + ': ' + hits.map(h => h.title).join(', '));
    } else {
      this.showToast('No thoughts match "' + q + '".');
    }
  }
  openNotesWindow() {
    this.setState(prev => ({
      openMenu: null, openSubmenu: null,
      notesPanel: { ...prev.notesPanel, visible: true },
    }));
  }
  openThoughtWindow() {
    this.setState(prev => ({
      openMenu: null, openSubmenu: null,
      thoughtPanel: { ...prev.thoughtPanel, visible: true },
    }));
  }
  closeNotesPanel() {
    this.setState(prev => ({ notesPanel: { ...prev.notesPanel, visible: false } }));
  }
  closeThoughtPanel() {
    this.setState(prev => ({ thoughtPanel: { ...prev.thoughtPanel, visible: false } }));
  }
  toggleNotesDock() {
    this.setState(prev => {
      const mode = prev.notesPanel.mode === 'docked' ? 'float' : 'docked';
      return { notesPanel: { ...prev.notesPanel, mode, visible: true } };
    });
  }
  toggleThoughtDock() {
    this.setState(prev => {
      const mode = prev.thoughtPanel.mode === 'docked' ? 'float' : 'docked';
      return { thoughtPanel: { ...prev.thoughtPanel, mode, visible: true } };
    });
  }
  startFloatPanelDrag(e, which) {
    e.preventDefault(); e.stopPropagation();
    const scale = this.state.scale || 1;
    const panel = which === 'notes' ? this.state.notesPanel : this.state.thoughtPanel;
    const start = { x: e.clientX, y: e.clientY, px: panel.x, py: panel.y };
    const key = which === 'notes' ? 'notesPanel' : 'thoughtPanel';
    const onMove = (ev) => {
      const nx = start.px + (ev.clientX - start.x) / scale;
      const ny = start.py + (ev.clientY - start.y) / scale;
      this.setState(prev => ({ [key]: { ...prev[key], x: nx, y: ny } }));
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }
  startFloatPanelResize(e, which) {
    e.preventDefault(); e.stopPropagation();
    const scale = this.state.scale || 1;
    const panel = which === 'notes' ? this.state.notesPanel : this.state.thoughtPanel;
    const start = { x: e.clientX, y: e.clientY, w: panel.w, h: panel.h };
    const key = which === 'notes' ? 'notesPanel' : 'thoughtPanel';
    const onMove = (ev) => {
      const nw = Math.max(280, start.w + (ev.clientX - start.x) / scale);
      const nh = Math.max(160, start.h + (ev.clientY - start.y) / scale);
      this.setState(prev => ({ [key]: { ...prev[key], w: nw, h: nh } }));
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }
  startMainDialogDrag(e) {
    e.preventDefault(); e.stopPropagation();
    const scale = this.state.scale || 1;
    const d = this.state.dialogBox;
    const start = { x: e.clientX, y: e.clientY, dx: d.x || 0, dy: d.y || 0 };
    const onMove = (ev) => {
      this.setState(prev => ({
        dialogBox: {
          ...prev.dialogBox,
          x: start.dx + (ev.clientX - start.x) / scale,
          y: start.dy + (ev.clientY - start.y) / scale,
        },
      }));
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }
  startMainDialogResize(e) {
    e.preventDefault(); e.stopPropagation();
    const scale = this.state.scale || 1;
    const d = this.state.dialogBox;
    const start = { x: e.clientX, y: e.clientY, w: d.w || 480, h: d.h || 360 };
    const onMove = (ev) => {
      this.setState(prev => ({
        dialogBox: {
          ...prev.dialogBox,
          w: Math.max(320, start.w + (ev.clientX - start.x) / scale),
          h: Math.max(200, start.h + (ev.clientY - start.y) / scale),
        },
      }));
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }


  componentDidMount() {
    this.updateScale = () => {
      const el = this.wrapRef.current;
      if (!el) return;
      const w = el.clientWidth || window.innerWidth;
      const h = el.clientHeight || window.innerHeight;
      this.setState({ scale: Math.min(w / 1600, h / 1000) });
    };
    this.updateScale();
    window.addEventListener('resize', this.updateScale);
    window.addEventListener('keydown', this.onGlobalKeyDown);
    const main = dataApi.getThought('main');
    if (main) this.setState({ notesDraft: main.notes || '' });
    setTimeout(() => this.measureParentLink(), 0);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateScale);
    window.removeEventListener('keydown', this.onGlobalKeyDown);
  }

  startResizeV(e) {
    e.preventDefault();
    const startY = e.clientY;
    const startH = this.state.bottomHeight;
    const onMove = (ev) => {
      const dy = (ev.clientY - startY) / (this.state.scale || 1);
      this.setState({ bottomHeight: Math.min(700, Math.max(120, startH - dy)) });
    };
    const onUp = () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
    window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp);
  }
  startResizeH(e) {
    e.preventDefault();
    const startX = e.clientX;
    const startW = this.state.thoughtWidth;
    const onMove = (ev) => {
      const dx = (ev.clientX - startX) / (this.state.scale || 1);
      this.setState({ thoughtWidth: Math.min(900, Math.max(220, startW - dx)) });
    };
    const onUp = () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
    window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp);
  }

  thoughtsData = dataApi.getAllThoughts();

  themePresets = {
    default: { 'desk-bg':'oklch(0.1 0.01 250)', 'bg':'oklch(0.15 0.012 250)', 'panel-bg':'oklch(0.155 0.012 250)', 'dialog-bg':'oklch(0.185 0.015 250)', 'titlebar-bg':'oklch(0.19 0.016 250)', 'toolbar-bg':'oklch(0.175 0.014 250)', 'input-bg':'oklch(0.2 0.015 250)', 'divider':'oklch(0.24 0.016 250)', 'chip-bg':'oklch(0.24 0.017 250)', 'border':'oklch(0.26 0.018 250)', 'divider-strong':'oklch(0.28 0.018 250)', 'input-border':'oklch(0.3 0.02 250)', 'input-border-strong':'oklch(0.32 0.02 250)', 'handle':'oklch(0.4 0.02 250)', 'text-disabled':'oklch(0.42 0.01 250)', 'text-faint':'oklch(0.5 0.01 250)', 'text-muted':'oklch(0.55 0.01 250)', 'text-tertiary':'oklch(0.65 0.008 250)', 'text-secondary':'oklch(0.8 0.008 250)', 'text':'oklch(0.88 0.006 250)', 'accent':'oklch(0.7 0.12 210)', 'accent-dim':'oklch(0.55 0.1 210)', 'accent-text':'oklch(0.12 0.01 250)', 'canvas-top':'oklch(0.22 0.02 250)', 'canvas-bottom':'oklch(0.13 0.011 250)', 'tab-active-bg':'oklch(0.3 0.05 260)', 'tab-active-text':'oklch(0.9 0.02 260)', 'accel-active-bg':'oklch(0.28 0.06 250)' },
    black: { 'desk-bg':'oklch(0.04 0 0)', 'bg':'oklch(0.07 0 0)', 'panel-bg':'oklch(0.08 0 0)', 'dialog-bg':'oklch(0.1 0 0)', 'titlebar-bg':'oklch(0.09 0 0)', 'toolbar-bg':'oklch(0.08 0 0)', 'input-bg':'oklch(0.05 0 0)', 'divider':'oklch(0.16 0 0)', 'chip-bg':'oklch(0.14 0 0)', 'border':'oklch(0.18 0 0)', 'divider-strong':'oklch(0.2 0 0)', 'input-border':'oklch(0.22 0 0)', 'input-border-strong':'oklch(0.26 0 0)', 'handle':'oklch(0.3 0 0)', 'text-disabled':'oklch(0.35 0 0)', 'text-faint':'oklch(0.45 0 0)', 'text-muted':'oklch(0.55 0 0)', 'text-tertiary':'oklch(0.68 0 0)', 'text-secondary':'oklch(0.82 0 0)', 'text':'oklch(0.95 0 0)', 'accent':'oklch(0.7 0.12 210)', 'accent-dim':'oklch(0.55 0.1 210)', 'accent-text':'oklch(0.1 0 0)', 'canvas-top':'oklch(0.12 0 0)', 'canvas-bottom':'oklch(0.03 0 0)', 'tab-active-bg':'oklch(0.22 0.02 0)', 'tab-active-text':'oklch(0.95 0 0)', 'accel-active-bg':'oklch(0.2 0 0)' },
    darkGrey: { 'desk-bg':'oklch(0.12 0 0)', 'bg':'oklch(0.22 0 0)', 'panel-bg':'oklch(0.24 0 0)', 'dialog-bg':'oklch(0.27 0 0)', 'titlebar-bg':'oklch(0.26 0 0)', 'toolbar-bg':'oklch(0.24 0 0)', 'input-bg':'oklch(0.18 0 0)', 'divider':'oklch(0.32 0 0)', 'chip-bg':'oklch(0.3 0 0)', 'border':'oklch(0.34 0 0)', 'divider-strong':'oklch(0.36 0 0)', 'input-border':'oklch(0.4 0 0)', 'input-border-strong':'oklch(0.44 0 0)', 'handle':'oklch(0.48 0 0)', 'text-disabled':'oklch(0.5 0 0)', 'text-faint':'oklch(0.58 0 0)', 'text-muted':'oklch(0.64 0 0)', 'text-tertiary':'oklch(0.75 0 0)', 'text-secondary':'oklch(0.85 0 0)', 'text':'oklch(0.95 0 0)', 'accent':'oklch(0.7 0.12 210)', 'accent-dim':'oklch(0.55 0.1 210)', 'accent-text':'oklch(0.12 0 0)', 'canvas-top':'oklch(0.3 0 0)', 'canvas-bottom':'oklch(0.16 0 0)', 'tab-active-bg':'oklch(0.38 0.02 0)', 'tab-active-text':'oklch(0.95 0 0)', 'accel-active-bg':'oklch(0.34 0 0)' },
    lightBlue: { 'desk-bg':'oklch(0.75 0.02 240)', 'bg':'oklch(0.97 0.008 240)', 'panel-bg':'oklch(0.95 0.01 240)', 'dialog-bg':'oklch(0.98 0.006 240)', 'titlebar-bg':'oklch(0.88 0.03 240)', 'toolbar-bg':'oklch(0.92 0.02 240)', 'input-bg':'oklch(1 0 0)', 'divider':'oklch(0.85 0.015 240)', 'chip-bg':'oklch(0.9 0.02 240)', 'border':'oklch(0.8 0.02 240)', 'divider-strong':'oklch(0.78 0.02 240)', 'input-border':'oklch(0.75 0.02 240)', 'input-border-strong':'oklch(0.68 0.03 240)', 'handle':'oklch(0.65 0.03 240)', 'text-disabled':'oklch(0.7 0.01 240)', 'text-faint':'oklch(0.55 0.01 240)', 'text-muted':'oklch(0.45 0.015 240)', 'text-tertiary':'oklch(0.35 0.02 240)', 'text-secondary':'oklch(0.25 0.02 240)', 'text':'oklch(0.15 0.02 240)', 'accent':'oklch(0.55 0.16 250)', 'accent-dim':'oklch(0.65 0.12 250)', 'accent-text':'oklch(0.98 0.006 240)', 'canvas-top':'oklch(0.85 0.04 240)', 'canvas-bottom':'oklch(0.65 0.06 250)', 'tab-active-bg':'oklch(0.8 0.05 250)', 'tab-active-text':'oklch(0.15 0.02 240)', 'accel-active-bg':'oklch(0.85 0.06 250)' },
    lightGrey: { 'desk-bg':'oklch(0.7 0 0)', 'bg':'oklch(0.96 0 0)', 'panel-bg':'oklch(0.94 0 0)', 'dialog-bg':'oklch(0.97 0 0)', 'titlebar-bg':'oklch(0.88 0 0)', 'toolbar-bg':'oklch(0.91 0 0)', 'input-bg':'oklch(1 0 0)', 'divider':'oklch(0.85 0 0)', 'chip-bg':'oklch(0.89 0 0)', 'border':'oklch(0.8 0 0)', 'divider-strong':'oklch(0.78 0 0)', 'input-border':'oklch(0.75 0 0)', 'input-border-strong':'oklch(0.68 0 0)', 'handle':'oklch(0.62 0 0)', 'text-disabled':'oklch(0.68 0 0)', 'text-faint':'oklch(0.5 0 0)', 'text-muted':'oklch(0.42 0 0)', 'text-tertiary':'oklch(0.32 0 0)', 'text-secondary':'oklch(0.22 0 0)', 'text':'oklch(0.12 0 0)', 'accent':'oklch(0.55 0.14 210)', 'accent-dim':'oklch(0.65 0.1 210)', 'accent-text':'oklch(0.98 0 0)', 'canvas-top':'oklch(0.82 0 0)', 'canvas-bottom':'oklch(0.62 0 0)', 'tab-active-bg':'oklch(0.8 0.02 210)', 'tab-active-text':'oklch(0.12 0 0)', 'accel-active-bg':'oklch(0.84 0 0)' },
    redLinks: { 'desk-bg':'oklch(0.1 0.01 250)', 'bg':'oklch(0.15 0.012 250)', 'panel-bg':'oklch(0.155 0.012 250)', 'dialog-bg':'oklch(0.185 0.015 250)', 'titlebar-bg':'oklch(0.19 0.016 250)', 'toolbar-bg':'oklch(0.175 0.014 250)', 'input-bg':'oklch(0.2 0.015 250)', 'divider':'oklch(0.24 0.016 250)', 'chip-bg':'oklch(0.24 0.017 250)', 'border':'oklch(0.26 0.018 250)', 'divider-strong':'oklch(0.28 0.018 250)', 'input-border':'oklch(0.3 0.02 250)', 'input-border-strong':'oklch(0.32 0.02 250)', 'handle':'oklch(0.4 0.02 250)', 'text-disabled':'oklch(0.42 0.01 250)', 'text-faint':'oklch(0.5 0.01 250)', 'text-muted':'oklch(0.55 0.01 250)', 'text-tertiary':'oklch(0.65 0.008 250)', 'text-secondary':'oklch(0.8 0.008 250)', 'text':'oklch(0.88 0.006 250)', 'accent':'oklch(0.62 0.19 25)', 'accent-dim':'oklch(0.5 0.15 25)', 'accent-text':'oklch(0.98 0.01 25)', 'canvas-top':'oklch(0.22 0.02 250)', 'canvas-bottom':'oklch(0.13 0.011 250)', 'tab-active-bg':'oklch(0.3 0.08 25)', 'tab-active-text':'oklch(0.9 0.05 25)', 'accel-active-bg':'oklch(0.28 0.06 250)' },
    white: { 'desk-bg':'oklch(0.85 0 0)', 'bg':'oklch(1 0 0)', 'panel-bg':'oklch(0.99 0 0)', 'dialog-bg':'oklch(1 0 0)', 'titlebar-bg':'oklch(0.93 0 0)', 'toolbar-bg':'oklch(0.96 0 0)', 'input-bg':'oklch(1 0 0)', 'divider':'oklch(0.9 0 0)', 'chip-bg':'oklch(0.94 0 0)', 'border':'oklch(0.85 0 0)', 'divider-strong':'oklch(0.82 0 0)', 'input-border':'oklch(0.8 0 0)', 'input-border-strong':'oklch(0.72 0 0)', 'handle':'oklch(0.65 0 0)', 'text-disabled':'oklch(0.7 0 0)', 'text-faint':'oklch(0.52 0 0)', 'text-muted':'oklch(0.4 0 0)', 'text-tertiary':'oklch(0.3 0 0)', 'text-secondary':'oklch(0.18 0 0)', 'text':'oklch(0.05 0 0)', 'accent':'oklch(0.5 0.16 250)', 'accent-dim':'oklch(0.6 0.12 250)', 'accent-text':'oklch(1 0 0)', 'canvas-top':'oklch(0.9 0 0)', 'canvas-bottom':'oklch(0.75 0 0)', 'tab-active-bg':'oklch(0.85 0.04 250)', 'tab-active-text':'oklch(0.05 0 0)', 'accel-active-bg':'oklch(0.88 0 0)' },
  };

  menuDefs = {
    file: { label: 'File', items: [
      { label: 'New Brain…', shortcut: 'Ctrl+N', dialog: 'newBrain' },
      { label: 'Open Brain…', shortcut: 'Ctrl+O', dialog: 'openBrain' },
      { label: 'Login…', shortcut: 'Ctrl+Alt+Shift+Y', dialog: 'login' },
      { divider: true },
      { label: 'Synchronize with Mnemosyne Cloud Services…', shortcut: 'Ctrl+Alt+2', disabled: true },
      { label: 'Synchronize Calendar with Google Calendar…', shortcut: 'Ctrl+Alt+3', dialog: 'googleCalendar' },
      { divider: true },
      { label: 'Merge Brain…', shortcut: 'Ctrl+Alt+4', dialog: 'mergeBrain' },
      { label: 'Rename Brain', shortcut: 'Ctrl+Alt+5', dialog: 'renameBrain' },
      { label: 'Create BrainZip', dialog: 'createBrainZip' },
      { label: 'Close Brain', shortcut: 'Ctrl+F4' },
      { divider: true },
      { label: 'Print Plex', shortcut: 'Ctrl+P', dialog: 'printPlex' },
      { label: 'Page Setup and Multi-Page Poster Printing', dialog: 'printSettings' },
      { divider: true },
      { label: 'Import', submenu: 'import' },
      { label: 'Export', submenu: 'export' },
      { divider: true },
      { label: 'Utilities', submenu: 'utilities' },
      { divider: true },
      { label: 'Mnemosyne (local project)', recent: true },
      { label: 'D:\\Warp Projects\\Instances\\(Inst. C.)\\Genus Custos', recent: true },
      { divider: true },
      { label: 'Exit', shortcut: 'Alt+F4' },
    ]},
    edit: { label: 'Edit', items: [
      { label: 'Undo', disabled: true }, { label: 'Redo', disabled: true },
      { divider: true },
      { label: 'Copy Thought', shortcut: 'Ctrl+Alt+J' }, { label: 'Copy as Text' }, { label: 'Copy Thought URL' }, { label: 'Capture Image to Clipboard', shortcut: 'Ctrl+Alt+Shift+F' }, { label: 'Paste Outline' },
      { divider: true },
      { label: 'Add active thought to Selection', shortcut: 'Ctrl+Alt+N' },
      { divider: true },
      { label: 'Crawl Brain and Modify Selection…', shortcut: 'Ctrl+Alt+W', dialog: 'crawlBrain' },
      { divider: true },
      { label: 'Make Private' },
    ]},
    thought: { label: 'Thought', items: [
      { label: 'Tags', submenu: 'tags' }, { label: 'Thought Type', submenu: 'thoughtType' }, { label: 'Attachments', submenu: 'attachments' },
      { divider: true },
      { label: 'Create Child', shortcut: 'F6' }, { label: 'Create Parent', shortcut: 'F7' }, { label: 'Create Jump', shortcut: 'F8' },
      { divider: true },
      { label: 'Add Event' }, { label: 'Add Attachment…', shortcut: 'Ctrl+Alt+Shift+N', dialog: 'addAttachment' }, { label: 'Capture Thought Icon', shortcut: 'Ctrl+Shift+I', toast: 'Screen capture mode started — select a region to set as this thought\u2019s icon.' }, { label: 'Paste Thought Icon' },
      { divider: true },
      { label: 'Copy Thought', shortcut: 'Ctrl+Alt+J', toast: 'Thought copied to clipboard.' }, { label: 'Copy Thought URL', toast: 'Thought URL copied to clipboard.' }, { label: 'Copy as Text' }, { label: 'Create Duplicate Child Thought', shortcut: 'Ctrl+Shift+D' },
      { divider: true },
      { label: 'Forget' }, { label: 'Rename/Edit', shortcut: 'F2' }, { label: 'Create Pin', shortcut: 'Ctrl+Alt+Shift+J' }, { label: 'Set as Home Thought', shortcut: 'Ctrl+Alt+Shift+L' },
      { divider: true },
      { label: 'Details' }, { label: 'Open Notes Window', shortcut: 'Ctrl+Alt+Shift+T' }, { label: 'Open Thought Window', shortcut: 'Ctrl+Alt+Shift+R' },
    ]},
    view: { label: 'View', items: [
      { label: 'Normal', shortcut: 'Ctrl+Shift+1' }, { label: 'Outline', shortcut: 'Ctrl+Shift+2' }, { label: 'Last Expanded', shortcut: 'Ctrl+Shift+3' },
      { divider: true },
      { label: 'Expand All', shortcut: 'Ctrl+=' }, { label: 'Collapse All', shortcut: 'Ctrl+-' }, { label: 'Manage Saved Views…' },
    ]},
    options: { label: 'Options', items: [
      { label: 'Arrange Thoughts by', submenu: 'arrangeBy' }, { label: 'Thought Types Window', dialog: 'thoughtTypesWindow' }, { label: 'Wander', toggle: 'wander' },
      { divider: true },
      { label: 'Search Web', shortcut: 'F4' }, { label: 'Show Forgotten Thoughts' },
      { divider: true },
      { label: 'Set Theme', submenu: 'setTheme' }, { label: 'Save Theme As…' }, { label: 'Manage Saved Themes…' }, { label: 'Select Wallpaper…', shortcut: 'Ctrl+Alt+F10' },
      { divider: true },
      { label: 'Show Toolbar', shortcut: 'Ctrl+Alt+F11', toggle: 'showToolbar' }, { label: 'Reset Tools Layout', shortcut: 'Ctrl+Alt+F12' }, { label: 'Advanced Tools Layout', shortcut: 'Ctrl+Alt+Shift+1', toggle: 'advancedToolsLayout' },
      { divider: true },
      { label: 'Spellcheck Thoughts', shortcut: 'Ctrl+Alt+Shift+2', toggle: 'spellcheck' }, { label: 'Set Dictionary', submenu: 'setDictionary' },
      { divider: true },
      { label: 'Preferences…', shortcut: 'Ctrl+Alt+Shift+3', dialog: 'preferences' },
    ]},
    window: { label: 'Window', items: [
      { label: 'Always on Top', shortcut: 'Ctrl+Alt+Shift+4', toggle: 'alwaysOnTop' },
      { divider: true },
      { label: 'Float', shortcut: 'Ctrl+Alt+Shift+5', toggle: 'float', clearsOnCheck: ['autoHideLeft', 'autoHideRight', 'autoHideTop', 'autoHideBottom'] },
      { label: 'Auto-hide Left', shortcut: 'Ctrl+Alt+Shift+6', toggle: 'autoHideLeft', clearsOnCheck: ['float', 'autoHideRight', 'autoHideTop', 'autoHideBottom'] },
      { label: 'Auto-hide Right', shortcut: 'Ctrl+Alt+Shift+7', toggle: 'autoHideRight', clearsOnCheck: ['float', 'autoHideLeft', 'autoHideTop', 'autoHideBottom'] },
      { label: 'Auto-hide Top', shortcut: 'Ctrl+Alt+Shift+8', toggle: 'autoHideTop', clearsOnCheck: ['float', 'autoHideLeft', 'autoHideRight', 'autoHideBottom'] },
      { label: 'Auto-hide Bottom', shortcut: 'Ctrl+Alt+Shift+9', toggle: 'autoHideBottom', clearsOnCheck: ['float', 'autoHideLeft', 'autoHideRight', 'autoHideTop'] },
      { divider: true },
      { label: 'Presentation Mode', shortcut: 'Ctrl+Shift+P', toggle: 'presentationMode' }, { label: 'Transparent Mode', toggle: 'transparentMode' },
    ]},
    help: { label: 'Help', items: [
      { label: 'Mnemosyne Tips' }, { label: 'Getting Started', shortcut: 'F1' }, { label: 'Visit GitHub.com', shortcut: 'Alt+Shift+F2' },
      { divider: true },
      { label: 'Check for Updates…', shortcut: 'Alt+Shift+F3' },
      { divider: true },
      { label: 'Recommend Mnemosyne…' }, { label: 'About Mnemosyne', shortcut: 'Alt+Shift+F4', dialog: 'aboutMnemosyne' },
    ]},
  };

  submenuDefs = {
    import: { items: [
      { label: 'Folder', shortcut: 'Ctrl+Alt+F1' }, { label: 'IE Favorites', shortcut: 'Ctrl+Alt+F2' }, { label: 'Brain XML', shortcut: 'Ctrl+Alt+F3' },
      { label: 'Word Outline (.docx)', shortcut: 'Ctrl+Alt+F4' }, { label: 'MindManager File (.mmap or .xmmap)', shortcut: 'Ctrl+Alt+F5' },
      { label: 'OPML File (.opml)', shortcut: 'Ctrl+Alt+F6' }, { label: 'FreeMind File (.mm)', shortcut: 'Ctrl+Alt+F7' },
      { label: 'OWL File (.owl)', shortcut: 'Ctrl+Alt+F8' }, { label: 'Text Outline (.txt)', shortcut: 'Ctrl+Alt+F9' },
    ]},
    export: { items: [
      { label: 'SiteBrain HTML', shortcut: 'Ctrl+Alt+8' }, { label: 'Simple HTML', shortcut: 'Ctrl+Alt+9' }, { label: 'Brain XML', shortcut: 'Ctrl+Alt+0' },
      { label: 'BrainEKP XML', shortcut: 'Ctrl+Alt+A' }, { label: 'To Folders', shortcut: 'Ctrl+Alt+B' },
    ]},
    arrangeBy: { items: [ { label: 'Name', radio: 'arrangeBy', val: 'name' }, { label: 'Type', radio: 'arrangeBy', val: 'type' }, { label: 'Last active date', radio: 'arrangeBy', val: 'lastActive' }, { label: 'Last modified date', radio: 'arrangeBy', val: 'lastModified' }, { label: 'Creation date', radio: 'arrangeBy', val: 'creation' } ]},
    setTheme: { items: [ { label: 'Black', radio: 'theme', val: 'black' }, { label: 'Dark Grey', radio: 'theme', val: 'darkGrey' }, { label: 'Default (Dark Blue)', radio: 'theme', val: 'default' }, { label: 'Light Blue', radio: 'theme', val: 'lightBlue' }, { label: 'Light Grey', radio: 'theme', val: 'lightGrey' }, { label: 'Red Links', radio: 'theme', val: 'redLinks' }, { label: 'White', radio: 'theme', val: 'white' } ]},
    setDictionary: { items: [
      { label: 'Danish', radio: 'dictionary', val: 'da' }, { label: 'Dutch', radio: 'dictionary', val: 'nl' }, { label: 'English (UK)', radio: 'dictionary', val: 'en-uk' }, { label: 'English (US)', radio: 'dictionary', val: 'en-us' },
      { label: 'Finnish', radio: 'dictionary', val: 'fi' }, { label: 'French', radio: 'dictionary', val: 'fr' }, { label: 'German', radio: 'dictionary', val: 'de' }, { label: 'Italian', radio: 'dictionary', val: 'it' },
      { label: 'Norwegian', radio: 'dictionary', val: 'no' }, { label: 'Portuguese (Brazilian)', radio: 'dictionary', val: 'pt-br' }, { label: 'Portuguese (Iberian)', radio: 'dictionary', val: 'pt-pt' }, { label: 'Spanish', radio: 'dictionary', val: 'es' }, { label: 'Swedish', radio: 'dictionary', val: 'sv' },
    ]},
    tags: { items: [ { label: 'New Tag…', shortcut: 'Alt+Ctrl+Shift+G', dialog: 'createTag' } ]},
    thoughtType: { items: [ { label: 'New Type…', shortcut: 'Alt+Ctrl+Shift+H', dialog: 'createThoughtType' }, { divider: true }, { label: '✓ Untyped', checked: true } ]},
    attachments: { items: [ { label: 'Add Attachment…', shortcut: 'Ctrl+Alt+Shift+N', dialog: 'addAttachment' }, { label: 'Open Thought Folder', shortcut: 'Ctrl+Shift+F', toast: 'Opening thought\u2019s attachment folder…' }, { label: 'Paste Thought Icon' } ]},
    utilities: { items: [
      { label: 'Statistics', shortcut: 'Ctrl+Alt+D' }, { label: 'Analyze Main Thoughts', shortcut: 'Ctrl+Alt+E' }, { label: 'Check for Modified Attachments' },
      { divider: true },
      { label: 'Assign Brain New GUID' }, { label: 'Replace Attachment Locations…', shortcut: 'Ctrl+Alt+I' }, { label: 'Refresh Web Pages Index', shortcut: 'Ctrl+Alt+F' },
      { label: 'Rebuild Instant Activation Index' }, { label: 'Rebuild Search Index' }, { label: 'Clear Thought Activity Log' },
    ]},
  };

  fileBrowserConfigs = {
    selectLocation: { title: 'Select Location', mode: 'save', lookLabel: 'Save in', breadcrumb: 'Mnemosyne',
      items: [ { name: 'html', type: 'folder' }, { name: 'Images', type: 'folder' } ],
      fileField: 'D:\\Claude Design\\TheBrain 7 (clone) (2026.08.11.)', filterLabel: '', confirmLabel: 'Save' },
    openBrain: { title: 'Select Brain File to Open', mode: 'open', lookLabel: 'Look in', breadcrumb: 'Claude Design',
      items: [ { name: 'Mnemosyne', type: 'folder' }, { name: 'Mnemosyne.brain', type: 'file' } ],
      fileField: '', filterLabel: 'Brain Files (*.brain, *.brn, *.brainzip)', confirmLabel: 'Open' },
    mergeBrain: { title: 'Select Mnemosyne Brain File', mode: 'open', lookLabel: 'Look in', breadcrumb: 'Documents',
      items: [ { name: '2016.08.05. Ceiling Fan wiring', type: 'folder' }, { name: 'Academia.edu', type: 'folder' }, { name: 'Alexander', type: 'folder' }, { name: 'AdobeStockPhotos', type: 'folder' } ],
      fileField: '', filterLabel: 'Mnemosyne Brain Files (*.brn, *.brain)', confirmLabel: 'Open' },
  };

  defaultForms = {
    newBrain: { name: '', location: 'Claude Design\\TheBrain 7 (clone) (2026.08.11.)' },
    login: { username: '', password: '' },
    googleCalendar: { username: '', password: '' },
    renameBrain: { name: 'Mnemosyne' },
    createBrainZip: { name: 'Mnemosyne', includeAttachments: true, includeSearchIndex: false, outputFolder: 'D:\\Claude Projects' },
    printPlex: { range: 'all', copies: 1 },
    printSettings: { maxPages: '1 page', whiteBackground: true },
    pageSetup: { orientation: 'portrait', marginLeft: '0.25', marginRight: '0.25', marginTop: '0.25', marginBottom: '0.25' },
    crawlBrain: { mode: 'Add to selection', childward: false, parentward: false, jumpward: false, excludeOtherParents: false, clicksAway: '1' },
    createTag: { name: '' },
    createThoughtType: { name: '' },
    preferences: {
      tab: 'general',
      serverAddress: 'webbrain.com', language: 'English', openAtStartup: false, checkUpdates: false, openLastBrain: false, copyNotesAsText: false,
      textShadows: true, backgrounds: true, thumbnails: true, fadeDistant: true, shrinkOutline: true, showIcons: false, hideTagHints: false,
      linkThickness: '2.0', hideLinkLabels: false, drawLinks: true, glowEffect: false, curvedLinks: true, thickenHighlighted: false,
      plexFont: 'SansSerif', applyColorsTo: 'Text', animSpeed: 50, activeIndicator: true, showSiblings: true, maxChildColumns: '6', wallpaper: false, tileWallpaper: false,
      mouseWheelResize: false, resizeDraggable: true, clickToCreate: false, updateOnHighlight: true, autoCapitalize: true, forgetBeforeDelete: true,
      showVirtualThoughts: true, activateLastCreated: true, hidePinsPresentation: false, highlightRecent: true, doubleClickMaximizes: true,
      dragDropFiles: 'Link to dropped files', sendToDest: 'Home Thought', monitorClipboard: false, monitorKeyboard: false, ignoreLowercase: true, cancelIfUnused: false, activation: 'Automatically activate',
      collapseOnActivate: false, autoRecenter: true, distantThoughtSize: 50, spacing: 100, distantSpacing: 50, distantColumns: 3, activeDistance: 50, thoughtIndentation: 50,
      mergeResults: false, oneResultPerThought: false, indexFileAttachments: true, indexUrlAttachments: true, maxResultsSize: '100', resultsPerPage: '10', defaultSort: 'Relevance', maxFileSize: '5 MB', refreshWebIndex: 'Never', filterClicksAway: '3',
      sortByRecent: true, contextSensitiveNames: true, saveImagesLocally: true, hideTempFiles: true, tabletEditBoxes: false, showMemoryUsage: true,
      useProxy: false, proxyAddress: '', proxyPort: '', proxyAuth: false, proxyUser: '', proxyPassword: '', proxyDomain: '',
      wanderSpeed: 50, showActivatedAsBackground: false,
    },
    selectLocation: { fileField: 'D:\\Claude Design\\TheBrain 7 (clone) (2026.08.11.)' },
    openBrain: { fileField: '' },
    mergeBrain: { fileField: '' },
  };

  searchResults = [
    { title: 'Roadmap Q3', color: 'var(--accent)' }, { title: 'Sarah Chen', color: 'oklch(0.75 0.13 60)' },
    { title: 'Redis Cluster', color: 'oklch(0.68 0.13 320)' }, { title: 'Onboarding Flow v2', color: 'oklch(0.72 0.14 145)' },
  ];
  upcomingEvents = [ { date: 'Aug 14', title: 'Roadmap sync' }, { date: 'Aug 19', title: 'Design review' } ];

  icon(paths, w) { return { __html: `<svg width="${w||14}" height="${w||14}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${paths}</svg>` }; }

  attachmentFileTypes = ['Capture Image', 'Handbook Document', 'Library Folder', 'Microsoft Excel Worksheet', 'Microsoft PowerPoint Presentation', 'Microsoft Word Document', 'Text Document', 'WinRAR ZIP archive'];

  colorRows = [
    { label: 'Thoughts, background', color: 'var(--bg)' }, { label: 'Thoughts, selection outline', color: 'oklch(0.55 0.16 30)' },
    { label: 'Thoughts, text', color: 'var(--bg)' }, { label: 'Thoughts, text (forgotten)', color: 'oklch(0.55 0.16 30)' },
    { label: 'Active thought, outline', color: 'oklch(0.55 0.14 250)' }, { label: 'Active thought, resizing circle', color: 'var(--bg)' },
    { label: 'Background, center', color: 'oklch(0.45 0.12 250)' }, { label: 'Gates, highlighted', color: 'oklch(0.7 0.15 145)' },
    { label: 'Highlighted thoughts, background', color: 'var(--bg)' }, { label: 'Links, highlighted', color: 'oklch(0.75 0.16 95)' },
    { label: 'Messages, background', color: 'var(--bg)' }, { label: 'Scrollbar, fill', color: 'oklch(0.7 0.15 145)' },
  ];
  accelRows = [
    { cmd: 'Mnemosyne Hot Key', key: 'Shift+WINDOWS', active: true }, { cmd: 'File > New Brain…', key: 'Ctrl+N' }, { cmd: 'File > Open Brain…', key: 'Ctrl+O' },
    { cmd: 'File > Login…', key: 'Alt+Ctrl+Shift+Y' }, { cmd: 'File > Logout', key: '' }, { cmd: 'File > Merge Brain…', key: 'Alt+Ctrl+4' },
    { cmd: 'File > Rename Brain', key: 'Alt+Ctrl+5' }, { cmd: 'File > Create BrainZip', key: 'Ctrl+R' }, { cmd: 'File > Print Plex', key: 'Ctrl+P' },
  ];

  form(id) { return this.state.forms[id] || this.defaultForms[id] || {}; }
  setForm(id, field, value) {
    this.setState(prev => ({ forms: { ...prev.forms, [id]: { ...(prev.forms[id] || this.defaultForms[id] || {}), [field]: value } } }));
  }
  fieldSetter(id, field, isCheckbox) {
    return (e) => this.setForm(id, field, isCheckbox ? e.target.checked : e.target.value);
  }


  fitDialogToContent() {
    requestAnimationFrame(() => {
      try {
        const el = document.querySelector('.mn-dialog-shell');
        if (!el || !this.state.dialog) return;
        const db = this.state.dialogBox || {};
        const clone = el.cloneNode(true);
        clone.style.position = 'absolute';
        clone.style.left = '-10000px';
        clone.style.top = '0';
        clone.style.visibility = 'hidden';
        clone.style.height = 'auto';
        clone.style.maxHeight = 'none';
        clone.style.width = ((db.w || 520) + 'px');
        clone.style.overflow = 'visible';
        clone.querySelectorAll('.mn-dialog-body').forEach((b) => {
          b.style.height = 'auto';
          b.style.minHeight = '0';
          b.style.flex = 'none';
          b.style.overflow = 'visible';
        });
        document.body.appendChild(clone);
        const needW = Math.ceil(Math.min(Math.max(clone.scrollWidth + 24, db.w || 480, 420), window.innerWidth * 0.92));
        const needH = Math.ceil(Math.min(Math.max(clone.scrollHeight + 24, db.h || 360, 300), window.innerHeight * 0.88));
        document.body.removeChild(clone);
        const w = Math.max(420, needW);
        const h = Math.max(300, needH);
        if (w !== db.w || h !== db.h) {
          this.setState((prev) => ({ dialogBox: { ...prev.dialogBox, w, h } }));
        }
      } catch (err) {
        console.warn('fitDialogToContent', err);
      }
    });
  }

  openDialog(id) {
    const sizes = {
      preferences: { w: 820, h: 640 },
      aboutMnemosyne: { w: 580, h: 560 },
      newBrain: { w: 440, h: 280 },
      login: { w: 520, h: 320 },
      openBrain: { w: 640, h: 480 },
      mergeBrain: { w: 640, h: 480 },
      selectLocation: { w: 640, h: 480 },
      printPlex: { w: 480, h: 360 },
      printSettings: { w: 520, h: 400 },
      pageSetup: { w: 480, h: 360 },
      crawlBrain: { w: 420, h: 440 },
      createBrainZip: { w: 520, h: 400 },
      renameBrain: { w: 420, h: 240 },
      renameThought: { w: 420, h: 240 },
      createTag: { w: 400, h: 240 },
      createThoughtType: { w: 420, h: 260 },
      thoughtTypesWindow: { w: 360, h: 320 },
      addAttachment: { w: 420, h: 420 },
      googleCalendar: { w: 520, h: 320 },
    };
    const sz = sizes[id] || { w: 520, h: 420 };
    this.setState({ openMenu: null, openSubmenu: null, dialog: id, dialogBox: { x: 0, y: 0, w: sz.w, h: sz.h, auto: true }, contextMenu: null }, () => { try { try { this.fitDialogToContent(); } catch (e) { console.warn(e); } } catch (e) { console.warn(e); } });
  }
  closeDialog() { this.setState({ dialog: null }); }

  prefsVals(s) {
    const p = this.form('preferences');
    const tabs = ['general', 'lookFeel', 'ui', 'views', 'search', 'colors', 'advanced', 'accelerators'];
    const tabLabels = { general: 'General', lookFeel: 'Look & Feel', ui: 'UI', views: 'Views', search: 'Search', colors: 'Colors', advanced: 'Advanced', accelerators: 'Accelerators' };
    const tabIcons = {
      general: this.icon('<polyline points="20 6 9 17 4 12"/>', 20),
      lookFeel: this.icon('<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/>', 20),
      ui: this.icon('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>', 20),
      views: this.icon('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>', 20),
      search: this.icon('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>', 20),
      colors: this.icon('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="1.5"/><circle cx="16" cy="8" r="1.5"/><circle cx="8" cy="16" r="1.5"/>', 20),
      advanced: this.icon('<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>', 20),
      accelerators: this.icon('<polyline points="20 6 9 17 4 12"/>', 20),
    };
    const setPref = (field, checkbox) => this.fieldSetter('preferences', field, checkbox);
    const tabsData = tabs.map(t => ({
      id: t, label: tabLabels[t], icon: tabIcons[t],
      onClick: () => { this.setForm('preferences', 'tab', t); setTimeout(() => this.fitDialogToContent(), 0); },
      style: `display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 6px;border-radius:6px;cursor:pointer;background:${p.tab === t ? 'var(--tab-active-bg)' : 'transparent'};color:${p.tab === t ? 'var(--tab-active-text)' : 'var(--text-muted)'};font-size:10px;min-width:64px;`,
    }));
    return {
      prefsTabs: tabsData,
      isPrefsGeneral: p.tab === 'general', isPrefsLookFeel: p.tab === 'lookFeel', isPrefsUI: p.tab === 'ui', isPrefsViews: p.tab === 'views',
      isPrefsSearch: p.tab === 'search', isPrefsColors: p.tab === 'colors', isPrefsAdvanced: p.tab === 'advanced', isPrefsAccelerators: p.tab === 'accelerators',
      pf: p, setPrefText: (field) => setPref(field), setPrefCheck: (field) => setPref(field, true),
      chk: 'display:flex;align-items:center;gap:8px;font-size:12px;color:var(--text-secondary);padding:3px 0;',
      colorRows: this.colorRows,
      accelRows: this.accelRows.map(ar => ({ ...ar, active: ar.active ? 'var(--accel-active-bg)' : 'transparent' })),
    };
  }

  renderVals() {
    const s = this.state;
    const activeThought = this.thoughtsData[s.selectedId] || this.thoughtsData.main;
    const pf0 = this.form('preferences');
    const rowGap = 22 + ((pf0.spacing || 100) - 100) / 300 * 30;
    const plexH = 1000 - 32 - 26 - 34 - 5 - s.bottomHeight;
    const colDist = Math.min(210 + ((pf0.spacing || 100) - 100) / 300 * 120, plexH / 2 - 50);
    const buildRows = (ids, side) => {
      const list = (ids || []).map(id => ({ id, node: this.thoughtsData[id] })).filter(x => x.node).sort((a, b) => a.node.title.localeCompare(b.node.title));
      const n = list.length, midOffset = -(n - 1) / 2 * rowGap;
      const rowW = 260, colW = list.length ? (n * rowW) : 0, startX = -colW / 2 + rowW / 2;
      const panX = s.panX || 0, panY = s.panY || 0;
      return list.map((x, i) => {
        const off = this.getNodeOffset(x.id);
        const lx = startX + i * rowW + panX + off.x;
        const ly = (side === 'p' ? -colDist : colDist) + panY + off.y;
        return {
        id: x.id, title: x.node.title,
        onClick: (e) => this.onNodeClick(e, x.id),
        onDoubleClick: (e) => this.onNodeDoubleClick(e, x.id),
        onContextMenu: (e) => this.onNodeContextMenu(e, x.id),
        onMouseDown: (e) => this.startNodeDrag(e, x.id),
        rowRef: this.getRowRef(side + '_' + x.id),
        startChildDrag: (e) => this.startChildDrag(e, x.id, this.getRowRef(side + '_' + x.id).current),
        childDotFill: (x.node.children && x.node.children.length) ? 'oklch(0.7 0.15 145)' : 'transparent',
        parentDotFill: (x.node.parents && x.node.parents.length) ? 'oklch(0.7 0.15 145)' : 'transparent',
        style: `position:absolute;left:calc(50% + ${lx}px);top:calc(50% + ${ly}px);transform:translate(-50%,-50%);cursor:${s.nodeDrag && s.nodeDrag.id===x.id ? 'grabbing' : 'grab'};`,
      };});
    };
    const parentRows = buildRows(activeThought.parents, 'p');
    const childRows = buildRows(activeThought.children, 'c');

    const menus = Object.keys(this.menuDefs).map(key => {
      const active = s.openMenu === key;
      return {
        label: this.menuDefs[key].label,
        onClick: (e) => { e.stopPropagation(); this.setState({ openMenu: active ? null : key, openSubmenu: null }); },
        style: `padding:4px 10px;border-radius:4px;font-size:12px;cursor:default;background:${active ? 'var(--divider-strong)' : 'transparent'};color:${active ? 'var(--text)' : 'var(--text-tertiary)'};`
      };
    });

    const openDef = s.openMenu ? this.menuDefs[s.openMenu] : null;
    const menuIndex = s.openMenu ? Object.keys(this.menuDefs).indexOf(s.openMenu) : 0;

    let cum = 6;
    const menuItems = openDef ? openDef.items.map(it => {
      const top = cum;
      cum += it.divider ? 13 : 25;
      const checked = it.toggle ? s.toggles[it.toggle] : false;
      return {
        ...it,
        rowTop: 26 + top,
        checkPrefix: checked ? '✓ ' : '',
        shortcutDisplay: it.submenu ? '›' : (it.shortcut || ''),
        style: `display:flex;align-items:center;justify-content:space-between;padding:6px 14px;border-radius:5px;font-size:${it.recent ? '11px' : '12.5px'};font-style:${it.recent ? 'italic' : 'normal'};cursor:${it.disabled ? 'default' : 'pointer'};color:${it.disabled ? 'var(--text-disabled)' : (it.recent ? 'var(--text-muted)' : 'var(--text)')};background:${(it.submenu && s.openSubmenu === it.submenu) ? 'var(--border)' : 'transparent'};`,
        onClick: (e) => {
          e.stopPropagation();
          if (it.disabled) return;
          if (it.submenu) { this.setState({ openSubmenu: s.openSubmenu === it.submenu ? null : it.submenu }); return; }
          if (it.dialog) { this.openDialog(it.dialog); return; }
          if (it.toggle) {
            this.setState(prev => {
              const next = !prev.toggles[it.toggle];
              const toggles = { ...prev.toggles, [it.toggle]: next };
              if (next && it.clearsOnCheck) it.clearsOnCheck.forEach(k => { toggles[k] = false; });
              return { toggles, openMenu: null, openSubmenu: null };
            });
            return;
          }
          if (it.toast) { this.showToast(it.toast); this.setState({ openMenu: null, openSubmenu: null }); return; }
          if (it.label === 'Exit') { this.handleWindowClose(); return; }
          if (it.label && (it.label.includes('GitHub.com') || it.label.includes('GitHub.com') || it.label.includes('GitHub'))) {
            window.mnemosyne?.openExternal?.(this.GITHUB_PROJECT_URL || 'https://github.com/seminone/Mnemosyne');
            this.setState({ openMenu: null, openSubmenu: null });
            return;
          }
          if (it.label === 'Open Notes Window') { this.openNotesWindow(); return; }
          if (it.label === 'Open Thought Window') { this.openThoughtWindow(); return; }
          if (it.label === 'Rename/Edit') { this.openRenameDialog(this.state.selectedId); return; }
          // Phase 1: every remaining item must give visible feedback
          this.stubAction(it.label || 'command');
        },
      };
    }) : [];

    const openSubItem = menuItems.find(it => it.submenu === s.openSubmenu);
    const openSubDef = s.openSubmenu ? this.submenuDefs[s.openSubmenu] : null;
    const submenuItems = openSubDef ? openSubDef.items.map(sit => ({
      ...sit,
      checkPrefix: (sit.radio && s.radios[sit.radio] === sit.val) ? '✓ ' : '',
      textColor: 'var(--text)',
      onClick: (e) => {
        e.stopPropagation();
        if (sit.dialog) { this.openDialog(sit.dialog); return; }
        if (sit.radio) { this.setState(prev => ({ radios: { ...prev.radios, [sit.radio]: sit.val }, openMenu: null, openSubmenu: null })); return; }
        if (sit.toast) { this.showToast(sit.toast); this.setState({ openMenu: null, openSubmenu: null }); return; }
        this.stubAction(sit.label || 'command');
      },
    })) : [];

    const toolIconStyle = 'width:26px;height:26px;border-radius:5px;display:flex;align-items:center;justify-content:center;color:var(--text-tertiary);cursor:pointer;';
    const toolIconStyleSm = 'width:22px;height:22px;border-radius:5px;display:flex;align-items:center;justify-content:center;color:var(--text-muted);cursor:pointer;';

    const tabDefs = [ { id: 'thought', label: 'Thought' }, { id: 'tags', label: 'Tags' }, { id: 'search', label: 'Search' }, { id: 'reports', label: 'Reports' }, { id: 'calendar', label: 'Calendar' } ];
    const thoughtTabs = tabDefs.map(t => ({
      label: t.label,
      onClick: () => this.setState({ thoughtTab: t.id }),
      style: `padding:5px 10px;border-radius:4px;font-size:11px;cursor:pointer;color:${s.thoughtTab === t.id ? 'var(--text)' : 'var(--text-muted)'};background:${s.thoughtTab === t.id ? 'var(--border)' : 'transparent'};font-weight:${s.thoughtTab === t.id ? 600 : 400};`
    }));

    const btnPrimaryStyle = 'padding:6px 18px;border-radius:5px;background:var(--accent);color:var(--accent-text);font-size:12px;font-weight:600;cursor:pointer;';
    const btnSecondaryStyle = 'padding:6px 18px;border-radius:5px;background:var(--chip-bg);color:var(--text-secondary);font-size:12px;cursor:pointer;border:1px solid var(--input-border-strong);';

    const nb = this.form('newBrain'), lg = this.form('login'), gc = this.form('googleCalendar'), rb = this.form('renameBrain'),
      cz = this.form('createBrainZip'), pp = this.form('printPlex'), ps = this.form('printSettings'), pgs = this.form('pageSetup'),
      cb = this.form('crawlBrain'), ct = this.form('createTag'), ctt = this.form('createThoughtType');

    const folderIcon = this.icon('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>', 13);
    const fileIcon = this.icon('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>', 13);
    const sidebarDefs = [
      { label: 'Recent Items', icon: this.icon('<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/>', 13) },
      { label: 'Desktop', icon: this.icon('<rect x="3" y="4" width="18" height="12" rx="1"/><line x1="8" y1="20" x2="16" y2="20"/><line x1="12" y1="16" x2="12" y2="20"/>', 13) },
      { label: 'Documents', icon: fileIcon },
      { label: 'This PC', icon: this.icon('<rect x="4" y="3" width="16" height="12" rx="1"/><line x1="2" y1="19" x2="22" y2="19"/>', 13) },
      { label: 'Network', icon: this.icon('<circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><line x1="12" y1="7" x2="6.5" y2="17.2"/><line x1="12" y1="7" x2="17.5" y2="17.2"/>', 13) },
    ];

    const fbId = ['selectLocation', 'openBrain', 'mergeBrain'].includes(s.dialog) ? s.dialog : null;
    const fbConf = fbId ? this.fileBrowserConfigs[fbId] : null;
    const fbForm = fbId ? this.form(fbId) : null;
    const fb = fbConf ? {
      ...fbConf,
      items: fbConf.items.map(fi => ({
        name: fi.name, iconColor: fi.type === 'folder' ? 'oklch(0.7 0.14 90)' : 'var(--text-muted)',
        icon: fi.type === 'folder' ? folderIcon : fileIcon,
        onClick: () => this.setForm(fbId, 'fileField', fi.name),
      })),
    } : null;

    const theme = this.themePresets[s.radios.theme] || this.themePresets.default;
    const wrapperStyle = { width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: theme['desk-bg'], overflow: 'hidden' };
    Object.keys(theme).forEach(k => { wrapperStyle['--' + k] = theme[k]; });

    return {
      wrapRef: this.wrapRef, wrapperStyle, scale: s.scale, bottomHeight: ((s.notesPanel.visible && s.notesPanel.mode==='docked') || (s.thoughtPanel.visible && s.thoughtPanel.mode==='docked')) ? s.bottomHeight : 0, thoughtWidth: (s.thoughtPanel.visible && s.thoughtPanel.mode==='docked') ? s.thoughtWidth : 0,
      startResizeV: (e) => this.startResizeV(e), startResizeH: (e) => this.startResizeH(e),
      menus, openMenu: !!openDef, menuItems,
      menuPanelStyle: `position:absolute;top:26px;left:${8 + menuIndex * 62}px;min-width:260px;background:var(--input-bg);border:1px solid var(--input-border);border-radius:8px;box-shadow:0 12px 30px rgba(0,0,0,0.5);padding:6px;z-index:20;`,
      submenuOpen: !!openSubDef, submenuItems,
      submenuPanelStyle: `position:absolute;top:${openSubItem ? openSubItem.rowTop : 26}px;left:${8 + menuIndex * 62 + 264}px;min-width:270px;background:var(--input-bg);border:1px solid var(--input-border);border-radius:8px;box-shadow:0 12px 30px rgba(0,0,0,0.5);padding:6px;z-index:21;`,
      closeMenus: () => this.setState({ openMenu: null, openSubmenu: null, contextMenu: null }),
      stopProp: (e) => e.stopPropagation(),
      prevent: (e) => e.preventDefault(),
      toolIconStyle, toolIconStyleSm,
      icons: {
        back: this.icon('<polyline points="15 18 9 12 15 6"/>'), fwd: this.icon('<polyline points="9 18 15 12 9 6"/>'),
        home: this.icon('<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>'), pin: this.icon('<path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>'),
        plus: this.icon('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>'), minus: this.icon('<line x1="5" y1="12" x2="19" y2="12"/>'),
        refresh: this.icon('<polyline points="23 4 23 10 17 10"/><path d="M20.5 15a9 9 0 1 1-2.1-9.4L23 10"/>'),
        sync: this.icon('<path d="M12 2v4"/><path d="M12 18v4"/><circle cx="12" cy="12" r="6"/>'), unsync: this.icon('<circle cx="12" cy="12" r="9"/><line x1="6" y1="18" x2="18" y2="6"/>'),
        addChild: this.icon('<circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>', 13),
        image: this.icon('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>', 13),
        cut: this.icon('<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/>', 13),
        copy: this.icon('<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>', 13),
        trash: this.icon('<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>', 13),
      },
      radialLines: Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2; return { x: 90 + Math.cos(a) * 70, y: 90 + Math.sin(a) * 70 }; }),
      activeThought,
      plexRef: this.plexRef, childDotRef: this.childDotRef,
      activeTopDotRef: this.activeLeftDotRef,
      linkPaths: (s.linkPaths || '').split('|').filter(Boolean),
      parentRows, childRows,
      startDialogDrag: (e) => this.startDialogDrag(e),
      startChildDragActive: (e) => this.startChildDrag(e, s.selectedId, this.childDotRef.current),
      showDragLine: s.dragging || s.showCreateChild,
      dragLinePath: `M ${s.dragFrom.x},${s.dragFrom.y} C ${s.dragFrom.x + Math.abs(s.dragTo.x-s.dragFrom.x)*0.3},${s.dragFrom.y + (s.dragTo.y-s.dragFrom.y)*0.2} ${s.dragTo.x - Math.abs(s.dragTo.x-s.dragFrom.x)*0.3},${s.dragTo.y - (s.dragTo.y-s.dragFrom.y)*0.2} ${s.dragTo.x},${s.dragTo.y}`,
      showCreateChild: s.showCreateChild,
      createChildPos: s.createChildPos,
      newChildName: s.newChildName, setNewChildName: (e) => this.setState({ newChildName: e.target.value }),
      onNewChildKeyDown: (e) => { if (e.key === 'Enter') { e.preventDefault(); this.confirmCreateChild(); } if (e.key === 'Escape') { e.preventDefault(); this.cancelCreateChild(); } },
      confirmCreateChild: () => this.confirmCreateChild(),
      cancelCreateChild: () => this.cancelCreateChild(),
      onPlexMouseDown: (e) => this.onPlexMouseDown(e),
      onPlexMouseMove: (e) => this.onPlexMouseMove(e),
      onPlexMouseUp: () => this.onPlexMouseUp(),
      panX: s.panX || 0, panY: s.panY || 0,
      plexCursor: s.panning ? 'grabbing' : 'grab',
      activeNodeStyle: (() => { const o = this.getNodeOffset(s.selectedId); return `position:absolute;left:calc(50% + ${(s.panX||0)+o.x}px);top:calc(50% + ${(s.panY||0)+o.y}px);transform:translate(-50%,-50%);cursor:${s.nodeDrag&&s.nodeDrag.id===s.selectedId?'grabbing':'grab'};`; })(),
      radialStyle: `position:absolute;left:calc(50% + ${s.panX || 0}px);top:calc(50% + ${(s.panY || 0) - 118}px);transform:translate(-50%,0);opacity:0.35;`,
      onActiveNodeMouseDown: (e) => this.startNodeDrag(e, s.selectedId),
      onActiveNodeClick: (e) => this.onNodeClick(e, s.selectedId),
      onActiveNodeDoubleClick: (e) => this.onNodeDoubleClick(e, s.selectedId),
      onActiveNodeContextMenu: (e) => this.onNodeContextMenu(e, s.selectedId),
      contextMenu: s.contextMenu,
      closeContextMenu: () => this.closeContextMenu(),
      contextRename: () => this.openRenameDialog(s.contextMenu && s.contextMenu.thoughtId),
      contextActivate: () => { if (s.contextMenu) this.selectThought(s.contextMenu.thoughtId); this.closeContextMenu(); },
      plexSearch: s.plexSearch, setPlexSearch: (e) => this.setPlexSearch(e),
      onPlexSearchKey: (e) => { if (e.key === 'Enter') { e.preventDefault(); this.runPlexSearch(); } },
      runPlexSearch: () => this.runPlexSearch(),
      panelSearch: s.panelSearch, setPanelSearch: (e) => this.setPanelSearch(e),
      notesPanel: s.notesPanel, thoughtPanel: s.thoughtPanel,
      closeNotesPanel: () => this.closeNotesPanel(),
      closeThoughtPanel: () => this.closeThoughtPanel(),
      toggleNotesDock: () => this.toggleNotesDock(),
      toggleThoughtDock: () => this.toggleThoughtDock(),
      startNotesFloatDrag: (e) => this.startFloatPanelDrag(e, 'notes'),
      startThoughtFloatDrag: (e) => this.startFloatPanelDrag(e, 'thought'),
      startNotesFloatResize: (e) => this.startFloatPanelResize(e, 'notes'),
      startThoughtFloatResize: (e) => this.startFloatPanelResize(e, 'thought'),
      showDockedBottom: !!(s.notesPanel.visible && s.notesPanel.mode === 'docked') || !!(s.thoughtPanel.visible && s.thoughtPanel.mode === 'docked'),
      showDockedNotes: !!(s.notesPanel.visible && s.notesPanel.mode === 'docked'),
      showDockedThought: !!(s.thoughtPanel.visible && s.thoughtPanel.mode === 'docked'),
      showFloatNotes: !!(s.notesPanel.visible && s.notesPanel.mode === 'float'),
      showFloatThought: !!(s.thoughtPanel.visible && s.thoughtPanel.mode === 'float'),
      dialogBox: s.dialogBox,
      startMainDialogDrag: (e) => this.startMainDialogDrag(e),
      startMainDialogResize: (e) => this.startMainDialogResize(e),
      dialogShellStyle: (() => {
        const db = s.dialogBox || {};
        const w = Math.max(400, db.w || 520);
        const h = Math.max(280, db.h || 420);
        const x = db.x || 0;
        const y = db.y || 0;
        return [
          'position:relative',
          'width:' + w + 'px',
          'height:' + h + 'px',
          'transform:translate(' + x + 'px,' + y + 'px)',
          'max-width:92vw',
          'max-height:88vh',
          'min-width:400px',
          'min-height:280px',
          'display:flex',
          'flex-direction:column',
          'resize:both',
          'overflow:hidden',
          'box-sizing:border-box',
        ].join(';');
      })(),


      isRenameThought: s.dialog === 'renameThought',
      isAboutMnemosyne: s.dialog === 'aboutMnemosyne',
      contributors: this.contributors || [],
      aboutVersion: '0.1.0',
      githubUrl: this.GITHUB_PROJECT_URL,
      openGithub: () => window.mnemosyne?.openExternal?.(this.GITHUB_PROJECT_URL),

      renameDraft: s.renameDraft,
      setRenameDraft: (e) => this.setState({ renameDraft: e.target.value }),
      confirmRenameThought: () => this.confirmRenameThought(),
      goHome: () => this.selectThought('main'),
      notesDraft: s.notesDraft, onNotesChange: (e) => this.onNotesChange(e),
      attachmentsList: dataApi.listAttachments(s.selectedId),
      minimizeWindow: () => this.handleWindowMinimize(),
      maximizeWindow: () => this.handleWindowMaximize(),
      closeWindow: () => this.handleWindowClose(),
      appTitle: 'Mnemosyne — Product Research',
      parentDotFill: (activeThought.parents || []).some(id => this.thoughtsData[id]) ? 'oklch(0.7 0.15 145)' : 'transparent',
      childDotFill: (s.dragging || s.showCreateChild || (activeThought.children || []).some(id => this.thoughtsData[id])) ? 'oklch(0.7 0.15 145)' : 'transparent',
      isThoughtTab: s.thoughtTab === 'thought', isTagsTab: s.thoughtTab === 'tags', isSearchTab: s.thoughtTab === 'search',
      isReportsTab: s.thoughtTab === 'reports', isCalendarTab: s.thoughtTab === 'calendar',
      thoughtTabs, searchResults: this.searchResults, upcomingEvents: this.upcomingEvents,

      dialog: s.dialog, closeDialog: () => this.closeDialog(),
      btnPrimaryStyle, btnSecondaryStyle,

      isNewBrain: s.dialog === 'newBrain',
      newBrainName: nb.name, setNewBrainName: this.fieldSetter('newBrain', 'name'),
      newBrainLocation: nb.location, openSelectLocation: (e) => { e.stopPropagation(); this.setState({ dialog: 'selectLocation' }); },

      isLogin: s.dialog === 'login',
      loginUsername: lg.username, setLoginUsername: this.fieldSetter('login', 'username'),
      loginPassword: lg.password, setLoginPassword: this.fieldSetter('login', 'password'),

      isGoogleCalendar: s.dialog === 'googleCalendar',
      gcalUsername: gc.username, setGcalUsername: this.fieldSetter('googleCalendar', 'username'),
      gcalPassword: gc.password, setGcalPassword: this.fieldSetter('googleCalendar', 'password'),

      isRenameBrain: s.dialog === 'renameBrain',
      renameBrainName: rb.name, setRenameBrainName: this.fieldSetter('renameBrain', 'name'),

      isCreateBrainZip: s.dialog === 'createBrainZip',
      zipName: cz.name, setZipName: this.fieldSetter('createBrainZip', 'name'),
      zipIncludeAttachments: cz.includeAttachments, setZipIncludeAttachments: this.fieldSetter('createBrainZip', 'includeAttachments', true),
      zipIncludeSearchIndex: cz.includeSearchIndex, setZipIncludeSearchIndex: this.fieldSetter('createBrainZip', 'includeSearchIndex', true),
      zipOutputFolder: cz.outputFolder, setZipOutputFolder: this.fieldSetter('createBrainZip', 'outputFolder'),

      isPrintPlex: s.dialog === 'printPlex',
      printRangeAll: pp.range === 'all', setPrintRangeAll: () => this.setForm('printPlex', 'range', 'all'),
      printRangePages: pp.range === 'pages', setPrintRangePages: () => this.setForm('printPlex', 'range', 'pages'),
      printRangeSelection: pp.range === 'selection', setPrintRangeSelection: () => this.setForm('printPlex', 'range', 'selection'),
      printCopies: pp.copies, setPrintCopies: this.fieldSetter('printPlex', 'copies'),

      isPrintSettings: s.dialog === 'printSettings',
      maxPages: ps.maxPages, setMaxPages: this.fieldSetter('printSettings', 'maxPages'),
      whiteBackground: ps.whiteBackground, setWhiteBackground: this.fieldSetter('printSettings', 'whiteBackground', true),
      goToPageSetup: () => this.setState({ dialog: 'pageSetup' }),

      isPageSetup: s.dialog === 'pageSetup',
      orientPortrait: pgs.orientation === 'portrait', setOrientPortrait: () => this.setForm('pageSetup', 'orientation', 'portrait'),
      orientLandscape: pgs.orientation === 'landscape', setOrientLandscape: () => this.setForm('pageSetup', 'orientation', 'landscape'),
      marginLeft: pgs.marginLeft, setMarginLeft: this.fieldSetter('pageSetup', 'marginLeft'),
      marginRight: pgs.marginRight, setMarginRight: this.fieldSetter('pageSetup', 'marginRight'),
      marginTop: pgs.marginTop, setMarginTop: this.fieldSetter('pageSetup', 'marginTop'),
      marginBottom: pgs.marginBottom, setMarginBottom: this.fieldSetter('pageSetup', 'marginBottom'),

      isCrawlBrain: s.dialog === 'crawlBrain',
      crawlMode: cb.mode, setCrawlMode: this.fieldSetter('crawlBrain', 'mode'),
      crawlChildward: cb.childward, setCrawlChildward: this.fieldSetter('crawlBrain', 'childward', true),
      crawlParentward: cb.parentward, setCrawlParentward: this.fieldSetter('crawlBrain', 'parentward', true),
      crawlJumpward: cb.jumpward, setCrawlJumpward: this.fieldSetter('crawlBrain', 'jumpward', true),
      crawlExcludeOtherParents: cb.excludeOtherParents, setCrawlExcludeOtherParents: this.fieldSetter('crawlBrain', 'excludeOtherParents', true),
      crawlClicksAway: cb.clicksAway, setCrawlClicksAway: this.fieldSetter('crawlBrain', 'clicksAway'),
      setCrawlAllDirections: () => this.setState(prev => ({ forms: { ...prev.forms, crawlBrain: { ...(prev.forms.crawlBrain || this.defaultForms.crawlBrain), childward: true, parentward: true, jumpward: true } } })),

      toast: s.toast,

      isCreateTag: s.dialog === 'createTag',
      createTagName: ct.name, setCreateTagName: this.fieldSetter('createTag', 'name'),
      confirmCreateTag: () => { this.showToast('Tag created.'); this.closeDialog(); },

      isCreateThoughtType: s.dialog === 'createThoughtType',
      createThoughtTypeName: ctt.name, setCreateThoughtTypeName: this.fieldSetter('createThoughtType', 'name'),
      confirmCreateThoughtType: () => { this.showToast('Thought type created.'); this.closeDialog(); },

      isThoughtTypesWindow: s.dialog === 'thoughtTypesWindow',
      isPreferences: s.dialog === 'preferences',
      ...this.prefsVals(s),

      isAddAttachment: s.dialog === 'addAttachment',
      attachmentFileTypes: this.attachmentFileTypes,
      onAttachmentTypeClick: (label) => { dataApi.addAttachmentStub(this.state.selectedId, `New ${label}`, label); this.showToast(`New ${label} attachment created.`); this.closeDialog(); this.forceUpdate(); },

      isFileBrowser: !!fb, fb, sidebarItems: sidebarDefs,
      fbFileName: fbForm ? fbForm.fileField : '', setFbFileName: fbId ? this.fieldSetter(fbId, 'fileField') : (() => {}),
      closeFileBrowser: () => this.setState({ dialog: fbId === 'selectLocation' ? 'newBrain' : null }),
      confirmFileBrowser: () => {
        if (fbId === 'selectLocation' && fbForm) this.setForm('newBrain', 'location', fbForm.fileField);
        this.setState({ dialog: fbId === 'selectLocation' ? 'newBrain' : null });
      },
    };
  }

  render() {
    return renderTemplate(this.renderVals());
  }
}

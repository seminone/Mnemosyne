import React from 'react';
import Hover from './Hover.jsx';
import css from './css.js';

// Generated 1:1 from the "Cortex v2.dc.html" template. `v` = the object returned by Cortex.renderVals().
export default function renderTemplate(v) {
  return (
  <>
    <div ref={v.wrapRef} style={css(v.wrapperStyle)}>
      <div onClick={() => { v.closeMenus?.(); v.closeContextMenu?.(); }} style={{width: "1600px", height: "1000px", flex: "none", transform: `scale(${v.scale})`, background: "var(--bg)", color: "var(--text)", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.55)", borderRadius: "8px", fontSize: "13px", position: "relative", border: "1px solid var(--divider)"}}>
        <div style={{height: "26px", flex: "none", display: "flex", alignItems: "center", gap: "2px", padding: "0 8px", background: "var(--toolbar-bg)", borderBottom: "1px solid var(--border)", position: "relative"}}>
          {(v.menus || []).map((m, $index) => (
            <React.Fragment key={m?.id ?? $index}>
              <div onClick={m?.onClick} style={css(m?.style)}>
                {m?.label}
              </div>
            </React.Fragment>
          ))}
          {v.openMenu ? (
            <>
              <div onClick={v.stopProp} style={css(v.menuPanelStyle)}>
                {(v.menuItems || []).map((it, $index) => (
                  <React.Fragment key={it?.id ?? $index}>
                    {it?.divider ? (
                      <>
                        <div style={{height: "1px", background: "var(--divider-strong)", margin: "6px 0"}} />
                      </>
                    ) : null}
                    {it?.label ? (
                      <>
                        <Hover as="div" onClick={it?.onClick} style={css(it?.style)} hover={{background: "var(--border)"}}>
                          <span>
                            {it?.checkPrefix}{it?.label}
                          </span>
                          <span style={{fontSize: "10.5px", color: "var(--text-faint)", fontFamily: "'JetBrains Mono',monospace", marginLeft: "24px"}}>
                            {it?.shortcutDisplay}
                          </span>
                        </Hover>
                      </>
                    ) : null}
                  </React.Fragment>
                ))}
              </div>
            </>
          ) : null}
          {v.submenuOpen ? (
            <>
              <div onClick={v.stopProp} style={css(v.submenuPanelStyle)}>
                {(v.submenuItems || []).map((sit, $index) => (
                  <React.Fragment key={sit?.id ?? $index}>
                    {sit?.divider ? (
                      <>
                        <div style={{height: "1px", background: "var(--divider-strong)", margin: "6px 0"}} />
                      </>
                    ) : null}
                    {sit?.label ? (
                      <>
                        <Hover as="div" onClick={sit?.onClick} style={{display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 14px", borderRadius: "5px", fontSize: "12.5px", cursor: "pointer", color: `${sit?.textColor}`}} hover={{background: "var(--border)"}}>
                          <span>
                            {sit?.checkPrefix}{sit?.label}
                          </span>
                          <span style={{fontSize: "10.5px", color: "var(--text-faint)", fontFamily: "'JetBrains Mono',monospace", marginLeft: "24px"}}>
                            {sit?.shortcut}
                          </span>
                        </Hover>
                      </>
                    ) : null}
                  </React.Fragment>
                ))}
              </div>
            </>
          ) : null}
        </div>
        <div style={{height: "34px", flex: "none", display: "flex", alignItems: "center", gap: "6px", padding: "0 10px", background: "var(--toolbar-bg)", borderBottom: "1px solid var(--border)"}}>
          <div dangerouslySetInnerHTML={v.icons?.back} style={css(v.toolIconStyle)} />
          <div dangerouslySetInnerHTML={v.icons?.fwd} style={css(v.toolIconStyle)} />
          <div onClick={v.goHome} dangerouslySetInnerHTML={v.icons?.home} style={css(v.toolIconStyle)} />
          <div style={{width: "1px", height: "16px", background: "var(--divider-strong)", margin: "0 4px"}} />
          <div dangerouslySetInnerHTML={v.icons?.pin} style={css(v.toolIconStyle)} />
          <div dangerouslySetInnerHTML={v.icons?.plus} style={css(v.toolIconStyle)} />
          <div dangerouslySetInnerHTML={v.icons?.minus} style={css(v.toolIconStyle)} />
          <div dangerouslySetInnerHTML={v.icons?.refresh} style={css(v.toolIconStyle)} />
          <div style={{width: "1px", height: "16px", background: "var(--divider-strong)", margin: "0 4px"}} />
          <div dangerouslySetInnerHTML={v.icons?.sync} style={css(v.toolIconStyle)} />
          <div dangerouslySetInnerHTML={v.icons?.unsync} style={css(v.toolIconStyle)} />
          <div style={{marginLeft: "auto", fontSize: "11px", color: "var(--text-faint)", fontFamily: "'JetBrains Mono',monospace"}}>
            {"46.6 MB Used / 59.1 MB Free"}
          </div>
        </div>
        <div ref={v.plexRef} onMouseDown={v.onPlexMouseDown} onMouseMove={v.onPlexMouseMove} onMouseUp={v.onPlexMouseUp} onMouseLeave={v.onPlexMouseUp} onWheel={v.onPlexWheel} style={{flex: "1", position: "relative", background: "radial-gradient(circle at 50% 42%, var(--canvas-top) 0%, var(--canvas-bottom) 75%)", minHeight: "0", overflow: "hidden", cursor: v.plexCursor || "grab"}}>
          <div style={{position: "absolute", top: "12px", right: "14px", width: "26px", height: "26px", borderRadius: "6px", background: "var(--chip-bg)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2.3">
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M16 3h3a2 2 0 0 1 2 2v3" />
              <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          </div>
          <div style={{position: "absolute", top: "12px", right: "48px", height: "26px", padding: "0 10px", borderRadius: "6px", background: "var(--chip-bg)", display: "flex", alignItems: "center", fontSize: "11px", color: "var(--text-muted)", fontFamily: "'JetBrains Mono',monospace", zIndex: 6, pointerEvents: "none"}}>
            {v.zoomLabel || "100%"}
          </div>
          <div className="mn-camera-layer" style={css(v.cameraLayerStyle || "position:absolute;inset:0;")}> 
          <svg width="180" height="180" viewBox="0 0 180 180" style={css(v.radialStyle || "position:absolute;left:50%;top:50%;transform:translate(-50%,-118px);opacity:0.35;")}>
            <circle cx="90" cy="90" r="70" fill="none" stroke="var(--accent-dim)" strokeWidth="1" />
            <circle cx="90" cy="90" r="45" fill="none" stroke="var(--accent-dim)" strokeWidth="1" />
            {(v.radialLines || []).map((rl, $index) => (
              <React.Fragment key={rl?.id ?? $index}>
                <line x1="90" y1="90" x2={rl?.x} y2={rl?.y} stroke="var(--accent-dim)" strokeWidth="1" />
              </React.Fragment>
            ))}
          </svg>
          <svg style={{position: "absolute", inset: "0", pointerEvents: "none", overflow: "visible"}}>
            {(v.linkPaths || []).map((lp, $index) => (
              <React.Fragment key={lp?.id ?? $index}>
                <path d={lp} fill="none" stroke="oklch(0.55 0.1 210)" strokeWidth="1.5" />
              </React.Fragment>
            ))}
          </svg>
          {(v.parentRows || []).map((pr, $index) => (
            <React.Fragment key={pr?.id ?? $index}>
              <div data-plex-node="1" onClick={pr?.onClick} onDoubleClick={pr?.onDoubleClick} onContextMenu={pr?.onContextMenu} onMouseDown={pr?.onMouseDown} style={css(pr?.style)}>
                <div style={{position: "relative", padding: "6px 14px", borderRadius: "6px", border: "1px solid var(--input-border-strong)", background: "var(--titlebar-bg)", fontSize: "13px", color: "var(--text-secondary)", whiteSpace: "nowrap"}}>
                  {" "}{pr?.title}{" "}
                  <div style={{position: "absolute", left: "50%", top: "-3px", transform: "translate(-50%,-50%)", width: "6px", height: "6px", borderRadius: "50%", background: `${pr?.parentDotFill}`, border: "1.5px solid var(--accent)"}} />
                  <div onMouseDown={pr?.startChildDrag} style={{position: "absolute", left: "50%", bottom: "-3px", transform: "translate(-50%,50%)", width: "14px", height: "14px", cursor: "crosshair"}} />
                  <div ref={pr?.rowRef} style={{position: "absolute", left: "50%", bottom: "-3px", transform: "translate(-50%,50%)", width: "6px", height: "6px", borderRadius: "50%", background: `${pr?.childDotFill}`, border: "1.5px solid var(--accent)", pointerEvents: "none"}} />
                </div>
              </div>
            </React.Fragment>
          ))}
          {(v.childRows || []).map((cr, $index) => (
            <React.Fragment key={cr?.id ?? $index}>
              <div data-plex-node="1" onClick={cr?.onClick} onDoubleClick={cr?.onDoubleClick} onContextMenu={cr?.onContextMenu} onMouseDown={cr?.onMouseDown} style={css(cr?.style)}>
                <div style={{position: "relative", padding: "6px 14px", borderRadius: "6px", border: "1px solid var(--input-border-strong)", background: "var(--titlebar-bg)", fontSize: "13px", color: "var(--text-secondary)", whiteSpace: "nowrap"}}>
                  {" "}{cr?.title}{" "}
                  <div ref={cr?.rowRef} style={{position: "absolute", left: "50%", top: "-3px", transform: "translate(-50%,-50%)", width: "6px", height: "6px", borderRadius: "50%", background: "oklch(0.7 0.15 145)", border: "1.5px solid var(--accent)"}} />
                  <div onMouseDown={cr?.startChildDrag} style={{position: "absolute", left: "50%", bottom: "-3px", transform: "translate(-50%,50%)", width: "14px", height: "14px", cursor: "crosshair"}} />
                  <div style={{position: "absolute", left: "50%", bottom: "-3px", transform: "translate(-50%,50%)", width: "6px", height: "6px", borderRadius: "50%", background: `${cr?.childDotFill}`, border: "1.5px solid var(--accent)", pointerEvents: "none"}} />
                </div>
              </div>
            </React.Fragment>
          ))}
          <div data-plex-node="1" onClick={v.onActiveNodeClick} onDoubleClick={v.onActiveNodeDoubleClick} onContextMenu={v.onActiveNodeContextMenu} onMouseDown={v.onActiveNodeMouseDown} style={css(v.activeNodeStyle || "position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);")}>
            <div style={{position: "relative", padding: "8px 16px", borderRadius: "6px", border: "1.5px solid var(--accent)", background: "var(--titlebar-bg)", fontSize: "14px", fontWeight: "600", whiteSpace: "nowrap", cursor: "inherit"}}>
              {" "}{v.activeThought?.title}{" "}
              <div ref={v.activeTopDotRef} style={{position: "absolute", left: "50%", top: "-3px", transform: "translate(-50%,-50%)", width: "6px", height: "6px", borderRadius: "50%", background: `${v.parentDotFill}`, border: "1.5px solid var(--accent)"}} />
              <div ref={v.childDotRef} onMouseDown={v.startChildDragActive} style={{position: "absolute", left: "50%", bottom: "-3px", transform: "translate(-50%,50%)", width: "14px", height: "14px", cursor: "crosshair"}} />
              <div style={{position: "absolute", left: "50%", bottom: "-3px", transform: "translate(-50%,50%)", width: "6px", height: "6px", borderRadius: "50%", background: `${v.childDotFill}`, border: "1.5px solid var(--accent)", pointerEvents: "none"}} />
            </div>
          </div>
          {v.showDragLine ? (
            <>
              <svg style={{position: "absolute", inset: "0", pointerEvents: "none", overflow: "visible"}}>
                <path d={v.dragLinePath} fill="none" stroke="oklch(0.7 0.15 145)" strokeWidth="1.5" />
              </svg>
            </>
          ) : null}
          {v.showCreateChild ? (
            <>
              <div onClick={v.stopProp} style={{position: "absolute", left: `${v.createChildPos?.x}px`, top: `${v.createChildPos?.y}px`, zIndex: "30"}}>
                <div style={{position: "absolute", left: "16px", top: "0", transform: "translate(-50%,-50%)", width: "7px", height: "7px", borderRadius: "50%", background: "oklch(0.7 0.15 145)", border: "1.5px solid var(--dialog-bg)"}} />
                <div onMouseDown={v.startDialogDrag} style={{display: "inline-block", padding: "4px 12px 6px", borderRadius: "6px 6px 0 0", background: "var(--chip-bg)", border: "1px solid var(--input-border-strong)", borderBottom: "none", fontSize: "11px", color: "var(--text-secondary)", cursor: "move", marginLeft: "6px"}}>
                  {"Create Child"}
                </div>
                <div style={{background: "var(--dialog-bg)", border: "1px solid var(--input-border-strong)", borderRadius: "0 6px 6px 6px", boxShadow: "0 12px 30px rgba(0,0,0,0.5)", padding: "8px", width: "250px"}}>
                  <div style={{display: "flex", gap: "6px", alignItems: "center"}}>
                    <input type="text" autoFocus={true} value={v.newChildName} onChange={v.setNewChildName} onKeyDown={v.onNewChildKeyDown} style={{flex: "1", height: "24px", borderRadius: "4px", background: "var(--input-bg)", border: "1px solid var(--input-border)", padding: "0 8px", fontSize: "12px", color: "var(--text)"}} />
                    <div onClick={v.confirmCreateChild} style={{width: "22px", height: "22px", borderRadius: "50%", background: "oklch(0.6 0.15 145)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "13px"}}>
                      {"✓"}
                    </div>
                    <div onClick={v.cancelCreateChild} style={{width: "22px", height: "22px", borderRadius: "50%", background: "oklch(0.6 0.18 25)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "13px"}}>
                      {"✕"}
                    </div>
                  </div>
                  <div style={{display: "flex", gap: "6px", marginTop: "8px"}}>
                    <div style={{padding: "3px 10px", borderRadius: "4px", background: "var(--chip-bg)", border: "1px solid var(--input-border)", fontSize: "11px", cursor: "pointer", color: "var(--text-secondary)"}}>
                      {"Type"}
                    </div>
                    <div style={{padding: "3px 10px", borderRadius: "4px", background: "var(--chip-bg)", border: "1px solid var(--input-border)", fontSize: "11px", cursor: "pointer", color: "var(--text-secondary)"}}>
                      {"Tags"}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
        
                    </div>{/* mn-camera-layer */}
          {/* HUD: search + result chips — outside camera layer (no pan/zoom) */}
          <div
            className="mn-search-hud"
            style={{position: "absolute", bottom: "14px", left: "14px", right: "14px", display: "flex", gap: "8px", alignItems: "center", zIndex: 20, pointerEvents: "none"}}
          >
            <div style={{display: "flex", gap: "8px", alignItems: "center", flex: "none", pointerEvents: "auto"}} onClick={v.stopProp} onMouseDown={v.stopProp}>
              <input
                type="text"
                value={v.plexSearch || ""}
                onChange={v.setPlexSearch}
                onKeyDown={v.onPlexSearchKey}
                placeholder="Search thoughts…"
                style={{width: "230px", height: "26px", borderRadius: "5px", background: "var(--titlebar-bg)", border: "1px solid var(--input-border)", padding: "0 8px", fontSize: "12px", color: "var(--text)", outline: "none", flex: "none"}}
              />
              <div onClick={v.runPlexSearch} style={{height: "26px", padding: "0 14px", borderRadius: "5px", background: "var(--chip-bg)", border: "1px solid var(--input-border-strong)", display: "flex", alignItems: "center", fontSize: "12px", color: "var(--text-tertiary)", cursor: "pointer", flex: "none", whiteSpace: "nowrap"}}>
                {"Search"}
              </div>
            </div>
            <div style={{display: "flex", gap: "6px", alignItems: "center", flex: "1", minWidth: 0, overflowX: "auto", overflowY: "hidden", pointerEvents: "auto", paddingBottom: "2px"}} onClick={v.stopProp} onMouseDown={v.stopProp}>
              {(v.searchHits || []).map((hit, $index) => (
                <div
                  key={hit?.id ?? $index}
                  onClick={() => v.onSearchHitClick?.(hit.id)}
                  title={hit?.title}
                  style={{height: "26px", padding: "0 10px", borderRadius: "5px", background: "var(--titlebar-bg)", border: "1px solid var(--input-border)", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", flex: "none", maxWidth: "200px"}}
                >
                  <div style={{width: "8px", height: "8px", borderRadius: "2px", background: "var(--accent)", flex: "none"}} />
                  <div style={{fontSize: "12px", fontWeight: 600, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                    {hit?.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

{v.contextMenu ? (
            <div className="mn-context-menu" onClick={v.stopProp} onMouseDown={v.stopProp} style={{position: "absolute", left: (v.contextMenu.x) + "px", top: (v.contextMenu.y) + "px", zIndex: 40, minWidth: "180px", background: "var(--input-bg)", border: "1px solid var(--input-border)", borderRadius: "8px", boxShadow: "0 12px 30px rgba(0,0,0,0.5)", padding: "6px"}}>
              <div style={{padding: "6px 14px 8px", fontSize: "11px", color: "var(--text-muted)", borderBottom: "1px solid var(--divider)", marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}} title={v.contextMenu.title || v.contextTargetTitle || ""}>
                {v.contextMenu.title || v.contextTargetTitle || "Thought"}
              </div>
              <div onClick={v.contextActivate} style={{padding: "6px 14px", borderRadius: "5px", fontSize: "12.5px", cursor: "pointer", color: "var(--text)"}}>{"Activate (make focal)"}</div>
              <div onClick={v.contextRename} style={{padding: "6px 14px", borderRadius: "5px", fontSize: "12.5px", cursor: "pointer", color: "var(--text)"}}>{"Edit / Rename…"}</div>
              <div style={{padding: "6px 14px", borderRadius: "5px", fontSize: "12px", color: "var(--text-disabled)", cursor: "default"}} title="Coming later">{"Color / Tags… (soon)"}</div>
              <div onClick={v.closeContextMenu} style={{padding: "6px 14px", borderRadius: "5px", fontSize: "12.5px", cursor: "pointer", color: "var(--text-muted)"}}>{"Close menu"}</div>
            </div>
          ) : null}
        
        <div onMouseDown={v.startResizeV} style={{height: "5px", flex: "none", cursor: "row-resize", background: "var(--border)", position: "relative"}}>
          <div style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "36px", height: "3px", borderRadius: "2px", background: "var(--handle)"}} />
        </div>
        <div style={{height: `${v.bottomHeight}px`, flex: "none", display: "flex", borderTop: "1px solid var(--border)", minHeight: "0"}}>
          <div style={{flex: "1", display: v.showDockedNotes === false ? "none" : "flex", flexDirection: "column", background: "var(--panel-bg)", minWidth: "0"}}>
            <div style={{height: "26px", flex: "none", display: "flex", alignItems: "center", padding: "0 10px", fontSize: "11.5px", fontWeight: "600", color: "var(--text-muted)", borderBottom: "1px solid var(--divider)"}}>
              {" Notes "}
              <div style={{marginLeft: "auto", display: "flex", gap: "10px", color: "var(--text-faint)", fontSize: "11px"}}>
                <span onClick={v.toggleNotesDock} style={{cursor: "pointer"}} title="Undock">{"⧉"}</span>
                <span onClick={v.closeNotesPanel} style={{cursor: "pointer"}} title="Close">{"✕"}</span>
              </div>
            </div>
            <div style={{height: "24px", flex: "none", display: "flex", alignItems: "center", gap: "14px", padding: "0 10px", fontSize: "11px", color: "var(--text-muted)", borderBottom: "1px solid var(--divider)"}}>
              <span>
                {"File"}
              </span>
              <span>
                {"Edit"}
              </span>
              <span>
                {"View"}
              </span>
              <span>
                {"Insert"}
              </span>
              <span>
                {"Format"}
              </span>
              <span>
                {"Tools"}
              </span>
              <span>
                {"Table"}
              </span>
            </div>
            <div style={{height: "28px", flex: "none", display: "flex", alignItems: "center", gap: "10px", padding: "0 10px", borderBottom: "1px solid var(--divider)"}}>
              <div style={{height: "20px", padding: "0 8px", borderRadius: "4px", background: "var(--input-bg)", border: "1px solid var(--input-border)", fontSize: "10.5px", display: "flex", alignItems: "center"}}>
                {"Arial"}
              </div>
              <div style={{height: "20px", padding: "0 8px", borderRadius: "4px", background: "var(--input-bg)", border: "1px solid var(--input-border)", fontSize: "10.5px", display: "flex", alignItems: "center"}}>
                {"12pt"}
              </div>
              <div style={{width: "1px", height: "14px", background: "var(--divider-strong)"}} />
              <b style={{fontSize: "11px", color: "var(--text-tertiary)"}}>
                {"B"}
              </b>
              <i style={{fontSize: "11px", color: "var(--text-tertiary)"}}>
                {"I"}
              </i>
              <u style={{fontSize: "11px", color: "var(--text-tertiary)"}}>
                {"U"}
              </u>
              <div style={{width: "1px", height: "14px", background: "var(--divider-strong)"}} />
              <span style={{fontSize: "11px", color: "var(--text-tertiary)"}}>
                {"≡ ≡ ≡"}
              </span>
              <div style={{width: "1px", height: "14px", background: "var(--divider-strong)"}} />
              <span style={{fontSize: "11px", color: "var(--text-tertiary)"}}>
                {"≣ ≣"}
              </span>
            </div>
            <textarea
              value={v.notesDraft ?? v.activeThought?.notes ?? ""}
              onChange={v.onNotesChange}
              placeholder="Notes / annotations…"
              style={{flex: "1", padding: "12px 14px", fontSize: "12.5px", lineHeight: "1.6", color: "var(--text-secondary)", whiteSpace: "pre-wrap", overflow: "auto", resize: "none", border: "none", outline: "none", background: "transparent", width: "100%", boxSizing: "border-box", fontFamily: "inherit"}}
            />
          </div>
          <div onMouseDown={v.startResizeH} style={{width: "5px", flex: "none", cursor: "col-resize", background: "var(--border)", position: "relative"}}>
            <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", height: "36px", width: "3px", borderRadius: "2px", background: "var(--handle)"}} />
          </div>
          <div style={{width: `${v.thoughtWidth}px`, flex: "none", display: (v.showDockedThought === false ? "none" : "flex"), flexDirection: "column", background: "var(--panel-bg)"}}>
            <div style={{height: "26px", flex: "none", display: "flex", alignItems: "center", padding: "0 10px", fontSize: "11.5px", fontWeight: "600", color: "var(--text-muted)", borderBottom: "1px solid var(--divider)"}}>
              {" Thought "}
              <div style={{marginLeft: "auto", display: "flex", gap: "10px", color: "var(--text-faint)", fontSize: "11px"}}>
                <span onClick={v.toggleThoughtDock} style={{cursor: "pointer"}} title="Undock">{"⧉"}</span>
                <span onClick={v.closeThoughtPanel} style={{cursor: "pointer"}} title="Close">{"✕"}</span>
              </div>
            </div>
            <div style={{padding: "10px 12px", borderBottom: "1px solid var(--divider)"}}>
              <div style={{height: "26px", borderRadius: "5px", background: "var(--input-bg)", border: "1px solid var(--input-border)", display: "flex", alignItems: "center", padding: "0 8px", fontSize: "12.5px", marginBottom: "6px"}}>
                {v.activeThought?.title}
              </div>
              <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                <span style={{fontSize: "11px", color: "var(--text-muted)"}}>
                  {"Label:"}
                </span>
                <div style={{flex: "1", height: "22px", borderRadius: "5px", background: "var(--input-bg)", border: "1px solid var(--input-border)"}} />
              </div>
            </div>
            <div style={{display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderBottom: "1px solid var(--divider)"}}>
              <div dangerouslySetInnerHTML={v.icons?.addChild} style={css(v.toolIconStyleSm)} />
              <div dangerouslySetInnerHTML={v.icons?.image} style={css(v.toolIconStyleSm)} />
              <div dangerouslySetInnerHTML={v.icons?.cut} style={css(v.toolIconStyleSm)} />
              <div dangerouslySetInnerHTML={v.icons?.copy} style={css(v.toolIconStyleSm)} />
              <div dangerouslySetInnerHTML={v.icons?.trash} style={css(v.toolIconStyleSm)} />
              <div style={{height: "20px", padding: "0 8px", borderRadius: "4px", background: "var(--input-bg)", border: "1px solid var(--input-border)", fontSize: "10.5px", display: "flex", alignItems: "center", gap: "4px"}}>
                {"Sort: Name ▾"}
              </div>
              <div style={{marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px", fontSize: "10.5px", color: "var(--text-muted)"}}>
                <span>
                  {"Type: "}{v.activeThought?.type}
                </span>
                <span style={{display: "flex", alignItems: "center", gap: "4px"}}>
                  <span style={{width: "11px", height: "11px", border: "1px solid var(--handle)", borderRadius: "2px", display: "inline-block"}} />
                  {"Private"}
                </span>
              </div>
            </div>
            <div style={{flex: "1", padding: "12px 14px", overflow: "auto"}}>
              {v.isThoughtTab ? (
                <>
                  <div style={{fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "12px"}}>
                    {"Parent, child, and jump links for "}
                    <b style={{color: "var(--text-secondary)"}}>
                      {v.activeThought?.title}
                    </b>
                    {" are shown in the Plex above. Use Thought → Create Child/Parent/Jump to connect new thoughts."}
                  </div>
                  <div style={{fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px"}}>
                    {"Attachments"}
                  </div>
                  {(v.attachmentsList || []).length ? (v.attachmentsList || []).map((att, $index) => (
                    <div key={att?.id ?? $index} style={{display: "flex", alignItems: "center", gap: "8px", padding: "6px 4px", fontSize: "12px", color: "var(--text-secondary)", borderBottom: "1px solid var(--divider)"}}>
                      <span style={{color: "var(--text-faint)", fontSize: "10px"}}>{att?.kind}</span>
                      <span>{att?.name}</span>
                    </div>
                  )) : (
                    <div style={{fontSize: "12px", color: "var(--text-faint)"}}>{"No attachments (stub). Use Thought → Add Attachment…"}</div>
                  )}
                </>
              ) : null}
              {v.isTagsTab ? (
                <>
                  <div style={{display: "flex", flexWrap: "wrap", gap: "6px"}}>
                    {(v.activeThought?.tags || []).map((tg, $index) => (
                      <React.Fragment key={tg?.id ?? $index}>
                        <div style={{fontSize: "11px", padding: "4px 10px", borderRadius: "100px", background: "var(--chip-bg)", color: "var(--text-secondary)"}}>
                          {tg}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </>
              ) : null}
              {v.isSearchTab ? (
                <>
                  <input type="text" value={v.panelSearch || ""} onChange={v.setPanelSearch} placeholder="Search…" style={{height: "24px", width: "100%", boxSizing: "border-box", borderRadius: "5px", background: "var(--input-bg)", border: "1px solid var(--input-border)", marginBottom: "10px", padding: "0 8px", fontSize: "12px", color: "var(--text)", outline: "none"}} />
                  {(v.searchResults || []).map((r, $index) => (
                    <React.Fragment key={r?.id ?? $index}>
                      <div style={{display: "flex", alignItems: "center", gap: "8px", padding: "6px 4px", fontSize: "12px", color: "var(--text-secondary)"}}>
                        <div style={{width: "7px", height: "7px", borderRadius: "2px", background: `${r?.color}`}} />
                        {r?.title}{" "}
                      </div>
                    </React.Fragment>
                  ))}
                </>
              ) : null}
              {v.isReportsTab ? (
                <>
                  <div style={{fontSize: "12px", color: "var(--text-muted)"}}>
                    {"Reports summarize thought counts, orphans, and link statistics across the Brain."}
                  </div>
                </>
              ) : null}
              {v.isCalendarTab ? (
                <>
                  {(v.upcomingEvents || []).map((ev, $index) => (
                    <React.Fragment key={ev?.id ?? $index}>
                      <div style={{display: "flex", gap: "10px", padding: "6px 0", borderBottom: "1px solid var(--divider)"}}>
                        <div style={{fontSize: "11px", color: "var(--text-muted)", width: "60px"}}>
                          {ev?.date}
                        </div>
                        <div style={{fontSize: "12px"}}>
                          {ev?.title}
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </>
              ) : null}
            </div>
            <div style={{height: "28px", flex: "none", display: "flex", alignItems: "center", gap: "2px", padding: "0 10px", borderTop: "1px solid var(--divider)"}}>
              {(v.thoughtTabs || []).map((tb, $index) => (
                <React.Fragment key={tb?.id ?? $index}>
                  <div onClick={tb?.onClick} style={css(tb?.style)}>
                    {tb?.label}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        {v.dialog ? (
          <>
            <div onClick={v.closeDialog} style={{position: "absolute", inset: "0", background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: "50"}}>
              <div onClick={v.stopProp} className="mn-dialog-shell" style={css((v.dialogShellStyle || "") + ";background:var(--dialog-bg);border:1px solid var(--input-border-strong);border-radius:10px;box-shadow:0 24px 60px rgba(0,0,0,0.6);display:flex;flex-direction:column;overflow:hidden")}>
                {v.isNewBrain ? (
                  <>
                    <div className="mn-dialog-body" style={{width: "100%", maxWidth: "100%", boxSizing: "border-box", flex: "1 1 auto", minHeight: "120px", display: "flex", flexDirection: "column", overflow: "auto"}}>
                      <div onMouseDown={v.startMainDialogDrag} className="mn-dialog-title" style={{display: "flex", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid var(--divider-strong)", fontSize: "13px", fontWeight: "600", position: "relative", cursor: "move", flex: "none", width: "100%", boxSizing: "border-box"}}>
                        {"New Brain "}
                        <div onClick={v.closeDialog} style={{position: "absolute", top: "8px", right: "10px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px", cursor: "pointer", color: "var(--text-muted)"}}>
                          {"✕"}
                        </div>
                      </div>
                      <div className="mn-dialog-body" style={{padding: "16px 14px", display: "flex", flexDirection: "column", gap: "10px", flex: "1 1 auto", minHeight: "80px", overflow: "auto", width: "100%", boxSizing: "border-box"}}>
                        <input type="text" placeholder="" value={v.newBrainName} onChange={v.setNewBrainName} style={{height: "26px", borderRadius: "5px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", padding: "0 8px", fontSize: "12px", color: "var(--text)", width: "100%", boxSizing: "border-box"}} />
                        <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                          <span style={{fontSize: "11.5px", color: "var(--text-muted)", whiteSpace: "nowrap"}}>
                            {"Location:"}
                          </span>
                          <div style={{flex: "1", fontSize: "11.5px", color: "var(--text-tertiary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                            {v.newBrainLocation}
                          </div>
                          <div onClick={v.openSelectLocation} style={{padding: "4px 12px", borderRadius: "5px", background: "var(--chip-bg)", border: "1px solid var(--input-border-strong)", fontSize: "11.5px", cursor: "pointer", whiteSpace: "nowrap"}}>
                            {"Browse…"}
                          </div>
                        </div>
                      </div>
                      <div className="mn-dialog-footer" style={{display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: "8px", padding: "12px 14px", borderTop: "1px solid var(--border)", flex: "none", width: "100%", boxSizing: "border-box", marginTop: "auto"}}>
                        <div onClick={v.closeDialog} style={css(v.btnPrimaryStyle)}>
                          {"OK"}
                        </div>
                        <div onClick={v.closeDialog} style={css(v.btnSecondaryStyle)}>
                          {"Cancel"}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {v.isLogin ? (
                  <>
                    <div className="mn-dialog-body" style={{width: "100%", maxWidth: "100%", boxSizing: "border-box", flex: "1 1 auto", minHeight: "120px", display: "flex", flexDirection: "column", overflow: "auto"}}>
                      <div onMouseDown={v.startMainDialogDrag} className="mn-dialog-title" style={{display: "flex", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid var(--divider-strong)", fontSize: "13px", fontWeight: "600", position: "relative", cursor: "move", flex: "none", width: "100%", boxSizing: "border-box"}}>
                        {"Mnemosyne "}
                        <div onClick={v.closeDialog} style={{position: "absolute", top: "8px", right: "10px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px", cursor: "pointer", color: "var(--text-muted)"}}>
                          {"✕"}
                        </div>
                      </div>
                      <div style={{display: "flex", gap: "20px", padding: "20px"}}>
                        <div style={{flex: "1"}}>
                          <div style={{fontSize: "16px", fontWeight: "700", marginBottom: "10px"}}>
                            {"Welcome to Cortex"}
                          </div>
                          <div style={{fontSize: "12px", lineHeight: "1.6", color: "var(--text-tertiary)", marginBottom: "14px"}}>
                            {"It starts with a single Thought and grows more powerful as you use it. Think of it as a living mind map with unlimited space for everything you want, are learning, or need to remember."}
                          </div>
                          <div style={{display: "flex", flexDirection: "column", gap: "8px", maxWidth: "280px"}}>
                            <label style={{fontSize: "11px", color: "var(--text-muted)"}}>
                              {"Username or Email"}
                            </label>
                            <input type="text" value={v.loginUsername} onChange={v.setLoginUsername} style={{height: "26px", borderRadius: "5px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", padding: "0 8px", fontSize: "12px", color: "var(--text)"}} />
                            <label style={{fontSize: "11px", color: "var(--text-muted)"}}>
                              {"Password"}
                            </label>
                            <input type="password" value={v.loginPassword} onChange={v.setLoginPassword} style={{height: "26px", borderRadius: "5px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", padding: "0 8px", fontSize: "12px", color: "var(--text)"}} />
                            <div onClick={v.closeDialog} style={{marginTop: "4px", padding: "6px 18px", borderRadius: "5px", background: "var(--accent)", color: "var(--accent-text)", fontSize: "12px", fontWeight: "600", cursor: "pointer", textAlign: "center"}}>
                              {"Login"}
                            </div>
                            <div style={{fontSize: "10.5px", color: "var(--text-muted)", marginTop: "6px"}}>
                              {"You are logging in to webbrain.com. "}
                              <a href="#" onClick={v.prevent}>
                                {"Do not connect to a server."}
                              </a>
                            </div>
                          </div>
                        </div>
                        <div style={{width: "210px", display: "flex", flexDirection: "column", gap: "8px"}}>
                          <div style={{height: "130px", borderRadius: "6px", background: "linear-gradient(160deg, oklch(0.3 0.09 240), oklch(0.16 0.03 250))", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="oklch(0.85 0.02 240)" strokeWidth="1.6">
                              <circle cx="12" cy="12" r="9" />
                              <path d="M9.5 8.5l6 3.5-6 3.5z" />
                            </svg>
                          </div>
                          <div style={{fontSize: "10.5px", textAlign: "center"}}>
                            <a href="#" onClick={v.prevent}>
                              {"Quickstart Video Tutorial"}
                            </a>
                          </div>
                          <div style={{fontSize: "10.5px", color: "var(--text-muted)", textAlign: "center", marginTop: "10px"}}>
                            {"Don't have an account?"}
                          </div>
                          <div style={{padding: "5px 0", borderRadius: "5px", background: "var(--chip-bg)", border: "1px solid var(--input-border-strong)", fontSize: "11px", textAlign: "center", cursor: "pointer"}}>
                            {"Sign Up"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {v.isGoogleCalendar ? (
                  <>
                    <div className="mn-dialog-body" style={{width: "100%", maxWidth: "100%", boxSizing: "border-box", flex: "1 1 auto", minHeight: "120px", display: "flex", flexDirection: "column", overflow: "auto"}}>
                      <div onMouseDown={v.startMainDialogDrag} className="mn-dialog-title" style={{display: "flex", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid var(--divider-strong)", fontSize: "13px", fontWeight: "600", position: "relative", cursor: "move", flex: "none", width: "100%", boxSizing: "border-box"}}>
                        {"Google Calendar Settings "}
                        <div onClick={v.closeDialog} style={{position: "absolute", top: "8px", right: "10px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px", cursor: "pointer", color: "var(--text-muted)"}}>
                          {"✕"}
                        </div>
                      </div>
                      <div className="mn-dialog-body" style={{padding: "16px 14px", display: "flex", flexDirection: "column", gap: "10px", flex: "1 1 auto", minHeight: "80px", overflow: "auto", width: "100%", boxSizing: "border-box"}}>
                        <label style={{fontSize: "11px", color: "var(--text-muted)"}}>
                          {"Username or Email"}
                        </label>
                        <input type="text" value={v.gcalUsername} onChange={v.setGcalUsername} style={{height: "26px", borderRadius: "5px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", padding: "0 8px", fontSize: "12px", color: "var(--text)"}} />
                        <label style={{fontSize: "11px", color: "var(--text-muted)"}}>
                          {"Password"}
                        </label>
                        <input type="password" value={v.gcalPassword} onChange={v.setGcalPassword} style={{height: "26px", borderRadius: "5px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", padding: "0 8px", fontSize: "12px", color: "var(--text)"}} />
                      </div>
                      <div className="mn-dialog-footer" style={{display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: "8px", padding: "12px 14px", borderTop: "1px solid var(--border)", flex: "none", width: "100%", boxSizing: "border-box", marginTop: "auto"}}>
                        <div onClick={v.closeDialog} style={css(v.btnPrimaryStyle)}>
                          {"OK"}
                        </div>
                        <div onClick={v.closeDialog} style={css(v.btnSecondaryStyle)}>
                          {"Cancel"}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {v.isRenameBrain ? (
                  <>
                    <div style={{width: "380px"}}>
                      <div onMouseDown={v.startMainDialogDrag} className="mn-dialog-title" style={{display: "flex", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid var(--divider-strong)", fontSize: "13px", fontWeight: "600", position: "relative", cursor: "move", flex: "none", width: "100%", boxSizing: "border-box"}}>
                        {"Rename Brain "}
                        <div onClick={v.closeDialog} style={{position: "absolute", top: "8px", right: "10px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px", cursor: "pointer", color: "var(--text-muted)"}}>
                          {"✕"}
                        </div>
                      </div>
                      <div style={{padding: "16px 14px", display: "flex", alignItems: "center", gap: "12px"}}>
                        <div style={{width: "26px", height: "26px", borderRadius: "6px", background: "var(--accent)", flex: "none", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--bg)" strokeWidth="2.6">
                            <circle cx="12" cy="12" r="3" />
                            <circle cx="12" cy="4" r="1.6" />
                            <circle cx="12" cy="20" r="1.6" />
                            <circle cx="4" cy="12" r="1.6" />
                            <circle cx="20" cy="12" r="1.6" />
                          </svg>
                        </div>
                        <div style={{flex: "1"}}>
                          <label style={{fontSize: "11px", color: "var(--text-muted)"}}>
                            {"Enter Brain name"}
                          </label>
                          <input type="text" value={v.renameBrainName} onChange={v.setRenameBrainName} style={{height: "26px", borderRadius: "5px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", padding: "0 8px", fontSize: "12px", color: "var(--text)", width: "100%", boxSizing: "border-box", marginTop: "4px"}} />
                        </div>
                      </div>
                      <div className="mn-dialog-footer" style={{display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: "8px", padding: "12px 14px", borderTop: "1px solid var(--border)", flex: "none", width: "100%", boxSizing: "border-box", marginTop: "auto"}}>
                        <div onClick={v.closeDialog} style={css(v.btnPrimaryStyle)}>
                          {"OK"}
                        </div>
                        <div onClick={v.closeDialog} style={css(v.btnSecondaryStyle)}>
                          {"Cancel"}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {v.isCreateBrainZip ? (
                  <>
                    <div className="mn-dialog-body" style={{width: "100%", maxWidth: "100%", boxSizing: "border-box", flex: "1 1 auto", minHeight: "120px", display: "flex", flexDirection: "column", overflow: "auto"}}>
                      <div onMouseDown={v.startMainDialogDrag} className="mn-dialog-title" style={{display: "flex", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid var(--divider-strong)", fontSize: "13px", fontWeight: "600", position: "relative", cursor: "move", flex: "none", width: "100%", boxSizing: "border-box"}}>
                        {"Create BrainZip Options "}
                        <div onClick={v.closeDialog} style={{position: "absolute", top: "8px", right: "10px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px", cursor: "pointer", color: "var(--text-muted)"}}>
                          {"✕"}
                        </div>
                      </div>
                      <div className="mn-dialog-body" style={{padding: "16px 14px", display: "flex", flexDirection: "column", gap: "10px", flex: "1 1 auto", minHeight: "80px", overflow: "auto", width: "100%", boxSizing: "border-box"}}>
                        <label style={{fontSize: "11px", color: "var(--text-muted)"}}>
                          {"Name"}
                        </label>
                        <input type="text" value={v.zipName} onChange={v.setZipName} style={{height: "26px", borderRadius: "5px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", padding: "0 8px", fontSize: "12px", color: "var(--text)"}} />
                        <label style={{display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--text-secondary)"}}>
                          <input type="checkbox" checked={v.zipIncludeAttachments} onChange={v.setZipIncludeAttachments} />
                          {" Include file attachments"}
                        </label>
                        <label style={{display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--text-secondary)"}}>
                          <input type="checkbox" checked={v.zipIncludeSearchIndex} onChange={v.setZipIncludeSearchIndex} />
                          {" Include search index"}
                        </label>
                        <label style={{fontSize: "11px", color: "var(--text-muted)"}}>
                          {"Output folder"}
                        </label>
                        <div style={{display: "flex", gap: "8px"}}>
                          <input type="text" value={v.zipOutputFolder} onChange={v.setZipOutputFolder} style={{flex: "1", height: "26px", borderRadius: "5px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", padding: "0 8px", fontSize: "12px", color: "var(--text)"}} />
                          <div style={{padding: "4px 12px", borderRadius: "5px", background: "var(--chip-bg)", border: "1px solid var(--input-border-strong)", fontSize: "11.5px", cursor: "pointer", whiteSpace: "nowrap"}}>
                            {"Browse…"}
                          </div>
                        </div>
                      </div>
                      <div className="mn-dialog-footer" style={{display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: "8px", padding: "12px 14px", borderTop: "1px solid var(--border)", flex: "none", width: "100%", boxSizing: "border-box", marginTop: "auto"}}>
                        <div onClick={v.closeDialog} style={css(v.btnPrimaryStyle)}>
                          {"OK"}
                        </div>
                        <div onClick={v.closeDialog} style={css(v.btnSecondaryStyle)}>
                          {"Cancel"}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {v.isPrintPlex ? (
                  <>
                    <div className="mn-dialog-body" style={{width: "100%", maxWidth: "100%", boxSizing: "border-box", flex: "1 1 auto", minHeight: "120px", display: "flex", flexDirection: "column", overflow: "auto"}}>
                      <div onMouseDown={v.startMainDialogDrag} className="mn-dialog-title" style={{display: "flex", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid var(--divider-strong)", fontSize: "13px", fontWeight: "600", position: "relative", cursor: "move", flex: "none", width: "100%", boxSizing: "border-box"}}>
                        {"Print "}
                        <div onClick={v.closeDialog} style={{position: "absolute", top: "8px", right: "10px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px", cursor: "pointer", color: "var(--text-muted)"}}>
                          {"✕"}
                        </div>
                      </div>
                      <div className="mn-dialog-body" style={{padding: "16px 14px", display: "flex", flexDirection: "column", gap: "10px", flex: "1 1 auto", minHeight: "80px", overflow: "auto", width: "100%", boxSizing: "border-box"}}>
                        <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                          <span style={{fontSize: "11px", color: "var(--text-muted)", width: "50px"}}>
                            {"Name:"}
                          </span>
                          <select style={{flex: "1", height: "26px", borderRadius: "5px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", color: "var(--text)", fontSize: "12px"}}>
                            <option>
                              {"WF-4820 Series (Network)"}
                            </option>
                          </select>
                          <div style={{padding: "4px 10px", borderRadius: "5px", background: "var(--chip-bg)", border: "1px solid var(--input-border-strong)", fontSize: "11px", cursor: "pointer", whiteSpace: "nowrap"}}>
                            {"Properties"}
                          </div>
                        </div>
                        <div style={{fontSize: "11px", color: "var(--text-muted)", lineHeight: "1.7"}}>
                          {"Status: Ready Type: EPSON WF-4820 Series"}
                          <br />
                          {"Where: EP94D0CA:WF-4820 SERIES"}
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", gap: "16px", marginTop: "6px"}}>
                          <div style={{flex: "1"}}>
                            <div style={{fontSize: "11px", color: "var(--text-muted)", marginBottom: "6px"}}>
                              {"Print range"}
                            </div>
                            <label style={{display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-secondary)"}}>
                              <input type="radio" name="printRange" checked={v.printRangeAll} onChange={v.setPrintRangeAll} />
                              {" All"}
                            </label>
                            <label style={{display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-secondary)"}}>
                              <input type="radio" name="printRange" checked={v.printRangePages} onChange={v.setPrintRangePages} />
                              {" Pages"}
                            </label>
                            <label style={{display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-secondary)"}}>
                              <input type="radio" name="printRange" checked={v.printRangeSelection} onChange={v.setPrintRangeSelection} />
                              {" Selection"}
                            </label>
                          </div>
                          <div style={{width: "110px"}}>
                            <div style={{fontSize: "11px", color: "var(--text-muted)", marginBottom: "6px"}}>
                              {"Copies"}
                            </div>
                            <input type="number" min="1" value={v.printCopies} onChange={v.setPrintCopies} style={{width: "100%", height: "26px", borderRadius: "5px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", padding: "0 8px", fontSize: "12px", color: "var(--text)", boxSizing: "border-box"}} />
                          </div>
                        </div>
                      </div>
                      <div className="mn-dialog-footer" style={{display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: "8px", padding: "12px 14px", borderTop: "1px solid var(--border)", flex: "none", width: "100%", boxSizing: "border-box", marginTop: "auto"}}>
                        <div onClick={v.closeDialog} style={css(v.btnPrimaryStyle)}>
                          {"OK"}
                        </div>
                        <div onClick={v.closeDialog} style={css(v.btnSecondaryStyle)}>
                          {"Cancel"}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {v.isPrintSettings ? (
                  <>
                    <div className="mn-dialog-body" style={{width: "100%", maxWidth: "100%", boxSizing: "border-box", flex: "1 1 auto", minHeight: "120px", display: "flex", flexDirection: "column", overflow: "auto"}}>
                      <div onMouseDown={v.startMainDialogDrag} className="mn-dialog-title" style={{display: "flex", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid var(--divider-strong)", fontSize: "13px", fontWeight: "600", position: "relative", cursor: "move", flex: "none", width: "100%", boxSizing: "border-box"}}>
                        {"Print Settings "}
                        <div onClick={v.closeDialog} style={{position: "absolute", top: "8px", right: "10px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px", cursor: "pointer", color: "var(--text-muted)"}}>
                          {"✕"}
                        </div>
                      </div>
                      <div className="mn-dialog-body" style={{padding: "16px 14px", display: "flex", flexDirection: "column", gap: "10px", flex: "1 1 auto", minHeight: "80px", overflow: "auto", width: "100%", boxSizing: "border-box"}}>
                        <label style={{fontSize: "11px", color: "var(--text-muted)"}}>
                          {"Select the maximum number of pages to use."}
                        </label>
                        <select value={v.maxPages} onChange={v.setMaxPages} style={{height: "26px", borderRadius: "5px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", color: "var(--text)", fontSize: "12px"}}>
                          <option>
                            {"1 page"}
                          </option>
                          <option>
                            {"4 pages"}
                          </option>
                          <option>
                            {"9 pages"}
                          </option>
                          <option>
                            {"16 pages"}
                          </option>
                        </select>
                        <label style={{display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--text-secondary)"}}>
                          <input type="checkbox" checked={v.whiteBackground} onChange={v.setWhiteBackground} />
                          {" Print using a white background"}
                        </label>
                      </div>
                      <div className="mn-dialog-footer" style={{display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: "8px", padding: "12px 14px", borderTop: "1px solid var(--border)", flex: "none", width: "100%", boxSizing: "border-box", marginTop: "auto"}}>
                        <div onClick={v.goToPageSetup} style={css(v.btnPrimaryStyle)}>
                          {"OK"}
                        </div>
                        <div onClick={v.closeDialog} style={css(v.btnSecondaryStyle)}>
                          {"Cancel"}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {v.isPageSetup ? (
                  <>
                    <div style={{width: "380px"}}>
                      <div onMouseDown={v.startMainDialogDrag} className="mn-dialog-title" style={{display: "flex", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid var(--divider-strong)", fontSize: "13px", fontWeight: "600", position: "relative", cursor: "move", flex: "none", width: "100%", boxSizing: "border-box"}}>
                        {"Page Setup "}
                        <div onClick={v.closeDialog} style={{position: "absolute", top: "8px", right: "10px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px", cursor: "pointer", color: "var(--text-muted)"}}>
                          {"✕"}
                        </div>
                      </div>
                      <div style={{padding: "16px 14px", display: "flex", flexDirection: "column", gap: "12px"}}>
                        <div style={{alignSelf: "center", width: "110px", height: "130px", background: "var(--divider)", border: "1px solid var(--input-border-strong)", borderRadius: "2px"}} />
                        <div>
                          <div style={{fontSize: "11px", color: "var(--text-muted)", marginBottom: "12px", fontWeight: "600"}}>
                            {"Paper"}
                          </div>
                          <label style={{fontSize: "11px", color: "var(--text-muted)"}}>
                            {"Size"}
                          </label>
                          <select style={{width: "100%", height: "26px", borderRadius: "5px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", color: "var(--text)", fontSize: "12px", margin: "4px 0 8px"}}>
                            <option>
                              {"Letter 8.5 x 11 in (216 x 279 mm)"}
                            </option>
                            <option>
                              {"A4 8.27 x 11.69 in (210 x 297 mm)"}
                            </option>
                          </select>
                          <label style={{fontSize: "11px", color: "var(--text-muted)"}}>
                            {"Source"}
                          </label>
                          <select style={{width: "100%", height: "26px", borderRadius: "5px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", color: "var(--text)", fontSize: "12px", margin: "4px 0 0"}}>
                            <option>
                              {"Paper Cassette"}
                            </option>
                          </select>
                        </div>
                        <div style={{display: "flex", gap: "16px"}}>
                          <div style={{flex: "1"}}>
                            <div style={{fontSize: "11px", color: "var(--text-muted)", marginBottom: "6px", fontWeight: "600"}}>
                              {"Orientation"}
                            </div>
                            <label style={{display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-secondary)"}}>
                              <input type="radio" name="orient" checked={v.orientPortrait} onChange={v.setOrientPortrait} />
                              {" Portrait"}
                            </label>
                            <label style={{display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-secondary)"}}>
                              <input type="radio" name="orient" checked={v.orientLandscape} onChange={v.setOrientLandscape} />
                              {" Landscape"}
                            </label>
                          </div>
                          <div style={{flex: "1"}}>
                            <div style={{fontSize: "11px", color: "var(--text-muted)", marginBottom: "6px", fontWeight: "600"}}>
                              {"Margins (inches)"}
                            </div>
                            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px"}}>
                              <input type="text" value={v.marginLeft} onChange={v.setMarginLeft} style={{height: "24px", borderRadius: "4px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", padding: "0 6px", fontSize: "11px", color: "var(--text)"}} />
                              <input type="text" value={v.marginRight} onChange={v.setMarginRight} style={{height: "24px", borderRadius: "4px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", padding: "0 6px", fontSize: "11px", color: "var(--text)"}} />
                              <input type="text" value={v.marginTop} onChange={v.setMarginTop} style={{height: "24px", borderRadius: "4px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", padding: "0 6px", fontSize: "11px", color: "var(--text)"}} />
                              <input type="text" value={v.marginBottom} onChange={v.setMarginBottom} style={{height: "24px", borderRadius: "4px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", padding: "0 6px", fontSize: "11px", color: "var(--text)"}} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mn-dialog-footer" style={{display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: "8px", padding: "12px 14px", borderTop: "1px solid var(--border)", flex: "none", width: "100%", boxSizing: "border-box", marginTop: "auto"}}>
                        <div onClick={v.closeDialog} style={css(v.btnPrimaryStyle)}>
                          {"OK"}
                        </div>
                        <div onClick={v.closeDialog} style={css(v.btnSecondaryStyle)}>
                          {"Cancel"}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {v.isPreferences ? (
                  <>
                    <div className="mn-dialog-body" style={{width: "100%", maxWidth: "100%", boxSizing: "border-box", flex: "1 1 auto", minHeight: "120px", display: "flex", flexDirection: "column", overflow: "auto"}}>
                      <div onMouseDown={v.startMainDialogDrag} className="mn-dialog-title" style={{display: "flex", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid var(--divider-strong)", fontSize: "13px", fontWeight: "600", position: "relative", cursor: "move", flex: "none", width: "100%", boxSizing: "border-box"}}>
                        {"Preferences "}
                        <div onClick={v.closeDialog} style={{position: "absolute", top: "8px", right: "10px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px", cursor: "pointer", color: "var(--text-muted)"}}>
                          {"✕"}
                        </div>
                      </div>
                      <div className="mn-prefs-tabs" style={{flexWrap: "wrap", width: "100%", display: "flex", gap: "4px", padding: "10px 14px", borderBottom: "1px solid var(--border)"}}>
                        {(v.prefsTabs || []).map((pt, $index) => (
                          <React.Fragment key={pt?.id ?? $index}>
                            <div onClick={pt?.onClick} style={css(pt?.style)}>
                              <div dangerouslySetInnerHTML={pt?.icon} />
                              {pt?.label}{" "}
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                      <div style={{height: "420px", overflow: "auto", padding: "16px"}}>
                        {v.isPrefsGeneral ? (
                          <>
                            <div style={{border: "1px solid var(--divider-strong)", borderRadius: "6px", padding: "14px", marginBottom: "14px"}}>
                              <div style={{fontSize: "11px", color: "var(--text-muted)", marginBottom: "10px"}}>
                                {"User Account"}
                              </div>
                              <div style={{display: "flex", alignItems: "center", gap: "14px", marginBottom: "10px"}}>
                                <span style={{fontSize: "12px", flex: "1"}}>
                                  {"No Cloud Services server is connected."}
                                </span>
                                <div style={{padding: "5px 16px", borderRadius: "5px", background: "var(--accent)", color: "var(--accent-text)", fontSize: "12px", fontWeight: "600", cursor: "pointer"}}>
                                  {"Login"}
                                </div>
                              </div>
                              <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                                <span style={{fontSize: "11.5px", color: "var(--text-muted)", width: "100px"}}>
                                  {"Server address:"}
                                </span>
                                <input type="text" value={v.pf?.serverAddress} onChange={v.setPrefText('serverAddress')} style={{flex: "1", height: "24px", borderRadius: "5px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", padding: "0 8px", fontSize: "12px", color: "var(--text)"}} />
                              </div>
                            </div>
                            <div style={{border: "1px solid var(--divider-strong)", borderRadius: "6px", padding: "14px"}}>
                              <div style={{fontSize: "11px", color: "var(--text-muted)", marginBottom: "10px"}}>
                                {"General Options"}
                              </div>
                              <div style={{display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px"}}>
                                <span style={{fontSize: "12px", width: "110px"}}>
                                  {"Interface Language"}
                                </span>
                                <select value={v.pf?.language} onChange={v.setPrefText('language')} style={{height: "24px", borderRadius: "5px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", color: "var(--text)", fontSize: "12px"}}>
                                  <option>
                                    {"English"}
                                  </option>
                                </select>
                              </div>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.openAtStartup} onChange={v.setPrefCheck('openAtStartup')} />
                                {" Open when Windows starts"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.checkUpdates} onChange={v.setPrefCheck('checkUpdates')} />
                                {" Check for major updates on startup"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.openLastBrain} onChange={v.setPrefCheck('openLastBrain')} />
                                {" Open the last used Brain at startup"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.copyNotesAsText} onChange={v.setPrefCheck('copyNotesAsText')} />
                                {" Copy/cut/paste notes as text always"}
                              </label>
                            </div>
                          </>
                        ) : null}
                        {v.isPrefsLookFeel ? (
                          <>
                            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px"}}>
                              <div style={{border: "1px solid var(--divider-strong)", borderRadius: "6px", padding: "14px"}}>
                                <div style={{fontSize: "11px", color: "var(--text-muted)", marginBottom: "8px"}}>
                                  {"Thoughts"}
                                </div>
                                <label style={css(v.chk)}>
                                  <input type="checkbox" checked={v.pf?.textShadows} onChange={v.setPrefCheck('textShadows')} />
                                  {" Text shadows"}
                                </label>
                                <label style={css(v.chk)}>
                                  <input type="checkbox" checked={v.pf?.backgrounds} onChange={v.setPrefCheck('backgrounds')} />
                                  {" Backgrounds"}
                                </label>
                                <label style={css(v.chk)}>
                                  <input type="checkbox" checked={v.pf?.thumbnails} onChange={v.setPrefCheck('thumbnails')} />
                                  {" Load thumbnails for large images"}
                                </label>
                                <label style={css(v.chk)}>
                                  <input type="checkbox" checked={v.pf?.fadeDistant} onChange={v.setPrefCheck('fadeDistant')} />
                                  {" Fade distant"}
                                </label>
                                <label style={css(v.chk)}>
                                  <input type="checkbox" checked={v.pf?.shrinkOutline} onChange={v.setPrefCheck('shrinkOutline')} />
                                  {" Shrink in outline and expanded view"}
                                </label>
                                <label style={css(v.chk)}>
                                  <input type="checkbox" checked={v.pf?.showIcons} onChange={v.setPrefCheck('showIcons')} />
                                  {" Show icons when notes are present"}
                                </label>
                                <label style={css(v.chk)}>
                                  <input type="checkbox" checked={v.pf?.hideTagHints} onChange={v.setPrefCheck('hideTagHints')} />
                                  {" Hide tag hints"}
                                </label>
                              </div>
                              <div style={{border: "1px solid var(--divider-strong)", borderRadius: "6px", padding: "14px"}}>
                                <div style={{fontSize: "11px", color: "var(--text-muted)", marginBottom: "8px"}}>
                                  {"Plex"}
                                </div>
                                <div style={{fontSize: "11px", marginBottom: "4px"}}>
                                  {"Animation"}
                                </div>
                                <input type="range" min="0" max="100" value={v.pf?.animSpeed} onChange={v.setPrefText('animSpeed')} style={{width: "100%"}} />
                                <div style={{display: "flex", justifyContent: "space-between", fontSize: "10px", color: "var(--text-muted)", marginBottom: "10px"}}>
                                  <span>
                                    {"Fast"}
                                  </span>
                                  <span>
                                    {"Slow"}
                                  </span>
                                </div>
                                <label style={css(v.chk)}>
                                  <input type="checkbox" checked={v.pf?.activeIndicator} onChange={v.setPrefCheck('activeIndicator')} />
                                  {" Active Thought Indicator"}
                                </label>
                                <label style={css(v.chk)}>
                                  <input type="checkbox" checked={v.pf?.showSiblings} onChange={v.setPrefCheck('showSiblings')} />
                                  {" Show siblings"}
                                </label>
                                <div style={{display: "flex", alignItems: "center", gap: "8px", marginTop: "8px"}}>
                                  <span style={{fontSize: "11px"}}>
                                    {"Max child columns (normal view)"}
                                  </span>
                                  <select value={v.pf?.maxChildColumns} onChange={v.setPrefText('maxChildColumns')} style={{height: "22px", borderRadius: "4px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", color: "var(--text)", fontSize: "11px"}}>
                                    <option>
                                      {"6"}
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div style={{border: "1px solid var(--divider-strong)", borderRadius: "6px", padding: "14px", marginBottom: "14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px"}}>
                              <div style={{gridColumn: "1/-1", fontSize: "11px", color: "var(--text-muted)"}}>
                                {"Links"}
                              </div>
                              <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                                <span style={{fontSize: "11px"}}>
                                  {"Thickness"}
                                </span>
                                <select value={v.pf?.linkThickness} onChange={v.setPrefText('linkThickness')} style={{height: "22px", borderRadius: "4px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", color: "var(--text)", fontSize: "11px"}}>
                                  <option>
                                    {"2.0"}
                                  </option>
                                </select>
                              </div>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.hideLinkLabels} onChange={v.setPrefCheck('hideLinkLabels')} />
                                {" Hide link labels"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.drawLinks} onChange={v.setPrefCheck('drawLinks')} />
                                {" Draw links"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.glowEffect} onChange={v.setPrefCheck('glowEffect')} />
                                {" Add \"glow\" effect"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.curvedLinks} onChange={v.setPrefCheck('curvedLinks')} />
                                {" Curved links"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.thickenHighlighted} onChange={v.setPrefCheck('thickenHighlighted')} />
                                {" Thicken highlighted links"}
                              </label>
                            </div>
                            <div style={{border: "1px solid var(--divider-strong)", borderRadius: "6px", padding: "14px"}}>
                              <div style={{fontSize: "11px", color: "var(--text-muted)", marginBottom: "8px"}}>
                                {"Brain Specific Settings"}
                              </div>
                              <div style={{display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px"}}>
                                <span style={{fontSize: "11px", width: "80px"}}>
                                  {"Plex Font"}
                                </span>
                                <select value={v.pf?.plexFont} onChange={v.setPrefText('plexFont')} style={{height: "22px", borderRadius: "4px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", color: "var(--text)", fontSize: "11px"}}>
                                  <option>
                                    {"SansSerif"}
                                  </option>
                                </select>
                              </div>
                              <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                                <span style={{fontSize: "11px", width: "80px"}}>
                                  {"Apply colors to"}
                                </span>
                                <select value={v.pf?.applyColorsTo} onChange={v.setPrefText('applyColorsTo')} style={{height: "22px", borderRadius: "4px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", color: "var(--text)", fontSize: "11px"}}>
                                  <option>
                                    {"Text"}
                                  </option>
                                </select>
                              </div>
                            </div>
                          </>
                        ) : null}
                        {v.isPrefsUI ? (
                          <>
                            <div style={{border: "1px solid var(--divider-strong)", borderRadius: "6px", padding: "14px", marginBottom: "14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 20px"}}>
                              <div style={{gridColumn: "1/-1", fontSize: "11px", color: "var(--text-muted)"}}>
                                {"General User Interface"}
                              </div>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.mouseWheelResize} onChange={v.setPrefCheck('mouseWheelResize')} />
                                {" Mouse wheel resizing"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.showVirtualThoughts} onChange={v.setPrefCheck('showVirtualThoughts')} />
                                {" Show virtual Thoughts for folders"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.resizeDraggable} onChange={v.setPrefCheck('resizeDraggable')} />
                                {" Resizing circle is draggable"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.activateLastCreated} onChange={v.setPrefCheck('activateLastCreated')} />
                                {" Activate last created Thought"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.clickToCreate} onChange={v.setPrefCheck('clickToCreate')} />
                                {" Click active Thought to open/create"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.hidePinsPresentation} onChange={v.setPrefCheck('hidePinsPresentation')} />
                                {" Hide pins in presentation mode"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.updateOnHighlight} onChange={v.setPrefCheck('updateOnHighlight')} />
                                {" Update tools on highlight of Thoughts and links"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.highlightRecent} onChange={v.setPrefCheck('highlightRecent')} />
                                {" Highlight recently created Thoughts"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.autoCapitalize} onChange={v.setPrefCheck('autoCapitalize')} />
                                {" Automatically capitalize Thoughts on creation"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.doubleClickMaximizes} onChange={v.setPrefCheck('doubleClickMaximizes')} />
                                {" Double-click maximizes plex"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.forgetBeforeDelete} onChange={v.setPrefCheck('forgetBeforeDelete')} />
                                {" Forget Thoughts before deleting"}
                              </label>
                              <div />
                              <div style={{gridColumn: "1/-1", display: "flex", alignItems: "center", gap: "8px", marginTop: "6px"}}>
                                <span style={{fontSize: "11px"}}>
                                  {"On drag and drop of files"}
                                </span>
                                <select value={v.pf?.dragDropFiles} onChange={v.setPrefText('dragDropFiles')} style={{height: "22px", borderRadius: "4px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", color: "var(--text)", fontSize: "11px"}}>
                                  <option>
                                    {"Link to dropped files"}
                                  </option>
                                </select>
                              </div>
                              <div style={{gridColumn: "1/-1", display: "flex", alignItems: "center", gap: "8px"}}>
                                <span style={{fontSize: "11px"}}>
                                  {"Destination for Explorer \"Send To\" Integration"}
                                </span>
                                <select value={v.pf?.sendToDest} onChange={v.setPrefText('sendToDest')} style={{height: "22px", borderRadius: "4px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", color: "var(--text)", fontSize: "11px"}}>
                                  <option>
                                    {"Home Thought"}
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div style={{border: "1px solid var(--divider-strong)", borderRadius: "6px", padding: "14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 20px"}}>
                              <div style={{gridColumn: "1/-1", fontSize: "11px", color: "var(--text-muted)"}}>
                                {"ESP Sync"}
                              </div>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.monitorClipboard} onChange={v.setPrefCheck('monitorClipboard')} />
                                {" Monitor clipboard"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.cancelIfUnused} onChange={v.setPrefCheck('cancelIfUnused')} />
                                {" Cancel if not used within 1 minute"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.monitorKeyboard} onChange={v.setPrefCheck('monitorKeyboard')} />
                                {" Monitor keyboard"}
                              </label>
                              <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                                <span style={{fontSize: "11px"}}>
                                  {"Activation"}
                                </span>
                                <select value={v.pf?.activation} onChange={v.setPrefText('activation')} style={{height: "22px", borderRadius: "4px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", color: "var(--text)", fontSize: "11px"}}>
                                  <option>
                                    {"Automatically activate"}
                                  </option>
                                </select>
                              </div>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.ignoreLowercase} onChange={v.setPrefCheck('ignoreLowercase')} />
                                {" Ignore text that is all lowercase"}
                              </label>
                            </div>
                          </>
                        ) : null}
                        {v.isPrefsViews ? (
                          <>
                            <div style={{border: "1px solid var(--divider-strong)", borderRadius: "6px", padding: "14px", marginBottom: "14px"}}>
                              <div style={{fontSize: "11px", color: "var(--text-muted)", marginBottom: "8px"}}>
                                {"Expanded View"}
                              </div>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.collapseOnActivate} onChange={v.setPrefCheck('collapseOnActivate')} />
                                {" Collapse on activate"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.autoRecenter} onChange={v.setPrefCheck('autoRecenter')} />
                                {" Automatically recenter"}
                              </label>
                            </div>
                            <div style={{border: "1px solid var(--divider-strong)", borderRadius: "6px", padding: "14px", marginBottom: "14px", display: "grid", gridTemplateColumns: "auto 1fr", gap: "8px 14px", alignItems: "center"}}>
                              <div style={{gridColumn: "1/-1", fontSize: "11px", color: "var(--text-muted)"}}>
                                {"Expanded Normal View"}
                              </div>
                              <span style={{fontSize: "11px"}}>
                                {"Distant Thought Size:"}
                              </span>
                              <input type="range" min="0" max="100" value={v.pf?.distantThoughtSize} onChange={v.setPrefText('distantThoughtSize')} />
                              <span style={{fontSize: "11px"}}>
                                {"Spacing:"}
                              </span>
                              <input type="range" min="0" max="100" value={v.pf?.spacing} onChange={v.setPrefText('spacing')} />
                              <span style={{fontSize: "11px"}}>
                                {"Distant Thought Spacing:"}
                              </span>
                              <input type="range" min="0" max="100" value={v.pf?.distantSpacing} onChange={v.setPrefText('distantSpacing')} />
                              <span style={{fontSize: "11px"}}>
                                {"Distant Thought Columns:"}
                              </span>
                              <input type="range" min="0" max="100" value={v.pf?.distantColumns} onChange={v.setPrefText('distantColumns')} />
                            </div>
                            <div style={{border: "1px solid var(--divider-strong)", borderRadius: "6px", padding: "14px", display: "grid", gridTemplateColumns: "auto 1fr", gap: "8px 14px", alignItems: "center"}}>
                              <div style={{gridColumn: "1/-1", fontSize: "11px", color: "var(--text-muted)"}}>
                                {"Outline View"}
                              </div>
                              <span style={{fontSize: "11px"}}>
                                {"Active Thought Distance:"}
                              </span>
                              <input type="range" min="0" max="100" value={v.pf?.activeDistance} onChange={v.setPrefText('activeDistance')} />
                              <span style={{fontSize: "11px"}}>
                                {"Thought Indentation:"}
                              </span>
                              <input type="range" min="0" max="100" value={v.pf?.thoughtIndentation} onChange={v.setPrefText('thoughtIndentation')} />
                            </div>
                          </>
                        ) : null}
                        {v.isPrefsSearch ? (
                          <>
                            <div style={{border: "1px solid var(--divider-strong)", borderRadius: "6px", padding: "14px"}}>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.mergeResults} onChange={v.setPrefCheck('mergeResults')} />
                                {" Merge Thought and content results"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.oneResultPerThought} onChange={v.setPrefCheck('oneResultPerThought')} />
                                {" Only display one search result per Thought"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.indexFileAttachments} onChange={v.setPrefCheck('indexFileAttachments')} />
                                {" Index File attachments"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.indexUrlAttachments} onChange={v.setPrefCheck('indexUrlAttachments')} />
                                {" Index URL attachments"}
                              </label>
                              <div style={{display: "grid", gridTemplateColumns: "auto 1fr", gap: "8px 14px", alignItems: "center", marginTop: "10px", maxWidth: "340px"}}>
                                <span style={{fontSize: "11px"}}>
                                  {"Maximum results size:"}
                                </span>
                                <select value={v.pf?.maxResultsSize} onChange={v.setPrefText('maxResultsSize')} style={{height: "22px", borderRadius: "4px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", color: "var(--text)", fontSize: "11px"}}>
                                  <option>
                                    {"100"}
                                  </option>
                                </select>
                                <span style={{fontSize: "11px"}}>
                                  {"Results per page:"}
                                </span>
                                <select value={v.pf?.resultsPerPage} onChange={v.setPrefText('resultsPerPage')} style={{height: "22px", borderRadius: "4px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", color: "var(--text)", fontSize: "11px"}}>
                                  <option>
                                    {"10"}
                                  </option>
                                </select>
                                <span style={{fontSize: "11px"}}>
                                  {"Default sort:"}
                                </span>
                                <select value={v.pf?.defaultSort} onChange={v.setPrefText('defaultSort')} style={{height: "22px", borderRadius: "4px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", color: "var(--text)", fontSize: "11px"}}>
                                  <option>
                                    {"Relevance"}
                                  </option>
                                </select>
                                <span style={{fontSize: "11px"}}>
                                  {"Maximum file size to index:"}
                                </span>
                                <select value={v.pf?.maxFileSize} onChange={v.setPrefText('maxFileSize')} style={{height: "22px", borderRadius: "4px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", color: "var(--text)", fontSize: "11px"}}>
                                  <option>
                                    {"5 MB"}
                                  </option>
                                </select>
                                <span style={{fontSize: "11px"}}>
                                  {"Refresh Web pages index:"}
                                </span>
                                <select value={v.pf?.refreshWebIndex} onChange={v.setPrefText('refreshWebIndex')} style={{height: "22px", borderRadius: "4px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", color: "var(--text)", fontSize: "11px"}}>
                                  <option>
                                    {"Never"}
                                  </option>
                                </select>
                              </div>
                              <div style={{display: "flex", alignItems: "center", gap: "8px", marginTop: "14px", fontSize: "11px"}}>
                                {"Filter under active up to "}
                                <select value={v.pf?.filterClicksAway} onChange={v.setPrefText('filterClicksAway')} style={{height: "22px", borderRadius: "4px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", color: "var(--text)", fontSize: "11px"}}>
                                  <option>
                                    {"3"}
                                  </option>
                                </select>
                                {" clicks away."}
                              </div>
                            </div>
                          </>
                        ) : null}
                        {v.isPrefsColors ? (
                          <>
                            <div style={{border: "1px solid var(--input-border)", borderRadius: "6px", overflow: "hidden"}}>
                              {(v.colorRows || []).map((cr, $index) => (
                                <React.Fragment key={cr?.id ?? $index}>
                                  <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 10px", fontSize: "11.5px", borderBottom: "1px solid var(--divider)"}}>
                                    <span>
                                      {cr?.label}
                                    </span>
                                    <div style={{width: "44px", height: "14px", borderRadius: "3px", background: `${cr?.color}`, border: "1px solid var(--input-border-strong)"}} />
                                  </div>
                                </React.Fragment>
                              ))}
                            </div>
                          </>
                        ) : null}
                        {v.isPrefsAdvanced ? (
                          <>
                            <div style={{border: "1px solid var(--divider-strong)", borderRadius: "6px", padding: "14px", marginBottom: "14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 16px"}}>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.sortByRecent} onChange={v.setPrefCheck('sortByRecent')} />
                                {" Sort instant results by most recently activated"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.hideTempFiles} onChange={v.setPrefCheck('hideTempFiles')} />
                                {" Hide temporary files in Thought folders"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.contextSensitiveNames} onChange={v.setPrefCheck('contextSensitiveNames')} />
                                {" Enable context-sensitive names"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.tabletEditBoxes} onChange={v.setPrefCheck('tabletEditBoxes')} />
                                {" Use Tablet-compatible edit boxes"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.saveImagesLocally} onChange={v.setPrefCheck('saveImagesLocally')} />
                                {" Save images from the Internet locally"}
                              </label>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.showMemoryUsage} onChange={v.setPrefCheck('showMemoryUsage')} />
                                {" Show memory usage in toolbar"}
                              </label>
                            </div>
                            <div style={{border: "1px solid var(--divider-strong)", borderRadius: "6px", padding: "14px", marginBottom: "14px"}}>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.useProxy} onChange={v.setPrefCheck('useProxy')} />
                                {" Use a proxy server"}
                              </label>
                              <div style={{display: "grid", gridTemplateColumns: "auto 1fr auto 1fr", gap: "8px", alignItems: "center", marginTop: "8px"}}>
                                <span style={{fontSize: "11px"}}>
                                  {"Address:"}
                                </span>
                                <input type="text" value={v.pf?.proxyAddress} onChange={v.setPrefText('proxyAddress')} style={{height: "22px", borderRadius: "4px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", padding: "0 6px", fontSize: "11px", color: "var(--text)"}} />
                                <span style={{fontSize: "11px"}}>
                                  {"Port:"}
                                </span>
                                <input type="text" value={v.pf?.proxyPort} onChange={v.setPrefText('proxyPort')} style={{height: "22px", borderRadius: "4px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", padding: "0 6px", fontSize: "11px", color: "var(--text)"}} />
                              </div>
                              <label style={{"{ chk }}marginTop": "8px"}}>
                                <input type="checkbox" checked={v.pf?.proxyAuth} onChange={v.setPrefCheck('proxyAuth')} />
                                {" Proxy server requires authentication"}
                              </label>
                              <div style={{display: "grid", gridTemplateColumns: "auto 1fr auto 1fr", gap: "8px", alignItems: "center", marginTop: "6px"}}>
                                <span style={{fontSize: "11px"}}>
                                  {"User Name:"}
                                </span>
                                <input type="text" value={v.pf?.proxyUser} onChange={v.setPrefText('proxyUser')} style={{height: "22px", borderRadius: "4px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", padding: "0 6px", fontSize: "11px", color: "var(--text)"}} />
                                <span style={{fontSize: "11px"}}>
                                  {"Password:"}
                                </span>
                                <input type="password" value={v.pf?.proxyPassword} onChange={v.setPrefText('proxyPassword')} style={{height: "22px", borderRadius: "4px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", padding: "0 6px", fontSize: "11px", color: "var(--text)"}} />
                              </div>
                              <div style={{display: "flex", alignItems: "center", gap: "8px", marginTop: "6px"}}>
                                <span style={{fontSize: "11px"}}>
                                  {"Proxy Domain (if needed):"}
                                </span>
                                <input type="text" value={v.pf?.proxyDomain} onChange={v.setPrefText('proxyDomain')} style={{flex: "1", height: "22px", borderRadius: "4px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", padding: "0 6px", fontSize: "11px", color: "var(--text)"}} />
                              </div>
                            </div>
                            <div style={{border: "1px solid var(--divider-strong)", borderRadius: "6px", padding: "14px"}}>
                              <div style={{fontSize: "11px", color: "var(--text-muted)", marginBottom: "6px"}}>
                                {"Wander Animation Setup"}
                              </div>
                              <input type="range" min="0" max="100" value={v.pf?.wanderSpeed} onChange={v.setPrefText('wanderSpeed')} style={{width: "100%"}} />
                              <div style={{display: "flex", justifyContent: "space-between", fontSize: "10px", color: "var(--text-muted)", marginBottom: "8px"}}>
                                <span>
                                  {"Fast (0.5s)"}
                                </span>
                                <span>
                                  {"Slow (20s)"}
                                </span>
                              </div>
                              <label style={css(v.chk)}>
                                <input type="checkbox" checked={v.pf?.showActivatedAsBackground} onChange={v.setPrefCheck('showActivatedAsBackground')} />
                                {" Show Activated Thought as Background"}
                              </label>
                            </div>
                          </>
                        ) : null}
                        {v.isPrefsAccelerators ? (
                          <>
                            <div style={{fontSize: "11.5px", color: "var(--text-tertiary)", marginBottom: "10px"}}>
                              {"To create a keyboard accelerator, select a command in this dialog, then on your keyboard press one or more modifier keys in conjunction with an alphanumeric or punctuation key. To remove an accelerator, press "}
                              <b>
                                {"Backspace"}
                              </b>
                              {"."}
                            </div>
                            <div style={{border: "1px solid var(--input-border)", borderRadius: "6px", overflow: "hidden"}}>
                              <div style={{display: "flex", fontSize: "11px", fontWeight: "600", color: "var(--text-muted)", padding: "6px 10px", borderBottom: "1px solid var(--divider-strong)"}}>
                                <span style={{flex: "1"}}>
                                  {"Command"}
                                </span>
                                <span style={{width: "140px"}}>
                                  {"Accelerator"}
                                </span>
                              </div>
                              {(v.accelRows || []).map((ar, $index) => (
                                <React.Fragment key={ar?.id ?? $index}>
                                  <div style={{display: "flex", padding: "5px 10px", fontSize: "11.5px", background: `${ar?.active}`, borderBottom: "1px solid var(--divider)"}}>
                                    <span style={{flex: "1"}}>
                                      {ar?.cmd}
                                    </span>
                                    <span style={{width: "140px", color: "var(--text-muted)", fontFamily: "'JetBrains Mono',monospace", fontSize: "10.5px"}}>
                                      {ar?.key}
                                    </span>
                                  </div>
                                </React.Fragment>
                              ))}
                            </div>
                            <div style={{display: "flex", gap: "8px", marginTop: "12px"}}>
                              <div onClick={v.closeDialog} style={css(v.btnSecondaryStyle)}>
                                {"Clear"}
                              </div>
                              <div onClick={v.closeDialog} style={css(v.btnSecondaryStyle)}>
                                {"Import"}
                              </div>
                              <div onClick={v.closeDialog} style={css(v.btnSecondaryStyle)}>
                                {"Export"}
                              </div>
                              <div onClick={v.closeDialog} style={css(v.btnSecondaryStyle)}>
                                {"Reset"}
                              </div>
                            </div>
                          </>
                        ) : null}
                      </div>
                      <div className="mn-dialog-footer" style={{display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: "8px", padding: "12px 14px", borderTop: "1px solid var(--border)", flex: "none", width: "100%", boxSizing: "border-box", marginTop: "auto"}}>
                        <div onClick={v.closeDialog} style={css(v.btnPrimaryStyle)}>
                          {"OK"}
                        </div>
                        <div onClick={v.closeDialog} style={css(v.btnSecondaryStyle)}>
                          {"Cancel"}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {v.isThoughtTypesWindow ? (
                  <>
                    <div className="mn-dialog-body" style={{width: "100%", maxWidth: "100%", boxSizing: "border-box", flex: "1 1 auto", minHeight: "120px", display: "flex", flexDirection: "column", overflow: "auto"}}>
                      <div onMouseDown={v.startMainDialogDrag} className="mn-dialog-title" style={{display: "flex", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid var(--divider-strong)", fontSize: "13px", fontWeight: "600", position: "relative", cursor: "move", flex: "none", width: "100%", boxSizing: "border-box"}}>
                        {"Thought Types "}
                        <div onClick={v.closeDialog} style={{position: "absolute", top: "8px", right: "10px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px", cursor: "pointer", color: "var(--text-muted)"}}>
                          {"✕"}
                        </div>
                      </div>
                      <div style={{height: "150px", margin: "14px", border: "1px solid var(--input-border)", borderRadius: "6px", background: "var(--desk-bg)"}} />
                      <div style={{display: "flex", justifyContent: "flex-start", gap: "8px", padding: "0 14px 14px"}}>
                        <div onClick={v.closeDialog} style={css(v.btnSecondaryStyle)}>
                          {"Add new"}
                        </div>
                        <div style={{padding: "6px 18px", borderRadius: "5px", background: "var(--titlebar-bg)", color: "var(--text-disabled)", fontSize: "12px", border: "1px solid var(--border)"}}>
                          {"Delete"}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                
                
                {v.isAboutMnemosyne ? (
                  <>
                    <div className="mn-dialog-body" style={{width: "100%", maxWidth: "100%", boxSizing: "border-box", flex: "1 1 auto", minHeight: "120px", display: "flex", flexDirection: "column", overflow: "auto"}}>
                      <div onMouseDown={v.startMainDialogDrag} className="mn-dialog-title" style={{display: "flex", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid var(--divider-strong)", fontSize: "13px", fontWeight: "600", position: "relative", cursor: "move", flex: "none", width: "100%", boxSizing: "border-box"}}>
                        {"About Mnemosyne"}
                        <div onClick={v.closeDialog} style={{position: "absolute", top: "8px", right: "10px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px", cursor: "pointer", color: "var(--text-muted)"}}>{"✕"}</div>
                      </div>
                      <div className="mn-dialog-body" style={{padding: "16px 18px", flex: "1 1 auto", minHeight: "80px", overflow: "auto", width: "100%", boxSizing: "border-box"}}>
                        <div style={{display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px"}}>
                          <div style={{width: "36px", height: "36px", borderRadius: "8px", background: "var(--accent)", flex: "none"}} />
                          <div style={{minWidth: 0, flex: 1}}>
                            <div style={{fontSize: "16px", fontWeight: 700, color: "var(--text)"}}>{"Mnemosyne"}</div>
                            <div style={{fontSize: "12px", color: "var(--text-muted)"}}>{"Version "}{v.aboutVersion || "0.1.0"}{" — Phase 1 GUI shell"}</div>
                          </div>
                        </div>
                        <div style={{fontSize: "12.5px", color: "var(--text-secondary)", lineHeight: 1.55, marginBottom: "14px", overflowWrap: "anywhere"}}>
                          {"A personal knowledge graph desktop application. Electron shell with a JavaScript renderer. Named for the Greek goddess of memory."}
                        </div>
                        <div style={{fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px", letterSpacing: "0.04em"}}>{"PROJECT"}</div>
                        <div onClick={v.openGithub} style={{fontSize: "12.5px", color: "var(--accent)", cursor: "pointer", marginBottom: "16px", overflowWrap: "anywhere"}}>
                          {v.githubUrl || "https://github.com/seminone/Mnemosyne"}
                        </div>
                        <div style={{fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px", letterSpacing: "0.04em"}}>{"CONTRIBUTORS"}</div>
                        <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                          {(v.contributors || []).map((ct, $index) => (
                            <div key={ct?.name ?? $index} style={{padding: "10px 12px", borderRadius: "8px", background: "var(--input-bg)", border: "1px solid var(--divider)"}}>
                              <div style={{fontSize: "13px", fontWeight: 600, color: "var(--text)", marginBottom: "4px"}}>{ct?.name}</div>
                              <div style={{fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.5, overflowWrap: "anywhere", whiteSpace: "pre-wrap"}}>{ct?.role}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mn-dialog-footer" style={{display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: "8px", padding: "12px 14px", borderTop: "1px solid var(--border)", flex: "none", width: "100%", boxSizing: "border-box", marginTop: "auto"}}>
                        <div onClick={v.openGithub} style={css(v.btnSecondaryStyle)}>{"GitHub"}</div>
                        <div onClick={v.closeDialog} style={css(v.btnPrimaryStyle)}>{"OK"}</div>
                      </div>
                    </div>
                  </>
                ) : null}

{v.isRenameThought ? (
                  <>
                    <div className="mn-dialog-body" style={{width: "100%", maxWidth: "100%", boxSizing: "border-box", flex: "1 1 auto", minHeight: "120px", display: "flex", flexDirection: "column", overflow: "auto"}}>
                      <div onMouseDown={v.startMainDialogDrag} className="mn-dialog-title" style={{display: "flex", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid var(--divider-strong)", fontSize: "13px", fontWeight: "600", position: "relative", cursor: "move", flex: "none", width: "100%", boxSizing: "border-box"}}>
                        {(v.renameTargetTitle ? ("Rename / Edit — " + v.renameTargetTitle) : "Rename / Edit Thought")}
                        <div onClick={v.closeDialog} style={{position: "absolute", top: "8px", right: "10px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px", cursor: "pointer", color: "var(--text-muted)"}}>{"✕"}</div>
                      </div>
                      <div className="mn-dialog-body" style={{padding: "16px 14px", flex: "1 1 auto", minHeight: "80px", overflow: "auto", width: "100%", boxSizing: "border-box"}}>
                        <input type="text" autoFocus={true} value={v.renameDraft || ""} onChange={v.setRenameDraft} onKeyDown={(e) => { if (e.key === "Enter") v.confirmRenameThought(); if (e.key === "Escape") v.closeDialog(); }} style={{height: "28px", width: "100%", boxSizing: "border-box", borderRadius: "5px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", padding: "0 8px", fontSize: "12px", color: "var(--text)"}} />
                      </div>
                      <div className="mn-dialog-footer" style={{display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: "8px", padding: "12px 14px", borderTop: "1px solid var(--border)", flex: "none", width: "100%", boxSizing: "border-box", marginTop: "auto"}}>
                        <div onClick={v.confirmRenameThought} style={css(v.btnPrimaryStyle)}>{"OK"}</div>
                        <div onClick={v.closeDialog} style={css(v.btnSecondaryStyle)}>{"Cancel"}</div>
                      </div>
                    </div>
                  </>
                ) : null}

{v.isCreateTag ? (
                  <>
                    <div className="mn-dialog-body" style={{width: "100%", maxWidth: "100%", boxSizing: "border-box", flex: "1 1 auto", minHeight: "120px", display: "flex", flexDirection: "column", overflow: "auto"}}>
                      <div onMouseDown={v.startMainDialogDrag} className="mn-dialog-title" style={{display: "flex", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid var(--divider-strong)", fontSize: "13px", fontWeight: "600", position: "relative", cursor: "move", flex: "none", width: "100%", boxSizing: "border-box"}}>
                        {"Create Tag "}
                        <div onClick={v.closeDialog} style={{position: "absolute", top: "8px", right: "10px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px", cursor: "pointer", color: "var(--text-muted)"}}>
                          {"✕"}
                        </div>
                      </div>
                      <div className="mn-dialog-body" style={{padding: "16px 14px", display: "flex", flexDirection: "column", gap: "10px", flex: "1 1 auto", minHeight: "80px", overflow: "auto", width: "100%", boxSizing: "border-box"}}>
                        <label style={{fontSize: "11.5px", color: "var(--text-tertiary)"}}>
                          {"Use semicolons to enter multiple tags at once."}
                        </label>
                        <input type="text" value={v.createTagName} onChange={v.setCreateTagName} style={{height: "26px", borderRadius: "5px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", padding: "0 8px", fontSize: "12px", color: "var(--text)"}} />
                      </div>
                      <div className="mn-dialog-footer" style={{display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: "8px", padding: "12px 14px", borderTop: "1px solid var(--border)", flex: "none", width: "100%", boxSizing: "border-box", marginTop: "auto"}}>
                        <div onClick={v.confirmCreateTag} style={css(v.btnPrimaryStyle)}>
                          {"OK"}
                        </div>
                        <div onClick={v.closeDialog} style={css(v.btnSecondaryStyle)}>
                          {"Cancel"}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {v.isCreateThoughtType ? (
                  <>
                    <div className="mn-dialog-body" style={{width: "100%", maxWidth: "100%", boxSizing: "border-box", flex: "1 1 auto", minHeight: "120px", display: "flex", flexDirection: "column", overflow: "auto"}}>
                      <div onMouseDown={v.startMainDialogDrag} className="mn-dialog-title" style={{display: "flex", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid var(--divider-strong)", fontSize: "13px", fontWeight: "600", position: "relative", cursor: "move", flex: "none", width: "100%", boxSizing: "border-box"}}>
                        {"Create Thought Type "}
                        <div onClick={v.closeDialog} style={{position: "absolute", top: "8px", right: "10px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px", cursor: "pointer", color: "var(--text-muted)"}}>
                          {"✕"}
                        </div>
                      </div>
                      <div style={{padding: "16px 14px", display: "flex", alignItems: "center", gap: "12px"}}>
                        <div style={{width: "26px", height: "26px", borderRadius: "6px", background: "var(--accent)", flex: "none"}} />
                        <div style={{flex: "1"}}>
                          <label style={{fontSize: "11.5px", color: "var(--text-tertiary)"}}>
                            {"Enter the name of the Thought type to create."}
                          </label>
                          <input type="text" value={v.createThoughtTypeName} onChange={v.setCreateThoughtTypeName} style={{height: "26px", borderRadius: "5px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", padding: "0 8px", fontSize: "12px", color: "var(--text)", width: "100%", boxSizing: "border-box", marginTop: "6px"}} />
                        </div>
                      </div>
                      <div className="mn-dialog-footer" style={{display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: "8px", padding: "12px 14px", borderTop: "1px solid var(--border)", flex: "none", width: "100%", boxSizing: "border-box", marginTop: "auto"}}>
                        <div onClick={v.confirmCreateThoughtType} style={css(v.btnPrimaryStyle)}>
                          {"OK"}
                        </div>
                        <div onClick={v.closeDialog} style={css(v.btnSecondaryStyle)}>
                          {"Cancel"}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {v.isAddAttachment ? (
                  <>
                    <div className="mn-dialog-body" style={{width: "100%", maxWidth: "100%", boxSizing: "border-box", flex: "1 1 auto", minHeight: "120px", display: "flex", flexDirection: "column", overflow: "auto"}}>
                      <div onMouseDown={v.startMainDialogDrag} className="mn-dialog-title" style={{display: "flex", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid var(--divider-strong)", fontSize: "13px", fontWeight: "600", position: "relative", cursor: "move", flex: "none", width: "100%", boxSizing: "border-box"}}>
                        {"Add Attachment "}
                        <div onClick={v.closeDialog} style={{position: "absolute", top: "8px", right: "10px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px", cursor: "pointer", color: "var(--text-muted)"}}>
                          {"✕"}
                        </div>
                      </div>
                      <div className="mn-dialog-body" style={{padding: "14px", flex: "1 1 auto", minHeight: "80px", overflow: "auto", width: "100%", boxSizing: "border-box"}}>
                        <label style={{fontSize: "11.5px", color: "var(--text-tertiary)", display: "block", marginBottom: "8px"}}>
                          {"Select the type of file to create."}
                        </label>
                        <div style={{height: "190px", overflow: "auto", border: "1px solid var(--input-border)", borderRadius: "6px"}}>
                          {(v.attachmentFileTypes || []).map((ft, $index) => (
                            <React.Fragment key={ft?.id ?? $index}>
                              <Hover as="div" onClick={() => v.onAttachmentTypeClick(ft)} style={{padding: "6px 10px", fontSize: "12px", color: "var(--text-secondary)", cursor: "pointer"}} hover={{background: "var(--chip-bg)"}}>
                                {ft}
                              </Hover>
                            </React.Fragment>
                          ))}
                        </div>
                        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "12px"}}>
                          <div onClick={v.closeDialog} style={css(`${v.btnSecondaryStyle || ""};text-align:center`)}>
                            {"Link to File"}
                          </div>
                          <div onClick={v.closeDialog} style={css(`${v.btnSecondaryStyle || ""};text-align:center`)}>
                            {"Templates…"}
                          </div>
                          <div onClick={v.closeDialog} style={css(`${v.btnSecondaryStyle || ""};text-align:center`)}>
                            {"Link to Folder"}
                          </div>
                          <div onClick={v.closeDialog} style={css(`${v.btnSecondaryStyle || ""};text-align:center`)}>
                            {"Link to URL"}
                          </div>
                        </div>
                        <div onClick={v.closeDialog} style={css(`${v.btnSecondaryStyle || ""};text-align:center;margin-top:8px`)}>
                          {"Cancel"}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {v.isCrawlBrain ? (
                  <>
                    <div className="mn-dialog-body" style={{width: "100%", maxWidth: "100%", boxSizing: "border-box", flex: "1 1 auto", minHeight: "120px", display: "flex", flexDirection: "column", overflow: "auto"}}>
                      <div onMouseDown={v.startMainDialogDrag} className="mn-dialog-title" style={{display: "flex", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid var(--divider-strong)", fontSize: "13px", fontWeight: "600", position: "relative", cursor: "move", flex: "none", width: "100%", boxSizing: "border-box"}}>
                        {"Crawl Brain and Modify Selection "}
                        <div onClick={v.closeDialog} style={{position: "absolute", top: "8px", right: "10px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px", cursor: "pointer", color: "var(--text-muted)"}}>
                          {"✕"}
                        </div>
                      </div>
                      <div className="mn-dialog-body" style={{padding: "16px 14px", display: "flex", flexDirection: "column", gap: "10px", flex: "1 1 auto", minHeight: "80px", overflow: "auto", width: "100%", boxSizing: "border-box"}}>
                        <select value={v.crawlMode} onChange={v.setCrawlMode} style={{height: "26px", borderRadius: "5px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", color: "var(--text)", fontSize: "12px"}}>
                          <option>
                            {"Add to selection"}
                          </option>
                          <option>
                            {"Remove from selection"}
                          </option>
                          <option>
                            {"Set as selection"}
                          </option>
                        </select>
                        <div onClick={v.setCrawlAllDirections} style={{height: "24px", borderRadius: "5px", background: "var(--chip-bg)", border: "1px solid var(--input-border-strong)", fontSize: "11.5px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"}}>
                          {"All directions"}
                        </div>
                        <label style={{display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--text-secondary)"}}>
                          <input type="checkbox" checked={v.crawlChildward} onChange={v.setCrawlChildward} />
                          {" Childward"}
                        </label>
                        <label style={{display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--text-secondary)"}}>
                          <input type="checkbox" checked={v.crawlParentward} onChange={v.setCrawlParentward} />
                          {" Parentward"}
                        </label>
                        <label style={{display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--text-secondary)"}}>
                          <input type="checkbox" checked={v.crawlJumpward} onChange={v.setCrawlJumpward} />
                          {" Jumpward"}
                        </label>
                        <label style={{display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--text-secondary)"}}>
                          <input type="checkbox" checked={v.crawlExcludeOtherParents} onChange={v.setCrawlExcludeOtherParents} />
                          {" Exclude Thoughts with other parents"}
                        </label>
                        <div style={{display: "flex", alignItems: "center", gap: "8px", marginTop: "4px"}}>
                          <span style={{fontSize: "11.5px", color: "var(--text-muted)"}}>
                            {"Do not exceed"}
                          </span>
                          <select value={v.crawlClicksAway} onChange={v.setCrawlClicksAway} style={{height: "24px", borderRadius: "5px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", color: "var(--text)", fontSize: "11.5px", width: "50px"}}>
                            <option>
                              {"1"}
                            </option>
                            <option>
                              {"2"}
                            </option>
                            <option>
                              {"3"}
                            </option>
                            <option>
                              {"5"}
                            </option>
                            <option>
                              {"10"}
                            </option>
                          </select>
                          <span style={{fontSize: "11.5px", color: "var(--text-muted)"}}>
                            {"clicks away."}
                          </span>
                        </div>
                      </div>
                      <div className="mn-dialog-footer" style={{display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: "8px", padding: "12px 14px", borderTop: "1px solid var(--border)", flex: "none", width: "100%", boxSizing: "border-box", marginTop: "auto"}}>
                        <div onClick={v.closeDialog} style={css(v.btnPrimaryStyle)}>
                          {"OK"}
                        </div>
                        <div onClick={v.closeDialog} style={css(v.btnSecondaryStyle)}>
                          {"Cancel"}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {v.isFileBrowser ? (
                  <>
                    <div style={{width: "560px"}}>
                      <div onMouseDown={v.startMainDialogDrag} className="mn-dialog-title" style={{display: "flex", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid var(--divider-strong)", fontSize: "13px", fontWeight: "600", position: "relative", cursor: "move", flex: "none", width: "100%", boxSizing: "border-box"}}>
                        {v.fb?.title}{" "}
                        <div onClick={v.closeFileBrowser} style={{position: "absolute", top: "8px", right: "10px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px", cursor: "pointer", color: "var(--text-muted)"}}>
                          {"✕"}
                        </div>
                      </div>
                      <div style={{display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderBottom: "1px solid var(--divider)"}}>
                        <span style={{fontSize: "11px", color: "var(--text-muted)", whiteSpace: "nowrap"}}>
                          {v.fb?.lookLabel}{":"}
                        </span>
                        <select style={{flex: "1", height: "24px", borderRadius: "5px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", color: "var(--text)", fontSize: "11.5px"}}>
                          <option>
                            {v.fb?.breadcrumb}
                          </option>
                        </select>
                      </div>
                      <div style={{display: "flex", height: "260px"}}>
                        <div style={{width: "130px", flex: "none", borderRight: "1px solid var(--divider)", padding: "8px", display: "flex", flexDirection: "column", gap: "10px"}}>
                          {(v.sidebarItems || []).map((sb, $index) => (
                            <React.Fragment key={sb?.id ?? $index}>
                              <div style={{display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "var(--text-tertiary)", cursor: "pointer"}}>
                                <div dangerouslySetInnerHTML={sb?.icon} style={{color: "var(--text-muted)"}} />
                                {sb?.label}{" "}
                              </div>
                            </React.Fragment>
                          ))}
                        </div>
                        <div style={{flex: "1", padding: "6px", overflow: "auto"}}>
                          {(v.fb?.items || []).map((fi, $index) => (
                            <React.Fragment key={fi?.id ?? $index}>
                              <Hover as="div" onClick={fi?.onClick} style={{display: "flex", alignItems: "center", gap: "8px", padding: "5px 8px", borderRadius: "5px", fontSize: "12px", color: "var(--text-secondary)", cursor: "pointer"}} hover={{background: "var(--chip-bg)"}}>
                                <div dangerouslySetInnerHTML={fi?.icon} style={{color: `${fi?.iconColor}`}} />
                                {fi?.name}{" "}
                              </Hover>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                      <div style={{padding: "10px 14px", display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid var(--divider)"}}>
                        <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                          <span style={{fontSize: "11px", color: "var(--text-muted)", width: "70px"}}>
                            {"File name:"}
                          </span>
                          <input type="text" value={v.fbFileName} onChange={v.setFbFileName} style={{flex: "1", height: "24px", borderRadius: "5px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", padding: "0 8px", fontSize: "11.5px", color: "var(--text)"}} />
                        </div>
                        {v.fb?.filterLabel ? (
                          <>
                            <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                              <span style={{fontSize: "11px", color: "var(--text-muted)", width: "70px"}}>
                                {"Files of type:"}
                              </span>
                              <select style={{flex: "1", height: "24px", borderRadius: "5px", background: "var(--bg)", border: "1px solid var(--input-border-strong)", color: "var(--text)", fontSize: "11.5px"}}>
                                <option>
                                  {v.fb?.filterLabel}
                                </option>
                              </select>
                            </div>
                          </>
                        ) : null}
                      </div>
                      <div className="mn-dialog-footer" style={{display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: "8px", padding: "12px 14px", borderTop: "1px solid var(--border)", flex: "none", width: "100%", boxSizing: "border-box", marginTop: "auto"}}>
                        <div onClick={v.confirmFileBrowser} style={css(v.btnPrimaryStyle)}>
                          {v.fb?.confirmLabel}
                        </div>
                        <div onClick={v.closeFileBrowser} style={css(v.btnSecondaryStyle)}>
                          {"Cancel"}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </>
        ) : null}
        
      {v.showFloatNotes ? (
        <div onMouseDown={v.stopProp} style={{position: "absolute", left: (v.notesPanel?.x || 80) + "px", top: (v.notesPanel?.y || 120) + "px", width: (v.notesPanel?.w || 520) + "px", height: (v.notesPanel?.h || 280) + "px", zIndex: 50, background: "var(--panel-bg)", border: "1px solid var(--input-border-strong)", borderRadius: "8px", boxShadow: "0 16px 40px rgba(0,0,0,0.55)", display: "flex", flexDirection: "column", overflow: "hidden"}}>
          <div onMouseDown={v.startNotesFloatDrag} style={{height: "28px", flex: "none", display: "flex", alignItems: "center", padding: "0 10px", cursor: "move", borderBottom: "1px solid var(--divider)", fontSize: "12px", fontWeight: 600, color: "var(--text-muted)"}}>
            {"Notes"}
            <div style={{marginLeft: "auto", display: "flex", gap: "8px"}}>
              <span onClick={v.toggleNotesDock} style={{cursor: "pointer"}} title="Dock">{"⬇"}</span>
              <span onClick={v.closeNotesPanel} style={{cursor: "pointer"}}>{"✕"}</span>
            </div>
          </div>
          <textarea value={v.notesDraft ?? ""} onChange={v.onNotesChange} style={{flex: 1, border: "none", outline: "none", background: "transparent", padding: "12px", color: "var(--text-secondary)", fontFamily: "inherit", fontSize: "12.5px", resize: "none"}} />
          <div onMouseDown={v.startNotesFloatResize} style={{position: "absolute", right: 0, bottom: 0, width: 14, height: 14, cursor: "nwse-resize"}} />
        </div>
      ) : null}
      {v.showFloatThought ? (
        <div onMouseDown={v.stopProp} style={{position: "absolute", left: (v.thoughtPanel?.x || 640) + "px", top: (v.thoughtPanel?.y || 120) + "px", width: (v.thoughtPanel?.w || 420) + "px", height: (v.thoughtPanel?.h || 320) + "px", zIndex: 50, background: "var(--panel-bg)", border: "1px solid var(--input-border-strong)", borderRadius: "8px", boxShadow: "0 16px 40px rgba(0,0,0,0.55)", display: "flex", flexDirection: "column", overflow: "hidden"}}>
          <div onMouseDown={v.startThoughtFloatDrag} style={{height: "28px", flex: "none", display: "flex", alignItems: "center", padding: "0 10px", cursor: "move", borderBottom: "1px solid var(--divider)", fontSize: "12px", fontWeight: 600, color: "var(--text-muted)"}}>
            {"Thought"}
            <div style={{marginLeft: "auto", display: "flex", gap: "8px"}}>
              <span onClick={v.toggleThoughtDock} style={{cursor: "pointer"}} title="Dock">{"⬇"}</span>
              <span onClick={v.closeThoughtPanel} style={{cursor: "pointer"}}>{"✕"}</span>
            </div>
          </div>
          <div style={{padding: "10px 12px", fontSize: "13px", fontWeight: 600}}>{v.activeThought?.title}</div>
          <div style={{padding: "0 12px", fontSize: "12px", color: "var(--text-muted)"}}>{"Type: "}{v.activeThought?.type}</div>
          <div onMouseDown={v.startThoughtFloatResize} style={{position: "absolute", right: 0, bottom: 0, width: 14, height: 14, cursor: "nwse-resize"}} />
        </div>
      ) : null}

{v.toast ? (
          <>
            <div style={{position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", background: "var(--chip-bg)", border: "1px solid var(--input-border-strong)", color: "var(--text)", fontSize: "12px", padding: "8px 16px", borderRadius: "6px", boxShadow: "0 12px 30px rgba(0,0,0,0.5)", zIndex: "60"}}>
              {v.toast}
            </div>
          </>
        ) : null}
      </div>
    </div>
  </>
  );
}

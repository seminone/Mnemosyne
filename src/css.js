// Converts a CSS declaration string ("width:10px;color:red") into a React style object.
// renderVals() builds some styles as strings (carried over from the original mockup); objects pass through.
const cache = new Map();
export default function css(s) {
  if (!s || typeof s !== 'string') return s || undefined;
  if (cache.has(s)) return cache.get(s);
  const out = {};
  let depth = 0, cur = '';
  const decls = [];
  for (const ch of s) { if (ch === '(') depth++; if (ch === ')') depth--; if (ch === ';' && depth === 0) { decls.push(cur); cur = ''; } else cur += ch; }
  decls.push(cur);
  for (const d of decls) {
    const i = d.indexOf(':'); if (i < 0) continue;
    const k = d.slice(0, i).trim(), v = d.slice(i + 1).trim(); if (!k) continue;
    out[k.startsWith('--') ? k : k.replace(/^-(webkit|moz)-/, (m, p) => p[0].toUpperCase() + p.slice(1) + '-').replace(/-([a-z])/g, (m, c) => c.toUpperCase())] = v;
  }
  if (cache.size > 2000) cache.clear();
  cache.set(s, out);
  return out;
}

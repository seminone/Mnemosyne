/**
 * Hot-reload launcher: Vite (polling) + Electron with MNEMOSYNE_DEV=1.
 * Prefer `npm run dev` (build + electron) when fs.watch is broken.
 */
const { spawn } = require('child_process');
const path = require('path');
const root = path.join(__dirname, '..');

const env = { ...process.env, CHOKIDAR_USEPOLLING: '1', CHOKIDAR_INTERVAL: '1000' };

const vite = spawn('npx', ['vite'], { cwd: root, env, stdio: 'inherit', shell: true });

function startElectron() {
  const e = { ...process.env, MNEMOSYNE_DEV: '1' };
  const electron = spawn('npx', ['electron', '.'], { cwd: root, env: e, stdio: 'inherit', shell: true });
  electron.on('exit', (code) => {
    vite.kill();
    process.exit(code ?? 0);
  });
}

const http = require('http');
function waitForVite(attemptsLeft) {
  const req = http.get('http://127.0.0.1:5173', (res) => {
    res.resume();
    startElectron();
  });
  req.on('error', () => {
    if (attemptsLeft <= 0) {
      console.error('Vite did not start on :5173');
      vite.kill();
      process.exit(1);
    }
    setTimeout(() => waitForVite(attemptsLeft - 1), 500);
  });
}

setTimeout(() => waitForVite(40), 800);

vite.on('exit', (code) => {
  if (code && code !== 0) process.exit(code);
});

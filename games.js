/* Arcade catalog shared by the hub and records dashboard.
   When adding a game, add its page here, its icon in index.html, and its
   page asset to sw.js so it is available offline. */
window.ARCADE_GAMES = [
  { name:'MERGE DROP',  tagline:'gravity + greed',       href:'merge-drop.html', key:'merge-drop-v1', icon:'merge' },
  { name:'NEON SNAKE',  tagline:'grip it and grow',      href:'neon-snake.html', key:'neon-snake-v1', icon:'snake' },
  { name:'QUICK DRAW',  tagline:'reflex under fire',     href:'quick-draw.html', key:'quick-draw-v1', icon:'target' },
  { name:'RANGE ZERO',  tagline:'first-person defense', href:'range-zero.html', key:'range-zero-v1', icon:'shooter' },
  { name:'STACK UP',    tagline:'one-button precision', href:'stack-up.html',   key:'stack-up-v1',   icon:'stack' }
];

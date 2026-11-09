# MERGE DROP — Game Design Document

A minimalist grid-based merge puzzle for the web. One file, no dependencies, plays in any browser.

## 1. The Core Game Loop (every 3–5 seconds)

**Read → Aim → Drop → Cascade.**
The player reads the 3-tile queue, picks a column, and drops. Equal-value neighbours fuse into a single tile worth `value × group size`, placed at the group's lowest cell. The board then settles and re-checks — chains cascade, and each cascade step multiplies the wave's points.

**Instant feedback ("juice"):**
- Tiles fall with easing, fusions **pop** with a scale animation and a coloured particle burst
- Floating score numbers fly up from every fusion; **COMBO ×N** banners fire on chains
- Screen shake scales with event size (big fusion, long chain)
- A tiny WebAudio synth generates all sound live (no assets): pitch of each fusion rises with tile value and chain depth, so a cascade *sounds* like it's accelerating
- The score counter eases upward instead of snapping — numbers feel alive

## 2. Progression & Dopamine Triggers

**Short-term (seconds):** cascades, multipliers, shattering rocks, score bursts.
**Mid-term (a run):** XP = score. Each level raises the level bar in the HUD and periodically **unlocks a new, larger tile** into the spawn pool ("NEW TILE UNLOCKED · 128") — the board gets richer as you play.
**Long-term (across runs):** best score, games played, and sound preference persist in localStorage. The end screen shows score / level / fusions, with a **NEW BEST** celebration and a "ONE MORE RUN" button — the run restarts in a single tap.

## 3. Difficulty Curve & Pacing

- **Confidence phase (LV 1–2):** spawner only produces 2s and 4s, skewed toward small values. The grid stays clear; early merges are nearly free.
- **Ramp:** each level widens the spawn pool and reduces the small-value skew. From level 3, **rocks** appear (never fuse; destroyed by adjacent fusions) — the board gets gradually dirtier rather than faster. Nothing speeds up, so pressure comes from *choice quality*, not reflexes.
- **High stakes without frustration:** danger is always self-inflicted and visible — two or more columns touching the ceiling turns the board frame red as a warning; a ghost preview of the next tile shows exactly where a drop will land; a full column just buzzes instead of costing anything. The only failure is filling all six columns, and the player sees it coming.

## 4. Systems Architecture

- Pure DOM tiles positioned by transform (GPU-friendly transitions); a canvas overlay handles particles; one `requestAnimationFrame` loop drives the eased score and FX
- Merge detection = flood-fill over 4-connected equal values; resolution is an async cascade loop: fuse waves → shatter adjacent rocks → gravity → re-check
- All state in plain objects; persistence via a single JSON key; audio via a lazily-created AudioContext (unlocked on the first gesture)

## Tuning knobs (in the code)

| Knob | Where | Effect |
|---|---|---|
| Spawn skew `pow(rand, 1.5)` | `makeSpawn` | smaller value = easier |
| `maxE(level)` | progression | how fast big tiles unlock |
| `rockChance(level)` | `rockChance` | board pollution rate |
| `needFor(l)` | progression math | level pacing |
| Cascade multiplier | `pts = val * cascade` | chain reward |

## MVP roadmap beyond this prototype

1. Daily seed (same board for everyone, shareable score codes)
2. Milestone "stamp" collection (meta-progression across runs)
3. Undo one drop per run as a strategic resource
4. Optional 8-column hard mode with its own leaderboard

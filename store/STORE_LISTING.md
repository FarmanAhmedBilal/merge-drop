# MERGE DROP — Store Listing & Submission Kit

Use these exact texts when filling in App Store Connect and the Google Play Console.
Replace `YOUR_SUPPORT_EMAIL` with a real contact address before submitting.

## App identity
- App name (both stores): **Merge Drop**
- iOS Bundle ID: `com.organizationName.Merge-Drop-App` — change this in App Store Connect to your own reverse-domain id (e.g. `com.yourname.mergedrop`) before submitting
- Web version (optional to link): https://merge-drop.netlify.app

## iOS — App Store Connect
- **Subtitle** (30 chars): `Minimalist merge puzzle`
- **Promotional text** (170 chars, editable anytime):
  `Drop tiles, fuse chains, chase combos. One-tap puzzle with endless replay — how deep can your chain go?`
- **Description:**
  Merge Drop is a tiny puzzle about gravity and greed.

  Tap a column to drop the next tile. Equal tiles that touch fuse into one — worth their value multiplied. Fuse again, and again: every chain step multiplies the wave's points.

  - One-tap control, instantly understood
  - Cascading combos with juicy feedback: bursts, screen shake, and sounds that climb with every chain
  - Rocks appear as the board gets dirtier — fuse beside them to shatter them
  - Level up to unlock bigger tiles; every run plays out differently
  - No timers, no lives, no energy bars. Runs are as short or as long as you make them

  Easy to start, hard to put down. How long can you keep the grid breathing?

- **Keywords** (100 chars, comma-separated):
  `merge,puzzle,minimalist,combo,chain,brain,relax,numbers,block,drop`
- **Primary category:** Puzzle · **Secondary:** Board
- **Age rating:** 4+ (no restricted content; answer the questionnaire accordingly)
- **Privacy policy URL:** https://merge-drop.netlify.app/privacy.html
- **Support URL:** https://merge-drop.netlify.app (contact via the store's support field or YOUR_SUPPORT_EMAIL)

## Android — Play Console
- **Short description** (80 chars):
  `Drop tiles, fuse chains, chase combos — a minimalist merge puzzle.`
- **Full description:** reuse the iOS description above.
- **App category:** Puzzle
- **Content rating questionnaire:** no violence, no gambling, no user-generated content → rated Everyone
- **Data safety form:** "No data collected, no data shared" (the game uses only local on-device storage — see privacy.html)
- **Privacy policy URL:** https://merge-drop.netlify.app/privacy.html
- **Target audience:** Everyone · not a child-directed app

## Assets you still need to prepare
- **iOS app icon:** a single 1024×1024 PNG (a PNG version of `icon.svg` — any SVG-to-PNG converter works, or pick the generated icon in Xcode's asset catalog)
- **Screenshots — iOS:** 6.9" and 6.5" iPhone sizes; a portrait screenshot of the board mid-game with visible score/combo is ideal (run the app in a simulator sized 6.9"/6.5", press Cmd+S to save)
- **Screenshots — Play:** phone + 7" tablet; same approach
- **Feature graphic (Play):** 1024×500 banner

## Submission flow
### iOS (Apple Developer $99/yr — you have this)
1. In Xcode: set your Team, bump version, Archive the app
2. Distribute App → App Store Connect → upload
3. In App Store Connect create the app record, fill the listing above, attach screenshots, submit for review (typically 24–48 h)

### Android (Play Console $25 — you have this)
1. Go to pwabuilder.com, enter https://merge-drop.netlify.app, choose Android package
2. (If prompted for icons, upload a 512×512 PNG made from icon.svg; PWABuilder generates all sizes)
3. Download the signed `.aab`, create the app in Play Console, upload to production (internal testing first is recommended), fill the listing above, submit

The Netlify site already ships a web manifest, service worker, and icons, so PWABuilder will score it well.

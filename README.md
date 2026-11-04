# Haathi's Sound Forest

A phonics, maths and writing game for children aged 3 to 6, made India-first.

**Play:** open the GitHub Pages link on any phone or tablet. On Android Chrome, use "Add to Home screen" to install it like an app. It then works offline too.

## What's inside
- Journey map with chapters planned by an on-device learning engine (about 20 skills, each with levels).
- Letters (22 games): sounds, picture-letter matching, rhymes, word building, memory pairs, letter fishing, moles, river stones and more.
- Maths (32 games): counting to 30, number order, countdown, drum beats, more/fewer, bigger/smaller, before/after, skip counting, number line, adding, taking away, doubles, number bonds, make 10, sharing, coins and shopping, shapes, patterns, sorting, size, weight, length, position.
- Writing (20 games): 12 pre-writing patterns, straight lines, road maze, colouring, tracing pictures, drawing with shapes, finish the picture, dot-to-dot, small and capital letters, numbers 0-30, rainbow writing, copying, write what you hear, count and write, join the pairs, own name, words, magic slate.
- Grown-ups area: progress, skill levels, why each chapter was chosen, Sound Studio for recording real letter sounds, reviewer feedback form (sends via WhatsApp).

## Privacy
No accounts, no ads, no tracking. Progress and recordings stay on the device. Nothing is sent anywhere unless a parent chooses to send feedback.

## Files
- `index.html`: page and styles
- `app.js`: game logic and learning engine
- `clips.js`: built-in voice lines (computer voice, sentences and numbers only)
- `sw.js`, `manifest.json`: offline support and home-screen install

## How the game improves from families' feedback
1. **On each phone:** after every game the child taps a face (loved it / okay / not keen). Liked games come up more often, disliked ones less, but weak skills always get practice. Parents' star ratings also tune the mix.
2. **Across all families (only with parent consent):** if a parent ticks "share anonymous play data", the app sends age, minutes, skill scores, likes and feedback (no names, photos or recordings) to a private Google Sheet via `tools/feedback-sheet.gs`.
3. **Updates:** the sheet is reviewed and `config.json` is updated. `weights` nudge how often each game appears for everyone (1 = normal, 1.3 = more, 0.7 = less), and `notes` tell parents what changed. Bigger fixes go into `app.js`. Every phone picks up changes the next time the game is opened online.

## Age settings (3 to 7)
Starting levels are set from the child's age, then adapt to how they do.
- Maths follows the Head Start Early Learning Outcomes Framework for ages 3 to 5, and US Kindergarten (5-6) and Grade 1 (6-7) standards: e.g. age 4 starts counting objects to 10 and comparing groups to 5; age 5 adds within 10 and starts tens and ones; age 6 adds within 20, compares numbers to 50, tells time and does 10 more/10 less.
- Writing follows typical pre-writing milestones (cross about 4 years, square about 4.5, triangle about 5): age 3 traces with full guides only; harder copying and writing from sound open at 5.
- Age 3 games are 5 questions long; ages 4+ are 8.

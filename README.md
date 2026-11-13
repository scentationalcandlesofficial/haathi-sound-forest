# Haathi's Sound Forest

A phonics, maths and writing game for children aged 3 to 7, made India-first.

**Play:** open the GitHub Pages link on any phone or tablet. On Android Chrome, use "Add to Home screen" to install it like an app. It then works offline too.

## What's inside
- Journey map with chapters planned by an on-device learning engine (about 20 skills, each with levels).
- Letters (22 games): sounds, picture-letter matching, rhymes, word building, memory pairs, letter fishing, moles, river stones and more.
- Writing extras: letter families (curly, ladder, robot, zigzag), picture to first letter, copy a word (5+), copy a sentence (6+), rangoli/sand/chalkboard writing.
- Maths extras: number line, even and odd (6+), equal groups for tables of 2, 5 and 10 (7), picture graphs, days and months (6+).
- Rewards: a sticker after every game (40 to collect), days-played streak, and Haathi's wardrobe that unlocks with days played. Movement breaks after every 3 games (can be turned off).
- Voice: English by default with some Hindi praise. Grown-ups can switch spoken instructions to Hindi/Hinglish (`clips-hi.js`, loaded only when chosen). Letters, words and numbers stay in English.
- Picture Cards corner: 18 decks of flash cards (fruits, vegetables, Indian food, vehicles, animals, birds and more), each with Picture cards, Find the card, Memory cards and, for animals and birds, Whose voice?
- Bedtime Stories: 54 narrated picture-book stories: Ramayana (10 episodes, following Valmiki), Mahabharata (10 episodes, following Vyasa), Bhagavad Gita (6 lessons, each with its Sanskrit shloka and meaning), Puranas and folk (with sources shown), Panchatantra, Aesop, folk, Feelings, Clever and funny, Sleepy; for age 3+ and 5+, a drawn picture on every page, words lit up as they are read, night mode, 'I'll read' mode (no sound) and Lights off (audio only). Story audio (stories/audio, about 16 MB) downloads only when a story is opened, then works offline. Story time does not count towards the game time limit.
- Reading (11 games, ages 6 to 7, or 5 when letters are strong): read and match, picture to word, jumbled words, fill the gap, listen and spell, sight words, finish the sentence, mini crossword, word search, rhyming words, sh/ch/th. Words grow from 3 to 5 letters as the child improves. At 6+ the Letters corner becomes Reading.
- Discover at 6+: the picture topics for little ones (fruits, vegetables, animals, colours and so on) are hidden and replaced by science and knowledge quizzes: How Plants Work, Inside My Body, Solid/Liquid/Gas, Space and Planets, Water Cycle, Food Groups, Animal Science, India Quiz, Our World.
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
Every corner has Easy, Medium and Hard tabs. Age only picks the starting tab (3-4 Easy, 5 Medium, 6-7 Hard); the child or a grown-up can switch any time, and after 6 of 8 three-star games in a mode Haathi offers the next one. The daily map follows the chosen modes, with an occasional easier review game.

Starting levels inside each game are set from the child's age, then adapt during play: 2 right in a row makes the next question a little harder, a miss makes it a little easier (never more than one level below where the game started). Each map stop uses the child's current level when it starts. Modes move automatically: up after 6 of the last 8 games get 3 stars, down after 3 of the last 5 get 1 star. The reward screen and Grown-ups ('How your child is doing') show every change, and auto-move can be turned off.
- Maths follows the Head Start Early Learning Outcomes Framework for ages 3 to 5, and US Kindergarten (5-6) and Grade 1 (6-7) standards: e.g. age 4 starts counting objects to 10 and comparing groups to 5; age 5 adds within 10 and starts tens and ones; age 6 adds within 20, compares numbers to 50, tells time and does 10 more/10 less.
- Writing follows typical pre-writing milestones (cross about 4 years, square about 4.5, triangle about 5): age 3 traces with full guides only; harder copying and writing from sound open at 5.
- Age 3 games are 5 questions long; ages 4+ are 8.
- Reading uses Dolch-style sight words and decodable 3 to 5 letter words; reading games never say the word before the child answers.

## The new design (release 1A)
The redesigned child experience is the app. The old journey map is no longer offered to families.
- **Home:** one Play button, a Library door and the Grown-ups button. Tapping Haathi opens the sticker book.
- **Daily adventure:** 5 stops picked by the engine: a picture-card or topic warm-up, letters or numbers, a movement stop, the other subject, then writing. One sticker at the end, not one per game.
- **Library:** four picture doors (Play, My world, Stories, Make). Shelves show 8 tiles at a time and have no Easy/Medium/Hard tabs; levels follow the engine and can be set per area in Grown-ups.
- **Help:** in choose-the-answer games the hand shows the first answer the first time a game is met, and after two misses the right answer glows.
- Families who used the old design keep all progress and see a one-time note in Grown-ups.

## Release 2 (Steps A and B of the full review)
- **Merged games:** 37 look-alike games are now 17. Letter and number merges mix their question types round by round (for example Picture and letter, Count with me, Bigger or smaller). The three writing merges that fade their help over three rounds (First strokes, Shapes, Small letters) stay whole and play a different one each time the tile is opened; an adventure keeps the one the engine chose.
- **Tile games instead of finger writing:** Build the word, Number words, One and many, and Sentence builder (word order, then the capital letter, then the full stop) replace five trace-over games.
- **New games:** Number path race and Number path to 20 (a board game against Haathi; losing never lowers stars or levels), Roll the ladoo (steer with a held finger, or by tilting the phone from age 4), Say it, hear it (a microphone button in Meet a letter and on picture cards).
- **Best stop:** the three faces are asked only in free play. An adventure ends with one question: which stop did you like best?
- **Start screen:** Haathi and one button. Share and Install moved into Grown-ups. With two or more children the start screen shows a name button for each child.
- **Grown-ups, Settings:** two new switches. "Say it, hear it" is off until a grown-up turns it on and the phone grants the microphone. The recording is played back once and discarded; it is never saved or sent. "Tilt the phone" is on by default and a finger always works.
- **Anonymous counts:** game started, game finished, adventure started and adventure finished are counted by game id only (no name, no age, no device id), through the same counter as before. Nothing is sent when the phone is offline.
- **Fixes found while testing:** every game and topic is now reachable from its shelf (the old paging could hide some once many games had been played); adding or switching a child no longer copies the previous child's progress over the new one.

## Release 3 (the "Improve" changes of the full review)
Four of the 15 were already covered by release 2 (Meet a letter say-it, Count with me, Mela shop, Small letters). The other eleven:
- **Sound baskets, Colour baskets:** the picture or shape can be dragged into a basket. Tapping the basket still works.
- **Numbers in order:** the numbers go into a line of slots, by dragging or tapping.
- **Rhyme time:** by ear. Haathi names every picture, and the written words (with the shared ending marked) appear only after the answer. Ten word families instead of three.
- **Sight words:** with the microphone switched on in Grown-ups, the child can say the word and hear it back before moving on.
- **Number line:** Haathi slides along the line (finger, or tilt plus a "Here!" button). Tapping a spot still works.
- **Equal groups:** from age 7 every second round is a times-table fact (2, 5 and 10) without pictures. The skip-count row appears after a miss.
- **Story sums:** at the picture level the child can act the story out by moving the things (drag, tap, or tap the pile). A badge counts along.
- **Magic slate:** chalk, an eight-way rangoli brush, four stamps and three shapes.
- **Label the picture, Write the missing word:** tiles first, then the word is written once. Three rounds instead of four.
- After two misses the right answer glows in these games too.

Also in this release: a game that is taller than the screen can now be scrolled instead of being cut off, and a late "tap done" prompt no longer speaks over the next game.

Not built yet from the review: Steps C to F.

### Backup of the old app
The last version before the redesign is kept as the branch `classic-backup-2026-11-12` in this repository. To put it back on the main link: `git checkout origin/classic-backup-2026-11-12 -- .`, commit and push. As an emergency fallback on a single phone, opening the app with `?new=0` shows the old map again and `?new=1` returns to the new design.

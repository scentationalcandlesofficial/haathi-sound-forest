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
- Bedtime Stories: 28 narrated picture-book stories (Mythological, Panchatantra, Aesop, folk, Feelings, Clever and funny, Sleepy) for age 3+ and 5+, a drawn picture on every page, words lit up as they are read, night mode, 'I'll read' mode (no sound) and Lights off (audio only). Story audio (stories/audio, about 7 MB) downloads only when a story is opened, then works offline. Story time does not count towards the game time limit.
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

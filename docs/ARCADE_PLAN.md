# Arcade Expansion Plan

Expand the arcade with three single-player games:

- Countdown Numbers
- Countdown Letters
- Boggle
- Wordle

Countdown Numbers and Countdown Letters are separate game modes, but can share a Countdown shell in the UI. The game logic should be added to the `@oathompsonjones/mini-games` package, while the website remains responsible for presentation, configuration, timing, and user interaction.

## Shared Principles

- Keep the first release single-player.
- Keep game rules and solving logic in the mini-games package.
- Keep timers in the UI unless the controller already has a suitable event-emitter pattern.
- Make the games configurable without making the default experience complicated.
- Use the same allowed-word rules for Countdown Letters and Boggle.
- Add tests for generation, validation, scoring, and solver correctness before connecting the UI.
- Investigate and resolve the current blocking behaviour when the CPU is making a move while working in the mini-games package.

## Countdown

Countdown can expose Numbers and Letters as two selectable modes.

### Numbers

#### Game Rules

- Choose six numbers.
- The pool contains:
  - Twenty small numbers, with two copies each of 1 through 10.
  - Four large numbers: 25, 50, 75, and 100.
- Generate a random target from 100 through 999.
- Allow only addition, subtraction, multiplication, and division.
- Give the player 30 seconds by default, with an optional configuration value.
- Reveal an optimal solution after time expires.

#### Player Input

Provide an expression-building input with separate boxes or tokens. Each position must accept only one of:

- A valid available number.
- A valid operator.
- An opening or closing bracket.

The input should validate as it is entered and reject invalid expressions, unavailable numbers, invalid operator placement, division by zero, and non-integral intermediate results if those are excluded by the final rules.

#### Package Responsibilities

- Generate the number pool selection and target.
- Evaluate valid expressions.
- Verify submitted solutions.
- Find an optimal solution, or the closest possible result when the target cannot be reached exactly.
- Return enough information for the UI to explain the revealed solution.

### Letters

#### Game Rules

- Choose nine letters.
- Guarantee at least three vowels.
- Guarantee at least four consonants.
- Use weighted letter frequencies based on English Scrabble distributions.
- The target is the longest valid word the player can make.
- Give the player 30 seconds by default, with an optional configuration value.
- Reveal the longest valid words after time expires.

#### Word Rules

By default, exclude:

- Proper nouns.
- Contractions.
- Hyphenated words.
- American spellings.

These restrictions should be configurable if the word-list and solver support them reliably.

#### Player Input

Use a single text field for the player's proposed word. Validate that:

- The word exists in the allowed dictionary.
- It does not use any letter more times than it appears in the selection.
- It meets the active word rules.

#### Package Responsibilities

- Generate a valid nine-letter selection with the vowel and consonant constraints.
- Apply the configured letter-frequency distribution.
- Find all possible words from the selection.
- Return the longest words, including ties.
- Validate player submissions.

## Boggle

### Game Rules

- Generate a 4x4 grid from letter dice.
- Each die has a different letter on each face.
- Support a configurable three-minute time limit.
- Require words to contain at least three letters.
- Allow horizontal, vertical, and diagonal connections.
- Use the same allowed-word rules as Countdown Letters.
- Find as many words as possible.

### Scoring

| Word length | Points |
| --- | ---: |
| 3-4 | 1 |
| 5 | 2 |
| 6 | 3 |
| 7 | 5 |
| 8+ | 11 |

### Board and Letter Sets

Support multiple letter distributions, including a distribution with a face containing `Qu`. The dice model should make it possible to add further distributions without changing the solver.

### Player Input

Provide two input modes:

1. **Text entry**
   - A text field appends submitted words to the player's list.
   - Reject duplicate, invalid, and unavailable words.
   - This is the simplest and quickest first implementation.

2. **Squardle-style selection**
   - Let the player drag across connected letters.
   - Show the selected path and current word.
   - Support touch and pointer input.
   - Prevent revisiting a tile within one word.

Implement text entry first, then add drag selection once the underlying board validation is stable.

### Package Responsibilities

- Generate a valid board from the selected dice distribution.
- Find every valid word on the board.
- Validate a submitted word and its path.
- Calculate the score for each word and the total score.
- Return the complete solution set for the end-of-game reveal.

## Wordle

### Game Rules

- Generate a random word rather than using a daily word.
- Allow the player to configure the word length.
- Validate each submitted word against the selected word list and length.
- Return a state for every character indicating whether it is:
  - Correct and in the correct position.
  - Present but in the wrong position.
  - Not present in the target word.

A future option could allow the CPU to play Wordle autonomously, but this is not required for the initial release.

### Package Responsibilities

- Generate a valid target word for the requested length.
- Validate guesses.
- Calculate position states correctly when letters are repeated.
- Expose the result in a form the UI can render directly.

## Timing

The preferred initial design is for the UI to own timers:

- The controller remains deterministic and focused on game state and rules.
- The UI can pause, restart, configure, and display the countdown without coupling timing to the solver.
- The package remains easier to test and reuse outside React.

If the existing event-emitter architecture makes it more natural for the controller to own time, it could emit a once-per-second update containing the remaining time. This should be decided after inspecting the package rather than added speculatively.

## CPU and Solver Behaviour

Countdown Numbers, Countdown Letters, and Boggle can always be solved by the CPU for the end-of-game reveal. The CPU does not need to act as an opponent in the first release.

While changing the mini-games package, investigate the current blocking behaviour that occurs when the CPU is making a move. The investigation should establish:

- Whether the solver is running synchronously on the main thread.
- Which operation blocks: generation, search, evaluation, or event delivery.
- Whether the solver can yield between steps without changing its result.
- Whether a Web Worker is justified for the expensive cases.
- Whether cancellation is needed when a game is reset or abandoned.

Avoid hiding the problem with arbitrary delays. The final design should keep the interface responsive and prevent stale solver results from updating a newer game.

## Suggested Delivery Order

### Phase 1: Package Foundations

- Inspect the mini-games package architecture and current CPU blocking behaviour.
- Establish shared word-list and configuration types.
- Add deterministic random sources or seeds for testable generation.
- Add solver and validator test fixtures.

### Phase 2: Wordle

- Add configurable random target generation.
- Add guess validation and repeated-letter handling.
- Connect the UI and add the timer only after the core logic is stable.

### Phase 3: Countdown Letters

- Add weighted letter generation with vowel and consonant constraints.
- Add dictionary filtering and all-word solving.
- Add the single-field UI and end-of-round solution reveal.

### Phase 4: Countdown Numbers

- Add number selection and target generation.
- Add expression parsing and validation.
- Add optimal or closest-solution search.
- Build the tokenised expression input after the evaluator rules are settled.

### Phase 5: Boggle

- Add dice distributions and board generation.
- Add board traversal and solution search.
- Add scoring and text-entry mode.
- Add drag selection as a second input mode.

### Phase 6: Polish

- Add shared configuration controls and timer presentation.
- Add accessible keyboard and screen-reader support.
- Test touch input for Boggle.
- Add loading, cancellation, timeout, and reset states for solver work.
- Measure worst-case solver performance on representative dictionaries and boards.

## Open Decisions

- Which dictionary will provide the allowed words?
- How will British spelling restrictions be represented and maintained?
- Are non-integral Countdown Numbers results allowed?
- Does “optimal” mean the fewest operations, the closest result, or both with a tie-break rule?
- Should Countdown solutions be allowed to use brackets and, if so, what grammar is permitted?
- What exact Scrabble distribution and `Qu` dice set should be used?
- Should a Boggle word need to use each tile at most once? The standard rule says yes.
- Should the timer pause when the browser tab is hidden?
- Is a Web Worker needed immediately, or only after profiling the solver?

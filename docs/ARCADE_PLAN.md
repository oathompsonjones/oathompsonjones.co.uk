# Arcade Expansion Plan

Expand the arcade with these single-player games:

- Countdown Numbers
- Countdown Letters
- Boggle
- Wordle
- Sudoku
- Minesweeper
- 2048
- Lights Out
- 15-Puzzle

The website already has UI implementations for Tic-Tac-Toe and Connect Four, which remain part of the arcade but are not new arcade work in this plan.

Countdown Numbers and Countdown Letters are separate game modes, but can share a Countdown shell in the UI. The game logic should be added to the `@oathompsonjones/mini-games` package, while the website remains responsible for presentation, configuration, timing, and user interaction.

## Shared Principles

- Keep the first release single-player.
- Keep the games stateless: no accounts, persistent scores, leaderboards, or server-side game sessions are required initially.
- Keep the games' rules, validation, and solving logic in the mini-games package.
- Keep timers in the UI unless the controller already has a suitable event-emitter pattern.
- Make the games configurable without making the default experience complicated.
- Use the same allowed-word rules for Countdown Letters and Boggle, with Wordle using the same underlying dictionary infrastructure where practical.
- Add tests for generation, validation, scoring, and solver correctness before connecting the UI.
- Add deterministic random sources or seeds so generated games can be reproduced in tests and, where useful, shared or debugged via a configuration/URL.
- Investigate and resolve the current blocking behaviour when the CPU is making a move while working in the mini-games package.
- Where a solver can run asynchronously, support cancellation so resetting or abandoning a game cannot leave stale solver results updating a newer game.
- Prefer shared infrastructure between the arcade and relevant tools. For example, the Wordle tool can reuse the same dictionary and Wordle evaluation logic as the Arcade Wordle implementation.
- Treat the mini-games package as reusable game-engine code rather than website-specific UI code.

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
- Reveal a closest possible solution after time expires.
- When multiple solutions are equally close to the target, prefer the solution using fewer operations.

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
- Find the closest possible result when the target cannot be reached exactly.
- Use distance from the target as the primary optimisation criterion, with fewer operations as the tie-break.
- Return a structured solution containing enough information for the UI to explain the revealed solution, such as the expression, result, and operation count.

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
   - Represent a selection as a path of board coordinates rather than only as a string, so the package can validate the path and derive the resulting word.

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

## Sudoku

### Game Modes

Support two initial modes:

1. **Generated puzzle**
   - Generate a valid Sudoku puzzle at a selectable difficulty.
   - Support multiple difficulty levels.
   - Ensure generated puzzles have a valid solution and appropriate difficulty characteristics.
   - Allow the player to request a new puzzle.

2. **Blank grid**
   - Present an empty 9x9 grid for the player to enter their own puzzle.
   - Validate the entered grid as it is completed.
   - Allow the player to solve the puzzle using the arcade interface.
   - The package should be able to solve and validate user-entered puzzles, including detecting invalid or unsolvable grids.

### Package Responsibilities

- Generate complete valid Sudoku solutions.
- Generate playable puzzles from complete solutions.
- Support configurable difficulty.
- Validate Sudoku boards.
- Solve Sudoku boards.
- Determine whether a puzzle has a unique solution when required by the generator.
- Expose useful solver information so the UI can show errors and, where appropriate, hints or the next logical move.

### Future Mobile Input

A future mobile-focused feature could allow the user to photograph or scan a physical Sudoku puzzle and have the recognised grid copied into the blank-grid mode.

This should be treated as a future UI/vision feature rather than part of the initial mini-games package. The likely flow would be:

1. Capture an image using the phone camera.
2. Detect the Sudoku grid.
3. Recognise the digits.
4. Present the recognised puzzle in the blank grid for confirmation and correction.
5. Pass the confirmed grid to the normal Sudoku validator/solver.

The recognition step should never silently alter the puzzle: the user should be able to review and correct recognised cells before solving.

## Minesweeper

### Game Rules

- Support configurable board dimensions and mine counts/difficulty presets.
- Generate a valid board with hidden mines.
- Reveal cells and automatically reveal connected empty regions.
- Flag suspected mines.
- Detect win and loss states.
- Ensure the first move can be configured to be safe, if desired.

### Package Responsibilities

- Generate boards deterministically from a seed.
- Track revealed and flagged cells independently from the underlying mine layout.
- Calculate adjacent mine counts.
- Apply reveal/flood-fill rules.
- Validate moves and determine game completion.
- Expose solver information that can identify cells that are logically guaranteed safe or guaranteed to contain mines where the current board permits such deductions.

## 2048

### Game Rules

- Use the standard 4x4 board by default.
- Support configurable board sizes where practical.
- Support the four directional moves.
- Merge equal adjacent tiles according to standard 2048 rules.
- Track score and game-over state.
- Allow restarting and, if desired, undoing moves.

### Package Responsibilities

- Represent and mutate game state through reusable move operations.
- Generate new tiles deterministically from an injected random source.
- Detect legal moves and game-over states.
- Expose move results in a form the UI can render.
- Provide a reusable state evaluator/search API if an AI/solver is added.

The initial Arcade release does not require an automated 2048 player, but the engine should avoid making one impossible later.

## Lights Out

### Game Rules

- Support a configurable rectangular grid, with a sensible default.
- Pressing a cell toggles the cell and its orthogonal neighbours.
- Provide a generated starting state.
- Detect when all lights are off.
- Allow reset/new puzzle.

### Package Responsibilities

- Represent board states compactly.
- Apply moves deterministically.
- Generate solvable puzzle states.
- Validate completion.
- Solve a board where possible.
- Expose a solution as a sequence or set of moves.

The solver can use the mathematical structure of Lights Out rather than generic game-tree search.

## 15-Puzzle

### Game Rules

- Support the standard 4x4 puzzle.
- Allow configurable board sizes if the engine can support them cleanly.
- Generate valid, solvable shuffled states.
- Allow tiles to slide into the empty space.
- Detect completion.
- Track move count.

### Package Responsibilities

- Represent puzzle states and legal moves.
- Generate solvable shuffled boards.
- Validate moves and completion.
- Provide a solver based on an appropriate search strategy, such as A* with an admissible heuristic.
- Return a reproducible solution path that the UI can animate.

## Mini-Games Architecture and Implementation

The mini-games package should remain a reusable game-engine library. The existing OOP/MVC-style Controller/Board structure for Tic-Tac-Toe and Connect Four should be evolved rather than replaced, while avoiding a requirement that fundamentally different puzzle games inherit competitive-board concepts.

### Architecture Goals

- Keep controllers responsible for game-session orchestration and event delivery rather than embedding reusable algorithms.
- Keep game state/models, rules, move generation, validation, and solvers independently usable without a live controller.
- Keep game-specific APIs strongly typed. Do not force every game into an artificial universal solver interface.
- Share genuinely reusable algorithms and infrastructure rather than making unrelated games conform to the same model.
- Preserve the existing Tic-Tac-Toe and Connect Four website APIs where practical while refactoring their internals.

### Game-Tree Solver Refactor

Before adding the new games, extract the existing minimax/negamax, alpha-beta pruning, move ordering, and transposition-table machinery from the base controller into reusable game-tree solver infrastructure.

- Introduce reusable game-tree search components under the package's algorithm/infrastructure layer.
- Add dedicated Tic-Tac-Toe and Connect Four solver classes or modules that use that infrastructure.
- Keep the existing controllers as orchestration layers that invoke their solvers.
- Preserve the current website behaviour while making the solver independently callable by other consumers.
- Ensure solver results are structured rather than UI-specific.
- Investigate the current synchronous CPU-search blocking during this refactor and establish whether yielding or worker-based execution is needed at the consumer layer.

### State and Serialisation

- Define clean, serialisable representations for game states that can be constructed from API input and converted back to package state.
- Allow Tools API consumers to submit a complete game state without constructing a controller.
- Keep serialisation separate from presentation.
- Provide deterministic, validated conversion boundaries for boards/states where external input is supported.

### Randomness

- Replace hidden use of global randomness in reusable game logic with injectable random sources where randomness affects game generation.
- Support deterministic seeded random sources for tests, debugging, benchmarks, and reproducible games.
- Keep seeds optional for normal play.

### Solver Contract

Expose game-specific solver APIs that operate on supplied state rather than requiring a controller instance.

Examples include:

- Connect Four: find a best move and return evaluation/search metadata.
- Tic-Tac-Toe: analyse or find the best move.
- Sudoku: solve, count solutions, and obtain a useful next move/hint.
- Wordle: evaluate guesses and filter/analyse candidates.
- Boggle: find words and return their board paths.
- Minesweeper: analyse logically guaranteed safe cells and mines.
- Lights Out: solve and return a move sequence.
- 15-Puzzle: solve and return a reproducible move path.
- Countdown Numbers: find the closest result, using operation count to break ties.
- Countdown Letters: find the longest valid words.
- 2048: expose move simulation/state evaluation, leaving a full automated player for later.

Solver results should contain structured data such as moves, paths, scores, distances, operation counts, deductions, or evaluation metadata where relevant. UI text should be produced by consumers rather than embedded in the package.

### Asynchronous Solvers and Cancellation

- Keep solver algorithms independent of React, Next.js, Web Workers, or other website infrastructure.
- Support cancellation for potentially expensive asynchronous solver operations, using an AbortSignal-style mechanism where appropriate.
- Prevent stale results from a previous game from being applied to a newer game.
- Decide at the website/API layer whether a solver runs directly, in a Web Worker, or through another execution mechanism after profiling.
- Do not introduce arbitrary delays to disguise synchronous blocking.

### Reusable Algorithm Infrastructure

Add shared algorithmic infrastructure where multiple games genuinely benefit from it, for example:

- Game-tree search: minimax/negamax, alpha-beta pruning, move ordering, transposition tables.
- General search: A*, heuristic search, and reusable traversal primitives.
- Constraint solving/backtracking where appropriate.
- Word/dictionary structures such as efficient lookup and trie-style traversal where useful.
- Random number generation and seeded sources.
- Common validation and result types only where they represent genuinely shared semantics.

Avoid a universal GameController/GameSolver abstraction that obscures important differences between games.

### Game-Specific Engine Structure

Use game-specific models and solvers where appropriate, following the existing reusable-code philosophy.

- **Sudoku:** board/state, rules/validator, generator, solver, hint/next-move analysis, controller.
- **Wordle:** game state, dictionary/evaluation logic, candidate analysis, controller.
- **Boggle:** board, dice/distribution generation, word search, path validation, scoring, controller.
- **Minesweeper:** hidden board/state, visible player state, rules, deduction solver, controller.
- **2048:** state, move simulation, tile generation, game-over detection, evaluator, controller; automated search can be added later.
- **Lights Out:** board/state, move rules, puzzle generator, mathematical solver, controller.
- **15-Puzzle:** state, legal moves, solvable shuffle generation, heuristic solver, controller.
- **Countdown:** shared shell/controller support with separate Numbers and Letters models, validators, and solvers.
- **Tic-Tac-Toe and Connect Four:** retain their existing models/controllers while moving reusable game-tree search out of the controllers.

The package should not contain React components, website routing, API handlers, or Web Worker-specific orchestration.

### Testing and Performance

- Unit-test game rules, validators, generators, move generation, and solvers independently of controllers.
- Add deterministic fixtures using seeded random sources.
- Add solver correctness tests against known positions/puzzles.
- Add performance benchmarks for expensive searches and generators.
- Profile worst-case cases before introducing workers or other asynchronous execution mechanisms.
- Test cancellation and stale-result handling at the appropriate integration boundary.

## Dictionary Strategy

Countdown Letters, Boggle, and Wordle require shared word-list infrastructure. The exact dictionary remains an open decision.

The mini-games package should define the dictionary interface and word-processing behaviour needed by those games, while the actual word-list packaging/licensing decision is made separately. The same dictionary infrastructure should be usable by the Arcade and the Wordle Solver tool.

The dictionary layer should support efficient lookup, length filtering, active word-rule filtering, and solver-friendly iteration/traversal.

## Seeds and Reproducible Games

Generated games should accept optional deterministic random sources or seeds. This should be implemented in the package so tests, benchmarks, debugging, and future shareable game URLs can reproduce the same state without introducing server-side game sessions.

## Timing

The preferred initial design is for the UI to own timers:

- The controller remains deterministic and focused on game state and rules.
- The UI can pause, restart, configure, and display the countdown without coupling timing to the solver.
- The package remains easier to test and reuse outside React.
- Game timing should be based on timestamps rather than repeatedly decrementing a counter. This avoids drift when frames or timer callbacks are delayed and makes pause/resume behaviour easier to reason about.

If the existing event-emitter architecture makes it more natural for the controller to own time, it could emit a once-per-second update containing the remaining time. This should be decided after inspecting the package rather than added speculatively.

## CPU and Solver Behaviour

Countdown Numbers, Countdown Letters, Boggle, Wordle, Sudoku, Minesweeper, Lights Out, and 15-Puzzle can use package solvers as required for validation, hints, or end-of-game reveals. 2048 can expose an AI/search implementation later if justified. The CPU does not need to act as an opponent in the first release.

While changing the mini-games package, investigate the current blocking behaviour that occurs when the CPU is making a move. The investigation should establish:

- Whether the solver is running synchronously on the main thread.
- Which operation blocks: generation, search, evaluation, or event delivery.
- Whether the solver can yield between steps without changing its result.
- Whether a Web Worker is justified for the expensive cases.
- Whether cancellation is needed when a game is reset or abandoned.

Avoid hiding the problem with arbitrary delays. The final design should keep the interface responsive and prevent stale solver results from updating a newer game.

For asynchronous solvers, cancellation should be part of the API where practical, for example through an `AbortSignal`-style mechanism. The exact implementation should follow the existing package architecture rather than being prescribed in advance.

## Dictionary Strategy

Countdown Letters, Boggle, and Wordle all need word-list support. The exact dictionary has not yet been decided.

The architecture should therefore introduce a shared dictionary abstraction rather than hard-coding one particular word list into each game. The dictionary layer should be able to support:

- Word validation.
- Efficient lookup.
- Filtering by length.
- Filtering according to the active word rules.
- Efficient iteration for solver operations.

The same underlying dictionary infrastructure should be reusable by the Arcade and the Wordle Solver tool where practical.

The final dictionary choice should take account of British spelling requirements, licensing, bundle size, solver performance, and the ability to maintain or update the word list.

## Seeds and Reproducible Games

Generated games should support deterministic random sources or seeds at the package level.

This provides:

- Reproducible test cases.
- Easier solver debugging.
- Stable performance benchmarks.
- The possibility of shareable game configurations in the future.
- Useful development URLs such as a selected game mode, configuration, and seed without requiring server-side state.

A seed should not be required for ordinary play; normal games should continue to feel random.

## Solver API and Reusable Architecture

The mini-games package should expose reusable game engines and solvers rather than website-specific controller methods.

A useful conceptual separation is:

```
Game model/state
      |
      +-- rules / validation
      |
      +-- move generation
      |
      +-- solver
      |
      +-- controller
             |
             +-- events / orchestration
```

The controller should coordinate a game session and emit state changes, while the model, rules, and solver remain usable independently.

For games with a meaningful "next move", expose a solver operation that can analyse a supplied state without requiring a live controller instance. This is particularly important for Tools API endpoints, which should be able to accept serialisable game state and return serialisable analysis.

The solver API should prefer structured results over UI-oriented strings. Depending on the game, results might contain:

- Valid/invalid state.
- Legal moves.
- Recommended or optimal move(s).
- Score/value/evaluation where meaningful.
- Solution paths.
- Distance from a target.
- Solver metadata such as operation count.
- A reason or deduction for hint-oriented solvers where useful.

Do not force every game into one generic solver interface if the semantics become artificial. Shared interfaces should cover genuinely common concerns, while game-specific solver APIs should remain strongly typed.

Controllers should be convenient for the Arcade UI; pure models, validators, move generators, and solvers should be convenient for the Tools API.

## Suggested Delivery Order

### Phase 1: Package Foundations

- Inspect the mini-games package architecture and current CPU blocking behaviour.
- Separate reusable game models/rules/solvers from controller-specific orchestration where the current architecture mixes them.
- Establish shared configuration types.
- Establish a shared word-list and dictionary abstraction, while leaving the exact dictionary choice open.
- Add deterministic random sources or seeds for testable generation.
- Add solver and validator test fixtures.
- Establish cancellation semantics for expensive asynchronous solver work where appropriate.
- Establish a consistent serialisation strategy for game state and solver results where this is useful to the Tools API.

### Phase 2: Wordle

- Add configurable random target generation.
- Add guess validation and repeated-letter handling.
- Connect the UI and add the timer only after the core logic is stable.
- Share dictionary/evaluation infrastructure with the planned Wordle Solver tool where practical.

### Phase 3: Countdown Letters

- Add weighted letter generation with vowel and consonant constraints.
- Add dictionary filtering and all-word solving.
- Add the single-field UI and end-of-round solution reveal.

### Phase 4: Countdown Numbers

- Add number selection and target generation.
- Add expression parsing and validation.
- Add closest-solution search using distance from target, then operation count as the tie-break.
- Build the tokenised expression input after the evaluator rules are settled.

### Phase 5: Boggle

- Add dice distributions and board generation.
- Add board traversal and solution search.
- Add scoring and text-entry mode.
- Add drag selection as a second input mode.

### Phase 6: Sudoku

- Add board representation, validation, and solving.
- Add complete-solution generation.
- Add puzzle generation with configurable difficulty.
- Add uniqueness checks for generated puzzles.
- Add generated-puzzle UI.
- Add blank-grid input and validation.
- Add solver/hint support once the core board implementation is stable.

### Phase 7: Minesweeper

- Add board representation, generation, reveal/flood-fill, flags, and win/loss handling.
- Add deterministic generation and tests.
- Add deduction-oriented solver support.
- Connect the Arcade UI.

### Phase 8: 2048

- Add reusable move/state engine.
- Add deterministic random tile generation.
- Connect the Arcade UI.
- Consider AI/search only after the basic engine is stable.

### Phase 9: Lights Out

- Add board representation and move rules.
- Add deterministic puzzle generation.
- Add mathematical solver.
- Connect the Arcade UI.

### Phase 10: 15-Puzzle

- Add state representation and legal moves.
- Add solvable shuffle generation.
- Add heuristic solver.
- Connect the Arcade UI and solution animation.

### Phase 11: Solver Tools

Expose useful solver/analysis functionality through Tools APIs, reusing the mini-games package rather than duplicating algorithms.

Potential tools include:

- Wordle Solver.
- Sudoku Solver.
- Boggle Solver.
- Minesweeper Solver.
- Connect Four Solver.
- Tic-Tac-Toe Solver.
- 2048 Solver/Move Analyser.
- Lights Out Solver.
- 15-Puzzle Solver.

The exact UI/API surface should be designed around each game's useful analysis rather than forcing every solver into the same interface.

### Phase 12: Polish

- Add shared configuration controls and timer presentation.
- Add accessible keyboard and screen-reader support.
- Test touch input for Boggle and Sudoku.
- Add loading, cancellation, timeout, and reset states for solver work.
- Measure worst-case solver performance on representative dictionaries, boards, and puzzles.
- Consider shareable/reproducible game URLs using configuration and seeds.
- Consider the mobile Sudoku scanning workflow as a separate future feature.

## Architecture Opportunities

The arcade and tools should form a small ecosystem around reusable package logic rather than independent implementations.

Potential shared areas include:

- Word dictionaries and word filtering.
- Wordle validation and repeated-letter evaluation.
- Sudoku board validation and solving.
- Game-specific solver utilities.
- Deterministic random generation.
- Search/solver infrastructure.
- Serialisation and deserialisation of game state.
- Common validation/error-result patterns where they genuinely apply.

The website should remain responsible for presentation and interaction, while the mini-games package remains the source of truth for game rules and solving behaviour.

## Open Decisions

- Which dictionary will provide the allowed words?
- How will British spelling restrictions be represented and maintained?
- What exact Scrabble distribution should be used for Countdown Letters?
- What exact Boggle dice distributions should be used, including the `Qu` distribution?
- Are non-integral Countdown Numbers results allowed?
- Should Countdown solutions be allowed to use brackets and, if so, what grammar is permitted?
- How should Sudoku difficulty be defined and measured?
- How should Sudoku puzzles be generated so difficulty is meaningful rather than based only on the number of removed cells?
- What Minesweeper board presets and first-move rules should be supported?
- Should 2048 support only the standard 4x4 game initially?
- What default Lights Out grid size should be used?
- How should 15-Puzzle solver performance be bounded for difficult positions?
- Should the timer pause when the browser tab is hidden?
- Is a Web Worker needed immediately, or only after profiling the solver?
- What exact dictionary licence and packaging strategy is appropriate for the website and tools?

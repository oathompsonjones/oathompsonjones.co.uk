# Tools and Arcade Implementation Order

This document is the high-level implementation roadmap for the website's Tools and Arcade work.

It deliberately does **not** repeat the detailed requirements for individual projects. Those live in:

- docs/TOOLS_PLAN.md — Tools functionality, APIs, security, UI, and implementation requirements.
- docs/ARCADE_PLAN.md — Arcade games, MiniGames package architecture, game rules, solvers, and shared infrastructure.

The purpose of this document is simply to answer: **what should be built next, and in what order?**

## Principles

- Build foundations before multiplying the number of projects.
- Prefer small, independently useful projects early.
- Introduce one new class of technical complexity at a time.
- Reuse the MiniGames package rather than duplicating game logic in the website.
- Let the Tools API conventions settle before building the more demanding server-side tools.
- Keep Arcade and Tools as related workstreams, but do not block straightforward Tools work on the full Arcade roadmap.
- Treat polish, accessibility, testing, and performance as part of each project rather than one final clean-up exercise.

## Phase 1 — Tools Foundation

Establish the shared /tools infrastructure:

1. /tools landing page and navigation.
2. Shared tool page/layout components.
3. Shared action/control patterns.
4. API route conventions and validation/error format.
5. Responsive and accessibility conventions.
6. API-as-source-of-truth pattern for server-backed tools.

At the end of this phase, adding a small API-backed tool should be straightforward.

## Phase 2 — First Tools

Build the easiest useful tools first, using them to establish the conventions that later tools can follow.

1. **JSON Toolkit and Data Format Converter**
2. **Hash and Encoding Toolkit**
3. **Markdown Previewer**
4. **Colour Palette and Contrast Tool**
5. **Regex Tester**
6. **Cron Expression Explainer**

The JSON Toolkit comes first because it is substantial enough to establish the core editor, validation, API, conversion, copy, and download patterns without introducing significant infrastructure.

## Phase 3 — Medium Tools

Once the basic Tool architecture is proven:

7. **Diff Tool**
8. **Image Metadata Inspector**
9. **File Hash and Duplicate Checker**
10. **URL Inspector**

These introduce more involved comparison, file handling, and structured-input behaviour while remaining relatively self-contained.

## Phase 4 — More Involved Tools

11. **Image Converter and Manipulator**
12. **HTTP Request Builder**

The image tool introduces binary processing and more substantial resource handling. Seam carving can follow ordinary conversion/resizing once the basic implementation is stable.

The HTTP Request Builder should initially remain a construction and inspection tool rather than becoming an arbitrary server-side proxy.

## Phase 5 — Server-Side Browser Automation

13. **Website Screenshotter**

Build this after the API and resource-management conventions are established. It introduces browser automation, navigation limits, SSRF protection, timeouts, and significantly greater server resource usage.

## Phase 6 — Interactive Algorithmic Tools

Build the UI-focused algorithm visualisers separately from the API-backed utilities:

14. **Sorting Algorithm Visualiser**
15. **Binary / Bitboard Visualiser**
16. **Pathfinding Visualiser**
17. **Cellular Automata**

This order introduces animation and algorithm visualisation incrementally, with the Bitboard tool also providing a useful bridge into the MiniGames work.

## Phase 7 — MiniGames Package Foundations

Before adding the larger new Arcade games:

1. Inspect and address the current MiniGames architecture and CPU-search behaviour.
2. Extract reusable game-tree search infrastructure from the existing Tic-Tac-Toe and Connect Four controllers.
3. Establish clean game-state serialisation and solver boundaries.
4. Establish seeded/deterministic randomness.
5. Establish the shared dictionary abstraction for Wordle, Countdown Letters, and Boggle.
6. Establish appropriate solver testing, benchmarking, and cancellation behaviour.

This phase is the foundation for both the new Arcade games and their eventual Solver Tools.

## Phase 8 — First Arcade Games

Implement the games in the order below, keeping the detailed implementation work in ARCADE_PLAN.md.

18. **Wordle**
19. **Countdown Letters**
20. **Countdown Numbers**
21. **Boggle**
22. **Sudoku**
23. **Minesweeper**
24. **2048**
25. **Lights Out**
26. **15-Puzzle**

The ordering intentionally moves from relatively contained word/constraint games into increasingly involved board generation, search, state management, and solver work.

## Phase 9 — MiniGames Solver Tools

Once the corresponding package functionality exists and is stable, expose the useful analysis as Tools rather than duplicating the algorithms.

Initial order:

27. **Wordle Solver**
28. **Sudoku Solver**
29. **Boggle Solver**
30. **Minesweeper Solver**
31. **Connect Four Solver**
32. **Tic-Tac-Toe Solver**
33. **Lights Out Solver**
34. **15-Puzzle Solver**

Additional analysis tools, such as 2048 or Countdown analysis, can be added if the underlying package functionality produces a genuinely useful Tool.

Solver Tools should be implemented alongside stable package functionality rather than waiting until every Arcade game is complete.

## Phase 10 — Polish and Expansion

After the initial catalogue is working:

- Review accessibility across all Tools and Arcade games.
- Review mobile and touch interaction.
- Profile expensive algorithms and server-side operations.
- Tighten file, execution, and resource limits.
- Improve loading, cancellation, timeout, and error states.
- Add useful tests where gaps remain.
- Revisit shared components and package abstractions based on real implementations rather than speculation.
- Consider reproducible/shareable game URLs using configuration and seeds.
- Consider future Sudoku camera scanning separately from the core game.
- Add further Tools or Arcade games only when they provide a clear use case or portfolio value.

## Phase 11 — Franchises

Only after the Tools and Arcade roadmap has been substantially completed, take on the separate Franchises project described in docs/FRANCHISES_PLAN.md.

This is intentionally last because it is a much larger data-modelling and content-curation project rather than a natural extension of the Tools or Arcade implementation work.

The Franchises project should begin with a small, well-structured dataset and prove the reusable data model with more than one franchise before expanding the catalogue.

## Recommended Working Pattern

For each project:

1. Check this roadmap for the next project.
2. Read the relevant section of TOOLS_PLAN.md or ARCADE_PLAN.md.
3. Inspect the existing code before deciding on implementation details.
4. Build the smallest complete version that satisfies the plan.
5. Test the underlying logic/API independently where applicable.
6. Test the actual UI and responsive/accessibility behaviour.
7. Polish the project enough to be a finished part of the site.
8. Only then move to the next project.

The order is a guide, not a dependency graph. If a project exposes a useful shared abstraction or technical issue, adjust the sequence based on what is learned during implementation rather than forcing the original order.
# Tools Page Plan

Add a `/tools` area containing a small collection of focused, privacy-conscious utilities and interactive developer toys. The page should feel like a coherent developer utility box, not a directory of unrelated widgets.

The primary goal is portfolio value: the tools should demonstrate good software engineering, algorithms, API design, accessibility, performance, security, and thoughtful UI. They should also be genuinely useful enough that they become a collection of tools worth returning to.

Where a tool has a meaningful server-side representation, expose that functionality through a stateless API as well as the website UI. The UI should use the same API endpoints rather than maintaining a second implementation of the underlying operation. Some highly interactive/visual tools will not have a useful API representation; these should remain UI-only and be explicitly documented as such.

There should be no database, persistent tool sessions, or stored user input. Requests contain everything needed to perform an operation, and responses contain the result.

## Goals

- Build useful tools that are worth returning to and using.
- Demonstrate accessible UI, robust validation, thoughtful error handling, algorithms, performance, security, and API design.
- Expose server-suitable functionality through stateless API endpoints.
- Use those same API endpoints to power the website UI where practical, avoiding duplicated implementations.
- Keep the entire system database-free and stateless.
- Reuse the site's existing layout, theme, typography, and MUI components.
- Make each tool independently linkable and easy to extend.
- Keep privacy and resource usage in mind without artificially forcing every operation to run in the browser.

## Tool Catalogue

### Developer Utilities

1. **Image Converter and Manipulator**
   - Convert between common image formats.
   - Support resizing, quality selection, preview, and download.
   - Support useful image manipulation operations where practical.
   - Add **seam carving** as an optional content-aware resizing/compression technique. This is intentionally more computationally interesting than ordinary scaling and should demonstrate the seam-carving algorithm visually where possible.
   - Explain when seam carving is preferable to ordinary resizing and when it may produce undesirable results.
   - Handle unsupported formats, oversized files, and conversion failures.
   - Provide a stateless API endpoint accepting the source image and operation options and returning the resulting image.
   - The UI should call the same API rather than maintaining a separate image-processing implementation.
   - Do not persist uploaded images after the request has completed.

2. **JSON Formatter**
   - Format, minify, and validate JSON.
   - Provide clear parse errors and useful line information where possible.
   - Include copy and download actions.
   - Expose equivalent operations through a stateless API endpoint.
   - The UI should use the API endpoint for the actual formatting/validation work.

3. **Hash and Encoding Toolkit**
   - Support Base64, URL encoding/decoding, hexadecimal, and common hashes.
   - Use established cryptographic APIs/libraries for supported operations.
   - Distinguish encoding, hashing, encryption, and signing in the UI.
   - Warn that the tools are not a substitute for a reviewed production security design.
   - Expose equivalent operations through a stateless API endpoint.
   - The UI should use the API endpoint for the actual operation.
   - Never persist submitted input or generated output.

4. **Wordle Solver**
   - Accept known letters, excluded letters, and positional constraints.
   - Use a bundled word list rather than a remote service.
   - Show candidate words and explain invalid or contradictory constraints.
   - Keep the solver usable with keyboard and screen readers.
   - Expose the solver through a stateless API endpoint accepting the same constraints and returning candidate words.
   - The UI should use the API endpoint for solving.
   - Keep the word list bundled with the application rather than storing user state.

5. **Sudoku Solver**
   - Provide an accessible 9x9 input grid.
   - Validate duplicate values and incomplete or unsolvable boards.
   - Solve the submitted board and show the resulting board.
   - Consider a step-by-step mode later, but keep the first version focused.
   - Expose the solver through a stateless API endpoint accepting a board and returning the solution or validation result.
   - The UI should use the API endpoint for solving.
   - Do not create or persist server-side puzzle sessions.

6. **Website Screenshotter**
   - Accept a URL and capture a screenshot of the rendered page.
   - Return the resulting image in the UI and through a stateless API endpoint.
   - Support useful screenshot options such as viewport dimensions, full-page capture, and image format where practical.
   - Use a server-side browser automation tool such as Playwright because arbitrary websites cannot be reliably screenshotted from the browser due to cross-origin restrictions.
   - The UI should call the same screenshot API endpoint exposed to external consumers.
   - Do not persist screenshots, browser state, or submitted URLs after the request.
   - Enforce sensible navigation, execution-time, response-size, and screenshot-size limits.
   - Restrict or validate outbound requests to mitigate SSRF, including access to localhost, private network ranges, cloud metadata endpoints, and other non-public destinations.
   - Consider disabling downloads, excessive resource consumption, and other browser capabilities that are unnecessary for screenshot capture.
   - Return useful errors for invalid URLs, unreachable sites, navigation timeouts, blocked destinations, and pages that fail to render.
   - Make it clear that the screenshot represents the page as rendered by the service at the time of the request, and may differ from what a user's browser displays.

7. **Colour Palette and Contrast Tool**
   - Accept individual colours or palettes.
   - Calculate WCAG contrast ratios and indicate relevant accessibility thresholds.
   - Generate useful colour relationships such as tints, shades, complementary colours, and analogous palettes.
   - Provide copyable CSS values, CSS variables, or other useful output.
   - Expose meaningful colour calculations through a stateless API endpoint.
   - Use the API endpoint from the UI for calculations.

8. **Regex Tester**
   - Accept a regular expression, flags, and test text.
   - Highlight matches and expose capture groups and match information.
   - Support replacement previews.
   - Explain syntax errors clearly.
   - Use JavaScript/TypeScript regular-expression semantics initially.
   - Expose stateless API operations for testing and replacement where practical.
   - The UI should use the same API for the actual matching operation.

9. **Cron Expression Explainer**
   - Accept cron expressions and explain each field in human-readable terms.
   - Show upcoming and previous execution times.
   - Provide field-by-field breakdowns and validation errors.
   - Support a clearly documented cron dialect rather than pretending all cron implementations are identical.
   - Expose parsing, validation, explanation, and next/previous occurrence calculations through a stateless API endpoint.
   - The UI should use the API endpoint for calculations.

10. **URL Inspector**
    - Parse a URL into protocol, hostname, port, path, query parameters, fragment, and other relevant components.
    - Show encoded and decoded representations where useful.
    - Provide useful derived representations such as an equivalent `curl` command where appropriate.
    - Validate malformed or ambiguous URLs clearly.
    - Expose URL parsing and transformations through a stateless API endpoint.
    - The UI should use the API endpoint for the actual parsing work.

11. **HTTP Request Builder**
    - Provide a UI for constructing and inspecting HTTP requests without making the tool a general-purpose arbitrary server-side HTTP proxy.
    - Allow users to build methods, URLs, headers, query parameters, and request bodies.
    - Generate useful representations such as `curl` commands and fetch examples.
    - Focus on request construction/inspection rather than executing arbitrary requests from the website's server.
    - If request execution is added in future, it should be a separate, deliberately constrained feature with a clear security model rather than an open proxy.
    - Expose stateless API functionality for request construction and representation generation where useful.
    - The UI can use the API for generation while retaining interactive editing locally.

12. **Markdown Previewer**
    - Provide a Markdown editor with live preview.
    - Render useful GitHub-style Markdown including headings, lists, tables, links, code blocks, and other common syntax.
    - Provide syntax highlighting where appropriate.
    - Allow copying or downloading rendered HTML.
    - Sanitize rendered HTML and treat Markdown as untrusted input.
    - Expose Markdown-to-HTML conversion through a stateless API endpoint.
    - The UI should use the API endpoint for rendering rather than maintaining a second Markdown implementation.

13. **Image Metadata Inspector**
    - Accept an image and inspect available metadata such as dimensions, MIME type, file size, colour information, and EXIF data where supported.
    - Surface privacy-sensitive metadata such as GPS information clearly.
    - Provide a way to remove metadata and download a cleaned image.
    - Expose metadata inspection and metadata removal through stateless API endpoints.
    - The UI should use the same API for the actual processing.
    - Do not persist uploaded images or extracted metadata.

14. **File Hash and Duplicate Checker**
    - Accept multiple files and calculate hashes such as SHA-256.
    - Display useful file information alongside hashes.
    - Identify files with identical content.
    - Prefer streaming/incremental processing where practical to avoid unnecessary memory usage.
    - Expose stateless API functionality for hashing individual files or batches.
    - The UI should use the API for server-side hashing, with appropriate upload and resource limits.
    - Do not retain uploaded files after processing.

15. **JSON to TypeScript Generator**
    - Accept JSON and generate TypeScript `interface` or `type` definitions.
    - Handle nested objects, arrays, primitive types, and optional properties.
    - Support useful naming and output-format options.
    - Provide copy and download actions.
    - Expose JSON-to-TypeScript generation through a stateless API endpoint.
    - The UI should use the API endpoint for generation.

### Interactive / Algorithmic Tools

These tools are intentionally UI-focused. They are primarily demonstrations of algorithms, visualisation, interaction, animation, and performance rather than conventional API services. They do not need API endpoints unless a useful stateless representation emerges naturally.

16. **Pathfinding Visualiser**
    - Visualise algorithms such as A*, Dijkstra's algorithm, BFS, and DFS on a configurable grid.
    - Allow users to place start/end points and walls or obstacles.
    - Animate exploration and the final path.
    - Show useful algorithm statistics such as visited nodes, path length, and execution time.
    - Keep the algorithm implementations separate from the rendering layer and thoroughly test them independently.
    - API endpoint: **not required initially**. The useful output is inherently interactive and temporal, although a stateless endpoint could potentially accept a grid and return a computed path later.

17. **Sorting Algorithm Visualiser**
    - Visualise algorithms such as quicksort, mergesort, heapsort, insertion sort, selection sort, and bubble sort.
    - Animate comparisons, swaps, partitions, and other algorithm-specific operations.
    - Allow array size, initial ordering, and animation speed to be configured.
    - Display comparison/swap counts and timing.
    - Keep algorithm implementations independent of the animation system.
    - API endpoint: **not required initially**. A raw sorted array is possible through an API, but the interesting part of the tool is the sequence of operations and visualisation.

18. **Cellular Automata**
    - Start with Conway's Game of Life.
    - Allow cells to be toggled, simulations to be started/stopped, and simulation speed to be changed.
    - Support random initial states and useful preset patterns.
    - Design the underlying simulation so additional cellular-automaton rules can be added later.
    - Consider configurable neighbourhoods/rules once the core implementation is stable.
    - API endpoint: **not required initially**. A stateless simulation endpoint could be added later for a fixed number of generations, but the primary purpose is interactive visualisation.

19. **Binary / Bitboard Visualiser**
    - Visualise integer values as binary, hexadecimal, and other useful representations.
    - Demonstrate bitwise operations interactively.
    - Provide shifts, masks, set/clear/toggle operations, and useful binary arithmetic.
    - Support visualising bitboards and operations on them, tying into the techniques used by the MiniGames project.
    - Show useful examples of how bitboards can represent game state and winning positions.
    - Consider interactive demonstrations using Tic-Tac-Toe or Connect Four positions.
    - API endpoint: **limited usefulness**. Basic conversion and bitwise operations could have stateless endpoints, but the visual bitboard/game-state exploration is primarily a UI feature.

20. **Diff Tool**
    - Compare two text inputs and display a clear unified or side-by-side diff.
    - Highlight additions, removals, and changed sections.
    - Support useful options such as whitespace sensitivity and line-ending handling.
    - Provide copyable/exportable diff output where practical.
    - Expose text diff generation through a stateless API endpoint.
    - The UI should use the API endpoint for the actual diff calculation.
    - Consider syntax-aware highlighting later, but keep the initial implementation language-agnostic.

## API Design

- Give tools with meaningful server-side operations documented API endpoints under a consistent namespace, for example:
  - `/api/tools/image-converter`
  - `/api/tools/json`
  - `/api/tools/encoding`
  - `/api/tools/wordle`
  - `/api/tools/sudoku`
  - `/api/tools/website-screenshotter`
  - `/api/tools/colour`
  - `/api/tools/regex`
  - `/api/tools/cron`
  - `/api/tools/url`
  - `/api/tools/http-request`
  - `/api/tools/markdown`
  - `/api/tools/image-metadata`
  - `/api/tools/hash-files`
  - `/api/tools/json-to-typescript`
  - `/api/tools/diff`
- Keep endpoints stateless: a request must contain all required input, and the response must contain the result.
- Do not create a database, server-side user accounts, persistent sessions, or job records for tools.
- Prefer JSON request/response bodies for text and structured tools.
- Use `multipart/form-data` or an appropriate binary request format for tools that accept files.
- Return appropriate HTTP status codes and structured error responses.
- Validate request bodies at the API boundary before invoking tool logic.
- Use the API endpoints as the source of truth for operations performed by the UI. Avoid duplicating the same algorithm or transformation in both client and server code.
- Keep genuinely UI-only interaction, state, and animation in client components.
- Document request and response schemas, limits, and examples for every endpoint.
- Keep API behaviour deterministic where practical; explicitly document operations that depend on external state, such as website screenshots.
- Consider lightweight rate limiting or request limits for resource-intensive endpoints, particularly the Website Screenshotter and image-processing tools, without introducing persistent application state.

## Page Structure

- Add a top-level `/tools` route and navigation entry.
- Show a concise page heading and a responsive grid of tool links.
- Give each tool its own route, for example:
  - `/tools/image-converter`
  - `/tools/json`
  - `/tools/encoding`
  - `/tools/wordle`
  - `/tools/sudoku`
  - `/tools/website-screenshotter`
  - `/tools/colour`
  - `/tools/regex`
  - `/tools/cron`
  - `/tools/url`
  - `/tools/http-request`
  - `/tools/markdown`
  - `/tools/image-metadata`
  - `/tools/hash-files`
  - `/tools/json-to-typescript`
  - `/tools/pathfinding`
  - `/tools/sorting`
  - `/tools/cellular-automata`
  - `/tools/bitboard`
  - `/tools/diff`
- Keep tool state local to each page and make refresh behavior predictable.
- Add a shared tool shell for title, description, input area, output area, errors, reset, and copy/download actions.
- Where an API exists, include concise API documentation and example requests/responses on the relevant tool page.
- Use query parameters only when they improve sharing or reproducibility and do not expose sensitive input.

## Implementation Shape

- Use client components for interactive tool surfaces and animations.
- Keep algorithms and transformation logic in small, testable utility modules.
- Prefer established libraries for security-sensitive parsing/rendering and well-understood algorithms where appropriate, while implementing interesting algorithms ourselves when that is part of the portfolio value.
- Add shared controls for file selection, copy-to-clipboard, download, reset, validation messages, and loading states.
- Use stable dimensions for editors, grids, previews, and output areas so the layout does not jump.
- Keep API route handlers thin: validate input, call the relevant tool logic, and serialise the result.
- Keep the Website Screenshotter's browser automation isolated from ordinary request-handling code.
- Keep image processing and other resource-intensive work bounded by explicit limits.
- Do not introduce server storage or analytics for tool input.
- Avoid coupling the tools to the site's portfolio content so they remain reusable and independently testable.
- Keep interactive visualisations performant, potentially using Canvas, Web Workers, or other appropriate browser APIs where justified.

## Security and Privacy

- The website UI may use the API for tool operations; do not treat server-side execution as a privacy violation by itself.
- Never log submitted tool input or include it in URLs by default.
- API requests must not be written to persistent storage.
- Use established cryptographic APIs/libraries for cryptographic operations; never implement encryption primitives from scratch.
- Label hashes as one-way digests and encoding as reversible representation changes.
- Do not describe encryption or hashing as secure storage.
- Set sensible file-size, input-size, execution-time, and resource limits to avoid browser or server lockups.
- Review download filenames and generated content for unsafe or misleading extensions.
- Treat the Website Screenshotter as an SSRF-sensitive endpoint. Validate and resolve destinations safely, reject private/link-local/loopback/metadata addresses, and prevent redirects from escaping the allowed public destination policy.
- Set strict timeouts and resource limits for server-side browser work.
- Avoid retaining screenshots, uploaded files, remote page contents, or other submitted data after processing.
- Sanitize rendered Markdown/HTML and any other user-controlled content before rendering it as HTML.
- Do not build an unrestricted server-side HTTP proxy. The HTTP Request Builder is for construction and inspection, not arbitrary server-side request execution.

## Deliberately Excluded Initially

### YouTube URL to MP3/MP4

Do not include this in the first release. It would introduce copyright, platform-terms, hosting, bandwidth, and abuse concerns that do not fit the otherwise stateless utility page. Revisit only if there is a clearly compliant use case and an appropriate legal and operational model.

### JWT Inspector

Do not include this initially. It overlaps somewhat with the encoding/developer-tool functionality without providing enough additional value for the first collection.

## Delivery Phases

### Phase 1: Foundation

- Add the `/tools` page and navigation entry.
- Create the shared tool shell and action controls.
- Establish route, component, utility-module, and API conventions.
- Establish a consistent API error and validation format.
- Establish the pattern of using API endpoints as the source of truth for server-suitable tool operations.
- Add responsive and accessibility patterns.

### Phase 2: Core Developer Tools

- Implement JSON Formatter.
- Implement Hash and Encoding Toolkit.
- Implement Wordle Solver.
- Implement Sudoku Solver.
- Implement Colour Palette and Contrast Tool.
- Implement Regex Tester.
- Implement Cron Expression Explainer.
- Implement URL Inspector.
- Add and document the corresponding stateless API endpoints.

### Phase 3: File, Rendering, and Networking Tools

- Implement Image Converter and Manipulator, including seam carving.
- Add its stateless API endpoint and make the UI use it.
- Implement Website Screenshotter with server-side browser automation and SSRF/resource protections.
- Add its stateless API endpoint and API documentation.
- Implement Image Metadata Inspector.
- Implement File Hash and Duplicate Checker.
- Implement Markdown Previewer.
- Implement JSON to TypeScript Generator.
- Implement HTTP Request Builder without arbitrary server-side request execution.
- Implement Diff Tool.

### Phase 4: Interactive Algorithm Visualisations

- Implement Pathfinding Visualiser.
- Implement Sorting Algorithm Visualiser.
- Implement Cellular Automata.
- Implement Binary / Bitboard Visualiser.
- Keep these primarily UI-focused and document why a conventional API endpoint is unnecessary or limited for each one.

### Phase 5: Quality and Documentation

- Add unit tests for parsers, validators, solvers, algorithms, and transformation helpers.
- Add API tests covering valid requests, invalid input, size limits, and error responses.
- Add tests for the API/UI contract so the website does not accidentally diverge from the public API behaviour.
- Test keyboard navigation, focus management, error states, and reduced-transparency preferences.
- Test mobile layouts and large inputs/files.
- Test Website Screenshotter navigation, redirects, timeouts, inaccessible destinations, and resource limits.
- Test resource-intensive image operations, including seam carving, against pathological inputs.
- Add concise help text and examples where a tool's input format is not obvious.
- Add API documentation and example requests/responses for every API-backed tool.
- Add links from the tools page to the relevant source repositories where appropriate.

## Acceptance Criteria

- Every tool has a direct route, reset action, useful empty state, validation errors, and a successful output state.
- Every server-suitable tool has a documented, stateless API endpoint exposing its core functionality.
- The website UI uses the API as the source of truth for API-backed operations rather than duplicating the implementation.
- Interactive visualisation tools clearly document their UI-focused nature and do not require artificial API endpoints.
- Interactive controls are keyboard accessible and have appropriate labels.
- API requests do not create persistent application state or store user input.
- No tool blocks the page or server with an unbounded computation or file operation.
- Resource-intensive API endpoints have sensible input, execution-time, and output limits.
- Website Screenshotter cannot be used to access private, local, link-local, or cloud metadata services.
- Markdown/HTML rendering does not permit arbitrary untrusted HTML execution.
- The HTTP Request Builder does not become an unrestricted server-side HTTP proxy.
- The page works on mobile and desktop without overlapping or unstable controls.
- TypeScript, lint, and automated tests pass before release.

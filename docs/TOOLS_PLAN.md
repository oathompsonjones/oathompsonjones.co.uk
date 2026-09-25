# Tools Page Plan

Add a `/tools` area containing a small collection of focused, privacy-conscious utilities. The page should feel like a coherent developer utility box, not a directory of unrelated widgets.

## Goals

- Provide useful tools that can be run directly in the browser.
- Keep user data local whenever possible.
- Demonstrate accessible UI, robust validation, and thoughtful error handling.
- Reuse the site's existing layout, theme, typography, and MUI components.
- Make each tool independently linkable and easy to extend.

## Initial Release

Start with five polished tools:

1. **Image Converter**
   - Convert between common image formats supported by the browser.
   - Support resizing, quality selection, preview, and download.
   - Process files locally and make the original file clear before conversion.
   - Handle unsupported formats, oversized files, and conversion failures.

2. **JSON Formatter**
   - Format, minify, and validate JSON.
   - Provide clear parse errors and useful line information where possible.
   - Include copy and download actions.
   - Avoid sending input to a server.

3. **Hash and Encoding Toolkit**
   - Support Base64, URL encoding/decoding, hexadecimal, and common hashes.
   - Use Web Crypto APIs for supported cryptographic operations.
   - Distinguish encoding, hashing, encryption, and signing in the UI.
   - Warn that the tools are not a substitute for a reviewed production security design.

4. **Wordle Solver**
   - Accept known letters, excluded letters, and positional constraints.
   - Use a bundled word list rather than a remote service.
   - Show candidate words and explain invalid or contradictory constraints.
   - Keep the solver usable with keyboard and screen readers.

5. **Sudoku Solver**
   - Provide an accessible 9x9 input grid.
   - Validate duplicate values and incomplete or unsolvable boards.
   - Solve locally and show the resulting board.
   - Consider a step-by-step mode later, but keep the first version focused.

## Page Structure

- Add a top-level `/tools` route and navigation entry.
- Show a concise page heading and a responsive grid of tool links.
- Give each tool its own route, for example:
  - `/tools/image-converter`
  - `/tools/json`
  - `/tools/encoding`
  - `/tools/wordle`
  - `/tools/sudoku`
- Keep tool state local to each page and make refresh behavior predictable.
- Add a shared tool shell for title, description, input area, output area, errors, reset, and copy/download actions.
- Use query parameters only when they improve sharing or reproducibility and do not expose sensitive input.

## Implementation Shape

- Use client components only for interactive tool surfaces.
- Keep algorithms and format conversion logic in small, testable utility modules.
- Prefer browser APIs and established libraries over custom cryptographic implementations.
- Add shared controls for file selection, copy-to-clipboard, download, reset, validation messages, and loading states.
- Use stable dimensions for editors, grids, previews, and output areas so the layout does not jump.
- Do not introduce server storage or analytics for tool input.

## Security and Privacy

- Process image files, JSON, puzzle boards, and text locally by default.
- Never log submitted tool input or include it in URLs by default.
- Use Web Crypto or a well-established library for cryptographic operations; never implement encryption primitives from scratch.
- Label hashes as one-way digests and encoding as reversible representation changes.
- Do not describe client-side encryption as secure storage or a complete key-management solution.
- Set sensible file-size and resource limits to avoid browser lockups.
- Review download filenames and generated content for unsafe or misleading extensions.

## Deliberately Excluded Initially

### YouTube URL to MP3/MP4

Do not include this in the first release. It would introduce copyright, platform-terms, hosting, bandwidth, and abuse concerns that do not fit the otherwise local-first utility page. Revisit only if there is a clearly compliant use case and an appropriate legal and operational model.

## Delivery Phases

### Phase 1: Foundation

- Add the `/tools` page and navigation entry.
- Create the shared tool shell and action controls.
- Establish route, component, and utility-module conventions.
- Add responsive and accessibility patterns.

### Phase 2: Core Tools

- Implement JSON Formatter.
- Implement Hash and Encoding Toolkit.
- Implement Wordle Solver.
- Implement Sudoku Solver.

### Phase 3: File Tool

- Implement Image Converter with local processing, previews, limits, and downloads.

### Phase 4: Quality and Documentation

- Add unit tests for parsers, validators, solvers, and conversion helpers.
- Test keyboard navigation, focus management, error states, and reduced-transparency preferences.
- Test mobile layouts and large inputs/files.
- Add concise help text and examples where a tool's input format is not obvious.
- Add links from the tools page to the relevant source repositories where appropriate.

## Acceptance Criteria

- Every tool has a direct route, reset action, useful empty state, validation errors, and a successful output state.
- Interactive controls are keyboard accessible and have appropriate labels.
- Local-first tools do not make network requests for user input.
- No tool blocks the page with an unbounded computation or file operation.
- The page works on mobile and desktop without overlapping or unstable controls.
- TypeScript, lint, and automated tests pass before release.

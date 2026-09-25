# Tools Page Plan

Add a `/tools` area containing a small collection of focused, privacy-conscious utilities. The page should feel like a coherent developer utility box, not a directory of unrelated widgets.

The tools should be useful from both the website UI and programmatically: every tool should have a stateless API endpoint in addition to its browser interface. There should be no database, persistent tool sessions, or stored user input. Requests contain everything needed to perform the operation, and responses contain the result.

## Goals

- Provide useful tools that can be run directly in the browser.
- Expose the same functionality through stateless API endpoints.
- Keep user data local whenever possible for browser-only tools.
- Demonstrate accessible UI, robust validation, thoughtful error handling, and API design.
- Reuse the site's existing layout, theme, typography, and MUI components.
- Make each tool independently linkable and easy to extend.
- Keep the entire system database-free and stateless.

## Initial Release

Start with five polished tools:

1. **Image Converter**
   - Convert between common image formats supported by the browser.
   - Support resizing, quality selection, preview, and download.
   - Process files locally and make the original file clear before conversion.
   - Handle unsupported formats, oversized files, and conversion failures.
   - Provide a stateless API endpoint accepting the source image and conversion options and returning the converted image.
   - Do not persist uploaded images after the request has completed.

2. **JSON Formatter**
   - Format, minify, and validate JSON.
   - Provide clear parse errors and useful line information where possible.
   - Include copy and download actions.
   - Avoid sending input to a server from the browser UI by default.
   - Expose equivalent formatting, minifying, and validation operations through a stateless API endpoint.

3. **Hash and Encoding Toolkit**
   - Support Base64, URL encoding/decoding, hexadecimal, and common hashes.
   - Use Web Crypto APIs for supported cryptographic operations.
   - Distinguish encoding, hashing, encryption, and signing in the UI.
   - Warn that the tools are not a substitute for a reviewed production security design.
   - Expose equivalent operations through a stateless API endpoint.
   - Never persist submitted input or generated output.

4. **Wordle Solver**
   - Accept known letters, excluded letters, and positional constraints.
   - Use a bundled word list rather than a remote service.
   - Show candidate words and explain invalid or contradictory constraints.
   - Keep the solver usable with keyboard and screen readers.
   - Expose the solver through a stateless API endpoint accepting the same constraints and returning candidate words.
   - Keep the word list bundled with the application rather than storing user state.

5. **Sudoku Solver**
   - Provide an accessible 9x9 input grid.
   - Validate duplicate values and incomplete or unsolvable boards.
   - Solve locally and show the resulting board.
   - Consider a step-by-step mode later, but keep the first version focused.
   - Expose the solver through a stateless API endpoint accepting a board and returning the solution or validation result.
   - Do not create or persist server-side puzzle sessions.

6. **Website Screenshotter**
   - Accept a URL and capture a screenshot of the rendered page.
   - Return the resulting image in the UI and through a stateless API endpoint.
   - Support useful screenshot options such as viewport dimensions, full-page capture, and image format where practical.
   - Use a server-side browser automation tool such as Playwright because arbitrary websites cannot be reliably screenshotted from the browser due to cross-origin restrictions.
   - Do not persist screenshots, browser state, or submitted URLs after the request.
   - Enforce sensible navigation, execution-time, response-size, and screenshot-size limits.
   - Restrict or validate outbound requests to mitigate SSRF, including access to localhost, private network ranges, cloud metadata endpoints, and other non-public destinations.
   - Consider disabling downloads, excessive resource consumption, and other browser capabilities that are unnecessary for screenshot capture.
   - Return useful errors for invalid URLs, unreachable sites, navigation timeouts, blocked destinations, and pages that fail to render.
   - Make it clear that the screenshot represents the page as rendered by the service at the time of the request, and may differ from what a user's browser displays.

## API Design

- Give every tool a documented API endpoint under a consistent namespace, for example:
  - `/api/tools/image-converter`
  - `/api/tools/json`
  - `/api/tools/encoding`
  - `/api/tools/wordle`
  - `/api/tools/sudoku`
  - `/api/tools/website-screenshotter`
- Keep endpoints stateless: a request must contain all required input, and the response must contain the result.
- Do not create a database, server-side user accounts, persistent sessions, or job records for tools.
- Prefer JSON request/response bodies for text and structured tools.
- Use `multipart/form-data` or an appropriate binary request format for tools that accept files.
- Return appropriate HTTP status codes and structured error responses.
- Validate request bodies at the API boundary before invoking tool logic.
- Reuse the same small, testable utility modules between the UI and API where practical, while keeping browser-only APIs out of server-side code.
- Document request and response schemas, limits, and examples for every endpoint.
- Keep API behaviour deterministic where practical; explicitly document any operation that depends on external state, such as website screenshots.
- Consider lightweight rate limiting or request limits for resource-intensive endpoints, particularly the Website Screenshotter, without introducing persistent application state.

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
- Keep tool state local to each page and make refresh behavior predictable.
- Add a shared tool shell for title, description, input area, output area, errors, reset, and copy/download actions.
- Where an API exists, include concise API documentation and example requests/responses on the relevant tool page.
- Use query parameters only when they improve sharing or reproducibility and do not expose sensitive input.

## Implementation Shape

- Use client components only for interactive tool surfaces.
- Keep algorithms and format conversion logic in small, testable utility modules.
- Prefer browser APIs and established libraries over custom cryptographic implementations.
- Add shared controls for file selection, copy-to-clipboard, download, reset, validation messages, and loading states.
- Use stable dimensions for editors, grids, previews, and output areas so the layout does not jump.
- Keep API route handlers thin: validate input, call the relevant tool logic, and serialise the result.
- Keep the Website Screenshotter's browser automation isolated from ordinary request-handling code.
- Do not introduce server storage or analytics for tool input.
- Avoid coupling the tools to the site's portfolio content so they remain reusable and independently testable.

## Security and Privacy

- Process image files, JSON, puzzle boards, and text locally by default in the browser UI.
- Never log submitted tool input or include it in URLs by default.
- API requests must not be written to persistent storage.
- Use Web Crypto or a well-established library for cryptographic operations; never implement encryption primitives from scratch.
- Label hashes as one-way digests and encoding as reversible representation changes.
- Do not describe client-side encryption as secure storage or a complete key-management solution.
- Set sensible file-size and resource limits to avoid browser lockups.
- Review download filenames and generated content for unsafe or misleading extensions.
- Treat the Website Screenshotter as an SSRF-sensitive endpoint. Validate and resolve destinations safely, reject private/link-local/loopback/metadata addresses, and prevent redirects from escaping the allowed public destination policy.
- Set strict timeouts and resource limits for server-side browser work.
- Avoid retaining screenshots, uploaded files, or remote page contents after the request.

## Deliberately Excluded Initially

### YouTube URL to MP3/MP4

Do not include this in the first release. It would introduce copyright, platform-terms, hosting, bandwidth, and abuse concerns that do not fit the otherwise local-first utility page. Revisit only if there is a clearly compliant use case and an appropriate legal and operational model.

## Delivery Phases

### Phase 1: Foundation

- Add the `/tools` page and navigation entry.
- Create the shared tool shell and action controls.
- Establish route, component, utility-module, and API conventions.
- Establish a consistent API error and validation format.
- Add responsive and accessibility patterns.

### Phase 2: Core Tools

- Implement JSON Formatter.
- Implement Hash and Encoding Toolkit.
- Implement Wordle Solver.
- Implement Sudoku Solver.
- Add and document the corresponding stateless API endpoints.

### Phase 3: File and External Tools

- Implement Image Converter with local processing, previews, limits, and downloads.
- Add its stateless API endpoint.
- Implement Website Screenshotter with server-side browser automation and SSRF/resource protections.
- Add its stateless API endpoint and API documentation.

### Phase 4: Quality and Documentation

- Add unit tests for parsers, validators, solvers, and conversion helpers.
- Add API tests covering valid requests, invalid input, size limits, and error responses.
- Test keyboard navigation, focus management, error states, and reduced-transparency preferences.
- Test mobile layouts and large inputs/files.
- Test Website Screenshotter navigation, redirects, timeouts, inaccessible destinations, and resource limits.
- Add concise help text and examples where a tool's input format is not obvious.
- Add API documentation and example requests/responses for every tool.
- Add links from the tools page to the relevant source repositories where appropriate.

## Acceptance Criteria

- Every tool has a direct route, reset action, useful empty state, validation errors, and a successful output state.
- Every tool has a documented, stateless API endpoint exposing the same core functionality as its UI.
- Interactive controls are keyboard accessible and have appropriate labels.
- Local-first tools do not make network requests for user input.
- API requests do not create persistent application state or store user input.
- No tool blocks the page with an unbounded computation or file operation.
- Resource-intensive API endpoints have sensible input, execution-time, and output limits.
- Website Screenshotter cannot be used to access private, local, link-local, or cloud metadata services.
- The page works on mobile and desktop without overlapping or unstable controls.
- TypeScript, lint, and automated tests pass before release.

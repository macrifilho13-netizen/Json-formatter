# JSON Formatter

A browser-based tool for formatting and validating JSON. The interface provides an editable input pane and a read-only formatted output pane, with controls for indentation, local file input, copying and downloading the result.

The project is built with React, TypeScript and Vite. Monaco Editor provides the code-editing experience in both panes.

## Overview

JSON Formatter is a client-side web application intended to make JSON easier to inspect and work with during development. Users can paste JSON into the input editor or open a local `.json` file, choose an indentation style, and view the formatted result.

Formatting and parsing take place in the browser. The application does not include an application server or a project-specific API for processing JSON.

## Features

- **Format and parse JSON:** parses the input and serializes valid JSON with the selected indentation.
- **Automatic formatting:** attempts to refresh the formatted output after a 500 ms pause in editing.
- **Explicit validation feedback:** the **Format JSON** action reports parsing errors for invalid input.
- **Indentation options:** supports two spaces, four spaces and tabs.
- **Monaco Editor:** syntax-aware JSON editing in the input and output panes; the output pane is read-only.
- **Local file input:** open a `.json` file with the file picker or drag and drop it onto the input pane.
- **Copy and download:** copy the formatted result to the clipboard or download it as `formatted.json`.
- **Theme preference:** dark and light themes are available; the selected theme is saved in browser local storage.
- **Expandable usage guide:** includes basic instructions and FAQs in a native disclosure element.

## Technology stack

| Technology | Role |
| --- | --- |
| React 19 | UI components and application state |
| TypeScript 5.9 | Static typing for application code |
| Vite 8 | Development server and production bundling |
| Monaco Editor | JSON editor components |
| `@monaco-editor/react` | React integration for Monaco Editor |
| CSS | Layout, responsive behavior and theme styling |

The project uses the browser's `FileReader`, Clipboard API, Blob/object URLs and `localStorage` for file reading, copying, downloads and theme persistence.

## Application structure

```text
json-formatter/
├── public/
│   └── buy-me-a-coffee.png   # Support-button artwork
├── src/
│   ├── App.tsx               # UI, state and JSON operations
│   ├── main.tsx              # React application entry point
│   └── styles.css            # Layout, themes and responsive styles
├── index.html                # HTML entry point and page metadata
├── package.json              # Dependencies and npm scripts
├── tsconfig.json             # TypeScript project configuration
├── tsconfig.app.json         # Application TypeScript configuration
├── tsconfig.node.json        # Tooling TypeScript configuration
└── vite.config.ts            # Vite configuration
```

The application is currently organized as a small single-page React application. `App.tsx` owns the editor state, formatting behavior, file handling, theme preference and user feedback. `main.tsx` mounts the React application, while `styles.css` defines the visual system and responsive layout.

## Requirements

- Node.js with a version supported by the installed Vite release.
- npm (included with Node.js).
- A modern browser with JavaScript enabled.

## Installation and local development

Clone the repository and enter the project directory:

```bash
git clone https://github.com/<your-github-username>/json-formatter.git
cd json-formatter
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Vite prints the local development URL in the terminal (normally `http://localhost:5173`). Open that address in a browser. Stop the server with `Ctrl+C` in the terminal.

### Windows PowerShell

If the PowerShell execution policy prevents the `npm.ps1` shim from running, use the Windows command shim:

```powershell
npm.cmd install
npm.cmd run dev
```

## Production build

Run the TypeScript project build and Vite production bundle:

```bash
npm run build
```

The generated static site is written to `dist/`. To serve that build locally for a production-style check:

```bash
npm run preview
```

The preview command prints the local URL to open. The `dist/` directory is a generated build artifact and should not be committed as source.

## Usage

1. Paste JSON into the **Input JSON** editor, or select **Open file** / **Choose file** to read a local file. A `.json` file can also be dropped onto the input pane.
2. Select **2 spaces**, **4 spaces** or **Tabs** from the indentation control.
3. The application attempts to format valid input after a short pause. Select **Format JSON** to explicitly format and validate the current input and display parsing errors when it is invalid.
4. Use **Copy** to copy the result or **Download** to save it as `formatted.json`.
5. Select **Clear** to empty both panes.

Example input:

```json
{"name":"Ada Lovelace","role":"developer","active":true,"skills":["analysis","programming"]}
```

With two-space indentation, the formatted result is:

```json
{
  "name": "Ada Lovelace",
  "role": "developer",
  "active": true,
  "skills": [
    "analysis",
    "programming"
  ]
}
```

## Configuration and deployment notes

There are no project-specific environment variables or backend services in the current implementation. The support button currently links to a placeholder Buy Me a Coffee URL and must be updated before it is used in a public release.

Two empty advertisement containers are reserved in the page layout. They do not display advertisements until real ad code is configured; advertising integration and publisher approval are not included in the current codebase.

The project can be deployed as a static site. For a Vite-based static deployment, use `npm run build` as the build command and `dist` as the output directory. Configure the hosting provider to serve the generated static files. A custom domain, analytics, search-console verification and advertising setup are separate deployment tasks and are not configured by this repository yet.

## Privacy and data handling

JSON text is read and processed in the browser. The current application code does not send the input JSON to a project backend. Local theme preference is stored in `localStorage`. Clipboard access depends on browser permissions and security context.

This description concerns the application's current code. Hosting providers, browser extensions and other third-party services may have their own data practices.

## Screenshots

A current interface screenshot can be added here when a repository-ready image is available. Suggested location: `docs/screenshots/desktop-dark.png`. A light-theme screenshot can be added alongside it. No screenshot asset is included in this repository version.

## Planned improvements

Potential next steps, subject to prioritization and testing:

- Add automated unit and browser-level tests for formatting, validation, file handling and theme behavior.
- Improve accessibility verification, including keyboard navigation and screen-reader behavior around editor controls and status messages.
- Add final favicon, canonical URL and social-sharing metadata when the production URL is selected.
- Configure and test real advertising units after the publisher account and site are eligible.
- Replace the Buy Me a Coffee placeholder with the project's actual support URL.
- Add further JSON utilities only where they provide a clear user benefit.

## Development approach

AI-assisted development tools were used during implementation. The application code and behavior should continue to be reviewed, tested and maintained as part of normal software development; generated code is not treated as a substitute for understanding or verification.

## License

No open-source license has been selected for this repository yet. Unless a license is added, the source code remains subject to the default copyright rules and should not be assumed to be available for reuse.

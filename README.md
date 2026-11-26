# JSON Formatter

A browser-based tool for formatting and validating JSON. The application provides an editable input pane and a formatted, read-only output pane. JSON processing takes place in the browser.

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript 5.9" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Monaco_Editor-editor-2C2C32?style=for-the-badge" alt="Monaco Editor" />
</p>

## Features

- Format valid JSON automatically as the input changes, with a short debounce.
- Validate and format on demand, displaying parsing errors for invalid input.
- Edit JSON with Monaco Editor syntax highlighting; the output pane is read-only.
- Import local `.json` files using the file picker or drag and drop.
- Copy formatted output or download it as `formatted.json`.
- Choose 2-space, 4-space or tab indentation.
- Switch between dark and light themes; the preference is stored in browser local storage.

## Technology stack

| Technology | Role |
|---|---|
| React 19 | UI components and state |
| TypeScript 5.9 | Application types and compile-time checks |
| Vite 8 | Development server and production bundler |
| Monaco Editor | JSON editing and syntax highlighting |
| CSS | Layout, responsive styling and themes |

## Repository structure

The application is kept in the `app/` directory so the repository root stays uncluttered. This is also the directory used for local development and Cloudflare Pages builds.

```text
json-formatter/
├── README.md
└── app/
    ├── public/
    │   └── buy-me-a-coffee.png
    ├── src/
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── styles.css
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    ├── tsconfig.app.json
    ├── tsconfig.node.json
    └── vite.config.ts
```

## Requirements

- Node.js compatible with the Vite version in `app/package.json` (Node.js 22 or later is recommended).
- npm.
- A modern browser.

## Local setup

Open a terminal in the repository root, then run:

```bash
cd app
npm install
npm run dev
```

On Windows PowerShell, if the `npm` command is blocked by the execution policy, use the Windows command shim:

```powershell
cd app
npm.cmd install
npm.cmd run dev
```

Open the local address printed by Vite (typically `http://localhost:5173`).

## Usage

1. Paste JSON into the input editor or select/drop a local `.json` file.
2. Choose the desired indentation.
3. Valid input is formatted automatically after a brief pause.
4. Use **Format JSON** to explicitly validate and format the current input.
5. Use **Copy** or **Download** to export the formatted result, or **Clear** to reset the editors.

## Production build

From the `app/` directory, run:

```bash
npm run build
npm run preview
```

The production output is generated in `app/dist/`. The `dist/` directory is a build artifact and should not be committed to the repository.

## Deployment configuration

For a Cloudflare Pages project connected to this repository, use these settings:

- **Root directory:** `app`
- **Build command:** `npm run build`
- **Build output directory:** `dist`

## Privacy

The application parses and formats JSON in the visitor's browser. The current implementation does not send the JSON input to an application backend.

## Screenshots

Screenshots can be added here after the deployed interface and mobile layout have been reviewed.

## Planned improvements

- Add automated tests for formatting, validation and file handling.
- Expand accessibility and responsive-layout testing.
- Add deployment and performance checks.

## Development note

AI-assisted tools were used during development. The implementation and its behavior should be reviewed and tested as the project evolves.

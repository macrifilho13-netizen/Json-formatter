# JSON Formatter

A simple and modern browser-based tool to format, validate and inspect JSON.

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Monaco_Editor-Code_Editor-2C2C32?style=for-the-badge" alt="Monaco Editor" />
  <img src="https://img.shields.io/badge/CSS3-Styling-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
</p>

## Features

- **JSON Formatting:** automatically formats valid JSON with customizable indentation.
- **JSON Validation:** identifies invalid JSON and displays parsing errors.
- **Monaco Editor:** syntax highlighting and editing support, with a read-only output pane.
- **File Import:** open or drag and drop local `.json` files.
- **Copy & Download:** copy formatted JSON or download it as `formatted.json`.
- **Dark & Light Themes:** remembers your preferred theme.
- **Responsive Interface:** designed for convenient use across different screen sizes.

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI and application components |
| TypeScript 5.9 | Type-safe development |
| Vite 8 | Development server and build tool |
| Monaco Editor | Code editing experience |
| CSS3 | Layout, styling and themes |

## Getting Started

### Requirements

- Node.js
- npm
- A modern web browser

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/YOUR_USERNAME/json-formatter.git
cd json-formatter
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually `http://localhost:5173`.

**Windows PowerShell:** If the execution policy prevents `npm` from running, use:

```powershell
npm.cmd install
npm.cmd run dev
```

## Usage

1. Paste JSON into the input editor or open a local `.json` file.
2. Choose the indentation style: 2 spaces, 4 spaces or tabs.
3. The application automatically attempts to format valid JSON as you edit.
4. Select **Format JSON** to manually validate and format the input.
5. Use **Copy** or **Download** to export the formatted result.
6. Select **Clear** to reset both editors.

## Production Build

Generate the optimized production files:

```bash
npm run build
```

The generated files will be available in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

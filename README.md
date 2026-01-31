# Resume Website

A static personal resume website built with HTML, CSS, and vanilla JavaScript. Content is generated dynamically from a single JSON file using the [JSON Resume](https://jsonresume.org/) schema, making it easy to maintain and update.

**Live site:** [spuckett.com](https://www.spuckett.com/)

## Features

- **Single source of truth** — Update `data/resume.json` and both the website and downloadable resume files reflect the changes
- **Downloadable resume** — Generates PDF and DOCX formats from JSON data
- **SEO optimized** — Proper meta tags, Open Graph, Twitter Cards, and JSON-LD structured data
- **Responsive design** — Works on desktop and mobile devices
- **ATS-friendly exports** — Resume files use clean, parseable formatting for applicant tracking systems

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/StevenKP99/resume-site.git
   cd resume-site
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

Start the local development server:

```bash
npm run dev
```

This will start Vite's dev server, typically at `http://localhost:5173/`.

## Building

Build the site for production:

```bash
npm run build
```

This command:
1. Generates PDF and DOCX resume files from `data/resume.json`
2. Builds the static site into the `dist/` folder

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
resume-site/
├── data/
│   └── resume.json          # Your resume data (JSON Resume schema)
├── public/
│   ├── favicon.svg          # Site favicon
│   ├── robots.txt           # Search engine directives
│   ├── sitemap.xml          # Sitemap for SEO
│   └── *.pdf, *.docx        # Generated resume files
├── scripts/
│   └── generate-docx.js     # DOCX generation script
├── src/
│   ├── assets/              # Images and icons
│   ├── components/          # JavaScript components
│   └── css/                 # Stylesheets
├── index.html               # Main page
├── about.html               # About page
├── main.js                  # Main page entry point
└── about.js                 # About page entry point
```

## Customization

### Updating Your Resume

Edit `data/resume.json` following the [JSON Resume schema](https://jsonresume.org/schema/). The file includes:

- `basics` — Name, title, contact info, summary, social profiles
- `work` — Work experience with highlights
- `education` — Degrees and certifications
- `skills` — Technical and soft skills grouped by category
- `interests` — Professional interests and additional info

After editing, run `npm run build:resume` to regenerate the PDF and DOCX files.

### Changing the PDF Theme

The project includes several JSON Resume themes. To change the PDF appearance, edit `package.json`:

```json
"build:resume:pdf": "resumed export data/resume.json -o public/YourName.pdf -t jsonresume-theme-even"
```

Available themes:
- `jsonresume-theme-even` (default) — Clean, minimal layout
- `jsonresume-theme-flat` — Simple, text-focused
- `jsonresume-theme-class` — Modern, self-contained
- `jsonresume-theme-stackoverflow` — Developer-focused

## npm Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build site and generate resume files |
| `npm run preview` | Preview production build |
| `npm run build:resume` | Generate PDF and DOCX resume files |
| `npm run build:resume:pdf` | Generate PDF only |
| `npm run build:resume:docx` | Generate DOCX only |

## Technologies

- [Vite](https://vitejs.dev/) — Build tool and dev server
- [resumed](https://github.com/rbardini/resumed) — JSON Resume CLI for PDF generation
- [docx](https://docx.js.org/) — DOCX document generation
- [Puppeteer](https://pptr.dev/) — Headless Chrome for PDF rendering

## License

Feel free to clone and reuse this project for your own resume site.

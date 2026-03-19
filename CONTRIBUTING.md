# Contributing to CCCSS-SUK-Dashboard

Thank you for your interest in contributing to the Centre for Climate Change and Sustainability Studies Geographic Information Systems dashboard! Research assistants, visiting faculty, and open-source contributors are welcome to enhance the functionality of this static portal.

## How to Contribute
1. **Fork the Repository**: Always fork the repository into your own workspace before pushing changes.
2. **Branch Naming Conventions**: For features: `feature/your-feature-name`. For bugfixes: `fix/the-bug-issue`.
3. **Draft a Pull Request**: Submit an issue prior to writing massive PRs so core maintainers can approve your approach.

## Structure & Architecture
- This is a static HTML/CSS/JS web portal. **Do not introduce heavy backend dependencies (e.g., Express servers) without widespread approval.**
- All styles must be placed in `public/css/style.css` and use existing CSS custom properties (variables) for color palettes to ensure perfect UI matching.
- Any JavaScript plugins should be vanilla and injected cleanly via centralized files (e.g. `public/js/map.js` or `public/js/security.js`). Avoid inline JavaScript tags inside the HTML components.

## Development Setup
No `node_modules` or build chains are required. Run any standard HTTP server targeting the root `public` directory (or simply the root repo directory).
```bash
python -m http.server 8000
```
Then navigate to `localhost:8000/index.html`.

## Integrating Project Dashboards (ArcGIS / Python)
You'll likely be updating the `projects.html` sidebar buttons to point to new research visualizations.
1. Find `<button class="p-btn" ...>` inside `<div class="projects-sidebar">`.
2. Add your new mapping project.
3. Update its inline `data-url` attribute to match the hosted viewer link of your app (ArcGIS Online).

## Security & Intellectual Property
- **Never remove** the `<script src="js/security.js"></script>` import from any page header.
- **Never modify** the terms of use watermarking scripts.
- **Do not commit actual datasets (e.g., massive GeoJSON / shapefiles / TIFs) directly into the repository**; always host them externally and use MapLibre APIs to fetch them.

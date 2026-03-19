# Changelog
All notable changes to the **CCCSS-SUK-Dashboard** project will be documented in this file.

## [2.1.0] - March 2026
### Added
- Created `projects.html` for direct, secure ArcGIS / Python mapping application `<iframe>` integrations.
- Integrated **MapLibre GL JS NavigationControl and FullscreenControl** into the Interactive Map (`map-viewer.html`).
- Added a centralized `CONTRIBUTING.md` and `README.md` to enhance the repository structure and workflow.
- Established a **Collaborations Grid** in `institution.html` accurately highlighting 10 international/national hierarchy leaders within academia.

### Changed
- Complete platform redesign removing emojis and implementing a professional, academic SVG-based UI design aesthetic.
- Enhanced CSS architecture with clean grid layouts, drop-shadow depth layering, and robust responsiveness on all screens.
- Re-structured `research.html` integrating highly descriptive thrust areas, detailed climate change modeling scenarios, and correct peer-reviewed DOIs.
- Updated Seminars timeline directly replacing placeholders with actual CCCSS key talk engagements.
- Refactored `server.js` or static configuration dependencies resolving security vulnerabilities (specifically clearing Node.js v24 warnings).

### Removed
- Removed the former `published-maps.html` in favor of dynamic `projects.html`.
- Extracted cluttered Javascript from index files into functional blocks (`/public/js/`).

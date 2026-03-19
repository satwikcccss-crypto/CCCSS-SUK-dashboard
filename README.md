# CCCSS SUK GIS Dashboard

Welcome to the **Centre for Climate Change and Sustainability Studies (CCCSS)** GIS Dashboard repository for Shivaji University, Kolhapur. This project acts as a centralized spatial portal for researchers to view live project tracking, atmospheric/climatological data indicators, interactive geo-hazard overlays, and embedded operational ArcGIS/Python dashboards.

## Features
- **Multi-Page Static Navigation**: Clean, modular HTML/CSS/JS architecture for seamless performance.
- **Professional Academic UI**: Minimalist, modern user interface highlighting key institutional facts, research publications, and an integrated faculty hierarchy matrix.
- **Advanced Map Viewer (`map-viewer.html`)**: Interactive MapLibre GL JS integration supporting zoom/pan controls, basemap toggles, interactive district profiling, and Open Source WMS layers.
- **Dedicated Project iframe Integrations (`projects.html`)**: Native embedding for ArcGIS Online Dashboards, Java Viewers, and Python spatial applications directly into the platform without redirecting users.
- **Climate Data Section (`data.html`)**: Dynamic Chart.js visualizations tracking anomalies in rainfall, temperature, and overall district flood vulnerability.
- **Live System Prototyping (`panchganga.html`)**: Outlines the live architecture for the Panchganga Basin real-time flood alerting system utilizing IoT sensors.

## Tech Stack
- **Frontend Core**: Vanilla HTML5, CSS3, JavaScript (ES6)
- **Mapping Engine**: MapLibre GL JS
- **Data Visualization**: Chart.js
- **Basemaps**: Carto, Google Hybrid, ESRI Satellite

## Running the Dashboard Locally
Because this project utilizes a purely static build structure without backend dependencies, it is incredibly easy to host or view:
1. Clone the repository: `git clone https://github.com/satwikcccss-crypto/CCCSS-SUK-dashboard.git`
2. Use a local development server (e.g., Live Server for VS Code, or Python's `python -m http.server 8000`) within the root directory.
3. Open `index.html` in your browser.

## Customizing Project Dashboards
To load your custom external maps into the viewer:
1. Open `public/projects.html`
2. Locate the project buttons (`<button class="p-btn" ... data-url="about:blank">`)
3. Replace the `data-url` attribute with the live URL of your ArcGIS, Python, or Java web application.

## Security & IP Protection
The repository employs a customized `js/security.js` module that handles global watermark injection, simulated session ID tracking, right-click disabling, and custom terms-of-use modals designed to secure the intellectual property of CCCSS data streams.

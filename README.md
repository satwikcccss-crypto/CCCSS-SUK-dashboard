# 🌍 CCCSS-SUK GIS Dashboard 

[![Netlify Status](https://api.netlify.com/api/v1/badges/62fc1483-4600-47d3-bdad-56cd0b6fbf29/deploy-status)](https://app.netlify.com/sites/extraordinary-fudge-d1ff63/deploys)
![GitHub last commit](https://img.shields.io/github/last-commit/satwikcccss-crypto/CCCSS-SUK-dashboard)
![License](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-green.svg)
![Backend](https://img.shields.io/badge/Tech-Node.js%20|%20Express-green)
![Frontend](https://img.shields.io/badge/Tech-HTML5%20|%20CSS3%20|%20JS%20(ES6)-blue)

An institutional-grade geospatial surveillance and climate research portal developed for the **Centre for Climate Change and Sustainability Studies (CCCSS)** at Shivaji University, Kolhapur.

## 🚀 Overview
This dashboard serves as a centralized hub for monitoring climate indicators, flood risks, and institutional research projects. It combines high-performance mapping engines with real-time data visualization to assist researchers and policymakers in the southwestern Maharashtra region.

## ✨ Key Features
- **Integrated IoT Ecosystem**: Securely embeds live monitoring systems for Flood and Rainfall analytics directly within the command center.
- **Panchganga Floodwatch**: Dedicated monitoring system for the Panchganga river basin utilizing IoT telemetry and real-time hydrographs.
- **Panchganga Rainwatch**: Comprehensive precipitation telemetry network providing real-time catchment-wide rainfall intensity analytics.
- **Interactive Map Engine**: Detailed regional mapping with district-level drill-downs and multi-layer support (Rainfall, Landslides, Infrastructure).
- **Hardened Security**: Built-in protection including CSP-locked iframes, custom watermarking, session tracking, and rate-limiting.

## 🛠 Tech Stack
- **Backend**: Node.js & Express with Helmet/CSP for secure project embedding.
- **Frontend**: Vanilla HTML5, Modern CSS3 (Grid/Flexbox/Variables), JavaScript (ES6+).
- **Maps**: MapLibre GL JS with custom ESRI/Google/Carto basemap integration.
- **Data Source**: Real-time integration with ThingSpeak API and regional IoT sensor grids.

## ⚙️ Development
1. **Clone the Repo**: 
   ```bash
   git clone https://github.com/satwikcccss-crypto/CCCSS-SUK-dashboard.git
   ```
2. **Setup Dependencies**:
   ```bash
   npm install
   ```
3. **Run Server**:
   ```bash
   npm start
   ```
4. **Configuration**: Edit `public/js/map.js` for GIS endpoints and `public/projects.html` for dashboard integrations.

## 🏛 Institutional Attribution
This project is an official digital asset of the **Centre for Climate Change & Sustainability Studies (CCCSS), Shivaji University, Kolhapur**. 

## 👨‍💻 Developer Credits
**Developed & Designed by:**
**Satwik L.K. Udupi**
*B.Tech in Agricultural Engineering*
*Junior Research Fellow (JRF)*
*CCCSS, Shivaji University, Kolhapur (2026 Batch)*

---
© 2021-2026 Centre for Climate Change & Sustainability Studies. All Rights Reserved.
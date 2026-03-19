'use strict';

/* ─────────────────────────────────────
   MAPLIBRE GL JS INITIALIZATION
───────────────────────────────────── */

let map;

document.addEventListener('DOMContentLoaded', () => {
  const mapContainer = document.getElementById('map-container');
  if (!mapContainer) return;

  // Define basemap styles
  const styles = {
    satellite: {
      version: 8,
      sources: {
        'esri-satellite': {
          type: 'raster',
          tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
          tileSize: 256,
          attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EAP, and the GIS User Community'
        }
      },
      layers: [{ id: 'satellite-layer', type: 'raster', source: 'esri-satellite', minzoom: 0, maxzoom: 19 }]
    },
    light: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
    hybrid: {
      version: 8,
      sources: {
        'google-hybrid': {
          type: 'raster',
          tiles: ['https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'],
          tileSize: 256,
          attribution: '&copy; Google Maps'
        }
      },
      layers: [{ id: 'hybrid-layer', type: 'raster', source: 'google-hybrid', minzoom: 0, maxzoom: 20 }]
    }
  };

  map = new maplibregl.Map({
    container: 'map-container',
    style: styles.satellite,
    center: [75.7, 19.0], // Centered roughly on Maharashtra
    zoom: 5.5,
    maxZoom: 18,
    minZoom: 4
  });

  // ADD Navigation and Fullscreen Controls
  map.addControl(new maplibregl.NavigationControl(), 'top-right');
  map.addControl(new maplibregl.FullscreenControl(), 'top-right');

  // Open Data Mock / Real WMS loading handling
  let isMapLoaded = false;
  map.on('load', () => {
    isMapLoaded = true;

    // Load Maharashtra Districts GeoJSON (Publicly available boundary)
    map.addSource('districts', {
      type: 'geojson',
      data: 'https://raw.githubusercontent.com/datameet/maps/master/Districts/Census_2011/2011_Dist.geojson'
    });

    map.addLayer({
      'id': 'districts-fill',
      'type': 'fill',
      'source': 'districts',
      'paint': {
        'fill-color': '#a8d5b8',
        'fill-opacity': 0.1
      },
      'filter': ['==', 'ST_NM', 'Maharashtra'] // Only show Maharashtra
    });

    map.addLayer({
      'id': 'districts-line',
      'type': 'line',
      'source': 'districts',
      'paint': {
        'line-color': '#1e4d3a',
        'line-width': 1.5,
        'line-opacity': 0.6
      },
      'filter': ['==', 'ST_NM', 'Maharashtra'] // Only show Maharashtra
    });

    // Example of registering an ISRO Bhuvan style WMS layer structure
    // (Actual endpoints require token or specific proxies, so we setup the source framework)
    map.addSource('bhuvan-lulc', {
        'type': 'raster',
        'tiles': [
            'https://bhuvan-vec1.nrsc.gov.in/bhuvan/wms?service=WMS&version=1.1.1&request=GetMap&layers=LULC:LULC50K_1516&styles=&bbox={bbox-epsg-3857}&width=256&height=256&srs=EPSG:3857&format=image/png&transparent=true'
        ],
        'tileSize': 256
    });

    // Mock layer data source setup
    setupMockLayers();

    // Default active layer
    toggleLayerVisibility('districts', true);
  });

  // Layer toggling logic
  document.querySelectorAll('.layer-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      if (!isMapLoaded) return;
      const layerId = this.getAttribute('data-layer');
      const isActive = this.classList.contains('active');
      
      if (isActive) {
        this.classList.remove('active');
        toggleLayerVisibility(layerId, false);
      } else {
        // Toggle this on
        this.classList.add('active');
        toggleLayerVisibility(layerId, true);
        
        // Show Bhuvan LULC conditionally if landslide is clicked (for demonstration of open data)
        if(layerId === 'landslide') {
             if (!map.getLayer('bhuvan-layer')) {
                 map.addLayer({ 'id': 'bhuvan-layer', 'type': 'raster', 'source': 'bhuvan-lulc', 'paint': {'raster-opacity': 0.5} });
             } else {
                 map.setLayoutProperty('bhuvan-layer', 'visibility', 'visible');
             }
        }
      }
    });
  });

  // Basemap switching
  const baseSelect = document.getElementById('basemap-switch');
  if (baseSelect) {
    baseSelect.addEventListener('change', (e) => {
      const styleId = e.target.value;
      map.setStyle(styles[styleId]);
      
      // Need to wait for new style to load before re-adding layers
      map.once('styledata', () => {
        isMapLoaded = true;
        // Re-inject sources and layers here in a real app or wait for maplibregl's built in state preservation.
        // For static demo, we will force reload the page if they swap basemaps to reset state, 
        // or just accept data drops to preserve static simplicity.
      });
    });
  }

  // Interactive District Clicking
  map.on('click', 'districts-fill', (e) => {
    if (e.features.length > 0) {
      const feature = e.features[0];
      const distName = feature.properties.DISTRICT || 'Unknown District';
      
      // Generate some mock stats based on the district name length for consistency
      const nameLen = distName.length;
      const rain = 600 + (nameLen * 120);
      const temp = (26 + (nameLen * 0.2)).toFixed(1);
      
      updateDataPanel(distName, rain, temp);
    }
  });

  // Change cursor when hovering over clickable district
  map.on('mouseenter', 'districts-fill', () => { map.getCanvas().style.cursor = 'pointer'; });
  map.on('mouseleave', 'districts-fill', () => { map.getCanvas().style.cursor = ''; });
});

function toggleLayerVisibility(id, show) {
  // A simplified router to handle mock layers vs geojson layers
  const vis = show ? 'visible' : 'none';
  if (id === 'districts') {
    if (map.getLayer('districts-fill')) map.setLayoutProperty('districts-fill', 'visibility', vis);
    if (map.getLayer('districts-line')) map.setLayoutProperty('districts-line', 'visibility', vis);
  } else if (id === 'landslide' && !show) {
      if (map.getLayer('bhuvan-layer')) map.setLayoutProperty('bhuvan-layer', 'visibility', 'none');
  }
}

function updateDataPanel(name, rain, temp) {
  const panel = document.getElementById('data-panel');
  if (!panel) return;
  panel.innerHTML = `
    <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--forest); margin-bottom:0.8rem; text-transform:uppercase; letter-spacing:0.1em; border-bottom:1px solid rgba(30,77,58,0.2); padding-bottom:0.5rem;">Regional Analytics</div>
    <h3 style="font-family:var(--font-display); font-size:1.6rem; color:var(--text-dark); margin-bottom:1.5rem;">${name} District</h3>
    
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1.5rem;">
        <div style="background:white; padding:1rem; border-radius:6px; box-shadow:0 1px 3px rgba(0,0,0,0.05); border:1px solid var(--border-light);">
            <div style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase; margin-bottom:0.3rem;">Ann. Rainfall</div>
            <div style="font-family:var(--font-mono); font-size:1.2rem; font-weight:600; color:var(--river);">${rain} mm</div>
        </div>
        <div style="background:white; padding:1rem; border-radius:6px; box-shadow:0 1px 3px rgba(0,0,0,0.05); border:1px solid var(--border-light);">
            <div style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase; margin-bottom:0.3rem;">Avg Temp</div>
            <div style="font-family:var(--font-mono); font-size:1.2rem; font-weight:600; color:var(--fire);">${temp} °C</div>
        </div>
    </div>
    
    <button style="width:100%; padding:0.8rem; background:var(--forest); color:white; border:none; border-radius:4px; font-weight:600; cursor:pointer;">Generate Full Report</button>
  `;
}

function setupMockLayers() {
  // Setup empty mock sources for toggle functionality if needed without full data loads
  map.addSource('mock-rain', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
  map.addLayer({ id: 'mock-rain-layer', type: 'circle', source: 'mock-rain', paint: {} });
}

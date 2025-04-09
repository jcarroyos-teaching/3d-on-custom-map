// Definir la función como una función global
async function loadGeoJsonLayer(map, url) {
  try {
    const response = await fetch(url);
    const geoJsonData = await response.json();

    // Loguear los datos del objeto GeoJSON
    console.log("GeoJSON Data:", geoJsonData);

    // Loguear un valor específico
    console.log("Dato", geoJsonData.features[1].properties);

    map.addSource('geojson-layer', {
      type: 'geojson',
      data: geoJsonData
    });

    map.addLayer({
      id: 'geojson-layer',
      type: 'fill',
      source: 'geojson-layer',
      paint: {
        'fill-color': '#FF00F0',    
        'fill-opacity': 0.5,
      }
    });

    map.addLayer({
      id: 'geojson-layer-outline',
      type: 'line',
      source: 'geojson-layer',
      paint: {
        'line-color': '#000000',
        'line-width': 1
      }
    });

    console.log("GeoJSON layer loaded successfully.");
  } catch (error) {
    console.error("Error loading GeoJSON layer:", error);
  }
}

// Hacer disponible la función globalmente
window.loadGeoJsonLayer = loadGeoJsonLayer;

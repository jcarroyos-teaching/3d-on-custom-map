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

    // Capa de relleno para polígonos
    map.addLayer({
      id: 'geojson-layer',
      type: 'fill',
      source: 'geojson-layer',
      filter: ['==', '$type', 'Polygon'],
      paint: {
        'fill-color': '#FF00F0',    
        'fill-opacity': 0.5,
      }
    });

    // Capa de contorno para polígonos
    map.addLayer({
      id: 'geojson-layer-outline',
      type: 'line',
      source: 'geojson-layer',
      filter: ['==', '$type', 'Polygon'],
      paint: {
        'line-color': '#000000',
        'line-width': 1
      }
    });
    
    // Capa de relleno para puntos (círculos)
    map.addLayer({
      id: 'geojson-point-fill',
      type: 'circle',
      source: 'geojson-layer',
      filter: ['==', '$type', 'Point'],
      paint: {
        'circle-color': '#FF00F0',
        'circle-opacity': 0.5,
        'circle-radius': 6
      }
    });
    
    // Capa de contorno para puntos (círculos)
    map.addLayer({
      id: 'geojson-point-outline',
      type: 'circle',
      source: 'geojson-layer',
      filter: ['==', '$type', 'Point'],
      paint: {
        'circle-stroke-color': '#000000',
        'circle-stroke-width': 1,
        'circle-radius': 6
      }
    });

    console.log("GeoJSON layer loaded successfully.");
  } catch (error) {
    console.error("Error loading GeoJSON layer:", error);
  }
}

// Hacer disponible la función globalmente
window.loadGeoJsonLayer = loadGeoJsonLayer;

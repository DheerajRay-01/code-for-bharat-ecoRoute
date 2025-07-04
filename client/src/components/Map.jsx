import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function Map({ latlngs }) {
  const mapContainerRef = useRef(null);     // HTML div ref
  const mapInstanceRef = useRef(null);      // Leaflet map ref
  const polylineRef = useRef(null);         // Polyline ref

  useEffect(() => {
    if (!latlngs || !Array.isArray(latlngs) || latlngs.length === 0) return;

    // 🗺️ Initialize map only once
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView(latlngs[0], 13);
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '',
      }).addTo(map);
    }

    const map = mapInstanceRef.current;

    // 🔄 Remove old polyline if it exists
    if (polylineRef.current) {
      map.removeLayer(polylineRef.current);
    }

    // ➕ Add new polyline
    const newPolyline = L.polyline(latlngs, { color: 'blue', weight: 4 }).addTo(map);
    polylineRef.current = newPolyline;

    map.fitBounds(newPolyline.getBounds());

  }, [latlngs]);

  return (
  <div className="w-full h-[300px] max-w-md md:w-[450px] aspect-square rounded-xl overflow-hidden shadow-md border border-gray-300">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>  
  
  );
}

export default Map;

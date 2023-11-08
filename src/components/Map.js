import { useRef, useState, useEffect } from "react";
import { initMap } from "../utils/google-maps";

let map;

const Map = () => {
  const [mapState, setMapState] = useState({
    markers: [],
    labelNumber: 1,
  });
  const mapRef = useRef(null);

  /**
   * @param {google.maps.MapMouseEvent} event
   * @param {string} label
   * @returns {google.maps.Marker}
   */
  const createMarker = (event, label) => {
    return new window.google.maps.Marker({
      position: event.latLng,
      label,
      map,
    })
  };

  /**
   * @param {google.maps.MapMouseEvent} event
   * @returns {google.maps.Marker}
   */
  const addMarker = (event) => {
    setMapState((curr) => ({
      ...curr,
      markers: [...curr.markers, createMarker(event, `Quest ${curr.labelNumber}`)],
      labelNumber: curr.labelNumber + 1,
    }));
  };

  useEffect(() => {
    if (!map) {
      (async () => {
        map = await initMap(mapRef.current);
        map.addListener("click", addMarker);
      })();
    }

    return () => {
      map = null;
    };
  }, []);

  return <div ref={mapRef} id="map" style={{ height: "100vh" }} />;
}

export default Map;

import { useRef, useState } from "react";
import { initMap } from "../utils/google-maps";
import { useEffect } from "react";

let map;

const Map = () => {
  const [mapState, setMapState] = useState({
    markers: [],
    labelNumber: 1,
  });
  const mapRef = useRef(null);

  /**
   * @param {google.maps.MapMouseEvent} event
   * @returns {google.maps.Marker}
   */
  const addMarker = (event) => {
    setMapState((curr) => ({
      ...curr,
      markers: [...curr.markers, new window.google.maps.Marker({
        position: event.latLng,
        label: `Quest ${curr.labelNumber}`,
        map,
      })],
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

import { useRef, useState, useEffect } from "react";
import { initMap } from "../utils/google-maps";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

let map;

/**
 * @returns {JSX.Element}
 */

const Map = () => {
  /**
   * @type {[{ markers: google.maps.Marker[], labelNumber: number }, React.Dispatch<React.SetStateAction<{ markers: google.maps.Marker[], labelNumber: number }>>]}
   */
  const [mapState, setMapState] = useState({
    markers: [],
    labelNumber: 1,
  });

  /**
   * @type {React.MutableRefObject<HTMLDivElement>}
   */
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
  const addMarker = async (event) => {
    setMapState((curr) => ({
      ...curr,
      markers: [...curr.markers, createMarker(event, `Quest ${curr.labelNumber}`)],
      labelNumber: curr.labelNumber + 1,
    }));

    await addDoc(collection(db, "map-markers"), {
      Quest: {
        Location: `${event.latLng.lat()}, ${event.latLng.lng()}`,
        Timestamp: new Date()
      }
    });
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

/**
 * @param {HTMLElement} element
 * @returns {Promise<google.maps.Map>}
 */
export const initMap = async (element) => {
  const { Map } = await window.google.maps.importLibrary("maps");

  return new Map(element, {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

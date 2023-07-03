import { setMap, setPage, setZoom } from "src/store/reducers/registerReport";

export const isWithinSAfrica = (latitude,longitude)=>{
    // Create a polygon representing the boundaries of South Africa
  const isWithinSouthAfrica=(latitude >= -34.8333 && latitude <= -22.1263 && longitude >= 16.4475 && longitude <= 32.8917);

  if (isWithinSouthAfrica) {
    return {latitude,longitude};
  } else {
    //return coords of JohannesBerg
    return {latitude:-26.195246,longitude:28.034088};
  }
}

export const getLocationCoords = async () => {
  if (navigator.geolocation) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      
      return isWithinSAfrica(latitude, longitude);
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  } else {
    console.error("GeoLocation not supported by your browser.");
    return null;
  }
};

export const loadGoogleMaps = (dispatch,lng,lat,zoom=12) => {
  const SatelliteTransition=15;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    window.initMap = async() => {
    const {latitude,longitude} = (lng===null||lat===null)?await getLocationCoords():{latitude:lat,longitude:lng};
     
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: latitude, lng: longitude },
        zoom,
        mapTypeId:zoom>SatelliteTransition?"satellite":"roadmap"
      });
      const mapDiv=document.getElementById('map');
      mapDiv.map=map;
      new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude }, // Latitude and longitude of the marker
        map:map,
        title: "Crime Location Marker", // Optional title for the marker
      });
      map.addListener("zoom_changed", () => {
        const zoomLevel = map.getZoom();
        dispatch(setZoom(zoomLevel));
        map.setMapTypeId(zoomLevel>SatelliteTransition?"satellite":"roadmap");
      });
      if(lng===null||lat===null){
        dispatch(setPage({latitude,longitude}))
      }
    };
  };
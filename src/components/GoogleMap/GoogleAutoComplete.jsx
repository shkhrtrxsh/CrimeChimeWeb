import React, { useState } from 'react';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import { setPage } from 'src/store/reducers/registerReport';
import { useDispatch } from 'react-redux';

const GoogleAutoComplete = ({style}) => {
  const dispatch = useDispatch();

  const handlePlaceSelected = (place) => {
    const {lat,lng}=place.geometry.location;
    const {formatted_address:location,place_id:google_place_id} = place;
    const latitude=lat();
    const longitude=lng();
    dispatch(setPage({latitude,longitude,location,google_place_id}));
    document.webkitExitFullscreen();
  };
  return(
    <ReactGoogleAutocomplete
      apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
      options={{
        bounds: new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(-26.2751, 27.9639),
          new window.google.maps.LatLng(-26.0313, 28.2336)
        ),
        types: ['geocode','establishment'],
      }}
      style={{height:"50px",padding:"10px",borderRadius:10,width:250,...style}}
      onPlaceSelected={handlePlaceSelected}
/>
  )
};

export default GoogleAutoComplete;

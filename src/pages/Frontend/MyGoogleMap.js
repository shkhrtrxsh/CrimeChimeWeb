import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import AutoComplete from './AutoComplate';

const containerStyle = {
  width: '100%',
  height: '80vh'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const MyGoogleMap = () => {

  const [position, setPosition] = useState({
    latitude : 0,
    longitude : 0
  })
  const [oldPosition, setOldPosition] = useState({
    latitude : 0,
    longitude : 0
  })

  function showPosition(position) {
    //  return position.coords.latitude + position.coords.longitude;
     setPosition({
      lat : position.coords.latitude,
      lng : position.coords.longitude
     })
  }

  navigator.geolocation.getCurrentPosition(showPosition)
  

  // console.log(position)
   useEffect(() => {
    if(oldPosition.latitude !== position.latitude && oldPosition.longitude !== position.longitude){      
      setOldPosition(position)
      console.log(position)
    }
    // dispatch(googleMapSearchLocation({}))
    
   }, [position])

    return (
      <AutoComplete />
      // <LoadScript
      //   googleMapsApiKey="AIzaSyApoj80RTzWkAIc_eswUmPogeoufErlNaw"
      // >
      //   <GoogleMap
      //     mapContainerStyle={containerStyle}
      //     center={position}
      //     zoom={10}
      //   >

      //     <Marker 
      //       position={position}
      //     />
      //   </GoogleMap>
      // </LoadScript>
    )
}

export default MyGoogleMap;
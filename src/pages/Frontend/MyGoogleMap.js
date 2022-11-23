import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function MyGoogleMap(){
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };
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
        latitude : position.coords.latitude,
        longitude : position.coords.longitude
     })
  }

  navigator.geolocation.getCurrentPosition(showPosition)

  // console.log(position)
  //  useEffect(() => {

    
    
  //   if(oldPosition.latitude !== position.latitude && oldPosition.longitude !== position.longitude){
  //     setOldPosition(position)
  //     console.log(position)
  //   }

  //  }, [position])

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyApoj80RTzWkAIc_eswUmPogeoufErlNaw" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={position.latitude}
          lng={position.longitude}
          text="My Marker is the best"
        />
        <AnyReactComponent
          lat={59.255413}
          lng={25.337844}
          text="My Marker is the best"
        />
      </GoogleMapReact>
    </div>
  );
}
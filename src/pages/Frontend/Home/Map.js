import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { DRAWER_WIDTH, APPBAR_MOBILE, APPBAR_DESKTOP} from 'src/constants/theme'
import { styled, useTheme, theme } from '@mui/material/styles';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import OrangeMapMarker from 'src/assets/svg/map-marker-orange.svg'
import RedMapMarker from 'src/assets/svg/map-marker-red.svg'
import YellowMapMarker from 'src/assets/svg/map-marker-yellow.svg'

import { googleMapSearchLocation } from 'src/store/api/search';
import { useSelector, useDispatch } from 'react-redux';


const LocationMarker = ({ svg }) => <img style={{height:'60px'}} src={svg} />;

const BoxButtonStyle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: '15px',
  top: APPBAR_DESKTOP + 15 + 'px',
  '& .MuiButtonBase-root.MuiFab-root':{
    marginRight: '10px'
  }
}));

const MapDivStyle = styled('div')(({ theme }) => ({
  height: `calc(100vh - ${APPBAR_DESKTOP}px)`, 
  width: '100%',
  '& .gm-control-active.gm-fullscreen-control':{
    display : 'none'
  } 
}));

export default function Map(){
  const dispatch = useDispatch();
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
   useEffect(() => {
    if(oldPosition.latitude !== position.latitude && oldPosition.longitude !== position.longitude){      
      setOldPosition(position)
      console.log(position)
    }

    dispatch(googleMapSearchLocation({}))
   }, [position])


  //  console.log(position)

  const defaultProps = {
    center: {
      lat: 22.733689,
      lng: 75.8396302
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <MapDivStyle>
      <BoxButtonStyle>
        <Fab 
          size="medium" 
          color="primary" 
          aria-label="add report" 
          to="/report/add"
          component={Link}
        >
          <AddIcon />
        </Fab>
        <Fab 
          size="medium" 
          color="primary" 
          aria-label="reported crimes"
        >
          <VisibilityIcon />
        </Fab>          
      </BoxButtonStyle>

      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyApoj80RTzWkAIc_eswUmPogeoufErlNaw" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <LocationMarker
          lat={position.latitude}
          lng={position.longitude}
          svg={OrangeMapMarker}
        />
        {/* <AnyReactComponent
          lat={59.255413}
          lng={25.337844}
          text="My Marker is the best"
        /> */}
      </GoogleMapReact>
    </MapDivStyle>
  );
}
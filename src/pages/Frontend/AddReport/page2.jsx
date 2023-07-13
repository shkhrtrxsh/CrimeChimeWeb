import React, { useEffect, useMemo, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker, useLoadScript } from '@react-google-maps/api';
import { Container, FormControl, Grid, Box, Typography, Divider, LinearProgress, Autocomplete, TextField } from '@mui/material';
import NextButton from 'src/components/Button/NextButton';
import GoogleAutoComplete from 'src/components/GoogleMap/GoogleAutoComplete';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, setZoom } from 'src/store/reducers/registerReport';

import { SatelliteZoom } from 'src/constants/googleMap';
import { toast } from 'react-toastify';
import { isWithinSAfrica } from 'src/utils/googleMap';
const containerStyle = {
  width: '100%',
  height: '100%', // Adjust the height according to your needs
};
const libraries = ["places","geometry"];
const Page2 = ({setSelectActive}) => {
  const apiKey=process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  const data = useSelector(state=>state.reportRegister);
  const {zoom} = data;
  const {location:formattedAddress,latitude,longitude}=data.data;
  const dispatch = useDispatch();
  const map = useRef(null);
  const position = {
    lat: Number(latitude)||-26.2023, // Latitude of India
    lng: Number(longitude)||28.0436, // Longitude of India
  }

  const googleAutoComplete = (latitude, longitude, place_id, address, viewport) => {
    dispatch(setPage({
      latitude,
      longitude,
      location:address,
    }));
  };
  
  const markerDragEnd = async(e) => {
    if (e !== null) {
      //check if within S.Africa
      const [lat,lng] = [e.latLng.lat(), e.latLng.lng()];
      const [_,isSA] = await isWithinSAfrica(lat,lng);
      if(!isSA){
        toast.error("Crimes can be reported only within South Africa");
        dispatch(setPage({latitude,longitude}))
        return;
      }
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results[0]) {
          dispatch(setPage({location:results[0].formatted_address,longitude:lng,latitude: lat,google_place_id:results[0].place_id}));
        }
      });
    }
  };

  const handlePlaceSelect = (place) => {
    // Handle the selected place
  };

  const handleZoomChanged = () => {
    if(map.current)dispatch(setZoom(map.current.getZoom()))
  };
  const mapOptions={
    gestureHandling: "greedy",
    fullscreenControl:false,
    zoomControlOptions: {
      position: window.google.maps.ControlPosition.RIGHT_CENTER
    },
    streetViewControlOptions: {
      position: window.google.maps.ControlPosition.RIGHT_CENTER
    },
    mapTypeControlOptions: {
      position: window.google.maps.ControlPosition.RIGHT_BOTTOM
    },
    mapTypeId: (zoom<SatelliteZoom)?window.google.maps.MapTypeId.TERRAIN:window.google.maps.MapTypeId.SATELLITE      
  }
  return (
        <Box sx={{height:"100%",display:"flex",flexDirection:"column"}}>
          <Box sx={{flexGrow:1,position:'relative'}}>
            <Box id="kbd" sx={{position:"absolute",top:20,right:{sm:0,md:70},
            left:10,zIndex:1000}}>
              <GoogleAutoComplete style={{zIndex:1000}}/>
            </Box>
            <FormControl fullWidth sx={{ height:"100%" }}>
              <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={zoom}
              options={mapOptions}
              onLoad={Map => {
                map.current = Map; // Store the map instance in a global variable for access in the event handler
              }}
              onZoomChanged={handleZoomChanged}>
                <Marker position={position} draggable={true} onDragEnd={markerDragEnd} />
              </GoogleMap>
            </FormControl>
          </Box>
          <Box style={{ backgroundColor: '#ffe600', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', color: 'black', padding: '12px', marginLeft: 'auto', marginRight: 'auto',width:'100%' }}>
          <NextButton beforeNext={()=>setSelectActive(1)} textValue="GO BACK"/>
            <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
            <NextButton beforeNext={()=>setSelectActive(3)} textValue="CONFIRM PLACE"/>
          </Box>
        </Box>
     
  );
};
export default Page2;




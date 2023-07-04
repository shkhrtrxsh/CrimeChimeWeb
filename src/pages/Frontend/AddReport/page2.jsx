import React, { useEffect, useMemo, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker, useLoadScript } from '@react-google-maps/api';
import { Container, FormControl, Grid, Box, Typography, Divider, LinearProgress, Autocomplete, TextField } from '@mui/material';
import NextButton from 'src/components/Button/NextButton';
import GoogleAutoComplete from 'src/components/GoogleMap/GoogleAutoComplete';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, setZoom } from 'src/store/reducers/registerReport';
import usePlacesAutocomplete, { getGeocode, getLatLng,getPlacePredictions } from 'use-places-autocomplete';
import { SatelliteZoom } from 'src/constants/googleMap';
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
    lat: latitude||-26.2023, // Latitude of India
    lng: longitude||28.0436, // Longitude of India
  }

  const googleAutoComplete = (latitude, longitude, place_id, address, viewport) => {
    dispatch(setPage({
      latitude,
      longitude,
      location:address,
    }));
  };
  
  const markerDragEnd = (e) => {
    if (e !== null) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat: e.latLng.lat(), lng: e.latLng.lng() } }, (results, status) => {
        if (status === 'OK' && results[0]) {
          dispatch(setPage({location:results[0].formatted_address,longitude:e.latLng.lng(),latitude: e.latLng.lat(),google_place_id:results[0].place_id}));
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

  return (
        <Box sx={{height:"100%",display:"flex",flexDirection:"column"}}>
          <Box sx={{flexGrow:1,position:'relative'}}>
            <Box id="kbd" sx={{position:"absolute",top:20,right:70,zIndex:1000}}>
              <GoogleAutoComplete style={{zIndex:1000}}/>
            </Box>
            <FormControl fullWidth sx={{ height:"100%" }}>
              <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={zoom}
              options={{
                mapTypeId: (zoom<SatelliteZoom)?window.google.maps.MapTypeId.ROADMAP:window.google.maps.MapTypeId.SATELLITE
              }}
              onLoad={Map => {
                map.current = Map; // Store the map instance in a global variable for access in the event handler
              }}
              onZoomChanged={handleZoomChanged}>
                <Marker position={position} draggable={true} onDragEnd={markerDragEnd} />
              </GoogleMap>
            </FormControl>
          </Box>
          <Box style={{ backgroundColor: '#FCD34D', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', color: 'black', padding: '12px', marginLeft: 'auto', marginRight: 'auto',width:'100%' }}>
          <NextButton beforeNext={()=>setSelectActive(1)} textValue="GO BACK"/>
            <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
            <NextButton beforeNext={()=>setSelectActive(3)} textValue="CONFIRM PLACE"/>
          </Box>
        </Box>
     
  );
};
export default Page2;




import React, { useEffect, useRef, useState } from 'react'
import {  useLocation } from 'react-router-dom'
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { getLocationCoords, loadGoogleMaps } from 'src/utils/googleMap';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, setZoom, } from 'src/store/reducers/registerReport';
import CancelIcon from '@mui/icons-material/Cancel';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import Duplicate from '../AddReport/duplicate';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GoogleAutoComplete from 'src/components/GoogleMap/GoogleAutoComplete';

const ViewCrime = () => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
    const register = useSelector(state=>state.reportRegister);
    const {data,zoom,lock,marker} = register;
    const {longitude,latitude,vehicle_theft} = data;
    const [cancel,setCancel] = useState(true);
    const [selectActive, setSelectActive] = useState(1);
    const dispatch = useDispatch();
    const location = useLocation();
    const pathname = location.pathname;
    const map = useRef(null)

    useEffect(()=>{
      (async()=>{
        const {latitude,longitude} = await getLocationCoords();
        setPage(latitude,longitude);
      })()
    },[])

    const position={
        lat:Number(latitude),
        lng:Number(longitude)
    }
      const handleZoomChanged = () => {
        if(map.current)dispatch(setZoom(map.current.getZoom()))
      };
    const onLoad = async(Map) => {

      map.current = Map; // Store the map instance in a global variable for access in the event handler
      if(!latitude||!longitude){
        const {latitude:lat,longitude:lng} = await getLocationCoords();
        dispatch(setPage({latitude:lat,longitude:lng}));
      }
      }
    const theme = useTheme();
    const isMdBreakpoint = useMediaQuery(theme.breakpoints.up('md'));

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
    return (
        <Box sx={{ height: '100%',maxHeight:"91.3vh", display: 'flex', flexDirection: isMdBreakpoint ? 'row' : 'column' }}>
            {isMdBreakpoint?null:
                <Box sx={{position:"fixed",bottom:0, width: '100%', height: "min-content",flexGrow:1,backgroundColor:"#ffe600",zIndex:100 }}>
                  <Box sx={{display:"flex",flexDirection:"row-reverse",my:2,userSelect:"none"}} onClick={()=>setCancel(!cancel)}>
                      {cancel?<CancelIcon sx={{ml:1,mr:3}}/>:<LocationOnIcon sx={{ml:1,mr:3}}/>}
                      <Typography>{cancel?"Close Map":"View Map"}</Typography>
                </Box>
                <GoogleMap center={position} zoom={zoom} 
                  mapContainerStyle={{width:"100%",height:(cancel?"60vh":"0vh")}}
                  onLoad={onLoad}
                  onZoomChanged={handleZoomChanged}>
                    <GoogleAutoComplete style={{position:"absolute",right:60,top:5,zIndex:1000}}/>
                    <Marker position={position} />
                    {(marker&&selectActive===3)&&<Marker position={marker}/>}
                  </GoogleMap>
            </Box>
            }

            <Box sx={{ width: {md:selectActive===3?'65%':'50%',xs:'100%'},display:'flex',flexDirection:'column',height:"100%",overflowY:"auto", }}>
                <Box sx={{display:"flex",alignItems:"center"}}>
                <Duplicate mapRef={map} viewCrime={true}/>
                </Box>
            </Box>
            <Box id="hello" sx={{ width: isMdBreakpoint ? '66.67%' : '100%', height: isMdBreakpoint ? '91vh' : '0vh' }}>
              <GoogleMap center={position} zoom={zoom} 
              mapContainerStyle={{width:"100%",height:"100%"}}
              onLoad={onLoad}
              onZoomChanged={handleZoomChanged}>
                <GoogleAutoComplete style={{position:"absolute",right:60,top:5,zIndex:1000}}/>
                <Marker position={position} draggable={true} onDragEnd={markerDragEnd}/>
                {(marker&&selectActive===3)&&<Marker position={marker}/>}
              </GoogleMap>
            </Box>
        </Box>
    );
}

export default ViewCrime;
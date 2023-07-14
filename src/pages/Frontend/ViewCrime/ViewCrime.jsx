import React, { useEffect, useRef, useState } from 'react'
import {  useLocation } from 'react-router-dom'
import { Box, Button, Drawer, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { getLocationCoords, loadGoogleMaps } from 'src/utils/googleMap';
import { useDispatch, useSelector } from 'react-redux';
import { setCrimeIndex, setPage, setZoom, } from 'src/store/reducers/registerReport';
import CancelIcon from '@mui/icons-material/Cancel';
import { GoogleMap, InfoBox, Marker, useLoadScript } from '@react-google-maps/api';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GoogleAutoComplete from 'src/components/GoogleMap/GoogleAutoComplete';
import { SatelliteZoom } from 'src/constants/googleMap';
import Image from '../../../assets/images/duplicate.png'
import SearchFilter from '../ViewReport/SearchFilter';
import CrimeDialog from "./CrimeDialog";
import { getNearbyCrimes } from 'src/store/api/registerReport';
const ViewCrime = () => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
    const register = useSelector(state=>state.reportRegister);
    const {data,zoom,lock,nearbyData,crimeIndex} = register;
    const {longitude,latitude,vehicle_theft} = data;
    const [cancel,setCancel] = useState(true);
    const [selectActive, setSelectActive] = useState(1);
    const dispatch = useDispatch();
    const location = useLocation();
    const pathname = location.pathname;
    const map = useRef(null);
  
    const markerOptions = {
      icon: {
        url: Image,
        scaledSize: new window.google.maps.Size(80, 80),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(25, 50)
      }
    };
    
    useEffect(()=>{
      if(!crimeIndex.viewCrime){
        dispatch(getNearbyCrimes({latitude,longitude,fromDate:new Date(Date.now()-365*24*3600*1000),toDate:new Date(Date.now())}));
      }
    },[])

    useEffect(()=>{
      if(!crimeIndex.viewCrime){
        (async()=>{
          const {latitude,longitude} = await getLocationCoords();
          dispatch(getNearbyCrimes({latitude,longitude,fromDate:new Date(Date.now()-365*24*3600*1000),toDate:new Date(Date.now())}));
          setPage(latitude,longitude);
        })()
      }
    },[])

    const position={
        lat:Number(latitude)+0.0008,
        lng:Number(longitude)+0.0008
    }
      const handleZoomChanged = () => {
        if(map.current)dispatch(setZoom(map.current.getZoom()))
      };
    const onLoad = async(Map) => {

      map.current = Map; // Store the map instance in a global variable for access in the event handler
        const {latitude:lat,longitude:lng} = await getLocationCoords();
        dispatch(setPage({latitude:lat,longitude:lng}));
      }
    const theme = useTheme();
    const isMdBreakpoint = useMediaQuery(theme.breakpoints.up('md'));

    const onMarkerClick = (ind)=>{
      dispatch(setCrimeIndex({index:ind,viewCrime:true}));
    }

    const markerDragEnd = (e) => {
      if (e !== null) {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat: e.latLng.lat(), lng: e.latLng.lng() } }, (results, status) => {
          if (status === 'OK' && results[0]) {
            dispatch(setPage({location:results[0].formatted_address,longitude:e.latLng.lng(),latitude: e.latLng.lat(),google_place_id:results[0].place_id}));
            dispatch(getNearbyCrimes({latitude:e.latLng.lat(),longitude:e.latLng.lng(),fromDate:null,toDate:null}));
          }
        });
      }
    };
    return (
        <Box sx={{ height: '100%',maxHeight:"91.3vh", display: 'flex', flexDirection: isMdBreakpoint ? 'row' : 'column' }}>
            <Drawer anchor="left" open={crimeIndex.viewCrime} onClose={()=>dispatch(setCrimeIndex({viewCrime:false}))}>
                <Box sx={{display:"flex",alignItems:"center",maxWidth:"500px"}}>
                  <CrimeDialog mapRef={map} index={crimeIndex.index} onClose={()=>dispatch(setCrimeIndex({viewCrime:false}))}/>
                </Box>
            </Drawer>
            <Box id="hello" sx={{ width: '100%', height: '100%' }}>
              <GoogleMap center={position} zoom={zoom} 
              mapContainerStyle={{width:"100%",height:"100%"}}
              options={{
                mapTypeId: (zoom<SatelliteZoom)?window.google.maps.MapTypeId.TERRAIN:window.google.maps.MapTypeId.SATELLITE,
                gestureHandling:"greedy",
                mapTypeControlOptions: {
                  position:isMdBreakpoint?window.google.maps.ControlPosition.LEFT_TOP:window.google.maps.ControlPosition.LEFT_BOTTOM
                }
              }}
              onLoad={onLoad}
              onZoomChanged={handleZoomChanged}>
                  {nearbyData.map(({latitude=null,longitude=null,user_count=0},ind)=>{
                    const position={
                      lat:Number(latitude),
                      lng:Number(longitude)
                    };
                    return(
                      <Marker key={ind} position={position} options={markerOptions}
                      onClick={()=>onMarkerClick(ind)} label={{text:`${user_count||1}`,fontWeight:"bold",className:"map-label",color:"red"}}
                      />
                      )
                    })}
                    <Marker id="mark" draggable={true} position={position} onDragEnd={markerDragEnd}/>
              </GoogleMap>
            </Box>
            
          <SearchFilter />           
        </Box>
    );
}

export default ViewCrime;
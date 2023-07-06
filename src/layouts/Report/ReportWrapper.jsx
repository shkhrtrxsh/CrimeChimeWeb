import React, { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import ProgressBar from './ProgressBar'
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { getLocationCoords, loadGoogleMaps } from 'src/utils/googleMap';
import { useDispatch, useSelector } from 'react-redux';
import { clearReport, setPage, setZoom, } from 'src/store/reducers/registerReport';
import Page1 from '../../pages/Frontend/AddReport/page1'
import Duplicate from '../../pages/Frontend/AddReport/duplicate'
import Page2 from '../../pages/Frontend/AddReport/page2'
import Page3 from '../../pages/Frontend/AddReport/page3'
import Page4 from '../../pages/Frontend/AddReport/page4'
import Page5 from '../../pages/Frontend/AddReport/page5'
import Page6 from '../../pages/Frontend/AddReport/page6'
import Page7 from '../../pages/Frontend/AddReport/page7'
import Page8 from '../../pages/Frontend/AddReport/page8'
import Page9 from '../../pages/Frontend/AddReport/page9'
import Page10 from '../../pages/Frontend/AddReport/page10'
import Page11 from '../../pages/Frontend/AddReport/page11'
import Page12 from '../../pages/Frontend/AddReport/page12'
import Page13 from '../../pages/Frontend/AddReport/page13'
import Page14 from '../../pages/Frontend/AddReport/page14'
import Page15 from '../../pages/Frontend/AddReport/page15'
import Page16, { SubmitDialog } from '../../pages/Frontend/AddReport/page16'
import CancelIcon from '@mui/icons-material/Cancel';
import PageSubmit from 'src/pages/Frontend/AddReport/pageSubmit';
import VerticalProgressBar from 'src/components/Progress/VerticalProgressBar';
import { objectToFormData } from 'src/utils/formatObject';
import API from 'src/config/api';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { SatelliteZoom } from 'src/constants/googleMap';
import Image from '../../assets/images/duplicate.png'
import axios from 'axios';
const ReportPageRouter = ({selectActive=1,setSelectActive,openState,mapRef})=>{
    const ReportPages=[
        <Page1/>,<Page2 setSelectActive={setSelectActive}/>,<Duplicate mapRef={mapRef} setSelectActive={setSelectActive}/>,<Page3/>,<Page4/>,<Page5/>,<Page6/>,<Page7/>,<Page8/>,<Page9/>,<Page10/>,<Page11/>,<Page12/>,<Page13/>,<Page14/>,<Page15/>,<Page16 setSelectActive={setSelectActive} openState={openState}/>
    ]
    return ReportPages[selectActive-1];
}

const ReportWrapper = () => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
    const register = useSelector(state=>state.reportRegister);
    const {data,zoom,lock,marker} = register;
    const {longitude,latitude,vehicle_theft} = data;
    const [cancel,setCancel] = useState(true);
    const [selectActive, setSelectActive] = useState(1);
    const openState = useState(false);
    const [open,setOpen] = useState(false);
    const [confirm,setConfirm] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const pathname = location.pathname;
    const map = useRef(null)

    useEffect(() => {
      dispatch(clearReport());
    }, [])
      const markerOptions = {
        icon: {
          url: Image,
          scaledSize: new window.google.maps.Size(50, 50),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(25, 50)
        }
      };
    const markerPosition={
      lat:Number(marker?.latitude),
      lng:Number(marker?.longitude),
    }
   
    
    const mapOptions = {
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_CENTER
      },
      streetViewControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_CENTER
      },
        mapTypeId: (zoom<SatelliteZoom)?window.google.maps.MapTypeId.TERRAIN:window.google.maps.MapTypeId.SATELLITE
    };

    const position={
        lat:Number(latitude),
        lng:Number(longitude)
    }

    const setActiveStep = (oldStep,newStep)=>{
        if(oldStep===9||oldStep===11){
            if(newStep===10&&vehicle_theft==="4"){
                setSelectActive(oldStep===9?11:9);
                return;
            }
        }
        setSelectActive(newStep);
    }
    const beforeNext = ()=>{
        setOpen(true);
      }

      const onClickEvent = async()=>{
        try {
          const fileURL = data.files;
          const response = await fetch(fileURL);
          if (response.ok) {
            const blob = await response.blob();
            const files = new File([blob], data.fileName);
            const formData = objectToFormData(data);
            formData.set("files", files);
            await API.post("/report",formData);
            setConfirm(true);
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        } catch (error) {
          console.error(error);
        }
      }
 
      const handleZoomChanged = () => {
        if(map.current)dispatch(setZoom(map.current.getZoom()))
      };
    const onLoad = async(Map) => {

      map.current = Map; // Store the map instance in a global variable for access in the event handler
      if(!latitude||!longitude){
        const {latitude:lat,longitude:lng} = await getLocationCoords();
        dispatch(setPage({latitude:lat,longitude:lng}));
        const marker = new window.google.maps.Marker({
          position: position,
          map: Map
        });
      }
        
      }
    const theme = useTheme();
    const isMdBreakpoint = useMediaQuery(theme.breakpoints.up('md'));

    if([2].includes(selectActive))return <ReportPageRouter selectActive={selectActive} setSelectActive={setSelectActive}/>

    function createMarker(position) {
      return new window.google.maps.Marker({
        position: position,
        map: map.current
      });
    }
  
    return (
        <Box sx={{ height: '100%',maxHeight:"91.3vh", display: 'flex', flexDirection: isMdBreakpoint ? 'row' : 'column' }}>
          {isMdBreakpoint||cancel ?null:
                  <Box sx={{position:'fixed',bottom:0, width: '100%', height: "45%",flexGrow:1,backgroundColor:"#ffe600",zIndex:100 }}>
                      <Box sx={{display:"flex",flexDirection:"row-reverse",my:0.5}} onClick={()=>setCancel(true)}>
                          <CancelIcon sx={{ml:1,mr:3}}/>
                          <Typography>Close</Typography>
                      </Box>
                      <GoogleMap center={position} zoom={zoom} 
                        mapContainerStyle={{width:"100%",height:"100%"}}
                        options={{
                          mapTypeId: (zoom<SatelliteZoom)?window.google.maps.MapTypeId.TERRAIN:window.google.maps.MapTypeId.SATELLITE
                        }}
                        onLoad={onLoad}
                        onZoomChanged={handleZoomChanged}>
                          <Marker position={position} />
                          {((marker?.latitude||marker?.longitude)&&selectActive===3)&&<Marker position={markerPosition} options={markerOptions}/>} 
                        </GoogleMap>
                  </Box>
              }
            <Box sx={{position:"fixed",bottom:0,height:"min-content",width:'100%',display:"flex",zIndex:500}}>
              <ProgressBar activeStep={selectActive} setActiveStep={setActiveStep} backLink={selectActive-1} nextLink="/report/page2" cancelState={[cancel,setCancel]} lock={lock} beforeNext={selectActive===17?beforeNext:null} submit={selectActive===17}/>
            </Box>
            <SubmitDialog open={open} handleClose={()=>setOpen(false)} confirm={confirm} onClickEvent={onClickEvent} />
            <Box sx={{height:"100%",position:"fixed",display:"flex",alignItems:"center",top:0}}>
                <VerticalProgressBar progress={selectActive} maxVal={17}/>
            </Box>
            <Box sx={{ width: {md:'50%',xs:'100%'},display:'flex',flexDirection:'column',height:"100%",overflowY:"auto", }}>
                <Box sx={{display:"flex",alignItems:"center",mb:10}}>
                    <ReportPageRouter selectActive={selectActive} setSelectActive={setSelectActive} mapRef={map}/>
                    {/* <Page9/> */}
                </Box>
            </Box>
            <Box id="hello" sx={{ width: isMdBreakpoint ? '66.67%' : '100%', height: isMdBreakpoint ? '91vh' : '0vh' }}>
              <GoogleMap center={position} zoom={zoom} options={mapOptions}
              mapContainerStyle={{width:"100%",height:"100%"}}
              onLoad={onLoad}
              onZoomChanged={handleZoomChanged}>
                <Marker position={position} draggable={false}/>
                {((marker?.latitude||marker?.longitude)&&selectActive===3)&&<Marker position={markerPosition} options={markerOptions} draggable={true}/>}
              </GoogleMap>
            </Box>
        </Box>
    );
}

export default ReportWrapper
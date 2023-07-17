import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
 
  Box,
  
  Button,
  
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import current from '../../../assets/images/current.png';
import duplicate from '../../../assets/images/duplicate.png';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useDispatch, useSelector } from 'react-redux';

import { loadGoogleMaps } from 'src/utils/googleMap';

import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { getNearbyCrimes } from 'src/store/api/registerReport';
import { fDateTimeSuffix } from 'src/utils/formatTime';
import { capitalize } from 'src/utils/string';
import { addMarkers, clearNearbyReports, setLock, setMarker, setPage } from 'src/store/reducers/registerReport';
import API from 'src/config/api';
import { crimeDetails } from 'src/utils/crimeDetails';

const vehicle_theft_choices = ["hijacking", "attempted hijacking", "vehicle theft", "attempted vehicle theft", "does not apply"];
const various_choices = ["crime occured at ATM", "drug-related crime", "gang-related crime", "Arson was involed", "Vandalism was involed", "social unrest"]

export const SuccessDialog = ({open,handleClose})=>{
  return(
    <Dialog
        open={open===1||open===2}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">
          {open===1?"Success":"Error"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {open===1?"Report Submitted Successfully":"Error Submitting the Report"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
  )
}

function CrimeDialog({mapRef,viewCrime=false,index=0,onClose}) {
  const dispatch = useDispatch();
  const {nearbyData:values=[],data:regData,lock,loading} = useSelector(state=>state.reportRegister);
  const {latitude:lat,longitude:long} = regData;
  const [open, setOpen] = useState(0)
  const {id,date_time,location,latitude,longitude,perpetrators,weapons,fully_auto_weapons,semi_auto_weapons,knife_weapons,other_weapons,rape,rape_people,murder,murder_people,assault,assault_people,vehicle_theft,vehicle_colour,vehicle_make,vehicle_model,vehicle_year,burglary,burglary_type,robbery,robbery_type,kidnapping,kidnapping_people,various,police_reporting,reported_to_police,police_case_num,report_images,description,user_count}=values[index]||{};
  const mediaData = (report_images&&report_images[0])?report_images[0].path:"No media available";

  useEffect(()=>{
    dispatch(setMarker({latitude,longitude}));
  },[latitude,longitude,index])

  useEffect(() => {
    if(mapRef.current){
      const mapElement = mapRef.current;
      mapElement.marker=null;
    }
  }, [lat,long,mapRef]);

  useEffect(() => {
    if(values[index]){  
      const interval = setInterval(() => {
        if(mapRef.current){
          const mapElement = mapRef.current;
          if (mapElement.map) {
            clearInterval(interval);
            if(latitude&&longitude){  
              const marker = new window.google.maps.Marker({
                position: { lng:Number(longitude),
                  lat:Number(latitude) },
                map: mapElement.map,
                title: "Crime Location Marker 2",
                icon:duplicate,
              });
              //if (mapElement.marker) mapElement.marker.setMap(null);
              mapElement.marker = marker;
            }
          }
        }
      }, 100);
    }
  }, [latitude, longitude,mapRef]);

  const data = values[index]&& crimeDetails(values,index,vehicle_theft_choices,various_choices,mediaData)


  const theme = useTheme();
  const isMdBreakpoint = useMediaQuery(theme.breakpoints.up('md'));

  function isImage(url) {
    const imageExtensions = ['.apng', '.bmp', '.gif', '.ico', '.cur', '.jpg', '.jpeg', '.jfif', '.pjpeg', '.pjp', '.png', '.svg', '.tif', '.tiff', '.webp'];
    const lowerCaseUrl = url.toLowerCase();
    return imageExtensions.some(extension => lowerCaseUrl.endsWith(extension));
  }
  
  function isVideo(url) {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.ogv', '.avi', '.mov', '.wmv', '.flv', '.mkv', '.m4v', '.3gp'];
    const lowerCaseUrl = url.toLowerCase();
    return videoExtensions.some(extension => lowerCaseUrl.endsWith(extension));
  }
  
  const clickYes = async()=>{
    dispatch(setLock(true));
    try {
      await API.post("report/checkReport",{
        report_id:id,
        latitude,
        longitude,
        date_time
      });
      setOpen(1);
    } catch (error) {
      console.error(error);
      setOpen(2);
    }
    dispatch(setLock(false));
  }

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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SuccessDialog open={open} handleClose = {()=>setOpen(0)}/>
        <Box sx={{mt:5,pl:2,h:"100%"}}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={10}>
              <Box sx={{display:"flex",width:"100%",justifyContent:"center", alignItems:'center'}}>
                <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', paddingBottom: '10px', fontSize: '24px' }}>
                  {"Crime Details"}
                </Typography>

              </Box>
            </Grid>
            
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                
              {(()=>{
                if(loading){
                  return (
                    <Box sx={{width:"100%",display:"flex",justifyContent:"center",mt:4}}>
                      <CircularProgress/>
                    </Box>
                  )
                }else{
                  return (
                  values[index]?
                  <Box>
                      <Box>
                      <TableContainer component={Paper}>
                        <Table>
                          <TableBody>
                            {data.map((row, index) => (
                              row.secondCol&&<TableRow key={index}>
                                <TableCell>{row.firstCol}</TableCell>
                                <TableCell>
                                  {row.firstCol === 'Media:' && mediaData ? (
                                    isImage(mediaData) ? (
                                      <img src={process.env.REACT_APP_API_URL+"/"+mediaData} alt="media" style={{ width: '100%', height: 'auto' }} />
                                    ) : isVideo(mediaData) ? (
                                      <video src={process.env.REACT_APP_API_URL+"/"+mediaData} controls style={{ width: '100%', height: 'auto' }} />
                                    ) : (
                                      'No media available'
                                    )
                                  ) : (
                                    row.secondCol
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                    <Box sx={{ paddingTop: '5px',mb:10 }}>
                  
                      <Box display="flex" justifyContent="center">
                        <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={onClose} disabled={lock}>
                          Close
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                  :
                  <Typography align="center">No crimes found!</Typography>
                  );
                }
              })()}
              
            </Box>
          </Grid>
        </Box>
    </LocalizationProvider>
  );
}

export default CrimeDialog;

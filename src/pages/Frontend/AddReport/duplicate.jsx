import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  useTheme,
  Box,
  
  Button,
  
  useMediaQuery,
  
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
import { getNearbyCrimes, getNearbyCrimes2 } from 'src/store/api/registerReport';
import { fDateTimeSuffix } from 'src/utils/formatTime';
import { capitalize } from 'src/utils/string';
import { addMarkers, clearNearbyReports, setLock, setMarker, setPage } from 'src/store/reducers/registerReport';
import API from 'src/config/api';
import { useNavigate } from 'react-router-dom';

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
            {open===1?"Thanks for confirming the crime. Crime has been recorded.":"Error Submitting the Report.Please Try Again."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
  )
}

function Duplicate({mapRef,viewCrime=false,setSelectActive}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {nearbyData:values=[],data:regData,lock,loading} = useSelector(state=>state.reportRegister);
  const {latitude:lat,longitude:long} = regData;
  const [index,setIndex] = useState(0);
  const [open, setOpen] = useState(0)
  const {id,date_time,location,latitude,longitude,perpetrators,weapons,fully_auto_weapons,semi_auto_weapons,knife_weapons,other_weapons,rape,rape_people,murder,murder_people,assault,assault_people,vehicle_theft,vehicle_colour,vehicle_make,vehicle_model,vehicle_year,burglary,burglary_type,robbery,robbery_type,kidnapping,kidnapping_people,various,police_reporting,reported_to_police,police_case_num,report_images,description}=values[index]||{};
  const mediaData = (report_images&&report_images[0])?report_images[0].path:"No media available";
const theme = useTheme();
const doFunc=()=>{
  setSelectActive(4);
}

  useEffect(()=>{
    dispatch(setMarker({latitude,longitude}));
  },[latitude,longitude,index])

  useEffect(()=>{
    dispatch(getNearbyCrimes2({latitude:lat,longitude:long,doFunc}));
  },[]);

  useEffect(() => {
    dispatch(clearNearbyReports());
    dispatch(getNearbyCrimes2({latitude:lat,longitude:long,doFunc}));
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

  const data = values[index]&& [
    { firstCol: 'Time of Occurence:', secondCol: <p>{date_time}</p> },
    { firstCol: 'Address:', secondCol: <p>{location}</p> },
    { firstCol: 'Description:', secondCol: <p>{description}</p> },
    { firstCol: 'Perpetrators:', secondCol: [null,-1].includes(perpetrators)?perpetrators:"Unknown" },
    { firstCol: 'Weapons:', secondCol: (()=>{
      switch(weapons){
        case 0:return `Unknown`
        case 1:return `None`
        default:return `Fully Automatic:${fully_auto_weapons},Semi Automatic:${semi_auto_weapons},Knife Weapons:${knife_weapons},Other:${other_weapons}`
      }
    })() },
    { firstCol: 'Rape:', secondCol:(()=>{
      switch(rape){
        case 0:return null;//`Does not apply`
        case 1:return `Attempted Rape(${rape_people} involved)`
        default:return `Rape(${rape_people} involved)`
      }
    })() },
    { firstCol: 'Murder:', secondCol:(()=>{
      switch(murder){
        case 0:return `Unknown`
        case 1:return `Murder(${murder_people} involved)`
        default:return null;//`No`
      }
    })() },
    { firstCol: 'Assault:', secondCol:(()=>{
      switch(assault){
        case 0:return `Unknown`
        case 1:return `Murder(${assault_people} involved)`
        default:return null;//`No`
      }
    })() },
    { firstCol: 'Vehicle Theft:', secondCol:(()=>{
      if(vehicle_theft===4){
        return null;//capitalize(vehicle_theft_choices[vehicle_theft])
      }else{
        return capitalize(`${vehicle_theft_choices[vehicle_theft]} of ${vehicle_year} ${vehicle_colour} ${vehicle_make} ${vehicle_model}`)
      }
    })() },
    { firstCol: 'Burglary:', secondCol:(()=>{
      switch(burglary){
        case 0:return null//`Does not apply`
        case 1:return `Attempted Burglary of ${burglary_type} `
        default:return `Burglary of ${burglary_type}`
      }
    })() },
    { firstCol: 'Robbery:', secondCol:(()=>{
      switch(robbery){
        case 0:return null;//`Does not apply`
        case 1:return `Attempted Burglary of ${robbery_type} `
        default:return null;//`No`
      }
    })() },
    { firstCol: 'Kidnapping:', secondCol:(()=>{
      switch(kidnapping){
        case 0:return null;//`Does not apply`
        case 1:return `Attempted Kidnapping (${kidnapping_people} involved) `
        default:return null;//`No`
      }
    })() },
    { firstCol: 'Reason for crime:', secondCol: various===null?"Unknown":capitalize(various_choices[various]) },
    {firstCol: 'Police Visited Crime Scene:', secondCol: (police_reporting===0?"Unknown":(police_reporting===0?"Yes":"No"))},
    { firstCol: 'Formally reported to the police:', secondCol: (reported_to_police===0?"Unknown":(reported_to_police===0?"Yes":"No")) },
    ...police_case_num&&{ firstCol: 'Police Case Number:', secondCol: police_case_num?police_case_num:"N/A" },
    { firstCol: 'Media:', secondCol: mediaData },
  ];
  
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
  const handleClose=(open)=>{
    const prev = open;
    setOpen(0)
    if(prev===1){
      navigate("/");
    }
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SuccessDialog open={open} handleClose = {handleClose}/>
        <Box sx={{mt:5,pl:5,h:"100%"}}>
          <Grid container spacing={2} justifyContent="center" alignItems='center' sx={{ textAlign: 'center' }}>
            <Grid item xs={10}>
              <Box sx={{display:"flex",width:"100%",justifyContent:"center", alignItems:'center'}}>
              <Box display="flex" alignItems="center" justifyContent="center" paddingTop="10px">
              <Box borderBottom={2} borderColor={theme.palette.warning.main} style={{ marginRight: '5px', width: '20px' }} />
                <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '24px', textAlign: 'center' }}>
                  {viewCrime?"View Crime":"Possible Duplicate"}
                </Typography>
                <Box borderBottom={2} borderColor={theme.palette.warning.main} style={{ marginLeft: '5px', width: '20px' }} />
            </Box>
                {viewCrime&&
                  <Box component={"button"} sx={{display:"flex",width:"100%",justifyContent:"center",border:"none"}}>
                  </Box>
                }

              </Box>
            </Grid>
            
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start',alignItems:"center" }}>
                  <img src={current} alt="imgg" style={{ height:'17px'}} />
                  <Box>
                    <Typography align="left" sx={{ fontWeight: 'normal', paddingBottom: '10px', paddingTop: '10px', fontSize: '12px' }}>
                      Your report's location on the map
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start',alignItems:"center" }}>
                  <img src={duplicate} alt="imgg" style={{ height:"17px"}} />
                  <Box>
                    <Typography align="left" sx={{ fontWeight: 'normal', paddingBottom: '10px', paddingTop: '10px', fontSize: '12px' }}>
                      Possible duplicate report's location on the map
                    </Typography>
                  </Box>
                </Box>
              </Box>
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
                              row.secondCol!==null&&<TableRow key={index}>
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
                      <Typography variant="h1" align="center" style={{ fontWeight: 'bold', paddingBottom: '10px', fontSize: '17px' }}>
                        Is this your crime?
                      </Typography>
                      <Box display="flex" justifyContent="center">
                        <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={clickYes} disabled={lock}>
                          Yes
                        </Button>
                        <Button variant="contained" color="primary" disabled={lock} onClick={()=>{
                            if(!values[index+1]){
                              setSelectActive(4);
                            }
                            setIndex(index+1)
                          }}>
                          No
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

export default Duplicate;

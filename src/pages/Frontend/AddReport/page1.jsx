import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid,  TextField, Box , Divider, LinearProgress    } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import NextButton from 'src/components/Button/NextButton';

function Page1() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  useEffect(() => {
    loadGoogleMaps();
  }, []);

  const loadGoogleMaps = () => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyApoj80RTzWkAIc_eswUmPogeoufErlNaw&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  };

  window.initMap = () => {
    new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 20.5937 , lng: 78.9629 },
      zoom: 12,
    });

    
  };

  const ProgressBar = ({ activeStep }) => {
    const totalSteps = 15;
    const progress = (activeStep / totalSteps) * 100;

    return <LinearProgress variant="determinate" value={progress} className="bg-yellow-300 mt-2" />;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className='h-[55%] md:flex md:flex-row'>
<div className="left-side md:w-1/3">
        <Container maxWidth="sm">
        <Grid container spacing={2} justifyContent="center" sx={{ paddingY: 5 }}>
          <Grid item xs={10}>
            <Typography variant="h1" sx={{ textAlign: 'center' }} className="font-normal pb-5 text-3xl">
              Report Crime
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h4" className="font-normal" sx={{ textAlign: 'center' }}>
              Select date
            </Typography>
          </Grid>
          <Grid item xs={10} sx={{ textAlign: 'center' }}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h4" sx={{ textAlign: 'center' }} className="font-normal mt-5">
              Select time
            </Typography>
          </Grid>
          <Grid item xs={10} sx={{ textAlign: 'center' }}>
            <TimePicker
              label="Select Time"
              value={selectedTime}
              onChange={handleTimeChange}
              renderInput={(params) => <TextField {...params} />}
              ampm={false}
            />
          </Grid>
        </Grid>
      </Container>
      <div className=''>
       <Box className="flex justify-center items-end bg-yellow-300 text-black p-3 md:mt-40 mt-28">
        <Typography variant="h6">#1/16</Typography>
        <Divider orientation="vertical" flexItem className="bg-black mx-2" />
        <NextButton nextLink="/page2" textValue="Next"/>
        
      </Box>
       <ProgressBar activeStep="1" />
      </div>
      
      </div>
      <div className="right-side md:w-2/3 md:h-screen">
        <div id="map" className='hidden md:block w-full h-[100%]' />
      </div>
      </div>

    </LocalizationProvider>
    
)}

export default Page1
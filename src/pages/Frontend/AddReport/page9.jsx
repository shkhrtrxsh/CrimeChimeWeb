import React, { useState,useEffect } from 'react';
import { Container, Typography, Grid, Box , Divider, LinearProgress, Select, MenuItem  } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

function Page9() {
  const ProgressBar = ({ activeStep }) => {
    const totalSteps = 15;
    const progress = (activeStep / totalSteps) * 100;
  
    return <LinearProgress variant="determinate" value={progress} className=" bg-yellow-300 mt-2" />;
  };
  const [checked, setChecked] = useState(false);
    const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setChecked(event.target.checked);
  };
  useEffect(() => {
    loadGoogleMaps();
  }, []);

  const loadGoogleMaps = () => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&callback=initMap`;
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
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div className='h-[55%] md:flex md:flex-row'>
<div className='left-side md:w-1/3 pt-10'>
            <Container>
        <Grid container spacing={2} justifyContent="center" sx={{ paddingY: 0}}>
          <Grid item xs={10} className='flex justify-center flex-col'>
            <Typography variant="h1" sx={{ textAlign: 'center'  }} className='font-normal pt-2 pb-2 text-3xl'>Vehicle Types</Typography>
           <div className='flex justify-center'><DirectionsCarIcon sx={{ fontSize: '4rem' }}/></div>
          </Grid>
          
          <div className='w-full px-5 pt-5'>
      
      <div className='flex flex-row justify-start items-center my-5'>
      <Typography variant="h6" className='font-normal px-2 text-left'>MAKE</Typography>
      <Select
          value={value}
          onChange={handleChange}
          className='px-2 w-full rounded-none h-10'>
          <MenuItem value={1}>BMW</MenuItem>
          <MenuItem value={2}>MERCEDES</MenuItem>
          <MenuItem value={3}>Unknown</MenuItem>
        </Select>
      </div>
      <div className='flex flex-row justify-start items-center my-5'>
      <Typography variant="h6" className='font-normal px-2 text-left'>MODEL</Typography>
      <Select
          value={value}
          onChange={handleChange}
          className='px-2 w-full rounded-none h-10'>
          <MenuItem value={1}>Perpetrator used this weapon</MenuItem>
          <MenuItem value={2}>Perpetrator didn't use this weapon</MenuItem>
          <MenuItem value={3}>Unknown</MenuItem>
        </Select>
      </div>
      <div className='flex flex-row justify-start items-center my-5'>
      <Typography variant="h6" className='font-normal px-2 text-left'>COLOUR</Typography>
      <Select
          value={value}
          onChange={handleChange}
          className='px-2 w-full rounded-none h-10'>
          <MenuItem value={1}>RED</MenuItem>
          <MenuItem value={2}>BLACK</MenuItem>
          <MenuItem value={3}>YELLOW</MenuItem>
        </Select>
      </div>
      <div className='flex flex-row justify-start items-center my-5'>
      <Typography variant="h6" className='font-normal px-2 text-left'>YEAR</Typography>
      <Select
          value={value}
          onChange={handleChange}
          className='px-2 w-full rounded-none h-10'>
          <MenuItem value={1}>Perpetrator used this weapon</MenuItem>
          <MenuItem value={2}>Perpetrator didn't use this weapon</MenuItem>
          <MenuItem value={3}>Unknown</MenuItem>
        </Select>
      </div>
      
    </div>
          
        </Grid>
      </Container>
      <div className=''>
       <Box className="flex justify-center items-end bg-yellow-300 text-black p-3 md:mt-28 mt-12">
       <Typography variant="h6">GO BACK</Typography>
       <Divider orientation="vertical" flexItem className="bg-black mx-2" />
        <Typography variant="h6">#9/15</Typography>
        <Divider orientation="vertical" flexItem className="bg-black mx-2" />
        <Typography variant="h6">Next</Typography>
        
      </Box>
       <ProgressBar activeStep="9" />
</div>
      </div>
      <div className="right-side md:w-2/3 md:h-screen">
        <div id="map" className='hidden md:block w-full h-[100%]'/>
        </div>
    </div>
      </LocalizationProvider>
      
    )};

export default Page9
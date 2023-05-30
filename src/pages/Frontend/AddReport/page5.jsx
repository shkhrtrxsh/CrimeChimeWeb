import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid,  TextField, Box , Divider, LinearProgress, Checkbox   } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';


function Page5() {
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
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className='h-[55%] md:flex md:flex-row'>
<div className='left-side md:w-1/3 pt-10'>
      <Container >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={10} className='pt-5'>
            <Typography variant="h1" sx={{ textAlign: 'center'  }} className='font-normal pt-1 pb-2 text-3xl'>Murders/Deaths</Typography>
            <Typography variant="h2" sx={{ textAlign: 'center'  }} className='font-normal pb-5 text-2xl'>Was anyone killed?</Typography>
          </Grid>
          
          <div className='py-5' >
      <div className='flex flex-row justify-start items-center my-4 pl-8'>
      <Checkbox checked={checked} onChange={handleChange} />
      <Typography variant="h6" className='font-normal px-10 text-center'>Unknown</Typography>
      </div>
      <div className='flex flex-row justify-start items-center my-4 pl-8'>
      <Checkbox checked={checked} onChange={handleChange} />
      <Typography variant="h6" className='font-normal px-10 text-center'>No</Typography>
      </div>
      <div className='flex flex-row justify-start items-center my-4 pl-4'>
      <TextField
        type="number"
        className='px-2'
        value={value}
        onChange={handleChange}
        InputProps={{
          inputProps: {
            min: 1,
            max: 10,
            step: 1,
          },
        }}
        required
      />
      <Typography variant="h6" className='font-normal px-5 text-center'>If yes, then how many?</Typography>
      </div>
    </div>
        </Grid>
      </Container>
      <div className=''>
       <Box className="flex justify-center items-end bg-yellow-300 text-black p-3 md:mt-48 mt-32">
       <Typography variant="h6">GO BACK</Typography>
       <Divider orientation="vertical" flexItem className="bg-black mx-2" />
        <Typography variant="h6">#3/15</Typography>
        <Divider orientation="vertical" flexItem className="bg-black mx-2" />
        <Typography variant="h6">Next</Typography>
        
      </Box>
       <ProgressBar activeStep="3" />
</div>
      </div>
      <div className="right-side md:w-2/3 md:h-screen">
        <div id="map" className='hidden md:block w-full h-[100%]'/>
        </div>
    </div>
    </LocalizationProvider>
      
    )};

export default Page5
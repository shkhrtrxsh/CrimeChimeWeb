import React, { useState,useEffect } from 'react';
import { Container, Typography, Grid,  TextField, Box , Divider, LinearProgress, Checkbox, IconButton   } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NextButton from 'src/components/Button/NextButton';


function Page7() {
  const [value, setValue] = useState(0);

  const handleIncrement = () => {
    setValue(parseInt(value, 10) + 1);
  };

  const handleDecrement = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };
  const ProgressBar = ({ activeStep }) => {
    const totalSteps = 15;
    const progress = (activeStep / totalSteps) * 100;
  
    return <LinearProgress variant="determinate" value={progress} className=" bg-yellow-300 mt-2" />;
  };
  const [checked, setChecked] = useState(false);
    

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
      <Container >
        <Grid container spacing={2} justifyContent="center" sx={{ paddingY: 0}}>
          <Grid item xs={10} className='pt-5'>
            <Typography variant="h1" sx={{ textAlign: 'center'  }} className='font-normal pt-1 pb-2 text-3xl'>Assault</Typography>
            <Typography variant="h2" sx={{ textAlign: 'center'  }} className='font-normal pb-5 text-sm'>(injuries due to violence)</Typography>
          </Grid>
          
          <div className='pl-5 pt-5'>
            <Typography variant="h6" className='font-normal px-10 text-center'>Was anyone assaulted?</Typography>
      <div className='flex flex-row justify-start items-center my-4 pl-8'>
      
      <Checkbox checked={checked} onChange={handleChange} />
      <Typography variant="h6" className='font-normal px-10 text-center'>Unknown</Typography>
      </div>
      <div className='flex flex-row justify-start items-center my-4 pl-8'>
      <Checkbox checked={checked} onChange={handleChange} />
      <Typography variant="h6" className='font-normal px-10 text-center'>No</Typography>
      </div>
      <div className='flex flex-row justify-start items-center my-4 pl-8'>
      <Checkbox checked={checked} onChange={handleChange} />
      <Typography variant="h6" className='font-normal px-10 text-center'>Yes</Typography>
      </div>
      <div className='flex flex-row justify-start items-center my-4 pl-4'>
      
      <div className='flex w-full items-center justify-start'>
      <Grid item className='w-5'>
        <IconButton className='w-1/6' onClick={handleDecrement} aria-label="Decrement">
          <RemoveIcon />
        </IconButton>
      </Grid>
      <Grid item className='w-[42px]'>
        <TextField
          type="number"
          value={value}
          inputProps={{ min: 0 }}
          onChange={(event) => setValue(event.target.value)}
        />
      </Grid>
      <Grid item className='w-5'>
        <IconButton className='w-1/6 pl-2.5' onClick={handleIncrement} aria-label="Increment">
          <AddIcon />
        </IconButton>
      </Grid>
      <Typography variant="h6" className='font-normal text-left pl-4'>If yes, how many were assaulted?</Typography>
    </div>
      
      </div>
    </div>
        </Grid>
      </Container>
      <div className=''>
       <Box className="flex justify-center items-end bg-yellow-300 text-black p-3 md:mt-32 mt-20">
       <NextButton nextLink="/page6" textValue="Back"/>
       <Divider orientation="vertical" flexItem className="bg-black mx-2" />
        <Typography variant="h6">#7/16</Typography>
        <Divider orientation="vertical" flexItem className="bg-black mx-2" />
        <NextButton nextLink="/page8" textValue="Next"/>
        
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

export default Page7
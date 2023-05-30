import React, { useState, useEffect} from 'react';
import { Container, Typography, Grid, Box , Divider, LinearProgress, Checkbox, Select, MenuItem  } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ak from '../../../assets/images/ak.png'
import pistol from '../../../assets/images/pistol.png'
import knife from '../../../assets/images/knife.png'
import others from '../../../assets/images/others.png'

function Page4() {
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
<div className='left-side md:w-1/3'>
 <Container >
        <Grid container spacing={2} justifyContent="center" sx={{ paddingY: 0}}>
          <Grid item xs={10}>
            <Typography variant="h1" sx={{ textAlign: 'center'  }} className='font-normal pt-1 pb-2 text-3xl'>Weapons</Typography>
            <Typography variant="h2" sx={{ textAlign: 'center'  }} className='font-normal pb-5 text-sm'>Perpetrator(s) had weapon(s)?</Typography>
          </Grid>
          
          <div >
      
      <div className='flex flex-row justify-center items-center my-3'>
      <Select
          value={value}
          onChange={handleChange}
          className='px-2'
        >
          <MenuItem value={1}>Perpetrator used this weapon</MenuItem>
          <MenuItem value={2}>Perpetrator didn't use this weapon</MenuItem>
          <MenuItem value={3}>Unknown</MenuItem>
        </Select>
      <Typography variant="h6" className='font-normal px-2 text-left'>Fully automatic<br/><span className='text-sm text-left'>(machine gun, assault rifle)</span></Typography>
      <img src={ak} className='w-10 h-10' alt="ak" />
      </div>
      <div className='w-full flex flex-row items-center my-3'>
      <Select
          value={value}
          onChange={handleChange}
          className='px-2'
        >
          <MenuItem value={1}>Perpetrator used this weapon</MenuItem>
          <MenuItem value={2}>Perpetrator didn't use this weapon</MenuItem>
          <MenuItem value={3}>Unknown</MenuItem>
        </Select>
      <Typography variant="h6" className='font-normal px-2 text-left'>Semi automatic<br/><span className='text-sm text-left'>(pistol, handgun)</span></Typography>
      <img src={pistol} className='w-10 h-10' alt="ak" />
    {/* <Checkbox checked={checked} onChange={handleChange} /> */}
      </div>
      <div className='w-full flex flex-row items-center my-3'>
      <Select
          value={value}
          onChange={handleChange}
          className='px-2'
        >
          <MenuItem value={1}>Perpetrator used this weapon</MenuItem>
          <MenuItem value={2}>Perpetrator didn't use this weapon</MenuItem>
          <MenuItem value={3}>Unknown</MenuItem>
        </Select>
      <Typography variant="h6" className='font-normal px-2 text-left'>Knife</Typography>
      <img src={knife} className='w-10 h-10' alt="ak" />
    {/* <Checkbox checked={checked} onChange={handleChange} /> */}
      </div>
      <div className='w-full flex flex-row items-center my-3'>
      <Select
          value={value}
          onChange={handleChange}
          className='px-2'
        >
          <MenuItem value={1}>Perpetrator used this weapon</MenuItem>
          <MenuItem value={2}>Perpetrator didn't use this weapon</MenuItem>
          <MenuItem value={3}>Unknown</MenuItem>
        </Select>
      <Typography variant="h6" className='font-normal px-2 text-left'>Other</Typography>
      <img src={others} className='w-10 h-10' alt="ak" />
    {/* <Checkbox checked={checked} onChange={handleChange} /> */}
      </div>
      <div className='flex flex-row justify-start items-center my-3 pl-4'>
      <Checkbox checked={checked} onChange={handleChange} />
      <Typography variant="h6" className='font-normal px-6 text-center'>None</Typography>
      </div>
      <div className='flex flex-row justify-start items-center my-3 pl-4'>
      <Checkbox checked={checked} onChange={handleChange} />
      <Typography variant="h6" className='font-normal px-6 text-center'>Unknown</Typography>
      </div>
      
    </div>
      
        </Grid>
      </Container>
      <div className=''>
       <Box className="flex justify-center items-end bg-yellow-300 text-black p-3 md:mt-16 mt-10">
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

export default Page4
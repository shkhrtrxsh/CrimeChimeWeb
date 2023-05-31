import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box , Divider, LinearProgress, Checkbox} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import NextButton from 'src/components/Button/NextButton';

function Page14() {
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
            <Typography variant="h1" sx={{ textAlign: 'center'  }} className='font-normal pt-1 pb-2 text-3xl'>Various</Typography>
            <Typography variant="h2" sx={{ textAlign: 'center'  }} className='font-normal pt-2 pb-5 text-xl'>Check all boxes that apply</Typography>
          </Grid>
          
          <div className='pl-5 pt-0'>
            
      <div className='flex flex-row justify-start items-center my-2 pl-8'>
      
      <Checkbox checked={checked} onChange={handleChange} />
      <Typography variant="h6" className='font-normal px-10 text-center'>Crime occured at ATM</Typography>
      </div>
      <div className='flex flex-row justify-start items-center my-4 pl-8'>
      <Checkbox checked={checked} onChange={handleChange} />
      <Typography variant="h6" className='font-normal px-10 text-left'>I believe this crime to be drug-related<br/><span className='text-left text-sm'>(perpetrator involved with drugs)</span></Typography>
      
      </div>
      <div className='flex flex-row justify-start items-center my-4 pl-8'>
      <Checkbox checked={checked} onChange={handleChange} />
      <Typography variant="h6" className='font-normal px-10 text-left'>I believe this crime to be gang-related</Typography>
      
      </div>
      <div className='flex flex-row justify-start items-center my-4 pl-8'>
      <Checkbox checked={checked} onChange={handleChange} />
      <Typography variant="h6" className='font-normal px-10 text-left'>Arson was involved<br/><span className='text-left text-sm'>(setting fire to a property on purpose)</span></Typography>
      
      </div>
      <div className='flex flex-row justify-start items-center my-4 pl-8'>
      <Checkbox checked={checked} onChange={handleChange} />
      <Typography variant="h6" className='font-normal px-10 text-left'>Vandalism was involved<br/><span className='text-left text-sm'>(malicious destruction or defacement of property)</span></Typography>
      
      </div>
      <div className='flex flex-row justify-start items-center my-4 pl-8'>
      <Checkbox checked={checked} onChange={handleChange} />
      <Typography variant="h6" className='font-normal px-10 text-left'>Social unrest</Typography>
      
      </div>
      
    </div>
        </Grid>
      </Container>
      <div className=''>
       <Box className="flex justify-center items-end bg-yellow-300 text-black p-3 md:mt-0 mt-10">
       <NextButton nextLink="/page13" textValue="Back"/>
       <Divider orientation="vertical" flexItem className="bg-black mx-2" />
        <Typography variant="h6">#14/16</Typography>
        <Divider orientation="vertical" flexItem className="bg-black mx-2" />
        <NextButton nextLink="/page15" textValue="Next"/>
        
      </Box>
       <ProgressBar activeStep="14" />
</div>
      </div>
      <div className="right-side md:w-2/3 md:h-screen">
        <div id="map" className='hidden md:block w-full h-[100%]'/>
        </div>
    </div>
    </LocalizationProvider>
      
    )};

export default Page14
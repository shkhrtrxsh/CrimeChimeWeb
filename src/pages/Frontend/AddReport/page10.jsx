import React, { useState,useEffect } from 'react';
import { Container, Typography, Grid,  TextField, Box , Divider, LinearProgress, Checkbox, Select, MenuItem  } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import NextButton from 'src/components/Button/NextButton';

function Page10() {
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
            <Typography variant="h1" sx={{ textAlign: 'center'  }} className='font-normal pt-2 pb-2 text-3xl'>Burglary</Typography>
            <Typography variant="h1" sx={{ textAlign: 'center'  }} className='font-normal pt-2 pb-2 text-sm'>(perpetrtor enters home or business)</Typography>
           
          </Grid>
          
          <div className='w-full px-0 pt-5'>
          <div className='flex flex-row justify-start md:justify-center items-center my-4 pl-8'>
      
      <Checkbox checked={checked} onChange={handleChange} />
      <Typography variant="h6" className='font-normal px-10 text-left'>Does not apply</Typography>
      </div>
      <div className='flex flex-row justify-start md:justify-center items-center my-4 pl-8'>
      
      <Checkbox checked={checked} onChange={handleChange} className='' />
      <Typography variant="h6" className='font-normal px-10 text-left'>Attempted Burglary<br/><span className='text-left text-sm'>(goods were not stolen)</span></Typography>
      </div>
      <div className='flex flex-row justify-start md:justify-center  items-center my-4 pl-8'>
      
      <Checkbox checked={checked} onChange={handleChange} />
      <Typography variant="h6" className='font-normal px-10 text-left'>Bulglary<br/><span className='text-left text-sm'>(goods were stolen)</span></Typography>
      </div>
      <div className='flex flex-col justify-start md:justify-center items-center my-5'>
      <Typography variant="h6" className='font-normal px-1 pt-3 pb-3 text-center md:text-left'>Select stolen goods item from the list below</Typography>
      <Select
  value={value}
  onChange={handleChange}
  className='px-2 w-[50%] flex text-left rounded-none h-10 pt-5'>
  <MenuItem value='bicycle'>Bicycle</MenuItem>
  <MenuItem value='handbag'>Handbag</MenuItem>
  <MenuItem value='watch'>Watch</MenuItem>
  <MenuItem value='jewellery'>Jewellery</MenuItem>
  <MenuItem value='phone'>Phone</MenuItem>
  <MenuItem value='credit/debit/bank-card'>Credit/Debit/Bank Card</MenuItem>
  <MenuItem value='wallet/cash'>Wallet/Cash</MenuItem>
  <MenuItem value='passport'>Passport</MenuItem>
  <MenuItem value='ID-document'>ID Document</MenuItem>
  <MenuItem value='general-documents'>General Documents</MenuItem>
  <MenuItem value='backpack'>Backpack</MenuItem>
  <MenuItem value='suitcase'>Suitcase</MenuItem>
  <MenuItem value='copper'>Copper</MenuItem>
  <MenuItem value='other'>Other</MenuItem>
</Select>

      </div>
      </div>
          <Grid item xs={10} className='flex justify-center'>
            
          </Grid>
          <Grid item xs={10}sx={{ textAlign: 'center'  }}>
          
          </Grid>
        </Grid>
      </Container>
      <div className=''>
       <Box className="flex justify-center items-end bg-yellow-300 text-black p-3 md:mt-20 mt-6">
       <NextButton nextLink="/page9" textValue="Back"/>
       <Divider orientation="vertical" flexItem className="bg-black mx-2" />
        <Typography variant="h6">#10/16</Typography>
        <Divider orientation="vertical" flexItem className="bg-black mx-2" />
        <NextButton nextLink="/page11" textValue="Next"/>
        
      </Box>
       <ProgressBar activeStep="10" />
</div>
      </div>
      <div className="right-side md:w-2/3 md:h-screen">
        <div id="map" className='hidden md:block w-full h-[100%]'/>
        </div>
    </div>
      </LocalizationProvider>
      
    )};

export default Page10
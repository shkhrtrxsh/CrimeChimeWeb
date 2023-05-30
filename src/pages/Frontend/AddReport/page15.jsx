import React, { useState,useEffect } from 'react';
import { Container, Typography, Grid,  TextField, Box , Divider, LinearProgress,Button   } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function Page15() {
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
    const totalSteps = 16;
    const progress = (activeStep / totalSteps) * 100;
  
    return <LinearProgress variant="determinate" value={progress} className=" bg-yellow-300 mt-2" />;
  };
  const [checked, setChecked] = useState(false);
    
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Do something with the file, such as displaying it or uploading it.
      console.log(file);
    }
  };
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
            <Typography variant="h1" sx={{ textAlign: 'center'  }} className='font-normal pt-1 pb-2 text-3xl'>Media/Description</Typography>
           
          </Grid>
          
          <div className='pl-5 pt-10'>
            
          <div className='p-5 flex justify-center'>
      <input
        accept="image/*, video/*"
        id="file-input"
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="file-input">
        <Button component="span" variant="contained" color="primary">
          Upload image or video
        </Button>
      </label>
    </div>
    <div className='rounded-none p-5'>
          <TextField
      label="Describe the crime.."
      multiline
      rows={8}
      variant="outlined"
      className='rounded-none'
    />
          </div>
    </div>
        </Grid>
      </Container>
      <div className=''>
       <Box className="flex justify-center items-end bg-yellow-300 text-black p-3 md:mt-20 mt-10">
       <Typography variant="h6">GO BACK</Typography>
       <Divider orientation="vertical" flexItem className="bg-black mx-2" />
        <Typography variant="h6">#15/16</Typography>
        <Divider orientation="vertical" flexItem className="bg-black mx-2" />
        <Typography variant="h6">Next</Typography>
        
      </Box>
       <ProgressBar activeStep="15" />
</div>
      </div>
      <div className="right-side md:w-2/3 md:h-screen">
        <div id="map" className='hidden md:block w-full h-[100%]'/>
        </div>
    </div>
    </LocalizationProvider>
      
    )};

export default Page15
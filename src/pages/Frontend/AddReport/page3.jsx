import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Box,
  Divider,
  LinearProgress,
  Checkbox,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import PeopleIcon from '@mui/icons-material/People';
import NextButton from 'src/components/Button/NextButton';

function Page3() {
  const ProgressBar = ({ activeStep }) => {
    const totalSteps = 15;
    const progress = (activeStep / totalSteps) * 100;

    return <LinearProgress variant="determinate" value={progress} className="bg-yellow-300 mt-2" />;
  };
  const [checked, setChecked] = useState(false);

  
  const [value, setValue] = useState(5);

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
      <div className="h-[55%] md:flex md:flex-row">
        <div className="left-side md:w-1/3">
          <Container maxWidth="sm">
            <Grid container spacing={2} justifyContent="center" sx={{ paddingY: 5 }}>
              <Grid item xs={10}>
                <Typography variant="h1" sx={{ textAlign: 'center' }} className="font-bold pb-2 text-3xl">
                  Perpitrators
                </Typography>
                <Typography
                  variant="h2"
                  sx={{ textAlign: 'center' }}
                  className="font-bold pb-5 text-sm"
                >
                  (persons who committed the crime)
                </Typography>
              </Grid>

              <div>
                <Typography
                  id="number-picker-label"
                  className="pb-4 text-center text-xl"
                >
                  How many perpitrators?
                </Typography>
                <div className="flex flex-row">
                  <TextField
                    type="number"
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
                  <Typography className="mx-3 flex items-center">OR</Typography>
                  <Divider orientation="vertical" flexItem className="bg-black mx-2" />
                  <Typography className="flex items-center">Unknown</Typography>
                  <Checkbox checked={checked} onChange={handleChange} />
                </div>
              </div>

              <Grid item xs={10} className="flex justify-center">
                <PeopleIcon className="h-28 w-28" />
              </Grid>
              <Grid item xs={10} sx={{ textAlign: 'center' }}>
                <TextField
                  label="Describe their appearance.."
                  multiline
                  rows={4}
                  variant="outlined"
                  className="w-full"
                />
              </Grid>
            </Grid>
          </Container>
          <div className=''>
       <Box className="flex justify-center items-end bg-yellow-300 text-black p-3 md:mt-16 mt-1">
        <NextButton nextLink="/page2" textValue="Back"/>
        <Divider orientation="vertical" flexItem className="bg-black mx-2" />
        <Typography variant="h6">#3/16</Typography>
        <Divider orientation="vertical" flexItem className="bg-black mx-2" />
        <NextButton nextLink="/page4" textValue="Next"/>
        
      </Box>
       <ProgressBar activeStep="3" />
      </div>
        </div>
        <div className="right-side md:w-2/3 md:h-screen">
        <div id="map" className='hidden md:block w-full h-[100%]'/>
        </div>
      </div>

      
    </LocalizationProvider>
  );
}

export default Page3;

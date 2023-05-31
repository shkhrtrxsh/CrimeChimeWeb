import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, Divider, LinearProgress, Checkbox } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import NextButton from 'src/components/Button/NextButton';

const Page16 = () => {
  const [value, setValue] = useState(0);

  const ProgressBar = ({ activeStep }) => {
    const totalSteps = 16;
    const progress = (activeStep / totalSteps) * 100;

    return <LinearProgress variant="determinate" value={progress} sx={{ bgcolor: 'yellow.300', mt: 0.5 }} />;
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
      center: { lat: 20.5937, lng: 78.9629 },
      zoom: 12,
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '55%' }}>
        <Box sx={{ pt: { xs: '10px', md: '20px' }, width: {xs:'100%',md:'33.33%' }}}>
          <Container>
            <Grid container spacing={2} justifyContent="center" sx={{ paddingY: 0 }}>
              <Grid item xs={10} sx={{ pt: 5 }}>
              <Typography variant="h1" align="center" style={{ fontWeight: 'bold', paddingBottom: '5px', fontSize: '24px' }}>
                  Police Reporting
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <LocalPoliceIcon sx={{ fontSize: '4rem' }} />
                </Box>
              </Grid>

              <Grid item xs={10} sx={{ pl: 5, pt: 5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'center' }}>
                    Did the police attend the scene of crime?
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', my: 4, pl: 1 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', pr: 2 }}>
                      <Checkbox sx={{ display: 'flex', justifyContent: 'center' }} checked={checked} onChange={handleChange} />
                      <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'center' }}>
                        Unknown
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', px: 2 }}>
                      <Checkbox sx={{ display: 'flex', justifyContent: 'center' }} checked={checked} onChange={handleChange} />
                      <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'center' }}>
                        Yes
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', pl: 2 }}>
                      <Checkbox sx={{ display: 'flex', justifyContent: 'center' }} checked={checked} onChange={handleChange} />
                      <Typography variant="h6" sx={{ fontWeight: 'normal', px: 4, textAlign: 'center' }}>
                        No
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 'normal', px: 1, pt: 5, textAlign: 'center' }}>
                    Was the crime formally reported to the police?
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 4, pl: 0 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', pr: 4 }}>
                      <Checkbox sx={{ display: 'flex', justifyContent: 'center' }} checked={checked} onChange={handleChange} />
                      <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'center' }}>
                        No
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', pl: 4 }}>
                      <Checkbox sx={{ display: 'flex', justifyContent: 'center' }} checked={checked} onChange={handleChange} />
                      <Typography variant="h6" sx={{ fontWeight: 'normal', px: 4, textAlign: 'center' }}>
                        Yes
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
          <Box>
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFEE58', color: 'black', padding: '12px', marginTop: '48px' }}>
              <NextButton nextLink="/page15" textValue="Back"/>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <Typography variant="h6">#16/16</Typography>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <NextButton nextLink="/page16" textValue="Submit"/>
            </Box>
            <ProgressBar activeStep={16}/>
          </Box>
        </Box>
        <Box
          sx={{
            width: '66.67%',
            height: '91vh',
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Box
            id="map"
            sx={{
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default Page16;

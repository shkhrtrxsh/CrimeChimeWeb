import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, Divider, LinearProgress, Select, MenuItem } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import NextButton from 'src/components/Button/NextButton';

function Page9() {
  const ProgressBar = ({ activeStep }) => {
    const totalSteps = 15;
    const progress = (activeStep / totalSteps) * 100;

    return <LinearProgress variant="determinate" value={progress} sx={{ bgcolor: 'yellow.300', mt: 0.5 }} />;
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
              <Grid item xs={10} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h1" align="center" style={{ fontWeight: 'bold', paddingBottom: '5px', fontSize: '24px' }}>
                  Vehicle Types
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <DirectionsCarIcon sx={{ fontSize: '4rem' }} />
                </Box>
              </Grid>

              <Box sx={{ pl: 5, pt: 5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'left' }}>
                      MAKE
                    </Typography>
                    <Select
                      value={value}
                      onChange={handleChange}
                      sx={{ px: 2, width: '100%', borderRadius: 'none', height: '10' }}
                    >
                      <MenuItem value={1}>BMW</MenuItem>
                      <MenuItem value={2}>MERCEDES</MenuItem>
                      <MenuItem value={3}>Unknown</MenuItem>
                    </Select>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'left' }}>
                      MODEL
                    </Typography>
                    <Select
                      value={value}
                      onChange={handleChange}
                      sx={{ px: 2, width: '100%', borderRadius: 'none', height: '10' }}
                    >
                      <MenuItem value={1}>Perpetrator used this weapon</MenuItem>
                      <MenuItem value={2}>Perpetrator didn't use this weapon</MenuItem>
                      <MenuItem value={3}>Unknown</MenuItem>
                    </Select>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'left' }}>
                      COLOUR
                    </Typography>
                    <Select
                      value={value}
                      onChange={handleChange}
                      sx={{ px: 2, width: '100%', borderRadius: 'none', height: '10' }}
                    >
                      <MenuItem value={1}>RED</MenuItem>
                      <MenuItem value={2}>BLACK</MenuItem>
                      <MenuItem value={3}>YELLOW</MenuItem>
                    </Select>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'left' }}>
                      YEAR
                    </Typography>
                    <Select
                      value={value}
                      onChange={handleChange}
                      sx={{ px: 2, width: '100%', borderRadius: 'none', height: '10' }}
                    >
                      <MenuItem value={1}>Perpetrator used this weapon</MenuItem>
                      <MenuItem value={2}>Perpetrator didn't use this weapon</MenuItem>
                      <MenuItem value={3}>Unknown</MenuItem>
                    </Select>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Container>

          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFEE58', color: 'black', padding: '12px', marginTop: '16px' }}>
              <NextButton nextLink="/page8" textValue="Back"/>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <Typography variant="h6">#9/16</Typography>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <NextButton nextLink="/page10" textValue="Next"/>
            </Box>
            <ProgressBar activeStep={9} />
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
}

export default Page9;

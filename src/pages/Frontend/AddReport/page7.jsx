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
import NextButton from 'src/components/Button/NextButton';

function Page7() {
  const [value, setValue] = useState(0);

  const ProgressBar = ({ activeStep }) => {
    const totalSteps = 15;
    const progress = (activeStep / totalSteps) * 100;

    return <LinearProgress variant="determinate" value={progress} sx={{ bgcolor: 'yellow.300', mt: 0.5 }} />;
  };

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
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
                  Assault
                </Typography>
                <Typography variant="h2" align="center" style={{ fontWeight: 'bold', paddingBottom: '20px', fontSize: '12px' }}>
                  (injuries due to violence)
                </Typography>
              </Grid>

              <Box sx={{ py: 5 }}>
                <Typography variant="h6" sx={{ fontWeight: 'normal', px: 1, textAlign: 'center' }}>
                  was anyone assaulted?
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 4, pl: 8 }}>
                  <Checkbox checked={checked} onChange={handleChange} />
                  <Typography variant="h6" sx={{ fontWeight: 'normal', px: 5, textAlign: 'left' }}>
                    Unknown
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 4, pl: 8 }}>
                  <Checkbox checked={checked} onChange={handleChange} />
                  <Typography variant="h6" sx={{ fontWeight: 'normal', pr: 20,pl: 5, textAlign: 'left' }}>
                    No
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 4, pl: 8 }}>
                  <Checkbox checked={checked} onChange={handleChange} />
                  <Typography variant="h6" sx={{ fontWeight: 'normal', px: 5, textAlign: 'center' }}>
                    Yes
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 4, pl: 8 }}>
                  
                  <Box sx={{ flex: '0 0 42px' }}>
                    <TextField
                      type="number"
                      value={value}
                      inputProps={{ min: 0 }}
                      onChange={(event) => setValue(event.target.value)}
                    />
                  </Box>
                  
                  <Typography variant="h6" sx={{ fontWeight: 'normal', textAlign: 'left', pl: 4 }}>
                    If yes, how many were assaulted?
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Container>
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFEE58', color: 'black', padding: '12px', marginTop: '16px' }}>
              <NextButton nextLink="/page6" textValue="Back"/>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <Typography variant="h6">#7/16</Typography>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <NextButton nextLink="/page8" textValue="Next"/>
            </Box>
            <ProgressBar activeStep={6} />
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

export default Page7;


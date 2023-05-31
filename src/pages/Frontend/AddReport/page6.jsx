import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Box, Divider, LinearProgress, Checkbox, IconButton,useMediaQuery,
  useTheme } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NextButton from 'src/components/Button/NextButton';

const Page6 = () => {
  const [value, setValue] = useState(0);

  const handleIncrement = () => {
    setValue((prevValue) => prevValue + 1);
  };

  const handleDecrement = () => {
    if (value > 0) {
      setValue((prevValue) => prevValue - 1);
    }
  };

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
  const theme = useTheme();
  const isMdBreakpoint = useMediaQuery(theme.breakpoints.up('md'));
  window.initMap = () => {
    new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 20.5937, lng: 78.9629 },
      zoom: 12,
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '55%' }}>
        <Box sx={{ pt: { xs: '10px', md: '20px' }, flexBasis: '33.33%' }}>
          <Container>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={10} sx={{ pt: 5 }}>
              <Typography variant="h1" align="center" style={{ fontWeight: 'bold', paddingBottom: '5px', fontSize: '24px' }}>
                  Rape
                </Typography>
              </Grid>

              <Box sx={{ py: 5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 4, pl: 8 }}>
                  <Checkbox checked={checked} onChange={handleChange} />
                  <Typography variant="h6" sx={{ fontSize: '1.25rem', fontWeight: 'normal', px: 5, textAlign: 'left' }}>
                    Does not apply
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 4, pl: 8 }}>
                  <Checkbox checked={checked} onChange={handleChange} />
                  <Typography variant="h6" sx={{ fontSize: '1.25rem', fontWeight: 'normal', pr: 20,pl: 5, textAlign: 'left' }}>
                    Attempted rape
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 4, pl: 8 }}>
                  <Checkbox checked={checked} onChange={handleChange} />
                  <Typography variant="h6" sx={{ fontSize: '1.25rem', fontWeight: 'normal', px: 5, textAlign: 'left' }}>
                    Rape
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'start', my: 4, pl: 8 }}>
                  <Box sx={{ flex: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    
                    <Grid item xs={2}>
                      <TextField
                        type="number"
                        value={value}
                        inputProps={{ min: 0 }}
                        onChange={(event) => setValue(event.target.value)}
                      />
                    </Grid>
                    
                    <Typography variant="h6" sx={{ fontSize: '1.25rem',fontWeight: 'normal', textAlign: 'center', pl: 2.5 }}>
                      Multiple Rape
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Container>
          
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'end', backgroundColor: '#FFEE58', color: 'black', padding: '12px', marginTop: '16px' }}>
              <NextButton nextLink="/page4" textValue="Back"/>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <Typography variant="h6">#6/16</Typography>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <NextButton nextLink="/page7" textValue="Next"/>
            </Box>
            <ProgressBar activeStep={6} />
          
        </Box>
        <Box
      sx={{
        width: { xs: '0%', md: '66.67%' },
        height: { xs: '0vh', md: '91vh' },
      }}
    >
      <Box
        id="map"
        sx={{
          width: '100%',
          height: '100%',
          display: { xs: 'none', md: 'block' },
        }}
      />
    </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default Page6;

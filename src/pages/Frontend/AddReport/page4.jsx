import React, { useState, useEffect} from 'react';
import { Container, Typography, Grid, Box , Divider, LinearProgress, Checkbox, Select, MenuItem,useMediaQuery,
  useTheme, } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ak from '../../../assets/images/ak.png'
import pistol from '../../../assets/images/pistol.png'
import knife from '../../../assets/images/knife.png'
import others from '../../../assets/images/others.png'
import NextButton from 'src/components/Button/NextButton';

function Page4() {
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
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyApoj80RTzWkAIc_eswUmPogeoufErlNaw&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  };
  const theme = useTheme();
  const isMdBreakpoint = useMediaQuery(theme.breakpoints.up('md'));
  window.initMap = () => {
     new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 20.5937 , lng: 78.9629 },
      zoom: 12,
    });
  };
  
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ display: 'flex', flexDirection: 'row', height: '55%' }}>
        <div style={{ width: isMdBreakpoint? '33.33%': '100%' }}>
          <Container>
            <Grid container spacing={2} justifyContent="center" sx={{ paddingTop: '40px' }}>
              <Grid item xs={10} sx={{paddingBottom: '20px'}}>
              <Typography variant="h1" align="center" style={{ fontWeight: 'bold', paddingBottom: '10px', fontSize: '24px' }}>
                  Weapons
                </Typography>
                <Typography variant="h2" align="center" style={{ fontWeight: 'bold', paddingBottom: '20px', fontSize: '12px' }}>
                  Perpetrator(s) had weapon(s)?
                </Typography>
              </Grid>

              <div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: '3' }}>
                  <Select value={value} onChange={handleChange} sx={{ paddingX: 2 }}>
                    <MenuItem value={1}>Perpetrator used this weapon</MenuItem>
                    <MenuItem value={2}>Perpetrator didn't use this weapon</MenuItem>
                    <MenuItem value={3}>Unknown</MenuItem>
                  </Select>
                  <Typography variant="h6" sx={{ fontWeight: 'normal', paddingX: 2, textAlign: 'left' }}>
                    Fully automatic<br />
                    <span style={{ fontSize: 'sm', textAlign: 'left' }}>(machine gun, assault rifle)</span>
                  </Typography>
                  <img src={ak} style={{ width: '40px', height: '40px' }} alt="ak" />
                </div>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '3' }}>
                  <Select value={value} onChange={handleChange} sx={{ paddingX: 2 }}>
                    <MenuItem value={1}>Perpetrator used this weapon</MenuItem>
                    <MenuItem value={2}>Perpetrator didn't use this weapon</MenuItem>
                    <MenuItem value={3}>Unknown</MenuItem>
                  </Select>
                  <Typography variant="h6" sx={{ fontWeight: 'normal', paddingX: 2, textAlign: 'left' }}>
                    Semi automatic<br />
                    <span style={{ fontSize: 'sm', textAlign: 'left' }}>(pistol, handgun)</span>
                  </Typography>
                  <img src={pistol} style={{ width: '40px', height: '40px' }} alt="pistol" />
                </div>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '3' }}>
                  <Select value={value} onChange={handleChange} sx={{ paddingX: 2 }}>
                    <MenuItem value={1}>Perpetrator used this weapon</MenuItem>
                    <MenuItem value={2}>Perpetrator didn't use this weapon</MenuItem>
                    <MenuItem value={3}>Unknown</MenuItem>
                  </Select>
                  <Typography variant="h6" sx={{ fontWeight: 'normal', paddingX: 2, textAlign: 'left' }}>
                    Knife
                  </Typography>
                  <img src={knife} style={{ width: '40px', height: '40px' }} alt="knife" />
                </div>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '3' }}>
                  <Select value={value} onChange={handleChange} sx={{ paddingX: 2 }}>
                    <MenuItem value={1}>Perpetrator used this weapon</MenuItem>
                    <MenuItem value={2}>Perpetrator didn't use this weapon</MenuItem>
                    <MenuItem value={3}>Unknown</MenuItem>
                  </Select>
                  <Typography variant="h6" sx={{ fontWeight: 'normal', paddingX: 2, textAlign: 'left' }}>
                    Other
                  </Typography>
                  <img src={others} style={{ width: '40px' , height: '40px' }} alt="others" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', margin: '3', paddingLeft: '4' }}>
                  <Checkbox checked={checked} onChange={handleChange} />
                  <Typography variant="h6" sx={{ fontWeight: 'normal', paddingX: 6, textAlign: 'center' }}>None</Typography>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', margin: '3', paddingLeft: '4' }}>
                  <Checkbox checked={checked} onChange={handleChange} />
                  <Typography variant="h6" sx={{ fontWeight: 'normal', paddingX: 6, textAlign: 'center' }}>Unknown</Typography>
                </div>
              </div>
            </Grid>
          </Container>
          <div>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'end', backgroundColor: '#FFEE58', color: 'black', padding: '12px', marginTop: '64px' }}>
              <NextButton nextLink="/page3" textValue="Back"/>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <Typography variant="h6">#3/16</Typography>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <NextButton nextLink="/page5" textValue="Next"/>
            </Box>
            <ProgressBar activeStep={4} />
          </div>
        </div>
        <div style={{ width: isMdBreakpoint ? '66.67%' : '0%', height: isMdBreakpoint ? '91vh' : '0vh' }}>
          <div id="map" style={{ width: '100%', height: '100%', display: isMdBreakpoint ? 'block' : 'none' }}></div>
        </div>
      </div>
    </LocalizationProvider>
      
    )};

export default Page4
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,

  Divider,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { DatePicker, TimePicker, LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
>>>>>>> 111f4e53dd29a8138265bbca271f1cb80e32db9a

function Page1() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleTimeChange = (time) => {
    setSelectedTime(time);
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
      center: { lat: 20.5937, lng: 78.9629 },
      zoom: 12,
    });
  };

  const ProgressBar = ({ activeStep }) => {
    const totalSteps = 15;
    const progress = (activeStep / totalSteps) * 100;

    return <LinearProgress variant="determinate" value={progress} />;
  };

  const theme = useTheme();
  const isMdBreakpoint = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ height: '55%', display: 'flex', flexDirection: isMdBreakpoint ? 'row' : 'column' }}>
        <div style={{ width: isMdBreakpoint ? '33.33%' : '100%' }}>
          <Container maxWidth="sm" style={{ padding: theme.spacing(5, 0) }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={10}>
                <Typography variant="h1" align="center" sx={{ fontWeight: 'normal', pb: 5, fontSize: '3xl' }}>
                  Report Crime
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="h4" sx={{ fontWeight: 'normal', textAlign: 'center' }}>
                  Select date
                </Typography>
              </Grid>
              <Grid item xs={10} sx={{ textAlign: 'center' }}>
                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={10}>
                <Typography variant="h4" sx={{ fontWeight: 'normal', textAlign: 'center', mt: 5 }}>
                  Select time
                </Typography>
              </Grid>
              <Grid item xs={10} sx={{ textAlign: 'center' }}>
                <TimePicker
                  label="Select Time"
                  value={selectedTime}
                  onChange={handleTimeChange}
                  renderInput={(params) => <TextField {...params} />}
                  ampm={false}
                />
              </Grid>
            </Grid>
          </Container>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', background: '#f6e05e', padding: '20px' }}>
            <Typography variant="h6" component="span">
              #1/15
            </Typography>
            <Divider orientation="vertical" flexItem style={{ background: '#000', margin: '0 8px' }} />
            <Typography variant="h6" component="span">
              Next
            </Typography>
          </div>
          <ProgressBar activeStep={1} />
        </div>
        <div style={{ width: isMdBreakpoint ? '66.67%' : '100%', height: isMdBreakpoint ? '100vh' : '50vh' }}>
          <div id="map" style={{ width: '100%', height: '100%', display: isMdBreakpoint ? 'block' : 'none' }}></div>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default Page1;


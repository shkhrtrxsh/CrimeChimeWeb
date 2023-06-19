import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Box,
  Divider,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { DatePicker, TimePicker, LocalizationProvider, DateTimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import NextButton from 'src/components/Button/NextButton';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from 'src/store/reducers/registerReport';
import { loadGoogleMaps } from 'src/utils/googleMap';

function Page1() {
  const {datetime} = useSelector(state=>state.reportRegister.data);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(datetime);
  // const [selectedTime, setSelectedTime] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  // const handleTimeChange = (time) => {
  //   setSelectedTime(time);
  // };

  useEffect(() => {
    loadGoogleMaps();
  }, []);

  const ProgressBar = ({ activeStep }) => {
    const totalSteps = 15;
    const progress = (activeStep / totalSteps) * 100;

    return <LinearProgress variant="determinate" value={progress} />;
  };

  const beforeNext = ()=>{
    dispatch(setPage({datetime:selectedDate}));
  }

  const theme = useTheme();
  const isMdBreakpoint = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ height: '55%', display: 'flex', flexDirection: isMdBreakpoint ? 'row' : 'column' }}>
        <div style={{ width: isMdBreakpoint ? '33.33%' : '100%' }}>
          <Container maxWidth="sm" style={{ padding: theme.spacing(5, 0) }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={10}>
              <Typography variant="h1" sx={{ textAlign: 'center' }} className="font-bold pb-2 text-3xl">
                  Report Crime
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="h4" sx={{ fontWeight: 'normal', textAlign: 'center' }}>
                  Select date and time
                </Typography>
              </Grid>
              <Grid item xs={10} sx={{ textAlign: 'center' }}>
                <DateTimePicker
                  label="Select Date and Time"
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              {/* <Grid item xs={10}>
                <Typography variant="h4" sx={{ fontWeight: 'normal', textAlign: 'center', mt: 5 }}>
                  Select time
                </Typography>
              </Grid> */}
              {/* <Grid item xs={10} sx={{ textAlign: 'center' }}>
                <TimePicker
                  label="Select Time"
                  value={selectedTime}
                  onChange={handleTimeChange}
                  renderInput={(params) => <TextField {...params} />}
                  ampm={false}
                />
              </Grid> */}
            </Grid>
          </Container>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', background: '#f6e05e', padding: '20px',  marginTop: '96px' }}>
            <Typography variant="h6" component="span">
              #1/15
            </Typography>
            <Divider orientation="vertical" flexItem style={{ background: '#000', margin: '0 8px' }} />
            <NextButton nextLink="/page2" textValue="Next" beforeNext = {beforeNext}/> 
          </div>
          <ProgressBar activeStep={1} />
        </div>
        <div style={{ width: isMdBreakpoint ? '66.67%' : '100%', height: isMdBreakpoint ? '91vh' : '0vh' }}>
          <div id="map" style={{ width: '100%', height: '100%', display: isMdBreakpoint ? 'block' : 'none' }}></div>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default Page1;




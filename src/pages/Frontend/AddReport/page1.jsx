import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { DatePicker, TimePicker, LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import NextButton from 'src/components/Button/NextButton';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from 'src/store/reducers/registerReport';
import ProgressBar from 'src/layouts/Report/ProgressBar';
import { splitISODatetime, splitLocaleDatetime } from 'src/utils/formatTime';

function Page1() {
  const {datetime} = useSelector(state=>state.reportRegister.data);
  //const {date,time} = datetime===null?{date:null,time:null}:splitLocaleDatetime()
  const dispatch = useDispatch();

  useEffect(()=>{
    if(datetime===null){
      dispatch(setPage({datetime:new Date(Date.now()).toISOString()}))
    }
  },[])

  const changeDate = (e)=>{
    const {date,time} = splitISODatetime(e);
    const newTime = datetime===null?time:splitISODatetime(e)?.time
    dispatch(setPage({datetime:date+"T"+newTime+"Z"}));
  }

  const changeTime = (e)=>{
    const {date,time} = splitISODatetime(e);
    const newDate = datetime===null?date:splitISODatetime(e)?.date
    dispatch(setPage({datetime:newDate+"T"+time+"Z"}));
  }

  const theme = useTheme();
  const dateNow = new Date(Date.now());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {/* <div style={{ height: '100%', display: 'flex', flexDirection: isMdBreakpoint ? 'row' : 'column' }}>
        <div style={{ width: isMdBreakpoint ? '33.33%' : '100%',display:'flex',flexDirection:'column' }}> */}
          <Container maxWidth="sm" style={{ padding: theme.spacing(5, 0) }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={10}>
              <Typography variant="h1" sx={{ textAlign: 'center' }} className="font-bold pb-2 text-3xl">
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
                  value={datetime}
                  onChange={changeDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>

              <Grid item xs={10}>
                <Typography variant="h4" sx={{ fontWeight: 'normal', textAlign: 'center' }}>
                  Select time
                </Typography>
              </Grid>
              <Grid item xs={10} sx={{ textAlign: 'center' }}>
                <TimePicker
                  label="Select Time"
                  value={datetime}
                  onChange={changeTime}
                  maxTime={dateNow}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </Grid>          
          </Container>
          {/* <Box sx={{flexGrow:1}}>
            <ProgressBar activeStep={1} nextLink="/report/page2"/>
          </Box> */}
        {/* </div>
        <div style={{ width: isMdBreakpoint ? '66.67%' : '100%', height: isMdBreakpoint ? '91vh' : '0vh' }}>
          <div id="map" style={{ width: '100%', height: '100%', display: isMdBreakpoint ? 'block' : 'none' }}></div>
        </div>
      </div> */}
    </LocalizationProvider>
  );
}

export default Page1;




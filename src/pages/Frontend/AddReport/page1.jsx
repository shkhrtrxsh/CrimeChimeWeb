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
  const {date_time:datetime} = useSelector(state=>state.reportRegister.data);
  //const {date,time} = datetime===null?{date:null,time:null}:splitLocaleDatetime()
  const dispatch = useDispatch();

  useEffect(()=>{
    if(datetime===null){
      dispatch(setPage({date_time:new Date(Date.now()).toISOString()}))
    }
  },[])

  const changeDate = (e)=>{
    const {date,time} = splitISODatetime(e);
    const newTime = datetime===null?time:splitISODatetime(e)?.time
    dispatch(setPage({date_time:date+"T"+newTime+"Z"}));
  }

  const changeTime = (e)=>{
    const {date,time} = splitISODatetime(e);
    const newDate = datetime===null?date:splitISODatetime(e)?.date
    dispatch(setPage({date_time:newDate+"T"+time+"Z"}));
  }

  const theme = useTheme();
  const mnTime = (date)=>{
    const dt = new Date(date);
    var newDate = new Date(
      dt.getFullYear(),
      dt.getMonth(),
      dt.getDate(),
      0,
      0,
      0,
      0
    );
    return Number(newDate);
  }
  const dateNow = new Date(Date.now());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                  maxDate={dateNow}
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
                  maxTime={mnTime(datetime)===mnTime(dateNow)?dateNow:new Date(0,0,0,23,59,59,999)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </Grid>          
          </Container>
    </LocalizationProvider>
  );
}

export default Page1;




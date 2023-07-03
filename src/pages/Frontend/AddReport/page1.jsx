import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Box,
  useMediaQuery,
  useTheme,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import { DatePicker, TimePicker, LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import NextButton from 'src/components/Button/NextButton';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from 'src/store/reducers/registerReport';
import ProgressBar from 'src/layouts/Report/ProgressBar';
import { splitISODatetime, splitLocaleDatetime } from 'src/utils/formatTime';

function Page1() {
  const { date_time: datetime } = useSelector((state) => state.reportRegister.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (datetime === null) {
      dispatch(setPage({ date_time: new Date(Date.now()).toISOString() }));
    }
  }, []);

  const changeDate = (e) => {
    const { date, time } = splitISODatetime(e);
    const newTime = datetime === null ? time : splitISODatetime(e)?.time;
    dispatch(setPage({ date_time: date + 'T' + newTime + 'Z' }));
  };

  const changeTime = (e) => {
    const selectedTime = new Date(datetime);
    const hours = selectedTime.getHours() >= 12 ? e.target.value + 12 : e.target.value;
    const minutes = selectedTime.getMinutes();
    
    selectedTime.setHours(hours);
    selectedTime.setMinutes(minutes);
    dispatch(setPage({ date_time: selectedTime.toISOString() }));
  };
  
  
  

  const theme = useTheme();
  const mnTime = (date) => {
    const dt = new Date(date);
    var newDate = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0, 0, 0, 0);
    return Number(newDate);
  };
  const dateNow = new Date(Date.now());

  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];
  const years = Array.from({ length: 2 }, (_, index) => dateNow.getFullYear() - index);

  const handleDayChange = (e) => {
    const selectedDay = e.target.value;
    const selectedDate = new Date(datetime);
    selectedDate.setDate(selectedDay);
    dispatch(setPage({ date_time: selectedDate.toISOString() }));
  };

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    const selectedDate = new Date(datetime);
    selectedDate.setMonth(selectedMonth - 1);
    dispatch(setPage({ date_time: selectedDate.toISOString() }));
  };

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    const selectedDate = new Date(datetime);
    selectedDate.setFullYear(selectedYear);
    dispatch(setPage({ date_time: selectedDate.toISOString() }));
  };

  const handleAmPmChange = (e) => {
    const selectedTime = new Date(datetime);
    const hours = selectedTime.getHours();
    let newHours = hours;
    
    if (e.target.value === 'am' && hours >= 12) {
      newHours -= 12;
    } else if (e.target.value === 'pm' && hours < 12) {
      newHours += 12;
    }
    
    selectedTime.setHours(newHours);
    dispatch(setPage({ date_time: selectedTime.toISOString() }));
  };
  
  

  const hours = Array.from({ length: 12 }, (_, index) => index + 1);
  const minutes = Array.from({ length: 60 }, (_, index) => index);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="sm" style={{ padding: theme.spacing(5, 0) }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
          <Box display="flex" alignItems="center" justifyContent="center">
              <Box borderBottom={2} borderColor={theme.palette.warning.main} style={{ marginRight: '5px', width: '20px' }} />
            <Typography variant="h1" sx={{ textAlign: 'center' }} className="font-bold pb-2 text-3xl">
              Report Crime
            </Typography>
            <Box borderBottom={2} borderColor={theme.palette.warning.main} style={{ marginLeft: '5px', width: '20px' }} />
                </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ fontWeight: 'normal', textAlign: 'center', paddingTop: '10px' }}>
              Select Date
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ textAlign: 'center' }}>
            <TextField
              select
              label="Day"
              value={new Date(datetime).getDate()}
              onChange={handleDayChange}
              fullWidth
            >
              {days.map((day) => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={3} sx={{ textAlign: 'center' }}>
            <TextField
              select
              label="Month"
              value={new Date(datetime).getMonth() + 1}
              onChange={handleMonthChange}
              fullWidth
            >
              {months.map((month) => (
                <MenuItem key={month.value} value={month.value}>
                  {month.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={3} sx={{ textAlign: 'center' }}>
            <TextField
              select
              label="Year"
              value={new Date(datetime).getFullYear()}
              onChange={handleYearChange}
              fullWidth
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} >
            <Typography variant="h4" sx={{ fontWeight: 'normal', textAlign: 'center', paddingTop: '10px' }}>
              Select Time
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ textAlign: 'center' }}>
            <TextField
              select
              label="Hour"
              value={new Date(datetime).getHours() % 12 || 12}
              onChange={changeTime}
              fullWidth
            >
              {hours.map((hour) => (
                <MenuItem key={hour} value={hour}>
                  {hour}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={3} sx={{ textAlign: 'center' }}>
  <TextField
    select
    label="Minute"
    value={new Date(datetime).getMinutes()}
    onChange={changeTime} // Update the onChange event here
    fullWidth
  >
    {minutes.map((minute) => (
      <MenuItem key={minute} value={minute}>
        {minute.toString().padStart(2, '0')}
      </MenuItem>
    ))}
  </TextField>
</Grid>
          <RadioGroup
  row
  name="ampm"
  value={new Date(datetime).getHours() >= 12 ? 'pm' : 'am'}
  onChange={handleAmPmChange}
  sx={{ display: 'flex', flexDirection: 'row', paddingLeft:'8px' }}
>
  <FormControlLabel value="am" control={<Radio />} label="AM" />
  <FormControlLabel value="pm" control={<Radio />} label="PM" />
</RadioGroup>



        </Grid>
      </Container>
    </LocalizationProvider>
  );
}

export default Page1;

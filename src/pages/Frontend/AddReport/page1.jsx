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

  const [dateValue, setDateValue] = useState(new Date(Date.now()));
  const [timeValue, setTimeValue] = useState(new Date(Date.now()));
  const [amPmValue, setAmPmValue] = useState(new Date(Date.now()).getHours() >= 12 ? 'pm' : 'am');

  const handleDayChange = (e) => {
    const selectedDay = e.target.value;
    const selectedDate = new Date(dateValue);
    selectedDate.setDate(selectedDay);
    setDateValue(selectedDate);
    changeDate(selectedDate);
  };

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    const selectedDate = new Date(dateValue);
    selectedDate.setMonth(selectedMonth - 1);
    setDateValue(selectedDate);
    changeDate(selectedDate);
  };

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    const selectedDate = new Date(dateValue);
    selectedDate.setFullYear(selectedYear);
    setDateValue(selectedDate);
    changeDate(selectedDate);
  };

  const handleHourChange = (e) => {
    const selectedHour = e.target.value;
    const selectedTime = new Date(timeValue);
    selectedTime.setHours(selectedHour);
    setTimeValue(selectedTime);
    changeTime(selectedTime);
  };

  const handleMinuteChange = (e) => {
    const selectedMinute = e.target.value;
    const selectedTime = new Date(timeValue);
    selectedTime.setMinutes(selectedMinute);
    setTimeValue(selectedTime);
    changeTime(selectedTime);
  };

  const handleAmPmChange = (e) => {
    const selectedAmPm = e.target.value;
    const selectedTime = new Date(timeValue);
    const hours = selectedTime.getHours();
    let newHours = hours;
    
    if (selectedAmPm === 'am' && hours >= 12) {
      newHours -= 12;
    } else if (selectedAmPm === 'pm' && hours < 12) {
      newHours += 12;
    }
    
    selectedTime.setHours(newHours);
    setTimeValue(selectedTime);
    changeTime(selectedTime);
  };

  const hours = Array.from({ length: 12 }, (_, index) => index + 1);
  const minutes = Array.from({ length: 60 }, (_, index) => index);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="sm" style={{ padding: theme.spacing(5, 0) }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
          <Box display="flex" alignItems="center" justifyContent="center">
  <Typography
    variant="h1"
    sx={{
      textAlign: 'center',
      borderBottom: `2px solid ${theme.palette.warning.main}`,
      paddingBottom: '2px',
    }}
    className="font-bold pb-2 text-3xl"
  >
    Report Crime
  </Typography>
</Box>
          </Grid>
  
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" justifyContent="center" paddingTop="10px">
              <Box borderBottom={2} borderColor={theme.palette.warning.main} style={{ marginRight: '5px', width: '20px' }} />
              <Typography variant="h4" sx={{ fontWeight: 'normal', textAlign: 'center', paddingTop: '5px' , paddingBottom:'5px'}}>
                Select Date
              </Typography>
              <Box borderBottom={2} borderColor={theme.palette.warning.main} style={{ marginLeft: '5px', width: '20px' }} />
            </Box>
          </Grid>
          <Grid item xs={3} sx={{ textAlign: 'center' }}>
            <TextField
              select
              label="Day"
              value={dateValue.getDate()}
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
              value={dateValue.getMonth() + 1}
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
              value={dateValue.getFullYear()}
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
          <Box style={{display:"flex", flexDirection:"column", width: '75%' }}>
            <Grid item xs={12}>
            <Box display="flex" alignItems="center" justifyContent="center" paddingTop="20px" paddingBottom="20px">
              <Box borderBottom={2} borderColor={theme.palette.warning.main} style={{ marginRight: '5px', width: '20px' }} />
              <Typography variant="h4" sx={{ fontWeight: 'normal', textAlign: 'center', paddingTop: '5px', paddingBottom:'5px' }}>
                Select Time
              </Typography>
              <Box borderBottom={2} borderColor={theme.palette.warning.main} style={{ marginLeft: '5px', width: '20px' }} />
            </Box>
          </Grid>
          <Box display="flex" flexDirection="row" width="100%">
  <Grid item xs={4} sx={{ textAlign: 'center', width: '100%' }}>
    <TextField
      select
      label="Hour"
      value={timeValue.getHours() % 12 || 12}
      onChange={handleHourChange}
      fullWidth
    >
      {hours.map((hour) => (
        <MenuItem key={hour} value={hour}>
          {hour}
        </MenuItem>
      ))}
    </TextField>
  </Grid>
  <Grid item xs={4} sx={{ textAlign: 'center', width: '100%' }}>
    <TextField
      select
      label="Minute"
      value={timeValue.getMinutes()}
      onChange={handleMinuteChange}
      fullWidth
    >
      {minutes.map((minute) => (
        <MenuItem key={minute} value={minute}>
          {minute.toString().padStart(2, '0')}
        </MenuItem>
      ))}
    </TextField>
  </Grid>
  <Grid item xs={4} sx={{ textAlign: 'center', width: '100%' }}>
    <TextField
      select
      label="AM/PM"
      value={timeValue.getHours() >= 12 ? 'pm' : 'am'}
      onChange={handleAmPmChange}
      fullWidth
    >
      <MenuItem value="am">AM</MenuItem>
      <MenuItem value="pm">PM</MenuItem>
    </TextField>
  </Grid>
</Box>
          </Box>
          
        </Grid>
      </Container>
    </LocalizationProvider>
  );
}

export default Page1;


import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Box, Divider, LinearProgress, Checkbox,useMediaQuery,
  useTheme, 
  Select,
  MenuItem} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import NextButton from 'src/components/Button/NextButton';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from 'src/store/reducers/registerReport';
import { loadGoogleMaps } from 'src/utils/googleMap';
import ProgressBar from 'src/layouts/Report/ProgressBar';

function Page5() {
  const {murders:count,murders_people:value} = useSelector(state=>state.reportRegister.data);

  const dispatch = useDispatch();

  const setCount=(murders)=>dispatch(setPage({murders}));
  const setValue=(murders_people)=>dispatch(setPage({murders_people}));

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const theme = useTheme();
  const isMdBreakpoint = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Container>
            <Grid container spacing={2} justifyContent="center" sx={{ paddingTop: '40px' }}>
              <Grid item xs={10} >
              <Typography variant="h1" align="center" style={{ fontWeight: 'bold', paddingBottom: '10px', fontSize: '24px' }}>
                  Murders/Deaths
                </Typography>
                <Typography variant="h2" align="center" style={{ fontWeight: 'bold', paddingBottom: '20px', fontSize: '12px' }}>
                  Was anyone killed?
                </Typography>
              </Grid>

              <div sx={{ paddingTop: '0px' }}>
                <Select value={value} onChange={handleChange} sx={{ paddingX: 2,marginBottom:4,width:'95%',maxWidth:'310px' }}>
                    <MenuItem value={0}>Yes</MenuItem>
                    <MenuItem value={1}>No</MenuItem>
                    <MenuItem value={3}>Unknown</MenuItem>
                </Select>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', margin: '3' }}>
                  <TextField
                    type="number"
                    sx={{ px: 1 }}
                    value={count}
                    onChange={(e)=>setCount(e.target.value)}
                    disabled={value>0}
                    InputProps={{
                      inputProps: {
                        min: 1,
                        max: 10,
                        step: 1,
                      },
                    }}
                    required
                  />
                  <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'center' }}>
                    If yes, then how many?
                  </Typography>
                </div>
              </div>
            </Grid>
          </Container>
    </LocalizationProvider>
  );
}

export default Page5;

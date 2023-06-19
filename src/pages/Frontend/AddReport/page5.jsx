import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Box, Divider, LinearProgress, Checkbox,useMediaQuery,
  useTheme, 
  Select,
  MenuItem} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import NextButton from 'src/components/Button/NextButton';
import { useDispatch, useSelector } from 'react-redux';
import { setPage5 } from 'src/store/reducers/registerReport';
import { loadGoogleMaps } from 'src/utils/googleMap';

function Page5() {
  const {murders,murders_people} = useSelector(state=>state.reportRegister.data);
  const ProgressBar = ({ activeStep }) => {
    const totalSteps = 15;
    const progress = (activeStep / totalSteps) * 100;

    return <LinearProgress variant="determinate" value={progress} sx={{ bgcolor: 'yellow.300', mt: 0.5 }} />;
  };

  const [count, setCount] = useState(murders_people);
  const [value, setValue] = useState(murders);

  const dispatch = useDispatch();

  const beforeNext = ()=>{
    dispatch(setPage5({murders:value,murders_people:count}));
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    loadGoogleMaps();
  }, []);

  const theme = useTheme();
  const isMdBreakpoint = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ display: 'flex', flexDirection: 'row', height: '55%' }}>
        <div style={{ width: isMdBreakpoint? '33.33%': '100%' }}>
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
          <div>
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'end', backgroundColor: '#FFEE58', color: 'black', padding: '12px', marginTop: '100px' }}>
              <NextButton nextLink="/page4" textValue="Back"/>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <Typography variant="h6">#5/16</Typography>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <NextButton nextLink="/page6" textValue="Next" beforeNext={beforeNext}/>
            </Box>
            <ProgressBar activeStep={5} />
          </div>
        </div>
        <div style={{ width: isMdBreakpoint ? '66.67%' : '0%', height: isMdBreakpoint ? '91vh' : '0vh' }}>
          <div id="map" style={{ width: '100%', height: '100%', display: isMdBreakpoint ? 'block' : 'none' }}></div>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default Page5;

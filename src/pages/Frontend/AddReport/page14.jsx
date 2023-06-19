import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, Divider, LinearProgress, Checkbox } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import NextButton from 'src/components/Button/NextButton';
import { useDispatch, useSelector } from 'react-redux';
import { setPage14 } from 'src/store/reducers/registerReport';
import { loadGoogleMaps } from 'src/utils/googleMap';

const Page14 = () => {
  const {various} = useSelector(state=>state.reportRegister.data);
  const dispatch = useDispatch();
  const ProgressBar = ({ activeStep }) => {
    const totalSteps = 15;
    const progress = (activeStep / totalSteps) * 100;
    return <LinearProgress variant="determinate" value={progress} sx={{ bgcolor: 'yellow.300', mt: 0.5 }} />;
  };

  const [checked, setChecked] = useState(various);

  const handleChange = (event) => {
    setChecked(event.target.value);
  };

  useEffect(() => {
    loadGoogleMaps();
  }, []);


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '55%' }}>
        <Box sx={{ pt: { xs: '10px', md: '20px' }, width: {xs:'100%',md:'33.33%' }}}>
          <Container>
            <Grid container spacing={2} justifyContent="center" sx={{ paddingY: 0 }}>
              <Grid item xs={10} className="pt-5">
              <Typography variant="h1" align="center" style={{ fontWeight: 'bold', paddingBottom: '5px', fontSize: '24px' }}>
                  Various
                </Typography>
                <Typography variant="h2" align="center" style={{ fontWeight: 'bold', paddingBottom: '20px', fontSize: '12px' }}>
                  Check all boxes that apply
                </Typography>
              </Grid>

              <Grid item xs={10} sx={{ pl: 5, pt: 0 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 2, pl: 4 }}>
                    <Checkbox checked={checked==="0"} value={0} onChange={handleChange} />
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'left' }}>
                      Crime occurred at ATM
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 2, pl: 4 }}>
                    <Checkbox checked={checked==="1"} value={1} onChange={handleChange} />
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'left' }}>
                      I believe this crime to be drug-related
                      <br />
                      <span style={{ textAlign: 'left', fontSize: '0.8rem' }}>(perpetrator involved with drugs)</span>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 2, pl: 4 }}>
                    <Checkbox checked={checked==="2"} value={2} onChange={handleChange} />
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'left' }}>
                      I believe this crime to be gang-related
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 2, pl: 4 }}>
                    <Checkbox checked={checked==="3"} value={3} onChange={handleChange} />
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'left' }}>
                      Arson was involved
                      <br />
                      <span style={{ textAlign: 'left', fontSize: '0.8rem' }}>(setting fire to a property on purpose)</span>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 2, pl: 4 }}>
                    <Checkbox checked={checked==="4"} value={4} onChange={handleChange} />
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'left' }}>
                      Vandalism was involved
                      <br />
                      <span style={{ textAlign: 'left', fontSize: '0.8rem' }}>(malicious destruction or defacement of property)</span>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 2, pl: 4 }}>
                    <Checkbox checked={checked==="5"} value={5} onChange={handleChange} />
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'left' }}>
                      Social unrest
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
          <Box>
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFEE58', color: 'black', padding: '12px', marginTop: '100px' }}>
              <NextButton nextLink="/page13" textValue="Back"/>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <Typography variant="h6">#14/16</Typography>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <NextButton nextLink="/page15" textValue="Next" beforeNext={()=>dispatch(setPage14({various:checked}))}/>
            </Box>
            <ProgressBar activeStep={14}/>
          </Box>
        </Box>
        <Box
          sx={{
            width: '66.67%',
            height: '111vh',
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Box
            id="map"
            sx={{
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default Page14;

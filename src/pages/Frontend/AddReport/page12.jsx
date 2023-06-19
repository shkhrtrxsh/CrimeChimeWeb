import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Box, Divider, LinearProgress, Checkbox, IconButton } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import NextButton from 'src/components/Button/NextButton';
import { useDispatch, useSelector } from 'react-redux';
import { setPage11, setPage12 } from 'src/store/reducers/registerReport';
import { loadGoogleMaps } from 'src/utils/googleMap';

const Page12 = () => {
  const {kidnapping,kidnapping_people} = useSelector(state=>state.reportRegister.data);
  const [value, setValue] = useState(kidnapping_people);
  const [checked, setChecked] = useState(kidnapping);  
  const dispatch = useDispatch();
  const ProgressBar = ({ activeStep }) => {
    const totalSteps = 16;
    const progress = (activeStep / totalSteps) * 100;

    return <LinearProgress variant="determinate" value={progress} sx={{ bgcolor: 'yellow.300', mt: 0.5 }} />;
  };


  const handleChange = (event) => {
    if(event.target?.checked)setChecked(event.target.value);
    else setValue(event.target.value);
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
              <Grid item xs={10}>
              <Typography variant="h1" align="center" style={{ fontWeight: 'bold', paddingBottom: '5px', fontSize: '24px' }}>
                  Kidnapping
                </Typography>
              </Grid>

              <Grid item xs={10} sx={{ pl: 5, pt: 5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 2 }}>
                    <Checkbox checked={checked==="0"} value={0} onChange={handleChange} />
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 5, textAlign: 'left' }}>
                      Does not apply
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 2 }}>
                    <Checkbox checked={checked==="1"} value={1} onChange={handleChange} />
                    <Typography variant="h6" sx={{ fontWeight: 'normal', pl:5, textAlign: 'left' }}>
                      Attempted kidnapping
                      <br />
                      <Typography variant="body2" sx={{ textAlign: 'left' }}>(unsuccessful kidnapping attempt)</Typography>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 2 }}>
                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'flex-start' }}>
                      
                      <TextField
                        type="number"
                        value={value||""}
                        inputProps={{ min: 0 }}
                        onChange={(event) => setValue(event.target.value)}
                        sx={{ width: '60px' }}
                      />
                      <Typography variant="h6" sx={{ fontWeight: 'normal', textAlign: 'left', pl: 4 }}>
                        How many were kidnapped?
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
          <Box>
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFEE58', color: 'black', padding: '12px', marginTop: '100px' }}>
              <NextButton nextLink="/page11" textValue="Back"/>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <Typography variant="h6">#12/16</Typography>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <NextButton nextLink="/page13" textValue="Next" beforeNext={()=>dispatch(setPage12({kidnapping:checked,kidnapping_people:value}))}/>
            </Box>
            <ProgressBar activeStep={9}/>
          </Box>
        </Box>
        <Box
          sx={{
            width: '66.67%',
            height: '91vh',
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

export default Page12;

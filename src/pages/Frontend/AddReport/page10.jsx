import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, Divider, LinearProgress, Checkbox, Select, MenuItem } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import NextButton from 'src/components/Button/NextButton';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from 'src/store/reducers/registerReport';
import { loadGoogleMaps } from 'src/utils/googleMap';
import ProgressBar from 'src/layouts/Report/ProgressBar';

function Page10() {
  const {burglary:checked,burglary_type:value} = useSelector(state=>state.reportRegister.data);
  const dispatch = useDispatch();

  const setChecked=(burglary)=>dispatch(setPage({burglary}));
  const setValue=(burglary_people)=>dispatch(setPage({burglary_people}));


  const handleChange = (value) => {
    setChecked(value);
  };

  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Container>
            <Grid container spacing={2} justifyContent="center" sx={{ paddingY: 0 }}>
              <Grid item xs={10} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} mt={5}>
              <Typography variant="h1" align="center" style={{ fontWeight: 'bold', paddingBottom: '5px', fontSize: '24px' }}>
                  Burglary
                </Typography>
                <Typography variant="h2" align="center" style={{ fontWeight: 'bold', paddingBottom: '20px', fontSize: '12px' }}>
                  (perpetrator enters home or business)
                </Typography>
              </Grid>

              <Box sx={{ pl: 8, }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 2 }}>
                    <Checkbox checked={checked===0} onChange={()=>handleChange(0)} />
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 5, textAlign: 'left' }}>
                      Does not apply
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 2 }}>
                    <Checkbox checked={checked===1} onChange={()=>handleChange(1)} />
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 5, textAlign: 'left' }}>
                      Attempted Burglary
                      <br />
                      <span sx={{ fontSize: 'sm' }}>(goods were not stolen)</span>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 2 }}>
                    <Checkbox checked={checked===2} onChange={()=>handleChange(2)} />
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 5, textAlign: 'left' }}>
                      Burglary
                      <br />
                      <span sx={{ fontSize: 'sm' }}>(goods were stolen)</span>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', my: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 1, pt: 3, pb: 3, textAlign: { md: 'left' } }}>
                      Select stolen goods item from the list below
                    </Typography>
                    <Select
                      value={value||"other"}
                      onChange={(e)=>setValue(e.target.value)}
                      sx={{ px: 2, width: '50%', borderRadius: 'none', height: '10' }}
                    >
                      <MenuItem value="bicycle">Bicycle</MenuItem>
                      <MenuItem value="handbag">Handbag</MenuItem>
                      <MenuItem value="watch">Watch</MenuItem>
                      <MenuItem value="jewellery">Jewellery</MenuItem>
                      <MenuItem value="phone">Phone</MenuItem>
                      <MenuItem value="credit/debit/bank-card">Credit/Debit/Bank Card</MenuItem>
                      <MenuItem value="wallet/cash">Wallet/Cash</MenuItem>
                      <MenuItem value="passport">Passport</MenuItem>
                      <MenuItem value="ID-document">ID Document</MenuItem>
                      <MenuItem value="general-documents">General Documents</MenuItem>
                      <MenuItem value="backpack">Backpack</MenuItem>
                      <MenuItem value="suitcase">Suitcase</MenuItem>
                      <MenuItem value="copper">Copper</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Container>

          
    </LocalizationProvider>
  );
}

export default Page10;

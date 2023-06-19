import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, Divider, LinearProgress, Checkbox, Select, MenuItem } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import NextButton from 'src/components/Button/NextButton';
import { useDispatch, useSelector } from 'react-redux';
import { setPage11 } from 'src/store/reducers/registerReport';
import { loadGoogleMaps } from 'src/utils/googleMap';

function Page11() {
  const {robbery,robbery_type} = useSelector(state=>state.reportRegister.data);
  const [checked, setChecked] = useState(robbery);
  const [value, setValue] = useState(robbery_type);
  const dispatch = useDispatch();

  const ProgressBar = ({ activeStep }) => {
    const totalSteps = 15;
    const progress = (activeStep / totalSteps) * 100;

    return <LinearProgress variant="determinate" value={progress} sx={{ bgcolor: 'yellow.300', mt: 0.5 }} />;
  };

  const handleChange = (v) => {
    setChecked(v);
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
              <Grid item xs={10} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
              <Typography variant="h1" align="center" style={{ fontWeight: 'bold', paddingBottom: '5px', fontSize: '24px' }}>
                  Robbery
                </Typography>
                <Typography variant="h2" align="center" style={{ fontWeight: 'bold', paddingBottom: '20px', fontSize: '12px' }}>
                (Items stolen in public area)
                </Typography>
              </Grid>

              <Box sx={{ pl: 8, pt: 5 }}>
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
                    Attempted Robbery
                      <br />
                      <span sx={{ fontSize: 'sm' }}>(goods were not stolen)</span>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 2 }}>
                    <Checkbox checked={checked===2} onChange={()=>handleChange(2)} />
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 5, textAlign: 'left' }}>
                      Robbery
                      <br />
                      <span sx={{ fontSize: 'sm' }}>(goods were stolen)</span>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', my: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 1, pt: 3, pb: 3, textAlign: { md: 'left' } }}>
                      Select stolen goods item from the list below
                    </Typography>
                    <Select
                      value={value}
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

          
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFEE58', color: 'black', padding: '12px', marginTop: '16px' }}>
              <NextButton nextLink="/page10" textValue="Back"/>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <Typography variant="h6">#11/16</Typography>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <NextButton nextLink="/page12" textValue="Next" beforeNext={()=>dispatch(setPage11({robbery:checked,robbery_type:value}))}/>
            </Box>
            <ProgressBar activeStep={9} />
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
}

export default Page11;
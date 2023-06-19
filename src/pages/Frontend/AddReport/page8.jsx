import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Divider,
  LinearProgress,
  Checkbox,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import NextButton from 'src/components/Button/NextButton';
import TypoSub from 'src/components/Typography/TypoSub';
import { useDispatch, useSelector } from 'react-redux';
import { setPage8 } from 'src/store/reducers/registerReport';
import { loadGoogleMaps } from 'src/utils/googleMap';

function Page8() {
  const {vehicle_theft} = useSelector(state=>state.reportRegister.data);
  const [value, setValue] = useState(vehicle_theft==null?4:vehicle_theft);

  const ProgressBar = ({ activeStep }) => {
    const totalSteps = 15;
    const progress = (activeStep / totalSteps) * 100;

    return <LinearProgress variant="determinate" value={progress} sx={{ bgcolor: 'yellow.300', mt: 0.5 }} />;
  };


  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    loadGoogleMaps();
  }, []);
  const dispatch = useDispatch(); 
  const fields=[
    {value:0,main:"Hijacking",sub:"occupied vehicle was stolen"},
    {value:1,main:"Attempted Hijacking",sub:"unsuccessful hijacking not stolen"},
    {value:2,main:"Vehicle Theft",sub:"unoccupied vehicle vehicle was stolen"},
    {value:3,main:"Attempted Vehicle Theft",sub:"unsuccessful vehicle theft not stolen"},
    {value:4,main:"Does Not Apply"},
  ]
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '55%' }}>
        <Box sx={{ pt: { xs: '10px', md: '20px' }, width: {xs:'100%',md:'33.33%' }}}>
          <Container>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={10} sx={{ pt: { xs: 5, md: 0 } }}>
              <Typography variant="h1" align="center" style={{ fontWeight: 'bold', paddingBottom: '5px', fontSize: '24px' }}>
                  Vehicle Theft
                </Typography>
                <Typography variant="h2" align="center" style={{ fontWeight: 'bold', paddingBottom: '20px', fontSize: '12px' }}>
                  (Excluding cash in-transit vehicles)
                </Typography>
              </Grid>

              <Box sx={{ pl: 5, pt: 0 }}>
                <div sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 4, pl: 0 }}>
                <RadioGroup
                    aria-labelledby="vehicle_theft"
                    value={value}
                    name="radio-buttons-group"
                  >
                    {fields.map((f,ind)=>{
                      return(
                        <FormControlLabel control={<Radio />} value ={f.value} key={ind} label={
                          <TypoSub mainText={f.main} subText={f.sub}/>
                        } onChange={handleChange}/>
                        )
                          })}
                      </RadioGroup>
                  </Box>
                </div>
              </Box>
            </Grid>
          </Container>

          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFEE58', color: 'black', padding: '12px', marginTop: '16px' }}>
              <NextButton nextLink="/page7" textValue="Back"/>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <Typography variant="h6">#8/16</Typography>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <NextButton nextLink="/page9" textValue="Next" beforeNext={
                ()=>dispatch(setPage8({vehicle_theft:value}))
              }/>
            </Box>
            <ProgressBar activeStep={6} />
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

export default Page8;

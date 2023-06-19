import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, Divider, LinearProgress, Select, MenuItem, TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import NextButton from 'src/components/Button/NextButton';
import { setPage9 } from 'src/store/reducers/registerReport';
import { useDispatch, useSelector } from 'react-redux';
import { loadGoogleMaps } from 'src/utils/googleMap';

function Page9() {
  const {vehicle_make,vehicle_model,vehicle_colour,vehicle_year} = useSelector(state=>state.reportRegister.data);
  const ProgressBar = ({ activeStep }) => {
    const totalSteps = 15;
    const progress = (activeStep / totalSteps) * 100;

    return <LinearProgress variant="determinate" value={progress} sx={{ bgcolor: 'yellow.300', mt: 0.5 }} />;
  };

  const [data,setData] = useState({vehicle_make,vehicle_model,vehicle_colour,vehicle_year});

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const {name,value} = event.target;
    setData({...data,[name]:value});
  };

  useEffect(() => {
    loadGoogleMaps();
  }, []);

  
  const fields = [
    {
      name:"vehicle_make",
      label:"MAKE",
    },
    {
      name:"vehicle_model",
      label:"MODEL",
    },
    {
      name:"vehicle_colour",
      label:"COLOR",
    },
    {
      name:"vehicle_year",
      label:"YEAR",
    },
  ]
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
     <Box sx={{ display: 'flex', flexDirection: 'row', height: '55%' }}>
        <Box sx={{ pt: { xs: '10px', md: '20px' }, width: {xs:'100%',md:'33.33%' }}}>
          <Container>
            <Grid container spacing={2} justifyContent="center" sx={{ paddingY: 0 }}>
              <Grid item xs={10} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h1" align="center" style={{ fontWeight: 'bold', paddingBottom: '5px', fontSize: '24px' }}>
                  Vehicle Types
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <DirectionsCarIcon sx={{ fontSize: '4rem' }} />
                </Box>
              </Grid>

              <Box sx={{ pl: 5, pt: 5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {fields.map((f,ind)=>{
                      return(
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 2 }} key={ind}>
                          <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'left',width:"93px" }}>
                            {f.label}
                          </Typography>
                          <TextField name={f.name} onChange={handleChange} value={data[f.name]} required/>
                        </Box>
                      )
                  })}
                </Box>
              </Box>
            </Grid>
          </Container>

          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFEE58', color: 'black', padding: '12px', marginTop: '16px' }}>
              <NextButton nextLink="/page8" textValue="Back"/>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <Typography variant="h6">#9/16</Typography>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <NextButton nextLink="/page10" textValue="Next" beforeNext={()=>dispatch(setPage9(data))}/>
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

export default Page9;

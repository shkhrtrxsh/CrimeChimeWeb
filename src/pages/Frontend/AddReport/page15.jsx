import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Box, Divider, LinearProgress, Button } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import NextButton from 'src/components/Button/NextButton';
import { useDispatch, useSelector } from 'react-redux';
import { setFile, setPage15 } from 'src/store/reducers/registerReport';
import { loadGoogleMaps } from 'src/utils/googleMap';

const Page15 = () => {
  const {files=null,fileName=null,description=null} = useSelector(state=>state.reportRegister.data);
  const dispatch = useDispatch();
  const [value, setValue] = useState({files,fileName,description}||{});

  const ProgressBar = ({ activeStep }) => {
    const totalSteps = 16;
    const progress = (activeStep / totalSteps) * 100;

    return <LinearProgress variant="determinate" value={progress} sx={{ bgcolor: 'yellow.300', mt: 0.5 }} />;
  };


  const handleFileChange = (event) => {
    const files = event.target.files[0];
    const fileName = files.name;
    if (files) {
      setValue({files:URL.createObjectURL(files),fileName});
    }
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
              <Grid item xs={10} sx={{ pt: 0 }}>
              <Typography variant="h1" align="center" style={{ fontWeight: 'bold', paddingBottom: '5px', fontSize: '24px' }}>
                  Media/Description
                </Typography>
              </Grid>

              <Grid item xs={10} sx={{ pl: 5, pt: 5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' ,alignItems:"center"}}>
                {value?.fileName&&<Typography>{value?.fileName}</Typography>}
                  <Box sx={{ p: 5,pt:2, display: 'flex', justifyContent: 'center' }}>
                    <input
                      accept="image/*, video/*"
                      id="file-input"
                      type="file"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="file-input">
                      <Button component="span" variant="contained" sx={{backgroundColor: '#FFEE58'}}>
                        Upload image or video
                        <input type="file" hidden />
                      </Button>
                    </label>
                  </Box>
                  <Box sx={{ p: 5, display: 'flex', justifyContent: 'center' }}>
                    <TextField label="Describe the crime.." multiline rows={8} variant="outlined" sx={{ borderRadius: 'none' }} value={value?.description||""} onChange={(e)=>setValue({...value,description:e.target.value})}/>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
          <Box>
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFEE58', color: 'black', padding: '12px', marginTop: '48px' }}>
              <NextButton nextLink="/page14" textValue="Back"/>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <Typography variant="h6">#15/16</Typography>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <NextButton nextLink="/page16" textValue="Next" beforeNext={()=>dispatch(setPage15({...value}))}/>
            </Box>
            <ProgressBar activeStep={15}/>
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

export default Page15;

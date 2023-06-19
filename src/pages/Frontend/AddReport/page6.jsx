import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Box, Divider, LinearProgress, Checkbox, IconButton,useMediaQuery,
  useTheme, 
  Select,
  MenuItem} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NextButton from 'src/components/Button/NextButton';
import { useDispatch, useSelector } from 'react-redux';
import { setPage6 } from 'src/store/reducers/registerReport';
import { loadGoogleMaps } from 'src/utils/googleMap';

const Page6 = () => {
  const {rape,rape_people} = useSelector(state=>state.reportRegister.data);
  const [value, setValue] = useState(rape);
  const dispatch = useDispatch();
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

  const [count, setCount] = useState(rape_people);
  

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '55%' }}>
        <Box sx={{ pt: { xs: '10px', md: '20px' }, flexBasis: '33.33%' }}>
          <Container>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={10} sx={{ pt: 5 }}>
              <Typography variant="h1" align="center" style={{ fontWeight: 'bold', paddingBottom: '5px', fontSize: '24px' }}>
                  Rape
                </Typography>
              </Grid>

              <Box sx={{ py: 5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'COLUMN', justifyContent: 'center', my: 4, pl: 4 }}>
                <Select value={value} onChange={handleChange} sx={{ paddingX: 2,marginBottom:4,width:'95%',maxWidth:'310px' }}>
                    <MenuItem value={0}>Does Not Apply</MenuItem>
                    <MenuItem value={1}>Attempted Rape</MenuItem>
                    <MenuItem value={2}>Rape</MenuItem>
                </Select>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', margin: '3' }}>
                  <TextField
                    type="number"
                    sx={{ px: 1 }}
                    value={count}
                    onChange={(e)=>setCount(e.target.value)}
                    disabled={value===0}
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
                    Multiple Rape
                  </Typography>
                </div>

                </Box>
              </Box>
            </Grid>
          </Container>
          
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'end', backgroundColor: '#FFEE58', color: 'black', padding: '12px', marginTop: '16px' }}>
              <NextButton nextLink="/page4" textValue="Back"/>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <Typography variant="h6">#6/16</Typography>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <NextButton nextLink="/page7" textValue="Next" beforeNext={()=>dispatch(setPage6({rape:value,rape_people:count}))}/>
            </Box>
            <ProgressBar activeStep={6} />
          
        </Box>
        <Box
      sx={{
        width: { xs: '0%', md: '66.67%' },
        height: { xs: '0vh', md: '91vh' },
      }}
    >
      <Box
        id="map"
        sx={{
          width: '100%',
          height: '100%',
          display: { xs: 'none', md: 'block' },
        }}
      />
    </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default Page6;

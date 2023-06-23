import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Box, Divider, LinearProgress, Checkbox,useMediaQuery,
  useTheme, 
  Select,
  MenuItem,
  FormControlLabel} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import NextButton from 'src/components/Button/NextButton';
import { useDispatch, useSelector } from 'react-redux';
import { setLock, setPage } from 'src/store/reducers/registerReport';
import { loadGoogleMaps } from 'src/utils/googleMap';
import ProgressBar from 'src/layouts/Report/ProgressBar';

function Page5() {
  const {murders:value,murders_people:count} = useSelector(state=>state.reportRegister.data);
  const [error,setError] = useState("");
  const dispatch = useDispatch();

  const setCount=(murders_people)=>dispatch(setPage({murders_people}));
  const setValue=(murders)=>dispatch(setPage({murders}));

  const handleChange = (event) => {
    const value=event.target.value;
    if(value==="0"){
      setCount(1);
    }else{
      dispatch(setLock(false))
      setCount(null);
    }
    setValue(value);
  };

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
              <Box sx={{ display: 'flex', flexDirection: 'COLUMN', justifyContent: 'center', my: 4, pl: 4 }}>
                <FormControlLabel
                    control={<Checkbox checked={value==="0"} value={0} onChange={handleChange} />}
                    label="Yes"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={value==="1"} value={1} onChange={handleChange} />}
                    label="No"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={value==="3"} value={3} onChange={handleChange} />}
                    label="Unknown"
                  />
                </Box>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', margin: '3' }}>
                  <TextField
                    type="number"
                    sx={{ px: 1 }}
                    value={count}
                    onChange={(e)=>{
                      const count = e.target.value;
                      if(!count||count<=0){
                        dispatch(setLock(true))
                        setError("*required")
                      }else{
                        dispatch(setLock(false))
                        setError("")
                      }
                      setCount(count)
                    }}
                    disabled={value>0}
                    InputProps={{
                      inputProps: {
                        min: 1,
                        max: 10,
                        step: 1,
                      },
                    }}
                    error={error?true:false}
                    helperText={error}
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

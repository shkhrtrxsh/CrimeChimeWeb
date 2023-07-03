import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Box,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useDispatch, useSelector } from 'react-redux';
import { setLock, setPage } from 'src/store/reducers/registerReport';
import ProgressBar from 'src/layouts/Report/ProgressBar';

const Page6 = () => {
  const {rape:value,rape_people:count} = useSelector(state=>state.reportRegister.data);
  const dispatch = useDispatch();
  const [error,setError] = useState("");

  const setValue=(rape)=>dispatch(setPage({rape}));
  const setCount=(rape_people)=>dispatch(setPage({rape_people}));


  const handleChange = (event) => {
    const value = event.target.value
    if(value==="0"){
      dispatch(setLock(false))
      setCount(null);
    }else{
      setCount(1);
    }
    setValue(value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Container>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={10} sx={{ pt: 5,mt:5 }}>
              <Typography variant="h1" align="center" style={{ fontWeight: 'bold', paddingBottom: '5px', fontSize: '24px' }}>
                  Rape
                </Typography>
              </Grid>

              <Box sx={{ py: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'COLUMN', justifyContent: 'center', my: 4, pl: 4 }}>
                <FormControlLabel
                    control={<Checkbox checked={value==="0"} value={0} onChange={handleChange} />}
                    label="Does Not Apply"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={value==="1"} value={1} onChange={handleChange} />}
                    label="Attempted Rape"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={value==="2"} value={2} onChange={handleChange} />}
                    label="Rape"
                  />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', margin: '3' }}>
                  <TextField
                    type="number"
                    sx={{ px: 1 }}
                    value={count}
                    onChange={(e)=>{
                      const count=e.target.value;
                      if(!count||count<=0){
                        dispatch(setLock(true))
                        setError("*required")
                      }else{
                        dispatch(setLock(false))
                        setError("")
                      }
                      setCount(count);
                    }
                    }
                    InputProps={{
                      inputProps: {
                        min: 1,
                        max: 10,
                        step: 1,
                      },
                    }}
                    error={error?true:false}
                    helperText={error}
                    disabled={value==="0"}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'center' }}>
                    Multiple Rape
                  </Typography>
                </div>

                </Box>
              </Box>
            </Grid>
          </Container>
          
    </LocalizationProvider>
  );
};

export default Page6;

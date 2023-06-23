import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from 'src/store/reducers/registerReport';
import ProgressBar from 'src/layouts/Report/ProgressBar';

function Page7() {
  const {assault:value,assault_people:count} = useSelector(state=>state.reportRegister.data);
  const dispatch = useDispatch();

  const setValue=(assault)=>dispatch(setPage({assault}));
  const setCount=(assault_people)=>dispatch(setPage({assault_people}));


  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Container>
            <Grid container spacing={2} justifyContent="center" sx={{ paddingY: 0 }}>
              <Grid item xs={10} sx={{ pt: 5,mt:5 }}>
              <Typography variant="h1" align="center" style={{ fontWeight: 'bold', paddingBottom: '5px', fontSize: '24px' }}>
                  Assault
                </Typography>
                <Typography variant="h2" align="center" style={{ fontWeight: 'bold', paddingBottom: '20px', fontSize: '12px' }}>
                  (injuries due to violence)
                </Typography>
              </Grid>


              <Box sx={{ py: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'COLUMN', justifyContent: 'center', my: 4, pl: 4 }}>
                <FormControlLabel
                    control={<Checkbox checked={value==="0"} value={0} onChange={handleChange} />}
                    label="Unknown"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={value==="1"} value={1} onChange={handleChange} />}
                    label="Yes"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={value==="2"} value={2} onChange={handleChange} />}
                    label="No"
                  />
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
                    If so, How many were Assaulted
                  </Typography>
                </div>

                </Box>
              </Box>
            </Grid>
          </Container>
    </LocalizationProvider>
  );
}

export default Page7;


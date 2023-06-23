import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Box,
  Divider,
  LinearProgress,
  Checkbox,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import PeopleIcon from '@mui/icons-material/People';
import NextButton from 'src/components/Button/NextButton';
import { useDispatch, useSelector } from 'react-redux';
import { setLock, setPage, setPage3 } from 'src/store/reducers/registerReport';
import { loadGoogleMaps } from 'src/utils/googleMap';
import ProgressBar from 'src/layouts/Report/ProgressBar';

function Page3() {
  const {perpetrators,perpetrators_des} = useSelector(state=>state.reportRegister.data);
  const [checked, setChecked] = useState(perpetrators<=0)
  const [error,setError] = useState("")
  const dispatch = useDispatch();

  const handleTextChange = (event)=>{
    const {name,value} = event.target;
    dispatch(setPage({[name]:value}));
    if(value&&value>0){
      setError("");
      dispatch(setLock(false));
    }else{
      setError("*required");
      dispatch(setLock(true));
    }
  }

  const handleChange = (event) => {
    const checked = event.target.checked;
    if(checked){
      setError("");
      dispatch(setLock(false));
    }
    dispatch(setPage({perpetrators:checked?-1:1}));
    setChecked(checked)
  };
  const theme = useTheme();
  const isMdBreakpoint = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Container maxWidth="sm">
            <Grid container spacing={2} justifyContent="center" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
              <Grid item xs={10}>
                <Typography variant="h1" align="center" style={{ fontWeight: 'bold', paddingBottom: '10px', fontSize: '24px' }}>
                  Perpetrators
                </Typography>
                <Typography variant="h2" align="center" style={{ fontWeight: 'bold', paddingBottom: '20px', fontSize: '12px' }}>
                  (persons who committed the crime)
                </Typography>
              </Grid>

              <div>
                <Typography id="number-picker-label" style={{ paddingBottom: '16px', textAlign: 'center', fontSize: '16px' }}>
                  How many perpetrators?
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'row' }}>

                  <TextField
                    type="number"
                    name="perpetrators"
                    value={perpetrators<0?"":perpetrators}
                    onChange={handleTextChange}
                    disabled={checked}
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

                  <Typography style={{ marginLeft: '8px', marginRight: '8px', display: 'flex', alignItems: 'center' }}>OR</Typography>

                  <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />

                  <Typography style={{ display: 'flex',alignItems: 'center' }}>Unknown</Typography>

                  <Checkbox checked={checked===true} value={perpetrators} onChange={handleChange} />

                </div>
              </div>

              <Grid item xs={10} style={{ display: 'flex', justifyContent: 'center' }}>

                <PeopleIcon style={{ height: '112px', width: '112px' }} />

              </Grid>
              <Grid item xs={10} style={{ textAlign: 'center' }}>

                <TextField
                  label="Describe their appearance.."
                  name="perpetrator_des"
                  multiline
                  rows={4}
                  value={perpetrators_des||""}
                  onChange = {(e)=>dispatch(setPage({perpetrators_des:e.target.value}))}
                  variant="outlined"
                  style={{ width: '100%' }}
                />
                
              </Grid>
            </Grid>
          </Container>
          
    </LocalizationProvider>
  );
}

export default Page3;



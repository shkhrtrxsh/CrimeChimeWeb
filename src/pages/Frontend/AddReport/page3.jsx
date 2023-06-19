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
import { setPage3 } from 'src/store/reducers/registerReport';
import { loadGoogleMaps } from 'src/utils/googleMap';

function Page3() {
  const {perpetrators,perpetrators_des} = useSelector(state=>state.reportRegister.data);
  const dispatch = useDispatch();
  const ProgressBar = ({ activeStep }) => {
    const totalSteps = 15;
    const progress = (activeStep / totalSteps) * 100;

    return <LinearProgress variant="determinate" value={progress} sx={{ bgcolor: 'yellow.300', mt: 0.5 }} />;
  };

  
  const [value, setValue] = useState(perpetrators);
  const [description, setDescription] = useState(perpetrators_des||"");
  const [checked, setChecked] = useState(perpetrators===null?true:false);
  const handleTextChange = (event)=>{
    setValue(event.target.value);
  }

  const handleChange = (event) => {
    const checked = event.target.checked;
    setChecked(checked);
  };
  const theme = useTheme();
  const isMdBreakpoint = useMediaQuery(theme.breakpoints.up('md'));
  useEffect(() => {
    loadGoogleMaps();
  }, []);

  const beforeNext = ()=>{
    dispatch(setPage3({perpetrators:value,perpetrators_des:description}));
  }


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ height: '55%', display: 'flex', flexDirection: isMdBreakpoint ? 'row' : 'col'}}>
        <div style={{width: isMdBreakpoint ? '33.33%':'100%'}}>
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
                    value={value||""}
                    onChange={handleTextChange}
                    disabled={checked}
                    InputProps={{
                      inputProps: {
                        min: 1,
                        max: 10,
                        step: 1,
                      },
                    }}
                    required
                  />
                  <Typography style={{ marginLeft: '8px', marginRight: '8px', display: 'flex', alignItems: 'center' }}>OR</Typography>
                  <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
                  <Typography style={{ display: 'flex',alignItems: 'center' }}>Unknown</Typography>
                  <Checkbox checked={checked} onChange={handleChange} />
                </div>
              </div>

              <Grid item xs={10} style={{ display: 'flex', justifyContent: 'center' }}>
                <PeopleIcon style={{ height: '112px', width: '112px' }} />
              </Grid>
              <Grid item xs={10} style={{ textAlign: 'center' }}>
                <TextField
                  label="Describe their appearance.."
                  multiline
                  rows={4}
                  value={description}
                  onChange = {(e)=>setDescription(e.target.value)}
                  variant="outlined"
                  style={{ width: '100%' }}
                />
              </Grid>
            </Grid>
          </Container>
          <div>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'end', backgroundColor: '#FFEE58', color: 'black', padding: '12px', marginTop: '64px' }}>
              <NextButton nextLink="/page2" textValue="Back"/>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <Typography variant="h6">#3/16</Typography>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <NextButton nextLink="/page4" textValue="Next" beforeNext={beforeNext}/>
            </Box>
            <ProgressBar activeStep={3} />
          </div>
        </div>
        <div style={{ width: isMdBreakpoint ? '66.67%' : '0%', height: isMdBreakpoint ? '91vh' : '0vh' }}>
          <div id="map" style={{ width: '100%', height: '100%', display: isMdBreakpoint ? 'block' : 'none' }}></div>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default Page3;



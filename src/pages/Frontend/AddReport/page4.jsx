import React, { useState, useEffect, useRef} from 'react';
import { Container, Typography, Grid, Box , Divider, LinearProgress, Checkbox, Select, MenuItem,useMediaQuery,
  useTheme,
  TextField, } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ak from '../../../assets/images/ak.png'
import pistol from '../../../assets/images/pistol.png'
import knife from '../../../assets/images/knife.png'
import others from '../../../assets/images/others.png'
import NextButton from 'src/components/Button/NextButton';
import { useDispatch, useSelector } from 'react-redux';
import { setPage4 } from 'src/store/reducers/registerReport';
import { loadGoogleMaps } from 'src/utils/googleMap';

function Page4() {
  const {weapons,fully_auto_weapons,semi_auto_weapons,knife_weapons,other_weapons,} = useSelector(state=>state.reportRegister.data);
  const dispatch = useDispatch();
  const ProgressBar = ({ activeStep }) => {
    const totalSteps = 15;
    const progress = (activeStep / totalSteps) * 100;
  
    return <LinearProgress variant="determinate" value={progress} sx={{ bgcolor: 'yellow.300', mt: 0.5 }} />;
  };
  const [value, setValue] = useState(weapons);
  const [weaponCount,setWeaponCount] = useState({fully_auto_weapons,semi_auto_weapons,knife_weapons,other_weapons});

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleCount = (e)=>{
    const {name,value} = e.target;
    setWeaponCount({...weaponCount,[name]:value});
  }
  useEffect(() => {
    loadGoogleMaps();
  }, []);

  const theme = useTheme();
  const isMdBreakpoint = useMediaQuery(theme.breakpoints.up('md'));

    const fields=[
      {
        name:"fully_auto_weapons",
        label:(
          <>
            Fully automatic<br />
            <span style={{ fontSize: 'sm', textAlign: 'left' }}>(machine gun, assault rifle)</span>
          </>
        ),
        imageSrc:ak,
        imageAlt:"Fully automatic(machine gun, assault rifle)",
      },
      {
        name:"semi_auto_weapons",
        label:(
          <>
            Semi automatic<br />
            <span style={{ fontSize: 'sm', textAlign: 'left' }}>(pistol, handgun)</span>
          </>
        ),
        imageSrc:pistol,
        imageAlt:"Semi automatic(pistol, handgun)",
      },
      { 
        name:"knife_weapons",
        label:"Knife",
        imageSrc:knife,
        imageAlt:"Knife",
      },
      {
        name:"other_weapons",
        label:"Others",
        imageSrc:others,
        imageAlt:"Others",
      },
    ]

    const beforeNext = ()=>{
      if(value>=0){
        dispatch(setPage4({weapons:value}));
      }else{
        dispatch(setPage4({weapons:value,...weaponCount}));
      }
    }

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ display: 'flex', flexDirection: 'row', height: '55%' }}>
        <div style={{ width: isMdBreakpoint? '33.33%': '100%' }}>
          <Container>
            <Grid container spacing={2} justifyContent="center" sx={{ paddingTop: '40px' }}>
              <Grid item xs={10} sx={{paddingBottom: '20px'}}>
              <Typography variant="h1" align="center" style={{ fontWeight: 'bold', paddingBottom: '10px', fontSize: '24px' }}>
                  Weapons
                </Typography>
                <Typography variant="h2" align="center" style={{ fontWeight: 'bold', paddingBottom: '20px', fontSize: '12px' }}>
                  Perpetrator(s) had weapon(s)?
                </Typography>
              </Grid>
              <div>
                <Select value={value} onChange={handleChange} sx={{ paddingX: 2,marginBottom:4,width:'95%',maxWidth:'310px' }}>
                    <MenuItem value={-1}>Perpetrator used weapons</MenuItem>
                    <MenuItem value={1}>Perpetrator didn't use weapon</MenuItem>
                    <MenuItem value={0}>Unknown</MenuItem>
                </Select>
                {fields.map((f,ind)=>{
                  return(
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', margin: '3',width:"100%" }} key={ind}>
                    <TextField type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} id="outlined-basic" variant="outlined" sx={{width:"80px"}} margin="normal" disabled={value>=0} onChange={handleCount} name={f.name} value={weaponCount[f.name]||""}/>
                    <Typography variant="h6" sx={{ fontWeight: 'normal', paddingX: 2, textAlign: 'left' }}>
                      {f.label}
                    </Typography>
                    <img src={f.imageSrc} style={{ width: '40px', height: '40px' }} alt={f.imageAlt} />
                  </div>
                  )
                })}
                
               
              </div>
            </Grid>
          </Container>
          <div>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'end', backgroundColor: '#FFEE58', color: 'black', padding: '12px', marginTop: '64px' }}>
              <NextButton nextLink="/page3" textValue="Back"/>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <Typography variant="h6">#3/16</Typography>
              <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
              <NextButton nextLink="/page5" textValue="Next" beforeNext={beforeNext}/>
            </Box>
            <ProgressBar activeStep={4} />
          </div>
        </div>
        <div style={{ width: isMdBreakpoint ? '66.67%' : '0%', height: isMdBreakpoint ? '91vh' : '0vh' }}>
          <div id="map" style={{ width: '100%', height: '100%', display: isMdBreakpoint ? 'block' : 'none' }}></div>
        </div>
      </div>
    </LocalizationProvider>
      
    )};

export default Page4
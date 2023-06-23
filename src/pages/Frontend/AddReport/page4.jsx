import React, { useState, useEffect, useRef} from 'react';
import { Container, Typography, Grid, Box , Divider, LinearProgress, Checkbox, Select, MenuItem,useMediaQuery,
  useTheme,
  TextField, } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ak from '../../../assets/images/ak.png'
import pistol from '../../../assets/images/pistol.jpg'
import knife from '../../../assets/images/knife.png'
import others from '../../../assets/images/others.png'
import NextButton from 'src/components/Button/NextButton';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, setPage4 } from 'src/store/reducers/registerReport';
import { loadGoogleMaps } from 'src/utils/googleMap';
import ProgressBar from 'src/layouts/Report/ProgressBar';

function Page4() {
  const data = useSelector(state=>state.reportRegister.data);
  const {weapons,fully_auto_weapons,semi_auto_weapons,knife_weapons,other_weapons}=data;
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setPage({weapons:event.target.value}));
  };
  const handleCount = (e)=>{
    const {name,value} = e.target;
    dispatch(setPage({[name]:value}));
  }
  
  const theme = useTheme();
  const isMdBreakpoint = useMediaQuery(theme.breakpoints.up('md'));

    const fields=[
      {
        name:"fully_auto_weapons",
        label:(
          <>
            Fully automatic<br />
            <span style={{ fontSize: '14px', textAlign: 'left' }}>(machine gun, assault rifle)</span>
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
            <span style={{ fontSize: '14px', textAlign: 'left' }}>(pistol, handgun)</span>
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

    

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                <Select value={weapons} onChange={handleChange} sx={{ paddingX: 2,marginBottom:4,width:'95%',maxWidth:'310px' }}>
                    <MenuItem value={-1}>Perpetrator used weapons</MenuItem>
                    <MenuItem value={1}>Perpetrator didn't use weapon</MenuItem>
                    <MenuItem value={0}>Unknown</MenuItem>
                </Select>
                {fields.map((f,ind)=>{
                  return(
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', margin: '3',width:"100%" }} key={ind}>
                    <TextField type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} id="outlined-basic" variant="outlined" sx={{width:"80px"}} margin="normal" disabled={weapons>=0} onChange={handleCount} name={f.name} value={data[f.name]||""}/>
                    <Typography sx={{ fontWeight: 'normal',fontSize:'16px', paddingX: 2, textAlign: 'left' }}>
                      {f.label}
                    </Typography>
                    <img src={f.imageSrc} style={{ width: '40px', height: '40px' }} alt={f.imageAlt} />
                  </div>
                  )
                })}
                
               
              </div>
            </Grid>
          </Container>
    </LocalizationProvider>
      
    )};

export default Page4
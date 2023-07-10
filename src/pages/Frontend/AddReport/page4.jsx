import React, { useState, useEffect, useRef} from 'react';
import { Container, Typography, Grid, Box , Divider, LinearProgress, Checkbox, Select, MenuItem,useMediaQuery,
  useTheme,
  TextField,
  FormHelperText, } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import ak from '../../../assets/images/ak.png'
import pistol from '../../../assets/images/pistol.png'
import knife from '../../../assets/images/knife.png'
import others from '../../../assets/images/others.png'
import NextButton from 'src/components/Button/NextButton';
import { useDispatch, useSelector } from 'react-redux';
import { setLock, setPage } from 'src/store/reducers/registerReport';
import { loadGoogleMaps } from 'src/utils/googleMap';
import ProgressBar from 'src/layouts/Report/ProgressBar';

function Page4() {
  const data = useSelector(state=>state.reportRegister.data);
  const {weapons,fully_auto_weapons,semi_auto_weapons,knife_weapons,other_weapons}=data;
  const [error, setError] = useState("")
  const dispatch = useDispatch();

  useEffect(()=>{
    const weaponSum=fully_auto_weapons+semi_auto_weapons+knife_weapons+other_weapons;
    if(weaponSum<=0&&weapons===-1){
      setError("*Weapons count should be atleast one");
      dispatch(setLock(true));
    }else{
      setError("");
      dispatch(setLock(false));
    }
  },[weapons,fully_auto_weapons,semi_auto_weapons,knife_weapons,other_weapons])

  const handleChange = (event) => {
    dispatch(setPage({weapons:event.target.value}));
  };
  const handleCount = (e)=>{
    const {name,value} = e.target;
    dispatch(setPage({[name]:value}));
  }
  
  const theme = useTheme();
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
        imageStyle:{width:"60px",height:"auto"}
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
        imageStyle: { width: "40px", height: "40px", transform: "scaleX(-1)" }
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
            <Grid item xs={10} sx={{ paddingBottom: '20px' }}>
  <Box display="flex" alignItems="center" justifyContent="center">
    <Box borderBottom={2} borderColor={theme.palette.warning.main} style={{ marginRight: '5px', width: '20px' }} />
    <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '24px', textAlign: 'center' }}>
    Weapons
  </Typography>
    <Box borderBottom={2} borderColor={theme.palette.warning.main} style={{ marginLeft: '5px', width: '20px' }} />
  </Box>
  <Typography variant="h2" align="center" style={{ fontWeight: 'bold', paddingBottom: '20px', fontSize: '12px' }}>
    Perpetrator(s) had weapon(s)?
  </Typography>
</Grid>
              <Box paddingLeft="40px">
                <Select value={weapons} onChange={handleChange} sx={{ paddingX: 2,width:'95%',maxWidth:'310px' }} error={error?true:false}>
                    <MenuItem value={-1}>Perpetrator used weapons</MenuItem>
                    <MenuItem value={1}>Perpetrator didn't use weapon</MenuItem>
                    <MenuItem value={0}>Unknown</MenuItem>
                </Select>
                {error&&<FormHelperText sx={{color:'red',ml:2}}>{error}</FormHelperText>}
                <Box component={"ul"} sx={{mt:4}}>
                  {fields.map((f,ind)=>{
                    return(
                    <li style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', margin: '3',width:"100%" }} key={ind}>
                      <TextField type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} id="outlined-basic" variant="outlined" sx={{width:"80px"}} margin="normal" disabled={weapons>=0} onChange={handleCount} name={f.name} value={data[f.name]||""}/>
                      <Typography sx={{ fontWeight: 'normal',fontSize:'16px', paddingX: 2, textAlign: 'left' }}>
                        {f.label}
                      </Typography>
                      <img src={f.imageSrc} style={{ width: '40px', height: '40px',...f.imageStyle }} alt={f.imageAlt} />
                    </li>
                    )
                  })}
                </Box>
                
               
              </Box>
            </Grid>
          </Container>
    </LocalizationProvider>
      
    )};

export default Page4
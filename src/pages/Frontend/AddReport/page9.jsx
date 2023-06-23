import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, Divider, LinearProgress, Select, MenuItem, TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useDispatch, useSelector } from 'react-redux';
import { loadGoogleMaps } from 'src/utils/googleMap';
import ProgressBar from 'src/layouts/Report/ProgressBar';
import { setLock, setPage } from 'src/store/reducers/registerReport';

function Page9() {
  const data = useSelector(state=>state.reportRegister.data);
  const {vehicle_make,vehicle_model,vehicle_colour,vehicle_year} = data;
  const dispatch = useDispatch();
  const [error,setError]=useState((initialState={})=>initialState);

  const required=(name,value)=>{
    console.log({...error,[name]:"*required"})
    if(value){
      setError((prev)=>({...prev,[name]:""}));
      dispatch(setLock(true));
    }else{
      console.log(error)
      setError((prev)=>({...prev,[name]:"*required"}));
    }
  }
  const fields = [
    {
      name:"vehicle_make",
      label:"MAKE",
    },
    {
      name:"vehicle_model",
      label:"MODEL",
    },
    {
      name:"vehicle_colour",
      label:"COLOR",
    },
    {
      name:"vehicle_year",
      label:"YEAR",
    },
  ]
  useEffect(() => {
    let flag=1;
    fields.forEach(({name})=>{
      const value=data[name]||null;
      if(value===""||value===null)flag=0;
      required(name,value);
    })
    if(flag===1)dispatch(setLock(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicle_make,vehicle_model,vehicle_colour,vehicle_year])
  
  const handleChange = (event) => {
    const {name,value} = event.target;
    dispatch(setPage({[name]:value}));
  };

  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Container>
            <Grid container spacing={2} justifyContent="center" sx={{ paddingY: 0 }}>
              <Grid item xs={10} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',mt:5 }}>
              <Typography variant="h1" align="center" style={{ fontWeight: 'bold', paddingBottom: '5px', fontSize: '24px' }}>
                  Vehicle Types
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <DirectionsCarIcon sx={{ fontSize: '4rem' }} />
                </Box>
              </Grid>

              <Box sx={{ pl: 5, pt: 5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {fields.map((f,ind)=>{
                      return(
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 2 }} key={ind}>
                          <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'left',width:"93px" }}>
                            {f.label}
                          </Typography>
                          <TextField name={f.name} onChange={handleChange} value={data[f.name]||""} 
                            error={error[f.name]?true:false} helperText={error[f.name]||""}
                          />
                        </Box>
                      )
                  })}
                </Box>
              </Box>
            </Grid>
          </Container>

    </LocalizationProvider>
  );
}

export default Page9;

import React, { useState, useEffect } from 'react';
import { Container,useTheme,  Typography, Grid, Box, Divider, LinearProgress, Select, MenuItem, TextField, Autocomplete } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useDispatch, useSelector } from 'react-redux';
import { loadGoogleMaps } from 'src/utils/googleMap';
import ProgressBar from 'src/layouts/Report/ProgressBar';
import { setLock, setPage } from 'src/store/reducers/registerReport';
import make from "src/car_makes.json";
import colors from "src/car_colors.json";
import axios from 'axios';


function Page9() {
  const data = useSelector(state=>state.reportRegister.data);
  const car_makes = make.data;
  const {vehicle_make,vehicle_model,vehicle_colour,vehicle_year} = data;
  const dispatch = useDispatch();
  const [error,setError]=useState((initialState={})=>initialState);
  const theme = useTheme();
  var currentYear = new Date().getFullYear();
  const [car_models,setCarModels]=useState([]);
  const car_colors=colors.data;
  const car_years=[...Array(currentYear - 1949)].map((_, i) => String(currentYear - i));

  const required=(name,value)=>{
    if(value){
      setError((prev)=>({...prev,[name]:""}));
      dispatch(setLock(true));
    }else{
      setError((prev)=>({...prev,[name]:"*required"}));
    }
  }
  const fields = [
    {
      name:"vehicle_make",
      label:"MAKE",
      options:car_makes
    },
    {
      name:"vehicle_model",
      label:"MODEL",
      options:car_models
    },
    {
      name:"vehicle_colour",
      label:"COLOR",
      options:car_colors
    },
    {
      name:"vehicle_year",
      label:"YEAR",
      options:car_years
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
  
  const handleChange = async(id,newValue) => {
    dispatch(setPage({[id]:newValue}));
    if(id==="vehicle_make"){
      //clear vehicle make
      dispatch(setPage({vehicle_model:""}))
      //get list of vehicle models
      try {
        const res = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${newValue}?format=json`)
        const result = res.data.Results;
        setCarModels(result.map((data)=>{
          return data.Model_Name;
        }))
      } catch (error) {
        console.error(error);
      }
    }
  };

  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Container>
            <Grid container spacing={2} justifyContent="center" sx={{ paddingY: 0 }}>
              <Grid item xs={10} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',mt:5 }}>
              <Box display="flex" alignItems="center" justifyContent="center">
              <Box borderBottom={2} borderColor={theme.palette.warning.main} style={{ marginRight: '5px', width: '20px' }} />
              <Typography variant="h4" align="center" style={{ fontWeight: 'bold', paddingBottom: '5px', fontSize: '24px' }}>
                  Vehicle Types
                </Typography>
                <Box borderBottom={2} borderColor={theme.palette.warning.main} style={{ marginLeft: '5px', width: '20px' }} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <DirectionsCarIcon sx={{ fontSize: '4rem' }} />
                </Box>
              </Grid>

              <Box sx={{ pl: 5, pt: 5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {fields.map((f,ind)=>{
                      return(
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 2,justifyContent:'center' }} key={ind}>
                          <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'left',width:"93px" }}>
                            {f.label}
                          </Typography>
                          <Autocomplete
                            id={f.name}
                            onChange={(_,newValue)=>handleChange(f.name,newValue)}
                            value={data[f.name]||""}
                            inputValue={data[f.name]||""}
                            options={f?.options||[]}
                            renderInput={(params) => 
                              <TextField sx={{width:200}} {...params} name={f.name} error={error[f.name]?true:false} helperText={error[f.name]||""}
                            />
                            }
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

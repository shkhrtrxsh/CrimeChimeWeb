import React, { useEffect, useState } from 'react';
import { Container, useTheme, Typography, Grid, Box, Select, MenuItem, TextField, Autocomplete } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from 'src/store/reducers/registerReport';
import make from "src/car_makes.json";
import colors from "src/car_colors.json";
import axios from 'axios';

function Page9() {
  const data = useSelector(state => state.reportRegister.data);
  const car_makes = make.data;
  const { vehicle_make, vehicle_model, vehicle_colour, vehicle_year } = data;
  const dispatch = useDispatch();
  const theme = useTheme();
  var currentYear = new Date().getFullYear();
  const [car_models, setCarModels] = useState([]);
  const car_colors = colors.data;
  const car_years = [...Array(currentYear - 1949)].map((_, i) => String(currentYear - i));

  const fields = [
    {
      name: "vehicle_colour",
      label: "COLOR",
      options: car_colors
    },
    {
      name: "vehicle_make",
      label: "MAKE",
      options: car_makes
    },
    {
      name: "vehicle_model",
      label: "MODEL",
      options: car_models
    },
    {
      name: "vehicle_year",
      label: "YEAR",
      options: car_years
    },
  ];

  useEffect(() => {
    dispatch(setPage({}));

    if (vehicle_make) {
      //get list of vehicle models
      axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${vehicle_make}?format=json`)
        .then(res => {
          const result = res.data.Results;
          setCarModels(result.map(data => data.Model_Name));
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [vehicle_make, dispatch]);

  const handleChange = (id, newValue) => {
    dispatch(setPage({ [id]: newValue }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container>
        <Grid container spacing={2} justifyContent="center" sx={{ paddingY: 0 }}>
          <Grid item xs={10} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
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
              {fields.map((f, ind) => {
                return (
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 2, justifyContent: 'center' }} key={ind}>
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'left', width: '93px' }}>
                      {f.label}
                    </Typography>
                    <Autocomplete
                      id={f.name}
                      onChange={(_, newValue) => handleChange(f.name, newValue)}
                      value={data[f.name] || ""}
                      inputValue={data[f.name] || ""}
                      options={f?.options || []}
                      renderInput={(params) =>
                        <TextField sx={{ width: 200 }} {...params} name={f.name} />
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


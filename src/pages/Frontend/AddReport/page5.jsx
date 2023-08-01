import { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Checkbox,
  Select,
  MenuItem,
  FormControlLabel,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useDispatch, useSelector } from 'react-redux';
import { setLock, setPage } from 'src/store/reducers/registerReport';

function Page5() {
  const { murders: value, murders_people: count } = useSelector((state) => state.reportRegister.data);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const setCount = (murders_people) => dispatch(setPage({ murders_people }));
  const setValue = (murders) => dispatch(setPage({ murders }));

  const handleChange = (event) => {
    const value = Number(event.target.value);
    if (value === 0) {
      setCount(1);
    } else {
      dispatch(setLock(false));
      setCount(null);
    }
    setValue(value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container>
        <Grid container spacing={2} justifyContent="center" sx={{ paddingTop: '40px' }}>
          <Grid item xs={10}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Box
                borderBottom={2}
                borderColor="warning.main"
                style={{ marginRight: '5px', width: '20px' }}
              />
              <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '24px', textAlign: 'center' }}>
                Murders/Deaths
              </Typography>
              <Box
                borderBottom={2}
                borderColor="warning.main"
                style={{ marginLeft: '5px', width: '20px' }}
              />
            </Box>
            <Typography
              variant="h2"
              align="center"
              style={{ fontWeight: 'bold', paddingBottom: '20px', fontSize: '12px' }}
            >
              Was anyone killed?
            </Typography>
          </Grid>

          <div>
          <Typography
              variant="h2"
              align="center"
              style={{ fontWeight: 'normal', paddingBottom: '0px', fontSize: '15px', paddingLeft: '5px', paddingTop: '20px' }}
            >
              Select any one
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', my: 3, pl: 1}}>
               <FormControlLabel
                control={<Checkbox checked={value === 3} value={3} onChange={handleChange} />}
                label="Unknown"
                sx={{ paddingTop: '10px' }}
              />
              <FormControlLabel
                control={<Checkbox checked={value === 1} value={1} onChange={handleChange} />}
                label="No"
                sx={{ paddingTop: '20px', paddingBottom: '20px' }}
              />
             <FormControlLabel
                control={<Checkbox checked={value === 0} value={0} onChange={handleChange} />}
                label="Yes"
                sx={{ paddingBottom: '20px' }}
              />
            </Box>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', }}>
              <Select
                value={count || ''}
                onChange={(e) => {
                  const count = e.target.value;
                  if (!count || count <= 0) {
                    dispatch(setLock(true));
                    setError('*required');
                  } else {
                    dispatch(setLock(false));
                    setError('');
                  }
                  setCount(count);
                }}
                disabled={value > 0}
                error={error ? true : false}
              >
                {Array.from({ length: 30 }, (_, index) => (
                  <MenuItem key={index} value={index + 1}>{index + 1}</MenuItem>
                ))}
              </Select>
              <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'center' }}>
                If yes, then how many?
              </Typography>
            </div>
          </div>
        </Grid>
      </Container>
    </LocalizationProvider>
  );
}

export default Page5;


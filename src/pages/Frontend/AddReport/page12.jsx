import { Container, Typography, Grid, TextField, Box ,Checkbox} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { useDispatch, useSelector } from 'react-redux';
import { setPage} from 'src/store/reducers/registerReport';
import ProgressBar from 'src/layouts/Report/ProgressBar';

const Page12 = () => {
  const {kidnapping:checked,kidnapping_people:value} = useSelector(state=>state.reportRegister.data);
  const dispatch = useDispatch();

  const setChecked=(kidnapping)=>dispatch(setPage({kidnapping}));
  const setValue=(kidnapping_people)=>dispatch(setPage({kidnapping_people}));

  const handleChange = (event) => {
    if(event.target?.checked)setChecked(event.target.value);
    else setValue(event.target.value);
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Container>
            <Grid container spacing={2} justifyContent="center" sx={{ paddingY: 0 }} mt={5}>
              <Grid item xs={10}>
              <Typography variant="h1" align="center" style={{ fontWeight: 'bold', paddingBottom: '5px', fontSize: '24px' }}>
                  Kidnapping
                </Typography>
              </Grid>

              <Grid item xs={10} sx={{ pl: 5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 2 }}>
                    <Checkbox checked={checked==="0"} value={0} onChange={handleChange} />
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 5, textAlign: 'left' }}>
                      Does not apply
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 2 }}>
                    <Checkbox checked={checked==="1"} value={1} onChange={handleChange} />
                    <Typography variant="h6" sx={{ fontWeight: 'normal', pl:5, textAlign: 'left' }}>
                      Attempted kidnapping
                      <br />
                      <Typography variant="body2" sx={{ textAlign: 'left' }}>(unsuccessful kidnapping attempt)</Typography>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 2 }}>
                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'flex-start' }}>
                      
                      <TextField
                        type="number"
                        value={value||""}
                        inputProps={{ min: 0 }}
                        onChange={(event) => setValue(event.target.value)}
                        sx={{ width: '60px' }}
                      />
                      <Typography variant="h6" sx={{ fontWeight: 'normal', textAlign: 'left', pl: 4 }}>
                        How many were kidnapped?
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
    </LocalizationProvider>
  );
};

export default Page12;

import { Container, Typography,useTheme, Grid, Box, Checkbox } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useDispatch, useSelector } from 'react-redux';
import { setPage} from 'src/store/reducers/registerReport';

const Page14 = () => {
  const {various:checked=[]} = useSelector(state=>state.reportRegister.data);
  const dispatch = useDispatch();

  const setChecked = (various)=> dispatch(setPage({various}))
  const theme = useTheme();
  const handleChange = (event) => {
    if(!event.target.checked){
      const removedChecked = checked.filter((d)=>d!==event.target.value);
      setChecked(removedChecked)
    }
    else{
      setChecked([...checked,event.target.value]);
    }
  };



  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Container>
            <Grid container spacing={2} justifyContent="center" sx={{ paddingY: 0 }} mt={5}>
              <Grid item xs={10} className="pt-5">
              <Box display="flex" alignItems="center" justifyContent="center">
              <Box borderBottom={2} borderColor={theme.palette.warning.main} style={{ marginRight: '5px', width: '20px' }} />
              <Typography variant="h1" align="center" style={{ fontWeight: 'bold', paddingBottom: '5px', fontSize: '24px' }}>
                  Various
                </Typography>
                <Box borderBottom={2} borderColor={theme.palette.warning.main} style={{ marginLeft: '5px', width: '20px' }} />
                </Box>
                <Typography variant="h2" align="center" style={{ fontWeight: 'bold', paddingBottom: '20px', fontSize: '12px' }}>
                  Check all that apply
                </Typography>
              </Grid>

              <Grid item xs={8} sx={{ pl: 5, pt: 0 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', pl: 2, py: 1 }}>
                    <Checkbox value={0} onChange={handleChange} />
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'left' }}>
                      Crime occurred at ATM
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', pl: 2, py: 1 }}>
                    <Checkbox value={1} onChange={handleChange} />
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'left' }}>
                      I believe this crime to be drug-related
                      <br />
                      <span style={{ textAlign: 'left', fontSize: '0.8rem' }}>(Perpetrator involved with drugs)</span>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', pl: 2, py: 1 }}>
                    <Checkbox  value={2} onChange={handleChange} />
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'left' }}>
                      I believe this crime to be gang-related
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', pl: 2, py: 1 }}>
                    <Checkbox  value={3} onChange={handleChange} />
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'left' }}>
                      Arson was involved
                      <br />
                      <span style={{ textAlign: 'left', fontSize: '0.8rem' }}>(Setting fire to a property on purpose)</span>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', pl: 2, py: 1 }}>
                    <Checkbox  value={4} onChange={handleChange} />
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'left' }}>
                      Vandalism was involved
                      <br />
                      <span style={{ textAlign: 'left', fontSize: '0.8rem' }}>(Malicious destruction or defacement of property)</span>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', pl: 2, py: 1 }}>
                    <Checkbox  value={5} onChange={handleChange} />
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 2, textAlign: 'left' }}>
                      Social unrest
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
    </LocalizationProvider>
  );
};

export default Page14;

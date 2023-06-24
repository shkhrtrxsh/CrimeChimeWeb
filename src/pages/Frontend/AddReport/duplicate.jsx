import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Box,
  Divider,
  Button,
  LinearProgress,
  Checkbox,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import current from '../../../assets/images/current.png'
import duplicate from '../../../assets/images/duplicate.png'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import PeopleIcon from '@mui/icons-material/People';
import NextButton from 'src/components/Button/NextButton';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, setPage3 } from 'src/store/reducers/registerReport';
import { loadGoogleMaps } from 'src/utils/googleMap';
import ProgressBar from 'src/layouts/Report/ProgressBar';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

function Duplicate() {
  
  const dispatch = useDispatch();

 
  const data = [
    { firstCol: 'Occurred:', secondCol: 'lorem ipsum wsedgvwrnhiegvwesr wenbfviouwsebhvouwerbhv9ou vweroigvhw' },
    { firstCol: 'Perpetrators:', secondCol: '4' },
    { firstCol: 'Weapons:', secondCol: 'semi-automatic' },
    { firstCol: 'Rape:', secondCol: '2' },
    { firstCol: 'Various:', secondCol: 'Believed to be gang related' },
    { firstCol: 'Police Reporting:', secondCol: 'Formally reported to the police' },
  ];
 
  const theme = useTheme();
  const isMdBreakpoint = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Container maxWidth="sm" sx={{ml:3}}>
            <Grid container spacing={2} justifyContent="center" sx={{ paddingTop: '20px', paddingBottom: '20px' }}>
              <Grid item xs={10}>
                <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', paddingBottom: '10px' }}>
                  Possible Duplicate
                </Typography>
                
              </Grid>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left',alignItems:"center" }}>
        
          <img src={current} alt="imgg" style={{ width: '6%', height: 'auto' }} />
        <Box>
          <Typography align="center" sx={{ fontWeight: 'normal', paddingBottom: '10px', fontSize: '17px' }}>
            Your report location on the map
          </Typography>
        </Box>
        
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left',alignItems:"center" }}>
        
          <img src={duplicate} alt="imgg" style={{ width: '7%', height: 'auto' }} />
        
        <Box>
          <Typography align="center" sx={{ fontWeight: 'normal', paddingBottom: '10px', fontSize: '17px' }}>
            Possible duplicate report location on the map
          </Typography>
        </Box>
        
      </Box>
    </Box>
              <Box>
              <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.firstCol}</TableCell>
              <TableCell>{row.secondCol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
             </Box> 
              <Box sx={{paddingTop:'5px'}}>
              <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', paddingBottom: '10px', }}>
                 Is this your crime?
                </Typography>
                <Box display="flex" justifyContent="center">
        <Button variant="contained" color="primary" sx={{ marginRight: '10px' }}>
          Yes
        </Button>
        <Button variant="contained" color="primary">
          No
        </Button>
      </Box>
              </Box>
              </Box>
            </Grid>
          </Container>
          
    </LocalizationProvider>
  );
}

export default Duplicate;
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
 
  Box,
  
  Button,
  
  useMediaQuery,
  useTheme,
} from '@mui/material';
import current from '../../../assets/images/current.png';
import duplicate from '../../../assets/images/duplicate.png';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useDispatch, useSelector } from 'react-redux';

import { loadGoogleMaps } from 'src/utils/googleMap';

import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

function Duplicate() {
  const dispatch = useDispatch();
  const [mediaData, setMediaData] = useState('No media available');

  const data = [
    { firstCol: 'Occurred:', secondCol: '27 november 2023 3:10 PM near smurts Avenue' },
    { firstCol: 'Perpetrators:', secondCol: '4' },
    { firstCol: 'Weapons:', secondCol: 'semi-automatic' },
    { firstCol: 'Rape:', secondCol: '2' },
    { firstCol: 'Various:', secondCol: 'Believed to be gang related' },
    { firstCol: 'Police Reporting:', secondCol: 'Formally reported to the police' },
    { firstCol: 'Media:', secondCol: mediaData },
  ];

  useEffect(() => {
    // Simulating API call to fetch media data from the backend
    setTimeout(() => {
      // Assuming the backend response provides either an image URL, video URL, or null if no media is available
      const backendResponse = 'https://example.com/path-to-media/video.mp4'; // Replace with the actual backend response
     if(backendResponse){
     setMediaData(backendResponse);
     }
       
    }, 2000);
  }, []);

  const theme = useTheme();
  const isMdBreakpoint = useMediaQuery(theme.breakpoints.up('md'));

  function isImage(url) {
    const imageExtensions = ['.apng', '.bmp', '.gif', '.ico', '.cur', '.jpg', '.jpeg', '.jfif', '.pjpeg', '.pjp', '.png', '.svg', '.tif', '.tiff', '.webp'];
    const lowerCaseUrl = url.toLowerCase();
    return imageExtensions.some(extension => lowerCaseUrl.endsWith(extension));
  }
  
  function isVideo(url) {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.ogv', '.avi', '.mov', '.wmv', '.flv', '.mkv', '.m4v', '.3gp'];
    const lowerCaseUrl = url.toLowerCase();
    return videoExtensions.some(extension => lowerCaseUrl.endsWith(extension));
  }
  

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="sm">
        <Grid container spacing={2} justifyContent="center" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
          <Grid item xs={10}>
            <Typography variant="h1" align="center" style={{ fontWeight: 'bold', paddingBottom: '10px', fontSize: '24px' }}>
              Possible Duplicate
            </Typography>
          </Grid>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <img src={current} alt="imgg" style={{ width: '7%', height: '90%' }} />
                <Box>
                  <Typography variant="h1" align="center" style={{ fontWeight: 'normal', paddingBottom: '10px', paddingTop: '10px', fontSize: '17px' }}>
                    Your report's location on the map
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <img src={duplicate} alt="imgg" style={{ width: '8%', height: '100%' }} />
                <Box>
                  <Typography variant="h1" align="center" style={{ fontWeight: 'normal', paddingBottom: '10px', paddingTop: '10px', fontSize: '17px' }}>
                    Possible duplicate report's location on the map
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
                        <TableCell>
                          {row.firstCol === 'Media:' && mediaData ? (
                            isImage(mediaData) ? (
                              <img src={mediaData} alt="media" style={{ width: '100%', height: 'auto' }} />
                            ) : isVideo(mediaData) ? (
                              <video src={mediaData} controls style={{ width: '100%', height: 'auto' }} />
                            ) : (
                              'No media available'
                            )
                          ) : (
                            row.secondCol
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box style={{ paddingTop: '5px' }}>
              <Typography variant="h1" align="center" style={{ fontWeight: 'bold', paddingBottom: '10px', fontSize: '17px' }}>
                Is this your crime?
              </Typography>
              <Box display="flex" justifyContent="center">
                <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
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

import React, { useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Container, FormControl, Grid, Box, Typography, Divider, LinearProgress } from '@mui/material';
import NextButton from 'src/components/Button/NextButton';
import GoogleAutoComplete from 'src/components/GoogleMap/GoogleAutoComplete';

const containerStyle = {
  width: '100%',
  height: 'calc(80vh - 120px)', // Adjust the height according to your needs
};

const Page2 = () => {
  const ProgressBar = ({ activeStep }) => {
    const totalSteps = 15;
    const progress = (activeStep / totalSteps) * 100;

    return <LinearProgress variant="determinate" value={progress} sx={{ bgcolor: 'yellow.300', mt: 0.5 }} />;
  };

  const [formattedAddress, setFormattedAddress] = useState('');

  const [position, setPosition] = useState({
    lat: 20.5937, // Latitude of India
    lng: 78.9629, // Longitude of India
  });

  const googleAutoComplete = (latitude, longitude, place_id, address, viewport) => {
    setPosition({
      lat: latitude,
      lng: longitude,
    });
    setFormattedAddress(address);
  };

  const markerDragEnd = (e) => {
    if (e !== null) {
      setPosition({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });

      // Retrieve formatted address using reverse geocoding
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat: e.latLng.lat(), lng: e.latLng.lng() } }, (results, status) => {
        if (status === 'OK' && results[0]) {
          setFormattedAddress(results[0].formatted_address);
        }
      });
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="sm" style={{ padding: '8px', margin: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <GoogleAutoComplete googleAutoComplete={googleAutoComplete} formattedAddress={formattedAddress} />

          <FormControl fullWidth style={{ marginTop: '16px' }}>
            <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={10}>
              <Marker position={position} draggable={true} onDragEnd={markerDragEnd} />
            </GoogleMap>
          </FormControl>
        </Container>
        <Box style={{ backgroundColor: '#FCD34D', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', color: 'black', padding: '12px', marginTop: '36px', marginLeft: 'auto', marginRight: 'auto' }}>
          <Typography variant="h6" style={{ marginRight: '8px' }}>GO BACK</Typography>
          <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
          <NextButton nextLink="/page3" textValue="CONFIRM PLACE" />
        </Box>
        <ProgressBar activeStep={2} />
      </Grid>
    </Grid>
  );
};

export default Page2;




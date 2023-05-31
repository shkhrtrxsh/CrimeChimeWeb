import React, { useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Container, FormControl, Grid ,Box, Divider, LinearProgress } from '@mui/material';

import GoogleAutoComplete from 'src/components/GoogleMap/GoogleAutoComplete';
import NextButton from 'src/components/Button/NextButton';

const containerStyle = {
  width: '100%',
  height: 'calc(80vh - 120px)' // Adjust the height according to your needs
};



const Page2 = () => {
    const ProgressBar = ({ activeStep }) => {
        const totalSteps = 15;
        const progress = (activeStep / totalSteps) * 100;
      
        return <LinearProgress variant="determinate" value={progress} className=" bg-yellow-300 mt-2" />;
      };
    const mapOptions = {
        draggable: true,
      };
      
      
  const [formattedAddress, setFormattedAddress] = useState('');

  const [position, setPosition] = useState({
    lat: 20.5937, // Latitude of India
    lng: 78.9629, // Longitude of India
  });

  const googleAutoComplete = (latitude, longitude, place_id, address, viewport) => {
    setPosition({
      lat: latitude,
      lng: longitude
    });
    setFormattedAddress(address);
  };
  

  const markerDragEnd = (e) => {
    if (e !== null) {
      setPosition({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
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
          <Container maxWidth="sm" className='p-2 m-auto flex flex-col justify-center'>
          <GoogleAutoComplete googleAutoComplete={googleAutoComplete} formattedAddress={formattedAddress} />

            <FormControl fullWidth sx={{ mt: 2 }}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={position}
                zoom={10}
                options={mapOptions}
              >
                <Marker position={position} draggable={true} onDragEnd={markerDragEnd} />
              </GoogleMap>
            </FormControl>
            
          </Container><Box
      className="bg-yellow-300 flex justify-center items-end text-black p-3 mt-9 md:mt-10">
      <NextButton nextLink="/page1" textValue="Go Back"/>
      <Divider orientation="vertical" flexItem className='bg-black mx-2' />
      <NextButton nextLink="/page3" textValue="Confirm Place"/>
    </Box>
    <ProgressBar activeStep='2' />
        
      </Grid>
    </Grid>
  );
};

export default Page2;

import { useEffect, useRef } from 'react';
import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material';
import { getLocationCoords, isWithinSAfrica } from 'src/utils/googleMap';
import { useDispatch, useSelector } from 'react-redux';
import { setCrimeIndex, setPage, setZoom, } from 'src/store/reducers/registerReport';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { SatelliteZoom } from 'src/constants/googleMap';
import Image from '../../../assets/images/duplicate.png';
import SearchFilter from '../ViewReport/SearchFilter';
import CrimeDialog from "./CrimeDialog";
import { getNearbyCrimes } from 'src/store/api/registerReport';
import { NoDataDialog } from '../../../layouts/components/NoDataDialog';
import { toast } from 'react-toastify';

const ViewCrime = () => {
  const register = useSelector(state => state.reportRegister);
  const { data, zoom, nearbyData, crimeIndex } = register;
  const { longitude, latitude } = data;
  const dispatch = useDispatch();
  const map = useRef(null);

  const markerOptions = {
    icon: {
      url: Image,
      scaledSize: new window.google.maps.Size(80, 80),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(25, 50)
    }
  };

  useEffect(() => {
    if (!crimeIndex.viewCrime) {
      dispatch(getNearbyCrimes({ latitude, longitude, fromDate: new Date(Date.now() - 365 * 24 * 3600 * 1000), toDate: new Date(Date.now()) }));
    }
  }, [])

  useEffect(() => {
    if (!crimeIndex.viewCrime) {
      (async () => {
        const { latitude, longitude } = await getLocationCoords();
        dispatch(getNearbyCrimes({ latitude, longitude, fromDate: new Date(Date.now() - 365 * 24 * 3600 * 1000), toDate: new Date(Date.now()) }));
        setPage(latitude, longitude);
      })()
    }
  }, [])

  const position = {
    lat: Number(latitude) + 0.0008,
    lng: Number(longitude) + 0.0008
  }
  const handleZoomChanged = () => {
    if (map.current) dispatch(setZoom(map.current.getZoom()))
  };
  const onLoad = async (Map) => {

    map.current = Map; // Store the map instance in a global variable for access in the event handler
    const { latitude: lat, longitude: lng } = await getLocationCoords();
    dispatch(setPage({ latitude: lat, longitude: lng }));
  }
  const theme = useTheme();
  const isMdBreakpoint = useMediaQuery(theme.breakpoints.up('md'));

  const onMarkerClick = (ind) => {
    dispatch(setCrimeIndex({ index: ind, viewCrime: true }));
  }

  const markerDragEnd = async(e) => {
    if (e !== null) {
      const geocoder = new window.google.maps.Geocoder();
      const [lat,lng] = [e.latLng.lat(), e.latLng.lng()];
      const [{latitude,longitude},isSA] = await isWithinSAfrica(lat,lng);
      if(!isSA){
        toast.error("Crimes can be reported only within South Africa");
        dispatch(setPage({latitude,longitude}))
        return;
      }
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results[0]) {
          dispatch(setPage({ location: results[0].formatted_address, longitude: lng, latitude: lat, google_place_id: results[0].place_id }));
          dispatch(getNearbyCrimes({ latitude: lat, longitude: lng, fromDate: null, toDate: null }));
        }
      });
    }
  };
  return (
    <Box sx={{ height: '100%', maxHeight: "91.3vh", display: 'flex', flexDirection: isMdBreakpoint ? 'row' : 'column' }}>
      <NoDataDialog/>
      <Drawer anchor="left" open={crimeIndex.viewCrime} onClose={() => dispatch(setCrimeIndex({ viewCrime: false }))}>
        <Box sx={{ display: "flex", alignItems: "center", maxWidth: "500px" }}>
          <CrimeDialog mapRef={map} index={crimeIndex.index} onClose={() => dispatch(setCrimeIndex({ viewCrime: false }))} />
        </Box>
      </Drawer>
      <Box id="hello" sx={{ width: '100%', height: '100%' }}>
        <GoogleMap center={position} zoom={zoom}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            mapTypeId: (zoom < SatelliteZoom) ? window.google.maps.MapTypeId.TERRAIN : window.google.maps.MapTypeId.SATELLITE,
            gestureHandling: "greedy",
            mapTypeControlOptions: {
              position: isMdBreakpoint ? window.google.maps.ControlPosition.LEFT_TOP : window.google.maps.ControlPosition.LEFT_BOTTOM
            }
          }}
          onLoad={onLoad}
          onZoomChanged={handleZoomChanged}>
          <Marker id="mark" zIndex={100} draggable={true} position={position} onDragEnd={markerDragEnd} />
          {nearbyData.map(({ latitude = null, longitude = null, user_count = 0 }, ind) => {
            const position = {
              lat: Number(latitude),
              lng: Number(longitude)
            };
            return (
              <Marker key={ind} position={position} options={markerOptions}
                onClick={() => onMarkerClick(ind)} label={{ text: `${user_count || 1}`, fontWeight: "bold", className: "map-label", color: "red" }} zIndex={0}
              />
            )
          })}

        </GoogleMap>
      </Box>

      <SearchFilter />
    </Box>
  );
}

export default ViewCrime;
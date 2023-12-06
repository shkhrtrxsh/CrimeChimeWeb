import React, { useEffect, useRef } from 'react';
import { Box, Drawer, useMediaQuery, useTheme,Typography } from '@mui/material';
import { getLocationCoords, isWithinSAfrica } from 'src/utils/googleMap';
import { useDispatch, useSelector } from 'react-redux';
import { setCrimeIndex, setPage, setZoom, } from 'src/store/reducers/registerReport';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { SatelliteZoom } from 'src/constants/googleMap';
import Image from '../../../assets/images/duplicate.png';
import Image1 from 'src/assets/images/corporateCrime.png'
import Legend from 'src/assets/images/legend.png'
import Legend2 from 'src/assets/images/legend2.png'
import Legend3 from 'src/assets/images/legend3.png'
import SearchFilter from '../ViewReport/SearchFilter';
import CrimeDialog from "./CrimeDialog";
import { getNearbyCrimes } from 'src/store/api/registerReport';
import { NoDataDialog } from '../../../layouts/components/NoDataDialog';
import { toast } from 'react-toastify';
import TransparentFab from 'src/layouts/components/TransparentFab';
import { styled } from '@mui/material/styles';
import { APPBAR_DESKTOP } from 'src/constants/theme'
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { NoDataDialogRoot } from 'src/layouts/components/NoDataDialogRoot';
import { setError } from 'src/store/reducers/report';
import ConfirmDeleteDialog from 'src/components/ConfirmDeleteDialog';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TableViewIcon from '@mui/icons-material/TableView';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { StyledGrid } from '../User/StyledGrid';
import { fDateTime } from 'src/utils/formatTime';
import ActionOptions from 'src/components/ActionOptions';
import { getSearchQueryParams, setSearchQueryParams, recordPerPage } from 'src/helpers/SearchHelper';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NoData from 'src/assets/svg/no-data.svg';
import { getReports, deleteReport, reportStatus, getCrimes } from 'src/store/api/report';
import { clearReport, setNearbyReports } from 'src/store/reducers/registerReport';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Paper,
  Card,
} from '@mui/material';
const BoxButtonStyle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: '15px',
  top: APPBAR_DESKTOP + 15 + 110 + 'px',
  '& .MuiButtonBase-root.MuiFab-root': {
      marginRight: '10px'
  }
}));
const MapDivStyle = styled('div')(({ theme }) => ({
  height: `calc(100vh )`,
  width: '100%',
  '& .gm-control-active.gm-fullscreen-control': {
      display: 'none'
  }
}));
const ViewCrime = () => {
  const register = useSelector(state => state.reportRegister);
  const { data, zoom, nearbyData, crimeIndex } = register;
  const { longitude, latitude } = data;
  const dispatch = useDispatch();
  const map = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [hidden, setHidden] = React.useState(true);
  const { reports: reportedData = {}, error,loading } = useSelector(state => state.report);
  const [openDialog, setOpenDialog] = React.useState({
    status: false,
    id: null
  }); 

  const markerOptions = {
    icon: {
      url: Image,
      scaledSize: new window.google.maps.Size(80, 80),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(25, 50)
    }
  };
  const markerOptions1 = {
    icon: {
        url: Image1,
        scaledSize: new window.google.maps.Size(30, 75),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(25, 50)
    }
  };
  useEffect(() => {
    if (!hidden) {
      const param = getSearchQueryParams(searchParams)
      dispatch(getReports({ param }));
    }
  }, [searchParams,hidden])

  const setSearchByParam = (param) => {
    navigate(`/?${param}`)
  }
  const handlePageChange = (event, onPage) => {
    let param = setSearchQueryParams(searchParams, onPage)
    navigate(`/?${param}`)
  }

  const handleChangeRowsPerPage = (event) => {
    let param = setSearchQueryParams(searchParams, 0, event.target.value)
    navigate(`/?${param}`)
  }
  useEffect(() => {
    if (!crimeIndex.viewCrime) {
      dispatch(getNearbyCrimes({ latitude, longitude, fromDate: new Date(Date.now() - 365 * 24 * 3600 * 1000), toDate: new Date(Date.now()) }));
    }
  }, [])
  useEffect(() => {
    dispatch(clearReport());
  }, [])

  useEffect(() => {
      if (!hidden) {
          dispatch(getReports({ param: `per_page=10&order_by=latest` }));
      }
  }, [hidden])
  useEffect(() => {
    if (!crimeIndex.viewCrime) {
      (async () => {
        const { latitude, longitude } = await getLocationCoords();
        dispatch(getNearbyCrimes({ latitude, longitude, fromDate: new Date(Date.now() - 365 * 24 * 3600 * 1000), toDate: new Date(Date.now()) }));
        setPage(latitude, longitude);
      })()
    }
  }, [])
  const callDeleteFunc = (status, id) => {
    if (status === true) {
        dispatch(deleteReport({ id }))
    }
  };
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
    <Box sx={{ height: '100%', display: 'flex', flexDirection: isMdBreakpoint ? 'row' : 'column' }}>
      <NoDataDialog/>
      <Drawer anchor="left" open={crimeIndex.viewCrime} onClose={() => dispatch(setCrimeIndex({ viewCrime: false }))}>
        <Box sx={{ display: "flex", alignItems: "center", maxWidth: "500px" }}>
          <CrimeDialog mapRef={map} index={crimeIndex.index} onClose={() => dispatch(setCrimeIndex({ viewCrime: false }))} />
        </Box>
      </Drawer>
      <Box id="hello" sx={{ width: '100%', height: '100%' }}>
        <MapDivStyle>

          {!hidden ? (
              <Card>
                  {/* <SearchInTable /> */}
                  {(reportedData||!loading)&&(reportedData?.data&&reportedData?.data[0]) ?
                    <React.Fragment>
                        <TableContainer component={Paper} sx={{ pr: 7 }}>
                            <Table aria-label="simple table" >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date/Time</TableCell>
                                        <TableCell>Location</TableCell>
                                        <TableCell align="left">Crime Type</TableCell>
                                        {parseInt(reportedData?.user?.role_id) == 1 && <TableCell align="left">Mob. #</TableCell>}
                                        <TableCell align="left">Username</TableCell>
                                        <TableCell align="left">Corp./Group</TableCell>
                                        <TableCell align="right">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reportedData && (reportedData.data || []).map((report, index) => {
                                        
                                        const latitude = Number(report.latitude);
                                        const longitude = Number(report.longitude);
                                        const formattedLatitude = latitude.toFixed(4);
                                        const formattedLongitude = longitude.toFixed(4);
                                        return (
                                        <TableRow key={report.id}>
                                            <TableCell align="left">{fDateTime(report.date_time)}</TableCell>
                                            <TableCell component="th" scope="row">{report.location}<br></br>{formattedLatitude} S,<br></br>{formattedLongitude} E</TableCell>
                                            <TableCell align="left">
                                            {report.robbery != 0 ? (<>Robbery,<br /></>) : null}
                                            {report.murders != 0 ? (<>Murders,<br /></>) : null}
                                            {report.burglary !=0 ? (<>Burglary,<br /></>) : null}
                                            {report.kidnapping != 0 ? (<>Kidnapping,<br /></>) : null}
                                            {report.rape != 0 ? (<>Rape,<br /></>) : null}
                                            {report.weapons != 0 ? (<>Weapons,<br /></>) : null}
                                            </TableCell>
                                            {parseInt(reportedData?.user?.role_id) == 1 && <TableCell align="left">{report.user.phone}</TableCell>}
                                            <TableCell align="left">{report.user.username}</TableCell>
                                            <TableCell align="left"><div>{report.user.corporate ? report.user.corporate.name : '' }{report.user.corporate ? report.user.corporate.is_verify==1 ? <CheckBoxIcon style={{ color: "#29C250",position: "absolute" }} /> : '' : ''}</div></TableCell> 
                                            <TableCell align="right">
                                                <ActionOptions
                                                    index={index}
                                                    delete_id={report.id}
                                                    show_url={'/report?target=single&id=' + report.id}
                                                    add_note={'/add_not/' + report.id}
                                                    deleteAction={(event) => {
                                                        setOpenDialog((prevState) => ({
                                                            ...prevState,
                                                            status: event.status,
                                                            id: event.id
                                                        }));
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>)

                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {reportedData && <TablePagination
                            rowsPerPageOptions={recordPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            component="div"
                            count={reportedData.total}
                            rowsPerPage={reportedData.per_page}
                            page={reportedData.current_page - 1}
                            onPageChange={handlePageChange}
                            />
                        }
                        </React.Fragment>
                        : <StyledGrid item md={9} xs={12}>
                            <img src={NoData} alt="No Data Available" />
                            <Typography variant="h4">Crime Records doesn't Exist</Typography>
                        </StyledGrid>
                  }
              </Card>
            )
            : (
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
            {nearbyData.map(({ latitude = null, longitude = null, user_count,user }, ind) => {
              const position = {
                lat: Number(latitude),
                lng: Number(longitude)
              };
              return (
                <>
                  {user_count == '1' && user.corporat_id == null &&  <Marker key={ind} position={position} options={markerOptions}
                    onClick={() => onMarkerClick(ind)} zIndex={0}
                  />}
                  {user_count != '1' && user.corporat_id == null && <Marker key={ind} position={position} options={markerOptions}
                    onClick={() => onMarkerClick(ind)} label={{ text: `${user_count}`, fontWeight: "bold", className: "map-label", color: "red" }} zIndex={0}
                  />}
                  {user.corporat_id != null &&  <Marker key={ind} position={position} options={markerOptions1}
                    onClick={() => onMarkerClick(ind)} zIndex={0}
                  />}

                </>
              )
            })}

            </GoogleMap>
          )}
        </MapDivStyle>

      </Box>
      <div style={{padding:"20px",backdropFilter:"blur(10px)", position: 'absolute', left: '20px', bottom: '20px',background:"rgba(255,255,255,.6)",height:"200px",width:"300px",borderRadius:"16px"}}>
        <div style={{display:"flex",alignItems:"center",gap:"10px"}} >
          <img src={Legend3}/>
          {<Typography component='h6'>Reported Crime</Typography>}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"10px",marginTop:"12px"}} >
          <img src={Legend}/>
          {<Typography component='h6'>Reported by multiple users</Typography>}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"10px",marginTop:"12px"}} >
          <img src={Legend2}/>
          {<Typography component='h6'>Reported by verified source</Typography>}
        </div>
      </div>
      <BoxButtonStyle sx={{ position: 'absolute', right: '0px', top: '390px' }}>
          <NoDataDialog />
          <NoDataDialogRoot error={error} handleClose={() => dispatch(setError(null))} />
          <ConfirmDeleteDialog
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              confirmDialog={callDeleteFunc}
          />
          {!hidden ? <TransparentFab
              size="medium"
              color="primary"
              aria-label="view report"
              variant='extended'
              onClick={() => setHidden(s => !s)}
          >
              {<Typography component='h6'>Map View</Typography>}
              <LocationOnIcon />
          </TransparentFab> : <TransparentFab
              onClick={() => setHidden(s => !s)}
              size="medium"
              color="primary"
              aria-label="view report"
              variant='extended'
          >
              <Typography component='h6' sx={{ width: 100 }}>Table View</Typography>
              <TableViewIcon />
          </TransparentFab>}
      </BoxButtonStyle>
      <BoxButtonStyle sx={{ position: 'absolute', right: '0px', top: '340px' }}>
          <TransparentFab
              size="medium"
              color="primary"
              aria-label="add report"
              to="/report/add"
              component={Link}
              variant='extended'
          >
              {<Typography component='h6' sx={{ width: 100 }}>Report Crime</Typography>}
              <AddIcon />
          </TransparentFab>
      </BoxButtonStyle>
      {/* <BoxButtonStyle sx={{ position: 'absolute', right: '0px', top: '340px' }}>
        <TransparentFab
            size="medium"
            color="primary"
            aria-label="reported crimes"
            to="/reportscrime"
            component={Link}
            variant='extended'
        >
            {<Typography component='h6' sx={{ marginLeft: '3px', width: 100 }}>View Crimes</Typography>}
            <VisibilityIcon />
        </TransparentFab>
      </BoxButtonStyle> */}
      <SearchFilter />
    </Box>
  );
}

export default ViewCrime;
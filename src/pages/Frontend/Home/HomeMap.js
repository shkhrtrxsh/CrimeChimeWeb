import React, { useState,Fragment, useEffect} from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import { APPBAR_DESKTOP } from 'src/constants/theme'
import {  useMediaQuery,Box, Typography, Fab, Modal, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TableViewIcon from '@mui/icons-material/TableView';

import AddIcon from '@mui/icons-material/Add';
import { CurrentLocationCoordinates, mapSettings } from 'src/helpers/LocationHelper';
import useResponsive from 'src/hooks/useResponsive';
import { styled, useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { getReports, deleteReport, reportStatus, getCrimes} from 'src/store/api/report';
import {SearchInTable} from 'src/components/Table';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ActiveInactiveButton } from 'src/components/Button';
import { fDateTime } from 'src/utils/formatTime';
import Image from 'src/assets/images/duplicate.png'
import { IsAuth } from 'src/helpers/RouteHelper';

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
  import { getSearchQueryParams, setSearchQueryParams, recordPerPage } from 'src/helpers/SearchHelper';
import { getLocationCoords } from 'src/utils/googleMap';
import { clearReport, setCrimeIndex, setNearbyReports, setPage } from 'src/store/reducers/registerReport';
import ActionOptions from 'src/components/ActionOptions';
import ConfirmDeleteDialog from 'src/components/ConfirmDeleteDialog';
import TransparentFab from 'src/layouts/components/TransparentFab';
import { getNearbyCrimes } from 'src/store/api/registerReport';
import { NoDataDialog } from 'src/layouts/components/NoDataDialog';

const containerStyle = {
    width: '100%',
    height: `calc(100vh - ${APPBAR_DESKTOP + 110}px )`
};

const BoxButtonStyle = styled(Box)(({ theme }) => ({
    position: 'absolute',
    right: '15px',
    top: APPBAR_DESKTOP + 15 + 110 + 'px',
    '& .MuiButtonBase-root.MuiFab-root': {
        marginRight: '10px'
    }
}));

const MapDivStyle = styled('div')(({ theme }) => ({
    height: `calc(100vh - ${APPBAR_DESKTOP + 110}px )`,
    width: '100%',
    '& .gm-control-active.gm-fullscreen-control': {
        display: 'none'
    }
}));



const HomeMap = () => {
    const {data,nearbyData:reports} =  useSelector(state=>state.reportRegister);
    const {reports:reportedData={}} = useSelector(state=>state.report);
    const {latitude,longitude,zoom} = data; 
    const isDesktop = useResponsive('up', 'md');
    const [open, setOpen] = React.useState(true);
    const theme = useTheme()
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(clearReport());
        dispatch(getReports({param:`per_page=10&order_by=latest`}));
    },[])
    
    const [openDialog, setOpenDialog] = React.useState({
        status: false, 
        id: null 
      });    const isAuth = IsAuth();
    const markerOptions = {
        icon: {
          url: Image,
          scaledSize: new window.google.maps.Size(80, 80),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(25, 50)
        }
      };
      const [showBox, setShowBox] = useState(true);

      const handleCloseBox = () => {
        setShowBox(false);
      };
    const handleClose = () => setOpen(false);
    const [hidden, setHidden] = React.useState(true);
    const [displayPopUp, setDisplayPopUp] = React.useState(true);

    const closePopUp = () => {
        // setting key "seenPopUp" with value true into localStorage
        localStorage.setItem("seenPopUp", true);
        // setting state to false to not display pop-up
        setDisplayPopUp(false);
    };
    useEffect(() => {
        let returningUser = localStorage.getItem("seenPopUp");
        setDisplayPopUp(!returningUser);
    
    }, []);
    useEffect(() => {
        dispatch(getNearbyCrimes({latitude,longitude,fromDate:null,toDate:null}))
    },[latitude,longitude]);

    useEffect(()=>{
        const param = getSearchQueryParams(searchParams)
        dispatch(getReports({param}));
    },[searchParams])

    const setSearchByParam = (param) => {
        navigate(`/reportshome?${param}`)
    }
    const handlePageChange = (event, onPage) => {
        let param = setSearchQueryParams(searchParams, onPage)
        navigate(`/reportshome?${param}`)
    }
    
    const handleChangeRowsPerPage = (event) => {
        let param = setSearchQueryParams(searchParams, 0, event.target.value)
        navigate(`/reportshome?${param}`)
    }
    const reportDetails = (report) => {
        navigate(`/reportscrime?target=single&id=${report.id}`)
    }
    const position = {
        lat:Number(latitude),
        lng:Number(longitude)
    }
    
    const onLoad = async(Map) => {

        // map.current = Map; // Store the map instance in a global variable for access in the event handler
          const {latitude:lat,longitude:lng} = await getLocationCoords();
          dispatch(setPage({latitude:lat,longitude:lng}));
          
        }
        const callDeleteFunc = (status, id) => {
            if(status === true){
              dispatch(deleteReport({id}))
            }
          } ;      
           const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const admin = reports?.admin?true:false;

    const markerDragEnd = (e) => {
        if (e !== null) {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: { lat: e.latLng.lat(), lng: e.latLng.lng() } }, (results, status) => {
            if (status === 'OK' && results[0]) {
              dispatch(setPage({location:results[0].formatted_address,longitude:e.latLng.lng(),latitude: e.latLng.lat(),google_place_id:results[0].place_id}));
              dispatch(getNearbyCrimes({latitude:e.latLng.lat(),longitude:e.latLng.lng(),fromDate:null,toDate:null}));
            }
          });
        }
      };
    return (
        <>
            <BoxButtonStyle sx={{position: 'absolute',right: '0px',top:'390px'}} onClick={() => setHidden(s => !s)}>
                <NoDataDialog/>
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
                    >
                    {hidden && <Typography component='h6'>Map View</Typography>}
                    <LocationOnIcon />
                </TransparentFab>: <TransparentFab
                    size="medium"
                    color="primary"
                    aria-label="view report"
                    variant='extended'
                    >
                    <Typography component='h6'sx={{width:100}}>Table View</Typography>
                    <TableViewIcon />
                </TransparentFab>}
            </BoxButtonStyle>
            <BoxButtonStyle sx={{position: 'absolute',right: '0px',top:'340px'}}>
                <TransparentFab
                    size="medium"
                    color="primary"
                    aria-label="add report"
                    to="/report/add"
                    component={Link}
                    variant='extended'
                >
                    {hidden && <Typography component='h6' sx={{width:100}}>Report Crime</Typography>}
                    <AddIcon />
                </TransparentFab>
            </BoxButtonStyle>
            
            <BoxButtonStyle sx={{position: 'absolute',right: '0px',top:'290px'}}>

                <TransparentFab
                    size="medium"
                    color="primary"
                    aria-label="reported crimes"
                    to="/reportscrime"
                    component={Link}
                    variant='extended'
                >
                        {hidden && <Typography component='h6' sx={{ marginLeft: '3px',width:100 }}>View Crimes</Typography>}
                    <VisibilityIcon />
                </TransparentFab>
                
            </BoxButtonStyle>    
            
            
            
            <Box sx={{
                background: theme.palette.secondary.main,
                textAlign: 'center',
                padding: '40px'
                }}>
                <Typography variant='h5'>
                    Advertisment
                </Typography>
                
            </Box>
            {!isAuth && showBox && isMobile && (
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(255, 255, 255, 0.7)',
          textAlign: 'center',
          padding: '10px',
          zIndex: 1,
        }}
      >
        <Box sx={{ marginTop: '10px', display: 'flex' ,flexDirection: 'column' }}>
            <Box paddingBottom='5px'>
               <Button  sx={{ backgroundColor: '#ffe600'}} onClick={() => navigate('/register')}>
            SIGN UP TO REPORT CRIME
          </Button> 
            </Box>
          <Box><Button  sx={{ backgroundColor: '#ffe600' }} onClick={handleCloseBox}>
           THANKS, I'M JUST LOOKING
          </Button></Box>
          
        </Box>
      </Box>
    )}



            
            <Box sx={{ display: 'flex' }}>
                <Box sx={{
                    background: theme.palette.secondary.main,
                    textAlign: 'center',
                    width: '30%',
                    height: `calc(100vh - ${APPBAR_DESKTOP + 110}px )`,
                    [theme.breakpoints.down('md')]: {
                        display: 'none',
                    },
                }}>
                    <Typography variant='h5' sx={{ paddingTop: '150px' }}>
                        Advertisment
                    </Typography>
                </Box>
                <MapDivStyle>
                    
                    {!hidden ?(
                        <Card>
                            
                                <TableContainer component={Paper}sx={{pr:7}}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell>Location</TableCell>
                                            {admin &&<TableCell align="left">Reporter</TableCell>}
                                            <TableCell align="left">Created At</TableCell>
                                            <TableCell align="right">Action</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {reportedData && (reportedData.data||[]).map((report,index) => (
                                            <TableRow key={report.id}>
                                            <TableCell component="th" scope="row">{report.location}</TableCell>
                                            {admin &&<TableCell align="left">{report.user.name}</TableCell>  }                
                                            <TableCell align="left">{fDateTime(report.created_at)}</TableCell>
                                            <TableCell align="right">
                                                <ActionOptions 
                                                index={index}
                                                delete_id={report.id}
                                                show_url={'/report?target=single&id='+report.id}
                                                add_note={'/add_not/'+report.id}
                                                deleteAction={(event) => {
                                                    setOpenDialog((prevState) => ({
                                                      ...prevState,
                                                      status: event.status,
                                                      id:event.id
                                                    }));
                                                  }}
                                                />
                                            </TableCell>
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {reportedData&&<TablePagination
                                    rowsPerPageOptions={recordPerPage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    component="div"
                                    count={reportedData.total}
                                    rowsPerPage={reportedData.per_page}
                                    page={reportedData.current_page - 1}
                                    onPageChange={handlePageChange}
                                />}
                        </Card>
                        )
                        : (
                            <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={position}
                            zoom={10}
                            options={mapSettings(zoom)}
                            onLoad={onLoad}
                        >
                            <Marker id="mark" zIndex={1} draggable={true} position={{
                                lat:Number(latitude),
                                lng:Number(longitude)
                                }} onDragEnd={markerDragEnd}/>
                            {reports && reports.map((report, index) => (
                                <Marker key={index}
                                    zIndex={0}
                                    onClick={()=>{
                                        dispatch(setNearbyReports(reports||[]));
                                        dispatch(setCrimeIndex({index,viewCrime:true}));
                                        navigate("/reportscrime") 
                                    }}
                                    position={{
                                        lat: Number(report.latitude),
                                        lng: Number(report.longitude)
                                    }}
                                    // icon={process.env.REACT_APP_API_URL + '/' + report.crime.icon_3d}
                                    options={markerOptions}
                                    label={{text:`${report?.user_count||1}`,fontWeight:"bold",className:"map-label",color:"red"}}
                                />
                            ))} 
                            
                        </GoogleMap>
                        )
                    }
                </MapDivStyle>
            </Box>
            {displayPopUp && (<Modal
                keepMounted
                open={open}
                onClose={closePopUp}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
                >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    boxShadow:24,
                    borderRadius:"10px",
                    bgcolor: 'background.paper',
                    outline:"none",
                    p: 4,
                    [theme.breakpoints.down('sm')]: {
                        width: '90%',
                    },
                }}>
                    <Typography id="keep-mounted-modal-description">
                    CrimeChime is a revolutionary force for good meant to keep South Africans and visitors of this beautiful country safe. Please be mindful of your submissions, only report crimes you have experienced first hand in order to protect the integrity of this platform. CrimeChime is firmly opposed to vigilantism. Be safe, be smart, and be well. Thank you!
                    </Typography>
                    <Box
                        sx={{
                            marginTop:5
                        }}
                    >
                    <Button
                        sx={{
                            margin: "auto",
                            display: "block"
                        }}
                        onClick={closePopUp}
                    >I understand</Button>
                    </Box>
                </Box>
            </Modal>)}
        </>
    )
}

export default HomeMap;
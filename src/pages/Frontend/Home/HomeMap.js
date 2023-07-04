import React, { Fragment, useEffect} from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import { APPBAR_DESKTOP } from 'src/constants/theme'
import { Box, Typography, Fab, Modal, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TableViewIcon from '@mui/icons-material/TableView';

import AddIcon from '@mui/icons-material/Add';
import { CurrentLocationCoordinates, mapSettings } from 'src/helpers/LocationHelper';
import useResponsive from 'src/hooks/useResponsive';
import { styled, useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { getReports, deleteReport, reportStatus} from 'src/store/api/report';
import {SearchInTable} from 'src/components/Table';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ActiveInactiveButton } from 'src/components/Button';
import { fDateTime } from 'src/utils/formatTime';
import Image from 'src/assets/images/duplicate.png'

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
import { setCrimeIndex, setNearbyReports, setPage } from 'src/store/reducers/registerReport';
import ActionOptions from 'src/components/ActionOptions';
import ConfirmDeleteDialog from 'src/components/ConfirmDeleteDialog';

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
    const {data} =  useSelector(state=>state.reportRegister);
    const {latitude,longitude} = data; 
    const isDesktop = useResponsive('up', 'md');
    const [open, setOpen] = React.useState(true);
    const theme = useTheme()
    const { reports } = useSelector((state) => ({ ...state.report }));
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = React.useState({
        status: false, 
        id: null 
      });
    const markerOptions = {
        icon: {
          url: Image,
          scaledSize: new window.google.maps.Size(50, 50),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(25, 50)
        }
      };

    const handleClose = () => setOpen(false);
    const [hidden, setHidden] = React.useState(true);
    const [displayPopUp, setDisplayPopUp] = React.useState(true);

    const closePopUp = () => {
        // setting key "seenPopUp" with value true into localStorage
        console.log("popup closed")
        localStorage.setItem("seenPopUp", true);
        // setting state to false to not display pop-up
        setDisplayPopUp(false);
    };
    useEffect(() => {
        let returningUser = localStorage.getItem("seenPopUp");
        console.log(!returningUser)
        setDisplayPopUp(!returningUser);
    
    }, []);
    useEffect(() => {
        const param = getSearchQueryParams(searchParams)
        dispatch(getReports({param}))
    },[searchParams]);

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
        if(!latitude||!longitude){
          const {latitude:lat,longitude:lng} = await getLocationCoords();
          dispatch(setPage({latitude:lat,longitude:lng}));
        }
          
        }
        const callDeleteFunc = (status, id) => {
            if(status === true){
              dispatch(deleteReport({id}))
            }
          }
    return (
        <>
        {localStorage.getItem("_token") ?
            <BoxButtonStyle sx={{position: 'absolute',right: '0px',top:'390px'}} onClick={() => setHidden(s => !s)}>
                <ConfirmDeleteDialog 
                    openDialog={openDialog} 
                    setOpenDialog={setOpenDialog}
                    confirmDialog={callDeleteFunc}
                />
                {!hidden ? <Fab
                    size="medium"
                    color="primary"
                    aria-label="view report"
                    title="Map view" 
                    variant={isDesktop ? 'extended' : 'circular'}
                    >
                    <LocationOnIcon />
                    {isDesktop &&
                        <Typography component='h6'></Typography>
                    }
                </Fab>: <Fab
                    size="medium"
                    color="primary"
                    aria-label="view report"
                    title="Table view" 
                    variant={isDesktop ? 'extended' : 'circular'}
                    >
                    <TableViewIcon />
                    {isDesktop &&
                        <Typography component='h6'></Typography>
                    }
                </Fab>}
            </BoxButtonStyle>:''
        }
            <BoxButtonStyle sx={{position: 'absolute',right: '0px',top:'340px'}}>
                <Fab
                    size="medium"
                    color="primary"
                    aria-label="add report"
                    title="add report"
                    to="/report/add"
                    component={Link}
                    variant={isDesktop ? 'extended' : 'circular'}
                >
                    <AddIcon />
                    {isDesktop &&
                        <Typography component='h6'></Typography>
                    }
                </Fab>
            </BoxButtonStyle>
            <BoxButtonStyle sx={{position: 'absolute',right: '0px',top:'290px'}}>

                <Fab
                    size="medium"
                    color="primary"
                    aria-label="reported crimes"
                    title="view crimes"
                    to="/reportscrime"
                    component={Link}
                    variant={isDesktop ? 'extended' : 'circular'}
                >
                    <VisibilityIcon />
                    {isDesktop &&
                        <Typography component='h6' sx={{ marginLeft: '3px' }}></Typography>
                    }
                </Fab>
                
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
                            <SearchInTable searchByParam={setSearchByParam} />
                                <TableContainer component={Paper}sx={{pr:6}}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell>Location</TableCell>
                                            <TableCell align="left">Reporter</TableCell>
                                            <TableCell align="left">Created At</TableCell>
                                            <TableCell align="right">Action</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {reports.data && reports.data.map((report,index) => (
                                            <TableRow key={report.id}>
                                            <TableCell component="th" scope="row">{report.location}</TableCell>
                                            <TableCell align="left">{report.user.name}</TableCell>                  
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
                                <TablePagination
                                    rowsPerPageOptions={recordPerPage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    component="div"
                                    count={reports.total}
                                    rowsPerPage={reports.per_page}
                                    page={reports.current_page - 1}
                                    onPageChange={handlePageChange}
                                />
                        </Card>
                        )
                        : (
                            <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={position}
                            zoom={10}
                            options={mapSettings}
                            onLoad={onLoad}
                        >
                            {localStorage.getItem("_token") && reports?.data && reports.data.map((report, index) => (
                                <Marker key={index}
                                    onClick={()=>{
                                        dispatch(setNearbyReports(reports?.data||[]));
                                        dispatch(setCrimeIndex({index,viewCrime:true}));
                                        navigate("/reportscrime")
                                    }}
                                    position={{
                                        lat: Number(report.latitude),
                                        lng: Number(report.longitude)
                                    }}
                                    // icon={process.env.REACT_APP_API_URL + '/' + report.crime.icon_3d}
                                    options={markerOptions}

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
                    bgcolor: 'background.paper',
                    boxShadow: 24,
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
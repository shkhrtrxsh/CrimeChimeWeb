import React, { useEffect, useState } from 'react';
import {
    Drawer,
    Paper,
    Stack,
    InputLabel,
    Select,
    MenuItem,
    ListItemIcon,
    FormControl,
    ListItemText,
    Typography,
    Box,
    Fab,
    Button,
    TextField
} from '@mui/material';
import GoogleAutoComplete from 'src/components/GoogleMap/GoogleAutoComplete';
import { styled, useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { getCrimes, getSpecificCrimesById } from 'src/store/api/report';
import { SaveButton } from 'src/components/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { APPBAR_DESKTOP } from 'src/constants/theme'
import AddIcon from '@mui/icons-material/Add';
import useResponsive from 'src/hooks/useResponsive';
import {  LocalizationProvider } from '@mui/lab';
import {DatePicker} from '@mui/x-date-pickers'

import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { format } from 'date-fns';
import { getNearbyCrimes } from 'src/store/api/registerReport';
import { clearReport } from 'src/store/reducers/registerReport';

const OuterPaperStyle = styled(Paper)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        width: '500px',
    },
    paddingLeft: '30px',
    paddingRight: '30px',
    paddingTop: '60px'
}));

const ImageIcon = styled('img')(({ theme }) => ({
    width: '25px'
}));

const CrimeFormControl = styled(FormControl)(({ theme }) => ({
    '& .MuiSelect-select.MuiSelect-outlined': {
        // padding: '10.5px 14px'
    },
    '& .MuiSelect-select.MuiSelect-outlined .MuiListItemIcon-root': {
        float: 'left',
        minWidth: '40px',
        marginTop: '5px'
    }
}));

const BoxButtonStyle = styled(Box)(({ theme }) => ({
    position: 'absolute',
    right: '15px',
    top: APPBAR_DESKTOP + 15 + 'px',
    '& .MuiButtonBase-root.MuiFab-root': {
        marginRight: '10px'
    }
}));

export default function SearchFilter(props) {
    const dateNow = new Date(Date.now());
    const {data,nearbyReport,markers} = useSelector(state=>state.reportRegister);
    const {latitude,longitude} = data;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = React.useState(false);
    const [toDate, setToDate] = useState(dateNow);
    const [fromDate, setFromDate] = useState(dateNow);
    const [address, setAddress] = useState('');
    const isDesktop = useResponsive('up', 'md');
    const toggleDrawer = (event) => {
        setState(event);
    };
    // place.geometry.viewport.Ia.hi
    // place.geometry.viewport.Ia.lo
    // place.geometry.viewport.Wa.hi
    // place.geometry.viewport.Wa.lo

    const filterSearchHandler = ()=>{
        if(toDate>=fromDate&&latitude&&longitude){
            dispatch(clearReport());
            dispatch(getNearbyCrimes({lat:latitude,long:longitude,toDate,fromDate}));
            toggleDrawer(false)
        }
    }

    const clearSearchHandler = ()=>{
        
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <BoxButtonStyle>
                <Fab
                    size="medium"
                    color="primary"
                    aria-label="add report"
                    to="/report/add"
                    component={Link}
                    variant={isDesktop ? 'extended' : 'circular'}
                >
                    <AddIcon />
                    {isDesktop &&
                        <Typography component='h6'>Report Crime</Typography>
                    }

                </Fab>
                <Fab
                    size="medium"
                    color="primary"
                    aria-label="reported crimes"
                    onClick={() => toggleDrawer(true)}
                >
                    <MenuIcon />
                </Fab>
            </BoxButtonStyle>
            
            <Drawer anchor="right" open={state} onClose={() => toggleDrawer(false)} >
                <OuterPaperStyle>
                    <Stack spacing={3}>
                        <Typography variant="h4" component="h4" sx={{
                            marginBottom: "20px"
                        }}>
                            Filter your report
                        </Typography>
                        <Box>
                            <GoogleAutoComplete style={{}}/>
                            {!(latitude&&longitude)&&<Typography sx={{color:"red",fontSize:12}}>*required</Typography>}
                        </Box>

                    <DatePicker
                        label="From"
                        value={fromDate}
                        maxDate={new Date(toDate)}
                        onChange={(event,newValue)=>setFromDate(event)}
                        renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                        label="To"
                        value={toDate}
                        maxDate={dateNow}
                        onChange={(event,newValue)=>setToDate(event)}
                        renderInput={(params) => <TextField {...params} />}
                        />
                        
                        <Stack direction="row" spacing={2} sx={{marginTop:'30px !important'}}>
                            <Button
                                sx={{
                                    width: '100%',
                                }}
                                onClick={filterSearchHandler}
                                size="large"
                            >
                                Search
                            </Button>
                            <Button
                                sx={{
                                    width: '40%',
                                    background: '#fff',
                                    "&:hover":{
                                        background: 'transparent'
                                    }
                                }}
                                onClick={clearSearchHandler}
                                size="large"
                                variant='outlined'
                            >
                                Clear
                            </Button>
                        </Stack>
                    </Stack>
                </OuterPaperStyle>
            </Drawer>
            
        </LocalizationProvider>
    );
}
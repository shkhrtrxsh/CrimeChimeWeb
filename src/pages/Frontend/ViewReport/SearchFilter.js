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
    Button
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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = React.useState(false);
    const [crime, setCrime] = useState('');
    const [specificCrime, setSpecificCrime] = useState('');
    const [specificTime, setSpecificTime] = useState('');
    const [address, setAddress] = useState('');
    const [searchParams] = useSearchParams();
    const [viewport, setViewport] = useState(null)
    const isDesktop = useResponsive('up', 'md');
    const [position, setPosition] = useState({
        lat:0,
        lng:0,
    });

    const { crime_list } = useSelector((state) => ({ ...state.report }));
    const { specific_crime_list } = useSelector((state) => ({ ...state.report }));

    const toggleDrawer = (event) => {
        setState(event);
        dispatch(getCrimes({}))

        if (searchParams.get('crime') !== null) {
            setCrime(searchParams.get('crime'))
        }
        if (searchParams.get('specific-crime') !== null) {
            setSpecificCrime(searchParams.get('specific-crime'))
        }
    };

    // place.geometry.viewport.Ia.hi
    // place.geometry.viewport.Ia.lo
    // place.geometry.viewport.Wa.hi
    // place.geometry.viewport.Wa.lo

    useEffect(() => {
        let id = crime === '' ? 1 : crime;
        dispatch(getSpecificCrimesById({ id }))
        setSpecificCrime('')

    }, [crime])

    const googleAutoComplete = (latitude, longitude, place_id, address, viewport) => {
        setPosition({
            lat:latitude,
            lng:longitude
        })
        setAddress(address)
        if (viewport !== null) {
            setViewport(viewport.geometry.viewport)
        }
    }

    const filterSearchHandler = () => {
        let url = '';

        if (viewport !== null) {
            url += `iahi=${viewport.Ja.hi}&ialo=${viewport.Ja.lo}&wahi=${viewport.Va.hi}&walo=${viewport.Va.lo}&`
        }
        if (crime !== null) {
            url += `crime=${crime}&`
        }
        if (specificCrime !== null) {
            url += `specific-crime=${specificCrime}&`
        }
        if (specificTime !== null) {
            url += `specific-time=${specificTime}&`
        }
        if (address !== null) {
            url += `location=${address}&`
        }
        console.log('url', url)
        navigate(`/report?${url}`, { replace: true })
        setState(false)
        
        if(position.lat !== 0 && position.lng !== 0){
            props.viewportPosition(position)
        }        
    }

    const crimeHandle = (e) => {
        setCrime(e.target.value)
    }

    const specificCrimeHandle = (e) => {
        setSpecificCrime(e.target.value)
    }

    const specificTimeHandle = (e) => {
        setSpecificTime(e.target.value)
    }

    const clearSearchHandler = () => {
        setCrime('')
        setSpecificCrime('')
        setSpecificTime('')
        setAddress('')
        navigate(`/report`, { replace: true })
    }

    return (
        <React.Fragment>
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
                        <GoogleAutoComplete googleAutoComplete={googleAutoComplete} oldAddress={address} />

                        <CrimeFormControl sx={{ m: 1, minWidth: 80 }}>
                            <InputLabel id="demo-simple-select-autowidth-label">Select Crime Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={crime}
                                onChange={crimeHandle}
                                fullWidth
                                label="Select Crime Type"
                            >
                                {crime_list && crime_list.map((crime, index) => (
                                    <MenuItem value={crime.id} key={index}>
                                        <ListItemIcon>
                                            <ImageIcon src={process.env.REACT_APP_API_URL + '/' + crime.icon} />
                                        </ListItemIcon>
                                        <ListItemText>{crime.name}</ListItemText>
                                    </MenuItem>
                                ))}
                            </Select>
                        </CrimeFormControl>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                            <InputLabel id="demo-simple-select-autowidth-label">Select Specific Crime</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={specificCrime}
                                onChange={specificCrimeHandle}
                                fullWidth
                                label="Select Specific Crime"
                            >
                                {specific_crime_list && specific_crime_list.map((crime, index) => (
                                    <MenuItem value={crime.id} key={index}>
                                        {crime.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                            <InputLabel id="demo-simple-select-autowidth-label">Select Time </InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={specificTime}
                                onChange={specificTimeHandle}
                                fullWidth
                                label="Select Specific Time"
                            >
                                <MenuItem value="week" key="1">
                                    Week
                                </MenuItem>
                                <MenuItem value="month" key="2">
                                    Month
                                </MenuItem>
                                <MenuItem value="year" key="3">
                                    Year
                                </MenuItem>
                                
                            </Select>
                        </FormControl>

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
            
        </React.Fragment>
    );
}
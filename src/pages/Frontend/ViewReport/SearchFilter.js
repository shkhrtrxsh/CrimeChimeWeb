import React, { useEffect, useState } from 'react';
import {
    Drawer,
    Paper,
    Stack,
    InputLabel,
    MenuItem,
    FormControl,
    ListItemText,
    Typography,
    Box,
    Fab,
    FormControlLabel, Checkbox,
    Button,
    TextField
} from '@mui/material';
import GoogleAutoComplete from 'src/components/GoogleMap/GoogleAutoComplete';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { getCrimes, getSpecificCrimesById } from 'src/store/api/report';
import { SaveButton } from 'src/components/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { APPBAR_DESKTOP } from 'src/constants/theme';
import AddIcon from '@mui/icons-material/Add';
import useResponsive from 'src/hooks/useResponsive';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { format } from 'date-fns';
import { getNearbyCrimes } from 'src/store/api/registerReport';
import { clearReport } from 'src/store/reducers/registerReport';
import TransparentFab from 'src/layouts/components/TransparentFab';

const OuterPaperStyle = styled(Paper)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        width: '500px',
    },
    paddingLeft: '30px',
    paddingRight: '30px',
    paddingTop: '60px',
}));

const ImageIcon = styled('img')(({ theme }) => ({
    width: '25px',
}));

const CrimeFormControl = styled(FormControl)(({ theme }) => ({
    '& .MuiSelect-select.MuiSelect-outlined': {
        // padding: '10.5px 14px'
    },
    '& .MuiSelect-select.MuiSelect-outlined .MuiListItemIcon-root': {
        float: 'left',
        minWidth: '40px',
        marginTop: '5px',
    },
}));

const BoxButtonStyle = styled(Box)(({ theme }) => ({
    position: 'absolute',
    right: '15px',
    top: APPBAR_DESKTOP + 15 + 'px',
    '& .MuiButtonBase-root.MuiFab-root': {
        marginRight: '10px',
    },
}));

export default function SearchFilter(props) {
    const [nameOfDeceased, setNameOfDeceased] = useState('');
    const [verifiedGroup, setVerifiedGroup] = useState(0);

    const dateNow = new Date(Date.now());
    const { data } = useSelector((state) => state.reportRegister);
    const { latitude, longitude } = data;
    const dispatch = useDispatch();
    const [state, setState] = React.useState(0);
    const [toDate, setToDate] = useState(dateNow);
    const [fromDate, setFromDate] = useState(dateNow);
    const [crimeTypes, setCrimeTypes] = useState({
        murder: 0,
        rape: 0,
        assault: 0,
        burglary: 0,
        robbery: 0,
        kidnapping: 0,
        bribery: 0,
        shoplifting: 0,
      });
    const isDesktop = useResponsive('up', 'md');
    const toggleDrawer = (event) => {
        if (!event) {
            setToDate(dateNow);
            setFromDate(dateNow);
            setNameOfDeceased('');
            setVerifiedGroup(0);
            // Set crime types to 0 individually
            setCrimeTypes({
                murder: 0,
                rape: 0,
                assault: 0,
                burglary: 0,
                robbery: 0,
                kidnapping: 0,
                bribery: 0,
                shoplifting: 0,
            });
        }
        setState(event);
    };

    const filterSearchHandler = () => {
        if (toDate >= fromDate && latitude && longitude) {
            // Send crime types individually
            dispatch(
                getNearbyCrimes({
                    latitude,
                    longitude,
                    toDate,
                    fromDate,
                    nameOfDeceased,
                    verifiedGroup,
                    ...crimeTypes, // Send crime types individually
                })
            );
            toggleDrawer(0);
        }
    };

    const clearSearchHandler = () => {
        setToDate(dateNow);
        setFromDate(dateNow);
        setNameOfDeceased('');
        setVerifiedGroup(0);
        // Set crime types to 0 individually
        setCrimeTypes({
            murder: 0,
            rape: 0,
            assault: 0,
            burglary: 0,
            robbery: 0,
            kidnapping: 0,
            bribery: 0,
            shoplifting: 0,
        });
        toggleDrawer(0);
    };
    const dividerStyle = {
        borderTop: '1px solid #f0f0f0', // Light shade color
        margin: '20px 0', // Adjust the margin as needed
    };
    
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <BoxButtonStyle>
            <TransparentFab
                    size="medium"
                    color="primary"
                    aria-label="add report"
                    to="/report/add"
                    component={Link}
                    variant="extended"
                >
                    <AddIcon />
                    <Typography component="h6">Report Crime</Typography>
                </TransparentFab>
                <Fab
                    size="medium"
                    color="primary"
                    aria-label="reported crimes"
                    onClick={() => toggleDrawer(1)}
                >
                    <MenuIcon />
                </Fab>
            </BoxButtonStyle>
    
            <Drawer anchor="right" open={state} onClose={() => toggleDrawer(0)}>
                <OuterPaperStyle>
                    <Stack spacing={3}>
                        <Typography variant="h4" component="h4" sx={{ marginBottom: '20px' }}>
                            Filter your report
                        </Typography>
                        <Box>
                            <GoogleAutoComplete style={{}} />
                            {!(latitude && longitude) && (
                                <Typography sx={{ color: 'red', fontSize: 12 }}>*required</Typography>
                            )}
                        </Box>
                        <hr style={dividerStyle} />
                        <DatePicker
                            label="From"
                            value={fromDate}
                            maxDate={new Date(toDate)}
                            onChange={(event, newValue) => setFromDate(event)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                            label="To"
                            value={toDate}
                            maxDate={dateNow}
                            onChange={(event, newValue) => setToDate(event)}
                            renderInput={(params) => <TextField {...params} />}
                        />
    
                        {/* Line divider */}
                        <hr style={dividerStyle} />
    
                        <TextField
                            label="Name of Deceased"
                            value={nameOfDeceased}
                            onChange={(e) => setNameOfDeceased(e.target.value)}
                            variant="outlined"
                            fullWidth
                        />
    <hr style={dividerStyle} />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={verifiedGroup}
                                    onChange={(e) => setVerifiedGroup(e.target.checked)}
                                    color="primary"
                                />
                            }
                            label="Posted by Verified Group"
                        />
    <hr style={dividerStyle} />
                        <FormControl component="fieldset">
                            <Typography variant="h6" gutterBottom>
                                Crime Types
                            </Typography>
                            {Object.keys(crimeTypes).map((type) => (
                                <FormControlLabel
                                    key={type}
                                    control={
                                        <Checkbox
                                            checked={crimeTypes[type]}
                                            onChange={(e) =>
                                                setCrimeTypes({
                                                    ...crimeTypes,
                                                    [type]: e.target.checked ? 1 : 0,
                                                })
                                            }
                                        />
                                    }
                                    label={type.charAt(0).toUpperCase() + type.slice(1)}
                                />
                            ))}
                        </FormControl>
                    </Stack>
    
                    {/* Line divider */}
                    <hr style={dividerStyle} />
    
                    <Stack direction="row" spacing={2} sx={{ marginTop: '30px !important' }}>
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
                                '&:hover': {
                                    background: 'transparent',
                                },
                            }}
                            onClick={clearSearchHandler}
                            size="large"
                            variant="outlined"
                        >
                            Clear
                        </Button>
                    </Stack>
                </OuterPaperStyle>
            </Drawer>
        </LocalizationProvider>
    );
}

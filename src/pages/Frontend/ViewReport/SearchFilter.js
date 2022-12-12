import React, { useEffect, useState } from 'react';
import {
    Drawer,
    Button,
    Paper,
    Stack,
    InputLabel,
    Select,
    MenuItem,
    ListItemIcon,
    FormControl,
    ListItemText,
    Typography
} from '@mui/material';
import GoogleAutoComplete from 'src/components/GoogleMap/GoogleAutoComplete';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { addReport, getCrimes, getSpecificCrimesById } from 'src/store/api/report';
import { SaveButton } from 'src/components/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OuterPaperStyle = styled(Paper)(({ theme }) => ({
    width: '500px',
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

export default function SearchFilter() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const [state, setState] = React.useState(false);
    const [crime, setCrime] = useState('');
    const [specificCrime, setSpecificCrime] = useState('');
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [address, setAddress] = useState('');
    const [searchParams] = useSearchParams();

    const { crime_list } = useSelector((state) => ({ ...state.report }));
    const { specific_crime_list } = useSelector((state) => ({ ...state.report }));

    const toggleDrawer = (event) => {
        setState(event);
    };


    useEffect(() => {
        dispatch(getCrimes({}))

        if(searchParams.get('crime')  !== null){
            setCrime(searchParams.get('crime'))
        }
        if(searchParams.get('specific-crime') !== null){
            setSpecificCrime(searchParams.get('specific-crime'))
        }

    }, [])

    useEffect(() => {
        let id = crime === '' ? 1 : crime;
        dispatch(getSpecificCrimesById({ id }))
        setSpecificCrime('')
        
    }, [crime])

    const googleAutoComplete = (latitude, longitude, place_id, address) => {
        setLatitude(latitude)
        setLongitude(longitude)
        setAddress(address)
    }

    const filterSearchHandler = () => {
        console.log('heloooo');
        navigate(`/report?location=${address}&latitude=${latitude}&longitude=${longitude}&crime=${crime}&specific-crime=${specificCrime}`, { replace: true })
    }

    const crimeHandle = (e) => {
        console.log(e.target.value)
        setCrime(e.target.value)
    }

    const specificCrimeHandle = (e) => {
        setSpecificCrime(e.target.value)
    }

    return (
        <React.Fragment>
            <Button onClick={() => toggleDrawer(true)} sx={{
                    position: 'absolute',
                    top: '80px',
                    right: 0,
                    zIndex: 9
            }}>
                <MenuIcon />
            </Button>
            <Drawer
                anchor="right"
                open={state}
                onClose={() => toggleDrawer(false)}
            >
                <OuterPaperStyle>
                    <Stack spacing={3}>
                        <Typography variant="h4" component="h4" sx={{
                            marginBottom:"20px"
                        }}>
                            Filter your report
                        </Typography>
                        <GoogleAutoComplete googleAutoComplete={googleAutoComplete} />

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
                        <SaveButton 
                            sx={{
                                with:'100%',
                                marginTop: '30px'
                            }}
                            onClick={filterSearchHandler}
                            >
                            Search
                        </SaveButton>
                    </Stack>
                </OuterPaperStyle>

            </Drawer>
        </React.Fragment>
    );
}
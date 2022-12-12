import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker} from '@react-google-maps/api';
import { alpha, styled, useTheme } from '@mui/material/styles';
import {
    Stack,
    Container,
    Typography,
    Card,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSelector, useDispatch } from 'react-redux';
import { addReport, getCrimes, getSpecificCrimesById } from 'src/store/api/report';
import * as Yup from 'yup';
import "yup-phone";

import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import { SaveButton } from 'src/components/Button';
import { DRAWER_WIDTH, APPBAR_MOBILE, APPBAR_DESKTOP} from 'src/constants/theme'
import UploadImage from 'src/components/UploadImage';
import GoogleAutoComplete from 'src/components/GoogleMap/GoogleAutoComplete';



const containerStyle = {
    width: '100%',
    height: `calc(100vh - ${APPBAR_DESKTOP}px)`
};

const PaperStyle = styled(Card)(({ theme }) => ({
    // padding:'.5rem',
    boxShadow: `${theme.shadows[3]} !important`,
    borderRadius: Number(theme.shape.borderRadius),
    '& .MuiPaper-root.MuiPaper-elevation': {
        boxShadow: 'none'
    }
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

const ContentStyle = styled('div')(({ theme }) => ({
    width: 480,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
}));

const HeaderStyle = styled('div')(({ theme }) => ({
    margin: '2rem 2rem .6rem 2rem'
}));


const AddReportMap = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    
    const [crime, setCrime] = useState('');
    const [specificCrime, setSpecificCrime] = useState('');

    const { crime_list } = useSelector((state) => ({ ...state.report }));
    const { specific_crime_list } = useSelector((state) => ({ ...state.report }));

    useEffect(() => {
        dispatch(getCrimes({}))
    }, [])

    useEffect(() => {
        let id = crime === '' ? 1 : crime;
        setSpecificCrime('');
        dispatch(getSpecificCrimesById({id}))
    }, [crime])

    // const [map, setMap] = useState(/** @type google.maps.Map */(null))
    const [position, setPosition] = useState({
        lat: 0,
        lng: 0
    })

    const googleAutoComplete = (latitude, longitude, place_id, address) => {
        console.log(latitude, longitude, place_id, address)
        setValue('latitude', latitude);
        setValue('longitude', longitude);
        setValue('google_place_id', place_id);
        setValue('location', address);

        console.log(address)

        setPosition({
            lat: latitude,
            lng: longitude
        })

    }

    const addFileHandler = (files) => {
        setValue('files', files)
    }

    const LoginSchema = Yup.object().shape({
        location: Yup.string().required('Crime location is required'),
        // position: Yup.string().required('Position is required'),
        // crime_type: Yup.string().required('Select your crime type'),
        // specific_crime: Yup.string().required('Select your specific crime'),
        // files: Yup.string().required('Upload images are required'),
        // description: Yup.string().required('Description is required'),
    });

    const defaultValues = {
        location: '',
        longitude: '',
        latitude: '',
        google_place_id: '',
        crime: '',
        specific_crime: '',
        files:{},
        description:''
    };

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
        setValue
    } = methods;

    const onSubmit = (formValue) => {
        formValue.crime = crime
        formValue.specific_crime = specificCrime
        dispatch(addReport({ formValue, navigate }))
    };

    const markerDragEnd = (e) => {
        if (e !== null) {
            setValue('latitude', e.latLng.lat());
            setValue('longitude', e.latLng.lng());
        }
        console.log(e.latLng.lat())
        console.log(e.latLng.lng())
    }

    return (
        <Container>
            <Stack direction="row" spacing={2}>
                <ContentStyle>
                    <PaperStyle>
                        <HeaderStyle>
                            <Typography variant="h4">
                                Add Crime Report
                            </Typography>
                        </HeaderStyle>
                        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={3}>
                                <GoogleAutoComplete googleAutoComplete={googleAutoComplete} />
                                <CrimeFormControl sx={{ m: 1, minWidth: 80 }}>
                                    <InputLabel id="demo-simple-select-autowidth-label">Select Crime Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        value={crime}
                                        onChange={(value) => {setCrime(value.target.value)}}
                                        fullWidth
                                        label="Select Crime Type"
                                    >
                                        { crime_list && crime_list.map((crime, index) => (
                                            <MenuItem value={crime.id} key={index}>                                                
                                                <ListItemIcon>
                                                    <ImageIcon src={process.env.REACT_APP_API_URL +'/'+ crime.icon} />
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
                                        onChange={(value) => {setSpecificCrime(value.target.value)}}
                                        fullWidth
                                        label="Select Specific Crime"
                                    >
                                        { specific_crime_list && specific_crime_list.map((crime, index) => (
                                            <MenuItem value={crime.id} key={index}>
                                                {crime.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <UploadImage addFiles={addFileHandler} />
                                </FormControl>
                                <RHFTextField name="description" label="Enter Description" multiline />
                            </Stack>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 3 }}>
                                <SaveButton fullWidth type="submit">
                                    Save
                                </SaveButton>
                            </Stack>
                        </FormProvider>
                    </PaperStyle>
                </ContentStyle>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={position}
                    zoom={10}
                    options={{
                        fullscreenControl: false,
                    }}
                >
                    <Marker
                        position={position}
                        draggable={true}
                        onDragEnd={markerDragEnd}
                    />
                </GoogleMap>

            </Stack>
        </Container>
    )
}

export default AddReportMap;
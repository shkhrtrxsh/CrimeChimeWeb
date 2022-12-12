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
import { useNavigate, Link as RouterLink, useSearchParams} from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSelector, useDispatch } from 'react-redux';
import { getReportByArea } from 'src/store/api/report';
import * as Yup from 'yup';
import "yup-phone";

import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import { SaveButton } from 'src/components/Button';
import { DRAWER_WIDTH, APPBAR_MOBILE, APPBAR_DESKTOP} from 'src/constants/theme'
import UploadImage from 'src/components/UploadImage';
import GoogleAutoComplete from 'src/components/GoogleMap/GoogleAutoComplete';
import SearchFilter from './SearchFilter';



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


const ViewReportMap = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const theme = useTheme();

    const [position, setPosition] = useState({
        lat: -34.0497003659375,
        lng: 18.4950855953125
    })

    const [currentLocation, setCurrentLocation] = useState({
        lat: 1,
        lng: 1
    })

    // function showPosition(position) {
    //     setCurrentLocation({
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude
    //     })
    // }
    // navigator.geolocation.getCurrentPosition(showPosition)

    // useEffect(() => {
    //     if(position.lat === 0 && position.lng === 0){
    //         setTimeout(function(){
    //             setPosition(currentLocation)
    //             console.log(position)
    //         },2000)
            
    //     }
    // }, [currentLocation])

    const { reports } = useSelector((state) => ({ ...state.report }));

    useEffect(() => {
        let query = '';
        if(searchParams.get('location') !== null){
            query += `location=${searchParams.get('location')}&`
        }
        if(searchParams.get('latitude')  !== null){
            query += `latitude=${searchParams.get('latitude')}&`
        }
        if(searchParams.get('longitude')  !== null){
            query += `longitude=${searchParams.get('longitude')}&`
        }
        if(searchParams.get('crime')  !== null){
            query += `crime=${searchParams.get('crime')}&`
        }
        if(searchParams.get('specific-crime') !== null){
            query += `specific-crime=${searchParams.get('specific-crime')}`
        }
        dispatch(getReportByArea({query}))

    }, [searchParams])

    return (
        <>
            <SearchFilter />
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={position}
                zoom={5}
                options={{
                    fullscreenControl: false,
                }}                
            >
                {reports && reports.map((report, index) => (
                    <Marker key={index}
                        position={{
                            lat: Number(report.latitude),
                            lng: Number(report.longitude)
                        }}
                        // label={process.env.REACT_APP_API_URL+'/'+report.crime.icon_3d}
                        icon={process.env.REACT_APP_API_URL+'/'+report.crime.icon_3d}
                        
                    />
                ))}
                
            </GoogleMap>
        </>
    )
}

export default ViewReportMap;
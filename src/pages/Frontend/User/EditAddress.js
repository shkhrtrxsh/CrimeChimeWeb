import React, {useEffect} from 'react';
import * as Yup from 'yup';
import "yup-phone";
import { useState } from 'react';
import { useNavigate, Link as RouterLink} from 'react-router-dom';
import { GoogleMap, Marker} from '@react-google-maps/api';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SaveButton } from 'src/components/Button'

import { useSelector, useDispatch } from 'react-redux';
import { updateUserAddress, showAuthUser } from 'src/store/api/user';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Paper, Button, Box, Container, Stack, Grid, Card } from '@mui/material'
import UserSideName from './components/UserSideNav';
import Page from '../../../components/Page';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import GoogleAutoComplete from 'src/components/GoogleMap/GoogleAutoComplete';
import { DRAWER_WIDTH, APPBAR_MOBILE, APPBAR_DESKTOP} from 'src/constants/theme'

const PaperStyle = styled(Paper)(({ theme }) => ({

}));
  
const containerStyle = {
    width: '100%',
    height: `calc(100vh - ${APPBAR_DESKTOP * 5}px)`
};


const EditAddress = () => {  
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const [value, setValue] = useState({
        latitude : 0,
        longitude : 0,
        google_place_id : '',
        address : ''
    })

    const { user } = useSelector((state) => ({ ...state.user }));
    useEffect(() => {
        dispatch(showAuthUser({}))
    }, [])

    const [position , setPosition] = useState({
        lat: 0,
        lng: 0
    })

    const googleAutoComplete = (latitude, longitude, place_id, address) => {
        setValue({
            latitude : latitude,
            longitude : longitude,
            google_place_id : place_id,
            address : address
        })

        console.log(address)
        
        setPosition({
            lat: latitude,
            lng: longitude
        })

    }

    useEffect(()=> {
        console.log(user)
        if(user !== null){
            setTimeout(function(){
                setPosition({
                    lat: Number(user.latitude),
                    lng: Number(user.longitude)
                })
            }, 500)
        }
    }, [user])

    const saveAddress = () => {
        console.log(value)
        dispatch(updateUserAddress({value, navigate}))
    }

    const markerDragEnd = (e) => {
        if (e !== null) {
            setValue(prev => ({
                ...prev,
                latitude: e.latLng.lat(),
                longitude: e.latLng.lng()
            }))
        }
    }
  

    return (
        <Page>
            <Container sx={{
                marginTop: '40px'
            }}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <UserSideName />
                    </Grid>
                    <Grid item xs={9}>
                        <Card sx={{
                            padding: '1.3rem'
                        }}>
                            <Grid container spacing={4}>
                                <Grid item xs={9}>
                                    <GoogleAutoComplete googleAutoComplete={googleAutoComplete} value={user && user.address} />
                                </Grid>
                                <Grid item xs={3}>
                                    <SaveButton onClick={saveAddress}>
                                        Save
                                    </SaveButton>
                                </Grid>

                                <Grid item xs={12}>
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
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}

export default EditAddress

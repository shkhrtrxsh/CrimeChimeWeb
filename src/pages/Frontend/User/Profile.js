import React, { useEffect } from 'react';
import * as Yup from 'yup';
import "yup-phone";
import { useState } from 'react';
import { useNavigate, Link as RouterLink} from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SaveButton } from 'src/components/Button'

import { useSelector, useDispatch } from 'react-redux';
import { showAuthUser } from 'src/store/api/user';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Paper, Button, Box, Container, Stack, Grid, Avatar, Typography, IconButton } from '@mui/material'
import UserSideName from './components/UserSideNav';
import Page from '../../../components/Page';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import UserDemo from 'src/assets/images/user-demo.jpg'
import EditIcon from '@mui/icons-material/Edit';
  

const InfoBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    marginTop:'15px'
}));

const HeadTypography = styled(Typography)(({ theme }) => ({
    width: '90px',
    // textAlign: 'right',
    marginRight: '20px',
    fontWeight: '600',
    fontSize: '1rem !important',
    [theme.breakpoints.down('md')]: {
        width: '80px',
    }
}));

const BodyTypography = styled(Typography)(({ theme }) => ({
    fontWeight: '500',
    fontSize: '1rem !important'
}));

const EditButton = styled(Button)(({ theme }) => ({
    position: 'absolute !important',
    right: '30px'
}));

const IconButtonStyle = styled(IconButton)(({ theme }) => ({
    position: 'absolute !important',
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    background: theme.palette.secondary.main,
    fontSize: '1.2rem',
    '&:hover':{
        background: theme.palette.secondary.main
    }
}));

const Profile = () => {  
    const theme = useTheme()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => ({ ...state.user }));

    useEffect(() => {
        dispatch(showAuthUser({}))
    }, [])

    return (
        <Page>
            <Container sx={{
                marginTop: '40px'
            }}>
                <Grid container spacing={3}>
                    <Grid item md={3}>
                        <UserSideName />
                    </Grid>
                    <Grid item md={9}>
                        <Grid container spacing={3}>
                            <Grid item md={3} xs={12} sx={{
                                position: 'relative'
                            }}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={UserDemo}
                                    sx={{ 
                                        width: '100%', height: 'auto',
                                        [theme.breakpoints.down('md')]: {
                                            width: '150px',
                                            height: '150px',
                                            margin: 'auto',
                                        } 
                                    }}
                                />
                                <IconButtonStyle 
                                    aria-label="edit" 
                                    component={RouterLink}
                                    to='/profile/edit'
                                    sx={{
                                        right: '5px',
                                        bottom: '15px',
                                        [theme.breakpoints.down('md')]: {
                                            left:'120px',
                                            right:0,
                                            bottom:0,
                                            margin:'auto',
                                            width:'45px',
                                        } 
                                }}>
                                    <EditIcon />
                                </IconButtonStyle>
                            </Grid>
                            <Grid item md={9} xs={12}>
                                <Paper sx={{
                                    padding :'30px',
                                    position: 'relative'
                                }}>
                                    <IconButtonStyle 
                                        aria-label="edit"
                                        component={RouterLink}
                                        to='/profile/edit' 
                                        sx={{
                                                right: '15px',
                                                top: '15px',
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButtonStyle>
                                    <InfoBox>
                                        <HeadTypography variant="h5" component="h5">Name: </HeadTypography>
                                        <BodyTypography variant="h5" component="h5">{ user && user.name }</BodyTypography>
                                    </InfoBox>
                                    <InfoBox>
                                        <HeadTypography variant="h5" component="h5">Email: </HeadTypography>
                                        <BodyTypography variant="h5" component="h5">{ user && user.email }</BodyTypography>
                                    </InfoBox>
                                    <InfoBox>
                                        <HeadTypography variant="h5" component="h5">Phone: </HeadTypography>
                                        <BodyTypography variant="h5" component="h5">{ user && user.phone }</BodyTypography>
                                    </InfoBox> 
                                </Paper>                                                               
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item md={12} xs={12}>
                                <Paper sx={{
                                    padding :'30px',
                                    marginTop: '30px',
                                    position: 'relative'
                                }}>
                                    <IconButtonStyle 
                                        aria-label="edit" 
                                        component={RouterLink}
                                        to='/profile/address-edit'
                                        sx={{
                                                right: '15px',
                                                top: '15px',
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButtonStyle>
                                    <Typography variant="h4" component="h2">My Address</Typography>
                                    <InfoBox>
                                        <HeadTypography variant="h5" component="h5">Address: </HeadTypography>
                                        <BodyTypography variant="h5" component="h5">899 Lux Vinay Nagar</BodyTypography>
                                    </InfoBox>
                                    <InfoBox>
                                        <HeadTypography variant="h5" component="h5">City: </HeadTypography>
                                        <BodyTypography variant="h5" component="h5">Indore</BodyTypography>
                                    </InfoBox>
                                    <InfoBox>
                                        <HeadTypography variant="h5" component="h5">State: </HeadTypography>
                                        <BodyTypography variant="h5" component="h5">Madhya Pradesh</BodyTypography>
                                    </InfoBox> 
                                    <InfoBox>
                                        <HeadTypography variant="h5" component="h5">Country: </HeadTypography>
                                        <BodyTypography variant="h5" component="h5">India</BodyTypography>
                                    </InfoBox>
                                    <InfoBox>
                                        <HeadTypography variant="h5" component="h5">Pin Code: </HeadTypography>
                                        <BodyTypography variant="h5" component="h5">898898</BodyTypography>
                                    </InfoBox>
                                </Paper>                                                               
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}

export default Profile

import React from 'react';
import * as Yup from 'yup';
import "yup-phone";
import { useState } from 'react';
import { useNavigate, Link as RouterLink} from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SaveButton } from 'src/components/Button'

import { useSelector, useDispatch } from 'react-redux';
import { register } from 'src/store/api/auth';
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
    fontSize: '1.2rem !important'
}));

const BodyTypography = styled(Typography)(({ theme }) => ({
    fontWeight: '500',
    fontSize: '1.2rem !important'
}));

const EditButton = styled(Button)(({ theme }) => ({
    position: 'absolute !important',
    right: '30px'
}));

const Profile = () => {  
    const theme = useTheme()

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
                            <Grid item md={3} sx={{
                                position: 'relative'
                            }}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={UserDemo}
                                    sx={{ width: 200, height: 200 }}
                                />
                                <IconButton aria-label="edit" sx={{
                                    position: 'absolute !important',
                                    right: '25px',
                                    bottom: 0,
                                    color: theme.palette.primary.main,
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    background: theme.palette.secondary.main,
                                    '&:hover':{
                                        background: theme.palette.secondary.main
                                    }
                                }}>
                                    <EditIcon />
                                </IconButton>
                            </Grid>
                            <Grid item md={9}>
                                <Paper sx={{
                                    padding :'30px',
                                    position: 'relative'
                                }}>
                                    <EditButton variant="outlined" startIcon={<EditIcon />}>
                                        Edit
                                    </EditButton>
                                    <InfoBox>
                                        <HeadTypography variant="h5" component="h5">Name: </HeadTypography>
                                        <BodyTypography variant="h5" component="h5">Govind Singh Tomar</BodyTypography>
                                    </InfoBox>
                                    <InfoBox>
                                        <HeadTypography variant="h5" component="h5">Email: </HeadTypography>
                                        <BodyTypography variant="h5" component="h5">govindtomar01@gmail.com</BodyTypography>
                                    </InfoBox>
                                    <InfoBox>
                                        <HeadTypography variant="h5" component="h5">Phone: </HeadTypography>
                                        <BodyTypography variant="h5" component="h5">8989131933</BodyTypography>
                                    </InfoBox> 
                                </Paper>                                                               
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item md={12}>
                                <Paper sx={{
                                    padding :'30px',
                                    marginTop: '30px',
                                    position: 'relative'
                                }}>
                                    <EditButton variant="outlined" startIcon={<EditIcon />}>
                                        Edit
                                    </EditButton>
                                    <Typography variant="h4" component="h2">My Address</Typography>
                                    <InfoBox>
                                        <HeadTypography variant="h5" component="h5">Name: </HeadTypography>
                                        <BodyTypography variant="h5" component="h5">Govind Singh Tomar</BodyTypography>
                                    </InfoBox>
                                    <InfoBox>
                                        <HeadTypography variant="h5" component="h5">Email: </HeadTypography>
                                        <BodyTypography variant="h5" component="h5">govindtomar01@gmail.com</BodyTypography>
                                    </InfoBox>
                                    <InfoBox>
                                        <HeadTypography variant="h5" component="h5">Phone: </HeadTypography>
                                        <BodyTypography variant="h5" component="h5">8989131933</BodyTypography>
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

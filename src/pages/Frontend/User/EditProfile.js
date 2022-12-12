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
import { showAuthUser, updateUser } from 'src/store/api/user';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Paper, Button, Box, Container, Stack, Grid } from '@mui/material'
import UserSideName from './components/UserSideNav';
import Page from '../../../components/Page';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

const PaperStyle = styled(Paper)(({ theme }) => ({

}));
  

const EditProfile = () => {  
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();

    const { user } = useSelector((state) => ({ ...state.user }));
  
    const LoginSchema = Yup.object().shape({
      phone: Yup.string().phone().required().required('Phone number is required'),
      name: Yup.string().required('Name required'),
      email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    });
  
    const defaultValues = {
      name: '',
      email: '',
      phone: '',
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
      console.log(formValue)
      dispatch(updateUser({formValue, navigate}))
    };

    useEffect(() => {
        dispatch(showAuthUser({}))
        if(user != null){
            setValue('name', user.name)
            setValue('email', user.email)
            setValue('phone', user.phone)
        }
    }, [showAuthUser])
  

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
                        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={4}>
                                <Grid item xs={9}>
                                    <RHFTextField name="name" label="Name" />
                                </Grid>
                                <Grid item xs={9}>
                                    <RHFTextField name="email" label="E-mail Address" />
                                </Grid>
                                <Grid item xs={9}>
                                    <RHFTextField name="phone" label="Phone Number" disabled/>
                                </Grid>
                                <Grid item xs={7}>
                                    <SaveButton type="submit">
                                        Save
                                    </SaveButton>
                                </Grid>
                            </Grid>                        
                        </FormProvider>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}

export default EditProfile

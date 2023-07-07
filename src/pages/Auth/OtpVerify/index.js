import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSelector, useDispatch } from 'react-redux';
import { otpVerify } from 'src/store/api/auth';
// @mui
import { Stack, Container, Typography, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Page from '../../../components/Page';

import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { useEffect } from 'react';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

const PaperStyle = styled(Card)(({ theme }) => ({  
  padding:'.5rem',
  '& .MuiPaper-root.MuiPaper-elevation':{
    boxShadow : 'none'
  }
}));

const HeaderStyle = styled('div')(({ theme }) => ({
  margin: '2rem 2rem .6rem 2rem'
}));

export default function OtpVerify() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    otp: Yup.string().required('Otp is required')
  });

  const { user } = useSelector((state) => ({ ...state.auth }));

  useEffect(() => {
    if(user !== null){
      setValue("id", user.data.id)
      setValue("otp", user.data.otp)
    }else{
      navigate('/login')
    }
  }, [user])

  const defaultValues = {
    otp: '',
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
    formValue.id = user.data.id
    dispatch(otpVerify({formValue, navigate}))
  };

  return (
    <Page title="Otp Verify">
      <RootStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <PaperStyle>
              <HeaderStyle>
                <Typography variant="h4">
                  OTP Verification
                </Typography>
                <Typography variant="p">
                  Please enter the OTP sent to your mobile number to login.
                </Typography>
              </HeaderStyle>
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                  <RHFTextField name="otp" label="Phone Otp" />
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 3 }}>
                  <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Login
                  </LoadingButton>
                </Stack>
              </FormProvider>
            </PaperStyle>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}

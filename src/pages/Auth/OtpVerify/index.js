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
import { Link, Stack, IconButton, InputAdornment, Container, Typography, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Page from '../../../components/Page';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
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
  // minHeight: '100vh',
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

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    otp: Yup.string().required('Otp is required')
  });

  const { user } = useSelector((state) => ({ ...state.auth }));

  useEffect(() => {
    if(user !== null){
      console.log(user)
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
    <Page title="Login">
      <RootStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <PaperStyle>
              <HeaderStyle>
                <Typography variant="h4">
                  Otp Verification
                </Typography>
                <Typography variant="p">
                  Lorem ipsum dolor sit amet consectetur. Aenean senectus id vel egestas ipsum mollis.
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

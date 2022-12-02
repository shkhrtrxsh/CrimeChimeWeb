import * as Yup from 'yup';
import "yup-phone";
import { useState } from 'react';
import { useNavigate, Link as RouterLink} from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSelector, useDispatch } from 'react-redux';
import { register } from 'src/store/api/auth';
// @mui
import { Link, Stack, IconButton, InputAdornment, Container, Typography, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Page from '../../../components/Page';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
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

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

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
  } = methods;

  const onSubmit = (formValue) => {
    console.log(formValue)
    dispatch(register({formValue, navigate}))
  };

  return (
    <Page title="Login">
      <RootStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <PaperStyle>
              <HeaderStyle>
                <Typography variant="h4">
                  Sign up for Crime report
                </Typography>
                <Typography variant="p">
                  Lorem ipsum dolor sit amet consectetur. Aenean senectus id vel egestas ipsum mollis.
                </Typography>
              </HeaderStyle>
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                  <RHFTextField name="name" label="Name" />
                  <RHFTextField name="email" label="E-mail Address" />
                  <RHFTextField name="phone" label="Phone Number" />
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 3 }}>
                  <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Send Otp
                  </LoadingButton>
                </Stack>
              </FormProvider>
              <Typography variant="body2" sx={{ mb: 3, textAlign: 'center' }}>
                Have an account?{' '}
                <Link variant="subtitle2" to="/login" component={RouterLink} style={{
                    color: theme.palette.secondary.main,
                    textDecorationColor: theme.palette.secondary.main,
                  }}>
                  Login
                </Link>
              </Typography>
            </PaperStyle>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}

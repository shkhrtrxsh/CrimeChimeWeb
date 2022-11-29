import * as Yup from 'yup';
import "yup-phone";
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSelector, useDispatch } from 'react-redux';
import { login } from 'src/store/api/auth';
// @mui
import { 
    Link, 
    Stack, 
    IconButton, 
    InputAdornment, 
    Container, 
    Typography, 
    Card,
    Autocomplete,
    TextField
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Page from '../../../components/Page';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
// ----------------------------------------------------------------------


const top100Films = [
    {
        id:1,
        title : "go"
    }
]
const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const ContentStyle = styled('div')(({ theme }) => ({  
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));

const PaperStyle = styled(Card)(({ theme }) => ({ 
    width:'400px', 
  padding:'.5rem',
  '& .MuiPaper-root.MuiPaper-elevation':{
    boxShadow : 'none'
  }
}));

const HeaderStyle = styled('div')(({ theme }) => ({
  margin: '2rem 2rem .6rem 2rem'
}));

export default function ReportForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    phone: Yup.string()
    .phone()
    .required().required('Phone number is required'),
  });

  const defaultValues = {
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
    dispatch(login({formValue, navigate}))
  };

  return (
    <Page title="Login">
      <RootStyle>
        <ContentStyle>
        <PaperStyle>
            <HeaderStyle>
            <Typography variant="h4">
                Report Your Crime
            </Typography>
            </HeaderStyle>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={top100Films.map((option) => option.title)}
                renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search Location"
                    InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    }}
                />
                )}
            />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 3 }}>
                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                Save Report
                </LoadingButton>
            </Stack>
            </FormProvider>
        </PaperStyle>
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}

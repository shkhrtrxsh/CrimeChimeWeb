import * as Yup from 'yup';
import { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSelector, useDispatch } from 'react-redux';
import { addUser } from 'src/store/api/user';
import { getRoles } from 'src/store/api/role';
import { SaveButton } from 'src/components/Button'
import { slugConvertor } from 'src/helpers/StringHelper';
import Iconify from 'src/components/Iconify';

// @mui
import {  
  Stack, 
  Container,
  Typography,
  Button,
  Grid,
  IconButton, 
  InputAdornment,
  InputLabel,
  Select,
  Box,
  OutlinedInput,
  MenuItem,
  FormControl,
  ListItemText,
  Checkbox,
  Chip
  

} from '@mui/material';
// components
import BreadcrumbNavigator from 'src/components/BreadcrumbNavigator'

import { FormProvider, RHFTextField, RHFCheckbox } from 'src/components/hook-form';
// ----------------------------------------------------------------------

export default function AddUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  
  const { roles } = useSelector((state) => ({ ...state.role }));

  const UserSchema = Yup.object().shape({
    name: Yup.string().required('User is required'),
    email: Yup.string().required('E-mail is required'),
    password: Yup.string().required('Password is required')
  });

  useEffect(() => {
    dispatch(getRoles({}))
  }, [])
  const handleChangeRole = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value)
    setUserRole(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    console.log(value)
  };

  const defaultValues = {
    name: '',
    email: '',
    mobile: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (formValue) => {
    formValue.slug = slugConvertor(formValue.name)
    formValue.user_roles = userRole
    dispatch(addUser({formValue, navigate}))
  };

  const breadcrumbNavigate = [
    {
      name : "user",
      link :  "/user"
    }
  ]

  return (
    <Fragment >
      <BreadcrumbNavigator 
        navigate={breadcrumbNavigate} 
        currentPage="Add User"
      />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <RHFTextField name="name" label="Name" />
        </Grid>
        <Grid item xs={7}>
          <RHFTextField name="email" label="E-mail Address" type="email" />
        </Grid>
        <Grid item xs={5}>
          <RHFTextField name="mobile" label="Mobile" />
        </Grid>
        <Grid item xs={7}>
          <RHFTextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={7}>
          <FormControl sx={{width:'100%'}}>
            <InputLabel id="demo-multiple-checkbox-label" color="form">Select User Roles</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              color="form"
              value={userRole}
              onChange={handleChangeRole}
              input={<OutlinedInput label="Select User Roles" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {roles.data && roles.data.map((role) => (
                <MenuItem key={role.id} value={role.name}>
                  <Checkbox checked={userRole.indexOf(role.name) > -1} color="form"/>
                  <ListItemText primary={role.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={7}>
          <SaveButton type="submit">
            Save
          </SaveButton>
        </Grid>
      </Grid>
      </FormProvider>
    </Fragment>
  );
}

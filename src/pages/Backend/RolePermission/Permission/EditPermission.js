import * as Yup from 'yup';
import { useState, useEffect, Fragment } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editPermission, showPermission } from 'src/store/api/permission';
import { showPermissionModule } from 'src/store/api/permission-module';
import {useNavigate, useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { slugConvertor } from 'src/helpers/StringHelper';
import { SaveButton } from 'src/components/Button'
import BreadcrumbNavigator from 'src/components/BreadcrumbNavigator'
// @mui
import {  
  Stack, 
  Container,
  Typography,
  Button,
  Grid,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  InputAdornment  
} from '@mui/material';
// components

import { FormProvider, RHFTextField, RHFCheckbox } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function EditPermission() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [apiMethod, setApiMethod] = useState('GET');

  const RoleSchema = Yup.object().shape({
    name: Yup.string().required('Role is required'),
    api: Yup.string().required('API is required'),
    url: Yup.string().required('Front End URL is required'),
    permission_module: Yup.string().required('Permission Module is required')

  });

  useEffect(() => {
    let id = params.id
    dispatch(showPermissionModule({id}))
    id = params.pid
    dispatch(showPermission({id}))
  }, [])

  const { permissionModule } = useSelector((state) => ({ ...state.permissionModule }));
  const { permission } = useSelector((state) => ({ ...state.permission }));

  useEffect(() => {
    if(permissionModule !== null){
      setValue("permission_module_id", permissionModule.id)
      setValue("permission_module", permissionModule.name)
    }
    if(permission !== null){
      setValue("id", permission.id)
      setValue("name", permission.name)
      setValue("url", permission.url)
      setValue("api", permission.api)
      setValue("method", permission.method)
      setValue("route_name", permission.route_name)
      setApiMethod(permission.method)
    }
    console.log(permission)
  }, [permissionModule, permission])

  const defaultValues = {
    name: '',
    api: '',
    url: '',
    method: null,
    route_name: '',
    permission_module: '',
    permission_module_id: ''
  };

  const methods = useForm({
    resolver: yupResolver(RoleSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    setValue
  } = methods;

  const onSubmit = (formValue) => {
    formValue.slug = slugConvertor(formValue.name)
    dispatch(editPermission({formValue, navigate}))
  };

  let apiMethods = ['GET', 'POST', 'PUT', 'DELETE'];

  const handleMethodChange = (event) => {
    setApiMethod(event.target.value)
    setValue("method", event.target.value)
  }

  
  const breadcrumbNavigate = [
    {
      name : "permission",
      link :  "/permission"
    }
  ]

  return (
    <Fragment>
      <BreadcrumbNavigator 
        navigate={breadcrumbNavigate} 
        currentPage="Edit Permission"
      />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <RHFTextField name="permission_module" label="Select Permission Module" />
        </Grid>
        <Grid item xs={7}>
          <RHFTextField name="name" label="Name" />
        </Grid>
        <Grid item xs={7}>
          <RHFTextField 
            name="api" 
            label="API" 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {permissionModule && permissionModule.module_api}
                </InputAdornment>
              ),
            }} 
          />
        </Grid>
        <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Method</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={apiMethod}
            label="Select Method"
            onChange={handleMethodChange}
          >
            {apiMethods.map((method) => (
              <MenuItem value={method} key={method}>{method}</MenuItem>
            ))}
          </Select>
        </FormControl>
        </Grid>
        <Grid item xs={7}>
          <RHFTextField name="route_name" label="Route Name" />
        </Grid>
        <Grid item xs={7}>
          <RHFTextField name="url" label="Frontend URL" />
        </Grid>
        <Grid item xs={6}>
          <SaveButton type="submit">
            Save
          </SaveButton>
        </Grid>
      </Grid>
      </FormProvider>
    </Fragment>
  );
}

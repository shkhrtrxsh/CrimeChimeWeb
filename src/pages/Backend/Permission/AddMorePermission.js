import * as Yup from 'yup';
import { useState, useEffect, Fragment } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { showPermission, addMorePermission } from 'src/store/api/permission';
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
  MenuItem  
} from '@mui/material';
// components

import { FormProvider, RHFTextField, RHFCheckbox } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function AddMorePermission() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [apiMethod, setApiMethod] = useState('GET');

  const RoleSchema = Yup.object().shape({
    name: Yup.string().required('Role is required')
  });

  useEffect(() => {
    const id = params.id
    dispatch(showPermission({id}))
  }, [])

  const { permission } = useSelector((state) => ({ ...state.permission }));

  useEffect(() => {
    if(permission !== null){
      setValue("permission_module_id", permission.id)
      setValue("permission_module", permission.name)
    }
  }, [permission])

  const defaultValues = {
    name: '',
    api: '',
    url: '',
    method: '',
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
    dispatch(addMorePermission({formValue, navigate}))
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
        currentPage="Add Permission"
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
          <RHFTextField name="api" label="api" />
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

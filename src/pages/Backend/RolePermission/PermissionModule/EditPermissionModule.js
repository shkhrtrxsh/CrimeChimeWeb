import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSelector, useDispatch } from 'react-redux';
import { editPermissionModule, showPermissionModule } from 'src/store/api/permission-module';
// @mui
import {  
  Stack, 
  Container,
  Typography,
  Button,
  Grid
} from '@mui/material';
// components
import Iconify from 'src/components/Iconify';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { useEffect, Fragment } from 'react';
import { SaveButton } from 'src/components/Button'
import { slugConvertor } from 'src/helpers/StringHelper';
import BreadcrumbNavigator from 'src/components/BreadcrumbNavigator'

// ----------------------------------------------------------------------

export default function EditPermissionModule() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const PermissionModuleSchema = Yup.object().shape({
    name: Yup.string().required('Permission Module is required'),
    module_api: Yup.string().required('Permission Module API is required')
  });

  const { permissionModule } = useSelector((state) => ({ ...state.permissionModule }));

  useEffect(()=>{
    const id = params.id
    dispatch(showPermissionModule({id}))
  }, [params])

  useEffect(()=>{
    if(permissionModule !== null){
      setValue("id", permissionModule.id)
      setValue("name", permissionModule.name)
      setValue("module_api", permissionModule.module_api)
    }
  }, [permissionModule])

  const defaultValues = {
    name: '',
    module_api: ''
  };

  const methods = useForm({
    resolver: yupResolver(PermissionModuleSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    setValue
  } = methods;

  const onSubmit = (formValue) => {
    formValue.module_api = slugConvertor(formValue.module_api)
    dispatch(editPermissionModule({formValue, navigate}))
  };

  const breadcrumbNavigate = [
    {
      name : "permission-module",
      link :  "/permission-module"
    }
  ]

  return (
    <Fragment >
      <BreadcrumbNavigator 
        navigate={breadcrumbNavigate} 
        currentPage="Edit PermissionModule"
      />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <RHFTextField name="name" label="Permission Module Name" />
        </Grid>
        <Grid item xs={7}>
          <RHFTextField name="module_api" label="Permission Module API" />
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
